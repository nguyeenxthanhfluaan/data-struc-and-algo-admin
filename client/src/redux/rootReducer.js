import { combineReducers } from 'redux'
import categoryReducer from './category/category.reducer'
import postReducer from './post/post.reducer'

export const rootReducer = combineReducers({
	category: categoryReducer,
	post: postReducer
})

export default rootReducer
