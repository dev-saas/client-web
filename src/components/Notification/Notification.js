import React, { useContext } from 'react'
import { LoadContext } from '../../context'
import { useNotification } from '../../hooks'
import styled from 'styled-components'
import './loading.css'
import { Alert, Row, Col } from 'react-bootstrap'

const StyledAlert = styled(Alert)`
  margin: 12px auto;
  padding: 3px;
`

const Notification = props => {
  const { notifications, warnings, errors } = useNotification()
  const { loading } = useContext(LoadContext)
  return (
    <Row className='justify-content-md-center fixed-bottom'>
      <Col sm={12} md={8} lg={6} className='mx-center'>
        {errors.map((message, index) => (
          <StyledAlert
            key={index}
            variant='danger'
            className='text-center'>
            {message}
          </StyledAlert>
        ))}
        {warnings.map((message, index) => (
          <StyledAlert
            key={index}
            variant='warning'
            className='text-center'>
            {message}
          </StyledAlert>
        ))}
        {notifications.map((message, index) => (
          <StyledAlert
            key={index}
            variant='success'
            className='text-center'>
            {message}
          </StyledAlert>
        ))}
      </Col>
      {loading && <div className='loading' />}
    </Row>
  )
}

export default Notification
