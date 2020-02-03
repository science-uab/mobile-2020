import { withStyles } from '@material-ui/core/styles'
import Badge from '@material-ui/core/Badge'

const StyledBadge = withStyles(theme => ({
  badge: {
    backgroundColor: `${theme.palette.primary.main}`,
    color: `${theme.palette.primary.light}`,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
	height: '8px',
	width: '8px',
	minWidth: '8px',
    '&::after': {
      position: 'absolute',
      top: '1px',
      left: 0,
      width: '5px',
      height: '5px',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.2)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0.2,
    },
  },
}))(Badge)

export default StyledBadge
