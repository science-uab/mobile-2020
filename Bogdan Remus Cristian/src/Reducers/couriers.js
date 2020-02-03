import { ActionType } from '../Constants'

const INITIAL_STATE = []

const couriersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
		case ActionType.DO_LOGOUT_CLEANUP:
		case ActionType.RESET_COURIERS_REDUCER:
			return state.filter(courier => courier.id !== courier.id)
		case ActionType.SET_MY_COURIERS:
			return state.filter(courier => courier.id !== courier.id).concat(action.couriers)
        default:
            return state
    }
}

export default couriersReducer
