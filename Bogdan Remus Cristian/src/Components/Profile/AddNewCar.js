import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Fade from '@material-ui/core/Fade'
import Modal from '@material-ui/core/Modal'
import Box from '@material-ui/core/Box'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import useClasses from './Profile.classes'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Icon from './Icon'
import {icons,isLoadingIcon,logoCar,vehicles} from '../../Images'
import Switch from './Switch'
import TextField from '@material-ui/core/TextField'
import { setUploadVehicleValue,resetUploadVehicle,uploadVehicle } from '../../Actions'
import { uploadVehicleSelector } from '../../Selectors'
import PhotoCameraRoundedIcon from '@material-ui/icons/PhotoCameraRounded'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import { Menu, MenuItem } from './VehicleTypes'
import { vehiclesTypes } from '../../Utils/vehicleTypes'

const AddNewCar = props => {
	const classes = useClasses()

	const [open, setOpen] = React.useState(false)
	const [anchorEl, setAnchorEl] = React.useState(null);
	var upload
	const { isFirst, isFirstCourier, isLoading, uploadVehicle, resetUploadVehicle,setUploadVehicleValue, close, description, picture, type } = props

	const onCancel = () => {
		setOpen(false)
		resetUploadVehicle()
	}

	const onSave = () => {
		uploadVehicle()
	}

	React.useEffect(() => {
		if(close)
			setOpen(false)
	},[close])

	const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

	return (
		<>
		{ isFirst ? (
			<Button size="small" variant="contained" color="primary" className={classes.apply} onClick={() => setOpen(true)}>
				APPLY
			</Button>
		) : isFirstCourier ? (
			<ListItem button classes={{root:[classes.listItem,classes.addCar].join(' ')}} onClick={() => setOpen(true)}>
			  <Icon icon={icons.vehicle} />
			  <ListItemText secondary="Apply now"
				  classes={{
					  primary: classes.primaryText,
					  secondary: [classes.secondaryText,classes.secondaryTextCar].join(' ')
				  }}
			  />
			</ListItem>
		) : (
			<ListItem button classes={{root:[classes.listItem,classes.addCar].join(' ')}} onClick={() => setOpen(true)}>
			  <Icon icon={icons.vehicle} />
			  <ListItemText secondary="Add new vehicle"
				  classes={{
					  primary: classes.primaryText,
					  secondary: [classes.secondaryText,classes.secondaryTextCar].join(' ')
				  }}
			  />
			</ListItem>
		)}

		{ <Modal
			className={classes.modal}
			open={open}
			closeAfterTransition
		  >
			<Fade in={open}>
			  <Box className={classes.modalInner}>
				  {(isFirst || isFirstCourier)?(
					  <>
					  <p className={classes.modalTitle}>
						In order to become a courier add your first vehicle
				  	  </p>
					  <br />
					  </>
				  ):null}

				  <Box style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
					  <Box style={{width: '80%'}}>
						  <p className={classes.modalTitle}>
	      					{ !description && <Badge variant="dot" color="error" style={{marginTop: '-3px',marginRight: '3px'}} anchorOrigin={{vertical: 'top',horizontal:'left'}} />}
	      						Short description
	      				</p>
	    				<TextField
	    					disabled={isLoading}
	    					classes={{root: classes.modalInput }}
	    					InputProps={{
	    						classes: {
	    							input: classes.modalInputText
	    						}
	    					}}
	    					value={description}
	    					onChange={e => setUploadVehicleValue({description:e.target.value})}
	    					size="small"
	    					variant="outlined"
	    					color="secondary"
	    				/>
					  </Box>

					  <Box>
						  <p className={classes.modalTitle}>
	      					{ !type && <Badge variant="dot" color="error" style={{marginTop: '-3px',marginRight: '3px'}} anchorOrigin={{vertical: 'top',horizontal:'left'}} />}
							Type
							{ type ? <img src={vehiclesTypes[type-1].icon} width="30px" height="23px" className={[classes.typeImage,(isFirst||isFirstCourier)?classes.typeImageFirst:''].join(' ')}/> : ''}
	      				</p>
						  <Button
	              variant="contained"
	              color="secondary"
				  className={classes.buttonType}
	              onClick={handleClick}
	            >
	      		  { type ? (
	      			  vehiclesTypes[type-1].name
	      		) : "Select type"}
	            </Button>
	      	  <Menu
	      		  style={{zIndex: 2000}}
	              id="customized-menu"
	              anchorEl={anchorEl}
	              keepMounted
	              open={Boolean(anchorEl)}
	              onClose={handleClose}
	            >


	      			  {
	      				  vehiclesTypes.map((vehicle,index) => {
	      					  return (
	      						  <MenuItem onClick={() => {setUploadVehicleValue({type:index+1});handleClose()}}>
	      							  <ListItemIcon>
	      					            <img src={vehicle.icon} width="30px" height="23px"/>
	      					          </ListItemIcon>
	      				          <ListItemText primary={vehicle.name} />
	      				        </MenuItem>
	      					  )
	      				  })
	      			  }

	      	  </Menu>
					  </Box>

  				</Box>



				<p className={classes.modalTitle}>
					{ !picture && <Badge variant="dot" color="error" style={{marginTop: '-3px',marginRight: '3px'}} anchorOrigin={{vertical: 'top',horizontal:'left'}} />}
						Vehicle picture
				</p>

				<input
					type="file"
					accept="image/x-png,image/jpeg,image/gif"
					className={classes.uploadInput}
					ref={ref => upload = ref}
					onChange={e => setUploadVehicleValue({picture:e.target.files[0]})}
				/>

				<Box className={classes.uploadImageBox}>
					<Button size="small" variant="contained" color="secondary" className={classes.uploadButton} onClick={() => upload.click()}>
						SELECT
					</Button>
					{
						picture ? (
							<DeleteRoundedIcon className={classes.cameraIconUpload} color="primary" onClick={() => setUploadVehicleValue({picture:null})}/>
						) : (
							<PhotoCameraRoundedIcon className={classes.cameraIconUpload} color="primary" onClick={() => upload.click()}/>
						)
					}

					{
						picture ? (
							<img src={URL.createObjectURL(picture)} className={classes.uploadedImage} onClick={() => upload.click()}/>
						) : (
							<Box className={classes.uploadPlaceholder}>
								<img src={logoCar} className={classes.uploadPlaceholderCar} onClick={() => upload.click()}/>
								No picture selected
							</Box>
						)
					}
				</Box>

				<Box className={classes.modalButtons}>
					<Button disabled={isLoading} variant="contained" color="secondary" className={classes.modalButton} onClick={onCancel}>
						{isLoading && <Icon icon={isLoadingIcon}/>} Cancel
					</Button>
					<Button disabled={isLoading} variant="contained" color="primary" className={classes.modalButton} onClick={onSave}>
						{(isFirst || isFirstCourier)?"APPLY":"SAVE"}
					</Button>
				</Box>
			  </Box>
			</Fade>
		  </Modal>}
	  	</>
	)
}

const mapStateToProps = state => {
	const data = uploadVehicleSelector(state)
	return {
		...data
	}
}

const mapDispatchToProps = dispatch => (bindActionCreators({
	setUploadVehicleValue,
	resetUploadVehicle,
	uploadVehicle
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(AddNewCar)
