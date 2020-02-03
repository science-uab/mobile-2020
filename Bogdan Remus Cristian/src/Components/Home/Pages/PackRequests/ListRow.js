import React from 'react'
import Box from '@material-ui/core/Box'
import Badge from '@material-ui/core/Badge'
import useClasses from './PackRequests.classes'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import { defaultAvatar,packs } from '../../../../Images'
import { addZeros } from '../../../../Utils'
import { packTypes } from '../../../../Utils/packTypes'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

const ListRow = ({ black, onClick, ...rest }) => {

	const classes = useClasses()
	const { senderAvatar, type,receivername, status, id } = rest

	const getStatus = () => {
		switch(parseInt(status)) {
			case 0:
				return "Waiting response"
			case 1:
				return "Accepted"
			case 2:
				return "Picked up"
			case 3:
				return "Delivered"
			case 4:
				return "Request denied"
			case 5:
				return "Returned to sender"
			case 6:
				return "Canceled by sender"
			default:
				return "Unknown status"
		}
	}

	const getIcon = () => {
		let temp = parseInt(status)
		if(temp === 0 || temp === 1)
			return packTypes[type-1].icon
		if(temp === 2 || temp === 3)
			return packs.accept
		if(temp === 4)
			return packs.denied
		return packs.unknown
	}

	const courier = {}

	return (
		<ListItem button="button"
			onClick={onClick}
			classes={{
            container: !black
                ? classes.listItemWhite
                : classes.listItemBlack,
            root: classes.listItem
        }}>

	        <Box className={classes.avatarBox}>
				<img src={senderAvatar ? 'https://speedster.cristi.club/media/' + senderAvatar : defaultAvatar} className={classes.avatar} width="31px" height="31px"/>
				<img src={getIcon()} className={[classes.avatar,classes.packIcon].join(' ')} width="23px" height="23px"/>
	        </Box>

	        <ListItemText
				primary={<><span>{receivername}</span> <span>Ref #{addZeros(id)}</span></>}
				secondary={getStatus()}
				classes={{
	                primary: classes.primaryText,
					secondary: classes.secondaryText,
					multiline: classes.multiline,
	            }}
			/>

	        <ListItemSecondaryAction>
	            <IconButton edge="end">
					<ChevronRightIcon />
	            </IconButton>
	        </ListItemSecondaryAction>
    	</ListItem>
	)
}

export default ListRow
