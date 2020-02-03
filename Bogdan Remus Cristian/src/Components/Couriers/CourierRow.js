import React from 'react'
import Box from '@material-ui/core/Box'
import Badge from '@material-ui/core/Badge'
import useClasses from './Couriers.classes'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Icon from './Icon'
import { vehicles, defaultAvatar } from '../../Images'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { navigate } from '../../Utils'
import { renderVehicle } from './common'
import { setTemporaryValue } from '../../Actions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

const CourierRow = ({courier, black, place, setTemporaryValue, sendpack = false, onClick = false}) => {

    const classes = useClasses()
	const { avatar } = courier
	onClick = () => setTemporaryValue({viewModalProfile:courier.id})
	if(sendpack)
		onClick = () => setTemporaryValue({sendPackCourier:courier.id})


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
				{
					place ? (
						<Badge badgeContent={place} color="secondary" overlap="circle" anchorOrigin={{
						    vertical: 'top',
						    horizontal: 'left',
						}} classes={{badge: classes.badge}}>
							<img src={avatar ? 'https://speedster.cristi.club/media/' + avatar : defaultAvatar} className={[classes.avatar,classes.avatarAround].join(' ')}/>
						</Badge>
					) : (
						<img src={avatar ? 'https://speedster.cristi.club/media/' + avatar : defaultAvatar} className={classes.avatar}/>
					)
				}
	        </Box>

	        <ListItemText primary={courier.name} classes={{
	                primary: classes.primaryText
	            }}
			/>

	        <ListItemSecondaryAction>
	            <IconButton edge="end">
	                {renderVehicle(courier.vehicle)}
					<ChevronRightIcon />
	            </IconButton>
	        </ListItemSecondaryAction>
    	</ListItem>
	)
}

const mapDispatchToProps = dispatch => (bindActionCreators({
    setTemporaryValue
}, dispatch))

export default connect(null, mapDispatchToProps)(CourierRow)
