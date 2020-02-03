import { ActionType } from '../Constants'

const INITIAL_STATE = {
	showBecomeCourier: true,
	showNotifications: true,
}

const settingsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
		case ActionType.DO_LOGOUT_CLEANUP:
		case ActionType.RESET_SETTINGS_REDUCER:
			return {
				...state,
				...INITIAL_STATE,
			}
		case ActionType.SET_SETTINGS_VALUE:
			return {
				...state,
				...action.value,
			}
        default:
            return state
    }
}

export default settingsReducer
