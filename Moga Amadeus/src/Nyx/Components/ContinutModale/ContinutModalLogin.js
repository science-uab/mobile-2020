import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import useClasses from './modaleCss'
import {xIcon,loginIllustration, userIcon, passwordIcon} from '../../Images'
import {Box, TextField,InputAdornment,Button} from '@material-ui/core'
import {updateLoginValue, doLogin } from '../../Actions'
import {selectLoginData} from '../../Selectors'

function ContinutModalLogin(props){
    const classes = useClasses()

    const {isLoading, updateLoginValue,doLogin } = props

    return(
        // <Box className={classes.modalContainer}>
        <>
            <img className={classes.ilustratieLogin} src={loginIllustration}/>
            <p className={classes.modalTitle}>
                LOG<span>IN</span>
            </p>
            <TextField
                className={classes.inputLogin}
                label="Email"
                onChange={e => updateLoginValue({email:e.target.value})}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <img src={userIcon} />
                    </InputAdornment>
                ),
                }}
            />
            <TextField
            className={classes.inputLogin}
            label="Password"
            type="password"
            onChange={e => updateLoginValue({password:e.target.value})}
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <img src={passwordIcon} />
                </InputAdornment>
                ),
                }}
            />
            
            <Button onClick={() => !isLoading ? doLogin() : null} className={classes.loginButton} variant="contained" disableElevation >LOG IN</Button>
            <div className={classes.bottomInfo}>
                <p>Ai uitat parola ?</p>
                <p>Nu ai cont? <span> SIGN UP </span></p>
            </div>
        {/* </Box> */}
        </>
    )  
}

const mapStateToProps = (state) =>{
    const data = selectLoginData(state)
    return{
        ...data
    }
}


const mapDispatchToProps = dispatch => (bindActionCreators({
    updateLoginValue,
    doLogin,
    //actions
},dispatch))

export default connect(mapStateToProps,mapDispatchToProps)(ContinutModalLogin)