import React from 'react'

import Menu from './menu'

import Grid from '@material-ui/core/Grid'

import { ReactComponent as Logo } from '../00.assets/logo.svg'

function Header() {
  return (
    <Grid container alignItems="center">
      <Grid item xs={6}>
        <Logo />
      </Grid>
      <Grid container item xs={6} justify="flex-end">
        <Menu />
      </Grid>
    </Grid>
  )
}

export default Header
