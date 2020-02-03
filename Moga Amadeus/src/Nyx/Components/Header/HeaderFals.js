import React from 'react'
import useClasses from './headerCss'
import { Box } from '@material-ui/core';

function HeaderFals(props){
    const classes = useClasses()
    
    return(
        <Box className={classes.headerFals}>
            
        </Box>
    )  
}

export default HeaderFals