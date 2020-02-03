
import {makeStyles} from '@material-ui/core/styles'

const useClasses = makeStyles(theme =>({
    homeWindow:{
        height: '100%',
        width: '100%',
    },
    continutHome:{
        minHeight: 'calc(100% - 200px)',
    },
    bannerHome: {
        marginLeft: 'auto',
        marginRight: 'auto',
        overflow: 'hidden',
        borderRadius: '8px',
        marginTop: '15px',
        width: 'calc(100% - 30px)',
        height: '105px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        '& img':{
            width: '114%',
            height: '100%',
            /* display: none, */
            objectFit: 'cover',
        }
        
    },
    homeAnunturi:{
        marginTop: '15px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding:'0px 15px 0px 15px',
    },
    anunturiHeader:{
        display: 'flex',
        alignItems: 'center',
        width:'100%',
        fontSize: '10pt',
        fontWeight: 800,
        '& $butonFilledRosu':{
            marginLeft: '15px',
        }
    },
    butonFilledRosu:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        padding:'0px 15px 0px 15px',
        backgroundColor:'#f35',
        height: '27px',
        fontSize:'7pt',
        borderRadius: '4px',
    },
    anunturiCards:{
        width: '100%',
        height: '190px',
        marginTop: '13px',
        display: 'flex',
        flexGrow: 'unset',
        flexDirection: 'row',
        overflowX: 'scroll',
        width: '100%',
    },
    homeCard:{
        flex: '0 0 auto',
        width: '133px',
        height: '187px',
        borderRadius: '4px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        marginRight: '15px',
        '& img':{
            width: '100%',
            height: '91px',
            objectFit: 'cover',
            borderTopLeftRadius: '4px',
            borderTopRightRadius: '4px',
        }
        
    },
    homeCardTitlu:{
        padding:'5px',
        width: '100%',
        fontSize: '11pt',
        textAlign: 'left',
        fontWeight: '700',
        overflow: 'hidden',
        height: '54px',
        lineHeight: '1.2',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        // -webkit-line-clamp: 3,
        // -webkit-box-orient: vertical,
    },
    footerCard:{
        width: '100%', 
        marginTop: '9px',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '3px',
    },
    pretCard:{
        height: '20px',
        backgroundColor: '#f35',
        width: '61px',
        fontWeight: '900',
        fontSize: '10pt',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '5px',
        borderRadius: '4px',
    },
    favoriteCard :{
        height: '100%',
        /* width: 14px, */
    },
    shareCard:{
        height: '100%',
        /* width: 14px, */
    },
    favoriteCard :{
        '& img':{
            /* width: 100%, */
            height: '100%',
            maxWidth: '17px',
            marginLeft: '10px',
        },
    },
    shareCard :{
        '& img':{
            /* width: 100%, */
            height: '100%',
            maxWidth: '17px',
            marginLeft: '10px',
        },
    },
    homeStatsBox:{
        width:'100%',
    },
    homeNrAnunturi:{
        fontWeight: 700,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& span':{
            color:'#f35',
            fontSize: '24pt',
            fontWeight: 900,
        }
    },
    butonModal:{
        marginRight: '15px',
        backgroundColor: 'transparent',
    },
    
}))

export default useClasses