import React from 'react'
import { RelayButton, Temperature, Luminosity, Moisture } from '../components'
import { BatProvider } from '../provider'
import { Row, Col } from 'react-bootstrap'

const Room = props => {
  return (
    <BatProvider>
      <Row>
        <Col>
          <RelayButton pino={1} />
        </Col>
        <Col>
          <RelayButton pino={2} />
        </Col>
        <Col>
          <Temperature />
        </Col>
        <Col>
          <Luminosity />
        </Col>
        <Col>
          <Moisture />
        </Col>
      </Row>
    </BatProvider>
  )
}

export default Room
