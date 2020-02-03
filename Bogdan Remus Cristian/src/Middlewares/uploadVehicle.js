import { ActionType } from '../Constants'
import { validateEmail } from '../Utils'
import React from 'react'
import Badge from '@material-ui/core/Badge'

export default function uploadVehicleMiddleware({ dispatch, getState }) {
  return function(next) {
	return function(action) {
		if(action.type === ActionType.TRY_UPLOAD_VEHICLE) {
			let error = []
			const {
				description,
				picture,
				type,
				close
			} = getState().uploadVehicle

			if(description.length < 6)
				error.push("Description must be longer")

			if(!type)
				error.push("Select a type")

			if(!picture)
				error.push("Select a picture")

			if(error.length)
				return dispatch({type:ActionType.SEND_NOTIFICATION, notification: {
					type: 'error',
					title: (<span style={{fontWeight: 900}}>VEHICLE ERROR{error.length > 1 && 'S'}</span>),
					message: (<div>
								{error.map((message,index) => {
		   							return (<p style={{lineHeight: 0}} key={index}>
		   								<Badge style={{marginLeft: '3px',marginRight: '3px'}} color="error" variant="dot" anchorOrigin={{vertical: 'top',horizontal:'left'}}> </Badge> {message}
		   							</p>)
		   						})}
							</div>),
					isOpen: true,
				}})
		}

		if(action.type === ActionType.TRY_DELETE_VEHICLE) {
			const length = getState().myVehicle.length

			if(length === 1)
			 	return dispatch({type:ActionType.SEND_NOTIFICATION, notification: {
					type: 'error',
					title: (<span style={{fontWeight: 900}}>INFORMATION</span>),
					message: (<span>You can't remove the last vehicle</span>),
					isOpen: true,
				}})
				
			if(action.vehicle.active)
				return dispatch({type:ActionType.SEND_NOTIFICATION, notification: {
					type: 'error',
					title: (<span style={{fontWeight: 900}}>INFORMATION</span>),
					message: (<span>You must first go offline from work in order to delete this vehicle</span>),
					isOpen: true,
				}})


		}

		next(action)

	}
  }
}
