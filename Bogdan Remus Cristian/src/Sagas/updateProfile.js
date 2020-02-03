import React from 'react'
import { takeEvery, take, call, put, select, delay } from 'redux-saga/effects'
import { ActionType } from '../Constants'
import { serverErrorNotification, updateProfileLoading, sendNotification } from './common'
import axios from 'axios'
import { isEqual } from '../Utils'
import qs from 'qs'

export function* updateProfileSaga() {
	yield takeEvery(ActionType.UPDATE_PROFILE, update)
}

export function* updateScheduleSaga() {
	while(true) {
		yield take(ActionType.SET_SCHEDULE_VALUES)
		yield call(schedule)
	}
}

export function* updatePricesSaga() {
	while(true) {
		yield take(ActionType.SET_PRICES_VALUES)
		yield call(prices)
	}
}

export function* updateAvatarSaga() {
	while(true) {
		const { avatar } = yield take(ActionType.TRY_CHANGE_AVATAR)
		yield call(changeAvatar, avatar)
	}
}

export function* changePasswordSaga() {
	while(true) {
		const { password } = yield take(ActionType.CHANGE_PASSWORD)
		yield call(changePassword, password)
	}
}

export function* updatePositionSaga() {
	while(true) {
		const { position } = yield take(ActionType.SET_MY_POSITION)
		yield call(changePosition, position)
		yield delay(10000)
 	}
}

function* changePassword(password) {
	yield updateProfileLoading("password",true)
	try {
		const login = yield select(state => state.login)

		const data = new FormData()
		data.append('token', login.token)
		data.append('id', login.id)
		data.append('password', password)

		yield axios.post('https://speedster.cristi.club/api/password/', data)

		yield sendNotification({
			type: 'success',
			title: 'Information',
			message: (<span>Password changed successfully.</span>),
		})

	} catch (error) {
		if(error.response && error.response.data && error.response.data.error)
			yield serverErrorNotification(error.response.data.error)
		else
			yield serverErrorNotification()
	} finally {
		yield updateProfileLoading("password",false)
	}
}

function* prices() {
	yield updateProfileLoading("prices",true)
	try {
		const login = yield select(state => state.login)
		const { temp, ...oldPrices } = yield select(state => state.prices)

		const data = {
			data: {
				...oldPrices,
				id: login.id,
				token: login.token,
			}
		}

		const result = yield axios.post('https://speedster.cristi.club/api/prices/update.php', qs.stringify(data))

		const prices = result.data.success
		if(!isEqual(prices,oldPrices))
			yield put({type: ActionType.SET_PRICES_FROM_SERVER, prices})

		yield sendNotification({
			type: 'success',
			title: 'Information',
			message: (<span>Prices updated successfully.</span>),
		})
	} catch (error) {
		if(error.response && error.response.data && error.response.data.error)
			yield serverErrorNotification(error.response.data.error)
		else
			yield serverErrorNotification()
	} finally {
		yield updateProfileLoading("prices",false)
	}
}

function* schedule() {
	yield updateProfileLoading("schedule",true)
	try {
		const login = yield select(state => state.login)
		const { temp, ...rest } = yield select(state => state.schedule)

		const data = {
			data: {
				...rest,
				id: login.id,
				token: login.token,
			}
		}

		const result = yield axios.post('https://speedster.cristi.club/api/schedule/update.php', qs.stringify(data))

	} catch (error) {
		if(error.response && error.response.data && error.response.data.error)
			yield serverErrorNotification(error.response.data.error)
		else
			yield serverErrorNotification()
	} finally {
		yield updateProfileLoading("schedule",false)
	}
}

function* changePosition({lat,lng}) {
	try {
		const login = yield select(state => state.login)

		const data = new FormData()
		data.append('token', login.token)
		data.append('id', login.id)
		data.append('latitude', lat)
		data.append('longitude', lng)

		const result = yield axios.post('https://speedster.cristi.club/api/position/', data)

		yield put({type: ActionType.SET_LOGIN_VALUE, value:{lat,lng}})

	} catch (error) {

	}
}

function* changeAvatar(avatar) {
	yield updateProfileLoading("avatar",true)
	try {
		const login = yield select(state => state.login)

		let filename = "notvalid"
		if(login.avatar !== null && avatar !== "none")
			filename = login.avatar.split('.')[0]


		const data = new FormData()
  	  	data.append('avatar', avatar)
		data.append('token', login.token)
		data.append('id', login.id)
		if(avatar !== "none")
			data.append('filename', filename)

		// 	  for (var pair of data.entries()) {
		//     console.log(pair[0]+ ', ' + pair[1]);
		// }

		const result = yield axios.post('https://speedster.cristi.club/api/avatar/', data)
		if(avatar !== "none")
			yield put({type: ActionType.SET_LOGIN_VALUE, value:{avatar:result.data.success.avatar} })
		else
			yield put({type: ActionType.SET_LOGIN_VALUE, value:{avatar:null} })

	} catch (error) {
		if(error.response && error.response.data && error.response.data.error)
			yield serverErrorNotification(error.response.data.error)
		else
			yield serverErrorNotification()
	} finally {
		yield updateProfileLoading("avatar",false)
	}
}

function* update(action) {
	const key = Object.keys(action.value)[0]
	yield updateProfileLoading(key,true)
	try {
		yield put({type:ActionType.SET_LOGIN_VALUE, value: action.value})

		const data = yield select(state => state.login)

		const send = {data: {
			...data,
			...action.value,
			working: data.working ? 1 : 0,
			outside: data.outside ? 1 : 0,
			share: data.share ? 1 : 0,
			becomeCourier: data.becomeCourier ? 1 : 0,
		}}

		const login = yield axios.post('https://speedster.cristi.club/api/update/', qs.stringify(send))

		const value = {
			...login.data.success
		}

		yield put({type: ActionType.SET_LOGIN_VALUE, value})

		yield sendNotification({
			type: 'success',
			title: 'Information',
			message: (<span>Profile updated.</span>),
		})

		if(key === 'working' && value.working === false)
			yield put({type: ActionType.GO_OFFLINE_FROM_WORK})


	} catch (error) {
		yield put({type:ActionType.SET_LOGIN_VALUE, value: action.reverse})
		if(error.response && error.response.data && error.response.data.error)
			yield serverErrorNotification(error.response.data.error)
		else
			yield serverErrorNotification()
	} finally {
		yield updateProfileLoading(key,false)
	}
}
