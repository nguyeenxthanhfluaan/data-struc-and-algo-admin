import catetgoryTypes from './category.types'
import categoryTypes from './category.types'

const initialState = {
	categories: []
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case catetgoryTypes.SET_CATEGORY:
			return {
				...state,
				categories: action.payload
			}
		default:
			return state
	}
}

export default reducer
