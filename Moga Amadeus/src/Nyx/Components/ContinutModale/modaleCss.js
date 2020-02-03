import {makeStyles} from '@material-ui/core/styles'

const useClasses = makeStyles(theme =>({
    modalContainer:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    ilustratieLogin:{
        width: '90%',
        // marginBottom: '30px',
        // marginTop: '15px',
        margin:'0 auto',
    },
    inputLogin:{
        '& label':{
            // paddingLeft: '55px',
            fontWeight: 800,
        },
        '& input':{
            paddingLeft: '10px',
        },
        '& root':{
            backgroundColor: 'red',
        },
        '& label.Mui-focused':{
            color:'#f35',
            
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#f35',
          },
        margin:'0 auto',
        width: 'calc(100% - 30px)',
        fontWeight: 800,
        marginTop: '15px',
        // backgroundColor: '#efefef',
    },
    modalTitle:{
        '& span':{
            color:'#f35',
        },
        // marginBottom:'15px',
        marginTop: '15px',
        margin:'0 auto',
        fontSize: '17pt',
        fontWeight: 900,
    },
    loginButton:{
        '& root':{
            backgroundColor: '#f35 !important',
        },
        marginTop: '15px',
        backgroundColor: '#f35 !important',
        color:'white',
        fontSize: '8.5pt',
        fontWeight: 900,
        width: 'calc(100% - 30px)',
        padding: '5px',
        height: '35px',
        margin:'0 auto',
        marginTop: '25px',
    },
    bottomInfo:{
        margin: '0 auto',
        marginTop: 'auto',
        '& p':{
            textAlign:'center',
            marginTop: '10px',
            '& span':{
                fontWeight: 800,
                color:'#f35'
            }
        }
    },
    modalHeader:{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      },
      modalAvatarInfo:{
        '& img':{
            marginRight: '10px',
            width: '64px',
            height: '64px',
            objectFit: 'cover',
            borderRadius: '50%',
            border:'2px solid #dbdbdb',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        },
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      },
      modalInfoNume:{
        fontWeight: 900,
        fontSize: '13.5pt'
      },
      modalInfoLocatie:{
        marginTop: '3.4px',
        fontWeight: 800,
        fontSize: '8pt',
        fontStyle: 'italic',
        textTransform: 'uppercase',
      },
      priceCategory:{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          marginTop: '15px',
          borderRadius: '4px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      },
      modalPret:{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f35',
        padding: '8px 10px 8px 10px',
        fontSize: '15pt',
        fontWeight: 900,
        color: 'white',
        borderTopLeftRadius: '4px',
        borderBottomLeftRadius: '4px',
        border: '0 !important'
      },
      modalCategorie:{
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '10px',
          backgroundColor: '#262626',
          width: '100%',
          borderTopRightRadius: '4px',
          borderBottomRightRadius: '4px',
          color:'#fff',
          fontSize: '9pt',
          fontWeight: 800,
          border: '0 !important'
      },
      modalAttributes:{
          display: 'flex',
          marginTop: '15px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
          borderRadius: '4px',
          width: '100%',
      },
      modalAttributeTitle:{
          '& :first-of-type':{
                backgroundColor: 'black',
          },
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#efefef',
        padding: '8px 10px 8px 10px',
        fontSize: '11pt',
        fontWeight: 900,
        color: '#262626',
        // borderTopLeftRadius: '4px',
        // borderBottomLeftRadius: '4px',
        border: '0 !important'
      },
      modalAttributeText:{
        display: 'flex',
        alignItems: 'center',
        padding: '8px 10px 8px 10px',
        fontSize: '10pt',
        fontWeight: 900,
        color: '#262626',
        // border: '0 !important',
        width: '100%',
        height: '50%',
      },
      modalImagesContainer:{
        marginTop: '15px',
        width: '100%',
      },
      modalImages:{
          '& img':{
            // height: '100%',
            width: '170px',
            objectFit: 'cover',
            marginRight: '15px',
            borderRadius: '4px',
          },
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'auto',
          width: '100%',
          minHeight: '100px',
          position: 'relative',
          scrollBehavior: 'smooth',
      },
      anuntModalBadges:{
          top:'20px',
          right: '5px',
          width: '30px',
          height: '30px',
          backgroundColor: '#f35',
          borderRadius: '50%',
          fontWeight: 900,
          fontSize: '8pt',
      },
      modalTitluAnunt:{
          marginTop: '15px',
          fontSize: '11pt',
          fontWeight: '800'
      },
      modalTitluDescriere:{
        marginTop: '15px',
        fontSize: '11pt',
        fontWeight: '700'
      },
      modalNrTelefon:{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '12.5pt',
          color:'white',
          borderRadius: '4px',
          fontWeight: 700,
          width: '100%',
          backgroundColor: '#f35',
          minHeight: '45px',
          letterSpacing: '.5px',
          marginTop: '15px',
          alignSelf: 'flex-end',
      },
      modalDescriereText:{
          marginTop: '15px',
          overflowY: 'auto',
        //   height: '300px',
          fontSize: '9.5pt',
          width: '100%',
      },
    }))

export default useClasses