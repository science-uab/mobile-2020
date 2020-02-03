import {makeStyles} from '@material-ui/core/styles'

const useClasses = makeStyles(theme =>({
    headerContainer:{
        position:' fixed',
        zIndex: '999',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#f5f5f5',
        height: '178px'
    },
    header : {
        display: 'flex',
        width:'100%',
        height: '53px',
        backgroundColor: '#f35',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px 15px 0px 15px',
        
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        
      },
      paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        minHeight: 'calc(100% - 30px)',  
        width: 'calc(100% - 30px)',
        height: 'calc(100% - 30px)',
        backgroundColor: 'white',
        border: '2px solid #000',
        border:'0px',
        borderRadius: '8px',
        boxShadow: theme.shadows[5],
        padding: '15px',
      },
    headerLogoSection:{
        '& a':{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        height: '55px',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerLogoImg:{
        width: '80%',
        marginTop: '20px',
    },
    profileBadgeMenuIcon:{
        marginLeft: '15px',
    },
    butoaneHeaderDreapta :{
        // marginRight: '15px',
        display: 'flex',
    },
    butonMeniu:{
        padding: '0px !important',
        minWidth: '21px !important',
    },
    butonFilledAlb:{
        borderRadius: '4px !important',
        padding: '6px 15px',
        height: '35px !important',
        fontSize: '7pt',
        height: '30px',
        fontWeight: 900,
        backgroundColor: 'white !important',
        color: '#262626',
        marginRight: '15px',
    },
    butonBorderAlb:{
        borderRadius: '4px ',
        padding: '6px 15px',
        height: '30px',
        fontSize: '7pt',
        fontWeight: '900',
        border:'2px solid white',
        color: 'white',
    },
    drawerLeft:{
        backgroundColor: '#f35',
        height: '100%',
    },
    headerFals:{
        width: '100%',
        minHeight: '163px',
        backgroundColor: '#f5f5f5',
        marginBottom: '15px',
    },
    menuItemText:{
        fontSize: '10pt',
        fontWeight: 700,
        color:'white'
    },
    categoriiText:{
        height: '56px',
        fontSize: '12pt',
        fontWeight: 900,
        display: 'flex',
        alignItems: 'center',
        padding: '15px',
    },
    profileBadge:{
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '15px',
        background: '#262626',
        padding: '5px 10px',
        borderRadius: '30px',
        position: 'relative',
        
    },
    profileBadgeAvatar:{
            margin:'0',
            marginLeft: '-5px',
            marginTop: '0 !important',
            width: '45px !important',
            height: '45px',
            borderRadius: '50%',
            border: '2px solid #efefef',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            objectFit: 'cover',
    },
    profileBadgeNume:{
        color: 'white',
        fontWeight: 900,
        fontSize: '12pt',
        marginLeft: '15px',
        '& span':{
            color:'#f35',
        },
    },
    profileBadgeContinut:{
        borderRadius: '8px',
        overflow: 'hidden',
        background: 'white',
        top: '42px',
        position: 'absolute',
        zIndex: '-1',
        width: '100%',
        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    },
    continutBadge:{
        // minHeight: '150px',
        width: '100%',
        background: 'white',
        '& > :last-child':{
            marginBottom: '5px',
        }
    },
    emptySpace:{
        minHeight: '28px'
    },
    profileBadgeListElement:{
        display: 'flex',
        flexDirection: 'row',
        height: '40px',
        alignItems: 'center',
        padding: '0px 15px',
        width: '100%',
    },
    profileBadgeLinkTo:{
        marginLeft: '15px',
        fontSize: '10pt',
        fontWeight: 900,
        color: '#262626'
    }
    }))

export default useClasses