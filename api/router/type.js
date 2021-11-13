const express = require('express')
const router = express.Router()
const Type = require('../models/Type')

// @route   GET api/type
// @desc    Get all types
router.get('/', async (req, res) => {
	try {
		const result = await Type.find()
		res.json(result)
	} catch (error) {
		res.send(error)
	}
})

// @route   GET api/type/:id
// @desc    Get type by id
router.get('/:id', async (req, res) => {
	try {
		const result = await Type.findById(req.params.id)
		res.json(result)
	} catch (error) {
		res.send(error)
	}
})

// @route   POST api/type
// @desc    Create a new type
router.post('/', async (req, res) => {
	try {
		const type = new Type({
			type: req.body.type
		})
		const result = await type.save()
		res.json(result)
	} catch (error) {
		res.send(error)
	}
})

router.delete('/', async (req, res) => {
	try {
		await Type.deleteMany()
		res.send('success')
	} catch (error) {
		console.log(error)
		res.status(500).send('Server Error')
	}
})

module.exports = router
