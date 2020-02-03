import React from 'react'
import { take, call, put, delay } from 'redux-saga/effects'
import { serverErrorNotification, isLoading, sendNotification } from './common'
import { ActionType } from '../Constants'
import axios from 'axios'

const anunturi = [
    {
        promovat: true,
        titlu: 'Vw Passat CC',
        nume:'Lee',
        prenume:'Aurora',
        judet: 'Alba',
        oras: 'Alba Iulia',
        pret: '7800 €',
        telefon: '0760547654',
        views: '0',
        rating: 4,
    },
    {
        promovat: true,
        titlu: 'Vw Passat CC',
        nume:'Lee',
        prenume:'Aurora',
        judet: 'Alba',
        oras: 'Alba Iulia',
        pret: '7800 €',
        telefon: '0760547654',
        views: '0',
        rating: 4,
    },
    {
        promovat: true,
        titlu: 'Vw Passat CC',
        nume:'Lee',
        prenume:'Aurora',
        judet: 'Alba',
        oras: 'Alba Iulia',
        pret: '7800 €',
        telefon: '0760547654',
        views: '0',
        rating: 4,
    },
    {
        promovat: true,
        titlu: 'Vw Passat CC',
        nume:'Lee',
        prenume:'Aurora',
        judet: 'Alba',
        oras: 'Alba Iulia',
        pret: '7800 €',
        telefon: '0760547654',
        views: '0',
        rating: 4,
    },
    {
        promovat: true,
        titlu: 'Vw Passat CC',
        nume:'Lee',
        prenume:'Aurora',
        judet: 'Alba',
        oras: 'Alba Iulia',
        pret: '7800 €',
        telefon: '0760547654',
        views: '0',
        rating: 4,
    },
]

export function* demoSaga() {
	while(true){
		yield take('GET_ARTICLES')
		yield call(functie)
	}
}

function* functie() {
	yield isLoading(true)

	try {

		// const result = axios .....
		yield delay(3000)

		yield put({type:'DELETE_ANUNTURI'})
		yield put({type:'SET_ANUNTURI',anunturi:result.data.anunturi})
		
		throw 'ERROR'

		return anunturi


	} catch (error) {

		yield serverErrorNotification(error)

		return []
	} finally {

		yield isLoading(false)

	}
}
