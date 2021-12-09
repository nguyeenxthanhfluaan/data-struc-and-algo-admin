const mongoose = require('mongoose')
const Post = require('../models/Post')
const ObjectId = mongoose.Types.ObjectId

const handleSortString = (sortBy) => {
	const timeField = 'lastModified'
	const viewField = 'viewCount'
	// score field is added by $addField stage
	const scoreField = 'score'

	let result = { field: '', direction: '' }

	switch (sortBy) {
		case 'newest':
			result.field = timeField
			result.direction = -1 // -1 mean desc
			break
		case 'oldest':
			result.field = timeField
			result.direction = 1 // 1 mean asc
			break
		case 'mostViewed':
			result.field = viewField
			result.direction = -1
			break
		case 'relevant':
			result.field = scoreField
			result.direction = -1
			break
	}
	return result
}

const search = async ({ keyword, subject, type, category, sortBy }) => {
	let aggregateQuery = []

	let $match = {}

	const sort = handleSortString(sortBy)

	if (keyword) {
		aggregateQuery.push({
			$search: {
				index: 'searchPosts',
				text: {
					query: keyword,
					path: {
						wildcard: '*',
					},
					fuzzy: {},
				},
			},
		})
		aggregateQuery.push({
			$addFields: { score: { $meta: 'searchScore' } },
		})
	}

	aggregateQuery.push({
		$lookup: {
			from: 'subjects',
			localField: 'subject',
			foreignField: '_id',
			as: 'subject',
		},
	})
	aggregateQuery.push({
		$lookup: {
			from: 'categories',
			localField: 'subject.category',
			foreignField: '_id',
			as: 'category',
		},
	})

	if (category) {
		Object.assign($match, {
			category: {
				$elemMatch: { _id: ObjectId(category) },
			},
		})
	}
	if (subject) {
		Object.assign($match, {
			subject: {
				$elemMatch: { _id: ObjectId(subject) },
			},
		})
	}
	if (type) {
		Object.assign($match, {
			type: {
				$elemMatch: { _id: ObjectId(type) },
			},
		})
	}

	if (Object.keys($match).length > 0) {
		aggregateQuery.push({ $match })
	}

	aggregateQuery.push({ $unwind: '$subject' })
	aggregateQuery.push({ $unwind: '$category' })

	if (sort.field) {
		aggregateQuery.push({
			$sort: { [sort.field]: sort.direction },
		})
	}

	try {
		return await Post.aggregate(aggregateQuery)
	} catch (error) {
		throw error
	}
}

module.exports = search
