import React from 'react'
import useClasses from './footerCss'
import {Box} from '@material-ui/core'


function Footer(props){
    const classes = useClasses()
    return(
        <Box className={classes.footerContainer}>
            {/* <Box className={classes.contactLink}>
                About us
            </Box> */}
           <Box className={classes.footerRedBar}>
                    Copyright © 2019 All Rights Reserved.
           </Box>
        </Box>
    )  
}

export default Footer