import React, { useContext } from 'react'
import { BatContext } from '../../context'
import Thermometer from 'react-thermometer-component'

const Temperature = props => {
  const { moisture } = useContext(BatContext)
  return (
    <React.Fragment>
      Soil Moisture
      <Thermometer
        theme="light"
        value={moisture}
        max="100"
        steps="10"
        size="large"
        height="400"
      />
    </React.Fragment>
  )
}

export default Temperature
