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
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers'
import { setScheduleValues,setScheduleTempValue,resetScheduleTempValues } from '../../Actions'
import { scheduleSelector } from '../../Selectors'
import DateFnsUtils from '@date-io/date-fns'
import moment from 'moment'
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded'

const Schedule = (props) => {

	const classes = useClasses()

	const { start, end } = props
	const { sun, mon, tue, wen, thu, fri, sat } = props.temp

	const [open, setOpen] = React.useState(false)
	const { setScheduleValues, setScheduleTempValue, resetScheduleTempValues, isLoading } = props


	const onCancel = () => {
		resetScheduleTempValues()
		setOpen(false)
	}

	const onSave = () => {
		setScheduleValues()
		setOpen(false)
	}

	return (
		<>
		<ListItem button classes={{container: classes.listItemBlack,root: classes.listItem}}>
		  {
			  isLoading
			  ? <Icon icon={isLoadingIcon}/>
			  : <Icon icon={icons.schedule} />
		  }
		  <ListItemText primary="Schedule" secondary={(start !== "00:00" || end !== "00:00") ? start + " - " + end : "not set yet"}
			  classes={{
				  primary: classes.primaryText,
				  secondary: classes.secondaryText
			  }}
		  />

		  <ListItemSecondaryAction>
			<IconButton edge="end" aria-label="edit" onClick={() => setOpen(true)}>
				<img src={icons.edit} width="21px" height="27px"/>
			</IconButton>
		  </ListItemSecondaryAction>
		</ListItem>
		<Modal
			className={classes.modal}
			open={open}
			closeAfterTransition
			disableBackdropClick
		  >
			<Fade in={open}>
			  <Box className={classes.modalInner}>
				  <Box className={classes.topImageBox}>
					  <Box className={classes.topImageBoxInner}>
						  <img src={require('../../Images/clock.png')} className={classes.topImage} />
					  </Box>
				  </Box>

				<h2 className={[classes.modalTitle,classes.modalTitleMargin].join(' ')}>Select working days</h2>

				<Box className={classes.days}>
					<Box
						className={[classes.day,mon ? classes.dayActive : ''].join(' ')}
						onClick={() => setScheduleTempValue({mon:!mon})}
					>
						M
					</Box>

					<Box
						className={[classes.day,tue ? classes.dayActive : ''].join(' ')}
						onClick={() => setScheduleTempValue({tue:!tue})}
					>
						T
					</Box>

					<Box
						className={[classes.day,wen ? classes.dayActive : ''].join(' ')}
						onClick={() => setScheduleTempValue({wen:!wen})}
					>
						W
					</Box>

					<Box
						className={[classes.day,thu ? classes.dayActive : ''].join(' ')}
						onClick={() => setScheduleTempValue({thu:!thu})}
					>
						T
					</Box>

					<Box
						className={[classes.day,fri ? classes.dayActive : ''].join(' ')}
						onClick={() => setScheduleTempValue({fri:!fri})}
					>
						F
					</Box>

					<Box
						className={[classes.day,sat ? classes.dayActive : ''].join(' ')}
						onClick={() => setScheduleTempValue({sat:!sat})}
					>
						S
					</Box>

					<Box
						className={[classes.day,sun ? classes.dayActive : ''].join(' ')}
						onClick={() => setScheduleTempValue({sun:!sun})}
					>
						S
					</Box>
				</Box>

				<h2 className={classes.modalTitle}>Set schedule time interval</h2>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>

					<Box className={classes.schedulePicker}>

						<TimePicker
							DialogProps={{
								className: classes.zIndexBig,
							}}
							clearable
							clearLabel="Reset"
							minutesStep={5}
							label="from"
							classes={{
								root: classes.startPicker,
							}}
						  inputVariant="outlined"
				          margin="normal"
						  ampm={false}
				          value={moment(new Date('2020-01-01T' + props.temp.start + ":00+02:00"))}
				          onChange={start => setScheduleTempValue({start})}
				        />
						<RemoveRoundedIcon classes={{root:classes.startPickerSep}} />
						<TimePicker
							DialogProps={{
								className: classes.zIndexBig,
							}}
							clearable
							minutesStep={5}
							label="to"
							classes={{
								root: classes.startPicker,
							}}
						  inputVariant="outlined"
				          margin="normal"
						  ampm={false}
				          value={moment(new Date('2020-01-01T' + props.temp.end + ":00+02:00"))}
				          onChange={end => setScheduleTempValue({end})}
				        />
					</Box>

				</MuiPickersUtilsProvider>
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
		  </Modal>
	  	</>
	)
}

const mapStateToProps = (state) => {
	const values = scheduleSelector(state)
    return {
        ...values,
    }
}

const mapDispatchToProps = dispatch => (bindActionCreators({
	setScheduleValues,
	setScheduleTempValue,
	resetScheduleTempValues
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)
