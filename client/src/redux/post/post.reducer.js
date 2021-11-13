import postTypes from './post.type'

const initialState = {
	posts: []
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case postTypes.SET_POST:
			return {
				...state,
				posts: action.payload
			}
		default:
			return state
	}
}

export default reducer
