import { combineReducers } from 'redux'
import login from './login'
import anunturi from './anunturi'
import temporary from './temporary'
import signup from './signup'
const reducers = combineReducers({
    //lista reducere
    login,
    anunturi,
    temporary,
    signup,
})

export default reducers