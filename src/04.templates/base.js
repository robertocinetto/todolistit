import React from 'react'
import { styled } from '@material-ui/core/styles'
import MuiPaper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import Header from '../03.organisms/header'
import Footer from '../03.organisms/footer'

const Paper = styled(MuiPaper)({
  padding: '20px',
  height: '100%',
})

function Base({ children }) {
  return (
    <Paper>
      <Header />
      <Grid container>{children}</Grid>
      <Footer />
    </Paper>
  )
}

export default Base
