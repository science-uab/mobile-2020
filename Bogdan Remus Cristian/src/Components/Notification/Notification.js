import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Collapse from '@material-ui/core/Collapse'
import Button from '@material-ui/core/Button'
import useClasses from './Notification.classes'
import { notificationSelector } from '../../Selectors'
import { closeNotification } from '../../Actions'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

function Notification(props) {

	const classes = useClasses()
	const { type, title, message, isOpen, closeNotification } = props

	const getIcon = () => {
		switch(type) {
			case 'error':
				return <img src={require('../../Images/error.png')} width="40px" height="40px" />
			case 'success':
				return <img src={require('../../Images/success.png')} width="40px" height="40px" />
			default:
				return <img src={require('../../Images/info.png')} width="40px" height="40px" />
		}
	}


    return (
		<ClickAwayListener onClickAway={() => isOpen && closeNotification()} touchEvent={false} mouseEvent='onMouseDown'>
			<Collapse in={isOpen} className={classes.notification} onClick={closeNotification} timeout={250}>
				<Paper className={classes.paper} elevation={4}>
					{getIcon()}
					<Box className={classes.content}>
						<Typography>
							{title}
						</Typography>
						<Typography>
							{message}
						</Typography>
					</Box>
				</Paper>
			</Collapse>
		</ClickAwayListener>
	)
}

const mapStateToProps = (state) => {
	const notification = notificationSelector(state)
    return {
        ...notification
    }
}

const mapDispatchToProps = dispatch => (bindActionCreators({
	closeNotification
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
