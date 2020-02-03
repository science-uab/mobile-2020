import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import MailOutlinedIcon from '@material-ui/icons/MailOutlined'
import SendIcon from '@material-ui/icons/Send'
import { Link } from 'react-router-dom'
import useClasses from '../Header.classes'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

const Notifications = (props) => {

	const classes = useClasses()
	const { close } = props

  return (
	  <List
		component="div"
		className={classes.menu}
	  >
		  <Link to="/">
		  <ListItem  divider={true} button onClick={close}>
		  <ListItemIcon>
			<HomeOutlinedIcon classes={{ root: classes.menuLinkIcon }} />
		  </ListItemIcon>
		  <ListItemText classes={{ primary: classes.menuLinkText }} primary={
			  <Typography color="textSecondary" component="h4">
				  Acasă
			  </Typography>
		  }  />
		</ListItem>
		  </Link>
		  <Link to="/page/about">
			<ListItem divider={true} button onClick={close}>
			  <ListItemIcon>
				  <InfoOutlinedIcon classes={{ root: classes.menuLinkIcon }} />
			  </ListItemIcon>
			  <ListItemText  classes={{ primary: classes.menuLinkText }} primary={
				  <Typography color="textSecondary" component="h4">
					  Despre noi
				  </Typography>
			  } />
			</ListItem>
		</Link>
		<Link to="/page/contact">
			<ListItem button onClick={close}>
			  <ListItemIcon>
				  <MailOutlinedIcon classes={{ root: classes.menuLinkIcon }} />
			  </ListItemIcon>
			  <ListItemText classes={{ primary: classes.menuLinkText }} primary={
				  <Typography color="textSecondary" component="h4">
					  Contact
				  </Typography>
			  }  />
			</ListItem>
		</Link>
	  </List>
  )
}


const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = dispatch => (bindActionCreators({

}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
