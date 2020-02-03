import Switch from '@material-ui/core/Switch'
import { withStyles } from '@material-ui/core/styles'

const AntSwitch = withStyles(theme => ({
  root: {
    width: 34,
    height: 17,
    padding: 3,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(15px)',
      color: theme.palette.primary.dark,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        // borderColor: 'rgba(0, 0, 0, 0.24)',
      },
    },
  },
  thumb: {
    width: 15,
    height: 15,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch)

export default AntSwitch
