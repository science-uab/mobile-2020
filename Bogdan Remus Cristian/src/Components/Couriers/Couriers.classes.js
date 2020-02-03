import {fade, makeStyles} from '@material-ui/core/styles'

const useClasses = makeStyles(theme => ({
    couriers: {
		display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        overflowX: 'scroll'
    },
    noOnline: {
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        color: '#a6a6a6',
        borderRadius: '6px'
    },
    stickHeader: {
        backgroundColor: 'rgba(250,250,250,.94)!important'
    },
    list: {
        transition: 'all 0.5s',
        '&$listBack': {
            marginLeft: '-150px'
        }
    },
    listBack: {},
    courierRow: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4)
    },
    listItemBlack: {
        backgroundColor: '#f0f0f0',
		listStyleType: 'none!important',
    },
    listItemWhite: {
        backgroundColor: '#fafafa',
		listStyleType: 'none!important',
    },
    primaryText: {
        color: `${theme.palette.secondary.main}`,
        fontWeight: '500',
        fontSize: '11pt',
        marginLeft: '5px',
        lineHeight: '0px!important'
    },
    // avatarBox: {
    // 	width: ''
    // },
    avatar: {
        width: '31px',
        height: '31px',
        objectFit: 'cover',
        borderRadius: '30px',
        border: '2px solid white',
        boxShadow: theme.shadows[1],
        zIndex: 2,
        marginTop: '5px',
        backgroundColor: '#fafafa',
    },
	avatarAround: {
		marginLeft: '26px!important',
	},
    listItem: {
        paddingTop: '0px!important',
        paddingBottom: '0px!important',
        height: '46px',
    },
    icon: {
        maxWidth: '42px',
        marginRight: '-10px'
    },
    inputRoot: {
        color: 'inherit',
        width: '100%'
    },
    inputInput: {
        padding: theme.spacing(3, 3, 3, 3),
		width: '0px',
        transition: theme.transitions.create('width'),
        backgroundColor: 'transparent',
        border: '1px solid transparent',
        borderRadius: '6px',
        textAlign: 'center',
        marginLeft: 0,
        '&:focus': {
            backgroundColor: 'white',
            border: '1px solid #ccc',
            width: '100%'
        },
		'&$searchOpen': {
			backgroundColor: 'white',
            border: '1px solid #ccc',
            width: '100%'
		}
    },
	searchOpen: {},
    search: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginLeft: 0,
        width: 'calc(100% - 32px)',
        marginTop: theme.spacing(3)
    },
    searchIcon: {
        width: theme.spacing(7),
        paddingLeft: theme.spacing(0),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& .MuiSvgIcon-root': {
            // zIndex: 1,
            fontSize: '22pt',
            color: `${theme.palette.secondary.main}`,
            fill: `${theme.palette.secondary.main}`
        }
    },
    resultsText: {
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center'
    },
    badge: {
        zIndex: '2!important',
        marginTop: '22px!important',
        marginLeft: '11px!important',
		top: 'auto!important',
		left: 'auto!important',
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
}))

export default useClasses
