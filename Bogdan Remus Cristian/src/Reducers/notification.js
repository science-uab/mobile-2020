import { ActionType } from '../Constants'

const INITIAL_STATE = {
	type: '',
	title: '',
	message: '',
	isOpen: false,
}

const notificationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
		case ActionType.RESET_NOTIFICATION_REDUCER:
			return {
				...state,
				...INITIAL_STATE,
			}
		case ActionType.CLOSE_NOTIFICATION:
			return {
				...state,
				isOpen: false,
			}
		case ActionType.SEND_PERSISTENT_NOTIFICATION:
		case ActionType.SEND_NOTIFICATION:
			return {
				...state,
				...action.notification,
			}
        default:
            return state
    }
}

export default notificationReducer
