import { take, call, put, delay, race } from 'redux-saga/effects'
import { ActionType } from '../Constants'

export function* closeNotificationSaga() {
	while(true){
		yield take(ActionType.SEND_NOTIFICATION)
		// Se lanseaza concomitent timer() + asteapta comanda CLOSE_NOTIFICATION
		// Care dintre ele se executa prima , trece mai departe saga
		const winner = yield race({
            autoclose: call(timer),
            close: take(ActionType.CLOSE_NOTIFICATION)
        })
		if(winner.autoclose)
			yield put({type:ActionType.CLOSE_NOTIFICATION})
	}
}

function* timer() {
	yield delay(3500)
	return true
}
