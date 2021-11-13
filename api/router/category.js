const express = require('express')
const router = express.Router()
const Category = require('../models/Category')

// @route   GET api/category
// @desc    Get all category
router.get('/', async (req, res) => {
	try {
		const result = await Category.find()
		res.json(result)
	} catch (error) {
		res.send('server error')
	}
})

// @route   GET api/category/:id
// @desc    Get all category
router.get('/:id', async (req, res) => {
	try {
		const result = await Category.findById(req.params.id)
		res.json(result)
	} catch (error) {
		res.send(error)
	}
})

// @route   POST api/category
// @desc    Create a new category
router.post('/', async (req, res) => {
	try {
		const category = new Category({
			category: req.body.category
		})
		const result = await category.save()
		res.json(result)
	} catch (error) {
		res.send(error)
	}
})

router.delete('/', async (req, res) => {
	try {
		await Category.deleteMany()
		res.send('success')
	} catch (error) {
		console.log(error)
		res.status(500).send('Server Error')
	}
})

module.exports = router
