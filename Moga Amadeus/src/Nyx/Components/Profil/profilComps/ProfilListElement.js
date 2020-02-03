import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import useClasses from '../profilCss'
import {editIcon} from '../../../Images'
import {Box, TextField,InputAdornment,Button} from '@material-ui/core'
import Scrollbar from "react-scrollbars-custom";

function ProfilListElement(props){
    const classes = useClasses()
    const {text, label, icon} = props
    return(
        <>
            <Box className={classes.profilListElement}>
                <Box className={classes.listElementIcon}>
                    <img src={icon} />
                </Box>
                <Box className={classes.listElementTextSpace}>
                    <p className={classes.listElementLabel}>{label}</p>
                    <p className={classes.listElementText}>{text}</p>
                </Box>
                <Box className={classes.listElementEditIcon}>
                    <img src={editIcon} />
                </Box>
            </Box>
        </>
    )  
}

const mapStateToProps = (state) =>{

    return{
    }
}


const mapDispatchToProps = dispatch => (bindActionCreators({
    //actions
},dispatch))

export default connect(mapStateToProps,mapDispatchToProps)(ProfilListElement)