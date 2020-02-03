import React from 'react'
import { take, call, put, delay } from 'redux-saga/effects'
import { ActionType } from '../Constants'
import { navigate } from '../Utils'
import { serverErrorNotification, isLoading, sendNotification } from './common'
import axios from 'axios'

export function* tryRecoverPasswordSaga() {
	while(true){
		const { email } = yield take(ActionType.TRY_RECOVER_PASSWORD)
		yield call(tryRecoverPassword, email)
	}
}

export function* forceChangePasswordSaga() {
	while(true){
		const data = yield take(ActionType.TRY_RESET_PASSWORD)
		yield call(force, data)
	}
}

function* force({ hash, id, password}) {
	yield isLoading(true)

	try {

		const data = new FormData()
		data.append('hash', hash)
		data.append('id', id)
		data.append('password', password)

		const result = yield axios.post('https://speedster.cristi.club/api/password/force.php', data)

		yield put({type:ActionType.REMOVE_TEMPORARY_ERRORS})
		yield put({type:ActionType.RESET_TEMPORARY_REDUCER})
		yield navigate("/")

		if(result.data.success === "EXPIRED") {
			yield sendNotification({
				type: 'success',
				title: (<span style={{fontWeight: 900}}>SUCCESS</span>),
				message: (<span>Your token expired, please start reset process again</span>)
			})
			return
		}


		yield sendNotification({
			type: 'success',
			title: (<span style={{fontWeight: 900}}>SUCCESS</span>),
			message: (<span>Password changed. You can now login again.</span>)
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

function* tryRecoverPassword(email) {
	yield isLoading(true)

	try {

		const data = new FormData()
		data.append('email', email)

		const result = yield axios.post('https://speedster.cristi.club/api/password/recover.php', data)

		yield put({type:ActionType.REMOVE_TEMPORARY_ERRORS})
		yield put({type:ActionType.RESET_TEMPORARY_REDUCER})
		yield navigate("/")

		yield sendNotification({
			type: 'success',
			title: (<span style={{fontWeight: 900}}>SUCCESS</span>),
			message: (<span>An e-mail has been sent to {email}. Follow the steps to recover your password.</span>)
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
