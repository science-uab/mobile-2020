import {actionType} from '../Utils'

export default function anunturiMiddleware({dispatch,getState}){
    return function(next){
        return function(action){
            //verificari care se fac inainte sa ajunga comanda la store
            if(action.type === actionType.SET_ANUNT_ID){
                const anuntId = getState().temporary.anuntId
                if(action.anuntId === anuntId)
                    return 

            }
            
            next(action)
            //verificari dupa ce sa trimis la store
        }
    }
}
