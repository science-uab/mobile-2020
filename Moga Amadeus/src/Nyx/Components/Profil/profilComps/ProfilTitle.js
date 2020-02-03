import React from 'react'
import useClasses from '../profilCss'

function ProfilTitle(props){
    const classes = useClasses()
    const { title } =  props
    return(
            <p className={classes.profilTitle}>
                {title}
            </p>
    )  
}

export default ProfilTitle