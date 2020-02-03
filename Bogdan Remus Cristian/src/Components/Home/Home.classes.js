import {makeStyles} from '@material-ui/core/styles'

const useClasses = makeStyles(theme => ({
    home: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
		height: '100%',
		overflowX: 'scroll',
        transition: 'all 0.5s',
        '&$goBack': {
            marginLeft: '-150px'
        }
    },
    myPages: {
        backgroundColor: '#fafafa',
        transition: 'all 0.5s',
		padding: '0!important',
        '&$goBack': {
            marginLeft: '-150px'
        }
    },
    goBack: {},
    becomeCourier: {
        position: 'relative'
    },
    homeList: {
        width: '100%',
        minWidth: '280px',
        backgroundColor: `${theme.palette.background.default}!important`
    },
    becomeCourierContent: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        padding: '20px',
        paddingTop: '7px',
        paddingBottom: '15px'
    },
    aplica: {
        fontSize: '20pt!important',
        color: 'white!important',
        fontWeight: '700!important',
        textTransform: 'uppercase'
    },
    ptjobul: {
        fontSize: '14pt!important',
        color: 'white!important',
        fontWeight: '500!important',
        lineHeight: '22px!important'
    },
    becomeCourierContentInner: {
        width: '100%',
        height: '100%',
        position: 'relative'
    },
    apply: {
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    closeBecomeCourier: {
        position: 'absolute!important',
        top: 0,
        right: 0,
        padding: '0!important'
    },
    closeBecomeCourierIcon: {
        color: '#fafafa'
    },
    myPacksRoot: {
        backgroundColor: 'transparent!important',
        marginTop: '25px',
        height: 'calc(100% - 50px)',
        '& .MuiBackdrop-root': {
            backgroundColor: 'transparent!important'
        }
    },
    myPacksContainer: {},
    myPacksPaper: {
        width: '100%!important',
        maxWidth: '100%!important',
        height: '100%!important',
        margin: '0!important',
        backgroundColor: '#fafafa',
        maxHeight: 'calc(100% - 62px)!important',
        boxShadow: 'none',
        borderRadius: '0!important'
    },
    noOnline: {
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        margin: theme.spacing(4),
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        color: '#a6a6a6',
        borderRadius: '6px'
    },
    listCouriersAroud: {
        padding: '0!important'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0, 0.54)',
        zIndex: '1500!important',
        // width: 'calc(100% - 40px)',
    },
    modalInner: {
        backgroundColor: '#fafafa',
        borderRadius: theme.spacing(2),
        boxShadow: theme.shadows[5],
        width: 'calc(100% - 20px)',
        height: 'calc(100% - 125px)',
        overflowY: 'scroll',
        position: 'relative'
    },
    googleMap: {
        display: 'flex',
        width: '100%',
        height: '280px',
        backgroundColor: '#ccc',
		boxShadow: theme.shadows[1],
    },
    gBox: {
        width: '24px',
        height: '24px',
		borderRadius: '100px',
		border: '2px solid white',
		boxShadow: theme.shadows[2],
		overflow: 'hidden',
    },
    gAvatar: {
        objectFit: 'cover',
        height: '100%',
        width: '100%'
    },
	uploadPlaceholderCar: {
        width: '50%',
        maxWidth: '140px',
		marginTop: '20px',
    },
}))

export default useClasses
