import { combineReducers } from 'redux'
import temporary from './temporary'
import notification from './notification'
import register from './register'
import login from './login'
import settings from './settings'
import updateProfile from './updateProfile'
import schedule from './schedule'
import uploadVehicle from './uploadVehicle'
import myVehicle from './myVehicles'
import couriers from './couriers'
import prices from './prices'
import myPacks from './myPacks'

const reducers = combineReducers({
	temporary,
	notification,
	register,
	login,
	settings,
	updateProfile,
	schedule,
	uploadVehicle,
	myVehicle,
	couriers,
	prices,
	myPacks,
})

export default reducers
