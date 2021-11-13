import axios from 'axios'
import categoryTypes from './category.types'

export const fetchCategory = () => async (dispatch) => {
	try {
		const result = await axios.get('/api/category')
		dispatch({
			type: categoryTypes.SET_CATEGORY,
			payload: result.data
		})
	} catch (error) {
		console.log(error)
	}
}
