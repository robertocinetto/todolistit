import React from 'react'
import { connect } from 'react-redux'

import { auth } from '../firebase/firebase.utils'

import Grid from '@material-ui/core/Grid'
import MuiMenu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Avatar from '@material-ui/core/Avatar'

class Menu extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      anchorEl: null,
    }
  }

  setAnchorEl(value) {
    this.setState({ anchorEl: value })
  }

  handleClick = (event) => {
    this.setAnchorEl(event.currentTarget)
  }

  handleClose = () => {
    this.setAnchorEl(null)
  }
  render() {
    return (
      <div>
        <Grid
          container
          alignItems="center"
          spacing={2}
          onClick={this.handleClick}
          style={{ cursor: 'pointer' }}
        >
          <Grid item xs>
            {this.props.currentUser.email}
          </Grid>
          <Grid item xs>
            <Avatar>H</Avatar>
          </Grid>
        </Grid>
        <MuiMenu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={() => auth.signOut()}>Logout</MenuItem>
        </MuiMenu>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
})

export default connect(mapStateToProps)(Menu)
