import React from 'react'
import styled from 'styled-components'
import { vars, device, hSizes } from '../00.assets/variables'

import TextField from '@material-ui/core/TextField'

const InputWrapper = styled.div`
  width: 100%;
`

function Input(props) {
  const { id, required, label, fullWidth } = props
  return (
    <TextField
      id={id}
      label={label}
      fullWidth={fullWidth}
      required={required}
    />
  )
}

Input.defaultProps = {
  type: 'text',
}

export default Input
