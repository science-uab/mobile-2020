import React from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
// import { navigate } from '../../../Utils'
import useClasses from './PackRequests.classes'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import Typography from '@material-ui/core/Typography'
import Transition from '../../../Slider/Transition'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ListRow from './ListRow'
import { packTypes } from '../../../../Utils/packTypes'
import { defaultAvatar,packs,logoCar,isLoadingIcon } from '../../../../Images'
import List from '@material-ui/core/List'
import { myPackRequestsSelector } from '../../../../Selectors'
import ListSubheader from '@material-ui/core/ListSubheader'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import moment from 'moment'
import Rating from '@material-ui/lab/Rating'
import { setTemporaryValue,tryDeclineRequest,tryRefundRequest,tryAcceptRequest,tryDoNextStep } from '../../../../Actions'
import { addZeros,contact } from '../../../../Utils'

function getSteps(status) {
  let statuses = [
	  'Waiting aproval',
	  'Pack accepted',
	  'Picked up',
	  'Delivered'
  ]

  if(status === 4)
	  statuses[1] = "Pack request denied"
  if(status === 5)
  	  statuses[3] = "Returned to sender"

  if(status === 6)
  	  statuses[0] = "Canceled by sender"
	return statuses
}

const PackRequests = props => {

	const { page } = useParams()
	const classes = useClasses()
	const { active, archive, requests, current, packId,isLoading,setTemporaryValue,tryDeclineRequest,tryRefundRequest,tryAcceptRequest } = props
	const { tryDoNextStep } = props
	const steps = getSteps(current.status)

	const [confirm, setConfirm] = React.useState(false)
	const [message, setMessage] = React.useState(null)

	const denyPack = (type) => {
		if(type === "deny") {
			tryDeclineRequest(current,message)
		} else {
			tryRefundRequest(current,message)
		}
		setConfirm(false)
	}

	const getIcon = () => {
		let temp = parseInt(current.status)
		if(temp === 0 || temp === 1)
			return packTypes[current.type-1].icon
		if(temp === 2 || temp === 3)
			return packs.accept
		if(temp === 4)
			return packs.denied
		return packs.unknown
	}

	const getStep = () => {
		let temp = parseInt(current.status)
		if(temp === 0)
			return 0
		if(temp === 1 || temp === 4)
			return 1
		if(temp === 2)
			return 2
		if(temp === 5)
			return 3
		if(temp === 3)
			return 4
		return 0
	}

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
        open={page === 'packrequests'}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogContent  className={classes.myPages}>
			<List className={classes.list}>

				{
					<>
					<ListSubheader className={classes.stickHeader}>Pack requests</ListSubheader>
					{
						requests.length ? requests.map((pack,index) => (
						<ListRow
							onClick={() => setTemporaryValue({packIdCourier:pack.id})}
							key={pack.id}
							black={index %2 === 0}
							{...pack}
						/>
					)) :
					<Box className={classes.noOnline}>
					  No pack requests
				  	</Box>
					}
					</>

				}


				{ active.length > 0 ?
					<>
					<ListSubheader className={classes.stickHeader}>Picked up packs</ListSubheader>
					{active.map((pack,index) => (
						<ListRow
							onClick={() => setTemporaryValue({packIdCourier:pack.id})}
							key={pack.id}
							black={index %2 === 0}
							{...pack}
						/>
					))}
				</> : null
				}

				{ archive.length > 0 ?
					<>
					<ListSubheader className={classes.stickHeader}>Packs history</ListSubheader>
					{archive.map((pack,index) => (
						<ListRow
							onClick={() => setTemporaryValue({packIdCourier:pack.id})}
							key={pack.id}
							black={index %2 === 0}
							{...pack}
						/>
					))}
				</> : null
				}
			</List>
			<Dialog
	  		open={packId > 0}
	  		TransitionComponent={Transition}
	  		keepMounted={false}
			PaperProps={{
				elevation: 0,
			}}
			transitionDuration={{
				enter:250,
				exit: 150,
			}}
	  	  classes={{
	  		  root: [classes.zIndexBig,classes.fullScreen].join(' '),
			  paper: classes.myPacksPaperPack,
			  container: classes.myPacksContainer,
	  	  }}
		  BackdropProps={{
			  classes: {
				  root: classes.backDrop,
			  }
		  }}
	  		onClose={() => setTemporaryValue({packIdCourier:0})}
	  	  >
				<Box className={classes.topImageBox}>
					<Box className={classes.topImageBoxInner}>
						<img src={isLoading ? isLoadingIcon : getIcon()} className={classes.topImage} />
					</Box>
				</Box>
				<Box className={classes.packContent}>
					<Box className={[classes.row,classes.packBoxTitle].join(' ')}>
						<img src={logoCar} width="24px"/><h4 className={classes.packTitle}>SPEEDSTER</h4>
					</Box>
					<h4 className={classes.packTitle}>Ref #{addZeros(current.id || 0)}</h4>

					<Box className={classes.column}>
						<Box className={[classes.row,classes.left].join(' ')}>
							<h4 className={classes.packLineText}>Receiver : </h4>
							<h4 className={classes.packLineText2}>{current.receivername}</h4>
						</Box>
						<Box className={[classes.row,classes.left].join(' ')}>
							<h4 className={classes.packLineText}>Address : </h4>
							<h4 className={classes.packLineText2}>{current.receiveraddress}</h4>
						</Box>
						<Box className={[classes.row,classes.left].join(' ')}>
							<h4 className={classes.packLineText}>Send by :</h4>
							<h4 className={classes.packLineText2}>{current.sendername}</h4>
						</Box>
						<Box className={[classes.row,classes.left].join(' ')}>
							<h4 className={classes.packLineText}>Phone number :</h4>
							<h4 className={classes.packLineText3} onClick={() => contact("tel:" + current.phone)}>{current.phone}</h4>
						</Box>
						<Box className={[classes.row,classes.left].join(' ')}>
							<h4 className={classes.packLineText}>Date :</h4>
							<h4 className={classes.packLineText2}>{moment(current.date).format('MMMM Do, HH:mm')}</h4>
						</Box>
					</Box>

					<Stepper activeStep={getStep()} orientation="vertical" classes={{root:classes.actionsContainer}}>
        {steps.map((label, index) => {
			const error = label === "Pack request denied" || label === "Returned to sender" || label === 'Canceled by sender'
			return (
	          <Step key={label}>
	            <StepLabel error={error}>{label}</StepLabel>

				{
					<StepContent>
					  {moment(current.date).format('MMMM Do, HH:mm')}
					  {((current.status === 4 || current.status === 5) && current.denied_reason !== null) && <Typography color="error">{current.denied_reason}</Typography>}
		            </StepContent>
				}

	          </Step>
	        )
		})}
      </Stepper>
	  	{
		  (current.status === 3 || current.status === 5) && (
			  <Box className={classes.rowRating} style={{marginTop: '0!important'}}>
				  {
					  current.rated ? <Rating readOnly value={current.rated} max={7}/> :
					  <Box className={classes.noOnline} style={{width: '100%'}}>
  					  Waiting user to review service
  				  	</Box>
				  }
		 </Box>
	 	)}
			<Box style={{visibility: 'hidden'}}>
				space
			</Box>
				</Box>
				<DialogActions classes={{root:classes.between}}>

					{
						(current.status === 0 || current.status === 1) && (
							<Button onClick={() => setConfirm(true)} variant="contained" size="small">
						  Decline
						</Button>
						)
					}

		  		  { current.status === 0 &&
					<Button onClick={() => tryAcceptRequest(current)} variant="contained" color="primary">
					Accept
				  </Button>

				  }

				  { current.status === 2 && <Button variant="contained" onClick={() => setConfirm(true)} size="small">
						 Retour
					</Button>
				  }

				{ (current.status === 1 || current.status === 2) && <Button onClick={() => tryDoNextStep(current)} variant="contained" color="primary">
				{current.status === 1 ? "Pick up" : "Delivered"}
			  </Button>}


			  { current.status > 2 && <Button disabled variant="contained" size="small">
				  { current.status === 3 ? "Success" : "Problems"}
			</Button>}

		  		<Button onClick={() => setTemporaryValue({packIdCourier:0})} color="secondary" variant="contained" size="small">
				  Close
		  		</Button>
		  	  </DialogActions>

			  <Dialog
		        open={confirm}
		        TransitionComponent={Transition}
		        keepMounted
				classes={{
					root: classes.zIndexBig
				}}
		        onClose={() => setConfirm(false)}
		      >
		        <DialogTitle>Message</DialogTitle>
		        <DialogContent>
		          <DialogContentText>
		            This message is optional
		          </DialogContentText>
				  <TextField
  					disabled={isLoading}
  					classes={{root: classes.modalInput }}
  					InputProps={{
  						classes: {
  							input: classes.modalInputText
  						}
  					}}
  					value={message}
  					onChange={e => setMessage(e.target.value)}
  					size="small"
  					variant="outlined"
  					color="secondary"
  				/>
		        </DialogContent>
		        <DialogActions>
		          <Button onClick={() => setConfirm(false)} color="secondary" variant="contained">
		            Cancel
		          </Button>
		          <Button onClick={() => denyPack(current.status < 2 ? "deny" : "retour")} color="primary" variant="contained">
		            { current.status < 2 ? "Decline" : "Retour"}
		          </Button>
		        </DialogActions>
		      </Dialog>


	  	  </Dialog>
        </DialogContent>
      </Dialog>
	)
}

const mapStateToProps = (state) => {
	const data = myPackRequestsSelector(state)
    return {
		...data,
    }
}

const mapDispatchToProps = dispatch => (bindActionCreators({
	setTemporaryValue,
	tryRefundRequest,
	tryAcceptRequest,
	tryDeclineRequest,
	tryDoNextStep
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(PackRequests)
