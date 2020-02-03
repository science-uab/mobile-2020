import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import useClasses from './homeCss'
import {Box, Modal, Backdrop, Fade} from '@material-ui/core'
import { selectLoginData, selectLoginErrors } from '../../Selectors'
import { updateLoginValue, doLogin } from '../../Actions'
import {bannerHome} from '../../Images'
import {Header} from '../Header'
import Footer from '../Footer'
import ContinutHome from './homeComps'

function Login(props){
    const classes = useClasses()

    
    return(
        <Box className={classes.homeWindow}>
            <Header />

            <div className={classes.bannerHome}>
                <img src={bannerHome} alt="" />
            </div>
            <ContinutHome />
            
            <Footer/>
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