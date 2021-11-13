const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = mongoose.Schema({
	category: {
		type: Schema.Types.String,
      unique: true
	}
})

const Category = mongoose.model('category', CategorySchema)
module.exports = Category
