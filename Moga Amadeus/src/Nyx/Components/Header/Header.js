import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import useClasses from './headerCss'
import { Box, Drawer, Button, SwipeableDrawer, Modal, Fade } from '@material-ui/core';
import { selectModalStatus, selectIsLogged } from '../../Selectors'
import { changeModalStatus } from '../../Actions'
import { menuIcon, nixxRedLogo,nixxLogo } from '../../Images'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {menuItems} from '../../Utils'
import BlackBar from '../BlackBar'
import HeaderFals from './HeaderFals';
import {ContinutModalLogin, SignupModal} from '../ContinutModale'
import Rodal from 'rodal'
import 'rodal/lib/rodal.css'
import ProfileBadge from './headerComps'

function Header(props){
    const classes = useClasses()

    const {isLogged,modalStatus, modal, changeModalStatus} = props
    
    var modalWidth  = window.innerWidth - 30
    var modalHeight  = window.innerHeight - 30
    
    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;       
        }
        setState({ ...state, [side]: open });   
    }
    
    const sideList = side => (
        <div
            className={classes.drawerLeft}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
          <List>
            {menuItems.map(({text,icon,path}, index) => (
            <Link to="/anunturi" key={index}>
              <ListItem button >
                <ListItemIcon>
                    <img src={icon}/>
                </ListItemIcon>

                <p className={classes.menuItemText} >{text}</p>
              </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
        </div>
      )


    const [state, setState] = React.useState({
        left: false,
      });
    return(
        <>
        <Box className={classes.headerContainer}>
            <div className={classes.header}>
                <Button className={classes.butonMeniu} onClick={toggleDrawer('left', true)}><img src={menuIcon}/></Button>
                <Drawer open={state.left} onClose={toggleDrawer('left', false)} >
                    <Box className={classes.categoriiText}>
                        Categorii
                    </Box>
                    {sideList('left')}
                </Drawer>
                <div className={classes.butoaneHeaderDreapta}>
                    {
                        !isLogged ?
                        <>
                            <Button onClick={() => changeModalStatus(true,'login')} className={classes.butonFilledAlb} style={{color:'#f35 !important'}} variant="contained" disableElevation>INTRA IN CONT</Button>
                            <Button onClick={() => changeModalStatus(true,'signup')} className={classes.butonBorderAlb}  variant="outlined" disableElevation>CREAZA CONT</Button>
                        </>
                        :<img alt={"logo"} src={nixxLogo}/>
                    }
                    
                </div>
            </div>
            <Box className={classes.headerLogoSection}>
                {
                    !isLogged ?
                    <img alt={"logo"} src={nixxRedLogo}/>
                    :<ProfileBadge/>
                }
                
                {/* <Link className={classes.linkToHome} to="/">
                    <img className={classes.headerLogoImg} src={nixxRedLogo}/>
                </Link> */}
            </Box>
            <BlackBar style={{marginTop: '0px'}}/>
            
        </Box>
        <Rodal  width={modalWidth}  height={modalHeight} visible={modalStatus && (modal === 'login' || modal === 'signup')} onClose={() => changeModalStatus(false,'')}>
            {
                modal === 'login' ? <ContinutModalLogin handleClose={() => changeModalStatus(false,'')}/>
              : modal === 'signup' && <SignupModal  handleClose={() => changeModalStatus(false,'')}/>
            }
        </Rodal>
        <HeaderFals/>
        
        </>
    )  
}

const mapStateToProps = (state) =>{
    const dateModal = selectModalStatus(state)

    return{
        isLogged: selectIsLogged(state),
        ...dateModal
    }
}


const mapDispatchToProps = dispatch => (bindActionCreators({
    //actions
    changeModalStatus,
},dispatch))

export default connect(mapStateToProps,mapDispatchToProps)(Header)