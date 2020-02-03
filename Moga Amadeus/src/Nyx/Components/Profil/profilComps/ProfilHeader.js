import React, { useState } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import useClasses from '../profilCss'
import {testImage,cameraIcon, profileBackIcon} from '../../../Images'
import {Box, Button} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import {selectLoginData} from '../../../Selectors'
import history from '../../../Navigation/history'
import {setUploadedFile,uploadImage} from '../../../Actions'
import useForceUpdate from 'use-force-update';


function ProfilHeader(props){
    const classes = useClasses()

    const {setUploadedFile,loginData,uploadImage} = props

    const forceUpdate = useForceUpdate();
    const inputF = React.createRef()
    const inputCover = React.createRef()
    const [isBlob,setBlob] = React.useState(false)
    const [isBlobCover,setBlobCover] = React.useState(false)
    const onChangeAvatar = (e) => {
        setUploadedFile(e.target.files[0],'avatar')
        // loginData.avatar = URL.createObjectURL(e.target.files[0])
        
        setBlob(true)
        uploadImage()
        forceUpdate()
        
      }
      const onChangeCover = (e) => {
        setUploadedFile(e.target.files[0],'cover')
        // loginData.cover = URL.createObjectURL(e.target.files[0])
        
        setBlobCover(true)
        uploadImage()
        forceUpdate()
        
      }
    
    return(
        <>
            <Box className={classes.ProfilHeader}>
                <input type="file" onChange={onChangeCover} ref={inputCover} style={{display: 'none'}}/>
                <img alt="aa" className={classes.profileCoverImage} src={loginData.cover === 'none'? 'https://moga.cristi.club/imagini/defaultCover.jpg' :"https://moga.cristi.club/imagini/"+loginData.cover} />
                <Box className={classes.backIcon} onClick={() => history.goBack()}>
                    <img alt="aa" src={profileBackIcon}/>
                </Box>
                <Button onClick={() => inputCover.current.click()}  disableElevation variant="contained" className={classes.changeCoverButton}>
                    Schimba
                </Button>
                <div className={classes.modalAvatarInfo}>
                    <input type="file" onChange={onChangeAvatar} ref={inputF} style={{display: 'none'}}/>
                    <Box onClick={() => inputF.current.click()} className={classes.avatarBox}>
                        <img alt="aa" className={classes.profilAvatar} src={loginData.avatar === 'none'? 'https://moga.cristi.club/imagini/defaultAvatar.jpg' :'https://moga.cristi.club/imagini/'+loginData.avatar} />
                        <div className={classes.cameraIcon}>
                            <img alt="aa"  src={cameraIcon}/>
                        </div>
                        
                    </Box>
                    <Box className={classes.modalInfoText}>
                        <p className={classes.modalInfoNume}>
                            {loginData.prenume} <span className={classes.numeCuloare}>{loginData.nume}</span>
                        </p>
                        <p className={classes.modalInfoLocatie}>
                            {loginData.oras},{loginData.judet}
                        </p>
                    </Box>
                    <Box className={classes.profilRating}>
                        <Rating name="read-only" defaultValue={loginData.rating}  size="small" readOnly />
                    </Box>
                </div>
                
            </Box>
        </>
    )  
}

const mapStateToProps = (state) =>{

    return{
        loginData: selectLoginData(state),
    }
}


const mapDispatchToProps = dispatch => (bindActionCreators({
    //actions
    setUploadedFile,
    uploadImage,
},dispatch))

export default connect(mapStateToProps,mapDispatchToProps)(ProfilHeader)