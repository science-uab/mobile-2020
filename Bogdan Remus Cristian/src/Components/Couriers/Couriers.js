import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Box from '@material-ui/core/Box'
import Modal from '@material-ui/core/Modal'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import Typography from '@material-ui/core/Typography'
import useClasses from './Couriers.classes'
import {useHistory} from 'react-router-dom'
import Search from './Search'
import { setTemporaryValue } from '../../Actions'
import { isLoadingIcon } from '../../Images'
import CourierProfileContent from './CourierProfileContent'
import { searchValueSelector,onlineCouriersSelector,offlineCouriersSelector,couriersSelector } from '../../Selectors'
import { viewModalProfileSelector, viewModalCarPictureSelector } from '../../Selectors'
import { renderCouriers } from './common'

const Couriers = props => {

	const classes = useClasses()
	const history = useHistory()
	const { searchValue,onlineCouriers,offlineCouriers,searchCouriers } = props
	const { viewModalProfile, viewModalCarPicture,setTemporaryValue } = props

    return (
		<Box className={classes.couriers}>
			<Box className={classes.list}>
				<Search />

				{
					searchValue === '' ? (
						<List>
							{
								onlineCouriers.length ? (
									<>
										<ListSubheader className={classes.stickHeader}>Online couriers</ListSubheader>
										{renderCouriers(onlineCouriers)}
									</>
								) : (
									<Box className={classes.noOnline}>
										No online couriers in your city
									</Box>
								)
							}

							{
								offlineCouriers.length ? (
									<>
										<ListSubheader className={classes.stickHeader}>Offline couriers</ListSubheader>
										{renderCouriers(offlineCouriers)}
									</>
								) : null
							}
						</List>
					) : (
						<List>
							<ListSubheader className={[classes.stickHeader,classes.resultsText].join(' ')}>Search results</ListSubheader>
							{ searchCouriers.length > 0 ? renderCouriers(searchCouriers) : null}
						</List>
					)
				}
			</Box>


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
		</Box>
	)
}

const mapStateToProps = (state) => {
    return {
		searchValue: searchValueSelector(state),
		onlineCouriers:  onlineCouriersSelector(state),
		offlineCouriers: offlineCouriersSelector(state),
		searchCouriers: couriersSelector(state),
		viewModalProfile: viewModalProfileSelector(state),
		viewModalCarPicture: viewModalCarPictureSelector(state),
    }
}

const mapDispatchToProps = dispatch => (bindActionCreators({
	setTemporaryValue
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(Couriers)
