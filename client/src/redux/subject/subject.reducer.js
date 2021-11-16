import subjectTypes from './subject.types'

const initialState = {
	subjects: []
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case subjectTypes.SET_SUBJECT:
			return {
				...state,
				subjects: action.payload
			}
		default:
			return state
	}
}

export default reducer
