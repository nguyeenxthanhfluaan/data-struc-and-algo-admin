const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')

const { cloudinary } = require('../config/cloudinary')
const mongoose = require('mongoose')
const Post = require('../models/Post')
const ObjectId = mongoose.Types.ObjectId

const search = require('../utilities/search')

// @route   GET api/post?category=algorithm&keyword=test
// @desc    Search posts if no keyword
// @access  Public
router.get('/', async (req, res) => {
	try {
		const { keyword, subject, type, category, sort, skip, limit } = req.query

		const skipNumber = parseInt(skip)
		const limitNumber = parseInt(limit)

		console.log({
			keyword,
			subject,
			type,
			category,
			sort,
			skip: skipNumber,
			limit: limitNumber,
		})

		const result = await search({
			keyword,
			subject,
			type,
			category,
			sort,
			skip: skipNumber,
			limit: limitNumber,
		})

		res.json(result)
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

router.get('/count', async (req, res) => {
	try {
		const { category, subject } = req.query
		console.log(req.query)

		let aggregateQuery = []
		let $match = {}

		aggregateQuery.push({
			$lookup: {
				from: 'subjects',
				localField: 'subject',
				foreignField: '_id',
				as: 'subject',
			},
		})
		aggregateQuery.push({
			$lookup: {
				from: 'categories',
				localField: 'subject.category',
				foreignField: '_id',
				as: 'category',
			},
		})
		aggregateQuery.push({
			$lookup: {
				from: 'types',
				localField: 'type',
				foreignField: '_id',
				as: 'type',
			},
		})

		aggregateQuery.push({ $unwind: '$subject' })
		aggregateQuery.push({ $unwind: '$category' })
		aggregateQuery.push({ $unwind: '$type' })

		if (category) {
			Object.assign($match, {
				'category._id': ObjectId(category),
			})
		}
		if (subject) {
			Object.assign($match, {
				'subject._id': ObjectId(subject),
			})
		}

		if (Object.keys($match).length > 0) {
			aggregateQuery.push({ $match })
		}

		aggregateQuery.push({
			$count: 'count',
		})

		console.log(aggregateQuery)

		const result = await Post.aggregate(aggregateQuery)
		res.json(result[0].count)
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   GET api/post/:id
// @desc    Get a post by id
// @access  Public
router.get('/:id', async (req, res) => {
	try {
		const promise1 = Post.findByIdAndUpdate(req.params.id, {
			$inc: { viewCount: 1 },
		})

		const promise2 = Post.aggregate([
			{
				$match: { _id: ObjectId(req.params.id) },
			},
			{
				$set: { viewCount: { $sum: ['$viewCount', 1] } },
			},
			{
				$lookup: {
					from: 'types',
					localField: 'type',
					foreignField: '_id',
					as: 'type',
				},
			},
			{
				$lookup: {
					from: 'subjects',
					localField: 'subject',
					foreignField: '_id',
					as: 'subject',
				},
			},
			{
				$lookup: {
					from: 'categories',
					localField: 'subject.category',
					foreignField: '_id',
					as: 'category',
				},
			},
			{ $unwind: '$subject' },
			{ $unwind: '$category' },
			{ $unwind: '$type' },
		])

		const values = await Promise.all([promise1, promise2])

		res.json(values[1][0])
	} catch (error) {
		console.log(error)
		res.status(500).send('Server Error')
	}
})

// @route   POST /api/post
// @desc    Create a post
// @access  Private
router.post('/', async (req, res) => {
	try {
		const {
			title,
			description,
			definition,
			thumbnail,
			content,
			category,
			type,
			subject,
			keywords,
		} = req.body

		const { secure_url, public_id } = await cloudinary.uploader.upload(
			thumbnail,
			{
				upload_preset: 'ml_default',
			}
		)

		const post = new Post({
			title,
			description,
			thumbnail: {
				url: secure_url,
				publicId: public_id,
			},
			definition,
			content,
			type,
			category,
			subject,
			keywords,
		})
		const result = await post.save()
		res.json(result)
	} catch (error) {
		console.log(error)
		res.status(500).send('Server Error')
	}
})

// @route   PUT /api/post
// @desc    Update a post
// @access  Private
router.put('/', async (req, res) => {
	try {
		const {
			_id,
			title,
			description,
			definition,
			thumbnail,
			content,
			category,
			type,
			subject,
			keywords,
			oldThumbnail,
		} = req.body

		const updateData = {
			title,
			description,
			definition,
			content,
			category,
			type,
			subject,
			keywords,
			lastModified: Date.now(),
		}

		// Check if image is base64 image so upload, or if thumbnail is a link
		//  so preserve that link
		if (/(data:image\/[^;]+;base64[^"]+)/.test(thumbnail)) {
			const promise1 = cloudinary.uploader.destroy(oldThumbnail.publicId)
			const promise2 = cloudinary.uploader.upload(thumbnail, {
				upload_preset: 'ml_default',
			})

			const values = await Promise.all([promise1, promise2])
			const { secure_url, public_id } = values[1]

			Object.assign(updateData, {
				thumbnail: { url: secure_url, publicId: public_id },
			})
		}

		const result = await Post.findOneAndUpdate({ _id }, updateData, {
			new: true,
		})
		res.json(result)
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   DELETE /api/post/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', async (req, res) => {
	try {
		const post = await Post.findByIdAndDelete(req.params.id)
		res.json(post)
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   DELETE /api/post/
// @desc    Delete all posts
// @access  Private
// router.delete('/', async (req, res) => {
// 	try {
// 		await Post.deleteMany()
// 		res.send('delete all success')
// 	} catch (error) {
// 		console.log(error)
// 		res.sendStatus(500)
// 	}
// })

module.exports = router
