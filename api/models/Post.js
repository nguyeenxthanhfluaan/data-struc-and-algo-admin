const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = mongoose.Schema({
	title: {
		type: Schema.Types.String,
		require: true,
		unique: true
	},
	body: {
		type: Schema.Types.String,
		require: true
	},
	type: {
		type: Schema.Types.ObjectId,
		ref: 'types'
	},
	categories: [
		{
			category: {
				type: Schema.Types.ObjectId,
				ref: 'categories'
			}
		}
	],
	subjects: [
		{
			subject: {
				type: Schema.Types.ObjectId,
				ref: 'subjects'
			}
		}
	],
	keywords: [
		{
			keyword: {
				type: Schema.Types.String
			}
		}
	]
})

const Post = mongoose.model('post', PostSchema)
module.exports = Post
