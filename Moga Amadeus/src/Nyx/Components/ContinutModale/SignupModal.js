import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import useClasses from './modaleCss'
import {userIcon, passwordIcon, signupIllustration} from '../../Images'
import {Box, TextField,InputAdornment,Button} from '@material-ui/core'
import {doSignupClean,updateSignupValue,doSignup} from '../../Actions'

function ContinutModalLogin(props){
    const classes = useClasses()
    const {doSignupClean,updateSignupValue,doSignup} = props
    return(
        // <Box className={classes.modalContainer}>
        <>
            <img className={classes.ilustratieLogin} src={signupIllustration}/>
            <p className={classes.modalTitle}>
                SIGN<span>UP</span>
            </p>
            <TextField onChange={e => updateSignupValue({email:e.target.value})}
                className={classes.inputLogin} label="Email" InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <img src={userIcon} />
                    </InputAdornment>
                ),}} />
            <TextField onChange={e => updateSignupValue({password:e.target.value})} className={classes.inputLogin} label="Password" type="password" InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <img src={passwordIcon} />
                </InputAdornment>
                ),
                }} />
            <TextField onChange={e => updateSignupValue({repeatPassword:e.target.value})} className={classes.inputLogin} label="Repeat password" type="password" InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <img src={passwordIcon} />
                </InputAdornment>
                ),
                }} />
            <Button onClick={() => doSignup()} className={classes.loginButton} variant="contained" disableElevation>CREAZA CONT</Button>
            <div className={classes.bottomInfo}>
                <p>Ai deja cont? <span> LOG IN </span></p>
            </div>
        {/* </Box> */}
        </>
    )  
}

const mapStateToProps = (state) =>{

    return{
    }
}


const mapDispatchToProps = dispatch => (bindActionCreators({
    //actions
    doSignupClean,
    doSignup,
    updateSignupValue
},dispatch))

export default connect(mapStateToProps,mapDispatchToProps)(ContinutModalLogin)