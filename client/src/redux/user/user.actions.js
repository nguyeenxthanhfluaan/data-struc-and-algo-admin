import userTypes from './user.types'
import axios from 'axios'

export const loadUser = () => async (dispatch) => {
	try {
		const result = await axios.get('/api/auth')
		dispatch({
			type: userTypes.SET_USER,
			payload: result.data,
		})
	} catch (error) {
		console.log(error)
		dispatch({
			type: userTypes.SET_USER,
			payload: null,
		})
	}
}

export const loginUser =
	({ email, password }) =>
	async (dispatch) => {
		try {
			const result = await axios.post(
				'/api/auth',
				{ email, password },
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			dispatch({
				type: userTypes.SET_USER,
				payload: result.data,
			})
		} catch (error) {
			console.log(error)
		}
	}

export const logoutUser = () => async (dispatch) => {
	try {
		await axios.get('/api/auth/logout')
		dispatch({
			type: userTypes.SET_USER,
			payload: null,
		})
	} catch (error) {
		console.log(error)
	}
}
