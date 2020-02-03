import React from 'react'
import CarRow from './CarRow'
import { vehiclesTypes } from '../../Utils/vehicleTypes'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Box from '@material-ui/core/Box'
import Modal from '@material-ui/core/Modal'
import Collapse from '@material-ui/core/Collapse'
import Button from '@material-ui/core/Button'
import useClasses from '../Profile/Profile.classes'
import { getVehicleImage,getVehicleId } from '../Couriers/common'
import { setTemporaryValue, tryDeleteVehicle } from '../../Actions'
import { viewModalProfileSelector, viewModalCarPictureSelector } from '../../Selectors'
import { goBack } from '../../Utils'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const renderCars = vehicles => vehicles.map((vehicle,index) =>
	<CarRow
		{...vehicle}
		title="Vehicle"
		key={vehicle.id}
		black={index % 2 !== 0}
	/>
)

const MyCars = props => {

	const { vehicles, viewModalCarPicture, setTemporaryValue,tryDeleteVehicle } = props
	const [confirm, setConfirm] = React.useState(false)
	const classes = useClasses()

	const deleteVehicle = async () => {
		const vehicle = getVehicleId(vehicles, viewModalCarPicture)
		tryDeleteVehicle(vehicle)
	}

	React.useEffect(() => {
		if(confirm && viewModalCarPicture === 0)
			setConfirm(false)
	},[viewModalCarPicture])

	return (
		<>
		{renderCars(vehicles)}
		<Modal
			className={classes.modal}
			open={viewModalCarPicture > 0}
			closeAfterTransition
			onBackdropClick={() => !viewModalCarPicture ? goBack() : setTemporaryValue({viewModalCarPicture:0})}
		  >
				  <Box className={[classes.modalInner,classes.modalVehicle].join(' ')}>
		  			<img src={getVehicleImage(vehicles,viewModalCarPicture)} className={[classes.topImage,classes.topImageVehicle].join(' ')}/>
		  			<Button color="secondary" size="small" variant="contained" className={classes.deleteVehicle}
		  				onClick={() => setConfirm(true)}>
		  				delete
		  			</Button>
		  			<Button color="primary" size="small" variant="contained" className={classes.closeVehicle}
		  				onClick={() => !viewModalCarPicture ? goBack() : setTemporaryValue({viewModalCarPicture:0})}>
		  				close
		  			</Button>
		  		</Box>
	  </Modal>
	  <Dialog
        open={confirm && viewModalCarPicture}
        TransitionComponent={Transition}
        keepMounted
		classes={{
			root: classes.zIndexBig
		}}
        onClose={() => setConfirm(false)}
      >
        <DialogTitle>Important</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action is ireversible. Are you sure you want to delete this vehicle ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirm(false)} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={deleteVehicle} color="primary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
		</>
	)
}


const mapStateToProps = (state) => {
    return {
        vehicles: state.myVehicle,
		viewModalProfile: viewModalProfileSelector(state),
		viewModalCarPicture: viewModalCarPictureSelector(state),
    }
}
const mapDispatchToProps = dispatch => (bindActionCreators({
    setTemporaryValue,
	tryDeleteVehicle
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(MyCars)
