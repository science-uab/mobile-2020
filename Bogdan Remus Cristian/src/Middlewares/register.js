import { ActionType } from '../Constants'
import { validateEmail } from '../Utils'
import React from 'react'
import Badge from '@material-ui/core/Badge'

export default function temporaryMiddleware({ dispatch, getState }) {
  return function(next) {
	return function(action) {
		if(action.type === ActionType.TRY_REGISTER) {
			let error = []
			const {
				firstName,
				lastName,
				email,
				newPass,
				newPass2,
				// phone,
				// address,
				firstNameError,
				lastNameError,
				emailError,
				newPassError,
				newPassError2  } = getState().register

			if(!validateEmail(email)) {
				error.push("Check e-mail address")
				dispatch({type:ActionType.SET_REGISTER_VALUE,value: {emailError:true} })
			} else if(emailError)
				dispatch({type:ActionType.SET_REGISTER_VALUE,value: {emailError:false} })

			if(newPass.length < 6) {
				dispatch({type:ActionType.SET_REGISTER_VALUE,value: {newPassError:true} })
			} else if (newPassError)
				dispatch({type:ActionType.SET_REGISTER_VALUE,value: {newPassError:false} })

			if(newPass2.length < 6) {
				dispatch({type:ActionType.SET_REGISTER_VALUE,value: {newPassError2:true} })
			} else if (newPassError2)
				dispatch({type:ActionType.SET_REGISTER_VALUE,value: {newPassError2:false} })

			if(newPass.length < 6 || newPass2.length < 6 || newPass !== newPass2)
				error.push("Check password")

			if(firstName.length < 3) {
				error.push("Check fist name")
				dispatch({type:ActionType.SET_REGISTER_VALUE,value: {firstNameError:true} })
			} else if (newPassError)
				dispatch({type:ActionType.SET_REGISTER_VALUE,value: {firstNameError:false} })

			if(lastName.length < 3) {
				error.push("Check last name")
				dispatch({type:ActionType.SET_REGISTER_VALUE,value: {lastNameError:true} })
			} else if (newPassError)
				dispatch({type:ActionType.SET_REGISTER_VALUE,value: {lastNameError:false} })

			if(error.length)
				return dispatch({type:ActionType.SEND_NOTIFICATION, notification: {
					type: 'error',
					title: (<span style={{fontWeight: 900}}>SIGN UP ERROR{error.length > 1 && 'S'}</span>),
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

		next(action)

	}
  }
}
