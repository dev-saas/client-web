import React from 'react'
import styled from 'styled-components'

const Content = styled.div`
  margin-top: 100px;
`

export default function ContentStyled ({ children }) {
  return <Content>{children}</Content>
}
