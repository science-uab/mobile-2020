import { ActionType } from '../Constants'
import { validateEmail } from '../Utils'
import React from 'react'
import Badge from '@material-ui/core/Badge'

export default function sendPackMiddleware({ dispatch, getState }) {
  return function(next) {
	return function(action) {
		if(action.type === ActionType.TRY_SEND_PACK) {
			let error = []

			const {
				packType,
				sendPackNrKg,
				receiverName,
				receiverAddress,
				receiverPhone,
				sendPackError,
				senderAddress
			} = getState().temporary

			if(sendPackNrKg < 1 || isNaN(sendPackNrKg))
				error.push(packType !== 1 ? "Check no. of kg" : "Check no. of envelopes")

			if(senderAddress.length < 6)
				error.push("Check your address")

			if(receiverName.length < 3)
				error.push("Check receiver's name")

			if(receiverAddress.length < 6)
				error.push("Check receiver's address")

			if(receiverPhone.length < 8 || isNaN(receiverPhone))
				error.push("Check receiver's phone number")

			if(error.length) {
				dispatch({type:ActionType.SET_TEMPORARY_VALUE, value:{sendPackError:true}})
				return dispatch({type:ActionType.SEND_NOTIFICATION, notification: {
					type: 'error',
					title: (<span style={{fontWeight: 900}}>SENDING PACK ERROR{error.length > 1 && 'S'}</span>),
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

			dispatch({type:ActionType.SET_TEMPORARY_VALUE, value:{sendPackError:false}})
		}

		next(action)

	}
  }
}
