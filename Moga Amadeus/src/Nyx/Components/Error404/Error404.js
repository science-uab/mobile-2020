import React from 'react'
import useClasses from './error404Css'
import {Box, Link, Button} from '@material-ui/core'
import {error404} from '../../Images'
import {Header} from '../Header'
import Footer from '../Footer'
function Error404(props){
    const classes = useClasses()

    return(
        <Box className={classes.error404Window}>
            <Header />
            <Box className={classes.error404}>
                <img alt="Error 404" src={error404}/>
            </Box>
            <Box className={classes.contactBody}>

            </Box>




            <Link to="Home">
                <Button className={classes.linkHomeButton} variant="contained">
                    ACASA
                </Button>
            </Link>
            <Footer />
        </Box>
    )  
}


export default Error404