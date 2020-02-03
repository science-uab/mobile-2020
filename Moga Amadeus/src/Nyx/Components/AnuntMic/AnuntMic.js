import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import useClasses from '../Home/homeCss'
import {testImage , shareIcon, heartIcon} from '../../Images'

function AnuntMic(props){
    const classes = useClasses()

    const {promovat, titlu, avatar,nume,prenume, judet, oras, pret, telefon, vizualizari, rating,imagini} = props

    return(
        <div onClick={props.onClick} className={classes.homeCard}>
            <img src={"https://moga.cristi.club/imagini/"+imagini[0].nume_poza} alt="" />
            <div className={classes.homeCardTitlu}>
                {titlu}
            </div>
            <div className={classes.footerCard}>
                <div className={classes.pretCard}>{pret}</div>
                <div className={classes.favoriteCard}>
                    <img src={heartIcon} alt="" />
                </div>
                <div className={classes.shareCard}>
                    <img src={shareIcon} alt="" />
                </div>
            </div>
        </div>
    )  
}

const mapStateToProps = (state) =>{

    return{
    }
}


const mapDispatchToProps = dispatch => (bindActionCreators({
    //actions
},dispatch))

export default connect(mapStateToProps,mapDispatchToProps)(AnuntMic)