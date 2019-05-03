import React from 'react'
import { RelayButton, Temperature, Luminosity, Moisture } from '../components'
import { BatProvider } from '../provider'

const Room = props => {
  return (
    <BatProvider>
      <RelayButton pino={1} />
      <RelayButton pino={2} />
      <br />
      <Temperature />
      <br />
      <Luminosity />
      <br />
      <Moisture />
    </BatProvider>
  )
}

export default Room
