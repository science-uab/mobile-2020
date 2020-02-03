import { take, call, put} from 'redux-saga/effects'
import { actionType } from '../Utils'
import axios from 'axios'

export function* anunturiSaga(){
    while(true){
        // const {modalStatus, modal} = yield take(actionType)
        const { preluate,sarite } = yield take(actionType.GET_ANUNTURI)
        const anunturi = yield  call(getAnunturi,preluate,sarite)
        yield put({type:actionType.SET_ANUNTURI,anunturi})
        console.log('afasdfa');
        
       
    }
}

function* getAnunturi(preluate,sarite){
    yield put({type:actionType.SET_ANUNTURI_LOADING,status:true})
    try{
        const data = new FormData()
		data.append('preluate', preluate)
		data.append('sarite', sarite)

        const result = yield axios.post('https://moga.cristi.club/api/anunturiBune.php',data)
        
        return result.data.result

    }
    catch(error){
        console.log(error)
        return []
    }
    finally{
        yield put({type:actionType.SET_ANUNTURI_LOADING,status:false})
    }
}
