import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import Button from '@material-ui/core/Button'
import useClasses from './Home.classes'
import { navigate } from '../../Utils'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { setSettingsValue } from '../../Actions'
import { isLoadingSelector, showBecomeCourierSelector } from '../../Selectors'
import List from '@material-ui/core/List'
import HomeRow from './HomeRow'
import CancelRoundedIcon from '@material-ui/icons/CancelRounded'
import { becomeCourier, sendPack, myPacks, couriersAround, packRequests,logoCar } from '../../Images'
import { MyPacks,SendPack,CouriersAround,PackRequests } from './Pages'
import { useHistory } from 'react-router-dom'
import AddNewCar from '../Profile/AddNewCar'

function Home(props) {

	const classes = useClasses()
	const history = useHistory()
	const isBack = history.location.pathname.split('/')[2] !== undefined
	const { become, setSettingsValue, courier,startSync } = props

    return (
			<Box className={[classes.home,isBack ? classes.goBack : ''].join(' ')}>
				<Collapse in={become && !courier} className={classes.becomeCourier}>
					<img src={becomeCourier} width="100%" />
					<Box className={classes.becomeCourierContent}>
						<Box className={classes.becomeCourierContentInner}>
							<Typography classes={{body1: classes.aplica}}>
								Apply now
							</Typography>
							<Typography classes={{body1: classes.ptjobul}}>
								Become a courier today
							</Typography>

							<img src={logoCar} className={classes.uploadPlaceholderCar}/>

							<AddNewCar isFirst />

							<IconButton
								classes={{root:classes.closeBecomeCourier,label:classes.closeBecomeCourierIcon}}
								onClick={() => setSettingsValue({showBecomeCourier:false})}
							>
								<CancelRoundedIcon />
							</IconButton>
						</Box>
					</Box>
				</Collapse>

				<List className={classes.homeList}>

					<HomeRow title="Send pack" icon={sendPack} callback={() => navigate('/home/sendpack')} />
					<HomeRow title="My packs" icon={myPacks} callback={() => navigate('/home/mypacks')} />
					<HomeRow title="Couriers in the area" icon={couriersAround} callback={() => navigate('/home/couriersaround')} />
					{
						courier && <HomeRow title="Pack requests" icon={packRequests} callback={() => navigate('/home/packrequests')} />
					}
				</List>

				<MyPacks />
				<SendPack />
				<PackRequests />
				<CouriersAround />

			</Box>
	)
}

const mapStateToProps = (state) => {
	const showBecomeCourier = showBecomeCourierSelector(state)
    return {
        isLoading: isLoadingSelector(state),
		...showBecomeCourier
    }
}

const mapDispatchToProps = dispatch => (bindActionCreators({
    setSettingsValue,
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(Home)
