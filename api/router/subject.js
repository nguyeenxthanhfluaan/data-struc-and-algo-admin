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
			model: Category
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
			category: req.body.category
		})
		const result = await subject.save()
		res.json(result)
	} catch (error) {
		res.send(error)
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
