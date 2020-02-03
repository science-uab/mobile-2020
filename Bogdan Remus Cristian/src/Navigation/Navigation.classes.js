import {makeStyles} from '@material-ui/core/styles'

const useClasses = makeStyles(theme => ({
	rootContainer: {
		position: 'absolute',
		display: 'flex',
		width: 'calc(100% - 20px)',
		height: 'calc(100% - 20px)',
		marginBottom: '75px',
		maxWidth: '1024px',
		minWidth: '280px',
		borderRadius: '0px',
		marginLeft: 'auto',
		marginRight: 'auto',
		background: '#fafafa',
	},
	logged: {
		height: 'calc(100% - 113px)',
		width: 'calc(100%)',
		top: '56px',
		left: '0px',
		right: '0px',
		// paddingTop: '5px',
		paddingBottom: '5px',
	}
}))

export default useClasses
