import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Box from '@material-ui/core/Box'
import Badge from '@material-ui/core/Badge'
import {Link as MLink} from '@material-ui/core'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import useClasses from './Init.classes'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login'
import Grid from '@material-ui/core/Grid'
import PersonRoundedIcon from '@material-ui/icons/PersonRounded'
import LockRoundedIcon from '@material-ui/icons/LockRounded'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import { temporarySelector } from '../../Selectors'
import { setTemporaryValue, tryLogin, fbLogin, gLogin, failedLogin } from '../../Actions'
import { navigate } from '../../Utils'

function Init(props) {

	const classes = useClasses()

	const { fbLogin, gLogin, tryLogin, setTemporaryValue, failedLogin, isLoading } = props
	const { email, password, emailError, passwordError } = props

	const goToForgotPassword = () => {
		setTemporaryValue({
			passwordError: false,
			emailError: false,
			password: '',
		})
		navigate('/forgot')
	}

    return (
		<Box className={classes.initContainer}>

			<img src={require('../../Images/logo.png')} className={classes.logo} />

			<Typography className={classes.title}>
				<i>LOGIN</i>
			</Typography>

			<Box>
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

				<Grid container spacing={1} alignItems="flex-end">
					<TextField
						disabled={isLoading}
						error={passwordError}
	  				  placeholder="Password"
					  value={password}
					  type="password"
	  				  InputProps={{
	  					startAdornment: (
	  					  <InputAdornment position="start">
	  						<IconButton>
								<Badge color="error" variant="dot" invisible={!passwordError} anchorOrigin={{vertical: 'top',horizontal:'left'}}>
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
					  onChange={e => setTemporaryValue({password:e.target.value})}
	  				/>
		        </Grid>



				<Button className={classes.loginButton} variant="contained" color="secondary" onClick={() => tryLogin()}>
					{isLoading && <img src={require('../../Images/loading.svg')} height="24px" width="24px" className={classes.loading}/>}
					{isLoading ? "CONNECTING..." : "LOGIN"}
				</Button>
			</Box>

			<Box className={classes.divider}>
				<span className={classes.or}>OR</span>
			</Box>

			<FacebookLogin
	          appId="303540063884445"
	          autoLoad={false}
	          fields="name,first_name,last_name,email,picture.width(500)"
	          callback={response => fbLogin({...response,platform:'Facebook'})}
			  onFailure={response => failedLogin(response,'Google')}
			  disabledStyle={{background: '#7788e7',}}
			  render={renderProps => (
			    <Button
					disabled={isLoading}
					variant="contained"
					onClick={renderProps.onClick}
					classes={{
						root: [classes.loginWith,classes.loginWithFacebook].join(' '),
						startIcon: classes.loginWithFacebookIcon,
						disabled: classes.disabled,
					}}
					startIcon={<img src={require('../../Images/fb.png')} width="20px" height="20px" />}>
					Login with Facebook
				</Button>
			  )}
	        />

			<GoogleLogin
		        clientId="20911850401-mqmv016c42b88kk5v96j403m2m65qdm0.apps.googleusercontent.com"
		        onSuccess={response => gLogin({...response,platform:'Google'})}
		        onFailure={response => failedLogin(response,'Google')}
				scope='https://www.googleapis.com/auth/user.birthday.read'
				render={renderProps => (
					<Button
						disabled={isLoading}
						variant="contained"
						className={[classes.loginWith,classes.loginWithGoogle].join(' ')}
						onClick={renderProps.onClick}
						classes={{
							startIcon: classes.loginWithGoogleIcon,
							label: classes.labelGoogle
						}}
						startIcon={<img src={require('../../Images/g.png')} width="20px" height="20px"/>}
					>
						Login with Google
					</Button>
  			  )}
		      />

			  <Box style={{flexGrow: 1}} />

			  <Box className={classes.initFooter}>
				  <Box className={classes.spacer} />
					  <Typography variant="caption" className={classes.spanForgot} onClick={goToForgotPassword}>
						  Forgot password ?
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
	const initProps = temporarySelector(state)
    return {
        ...initProps
    }
}

const mapDispatchToProps = dispatch => (bindActionCreators({
    setTemporaryValue,
	tryLogin,
	fbLogin,
	gLogin,
	failedLogin
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(Init)
