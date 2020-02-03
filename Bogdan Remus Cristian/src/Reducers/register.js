import { ActionType } from '../Constants'

const INITIAL_STATE = {
	firstName: '',
	lastName: '',
	email: '',
	newPass: '',
	newPass2: '',
	// phone: '',
	// address: '',
	firstNameError: false,
	lastNameError: false,
	emailError: false,
	newPassError: false,
	newPassError2: false,
}

const registerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
		case ActionType.DO_LOGOUT_CLEANUP:
		case ActionType.RESET_REGISTER_REDUCER:
			return {
				...state,
				...INITIAL_STATE,
			}
		case ActionType.SET_REGISTER_VALUE:
			return {
				...state,
				...action.value,
			}
		case ActionType.REMOVE_TEMPORARY_ERRORS:
			return {
				...state,
				firstNameError: false,
				lastNameError: false,
				emailError: false,
				newPassError: false,
				newPassError2: false,
			}
        default:
            return state
    }
}

export default registerReducer
