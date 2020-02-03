import { ActionType } from '../Constants'

const INITIAL_STATE = {
	sun: false,
	mon: false,
	thu: false,
	wen: false,
	tue: false,
	fri: false,
	sat: false,
	start: '00:00',
	end: '00:00',
	temp: {
		sun: false,
		mon: false,
		thu: false,
		wen: false,
		tue: false,
		fri: false,
		sat: false,
		start: '00:00',
		end: '00:00',
	}
}

const scheduceReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
		case ActionType.DO_LOGOUT_CLEANUP:
		case ActionType.RESET_SCHEDULE_REDUCER:
			return {
				...state,
				...INITIAL_STATE,
			}
		case ActionType.SET_SCHEDULE_VALUES:
			return {
				...state,
				...state.temp,
			}
		case ActionType.RESET_SCHEDULE_TEMP_VALUES:
			return {
				...state,
				temp: {
					...state.temp,
					...action.values,
				}
			}
		case ActionType.SET_SCHEDULE_TEMP_VALUE:
			return {
				...state,
				temp: {
					...state.temp,
					...action.value,
				}
			}
		case ActionType.SET_SCHEDULE_FROM_SERVER:
			return {
				...state,
				...action.schedule,
				temp: {
					...state.temp,
					...action.schedule,
				}
			}
        default:
            return state
    }
}

export default scheduceReducer
