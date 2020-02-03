import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import useClasses from '../profilCss'
import {Box} from '@material-ui/core'
import ProfilListElement from './ProfilListElement'
import {profilListItems} from '../../../Utils'
import {selectLoginData} from '../../../Selectors'
import {userIcon, phoneIcon, emailIcon, passwordIcon} from '../../../Images'

function ProfilList(props){
    const classes = useClasses()
    const {loginData} = props
    const renderListaProfil = ()  =>  (
        profilListItems.map(({text,icon,label}, index) => (
            <ProfilListElement text={text} icon={icon} label={label} key={index}/>
          ))
    )

    return(
        <Box className={classes.profileList}>
            <ProfilListElement text={loginData.nume} label="Nume" icon={userIcon}/>
            <ProfilListElement text={loginData.prenume} label="Prenume" icon={userIcon}/>
            <ProfilListElement text={loginData.judet} label="Judet" icon={userIcon}/>
            <ProfilListElement text={loginData.oras} label="Oras" icon={userIcon}/>
            <ProfilListElement text={loginData.adresa} label="Adresa" icon={userIcon}/>
            <ProfilListElement text={loginData.telefon} label="Telefon" icon={phoneIcon}/>
            <ProfilListElement text={loginData.email} label="Email" icon={emailIcon}/>
            <ProfilListElement text={"••••••••••••••••"} label="Parola" icon={passwordIcon}/>
            {/* {
                renderListaProfil()
            } */}
        </Box>
    )  
}

const mapStateToProps = (state) =>{

    return{
        loginData: selectLoginData(state),
    }
}


const mapDispatchToProps = dispatch => (bindActionCreators({
    //actions
},dispatch))

export default connect(mapStateToProps,mapDispatchToProps)(ProfilList)