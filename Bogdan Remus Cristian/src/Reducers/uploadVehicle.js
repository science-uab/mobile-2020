import { ActionType } from '../Constants'

const INITIAL_STATE = {
	description: '',
	picture: null,
	close: false,
	isLoading: false,
	type: 0,
}

const uploadVehicleReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
		case ActionType.DO_LOGOUT_CLEANUP:
		case ActionType.RESET_UPLOAD_VEHICLES:
			return {
				...state,
				...INITIAL_STATE,
			}
		case ActionType.SET_UPLOAD_VEHICLES_VALUE:
			return {
				...state,
				...action.value,
			}
        default:
            return state
    }
}

export default uploadVehicleReducer
