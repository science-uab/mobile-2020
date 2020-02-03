import { ActionType } from '../Constants'

const INITIAL_STATE = [

]

const myVehicleReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
		case ActionType.DO_LOGOUT_CLEANUP:
		case ActionType.RESET_MY_VEHICLES:
			return state.filter(vehicle => vehicle.id !== vehicle.id)
		case ActionType.SET_MY_VEHICLES:
			return state.filter(vehicle => vehicle.id !== vehicle.id).concat(action.vehicles)
		case ActionType.CHANGE_VEHICLE_STATUS:
			return state.map(item => {
				if (item.id !== action.id)
				  	return item
				return {
				  ...item,
				  active: action.status,
				}
			})
		case ActionType.GO_OFFLINE_FROM_WORK:
			return state.map(item => {
				return {
				  ...item,
				  active: false,
				}
			})
        default:
            return state
    }
}

export default myVehicleReducer
