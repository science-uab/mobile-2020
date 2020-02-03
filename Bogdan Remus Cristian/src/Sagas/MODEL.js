import React from 'react'
import { take, call, put, delay } from 'redux-saga/effects'
import { serverErrorNotification, isLoading, sendNotification } from './common'
import { ActionType } from '../Constants'
import axios from 'axios'

export function* checkHashSaga() {
	while(true){
		const { parametru } = yield take(ActionType.ASPECTED)
		yield call(functie, parametru)
	}
}

function* functie(hash, id) {
	yield isLoading(true)

	try {


	} catch (error) {

		yield serverErrorNotification(error)

	} finally {

		yield isLoading(false)

	}
}
