const express = require('express')
const router = express.Router()
const Subject = require('../models/Subject')
const Category = require('../models/Category')

// @route   GET api/subject
// @desc    Get all subject
router.get('/', async (req, res) => {
	try {
		const result = await Subject.find().populate({
			path: 'category',
			model: Category,
			// match: { _id: '619300419fc26712471ca3f2' }
		})
		res.json(result)
	} catch (error) {
		res.send(error)
	}
})

// @route   GET api/category/:id
// @desc    Get subject by id
router.get('/:id', async (req, res) => {
	try {
		const result = await Subject.findById(req.params.id)
		res.json(result)
	} catch (error) {
		res.send(error)
	}
})

// @route   POST api/subject
// @desc    Create a new subject
router.post('/', async (req, res) => {
	try {
		const subject = new Subject({
			name: req.body.name,
			category: req.body.category,
		})

		subject.save()

		const result = await Subject.populate(subject, {
			path: 'category',
			model: Category,
		})

		res.json(result)
	} catch (error) {
		res.send(error)
		res.sendStatus(500)
	}
})

// @route   PUT api/subject/:id
// @desc    Delete a subject
router.put('/:id', async (req, res) => {
	try {
		if (!req.body.name) {
			throw Error
		}
		const result = await Subject.findOneAndUpdate(
			{ _id: req.params.id },
			{
				name: req.body.name,
			},
			{ new: true }
		).populate({ path: 'category', model: Category })

		res.json(result)
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   POST api/subject/:id
// @desc    Delete a subject
router.delete('/:id', async (req, res) => {
	try {
		await Subject.findByIdAndDelete(req.params.id)
		res.sendStatus(200)
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

router.delete('/', async (req, res) => {
	try {
		await Subject.deleteMany()
		res.send('success')
	} catch (error) {
		console.log(error)
		res.status(500).send('Server Error')
	}
})

module.exports = router
