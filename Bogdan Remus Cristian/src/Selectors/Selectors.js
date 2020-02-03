import {createSelector} from 'reselect'

// temporaryReducer

export const temporarySelector = createSelector(state => state.temporary, temporary => {
    const {email, emailError, password, passwordError, isLoading} = temporary
    return {email, emailError, password, passwordError, isLoading}
})

export const newPassSelector = createSelector(state => state.temporary, temporary => {
    const {newPass, newPass2, newPassError, newPassError2, hashError} = temporary
    return {newPass, newPass2, newPassError, newPassError2, hashError}
})

export const viewModalProfileSelector = createSelector(state => state.temporary.viewModalProfile, id => id)

export const viewModalCarPictureSelector = createSelector(state => state.temporary.viewModalCarPicture, id => id)

export const searchValueSelector = createSelector(state => state.temporary.searchValue, search => search)

export const activeTabSelector = createSelector(state => state.temporary.activeTab, tab => tab)

export const isLoadingSelector = createSelector(state => state.temporary.isLoadingSelector, isLoading => isLoading)

// notificationReducer

export const notificationSelector = createSelector(state => state.notification, notification => notification)

// registerReducer

export const registerSelector = createSelector(state => state.register, register => register)
export const myPositionSelector = createSelector(
	state => state.login,
	data => {
		return {
			lat: data.lat,
			lng: data.lng,
			avatar: data.avatar,
		}
	}
)

// loginReducer

export const isLoggedSelector = createSelector(state => state.login.isLogged, isLogged => isLogged)
export const loginSelector = createSelector(state => state.login, login => login)

// settingsReducer

export const showBecomeCourierSelector = createSelector(
	state => state.settings.showBecomeCourier,
	state => state.login.courier,
	(become,courier) => {
		return {
			courier,
			become,
		}
	}
)
export const showNotificationsSelector = createSelector(state => state.settings.showNotifications, notify => notify)
// updateProfileReducer

export const isLoadingProfileSelector = createSelector(state => state.updateProfile, isLoading => isLoading)

// scheduleReducer

export const scheduleSelector = createSelector(state => state.schedule, schedule => schedule)

// uploadVehicleReducer

export const uploadVehicleSelector = createSelector(state => state.uploadVehicle, upload => upload)


// couriersReducer

export const couriersSelector = createSelector(
	state => state.couriers,
	searchValueSelector,
	(couriers,search) => couriers.filter(courier => courier.name.toLowerCase().includes(search.toLowerCase()))
)

export const onlineCouriersSelector = createSelector(
	state => state.couriers,
	couriers => couriers.filter(courier => courier.working === true),
)

export const profileCourierSelector = createSelector(
	state => state.couriers,
	state => state.temporary.viewModalProfile,
	(couriers,id) => {
		const courier = couriers.filter(courier => courier.id === id)
		return courier[0]
	}
)

export const offlineCouriersSelector = createSelector(
	state => state.couriers,
	couriers => couriers.filter(courier => courier.working === false)
)

export const pricesSelector = createSelector(
	state => state.prices,
	state => state.login.outside,
	state => state.temporary.isLoading,
	(prices, outside, isLoading) => {
		return {
			...prices,
			outside,
			isLoading
		}
	}
)

export const sendPackSelector = createSelector(
	state => state.temporary,
	state => state.couriers,
	state => state.login,
	(temporary,couriers,login) => {
		let type = temporary.packType

		const getVehicles = (packType,vehicle) => {
			if(packType < 4 && vehicle < 9 && packType > 0)
				return true
			if(packType === 4 && vehicle > 5 && vehicle < 10)
				return true
			if(packType === 5 && vehicle === 9)
				return true
			if(packType === 6 && vehicle === 10)
				return true
			return false
		}

		let okCouriers = couriers.filter(courier => getVehicles(type,parseInt(courier.vehicle)))
		let chosenCourier = okCouriers.filter(courier => courier.id === temporary.sendPackCourier)
		let price = 0

		if(chosenCourier && chosenCourier[0]) {
			price = (temporary.sendPackNrKg * (type !== 1  ? chosenCourier[0].prices.normal : chosenCourier[0].prices.envelope))
		}

		return {
			couriers: okCouriers,
			packType: type,
			sendPackCourier: temporary.sendPackCourier,
			courier: chosenCourier,
			quantity: temporary.sendPackNrKg,
			sender: login.displayName,
			changedSender: temporary.senderName,
			address: temporary.senderAddress,
			receiver: temporary.receiverName,
			receiveraddress: temporary.receiverAddress,
			receiverphone: temporary.receiverPhone,
			error: temporary.sendPackError,
			price: price,
			phone: login.phone,
			isLoading: temporary.isLoading,
		}
	}
)

export const myPacksSelector = createSelector(
	state => state.myPacks,
	state => state.login.id,
	state => state.temporary.packId,
	state => state.temporary.isLoading,
	(packs,id,packId,isLoading) => {
		id = parseInt(id)
		const active = packs.filter(pack => pack.status < 3 && pack.courier !== id)
		const archive = packs.filter(pack => pack.status > 2 && pack.courier !== id)
		let currentPack = packs.filter(pack => pack.id === packId)
		if(currentPack && currentPack[0])
			currentPack = currentPack[0]
		return {
			active,
			archive,
			packId,
			current: currentPack,
			isLoading,
		}
	}
)

export const myPackRequestsSelector = createSelector(
	state => state.myPacks,
	state => state.login.id,
	state => state.temporary.isLoading,
	state => state.temporary.packIdCourier,
	(packs,id,isLoading,packId) => {
		id = parseInt(id)
		const requests = packs.filter(pack => pack.status === 0 && pack.courier === id)
		const active = packs.filter(pack => (pack.status === 1 || pack.status === 2) && pack.courier === id)
		const archive = packs.filter(pack => pack.status > 2 && pack.courier === id)
		let currentPack = packs.filter(pack => pack.id === packId)
		if(currentPack && currentPack[0])
			currentPack = currentPack[0]
		return {
			requests,
			active,
			archive,
			isLoading,
			packId,
			current: currentPack,
		}
	}
)

export const packRequestsSelector = createSelector(
	myPackRequestsSelector,
	pack => pack.requests.length
)
