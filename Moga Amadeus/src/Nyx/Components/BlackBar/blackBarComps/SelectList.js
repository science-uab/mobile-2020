import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import useClasses from '../blackBarCss'
import {Box, TextField} from '@material-ui/core'
import { SelectListElement } from './'
import {listaJudete} from '../../../Utils/menuItems'
import Scrollbar from "react-scrollbars-custom"
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
function SelectList(props){
    const classes = useClasses()
    

    const renderListaAJudete = ()  =>  (
        listaJudete.map(({nume, id}, index) => (
            <SelectListElement id={id} nume={nume} key={index}/>
          ))
    )

    return(
        
        <List component="nav" className={classes.selectList}>
                {renderListaAJudete()}
                 
                
        </List>
        
    )  
}

const mapStateToProps = (state) =>{

    return{
    }
}


const mapDispatchToProps = dispatch => (bindActionCreators({
    //actions
},dispatch))

export default connect(mapStateToProps,mapDispatchToProps)(SelectList)