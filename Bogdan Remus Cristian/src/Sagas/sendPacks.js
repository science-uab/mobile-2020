import React from 'react'
import { take, call, put, delay, select } from 'redux-saga/effects'
import { serverErrorNotification, isLoading, sendNotification } from './common'
import { ActionType } from '../Constants'
import axios from 'axios'

export function* sendPacksSaga() {
	while(true){
		yield take(ActionType.TRY_SEND_PACK)
		yield call(sendpack)
	}
}

export function* cancelPackSaga() {
	while(true){
		const { id } = yield take(ActionType.TRY_CANCEL_PACK)
		yield call(cancelpack, id)
	}
}

export function* ratePackSaga() {
	while(true){
		const { pack, stars } = yield take(ActionType.TRY_RATE_DELIVERY)
		yield call(rate, pack, stars)
	}
}



export function* nextStepSaga() {
	while(true){
		const { pack, message, type } = yield take([ActionType.TRY_ACCEPT_REQUEST_PACK,ActionType.TRY_REFUND_REQUEST_PACK,ActionType.TRY_DECLINE_REQUEST_PACK,ActionType.TRY_PICKED_UP])
		yield call(nextstep, pack, type, message)
	}
}

function* nextstep(pack, action, message) {
	yield isLoading(true)
	try {

		const login = yield select(state => state.login)

		const data = new FormData()
		data.append('token', login.token)
		data.append('id', login.id)
		data.append('pack', pack.id)

		let status = 0

		if(action === ActionType.TRY_ACCEPT_REQUEST_PACK) {
			status = 1
			data.append('status', 1)
		}


		if(action === ActionType.TRY_DECLINE_REQUEST_PACK) {
			status = 4
			data.append('status', 4)
			if(message)
				data.append('denied', message)
		}

		if(action === ActionType.TRY_REFUND_REQUEST_PACK) {
			status = 5
			data.append('status', 5)
			if(message)
				data.append('denied', message)
		}

		if(action === ActionType.TRY_PICKED_UP) {
			status = pack.status+1
			data.append('status', status)
		}

		let result = yield axios.post('https://speedster.cristi.club/api/packs/next.php', data)

		yield put({type: ActionType.CHANGE_PACK_STATUS, id:pack.id, status})

	} catch (error) {
		if(error.response && error.response.data && error.response.data.error)
			yield serverErrorNotification(error.response.data.error)
		else
			yield serverErrorNotification()
	} finally {

		yield isLoading(false)

	}
}

function* rate(pack,stars) {
	yield isLoading(true)
	try {

		const login = yield select(state => state.login)

		const data = new FormData()
		data.append('token', login.token)
		data.append('id', login.id)
		data.append('pack', pack.id)
		data.append('courier', pack.courier)
		data.append('stars', stars)

		let result = yield axios.post('https://speedster.cristi.club/api/packs/rate.php', data)

		yield put({type: ActionType.CHANGE_PACK_RATED, id:pack.id, stars})

		yield sendNotification({
			type: 'success',
			title: 'Information',
			message: (<span>Pack rated successfully.</span>),
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

function* cancelpack(id){
	yield isLoading(true)
	try {

		const login = yield select(state => state.login)

		const data = new FormData()
		data.append('token', login.token)
		data.append('id', login.id)
		data.append('pack', id)

		let result = yield axios.post('https://speedster.cristi.club/api/packs/delete.php', data)

		yield put({type: ActionType.CHANGE_PACK_STATUS, id, status: 6})

		yield sendNotification({
			type: 'success',
			title: 'Information',
			message: (<span>Pack deleted successfully.</span>),
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

function* sendpack() {
	yield isLoading(true)
	try {

		const login = yield select(state => state.login)

		const {
			packType,
			sendPackNrKg,
			receiverName,
			receiverAddress,
			receiverPhone,
			senderAddress,
			sendPackCourier
		} = yield select(state => state.temporary)


		const data = new FormData()
		data.append('token', login.token)
		data.append('id', login.id)
		data.append('type', packType)
		data.append('quantity', sendPackNrKg)
		data.append('courier', sendPackCourier)
		data.append('receivername', receiverName)
		data.append('receiveraddress', receiverAddress)
		data.append('receiverphone', receiverPhone)
		data.append('address', senderAddress)

		// 	  for (var pair of data.entries()) {
		//     console.log(pair[0]+ ', ' + pair[1]);
		// }

		let result = yield axios.post('https://speedster.cristi.club/api/packs/', data)

		const packs = result.data.success

		yield put({type:ActionType.SET_MY_PACKS, packs})

		yield put({type:ActionType.SET_TEMPORARY_VALUE,value:{
			sendPackCourier: 0,
			sendPackNrKg: 1,
			senderName: '',
			receiverName: '',
			receiverAddress: '',
			receiverPhone: '',
			senderAddress: '',
			sendPackError: false,
		}})

		yield sendNotification({
			type: 'success',
			title: 'Information',
			message: (<span>Pack request sent successfully.</span>),
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
