import {createSelector} from 'reselect'

//slectori pt reducer login

export const selectAnuntData = createSelector(
    state => state.anunturi.anunturi, // pune te rog o tema alba
	state => state.temporary.anuntId,
	(anunturi,id) => {
        let anunt = anunturi.filter(anunt => anunt.id === id)
        // asta de deasupra e un array cu anuntu dorit (deci are length = 1)
        if(!anunt.length)
            return {}
		return anunt[0]
	}
)

export const selectSignupData = createSelector(
    state => state.login,
    userData => {
        return{
            email:userData.email,
            password:userData.isLoading,
            repeatPassword:userData.isLogged
        }
    }
)

export const selectBlobAvatar = createSelector(
    state => state.temporary.blobAvatar,
    blobAvatar => blobAvatar
)

export const selectBlobCover = createSelector(
    state => state.temporary.blobCover,
    blobCover => blobCover
)

export const selectAnuntId = createSelector(
    state => state.temporary.anuntId,
    anuntId => anuntId,
)

export const selectIsLogged = createSelector(
    state => state.login.isLogged,
    isLogged => isLogged
)

export const selectLoginErrors = createSelector(
    state => state.temporary.errors,
    loginError => loginError
)

export const selectModalStatus = createSelector(
    state => state.temporary,
    modalData => {
        return{
            modalStatus:modalData.modalStatus,
            modal:modalData.modal,
        }
    }
)

export const selectAnunturi = createSelector(
    state => state.anunturi,
    anunturi =>{
        return{
            anunturi:anunturi.anunturi,
        }
    }
)

export const selectLoginData = createSelector(
    state => state.login,
    loginData => loginData
)