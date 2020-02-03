import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import useClasses from '../Profile/Profile.classes'
import Icon from '../Profile/Icon'
import {Icon as VehicleIcon} from '../Couriers/Icon'
import { vehicles, icons } from '../../Images'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { setTemporaryValue } from '../../Actions'
import { viewModalCarPictureSelector } from '../../Selectors'


const CarRow = ({ title, value, type, black = false, description = "Vehicle", onClick = false, ...rest }) => {

	const { setTemporaryValue, viewModalCarPicture, id } = rest
	const classes = useClasses()
	if(!onClick)
		onClick = () => setTemporaryValue({viewModalCarPicture:id})
		
	return (
		<ListItem disabled={!rest.aproved} onClick={onClick} button classes={{root:[classes.listItem,!black ? classes.listItemWhite : classes.listItemBlack].join(' ')}}>
		  <Icon icon={icons.vehicle} />
		  <ListItemText primary="Vehicle" secondary={!rest.aproved ? "Pending aproval" : description}
			  classes={{
				  primary: classes.primaryText,
				  secondary: classes.secondaryText
			  }}
		  />
				  <ListItemSecondaryAction>
					<IconButton edge="end" onClick={onClick}>
								<VehicleIcon type={type}/>
						<ChevronRightIcon />
					</IconButton>
				  </ListItemSecondaryAction>
		</ListItem>
	)
}

const mapStateToProps = (state) => {
    return {
		viewModalCarPicture: viewModalCarPictureSelector(state),
    }
}

const mapDispatchToProps = dispatch => (bindActionCreators({
    setTemporaryValue
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(CarRow)
