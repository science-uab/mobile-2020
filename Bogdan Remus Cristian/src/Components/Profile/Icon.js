import React from 'react'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import useClasses from './Profile.classes'

const Icon = ({ icon }) => {
	const classes = useClasses()
	return (
		<ListItemIcon classes={{root: classes.icon}}>
			<img src={icon} width="23px" height="30px"/>
		</ListItemIcon>
	)
}

export default Icon
