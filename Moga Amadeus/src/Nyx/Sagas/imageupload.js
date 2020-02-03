import { take, call, put, select} from 'redux-saga/effects'
import { actionType } from '../Utils'
import axios from 'axios'

export function* imageuploadSaga(){
    while(true){
        yield take(actionType.TRY_IMAGE_UPLOAD)
        yield call(imageupload)
        
        
    }
}

function* imageupload(){
    yield put({type:actionType.SET_IMAGE_UPLOAD_LOADING,status:true})
    try{
        const {selectedFile, imageType} = yield select(state => state.temporary)
        const {id} = yield select(state => state.login)
        const data = new FormData()
		data.append('selectedFile', selectedFile)
        data.append('imageType', imageType)
        data.append('id',id)

        const uploadResult = yield axios.post('http://moga.cristi.club/api/uploadImage.php',data,{
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        const imagine = uploadResult.data.result
        if(imageType === 'avatar')
            yield put({type: actionType.SET_AVATAR, avatar:imagine})
        else if(imageType === 'cover')
            yield put({type: actionType.SET_COVER, cover:imagine})
        console.log("RETURNED OBJ",imagine);
       

        // return login.data.login
    }
    catch(error){
        // console.log("A INTERVENIT O EROAREa", error.response.data.error)
        console.log("ERROR",error.response);
        
    }
    finally{
        yield put({type:actionType.SET_IMAGE_UPLOAD_LOADING,status:false})
    }
}