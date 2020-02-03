import React from 'react'
import { useParams,Link } from 'react-router-dom'
import { navigate } from '../../../../Utils'
import useClasses from './SendPack.classes'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
import Collapse from '@material-ui/core/Collapse'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import Transition from '../../../Slider/Transition'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Menu, MenuItem } from '../../../Profile/VehicleTypes'
import { packTypes } from '../../../../Utils/packTypes'
import { setTemporaryValue,trySendPack } from '../../../../Actions'
import { sendPackSelector } from '../../../../Selectors'
import { renderCouriersSendPack } from '../../../Couriers/common'
import InputBase from '@material-ui/core/InputBase'
import { isLoadingIcon,defaultAvatar } from '../../../../Images'
import moment from 'moment'

const SendPack = props => {

	const { page } = useParams()
	const classes = useClasses()
	const isForward = page && page !== 'sendpack'
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = event => {
	    setAnchorEl(event.currentTarget)
	  }

	  const handleClose = () => {
	    setAnchorEl(null)
	  }

	  const resetForm = (index) => {
		  setTemporaryValue({
			  sendPackCourier: 0,
			  sendPackNrKg: 1,
			  senderName: '',
			  receiverName: '',
			  receiverAddress: '',
			  receiverPhone: '',
			  senderAddress: '',
			  sendPackError: false,
		  })
	  }

	  const { isLoading, setTemporaryValue, packType, couriers, courier, sendPackCourier,quantity } = props
	  const { phone, price, trySendPack, sender, address,receiver, receiveraddress,receiverphone,error,changedSender } = props

	return (
		<Dialog
			classes={{
				root: classes.myPacksRoot,
				paper: classes.myPacksPaper,
				container: classes.myPacksContainer,
			}}
			transitionDuration={{enter:500,exit:500}}
			PaperProps={{
				elevation: 0,
			}}
			fullWidth={true}
			maxWidth={false}
			disableBackdropClick
        open={page === 'sendpack'}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogContent className={[classes.myPages,isForward ? classes.goBack : ''].join(' ')}>
			{ phone ? <Button
			variant="contained"
			color="secondary"
			className={classes.buttonType}
			onClick={handleClick}
		  >
			{ packType > -1 ? (
				packTypes[packType-1].name
			) : "Select pack type"}

		</Button> : (
			<>
			<Button
			variant="contained"
			color="secondary"
			className={classes.buttonType}
			onClick={() => navigate('/profile')}
		  >
			Go to your profile
		</Button>
			<Box className={classes.noOnline} style={{marginTop: '10px'}}>
				In order to send packs your phone number must be set
			</Box>
			</>
		)}

		  <Box className={classes.listCouriers}>

			  {
				  sendPackCourier > 0 ? (
					  <>
					  { (courier && courier[0]) ? <Box className={classes.avatarBox} onClick={() => setTemporaryValue({viewModalProfile:courier[0].id})}>
						  <Box className={classes.avatarImageBox}>
							  <img src={courier[0].avatar ? 'https://speedster.cristi.club/media/' + courier[0].avatar : defaultAvatar} className={classes.avatar}/>
						  </Box>

						  <Box className={classes.avatarBoxInner}>
							  <Typography color="primary" variant="h6" className={classes.memberName}>
								  {courier[0].name}
							  </Typography>
							  <Typography className={classes.memberSince}>
								  courier since {moment(courier[0].courierSince).year()}
							  </Typography>
						  </Box>
					  </Box> : null}
					  </>
				  ) :
				  renderCouriersSendPack(couriers)
			  }

			  { couriers.length === 0 && packType > -1 &&
				  <Box className={classes.noOnline}>
					  No courier available for you
				  </Box>
			  }
		  </Box>

		  <Collapse in={sendPackCourier > 0} timeout={{enter:250,exit:0}} classes={{container:classes.collapse}} onExited={resetForm}>
			  <Box className={classes.column}>
				  <Box className={classes.row}>
					  <h3 className={classes.bigTitle}>Sender</h3>
					  { price > 0 && <h3 className={classes.bigTitle}>Price: {price} €</h3>}
				  </Box>

				  <Box className={classes.row}>
					  <Badge classes={{anchorOriginTopRightRectangle: classes.badge}} invisible={quantity !== ''} color="error" variant="dot" anchorOrigin={{vertical: 'top',horizontal:'right'}}>
						  <h6 className={classes.rowTitle}>{packType === 1 ? "How many envelopes ?" : "Pack weight ? In kg"}</h6>
					  </Badge>
					  <InputBase
					  onChange={e => setTemporaryValue({sendPackNrKg:e.target.value})}
					  value={quantity}
					  classes={{
					  	root: classes.inputRoot,
					  	input: [classes.primaryText,classes.inputInput].join(' '),
					  }}
					  variant="outlined"
					  />
				  </Box>
				  <Box className={[classes.column,classes.columnStart].join(' ')}>
					  <h6 className={classes.rowTitle}>Your name</h6>
					  <InputBase
						  disabled
	  				  onChange={e => setTemporaryValue({senderName:e.target.value})}
					  value={sender}
	  				  classes={{
	  					  root: [classes.inputRoot,classes.inputLong].join(' '),
	  					  input: [classes.primaryText,classes.inputInput,classes.inputLong].join(' '),
	  				  }}
	  				/>
					<Badge classes={{anchorOriginTopRightRectangle: classes.badge}} invisible={address.length > 6} color="error" variant="dot" anchorOrigin={{vertical: 'top',horizontal:'right'}}>
						  <h6 className={classes.rowTitle}>Your address</h6>
					</Badge>

					<InputBase
					onChange={e => setTemporaryValue({senderAddress:e.target.value})}
					value={address}
					classes={{
						root: [classes.inputRoot,classes.inputLong].join(' '),
						input: [classes.primaryText,classes.inputInput,classes.inputLong].join(' '),
					}}
				  />
				  <h3 className={classes.bigTitle}>Receiver</h3>

				  <Badge classes={{anchorOriginTopRightRectangle: classes.badge}} invisible={receiver.length > 2} color="error" variant="dot" anchorOrigin={{vertical: 'top',horizontal:'right'}}>
						<h6 className={classes.rowTitle}>Receiver's name</h6>
				  </Badge>
				  <InputBase
				  onChange={e => setTemporaryValue({receiverName:e.target.value})}
				  value={receiver}
				  classes={{
					  root: [classes.inputRoot,classes.inputLong].join(' '),
					  input: [classes.primaryText,classes.inputInput,classes.inputLong].join(' '),
				  }}
				/>
				<Badge classes={{anchorOriginTopRightRectangle: classes.badge}} invisible={receiveraddress.length > 5} color="error" variant="dot" anchorOrigin={{vertical: 'top',horizontal:'right'}}>
					  <h6 className={classes.rowTitle}>Receiver's address</h6>
				</Badge>

				<InputBase
				onChange={e => setTemporaryValue({receiverAddress:e.target.value})}
				value={receiveraddress}
				classes={{
					root: [classes.inputRoot,classes.inputLong].join(' '),
					input: [classes.primaryText,classes.inputInput,classes.inputLong].join(' '),
				}}
			  />
			  <Badge classes={{anchorOriginTopRightRectangle: classes.badge}} invisible={receiverphone.length > 8 && !isNaN(receiverphone)} color="error" variant="dot" anchorOrigin={{vertical: 'top',horizontal:'right'}}>
					<h6 className={classes.rowTitle}>Receiver's phone number</h6>
			  </Badge>

			  <InputBase
			  onChange={e => setTemporaryValue({receiverPhone:e.target.value})}
			  value={receiverphone}
			  classes={{
				  root: [classes.inputRoot,classes.inputLong].join(' '),
				  input: [classes.primaryText,classes.inputInput,classes.inputLong].join(' '),
			  }}
			/>
				  </Box>
			  </Box>
			  <Button
				  disabled={isLoading}
			  variant="contained"
			  color="secondary"
			  className={[classes.buttonType,classes.submitPack].join(' ')}
			  onClick={() => trySendPack()}
			>
				{isLoading && <img src={isLoadingIcon} width="24px" height="24px" style={{marginRight: '10px'}}/> }
			   Send pack
			</Button>
		  </Collapse>


		<Menu
			style={{zIndex: 2000}}
			anchorEl={anchorEl}
			keepMounted
			open={Boolean(anchorEl)}
			onClose={handleClose}
		  >


				{
					packTypes.map((pack,index) => {
						return (
							<MenuItem onClick={() => {setTemporaryValue({packType:index+1,sendPackCourier:0});handleClose()}}>
								<ListItemIcon>
								  <img src={pack.icon} width="30px" height="23px"/>
								</ListItemIcon>
							<ListItemText primary={pack.name} />
						  </MenuItem>
						)
					})
				}

		</Menu>
        </DialogContent>
      </Dialog>
	)
}


const mapStateToProps = (state) => {
	const data = sendPackSelector(state)
    return {
		...data
    }
}

const mapDispatchToProps = dispatch => (bindActionCreators({
	setTemporaryValue,
	trySendPack
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(SendPack)
