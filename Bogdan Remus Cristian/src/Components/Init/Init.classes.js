import {makeStyles} from '@material-ui/core/styles'

const useClasses = makeStyles(theme => ({
    initContainer: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'column',
        paddingLeft: '10px',
        paddingRight: '10px',
        minWidth: '280px'
    },
    initFooter: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'column',
    },
    loginWith: {
        minWidth: '280px',
        height: '40px',
		minHeight: '40px',
    },
    loginWithFacebook: {
        background: '#425BB4',
        color: 'white',
        marginBottom: theme.spacing(3),
        "&:hover": {
            backgroundColor: '#425BB4'
        },
		"&$disabled": {
	      background: '#7788e7',
		  color: 'white',
	    }
    },
	disabled: {},
    loginWithGoogle: {
        backgroundColor: 'white',
        color: 'black',
        marginBottom: theme.spacing(2),
        "&:hover": {
            backgroundColor: 'white'
        },
    },
    loginWithFacebookIcon: {
        marginRight: '30px'
    },
    loginWithGoogleIcon: {
        marginRight: '40px'
    },
    spanForgot: {
        color: '#ccc',
        fontSize: 12,
        marginBottom: '20px',
		textDecoration: 'none',
    },
    spanRegister: {
        color: '#ccc',
        fontSize: 12,
        marginBottom: '10px'
    },
    or: {
        position: 'absolute',
        top: '-8px',
        left: 'calc(50% - 12px)',
        backgroundColor: '#fafafa',
        paddingLeft: '5px',
        paddingRight: '5px',
        color: '#ccc'
    },
    divider: {
        borderBottom: '1px solid #ccc',
        height: '1px',
        width: '100%',
        maxWidth: '280px',
        marginTop: '25px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
    },
    loginButton: {
        width: 'calc(100% + 5px)',
        marginTop: '15px',
        marginBottom: '5px',
        marginLeft: '-2px'
    },
    logo: {
        width: '180px',
        marginBottom: '10px',
        marginTop: '20px'
    },
    signUp: {
        marginLeft: '10px',
		marginBottom: '2px'
    },
    placeholder: {
        '&::placeholder': {
            color: `${theme.palette.text.primary}`,
            fontSize: '10pt'
        }
    },
    underline: {
        '&:before': {
            borderBottom: `1px solid ${theme.palette.action.disabled}`
        },
        '&:after': {
            borderBottom: `1px solid ${theme.palette.primary.dark}`
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
            borderBottom: `1px solid ${theme.palette.secondary.main}!important`
        },
    },
	error: {
		color: 'red',
		margin: 0,
		fontSize: '10pt',
	},
	logoText: {
		fontSize: '27pt',
		fontWeight: 900,
		color: `${theme.palette.secondary.main}`,
	},
	logoTextSubtitle: {
		fontSize: '10pt',
		fontWeight: 'lighter',
		marginTop: '-15px',
		marginBottom: '15px',
		color: `${theme.palette.secondary.main}`,
	},
	labelGoogle: {
		marginLeft: '-6px',
	},
	input: {
		textIndent: '10px',
		marginTop: '15px'
	},
	goBackButton: {
		backgroundColor: '#eee',
		color: 'black',
		'&:hover': {
			backgroundColor: '#eee',
			color: 'black',
		}
	},
	recoverButton: {
		marginTop: '40px',
		marginBottom: '15px',
	},
	loading: {
		marginRight: '10px',
	},
	startOver: {
		color: `${theme.palette.secondary.main}`,
	},
	title: {
		fontWeight: 700,
		fontSize: '12pt',
		color: `${theme.palette.secondary.main}`,
		marginBottom: '20px',
	}
}))

export default useClasses
