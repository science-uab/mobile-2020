import React from 'react'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

const HomeRow = ({icon, title, callback}) => {
	return (
		<>
		<ListItem button onClick={() => callback()}>
			<ListItemIcon>
				<img src={icon} alt={title} width="41px" height="35px"/>
			</ListItemIcon>
			<ListItemText primary={title} />
			<ChevronRightIcon />
		</ListItem>
		<Divider />
		</>
	)
}

export default HomeRow
