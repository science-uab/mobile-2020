import React from "react"
import {connect} from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { isLoggedSelector } from '../Selectors'

const Private = ({ component: Component, ...rest }) => {

	const { isLogged } = rest

	return (
		<Route {...rest} render={(props) => (
	      isLogged
		  ? <Component {...props} />
	      : <Redirect to={{pathname: '/'}} />
	    )} />
	)
}

const mapStateToProps = (state) => {
    return {
        isLogged: isLoggedSelector(state),
    }
}

const PrivateRoute = connect(mapStateToProps)(Private)
export default PrivateRoute
