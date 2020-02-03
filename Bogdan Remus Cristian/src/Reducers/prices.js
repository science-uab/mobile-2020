import { ActionType } from '../Constants'

const INITIAL_STATE = {
	envelope: "0.00",
	normal: "0.00",
	extra: "0.00",
	temp: {
		envelope: "0.00",
		normal: "0.00",
		extra: "0.00",
	}
}

const pricesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
		case ActionType.DO_LOGOUT_CLEANUP:
		case ActionType.RESET_PRICES_REDUCER:
			return {
				...state,
				...INITIAL_STATE,
			}
		case ActionType.SET_PRICES_VALUES:
			return {
				...state,
				...state.temp,
			}
		case ActionType.RESET_PRICES_TEMP_VALUES:
			return {
				...state,
				temp: {
					...state.temp,
					...action.values,
				}
			}
		case ActionType.SET_PRICES_TEMP_VALUE:
			return {
				...state,
				temp: {
					...state.temp,
					...action.value,
				}
			}
		case ActionType.SET_PRICES_FROM_SERVER:
			return {
				...state,
				...action.prices,
				temp: {
					...state.temp,
					...action.prices,
				}
			}
        default:
            return state
    }
}

export default pricesReducer
