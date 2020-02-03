import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import useClasses from './anunturiCss'
import {Box,Button} from '@material-ui/core'
import { ListaAnunturi } from './anunturiComps'
import {Header} from '../Header'
import FiltreBar from '../FiltreBar'
import BlackSearch from '../BlackSearch'

function CategorieAnunturi(props){
    const classes = useClasses()
    return(
        <Box className={classes.anunturiWindow}>
            <Header />
            <FiltreBar />
            <BlackSearch />
            <ListaAnunturi />
        </Box>
    )  
}

const mapStateToProps = (state) =>{

    return{
    }
}


const mapDispatchToProps = dispatch => (bindActionCreators({
    //actions
},dispatch))

export default connect(mapStateToProps,mapDispatchToProps)(CategorieAnunturi)