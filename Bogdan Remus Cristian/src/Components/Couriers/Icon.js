import React from 'react'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import useClasses from './Couriers.classes'
import { vehiclesTypes } from '../../Utils/vehicleTypes'

export const Icon = ({ type }) => {

	const classes = useClasses()
	
	return (
		<ListItemIcon classes={{root: classes.icon}}>
			<img src={vehiclesTypes[type-1].icon} width="42px" height="25px"/>
		</ListItemIcon>
	)
}

export default Icon
