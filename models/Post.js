const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = mongoose.Schema({
	title: {
		type: Schema.Types.String,
		require: true
	},
	body: {
		type: Schema.Types.String,
		require: true
	},
	categories: [{ type: Schema.Types.String }],
	types: [{ type: Schema.Types.String }]
})

const Post = mongoose.model('post', PostSchema)
module.exports = Post
