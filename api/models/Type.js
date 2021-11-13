const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TypeSchema = mongoose.Schema({
	type: {
		type: Schema.Types.String,
		unique: true
	}
})

const Type = mongoose.model('type', TypeSchema)
module.exports = Type
