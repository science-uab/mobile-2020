import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Typography'
import useClasses from './About.classes'
import { library } from '../../Images'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

const LibraryRow = ({ description, light, last }) => {
	const classes = useClasses()
	return (
		<ListItem classes={{root:[classes.euInfoRow,classes.thanks,light?classes.lightGreen:'',last ?classes.last:''].join(' ')}}>
			<ListItemIcon>
				<img src={library} width="50px" height="50px" style={{borderRadius: '50%'}}/>
			</ListItemIcon>
		  <ListItemText primary={description}
			  classes={{
				  primary: classes.primaryText,
			  }}
		  />
		</ListItem>
	)
}

const Libraries = ['React','Material-UI','Redux','Redux Saga','React router','React persist','axios','moment','And others']

const Library = () => {
	return Libraries.map((description,index) =>
		<LibraryRow
			key={index}
			description={description}
			light={index % 2 === 0}
			last={index+1 === Libraries.length}
		/>
	)
}

export default Library
