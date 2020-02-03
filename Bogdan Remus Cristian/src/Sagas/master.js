import React from 'react'
import { serverErrorNotification, isLoading, sendNotification } from './common'
import { take, put, call, fork, cancel, cancelled, delay, select } from 'redux-saga/effects'
import { ActionType } from '../Constants'
import { isEqual } from '../Utils'
import axios from 'axios'
import qs from 'qs'

function* backgroundProcess() {
	try {
		while (true) {

			try {
				const oldCouriers = yield select(state => state.couriers)
				const oldVehicles = yield select(state => state.myVehicle)
				const oldPacks = yield select(state => state.myPacks)
				let oldPrices = yield select(state => state.prices)
				oldPrices = {
					envelope: oldPrices.envelope,
					normal: oldPrices.normal,
					extra: oldPrices.extra,
				}
				const { temp, ...oldSchedule } = yield select(state => state.schedule)
				const login = yield select(state => state.login)
				const data = new FormData()
				data.append('token', login.token)
				data.append('id', login.id)
				data.append('city', login.city)

				let result = yield axios.post('https://speedster.cristi.club/api/couriers/', data)


				const couriers = result.data.success.map(courier => {
					let vehicle = courier.vehicles.filter(v => v.active === true)
					courier.vehicle = (vehicle[0] && vehicle[0].type > 0) ?  vehicle[0].type : courier.vehicles[0].type
					return courier
				})

				if(!isEqual(oldCouriers,couriers))
					yield put({type:ActionType.SET_MY_COURIERS, couriers})

				result = yield axios.post('https://speedster.cristi.club/api/getinfos/', data)

				const { packs, prices, vehicles, schedule, ...value } = result.data.success

				if(!isEqual(vehicles,oldVehicles))
					yield put({type: ActionType.SET_MY_VEHICLES, vehicles})

				if(!isEqual(login,value))
					yield put({type: ActionType.SET_LOGIN_VALUE, value})

				if(!isEqual(schedule,oldSchedule) && schedule.start && schedule.end)
					yield put({type: ActionType.SET_SCHEDULE_FROM_SERVER, schedule})

				if(!isEqual(prices,oldPrices))
					yield put({type: ActionType.SET_PRICES_FROM_SERVER, prices})

				if(!isEqual(packs,oldPacks))
					yield put({type: ActionType.SET_MY_PACKS, packs})

			} catch (error) {
				if(error.response && error.response.data && error.response.data.error === 'FORCELOGOUT') {

					yield put({type:ActionType.SEND_PERSISTENT_NOTIFICATION, notification: {
						type: 'error',
						title: (<span style={{fontWeight: 900}}>ERROR</span>),
						message: (<span>Someone else logged into this account. You can login from one device only.</span>),
						isOpen: true,
					}})
					yield put({type: ActionType.DO_LOGOUT_CLEANUP})

				}
			} finally {
				yield delay(5000)
			}


		}
	} finally {
		if (yield cancelled())
		  	return
	}
}

export function* masterSaga() {
  while (yield take(ActionType.START_SYNC_APP)) {
    const backgroundRefresh = yield fork(backgroundProcess)

    yield take([ActionType.STOP_SYNC_APP,ActionType.DO_LOGOUT_CLEANUP])

    yield cancel(backgroundRefresh)
  }
}
