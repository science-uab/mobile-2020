import { ADD_COMANDA, ADD_REZERVARE, ADD_USERSTATE } from '../actions/types'

const initialState = {
    userState: {
        token: "",
        serverIP: "",
        logedIn: false,
        loadingData: true,
    },
    comandaDetalii: {
    },
    rezervareDetalii: {
    }
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COMANDA:
            // add comanda aici
            comandaDetalii = action.data
            return;
        case ADD_REZERVARE:
            // add rezervare aici
            rezervareDetalii = action.data
            return;
        case ADD_USERSTATE:
            console.log("adding userdata" + JSON.stringify(action.data));
            return {
                ...state,
                userState: action.data
            }
        default:
            return state;
    }
}

export default appReducer;