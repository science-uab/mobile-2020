import { actionType } from '../Utils'

const INITIAL_STATE = {

    id:0,
    nume:'',
    prenume:'',
    avatar:'',
    cover:'',
    email:'',
    google:0,
    facebook:0,
    anunturi_gratuite:0,
    telefon:'',
    adresa:'',
    oras: '',
    judet:'',
    tara:'',
    rating:0,
    reported:0,
    blocked:0,
    vip:0,
    nr_anunturi_gratuite:0,
    last_seen:0,
    token:'',
    isLogged: false,
}

const loginReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        
        case actionType.SET_IS_LOGGED:
            return{
                ...state,
                isLogged: true,
            }
        case actionType.SET_AVATAR:
            return{
                ...state,
                avatar:action.avatar
            }
        case actionType.SET_COVER:
            return{
                ...state,
                cover:action.cover
            }
        case actionType.SET_LOGIN_DATA:
            return{
                ...state,
                ...action.value
            }
        
        case actionType.RESET_LOGIN_REDUCER:
            return{
                ...state,
                ...INITIAL_STATE,
            }
        default: 
        return state
    }
}

export default loginReducer