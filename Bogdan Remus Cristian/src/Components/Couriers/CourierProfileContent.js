import React from 'react'
import Icon from './Icon'
import { vehicles, defaultAvatar, icons } from '../../Images'
import DialogContent from '@material-ui/core/DialogContent'
import useClasses from '../Profile/Profile.classes'
import ListRow from './ListRow'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import { navigate, goBack, contact } from '../../Utils'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { renderVehicles,getVehicleImage } from './common'
import { setTemporaryValue } from '../../Actions'
import { viewModalProfileSelector, viewModalCarPictureSelector,profileCourierSelector } from '../../Selectors'
import Rating from '@material-ui/lab/Rating'

const CourierProfileContent = (props) => {

	const classes = useClasses()
	const { id,carid } = useParams()
	const { viewModalCarPicture,setTemporaryValue,viewModalProfile,courier } = props
	const cid = viewModalCarPicture > 0 ? viewModalCarPicture : carid

	if(!courier)
		return null

	const { name, courierSince, email, phone, working, outside, stars, avatar, schedule,prices } = courier
	const { envelope, normal, extra } = prices

	const getPrices = () => {
		let message = ""
		if(envelope !== "0.00")
			message += "E: $" + envelope + " "
		if(normal !== "0.00")
			message += "P: $" + normal + "/kg "
		if(extra !== "0.00" && outside)
			message += "Extra km: $" + extra + "/km "
		return message.trim() || "not set yet"
	}

	const getScheduleText = () => {
		if(schedule.start === '00:00' && schedule.end === '00:00')
			return "not set"
		return "Usually working from " + schedule.start + " to " + schedule.end
	}

	return (
		<DialogContent style={{backgroundColor: '#fafafa',padding: 0,margin:0}}>
			<Box className={classes.profile}>
				<Box className={classes.list}>
					<Box className={classes.avatarBox}>
						<Box className={classes.avatarImageBox}>
							<img src={avatar ? 'https://speedster.cristi.club/media/' + avatar : defaultAvatar} className={classes.avatar}/>
						</Box>

						<Box className={classes.avatarBoxInner}>
							<Typography color="primary" variant="h6" className={classes.memberName}>
								{name}
							</Typography>
							<Typography className={classes.memberSince}>
								courier since {moment(courierSince).year()}
							</Typography>
						</Box>
					</Box>
				</Box>


				<List className={classes.courierList}>

					{ email && (
						<> {/* Personal information */}
						<ListRow
							title="E-mail"
							value={email}
							icon={icons.mail}
							black
							isClickable
							onClick={() => contact("mailto:" + email)}
						/>
						<ListRow
							title="Phone"
							value={phone}
							icon={icons.phone}
							isClickable={phone}
							onClick={() => phone ? contact("tel:" + phone) : null}
						/>
						</>
					)}

					<ListRow
						title="Rating"
						value={<Rating classes={{root:classes.rating}} name="read-only" value={stars} precision={0.5} max={7} readOnly />}
						icon={icons.star}
						black
					/>
					<ListRow
						title="Courier since"
						value={courierSince}
						icon={icons.schedule}
					/>
					<ListRow
						title="Working status"
						value={working ? "At work" : "Is not working right now"}
						icon={icons.status}
						black
					/>
					<ListRow
						title="Schedule"
						value={getScheduleText()}
						icon={icons.schedule}
					/>
					<ListRow
						title="Prices"
						value={getPrices()}
						icon={icons.price}
						black
					/>
					<ListRow
						title="Shipping outside city"
						value={outside ? "Yes" : "No"}
						icon={icons.outside}
					/>
					{renderVehicles(courier.vehicles)}
				</List>

				{ !id && (
					<Button color="secondary" size="small" variant="contained" className={classes.closeButton}
						onClick={() => !viewModalProfile ? goBack() : setTemporaryValue({viewModalProfile:0})}>
						Go back
					</Button>
				)}

				<Box className={classes.spacer}>
					Spacer
				</Box>
			</Box>
			<Modal
				className={classes.modal}
				open={cid > 0}
				closeAfterTransition
				onBackdropClick={() => !viewModalCarPicture ? goBack() : setTemporaryValue({viewModalCarPicture:0})}
			  >
			<Box className={[classes.modalInner,classes.modalVehicle].join(' ')}>
				<img src={getVehicleImage(courier.vehicles,cid)} className={[classes.topImage,classes.topImageVehicle].join(' ')}/>
				<Button color="primary" size="small" variant="contained" className={classes.closeVehicle}
					onClick={() => setTemporaryValue({viewModalCarPicture:0})}>
					close
				</Button>
			</Box>
		  </Modal>
		</DialogContent>
	)
}

const mapStateToProps = (state) => {
    return {
        viewModalProfile: viewModalProfileSelector(state),
		viewModalCarPicture: viewModalCarPictureSelector(state),
		courier: profileCourierSelector(state),
    }
}

const mapDispatchToProps = dispatch => (bindActionCreators({
    setTemporaryValue
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(CourierProfileContent)
