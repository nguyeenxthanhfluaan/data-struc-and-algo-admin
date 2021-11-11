const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const search = require('../utilities/search')

// @route   GET post?category=algorithm&keyword=
// @desc    Get posts with conditions in query string,
//          Get all post if no condition
router.get('/', async (req, res) => {
	try {
		const { category, type, keyword } = req.query
		console.log(req.query)

		let result = await Post.find()
		result = search(result, { category, type, keyword })

		res.json(result)
	} catch (error) {
		console.log(error)
		res.status(500).send('Server Error')
	}
})

// @route   GET post/618c8ed8b52e4e9b41736c4d
// @desc    Get a post by id
router.get('/:id', async (req, res) => {
	try {
		const result = await Post.findById(req.params.id)
		res.json(result)
	} catch (error) {
		console.log(error)
		res.status(500).send('Server Error')
	}
})

// @route   POST post
// @desc    Create a post
router.post('/', async (req, res) => {
	try {
		const { title, body, categories, types } = req.body
		const post = new Post({
			title,
			body,
			categories,
			types
		})
		console.log(post)
		await post.save()
		res.send('success')
	} catch (error) {
		console.log(error)
		res.status(500).send('Server Error')
	}
})

module.exports = router
