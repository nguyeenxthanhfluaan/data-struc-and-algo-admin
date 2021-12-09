import postTypes from './post.type'
import axios from 'axios'
import { toast } from 'react-toastify'

export const fetchPosts =
	({
		category = null,
		keyword = null,
		subject = null,
		type = null,
		sortBy = null,
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
					sortBy,
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
		{ title, description, content, type, category, subject, keywords },
		resetForm
	) =>
	async (dispatch) => {
		toast.info('Đang tạo bài đăng')

		try {
			const result = await axios.post(
				'/api/post',
				JSON.stringify({
					title,
					description,
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
			toast.success('Tạo bài đăng thành công')
			console.log(result.data)
		} catch (error) {
			toast.error('Tạo bài đăng thất bại')
			console.log(error)
		}
	}

export const updatePost =
	({
		_id,
		title,
		description,
		content,
		type,
		categories,
		subjects,
		keywords,
	}) =>
	async (dispatch) => {
		try {
			const result = await axios.put(
				'/api/post',
				JSON.stringify({
					_id,
					title,
					description,
					content,
					type,
					categories,
					subjects,
					keywords,
				}),
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			toast.success('Sữa bài đăng thành công', {
				style: { fontSize: '1.6rem' },
			})
		} catch (error) {
			console.log(error)
			toast.error('Sữa bài đăng thất bại', {
				style: { fontSize: '1.6rem' },
			})
		}
	}
