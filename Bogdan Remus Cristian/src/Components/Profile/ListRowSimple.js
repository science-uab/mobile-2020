import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import useClasses from './Profile.classes'
import Icon from './Icon'
import {icons} from '../../Images'
import TextField from '@material-ui/core/TextField'
import { StylesProvider } from '@material-ui/core/styles'

export default ({ title, value, icon, black = false, onClick = () => null }) => {

	const classes = useClasses()

	return (
		<StylesProvider injectFirst>
			<ListItem classes={{container: black ? classes.listItemBlack : classes.listItemWhite,root:classes.listItem}}>
			  <Icon icon={icon} />
			  <ListItemText primary={title} secondary={value || "not set yet"}
				  classes={{
					  primary: classes.primaryText,
					  secondary: classes.secondaryText
				  }}
			  />
			  <ListItemSecondaryAction>
			  </ListItemSecondaryAction>
			</ListItem>

		</StylesProvider>
	)
}
