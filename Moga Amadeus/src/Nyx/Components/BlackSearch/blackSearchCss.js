import {makeStyles} from '@material-ui/core/styles'

const useClasses = makeStyles(theme =>({
    blackSearch:{
        position: 'fixed',
        top: 'calc(178px + 36px)',
        zIndex: '11',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        background: '#262626',
        marginBottom: '15px',
        padding: '5px 20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    },
    blackSearchBar:{
        width: '100%',
        '& input':{
            color: 'white',
            fontSize: '10pt',
            paddingLeft: '5px',
        },
        
    },
    blackSearchIcon:{
        color:'white',
        marginRight: 'auto',
    },
    filtreBaricons:{
        marginLeft: 'auto',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    filtreBarFals:{
        minHeight: '36px',
    }
    }))

export default useClasses