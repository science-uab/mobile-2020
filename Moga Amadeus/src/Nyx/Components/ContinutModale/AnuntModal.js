import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import useClasses from './modaleCss'
import {xIcon} from '../../Images'
import {Box} from '@material-ui/core'
import Scrollbar from "react-scrollbars-custom"
import Badge from '@material-ui/core/Badge'
import uuid from 'react-uuid'


function AnuntModal(props){
    const classes = useClasses()

    const {avatar,nume,prenume,brand,id_stare,id_categorie,titlu,descriere,telefon,pret,judet,oras,moneda,imagini} = props
    const nrImagini = Object.keys(imagini||[]).length
    
    const renderListaImagini = (imagini)  =>  {
        if(!imagini.length)
            return <Box>Nu exista imagini</Box>
        return imagini.map((date) => (
            <img src={"https://moga.cristi.club/imagini/"+date.nume_poza} alt={date.alt} key={uuid()}/>
          ))
    }
    return(
        <>
        <div className={classes.modalHeader}>
            <div className={classes.modalAvatarInfo}>
                <img alt="imagine testare" src={"https://moga.cristi.club/imagini/"+(avatar||[])} />
                <Box className={classes.modalInfoText}>
                    <p className={classes.modalInfoNume}>
                        {prenume} {nume}
                    </p>
                    <p className={classes.modalInfoLocatie}>
                        {judet},{oras}
                    </p>
                </Box>
            </div>
            <img onClick={props.handleClose} src={xIcon} alt="close icon"/>
        </div>
        <Box className={classes.priceCategory}>
            <div className={classes.modalPret}>
                {pret}{moneda}
            </div>
            <div className={classes.modalCategorie}>
                {id_categorie}
            </div>
        </Box>
        <div className={classes.modalAttributes}>
            <div className={classes.modalAttribute}>
                <div className={classes.modalAttributeTitle} style={{borderTopLeftRadius:'4px',color:'#f35'}}>
                    Brand
                </div>
                <div className={classes.modalAttributeTitle} style={{borderBottomLeftRadius:'4px'}}>
                    Stare
                </div>
            </div>
            <div className={classes.modalAttribute} style={{width: '100%'}}>
                <div className={classes.modalAttributeText} style={{borderBottom:'1px solid rgba(42,42,42,.15)',color:'#f35'}}>
                    {brand}
                </div>
                <div className={classes.modalAttributeText}>
                    {id_stare}
                </div>
            </div>
        </div>
        <p className={classes.modalTitluAnunt}>
            {titlu}
        </p>
        {
            nrImagini > 1 &&
            <Badge classes={{
                badge:classes.anuntModalBadges
            }} badgeContent={nrImagini} color="primary">
                <Box className={classes.modalImagesContainer}>
                    <Box className={classes.modalImages}>
                        {renderListaImagini(imagini||[])}
                    </Box>
                </Box>
            </Badge>
        }
        
        <p className={classes.modalTitluDescriere}>
            {"Descriere produs"}
        </p>
        <Scrollbar className={classes.modalDescriereText}>
            {descriere}
        </Scrollbar>
        <Box className={classes.modalNrTelefon}>
            {telefon}
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

export default connect(mapStateToProps,mapDispatchToProps)(AnuntModal)