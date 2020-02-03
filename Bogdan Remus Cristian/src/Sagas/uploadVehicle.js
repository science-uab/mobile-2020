import React from 'react'
import { take, call, put, delay, select } from 'redux-saga/effects'
import { serverErrorNotification, isLoading, sendNotification } from './common'
import { ActionType } from '../Constants'
import axios from 'axios'

export function* uploadVehicleSaga() {
	while(true){
		yield take(ActionType.TRY_UPLOAD_VEHICLE)
		yield call(add)
	}
}

export function* deleteVehicleSaga() {
	while(true) {
		const { vehicle } = yield take(ActionType.TRY_DELETE_VEHICLE)
		yield call(remove, vehicle)
	}
}

export function* setActiveVehicleSaga() {
	while(true) {
		const { id } = yield take(ActionType.CHANGE_VEHICLE_STATUS)
		yield call(activate, id)
	}
}

function* add() {
	yield put({type:ActionType.SET_UPLOAD_VEHICLES_VALUE,value:{isLoading:true}})
	try {
		const vehicle = yield select(state => state.uploadVehicle)
		const login = yield select(state => state.login)
		const length = yield select(state => state.myVehicle.length)

		const first = length < 1

		const data = new FormData()
		data.append('picture', vehicle.picture)
		data.append('type', vehicle.type)
		data.append('description', vehicle.description)
		data.append('token', login.token)
		data.append('id', login.id)
		data.append('first', first)
		data.append('filename', 'notvalid')

		const result = yield axios.post('https://speedster.cristi.club/api/vehicle/', data)

		const vehicles = result.data.success

		yield put({type: ActionType.SET_MY_VEHICLES, vehicles})

		if(first) {
			yield put({type: ActionType.SET_LOGIN_VALUE,value:{becomeCourier:true}})
			yield put({type: ActionType.SET_SETTINGS_VALUE,value:{showBecomeCourier:false}})
		}

		yield sendNotification({
			type: 'success',
			title: 'Information',
			message: (<span>Your car needs to be aproved in order to be used. Thank you</span>),
		})

		yield put({type:ActionType.SET_UPLOAD_VEHICLES_VALUE,value:{close:true}})
		yield put({type:ActionType.RESET_UPLOAD_VEHICLES})

	} catch (error) {
		if(error.response && error.response.data && error.response.data.error)
			yield serverErrorNotification(error.response.data.error)
		else
			yield serverErrorNotification()
	} finally {

		yield put({type:ActionType.SET_UPLOAD_VEHICLES_VALUE,value:{isLoading:false}})

	}
}

function* remove(vehicle) {
	yield isLoading(true)

	try {
		const login = yield select(state => state.login)
		const data = new FormData()
		data.append('vehicle', vehicle.id)
		data.append('token', login.token)
		data.append('id', login.id)

		const result = yield axios.post('https://speedster.cristi.club/api/deletevehicle/', data)

		const vehicles = result.data.success

		yield put({type: ActionType.SET_TEMPORARY_VALUE, value:{viewModalCarPicture:0}})
		yield put({type: ActionType.SET_MY_VEHICLES, vehicles})

		yield sendNotification({
			type: 'success',
			title: 'Information',
			message: (<span>Vehicle removed succesfully</span>),
		})

	} catch(error) {
		// console.log('error', error)
		// console.log('error.response', error.response)
		// console.log('error.response.data', error.response.data)
		if(error.response && error.response.data && error.response.data.error)
			yield serverErrorNotification(error.response.data.error)
		else
			yield serverErrorNotification()
	} finally {
		yield isLoading(false)
	}
}

function* activate(id) {
	yield isLoading(true)

	try {
		const login = yield select(state => state.login)
		const data = new FormData()
		data.append('vehicle', id)
		data.append('token', login.token)
		data.append('id', login.id)

		const result = yield axios.post('https://speedster.cristi.club/api/activatevehicle/', data)

	} catch(error) {
		yield put({type: ActionType.CHANGE_VEHICLE_STATUS, id, status: false})
		if(error.response && error.response.data && error.response.data.error)
			yield serverErrorNotification(error.response.data.error)
		else
			yield serverErrorNotification()
	} finally {
		yield isLoading(false)
	}
}
