import React from 'react'
import { useParams } from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
// import { navigate } from '../../../Utils'
import useClasses from '../Home.classes'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import Transition from '../../Slider/Transition'
import { goBack } from '../../../Utils'
import Modal from '@material-ui/core/Modal'
import { setTemporaryValue } from '../../../Actions'
import { viewModalProfileSelector, viewModalCarPictureSelector,onlineCouriersSelector } from '../../../Selectors'
import { renderCouriersAround } from '../../Couriers/common'
import CourierProfileContent from '../../Couriers/CourierProfileContent'
import GoogleMap from './GoogleMap'

const CouriersAround = props => {

	const { page } = useParams()
	const classes = useClasses()
	const isForward = page && page !== 'couriersaround'

	const { setTemporaryValue, viewModalProfile, viewModalCarPicture, onlineCouriers } = props
	// const onlineCouriers = [{
	// 	displayName: 'Gigel Fronel',
	// 	vehicle: 2,
	// 	id: 1,
	// },{
	// 	displayName: 'Alt Gigel',
	// 	vehicle: 5,
	// 	id: 2,
	// }]

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
        open={page === 'couriersaround'}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogContent style={{backgroundColor: '#fafafa',padding:0}}>
			<Box className={classes.googleMap}>
				<GoogleMap />
			</Box>

			<List className={classes.listCouriersAroud}>
				{
					onlineCouriers.length ? (
						<>
						<Box className={classes.noOnline}>
							{onlineCouriers.length} courier{onlineCouriers.length > 1 ? "s":""} online right now
						</Box>
						{renderCouriersAround(onlineCouriers)}
						</>
					) : (
						<Box className={classes.noOnline}>
							No online couriers in your city
						</Box>
					)
				}
			</List>
			<Modal
				className={classes.modal}
				open={viewModalProfile > 0}
				closeAfterTransition
				keepMounted={false}
				onBackdropClick={() => setTemporaryValue({viewModalProfile:0})}
			  >
				  <Box className={classes.modalInner}>
					  <CourierProfileContent viewModalCarPicture={viewModalCarPicture}/>
				  </Box>
		  </Modal>
        </DialogContent>
      </Dialog>
	)
}

const mapStateToProps = (state) => {
    return {
        viewModalProfile: viewModalProfileSelector(state),
		viewModalCarPicture: viewModalCarPictureSelector(state),
		onlineCouriers: onlineCouriersSelector(state),
    }
}

const mapDispatchToProps = dispatch => (bindActionCreators({
    setTemporaryValue
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(CouriersAround)
