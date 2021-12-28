import postTypes from './post.type'
import axios from 'axios'
import { toast } from 'react-toastify'

export const SORT_TYPES = {
	NEWEST: 'newest',
	OLDEST: 'oldest',
	MOSTVIEWED: 'mostViewed',
	RELEVANT: 'relevant',
}

export const fetchPosts =
	({
		category = null,
		keyword = null,
		subject = null,
		type = null,
		sort = null,
		skip = null,
		limit = null,
	}) =>
	async (dispatch) => {
		try {
			dispatch({
				type: postTypes.SET_POSTS,
				payload: [],
			})

			const result = await axios.get('/api/post', {
				params: {
					category,
					keyword,
					subject,
					type,
					sort,
					skip,
					limit,
				},
			})
			dispatch({
				type: postTypes.SET_POSTS,
				payload: result.data,
			})
		} catch (error) {
			console.log(error)
		}
	}

export const fetchPostById = (id) => async (dispatch) => {
	try {
		const post = await axios.get(`/api/post/${id}`)
		dispatch({ type: postTypes.SET_POST, payload: post.data })
	} catch (error) {
		console.log(error)
	}
}

export const createPost =
	(
		{
			title,
			thumbnail,
			description,
			definition,
			content,
			type,
			category,
			subject,
			keywords,
		},
		resetForm
	) =>
	async (dispatch) => {
		toast.info('Đang tạo bài viết')

		try {
			const result = await axios.post(
				'/api/post',
				JSON.stringify({
					title,
					thumbnail,
					description,
					definition,
					content,
					type,
					category,
					subject,
					keywords,
				}),
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			resetForm()
			toast.success('Tạo bài viết thành công')
			console.log(result.data)
		} catch (error) {
			toast.error('Tạo bài viết thất bại')
			console.log(error)
		}
	}

export const updatePost =
	(
		{
			_id,
			title,
			description,
			definition,
			thumbnail,
			content,
			type,
			categories,
			subjects,
			keywords,
			oldThumbnail,
		},
		callback
	) =>
	async (dispatch) => {
		try {
			toast.info('Đang sửa bài viết, vui lòng chờ')
			const result = await axios.put(
				'/api/post',
				JSON.stringify({
					_id,
					title,
					description,
					definition,
					thumbnail,
					content,
					type,
					categories,
					subjects,
					keywords,
					oldThumbnail,
				}),
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)

			toast.success('Sữa bài viết thành công')
			if (typeof callback === 'function') callback()
		} catch (error) {
			console.log(error)
			toast.error('Sữa bài viết thất bại')
		}
	}

export const deletePost = (id) => async (dispatch) => {
	try {
		toast.info('Đang xóa bài viết')
		await axios.delete(`/api/post/${id}`)
		dispatch({
			type: postTypes.DELETE_POST,
			payload: id,
		})
		toast.success('Xóa bài viết thành công')
	} catch (error) {
		console.log(error)
		toast.error('Xóa bài viết thất bại')
	}
}
