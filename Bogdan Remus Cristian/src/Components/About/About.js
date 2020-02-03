import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Typography'
import useClasses from './About.classes'
import { aboutImage,cristi,eubooks,eumail,euphone,moga } from '../../Images'
import Library from './Library'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

export default props => {

	const classes = useClasses()

    return (
		<Box className={classes.bigBox}>
			<Box className={classes.about}>
				<img src={aboutImage} width="100%" className={classes.background}/>
				<Box className={classes.aboutInner}>
					<Box className={classes.euBox}>
						<img src={cristi} className={classes.eu} />
					</Box>
					<Box className={classes.euTexts}>
						<Typography className={classes.euName}>
							BOGDAN REMUS CRISTIAN
						</Typography>
						<Typography className={classes.euDev}>
							Dev.
						</Typography>
					</Box>
				</Box>
			</Box>

			<Box className={classes.euInfo}>
				<Paper className={classes.euInfoRow}>
					<a href="tel:0723080379">
						<img src={euphone} width="32px" height="32px"/>
					</a>
					<Typography>
						Mobile
					</Typography>
				</Paper>

				<Paper className={classes.euInfoRow}>
					<a href="mailto:cevacomic@gmail.com">
						<img src={eumail} width="32px" height="32px"/>
					</a>
					<Typography>
						E-mail
					</Typography>
				</Paper>
			</Box>

			<Box className={[classes.euInfo,classes.thanksLibrary].join(' ')}>
				<List classes={{root: classes.list}}>
					<ListItem classes={{root:[classes.euInfoRow,classes.thanks].join(' ')}}>
						<ListItemIcon>
							<img src={moga} width="50px" height="50px" style={{borderRadius: '50%'}}/>
						</ListItemIcon>
					  <ListItemText primary={"Special thanks M.A. for mockup/design"}
						  classes={{
							  primary: classes.primaryText,
						  }}
					  />
					</ListItem>
					<Library />
				</List>
			</Box>
		</Box>
	)
}
