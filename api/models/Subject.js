const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubjectSchema = mongoose.Schema({
	name: {
		type: Schema.Types.String
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'categories'
	}
})

const Subject = mongoose.model('subject', SubjectSchema)
module.exports = Subject
