import React,{useState} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import useClasses from './Header.classes'
import AppBar from '@material-ui/core/AppBar'
import Badge from './Elements/Badge'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Notifications from './Elements/Notifications'
import { goBack } from '../../Utils'
import { useHistory } from 'react-router-dom'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import { box,envelope,bell } from '../../Images'
import { packRequestsSelector } from '../../Selectors'

const Header = props => {
	const classes = useClasses()
	const history = useHistory()
	const { packRequests,courier } = props
	const isBack = history.location.pathname.split('/')[2] !== undefined

    return (
		<>
			  <AppBar style={{zIndex: 1400}} position="fixed" color="primary" classes={{colorPrimary: classes.colorHeader}}>
				   <Toolbar className={classes.mainBox} disableGutters={true}>
						   <Box className={classes.middleGrow} >
							   <Box style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>

								   <Box className={[classes.goBackBox,isBack ? classes.goBackOpen : ''].join(' ')}>
									   <IconButton onClick={() => goBack()} className={classes.goBack}>
										   <ArrowBackIosRoundedIcon className={classes.goBackIcon}/>
									   </IconButton>
								   </Box>


								   <Typography variant="h6" className={[classes.title,isBack && classes.titleGoBack]}>
									  SPEEDSTER
								  </Typography>

							   </Box>
						   </Box>

						   { courier && <IconButton className={classes.menuButton}
							   edge="start"
							   color="inherit"
							   onClick={() => history.push('/home/packrequests')}>
							   <Badge variant="dot" color="primary" invisible={!packRequests}>
								   <img src={box} height="20px" width="20px"/>
							   </Badge>
						  </IconButton>}
					   </Toolbar>
				</AppBar>
			<Box className={classes.spacer} />
		</>

	)
}

const mapStateToProps = (state) => {
	return {
		packRequests: packRequestsSelector(state),
		courier: state.login.courier,
	}
}


export default connect(mapStateToProps)(Header)
