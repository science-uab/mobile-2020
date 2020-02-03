import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import useClasses from './profilCss'
import {Box,Button} from '@material-ui/core'
import { ProfilHeader,ProfilList, ProfilTitle } from './profilComps'
import {resetLoginData} from '../../Actions/'
import {Link} from 'react-router-dom'

function Profil(props){
    const classes = useClasses()
    const {resetLoginData} = props
    return(
        <Box className={classes.ProfileWindow}>
            <ProfilHeader />
            <ProfilTitle title={"Profil si date personale"} />
            <ProfilList />
            <Link className={classes.logOutButtonContainer} to="/">
            <Button onClick={() => resetLoginData()} variant="contained" className={classes.logOutButton}  disableElevation>LOG OUT</Button>
            </Link>
        </Box>
    )  
}

const mapStateToProps = (state) =>{

    return{
    }
}


const mapDispatchToProps = dispatch => (bindActionCreators({
    //actions
    resetLoginData,
},dispatch))

export default connect(mapStateToProps,mapDispatchToProps)(Profil)