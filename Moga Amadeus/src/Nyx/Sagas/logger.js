import { takeEvery, select} from 'redux-saga/effects'

export function* loggerSaga(){
    yield takeEvery('*',function* logger(action){
        console.log("ACTION LOG: ",action)

        const state = yield select(state => state)
        console.log("STATE LOG: ",state)
        
        
    })
}