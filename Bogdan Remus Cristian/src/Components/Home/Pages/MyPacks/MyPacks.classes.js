import {makeStyles} from '@material-ui/core/styles'

const useClasses = makeStyles(theme => ({
    myPages: {
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
	avatarBox: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: '5px',
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
	myPacksPaperPack: {
		textAlign: 'center',
		width: 'calc(100% - 20px)',
        height: 'calc(100% - 150px)',
        margin: '0!important',
        backgroundColor: '#fafafa!important',
        maxHeight: 'calc(100% - 62px)!important',
        boxShadow: 'none',
		borderRadius: '6px!important',
		overflowY: 'visible!important',
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
	},
	listCouriers: {
		width: '100%!important',
		marginTop: '10px',
	},
	primaryText: {
        color: `${theme.palette.secondary.main}`,
        fontWeight: '500',
        fontSize: '10pt',
        marginLeft: '5px',
        lineHeight: '0px!important',
		display: 'flex!important',
		justifyContent: 'space-between!important',
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
            border: `1px solid ${theme.palette.primary.light}`,
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
	rowRating: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between!important',
		width: 'calc(100% - 2px)',
		paddingRight: '2px',
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
	listItemBlack: {
        backgroundColor: '#f0f0f0',
		listStyleType: 'none!important',
    },
    listItemWhite: {
        backgroundColor: '#fafafa',
		listStyleType: 'none!important',
    },
	multiline: {
		marginBottom: '-6px',
	},
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
	list: {
		width: '100%',
	},
	packIcon: {
		marginLeft: '5px',
		border: 'none',
		width: '23px',
		height: '23px',
	},
	secondaryText: {
        fontStyle: 'italic',
        color: 'rgba(0, 0, 0, 0.62)',
        fontWeight: '700',
        lineHeight: '11px!important',
        marginTop: '8px',
		display: 'inline',
        fontSize: '8pt',
		marginLeft: '4px',
    },
	zIndexBig: {
		overflowY: 'visible!important',
		zIndex: '2000!important',
	},
	topImageBox: {
        position: 'relative',
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        // overflow: 'hidden',
        border: '15px solid #f0f0f0',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '-40px',
        '&:before': {
            content: '" "',
            position: 'absolute',
            border: '5px solid rgba(0,0,0,.7)',
            top: '-15px',
            left: '-15px',
            right: '-15px',
            bottom: '-15px',
            zIndex: 2,
            borderRadius: '50%'
        },
		position: 'absolute',
		left: 'calc(50% - 36px)',
    },
    topImageBoxInner: {
        width: '100%',
        height: '100%',
        display: 'flex'
    },
    topImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
	packContent: {
		zIndex:2100,
		display: 'block',
		width: 'calc(100% - 20px)',
		height: '100%',
		overflowY: 'scroll',
		margin: '0 auto',
		marginTop: '25px',
	},
	packTitle: {
		padding: 0,
		margin: 0,
		marginLeft: '10px',
	},
	packBoxTitle: {
		justifyContent: 'center!important',
	},
	left: {
		justifyContent: 'flex-start!important',
	},
	between: {
		justifyContent: 'space-between!important',
		alignItems: 'flex-end!important',
	},
	packLineText: {
		fontSize: '10pt',
		fontWeight: '400',
		margin: 0,
		padding: 0,
	},
	packLineText2: {
		fontSize: '10pt',
		margin: 0,
		marginLeft: '5px',
		padding: 0,
	},
	actionsContainer: {
		display: 'block',
		textAlign: 'left',
		backgroundColor: '#fafafa!important',
		// paddingLeft: '0!important',
		margin: 0,
	},
	backDrop: {
		backgroundColor: 'rgba(0, 0, 0, 0.85)!important',
	}
}))

export default useClasses
