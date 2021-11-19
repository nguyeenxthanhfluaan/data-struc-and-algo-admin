import userTypes from './user.types'

const initialState = {
	user: null
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case userTypes.SET_USER:
			return {
				...state,
				user: action.payload
			}
		default:
			return state
	}
}

export default reducer
