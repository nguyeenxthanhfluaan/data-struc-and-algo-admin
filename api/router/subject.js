const express = require('express')
const router = express.Router()
const Subject = require('../models/Subject')

// @route   GET api/subject
// @desc    Get all subject
router.get('/',async (req, res) => {
	try {
		const result = await Subject.find()
		res.json(result)
	} catch (error) {
		res.send(error)
	}
})

// @route   GET api/category/:id
// @desc    Get subject by id
router.get('/:id',async (req, res) => {
	try {
		const result = await Subject.findById(req.params.id)
		res.json(result)
	} catch (error) {
		res.send(error)
	}
})

// @route   POST api/subject
// @desc    Create a new subject
router.post('/',async (req, res) => {
	try {
		const category = new Subject({
			subject: req.body.subject
		})
		const result = await category.save()
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
