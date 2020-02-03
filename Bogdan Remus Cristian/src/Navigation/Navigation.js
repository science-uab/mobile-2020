import React from "react"
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Home, Footer, About, Init, Register, Notification, ForgotPassword, Header, Profile, Couriers } from '../Components'
import { CouriersAround } from '../Components/Home/Pages'
import useClasses from './Navigation.classes'
import { isMobile } from 'react-device-detect'
import { history } from '../Utils/navigate'
import PrivateRoute from './PrivateRoute'
import { setTemporaryValue,startSync } from '../Actions'
import { isLoggedSelector } from '../Selectors'
import {useOnlyOnce} from '../Utils'
import '../Themes/Global.css'

function Navigation(props) {

	const classes = useClasses()
	const { isLogged, setTemporaryValue, startSync } = props

	useOnlyOnce(() => {
		isLogged && startSync()
	})

	if(!isMobile)
		return (
			<div>
				This app works only on mobile and tablet
			</div>
		)

	return (
		<Router history={history}>
			<Notification />

			{ isLogged && <Header /> }

			<main className={[classes.rootContainer,isLogged && classes.logged].join(' ')}>
				<Switch>
					<Route path="/register" component={Register} />

					<Route path="/forgot/:id/:hash" component={ForgotPassword} />
					<Route path="/forgot" component={ForgotPassword} />

					<PrivateRoute path="/home/couriersaround/:id" component={CouriersAround} />

					{/* <PrivateRoute path="/couriers/:id/:carid" component={Couriers} />
					<PrivateRoute path="/couriers/:id" component={Couriers} /> */}
					<PrivateRoute path="/couriers" component={Couriers} />

					<PrivateRoute path="/about" component={About} />

					<PrivateRoute path="/home/:page" component={Home} />
					<PrivateRoute path="/home" component={Home} />

					<PrivateRoute path="/profile" component={Profile} />

					<Route path="/" render={props => (isLogged ? <Redirect to={{pathname:'/home'}} /> : <Init {...props} />)} />

				</Switch>
			</main>

			{ isLogged && <Footer /> }

		</Router>
	)
}

const mapStateToProps = (state) => {
    return {
        isLogged: isLoggedSelector(state)
    }
}

const mapDispatchToProps = dispatch => (bindActionCreators({
    setTemporaryValue,
	startSync
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
