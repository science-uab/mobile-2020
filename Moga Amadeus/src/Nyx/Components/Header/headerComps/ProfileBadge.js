import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import useClasses from '../headerCss'
import {Link} from 'react-router-dom'
import {Box, ClickAwayListener, Collapse, Button} from '@material-ui/core'
import { selectLoginData } from '../../../Selectors'
import { testImage, badgeMenuIcon, profileIcon, anunturiIcon} from '../../../Images'


function ProfileBadge(props){
    const classes = useClasses()

    const [open, setOpen] = React.useState(false)
	const onClickAway = () => {
		open && setOpen(false)
    }
    
    const {loginData} = props
    
    return(
        <>
        <ClickAwayListener onClickAway={onClickAway}>
				<Box style={{zIndex: '999',position: 'relative'}}>
					<Box classes={{root:classes.profileBadge}} variant="contained" onClick={() => setOpen(open => !open)}>
                        <img className={classes.profileBadgeAvatar} src={"https://moga.cristi.club/imagini/"+loginData.avatar} />
                        <Box className={classes.profileBadgeNume}>
                            {loginData.prenume} <span>{loginData.nume}</span>
                        </Box>
                        <img className={classes.profileBadgeMenuIcon} src={badgeMenuIcon}/>
                    </Box>

                    <Collapse classes={{container:classes.profileBadgeContinut}} in={open}>
                        <Box className={classes.continutBadge}>
                            <Box className={classes.emptySpace}></Box>
                            <Link to="/profil">
                                <Box className={classes.profileBadgeListElement}>
                                    <img src={profileIcon}/>
                                    <Box className={classes.profileBadgeLinkTo} to="/profil">
                                        Profil
                                    </Box>
                                </Box>
                            </Link>
                            <Link to="/anunturi">
                                <Box className={classes.profileBadgeListElement}>
                                    <img src={anunturiIcon}/>
                                    <Box className={classes.profileBadgeLinkTo}>
                                        Anunturile mele
                                    </Box>
                                </Box>
                            </Link>
                        </Box>
                    </Collapse>
				</Box>
	    </ClickAwayListener>
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
    
},dispatch))

export default connect(mapStateToProps,mapDispatchToProps)(ProfileBadge)
