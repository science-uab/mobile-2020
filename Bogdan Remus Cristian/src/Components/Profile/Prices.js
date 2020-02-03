import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import useClasses from './Profile.classes'
import Icon from './Icon'
import { setPricesValues,setPricesTempValue,resetPricesTempValues } from '../../Actions'
import { pricesSelector } from '../../Selectors'
import {icons,isLoadingIcon,envelope as envelopeIcon,box} from '../../Images'
import TextField from '@material-ui/core/TextField'
import { StylesProvider } from '@material-ui/core/styles'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Fade from '@material-ui/core/Fade'
import Modal from '@material-ui/core/Modal'
import EuroSymbolRoundedIcon from '@material-ui/icons/EuroSymbolRounded'


const Prices = props => {

	const classes = useClasses()
	const { setPricesValues,setPricesTempValue,resetPricesTempValues } = props
	const { envelope, normal, extra, isLoading, temp, outside } = props

	const [open, setOpen] = React.useState(false)
	const [error, setError] = React.useState(false)

	const getPrices = () => {
		let message = ""
		if(envelope !== "0.00")
			message += "E: $" + envelope + " "
		if(normal !== "0.00")
			message += "P: $" + normal + "/kg "
		if(extra !== "0.00" && outside)
			message += "Extra km: $" + extra + "/km "
		return message.trim() || "not set yet"
	}

	const onSave = () => {
		if(temp.envelope >= 0.0 && temp.normal >= 0.0 && temp.extra >= 0.0) {
			setPricesValues()
			error && setError(false)
			setOpen(false)
		} else {
			!error && setError(true)
		}
	}

	const onCancel = () => {
		resetPricesTempValues()
		setOpen(false)
	}

	return (
		<StylesProvider injectFirst>
			<ListItem classes={{container: classes.listItemWhite,root:classes.listItem}}>
			  <Icon icon={icons.price} />
			  <ListItemText primary="Prices" secondary={getPrices()}
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
				  <Box className={[classes.modalInner,classes.prices].join(' ')}>
					  <Box className={classes.topImageBox}>
						  <Box className={classes.topImageBoxInner}>
							  <img src={require('../../Images/car.png')} className={classes.topImage} />
						  </Box>
					  </Box>

					<h2 className={classes.modalTitle}>Set your prices</h2>

					{
						error && <Typography className={classes.modalError} color="error">Check all data before saving</Typography>
					}


					<Box className={classes.modalRow}>
						<img src={envelopeIcon} width="36px" height="24px"/>
						<TextField
							disabled={isLoading}
							classes={{root: classes.modalInputPrice }}
							  InputProps={{
								  classes: {
  									input: classes.modalInputText
  								},
					          endAdornment: (
  					              <EuroSymbolRoundedIcon className={classes.priceSymbol}/>
					          ),
					        }}
							defaultValue={temp.envelope >= 0.0 ? temp.envelope : envelope}
							size="small"
							variant="outlined"
							color="secondary"
							onChange={e => setPricesTempValue({envelope:e.target.value})}
						/>
						<h2 className={classes.modalTitle}>/piece envelope price</h2>
					</Box>

					<Box className={classes.modalRow}>
						<img src={box} width="36px" height="36px"/>
						<TextField
							disabled={isLoading}
							classes={{root: classes.modalInputPrice }}
							  InputProps={{
								  classes: {
  									input: classes.modalInputText
  								},
					          endAdornment: (
  					              <EuroSymbolRoundedIcon className={classes.priceSymbol}/>
					          ),
					        }}
							defaultValue={temp.normal >= 0.0 ? temp.normal : normal}
							size="small"
							variant="outlined"
							color="secondary"
							onChange={e => setPricesTempValue({normal:e.target.value})}
						/>
						<h2 className={classes.modalTitle}>/kg package price</h2>
					</Box>

					{ outside &&
						<Box className={classes.modalRow}>
							<img src={icons.outside} width="36px" height="36px"/>
							<TextField
								disabled={isLoading}
								classes={{root: classes.modalInputPrice }}
								  InputProps={{
									  classes: {
	  									input: classes.modalInputText
	  								},
						          endAdornment: (
	  					              <EuroSymbolRoundedIcon className={classes.priceSymbol}/>
						          ),
						        }}
								defaultValue={temp.extra >= 0.0 ? temp.extra : extra}
								size="small"
								variant="outlined"
								color="secondary"
								onChange={e => setPricesTempValue({extra:e.target.value})}
							/>
							<h2 className={classes.modalTitle}>/km extra outside city</h2>
						</Box>
					}

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
		</StylesProvider>
	)
}

const mapStateToProps = (state) => {
	const data = pricesSelector(state)
    return {
		...data,
    }
}

const mapDispatchToProps = dispatch => (bindActionCreators({
    setPricesValues,
	setPricesTempValue,
	resetPricesTempValues
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(Prices)
