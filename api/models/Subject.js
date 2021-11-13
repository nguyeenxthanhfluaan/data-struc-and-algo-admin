const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubjectSchema = mongoose.Schema({
	subject: {
		type: Schema.Types.String,
		unique: true
	}
})

const Subject = mongoose.model('subject', SubjectSchema)
module.exports = Subject
