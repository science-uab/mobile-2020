import {makeStyles} from '@material-ui/core/styles'

const useClasses = makeStyles(theme => ({
    notification: {
        zIndex: 9999,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white'
    },
    paper: {
        borderRadius: 0,
        padding: '10px',
        display: 'flex',
        flexDirection: 'row'
    },
    content: {
        flexDirection: 'column',
		marginLeft: '10px',
    }
}))

export default useClasses
