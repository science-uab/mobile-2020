import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import useClasses from '../blackBarCss'
import {Box, TextField, ListItem} from '@material-ui/core'


function SelectListElement(props){
    const classes = useClasses()
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const {nume,id} = props
    return(
        <ListItem className={classes.selectListElement} button selected={selectedIndex === {id}} onClick={() => setSelectedIndex(id)}>
          {nume}
        </ListItem>
    )  
}

const mapStateToProps = (state) =>{

    return{
    }
}


const mapDispatchToProps = dispatch => (bindActionCreators({
    //actions
},dispatch))

export default connect(mapStateToProps,mapDispatchToProps)(SelectListElement)