import {makeStyles} from '@material-ui/core/styles'

const useClasses = makeStyles(theme =>({
    error404Window:{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    contactLogoContainer:{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        marginTop: '30px',
    },
    logo:{
        width: '25%',
        margin: '0 auto',
        marginBottom: '5px',
    },
    contactLocationText:{
        fontSize: '8.5pt',
        fontWeight: 900,
    },
    linkHomeButton:{
        backgroundColor: '#f35 !important',
        fontSize: '12pt',
        fontWeight: 900,
        padding: '6px 15px',
        color: 'white',
        textDecoration:'none',
    },
    aboutSiteInfo:{
        '& span':{
            color: '#f35',
            fontWeight: 900,
        },
        textAlign: 'center',
        padding: '0px 20%',
        marginTop: '15px',
        fontWeight: 800,
        fontSize: '10pt'
    },
    aboutIconita:{
        marginBottom: '10px',
    },
    aboutDeveloperInfo:{
        marginTop: '25px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        textAlign: 'center',
        '& p':{
            marginBottom: '5px',
        },
    },
    aboutNumeDeveloper:{
        fontSize: '16pt',
        fontWeight: 900,
    },
    aboutProiectRealizat:{
        fontWeight: 800,
        color: '#f35',
    },
    expansionPanelTitle:{
        fontSize: '11pt',
        fontWeight: 900,
    },
    expansionPanel:{
        marginTop: '30px'
    }

      
}))

export default useClasses