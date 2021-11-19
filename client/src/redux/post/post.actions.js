import postTypes from './post.type'
import axios from 'axios'

export const fetchPosts =
	({ category = null, keyword = null, subject = null }) =>
	async (dispatch) => {
		try {
			dispatch({
				type: postTypes.SET_POSTS,
				payload: []
			})
			console.log({
				category,
				keyword,
				subject
			})
			const result = await axios.get('/api/post', {
				params: {
					category,
					keyword,
					subject
				}
			})
			dispatch({
				type: postTypes.SET_POSTS,
				payload: result.data
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
	({ title, description, content, type, categories, subjects, keywords }) =>
	async (dispatch) => {
		const result = await axios.post(
			'/api/post',
			JSON.stringify({
				title,
				description,
				content,
				type,
				categories,
				subjects,
				keywords
			}),
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		console.log(result.data)
	}
