import axios from 'axios'
import subjectTypes from './subject.types'

export const fetchSubject = () => async (dispatch) => {
	try {
		const result = await axios.get('/api/subject')
		dispatch({
			type: subjectTypes.SET_SUBJECT,
			payload: result.data
		})
	} catch (error) {
		console.log(error)
	}
}
