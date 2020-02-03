
import {makeStyles} from '@material-ui/core/styles'

const useClasses = makeStyles(theme =>({
    footerContainer:{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#262626',
        marginTop: 'auto',
        // borderTop: '2px solid #262626',
    },
    footerRedBar:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#f35',
        fontSize: '9pt',
        fontWeight: 600,
        padding: '15px 20px',
        color: 'white'
    },
    contactLink:{
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 800,
        width: '100%',
        fontSize: '8pt',
        color:'white',
        // borderTop: '2px solid #f35',
        padding: '15px 20px',

    },
}))

export default useClasses