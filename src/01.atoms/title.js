import React from 'react'
import styled from 'styled-components'
import { vars, device, hSizes } from '../00.assets/variables'

export const TitleWrapper = styled.div`
  font-weight: ${(props) => (props.bold ? '600' : '400')};
  font-size: ${(props) => hSizes[props.size]['mobile']};
  text-align: ${(props) => (props.align ? props.align : 'left')};

  @media ${device.laptop} {
    font-size: ${(props) => hSizes[props.size]['desktop']};
  }
`

function Title(props) {
  return (
    <TitleWrapper
      as={props.tag}
      size={props.tag}
      bold={props.bold}
      align={props.align}
    >
      {props.title}
    </TitleWrapper>
  )
}

export default Title
