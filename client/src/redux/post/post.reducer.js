import postTypes from './post.type'

const initialState = {
	posts: [],
	relatedPosts: [],
	post: {},
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case postTypes.SET_RELATED_POSTS:
			return {
				...state,
				relatedPosts: action.payload,
			}
		case postTypes.SET_POSTS:
			return {
				...state,
				posts: action.payload,
			}
		case postTypes.SET_POST:
			return {
				...state,
				post: action.payload,
			}
		default:
			return state
	}
}

export default reducer
