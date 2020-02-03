import React from 'react'
import { take, call, put, delay, select } from 'redux-saga/effects'
import { ActionType } from '../Constants'
import { navigate } from '../Utils'
import { serverErrorNotification, isLoading, sendNotification } from './common'
import axios from 'axios'
import qs from 'qs'

export function* registerSaga() {
	while(true){
		yield take(ActionType.TRY_REGISTER)
		const data = yield select(state => state.register)
		yield call(register, data)
	}
}

function* register(data) {
	yield isLoading(true)
	const send = {data: {...data,platform:'Speedster'}}
	
	try {
		const register = yield axios.post('https://speedster.cristi.club/api/register/', qs.stringify(send))

		yield navigate('/')
		yield delay(100)
		yield sendNotification({
			type: 'success',
			title: 'ACCOUNT CREATED',
			message: (<span>Now you can proceed with login.</span>),
		})

	} catch (error) {
		if(error.response && error.response.data && error.response.data.error)
			yield serverErrorNotification(error.response.data.error)
		else
			yield serverErrorNotification()
	} finally {
		yield isLoading(false)
	}
}
