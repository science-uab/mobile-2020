import React from 'react'
import useClasses from './aboutCss'
import {Box, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanel} from '@material-ui/core'
import {contactIllustration,nixxRedLogo, aboutUser} from '../../Images'
import {Header} from '../Header'
import Footer from '../Footer'
function About(props){
    const classes = useClasses()
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = panel => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    return(
        <Box className={classes.error404Window}>
            <Header />
            <Box className={classes.error404}>
                <img alt="" src={contactIllustration}/>
            </Box>
            <Box className={classes.contactLogoContainer}>
                <img alt="" className={classes.logo} src={nixxRedLogo} />
                <p className={classes.contactLocationText}> ALBA IULIA, ROMANIA </p>
            </Box>
            <Box className={classes.aboutSiteInfo}>
                <span>NIXX</span> este un site ce ofera posibilitatea postarii anunturilor gratuit.
            </Box>
            <Box className={classes.aboutDeveloperInfo}>
                <img alt="" className={classes.aboutIconita} src={aboutUser}/>
                <p className={classes.aboutProiectRealizat}>Proiect realizat de</p>
                <p className={classes.aboutNumeDeveloper}>MOGA AMADEUS</p>
                <p>amadeusmoga@gmail.com</p>
                <p>0760548262</p>
            </Box>
            <ExpansionPanel className={classes.expansionPanel}>
                <ExpansionPanelSummary>
                <p className={classes.expansionPanelTitle}>Credits</p>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                </p>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <Footer />
        </Box>
    )  
}


export default About