import {ADD_COMANDA, ADD_REZERVARE, ADD_USERSTATE} from './types';

export const addComanda = (detaliiComanda) => (
    {
        type: ADD_COMANDA,
        data: detaliiComanda
    }
);

export const addRezervare = (detaliiRezervare) => (
    {
        type: ADD_REZERVARE,
        data: detaliiRezervare
    }
);

export const addUserDetails = (userDetails ) => (
    {
        type: ADD_USERSTATE,
        data: userDetails
    }
)


