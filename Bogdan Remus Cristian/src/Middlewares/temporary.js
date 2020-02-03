import { ActionType } from '../Constants'
import { validateEmail } from '../Utils'
import React from 'react'
import Badge from '@material-ui/core/Badge'
import moment from 'moment'

export default function temporaryMiddleware({ dispatch, getState }) {
  return function(next) {
	return function(action) {
		if(action.type === ActionType.TRY_LOGIN) {
			let error = false
			const { email, password, emailError, passwordError } = getState().temporary
			if(!validateEmail(email)) {
				error = true
				dispatch({type:ActionType.SET_TEMPORARY_VALUE,value: {emailError:true} })
			} else if(emailError)
				dispatch({type:ActionType.SET_TEMPORARY_VALUE,value: {emailError:false} })

			if(password.length < 6) {
				error = true
				dispatch({type:ActionType.SET_TEMPORARY_VALUE,value: {passwordError:true} })
			} else if (passwordError)
				dispatch({type:ActionType.SET_TEMPORARY_VALUE,value: {passwordError:false} })

			if(error)
				return dispatch({type:ActionType.SEND_NOTIFICATION, notification: {
					type: 'error',
					title: (<span style={{fontWeight: 900}}>INCOMPLETE INFORMATION</span>),
					message: (<span>In order to access your account, fields marked with <Badge style={{marginLeft: '3px',marginRight: '3px'}} color="error" variant="dot" anchorOrigin={{vertical: 'top',horizontal:'left'}}> </Badge> are mandatory.</span>),
					isOpen: true,
				}})

			action.response = {
				email,
				password,
				platform: 'Speedster',
			}
		}

		if(action.type === ActionType.TRY_RECOVER_PASSWORD) {
			const { email } = action
			if(!validateEmail(email)) {
				dispatch({type:ActionType.SEND_NOTIFICATION, notification: {
					type: 'error',
					title: (<span style={{fontWeight: 900}}>WRONG E-MAIL</span>),
					message: (<span>In order to recover your account, fields marked with <Badge style={{marginLeft: '3px',marginRight: '3px'}} color="error" variant="dot" anchorOrigin={{vertical: 'top',horizontal:'left'}}> </Badge> are mandatory.</span>),
					isOpen: true,
				}})
				return dispatch({type:ActionType.SET_TEMPORARY_VALUE,value: {emailError:true}})
			}
		}

		if(action.type === ActionType.TRY_SET_UPDATE_PROFILE_VALUE) {
			const key = Object.keys(action.value)[0]
			const value = getState().login[key]

			if(value == action.value[key]) // don't dispatch anything if trying to update to same value
				return

			action.reverse = { // backup just in case we get server error , so we can reverse the process
				[key]: value,
			}

			return dispatch({type:ActionType.UPDATE_PROFILE, value:action.value, reverse: action.reverse})
		}

		if(action.type === ActionType.SEND_NOTIFICATION) {
			const showNotifications = getState().settings.showNotifications
			if(!showNotifications)
				return
		}


		if(action.type === ActionType.SET_SCHEDULE_TEMP_VALUE) {
			if(action.value && action.value.start)
				action.value.start = moment(action.value.start).format('HH:mm')

			if(action.value && action.value.end)
				action.value.end = moment(action.value.end).format('HH:mm')

			if(action.value.end === null)
				action.value.end = "00:00"

			if(action.value.start === null)
				action.value.start = "00:00"
		}

		if(action.type === ActionType.RESET_SCHEDULE_TEMP_VALUES) {
			const { temp, ...values } = getState().schedule
			action.values = values
		}

		if(action.type === ActionType.RESET_PRICES_TEMP_VALUES) {
			const { temp, ...values } = getState().prices
			action.values = values
		}

		if(action.type === ActionType.SET_TEMPORARY_VALUE) {
			// const oldRoute = getState().temporary.route
			// if(action.value && action.value.route)
			// 	action.value = {
			// 		route: action.value.route,
			// 		oldRoute: oldRoute,
			// 	}
			if(action.value && action.value.sendPackNrKg) {
				if(isNaN(action.value.sendPackNrKg))
					return
			}
		}

		if(action.type === ActionType.SET_MY_POSITION) {
			if(!(action.position.lat && action.position.lng))
				return
		}

		if(action.type === ActionType.CHANGE_TAB) {
			const { activeTab } = getState().temporary
			if(activeTab === action.tab)
				return
		}

		if(action.type === ActionType.TRY_RESET_PASSWORD) {
			const { newPass, newPass2 } = getState().temporary
			if(newPass < 6 || newPass !== newPass2)
				return
			action.password = newPass
		}

		next(action)



	}
  }
}
