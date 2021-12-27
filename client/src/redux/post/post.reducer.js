import postTypes from './post.type'

const initialState = {
	posts: [],
	post: {},
	isLoading: true,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case postTypes.SET_POSTS:
			return {
				...state,
				posts: action.payload,
				isLoading: false,
			}
		case postTypes.SET_POST:
			return {
				...state,
				post: action.payload,
				isLoading: false,
			}
		case postTypes.DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((item) => item._id !== action.payload),
			}
		default:
			return state
	}
}

export default reducer
