import React from 'react';
import {MenuItem as Item} from '@material-ui/core'
import {Menu as MainMenu} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'


export const MenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: '#f0f0f0',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.black,
      },
    },
  },
}))(Item);

export const Menu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <MainMenu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
))
