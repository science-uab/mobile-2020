import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import useClasses from './blackSearchCss'
import {Box, TextField,} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';


function BlackSearch(props){
    const classes = useClasses()
    return(
        <>
        <Box className={classes.filtreBarFals}>
            dd
        </Box>
        <Box className={classes.blackSearch}>
            <TextField className={classes.blackSearchBar} placeholder="Scrie aici pentru a cauta un anunt"/>
            <Box className={classes.filtreBaricons}>
                <SearchIcon className={classes.blackSearchIcon}/>
            </Box>
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

export default connect(mapStateToProps,mapDispatchToProps)(BlackSearch)