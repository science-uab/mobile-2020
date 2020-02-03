import { all } from 'redux-saga/effects'
import { tryRecoverPasswordSaga,forceChangePasswordSaga } from './tryRecoverPassword'
import { loginSaga } from './login'
import { closeNotificationSaga } from './closeNotification'
import { registerSaga } from './register'
// import { loggerSaga } from './debugger'
import { updateProfileSaga, updateAvatarSaga,updatePositionSaga,updateScheduleSaga,changePasswordSaga,updatePricesSaga } from './updateProfile'
import { uploadVehicleSaga,deleteVehicleSaga,setActiveVehicleSaga } from './uploadVehicle'
import { sendPacksSaga,cancelPackSaga,ratePackSaga,nextStepSaga } from './sendPacks'

import { masterSaga } from './master' // most important thread

export default function* sagas() {
    yield all([
		// loggerSaga(),
		masterSaga(),
		tryRecoverPasswordSaga(),
		forceChangePasswordSaga(),
		loginSaga(),
		closeNotificationSaga(),
		registerSaga(),
		updateProfileSaga(),
		updateAvatarSaga(),
		updatePositionSaga(),
		uploadVehicleSaga(),
		deleteVehicleSaga(),
		setActiveVehicleSaga(),
		updateScheduleSaga(),
		changePasswordSaga(),
		updatePricesSaga(),
		sendPacksSaga(),
		cancelPackSaga(),
		ratePackSaga(),
		nextStepSaga(),
	])
}
