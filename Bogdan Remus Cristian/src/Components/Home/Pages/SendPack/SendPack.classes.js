import {makeStyles} from '@material-ui/core/styles'

const useClasses = makeStyles(theme => ({
    myPages: {
		// marginTop: '10px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
        backgroundColor: '#fafafa',
        transition: 'all 0.5s',
		padding: '0!important',
        '&$goBack': {
            marginLeft: '-150px'
        }
    },
    goBack: {},
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
        backgroundColor: '#fafafa!important',
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
        borderRadius: '6px',
		marginTop: 0,
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
	buttonType: {
		width: 'calc(100% - 20px)',
		marginTop: '10px',
	},
	listCouriers: {
		width: '100%!important',
		marginTop: '10px',
	},
	primaryText: {
        color: `${theme.palette.secondary.main}`,
        fontWeight: '500',
        fontSize: '11pt',
        marginLeft: '5px',
        lineHeight: '0px!important'
    },
	inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(3, 3, 3, 3),
		width: '100px!important',
        backgroundColor: 'white!important',
        border: `1px solid ${theme.palette.secondary.light}!important`,
        borderRadius: '6px',
        textAlign: 'center',
        marginLeft: 0,
        '&:focus': {
            backgroundColor: 'white',
            border: `1px solid ${theme.palette.primary.dark}!important`,
        },
    },
	row: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: '10px',
		justifyContent: 'space-between!important',
		width: '100%',
	},
	column: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '100%',
	},
	collapse: {
		width: 'calc(100% - 20px)',
	},
	rowTitle: {
		fontSize: '10pt',
		margin: '0!important',
		marginTop: '5px!important',
	},
	columnStart: {
		alignItems: 'flex-start!important',
	},
	inputLong: {
		width: '100%!important',
		marginTop: '5px!important',
	},
	bigTitle: {
		alignSelf: 'flex-start',
		margin: 0,
		marginTop: '10px',
		color: 'black',
	},
	badge: {
		top: '13px!important',
		marginRight: '-6px',
	},
	submitPack: {
		width: '100%!important',
		marginBottom: '20px',
		marginTop: '10px',
	},
	avatarBox: {
        width: 'calc(100% - 20px)',
        display: 'flex',
        flexDirection: 'row',
		margin: '0 auto',
    },
    avatarBoxInner: {
        backgroundColor: `${theme.palette.secondary.main}`,
        borderRadius: '20px',
        height: '60px',
        width: 'calc(100% - 30px)',
        marginLeft: '-40px',
        paddingLeft: '50px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative'
    },
    avatar: {
        width: '56px',
        height: '56px',
        objectFit: 'cover',
        borderRadius: '30px',
        border: '3px solid #d8d8d8',
        zIndex: 2,
        marginTop: '-1px',
        backgroundColor: '#fafafa'
    },
    memberSince: {
        // lineHeight: 0,
        color: 'rgba(255,255,255,0.5)',
        fontWeight: '400',
        fontSize: '8pt'
    },
    memberName: {
        lineHeight: 1.2,
        maxWidth: '250px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    },
	avatarImageBox: {
        width: '60px',
        height: '60px',
        position: 'relative',
        zIndex: 2
    },
}))

export default useClasses
