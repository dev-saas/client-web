import React from 'react'
import styled from 'styled-components'

function Error ({ message }) {
  return (
    <React.Fragment>
      {message && <div id={`error-${message}`}>{message}</div>}
    </React.Fragment>
  )
}

const ErrorStyled = styled(Error)`
  color: #d8000c;
  background-color: #ffbaba;
`

export default ErrorStyled
