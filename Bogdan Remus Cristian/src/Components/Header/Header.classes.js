import {makeStyles} from '@material-ui/core/styles'

const useClasses = makeStyles(theme => ({
	mainBox: {
		display: 'flex',
		width: '100%',
		maxWidth: '1024px',
		minWidth: '280px',
		borderRadius: '0px',
		marginLeft: 'auto',
		marginRight: 'auto',
		background: 'transparent',
	},
	colorHeader: {
		backgroundColor: 'white!important',
		color: `${theme.palette.secondary.main}!important`,
		height: '56px!important',
	},
	spacer: theme.mixins.toolbar,
	middleGrow: {
		flexGrow: 1,
	},
	logoMobile: {
		height: '100%',
	},
	menuButton: {
		fontSize: 40,
	},
	menu: {
		// padding: theme.spacing(3),
		zIndex: '2000!important',
		backgroundColor: `${theme.palette.primary.dark}!important`,
		"& > a": {
			textDecoration: 'none',
		},
	},
	notify: {
		position: 'absolute',
		top: '56px',
		left: 0,
		right: 0,
	},
	menuLinkIcon: {
		color: 'white!important',
	},
	menuLinkText: {
		color: 'white!important',
	},
	title: {
		paddingLeft: theme.spacing(5),
		fontWeight: 700,
		transition: 'all 0.2s',
	},
	bellBadge: {
		height: '12px',
		minWidth: '12px',
		marginTop: '2px',
		marginRight: '1px',
		border: '2px solid white',
	},
	bellBadgeBox: {
		height: '12px',
		minWidth: '12px',
		marginTop: '2px',
		border: '2px solid white',
	},
	goBackBox: {
		width: 0,
		overflow: 'hidden',
		transition: 'all 0.2s',
	},
	goBackOpen: {
		width: '30px',
	},
	goBack: {
		paddingRight: 0,
	},
	titleGoBack: {
		paddingLeft: '10px',
	},
	goBackIcon: {
		color: `${theme.palette.secondary.main}!important`,
	},
}))

export default useClasses
