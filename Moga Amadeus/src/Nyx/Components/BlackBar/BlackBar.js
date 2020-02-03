import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import useClasses from './blackBarCss'
import {Box,Button,Modal,Fade, TextField} from '@material-ui/core'
import { searchIcon } from '../../Images'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { SelectList } from './blackBarComps'
import Rodal from 'rodal'
import 'rodal/lib/rodal.css'

function BlackBar(props){
    const classes = useClasses()
    const [inputStatus, setInputStatus] = React.useState(false)
    const [modalStatus, setModalStatus] = React.useState(false)
    var x  = window.innerWidth - 30
    const openModal = (event) => {
        document.body.classList.add('modal-open')
        setModalStatus(true)
      }
      const hideModal = (event) => {
        document.body.classList.remove('modal-open')
        setModalStatus(false)
      }

    return(
        <>
        <Box className={classes.blackBar}>
            <ClickAwayListener onClickAway={() => setInputStatus(false)}>
                <Box onClick={() => setInputStatus(true)} className={[classes.inputContainer,inputStatus?classes.expandedInputContainer:''].join(' ')}>
                    <input placeholder="Scrie aici pentru a cauta ..." className={[classes.inputBar,inputStatus?classes.expandedInput:''].join(' ')} />
                    <img  className={classes.searchIcon} src={searchIcon}/>
                </Box>
            </ClickAwayListener>
            <Box className={classes.selectContainer}>
                <Box onClick={openModal} className={classes.selectItem}>Judet</Box>
                <Box className={classes.selectItem}>Oras</Box>
            </Box>
            
           <Button className={classes.adaugaAnunt} variant="outlined">adauga anunt</Button>
           
        </Box>
        <Rodal showCloseButton={false} visible={modalStatus} width={x} height={345} onClose={hideModal}>
            <TextField className={classes.selectListInput} placeholder="Cauta judet"/>
            <SelectList/>
            <Box className={classes.selectListButtons}>
                <Button disableElevation className={classes.listButton} variant="contained">IESI </Button>
                <Button disableElevation className={classes.listButton} variant="contained">SALVEAZA</Button>
            </Box>
        </Rodal>
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

export default connect(mapStateToProps,mapDispatchToProps)(BlackBar)