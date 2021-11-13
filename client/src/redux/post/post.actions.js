import postTypes from './post.type'
import axios from 'axios'

export const fetchPost =
	({ category }) =>
	async (dispatch) => {
		try {
			const result = await axios.get('/api/post', {
				params: {
					category
				}
			})
			dispatch({
				type: postTypes.SET_POST,
				payload: []
			})
			dispatch({
				type: postTypes.SET_POST,
				payload: result.data
			})
		} catch (error) {
			console.log(error)
		}
	}
