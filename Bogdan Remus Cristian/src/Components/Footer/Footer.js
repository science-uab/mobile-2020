import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import useClasses from './Footer.classes'
import { Link, useLocation } from 'react-router-dom'
import { activeTabSelector } from '../../Selectors'
import { changeTab } from '../../Actions'
import { navigate } from '../../Utils'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { home, couriers, profile, about } from '../../Images'



function Footer(props) {

	const classes = useClasses()
	const location = useLocation()
	const { tab, changeTab } = props

	React.useEffect(() => {
		const path = window.location.pathname.substr(1).split('/')[0]
		if(tab !== path){
			changeTab(path)
		}
	},[location])

    return (
		<BottomNavigation value={tab} onChange={(e,tab) => changeTab(tab)} className={classes.footer}>
			<BottomNavigationAction
				component={Link}
				to="/"
				label="HOME"
				value="home"
				icon={<img src={home} className={[classes.icon,tab !== 'home' && classes.iconInactive].join(' ')} />}
				classes={{
					root: classes.tab,
					selected: classes.selected,
					label: classes.label,
				}}
			/>
			<BottomNavigationAction
				component={Link}
				to="/couriers"
				label="COURIERS"
				value="couriers"
				icon={<img src={couriers} className={[classes.icon,tab !== 'couriers' && classes.iconInactive].join(' ')} />}
				classes={{
					root: classes.tab,
					selected: classes.selected,
					label: classes.label
				}}
			/>
			<BottomNavigationAction
				component={Link}
				to="/profile"
				label="PROFILE"
				value="profile"
				icon={<img src={profile} className={[classes.icon,tab !== 'profile' && classes.iconInactive].join(' ')} />}
				classes={{
					root: classes.tab,
					selected: classes.selected,
					label: classes.label
				}}
			/>
			<BottomNavigationAction
				component={Link}
				to="/about"
				label="ABOUT"
				value="about"
				icon={<img src={about} className={[classes.icon,tab !== 'about' && classes.iconInactive].join(' ')} />}
				classes={{
					root: classes.tab,
					selected: classes.selected,
					label: classes.label
				}}
			/>
		</BottomNavigation>
	)
}

const mapStateToProps = (state) => {
    return {
        tab: activeTabSelector(state),
    }
}

const mapDispatchToProps = dispatch => (bindActionCreators({
    changeTab
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
