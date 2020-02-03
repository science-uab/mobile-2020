import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Fade from '@material-ui/core/Fade'
import Modal from '@material-ui/core/Modal'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import useClasses from './Profile.classes'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Icon from './Icon'
import {icons,isLoadingIcon} from '../../Images'
import Switch from './Switch'
import TextField from '@material-ui/core/TextField'
import { setUpdateProfileValue,changePasswordWith } from '../../Actions'

const ListRow = ({ title, value, icon, black = false, toggle = false, checked, onClick, isLoading, label, ...rest }) => {
	const classes = useClasses()

	const [open, setOpen] = React.useState(false)
	const [temp, setTemporaryValue] = React.useState(value)
	const [temppass, setTemporaryPassword] = React.useState("")
	const { setUpdateProfileValue,changePasswordWith } = rest

	const onClickInternal = () => {
		if(!toggle) {
			setOpen(true)
		} else {
			onClick && onClick()
		}
	}

	const onCancel = () => {
		setTemporaryValue(value)
		setTemporaryPassword("")
		setOpen(false)
	}

	const onSave = async () => {
		if(temp.length < 1)
			return

		if(label === "phone" && isNaN(temp))
			return

		if(label === "password") {
			if(temp !== temppass || temppass.length < 6)
				return
			await changePasswordWith(temppass)
			setTemporaryPassword("")
			setOpen(false)
		} else {
			await setUpdateProfileValue({[label]:temp})
			setOpen(false)
		}
	}

	return (
		<>
		<ListItem button classes={{container: !black ? classes.listItemWhite : classes.listItemBlack,root:classes.listItem}}>
		  {
			  isLoading
			  ? <Icon icon={isLoadingIcon}/>
			  : <Icon icon={icon} />
		  }
		  <ListItemText primary={title} secondary={value || "not set yet"}
			  classes={{
				  primary: classes.primaryText,
				  secondary: classes.secondaryText
			  }}
		  />

		  <ListItemSecondaryAction>
			<IconButton edge="end" aria-label="edit" onClick={onClickInternal}>
			  {
				  !toggle
				  ? (<img src={icons.edit} width="21px" height="27px"/>)
				  : (<Switch color="primary" checked={checked}/>)
			  }
			</IconButton>
		  </ListItemSecondaryAction>
		</ListItem>
		{ !toggle && <Modal
			className={classes.modal}
			open={open}
			closeAfterTransition
			disableBackdropClick
		  >
			<Fade in={open}>
			  <Box className={classes.modalInner}>
				  <Box className={classes.topImageBox}>
					  <Box className={classes.topImageBoxInner}>
						  <img src={require('../../Images/profile.png')} className={classes.topImage} />
					  </Box>
				  </Box>
				  {
					  label === "phone" && isNaN(temp) && (
						  <h2 className={classes.phoneError}>Phone can contain only digits</h2>
					  )
				  }
				<h2 className={classes.modalTitle}>{temp ? "Change" : "Set"} {title.toLowerCase()}</h2>
				<TextField
					disabled={isLoading}
					classes={{root: classes.modalInput }}
					InputProps={{
						classes: {
							input: classes.modalInputText
						}
					}}
					type={label === "password" ? "password" : "text"}
					defaultValue={label !== "password" ? temp : ""}
					// value={temp}
					onChange={e => setTemporaryValue(e.target.value)}
					size="small"
					variant="outlined"
					color="secondary"
				/>
				{ label === "password" && (
					<>
					<h2 className={classes.modalTitle}>Repeat {title.toLowerCase()}</h2>
					<TextField
						disabled={isLoading}
						classes={{root: classes.modalInput }}
						InputProps={{
							classes: {
								input: classes.modalInputText
							}
						}}
						type="password"
						value={temppass}
						onChange={e => setTemporaryPassword(e.target.value)}
						size="small"
						variant="outlined"
						color="secondary"
					/>
					</>
				)}
				<Box className={classes.modalButtons}>
					<Button disabled={isLoading} variant="contained" color="secondary" className={classes.modalButton} onClick={onCancel}>
						{isLoading && <Icon icon={isLoadingIcon}/>} Cancel
					</Button>
					<Button disabled={isLoading} variant="contained" color="primary" className={classes.modalButton} onClick={onSave}>
						Save
					</Button>
				</Box>
			  </Box>
			</Fade>
		  </Modal>}
	  	</>
	)
}

const mapDispatchToProps = dispatch => (bindActionCreators({
	setUpdateProfileValue,
	changePasswordWith
}, dispatch))

export default connect(null, mapDispatchToProps)(ListRow)
