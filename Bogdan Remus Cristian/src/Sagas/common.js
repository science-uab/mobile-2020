import React from 'react'
import { ActionType } from '../Constants'
import { take, call, put, delay } from 'redux-saga/effects'

const debug = false

export function* serverErrorNotification(error) {
	debug && console.log('Server ERROR SAGA',error)
	yield put({type:ActionType.SEND_NOTIFICATION, notification: {
		type: 'error',
		title: (<span style={{fontWeight: 900}}>ERROR</span>),
		message: (<span>{error || "Something went wrong, try again."}</span>),
		isOpen: true,
	}})
}

export function* isLoading(status) {
	debug && console.log('Change isLoading to', status)
	yield put({type:ActionType.SET_IS_LOADING, status})
}

export function* updateProfileLoading(name,status) {
	yield put({type:ActionType.SET_UPDATE_PROFILE_VALUE, value: {[name]: status}})
}

export function* sendNotification({type, title, message}) {
	debug && console.log('Sending notification with message', message)
	yield put({type:ActionType.SEND_NOTIFICATION, notification: {
		type,
		title,
		message,
		isOpen: true,
	}})
}
