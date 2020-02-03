import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import useClasses from '../anunturiCss'
import {Box, Button} from '@material-ui/core'
import Anunt from './Anunt'
import useBeforeFirstRender from '../../../Utils/useBeforeFirstRender'
import CircularProgress from '@material-ui/core/CircularProgress'
import {getAnunturi,setAnuntId} from '../../../Actions'
import {selectAnuntId,selectAnuntData } from '../../../Selectors'
import {AnuntModal} from '../../ContinutModale'
import Rodal from 'rodal'
import 'rodal/lib/rodal.css'


function ListaAnunturi(props){
    const classes = useClasses()
    const {getAnunturi, anunturi, isLoading, setAnuntId, anuntId, anunt} = props
    var modalWidth  = window.innerWidth - 30
    var modalHeight  = window.innerHeight - 30;
    const renderListaAnunturi = (anunturi)  =>  {
        if(!anunturi.length)
            return <Box>Nu exista anunturi</Box>
        return anunturi.map((date) => (
            <Anunt onClick={() => setAnuntId(date.id)} {...date} key={date.id}/>
          ))
    }




    useBeforeFirstRender(() => {
        getAnunturi(10,0)
    })
    
    return(
        <>
        <Box className={classes.listaAnunturi} >
            {
                isLoading?
                <Box className={classes.loadingCircleBox}><CircularProgress color="secondary" /></Box>
                :
                renderListaAnunturi(anunturi||[])  
            }
            <Rodal width={modalWidth}  height={modalHeight} visible={anuntId>0} onClose={() => setAnuntId(-1)}>
                    <AnuntModal {...anunt}/>
                </Rodal>
        </Box>
        </>
    )  
}

const mapStateToProps = (state) =>{

    return{
        anunt: selectAnuntData(state),
        anuntId: selectAnuntId(state),
        isLoading : state.anunturi.isLoading,
        anunturi: state.anunturi.anunturi
    }
}


const mapDispatchToProps = dispatch => (bindActionCreators({
    //actions
    getAnunturi,
    setAnuntId,
},dispatch))

export default connect(mapStateToProps,mapDispatchToProps)(ListaAnunturi)