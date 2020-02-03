import { ActionType } from '../Constants'

const INITIAL_STATE = [

]

const myPacksReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
		case ActionType.DO_LOGOUT_CLEANUP:
		case ActionType.RESET_MY_PACKS:
			return state.filter(pack => pack.id !== pack.id)
		case ActionType.SET_MY_PACKS:
			return state.filter(pack => pack.id !== pack.id).concat(action.packs || [])
		case ActionType.CHANGE_PACK_STATUS:
			return state.map(item => {
				if (item.id !== action.id)
				  	return item
				return {
				  ...item,
				  status: action.status,
				}
			})
		case ActionType.CHANGE_PACK_RATED:
			return state.map(item => {
				if (item.id !== action.id)
					return item
				return {
				  ...item,
				  rated: action.stars,
				}
			})
        default:
            return state
    }
}

export default myPacksReducer
