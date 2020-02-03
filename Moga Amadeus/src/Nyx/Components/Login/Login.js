import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import useClasses from './loginCss'
import Box from '@material-ui/core/Box'
import { selectLoginData, selectLoginErrors } from '../../Selectors'
import { updateLoginValue, doLogin } from '../../Actions'

function Login(props){
    const classes = useClasses()
    // const { email, password, isLoading } = props.data
    const {isLoading} = props.data
    const { errors,updateLoginValue,doLogin } = props

    return(
        <Box style={{display:'flex',flexDirection:'column'}}>
            {
                isLoading && <span>mesaj loading</span>
            }
            {
                errors.email && <span> INVALID EMAIL</span>
                
            }
            {
                errors.password && <span>INVALID PASSWORD</span>
            }
            <input className={classes.inputType} type="text" onChange={e => updateLoginValue({email:e.target.value})} disabled={isLoading}/>
            <input type="password" onChange={e => updateLoginValue({password:e.target.value})} disabled={isLoading}/>
            <input type="button" value="LOGIN" onClick={() => !isLoading ? doLogin() : null} />
        </Box>
    )  
}

const mapStateToProps = (state) =>{

    return{
        data: selectLoginData(state),
        errors: selectLoginErrors(state),
        
    }
}


const mapDispatchToProps = dispatch => (bindActionCreators({
    //actions
    updateLoginValue,
    doLogin,
},dispatch))

export default connect(mapStateToProps,mapDispatchToProps)(Login)