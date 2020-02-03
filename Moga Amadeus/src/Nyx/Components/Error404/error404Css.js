
import {makeStyles} from '@material-ui/core/styles'

const useClasses = makeStyles(theme =>({
    error404Window:{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    error404:{
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    linkHomeButton:{
        backgroundColor: '#f35 !important',
        fontSize: '12pt',
        fontWeight: 900,
        padding: '6px 15px',
        color: 'white',
        textDecoration:'none',
    }
      
}))

export default useClasses