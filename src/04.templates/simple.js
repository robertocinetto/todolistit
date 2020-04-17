import React from 'react'
import { styled } from '@material-ui/core/styles'
import MuiPaper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const Paper = styled(MuiPaper)({
  padding: '20px',
  height: '100%',
})

function Simple({ children }) {
  return (
    <Paper>
      <Grid container justify="center" alignItems="center">
        {children}
      </Grid>
    </Paper>
  )
}

export default Simple
