import { all } from 'redux-saga/effects'
import { loggerSaga } from './logger'
import { loginSaga } from './login'
import { anunturiSaga } from './anunturi'
import {imageuploadSaga} from './imageupload'
import {signupSaga} from './signup'
export default function* sagas(){
    yield all([
        //lista sagauri ex saga1(),
        loggerSaga(),
        loginSaga(),
        anunturiSaga(),
        imageuploadSaga(),
        signupSaga(),
    ])
}