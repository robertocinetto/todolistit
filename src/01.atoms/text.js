import React from 'react'
import styled from 'styled-components'
import { vars, device, pSizes } from '../00.assets/variables'

export const TextWrapper = styled.div`
  font-weight: ${(props) => (props.bold ? '600' : '300')};
  font-size: ${(props) => pSizes['mobile']};
  text-align: ${(props) => (props.align ? props.align : 'left')};
`

function Text(props) {
  return (
    <TextWrapper as="p" align={props.align} bold={props.bold}>
      {props.text}
    </TextWrapper>
  )
}

export default Text
