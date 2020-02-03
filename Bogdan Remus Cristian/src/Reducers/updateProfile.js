import { ActionType } from '../Constants'

const INITIAL_STATE = {
	firstName: false,
	lastName: false,
	avatar: false,
	email: false,
	phone: false,
	address: false,
	city: false,
	schedule: false,
	courier: false,
	working: false,
	outside: false,
	share: false,
	modal: false,
	password: false,
}

const updateProfileReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
		case ActionType.DO_LOGOUT_CLEANUP:
		case ActionType.RESET_UPDATE_PROFILE_REDUCER:
			return {
				...state,
				...INITIAL_STATE,
			}
		case ActionType.SET_UPDATE_PROFILE_VALUE:
			return {
				...state,
				...action.value,
			}
		case ActionType.SET_OPEN_EDIT_PROFILE_MODAL:
			return {
				...state,
				modal: action.status,
			}
        default:
            return state
    }
}

export default updateProfileReducer
