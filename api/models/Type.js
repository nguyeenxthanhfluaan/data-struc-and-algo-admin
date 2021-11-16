const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TypeSchema = mongoose.Schema({
	name: {
		type: Schema.Types.String
	}
})

const Type = mongoose.model('type', TypeSchema)
module.exports = Type
