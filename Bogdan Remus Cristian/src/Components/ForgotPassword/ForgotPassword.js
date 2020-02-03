import React, {Component,useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import {Link as MLink} from '@material-ui/core'
import { Link, useParams } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import PersonRoundedIcon from '@material-ui/icons/PersonRounded'
import LockRoundedIcon from '@material-ui/icons/LockRounded'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import useClasses from '../Init/Init.classes'
import { temporarySelector, newPassSelector, isLoggedSelector } from '../../Selectors'
import { navigate } from '../../Utils'
import { closeNotification, setTemporaryValue, tryRecoverPassword, tryResetPassword } from '../../Actions'

function ForgotPassword(props) {

	const classes = useClasses()
	const { id, hash } = useParams()

	const { tryResetPassword, tryRecoverPassword, setTemporaryValue, isLoading, isLogged } = props
 	const { email, emailError } = props
	const { newPass, newPass2, newPassError, newPassError2, hashError } = props

	useEffect(() => {
		if((id && hash && (id < 1 || hash.length !== 32)) || isLogged)
			navigate('/')
	},[id,hash,isLogged])

	const goToInit = () => {
		setTemporaryValue({
			passwordError: false,
			emailError: false,
			password: '',
		})
		navigate('/')
	}

    return (
		<Box className={classes.initContainer} style={{textAlign: 'center'}}>

			<img src={require('../../Images/logo.png')} className={classes.logo} />

			<Typography className={classes.title}>
				<i>RECOVER PASSWORD</i>
			</Typography>

			<Box>

				{
					(id && hash) ? (
						<>
						{	hashError && (
								<Button className={[classes.loginButton,classes.startOver].join(' ')} variant="contained" color="primary" onClick={() => navigate('/forgot')}>START OVER</Button>
						)}
						{
							newPass !== newPass2 && (
								<h2 className={classes.error}>Passwords don't match</h2>
							)
						}
						<Grid container spacing={1} alignItems="flex-end">
							<TextField
								type="password"
								disabled={isLoading || hashError}
								error={newPassError}
							  placeholder="New password"
							  value={newPass}
							  InputProps={{
								startAdornment: (
								  <InputAdornment position="start">
									<IconButton>

									  <Badge color="error" variant="dot" invisible={!newPassError} anchorOrigin={{vertical: 'top',horizontal:'left'}}>
										  <LockRoundedIcon style={{fontSize: '10pt'}}/>
									   </Badge>
									</IconButton>
								  </InputAdornment>
								),
								classes: {
								  root: classes.input,
								  input: classes.placeholder,
								  underline: classes.underline,
								  error: classes.error,
							  }
							  }}
							  onChange={e => setTemporaryValue({newPass:e.target.value})}
							/>
						</Grid>
						<Grid container spacing={1} alignItems="flex-end">
							<TextField
								type="password"
								disabled={isLoading || hashError}
								error={newPassError2}
							  placeholder="Repeat new password"
							  value={newPass2}
							  InputProps={{
								startAdornment: (
								  <InputAdornment position="start">
									<IconButton>
									  <Badge color="error" variant="dot" invisible={!newPassError2} anchorOrigin={{vertical: 'top',horizontal:'left'}}>
										  <LockRoundedIcon style={{fontSize: '10pt'}}/>
									   </Badge>
									</IconButton>
								  </InputAdornment>
								),
								classes: {
								  root: classes.input,
								  input: classes.placeholder,
								  underline: classes.underline,
								  error: classes.error,
							  }
							  }}
							  onChange={e => setTemporaryValue({newPass2:e.target.value})}
							/>
						</Grid>
						<Button disabled={isLoading || hashError} className={[classes.loginButton,classes.recoverButton].join(' ')} variant="contained" color="secondary" onClick={() => tryResetPassword(hash,id)}>
							{isLoading && <img src={require('../../Images/loading.svg')} height="24px" width="24px" className={classes.loading}/>}
							{isLoading ? "LOADING..." : "RESET PASSWORD"}
						</Button>
						<Button className={[classes.loginButton,!hashError && classes.goBackButton].join(' ')} variant="contained" color="secondary" onClick={goToInit}>Go back</Button>
						</>
					) : (
						<>
						<Grid container spacing={1} alignItems="flex-end">
							<TextField
								disabled={isLoading}
								error={emailError}
							  placeholder="E-mail address"
							  value={email}
							  InputProps={{
								startAdornment: (
								  <InputAdornment position="start">
									<IconButton>

									  <Badge color="error" variant="dot" invisible={!emailError} anchorOrigin={{vertical: 'top',horizontal:'left'}}>
										  <PersonRoundedIcon style={{fontSize: '10pt'}}/>
									   </Badge>
									</IconButton>
								  </InputAdornment>
								),
								classes: {
								  root: classes.input,
								  input: classes.placeholder,
								  underline: classes.underline,
								  error: classes.error,
							  }
							  }}
							  onChange={e => setTemporaryValue({email:e.target.value})}
							/>
						</Grid>

						<Button disabled={isLoading} className={[classes.loginButton,classes.recoverButton].join(' ')} variant="contained" color="secondary" onClick={() => tryRecoverPassword(email)}>
							{isLoading && <img src={require('../../Images/loading.svg')} height="24px" width="24px" className={classes.loading}/>}
							{isLoading ? "SENDING..." : "SEND MAIL"}
						</Button>

						<Button className={[classes.loginButton,classes.goBackButton].join(' ')} variant="contained" color="secondary" onClick={goToInit}>Go back</Button>

						</>
					)
				}

			</Box>

			  <Box style={{flexGrow: 1}} />

			  <Box className={classes.initFooter}>
				  <Box className={classes.spacer} />
				  <Typography className={classes.spanRegister} variant="caption">
					  Already have an account ?
						  <MLink
							  onClick={goToInit}
							  component="button"
							  color="secondary"
							  variant="caption" className={classes.signUp}>
						    LOGIN
						  </MLink>
				  </Typography>

				  <Typography className={classes.spanRegister} variant="caption">
					  Don't have an account ?
					  <Link to="/register">
						  <MLink
							  component="button"
							  color="secondary"
							  variant="caption" className={classes.signUp}>
						    SIGN UP
						  </MLink>
					  </Link>
				  </Typography>
			  </Box>


		</Box>
	)
}

const mapStateToProps = (state) => {
	const { email, emailError, isLoading } = temporarySelector(state)
	const { newPass, newPass2, newPassError, newPassError2, hashError } = newPassSelector(state)
    return {
        email,
		emailError,
		isLoading,
		newPass,
		newPass2,
		newPassError,
		newPassError2,
		hashError,
		isLogged: isLoggedSelector(state)
    }
}

const mapDispatchToProps = dispatch => (bindActionCreators({
	closeNotification,
	setTemporaryValue,
	tryRecoverPassword,
	tryResetPassword
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
