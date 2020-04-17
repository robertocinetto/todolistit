import React from 'react'
import { vars, device, sizes } from '../00.assets/variables'
import Simple from '../04.templates/simple'

import { styled } from '@material-ui/core/styles'
import MuiGrid from '@material-ui/core/Grid'
import MuiCard from '@material-ui/core/Card'
import MuiCardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Typography from '@material-ui/core/Typography'
import Switch from '@material-ui/core/Switch'

import { ReactComponent as Logo } from '../00.assets/logo.svg'

const Card = styled(MuiCard)({
  maxWidth: '350px',
  padding: '20px',
  borderRadius: '4px',
  backgroundColor: vars.contentBg,
})

const Grid = styled(MuiGrid)({
  textAlign: 'center',
})

const Home = () => {
  return (
    <Simple>
      <Grid item>
        <Logo />
        <Typography variant="h1" align="center">
          To Do Listit!
        </Typography>
        <Card variant="outlined">
          <MuiCardContent>
            <Typography variant="h3" align="center">
              Sign up
            </Typography>
            <Typography align="center">
              Let’s create an account so everything won’t fly away!
            </Typography>
            <form>
              <TextField id="filled-basic" label="email" required fullWidth />
              <TextField label="password" type="password" required fullWidth />
              <Button variant="contained" color="primary" fullWidth>
                Sign up
              </Button>
              <FormControlLabel
                control={<Checkbox name="checkedB" color="default" />}
                label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
              />
            </form>
          </MuiCardContent>
        </Card>
        <FormControlLabel
          control={
            <Switch
              // checked={state.checkedB}
              // onChange={handleChange}
              name="checkedB"
              color="primary"
            />
          }
          label="Primary"
        />
      </Grid>
    </Simple>
  )
}

export default Home
