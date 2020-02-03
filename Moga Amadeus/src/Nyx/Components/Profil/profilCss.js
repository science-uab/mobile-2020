import {makeStyles} from '@material-ui/core/styles'

const useClasses = makeStyles(theme =>({
    ProfilHeader:{
        display: 'flex',
        justifyContent: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red',
        width: '100%',
        minHeight:'216px',
        height: '216px',
        position: 'relative',
    },
    profileCoverImage:{
        width: '100%',
            height: '100%',
            objectFit: 'cover',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
    }
    ,
    modalAvatarInfo:{
        position: 'absolute',
        top:'50%',
        left:'50%',
        transform: 'translate(-50%,-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'calc(100% - 30px)',
      },
      avatarBox:{
        position: 'relative',
      },
      modalInfoText:{
        background: 'rgba(42,42,42,.5)',
        borderRadius: '8px',
        padding: '2px 10px',
        boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
        marginTop: '5px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
      profilAvatar:{
        margin: '0 auto',
        width: '100px',
        height: '100px',
        objectFit: 'cover',
        borderRadius: '50%',
        border:'4px solid #dbdbdb',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        position: 'relative',
      },
      modalInfoNume:{
       
        fontWeight: 900,
        fontSize: '17.5pt',
        color:'white'
      },
      numeCuloare:{
        color:'#f35',
      },
      modalInfoLocatie:{
        marginTop: '3.4px',
        fontWeight: 800,
        fontSize: '8pt',
        fontStyle: 'italic',
        textTransform: 'uppercase',
        margin: '0 auto',
        textAlign: 'center',
        color:'white',
      },
      profilRating:{
          marginTop: '5px',
          padding: '1px 10px',
          borderRadius: '25px',
          background:'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color:'#f35 !important',
          '& root':{
              
          }
      },
      cameraIcon:{
          position: 'absolute',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            background:'#262626',
            border:'3px solid #efefef',
            padding: '5px',
            bottom:'3px',
            right:'1px',
    },
    backIcon:{
        zIndex: '3',
        position: 'absolute',
        left:'15px',
        top:'15px',
        height: '24px',
        '& img':{
            height: '100%',
        }
    },
    changeCoverButton:{
        position: 'absolute',
        right: '15px',
        top:'15px',
        height: '24px',
        background: '#f35 !important',
        color: 'white',
        fontWeight: 800,
        fontSize: '8pt',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        zIndex: '2',
    },
    profileList:{
        width: 'calc(100% - 30px)',
        maxHeight: 'calc(100% - 330px)',
        height: '100%',
        overflowX: 'auto',
        margin:'0 auto',
        background:'white',
        boxShadow: '0px 1px 3px rgba(0,0,0,0.05), 0px 1px 2px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        marginTop: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& :last-child':{
            borderBottom:'0px ',
        }
    },
    profilListElement:{
        display: 'flex',
        width: 'calc(100% - 20px)',
        height: '46px',
        borderBottom: '1px solid rgba(42,42,42,.085)',
        alignItems: 'center',
        padding: '10px 12px ',
    },
    listElementIcon:{
        width: '24px',
        height: '24px',
    },
    listElementTextSpace:{
        height: '100%',
        width: 'calc(100% - 38px)',
        marginLeft: '15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    listElementText:{
        fontSize: '8.25pt',
        fontWeight: 800,
        color: '#262626',
    },
    listElementLabel:{
        fontSize: '7pt',
        fontWeight: 700,
        color: '#787878',
    },
    profilTitle:{
        marginTop: '15px',
        marginLeft: '15px',
        fontSize: '10.5pt',
        fontWeight: 900,
        textAlign: 'center',
    },
    ProfileWindow:{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',

    },
    logOutButton:{
        backgroundColor: '#f35 !important',
        height: '45px',
        width: 'calc(100%)',
        // marginTop: 'auto',
        // marginBottom: '15px',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontWeight: 900,
        fontSize: '10pt',
        color: 'white',
    },
    logOutButtonContainer:{
        display: 'flex',
        width: 'calc(100% - 100px)',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: '15px',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
}))

export default useClasses