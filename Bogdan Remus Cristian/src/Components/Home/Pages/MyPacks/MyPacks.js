import React from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
// import { navigate } from '../../../Utils'
import useClasses from './MyPacks.classes'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog'
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
import List from '@material-ui/core/List'
import { myPacksSelector } from '../../../../Selectors'
import ListSubheader from '@material-ui/core/ListSubheader'
import { setTemporaryValue,tryDeletePack, tryRateDelivery } from '../../../../Actions'
import { packTypes } from '../../../../Utils/packTypes'
import { defaultAvatar,packs,logoCar,isLoadingIcon } from '../../../../Images'
import { addZeros } from '../../../../Utils'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import moment from 'moment'
import Rating from '@material-ui/lab/Rating'

function getSteps(status) {
  let statuses = [
	  'Waiting courier\'s aproval',
	  'Pack accepted',
	  'Picked up by courier',
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


const MyPacks = props => {

	const { page } = useParams()
	const classes = useClasses()
	const { active, archive, setTemporaryValue,packId,current,isLoading,tryDeletePack,tryRateDelivery } = props
	const [stars, setStars] = React.useState(7)

	const steps = getSteps(current.status)

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

	const getStatus = () => {
		let temp = parseInt(current.status)
		if(temp === 0)
			return "Waiting aproval from : "
		if(temp === 1)
			return "Accepted by : "
		if(temp === 2)
			return "Picked up by : "
		if(temp === 3)
			return "Delivered by : "
		if(temp === 4)
			return "Denied by : "
		return "Courier : "
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
        open={page === 'mypacks'}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogContent  className={classes.myPages}>
			<List className={classes.list}>
				{
					<>
					<ListSubheader className={classes.stickHeader}>Active packs</ListSubheader>
					{
						active.length ? active.map((pack,index) => (
						<ListRow
							onClick={() => setTemporaryValue({packId:pack.id})}
							key={pack.id}
							black={index %2 === 0}
							{...pack}
						/>
					)) :
					<Box className={classes.noOnline}>
					  No active packs
				  	</Box>
					}
					</>

				}

				{ archive.length > 0 ?
					<>
					<ListSubheader className={classes.stickHeader}>Packs history</ListSubheader>
					{archive.map((pack,index) => (
						<ListRow
							onClick={() => setTemporaryValue({packId:pack.id})}
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
	  		onClose={() => setTemporaryValue({packId:0})}
	  	  >
				<Box className={classes.topImageBox}>
					<Box className={classes.topImageBoxInner}>
						<img src={getIcon()} className={classes.topImage} />
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
							<h4 className={classes.packLineText}>{getStatus()}</h4>
							<h4 className={classes.packLineText2}>{current.couriername}</h4>
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
				!current.rated ? (
					<Rating
						   max={7}
						   value={stars}
						   onChange={(event, newStars) => {
							 setStars(newStars)
						   }}
					  />
				) : (
					<Rating
						   readOnly
						   max={7}
						   value={current.rated}
					  />
				)
			}
			  <Button disabled={current.rated || isLoading} style={{alignSelf: 'flex-end'}} onClick={() => tryRateDelivery(current,stars)} color="primary" variant="contained">
				{isLoading && <img src={isLoadingIcon} width="24px" height="24px" style={{marginRight: '10px'}}/>}
				{current.rated ? "Rated" : "Rate courier"}
			  </Button>
		 </Box>
	 	)}
			<Box style={{visibility: 'hidden'}}>
				space
			</Box>
				</Box>
				<DialogActions classes={{root:classes.between}}>
		  		  <Button onClick={() => tryDeletePack(current.id)} variant="contained" disabled={current.status !== 0}>
		  		  Delete request
		  		</Button>
		  		<Button style={{alignSelf: 'flex-end'}} onClick={() => setTemporaryValue({packId:0})} color="primary" variant="contained">
		  		  Close
		  		</Button>
		  	  </DialogActions>
	  	  </Dialog>
        </DialogContent>
      </Dialog>
	)
}

const mapStateToProps = (state) => {
	const data = myPacksSelector(state)
    return {
		...data,
    }
}

const mapDispatchToProps = dispatch => (bindActionCreators({
	setTemporaryValue,
	tryDeletePack,
	tryRateDelivery
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(MyPacks)
