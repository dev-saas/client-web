import React from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

const StyledRow = styled(Row)`
  margin: 1rem 0;
  padding: 1rem;
`

const BookingItem = ({ booking, onDelete }) => (
  <StyledRow className='justify-content-center align-items-center'>
    <Col lg={5} md={7} sm={8} xs={8}>
      {booking.event.title} {' - '}
      {new Date(booking.createdAt).toLocaleDateString()}
    </Col>
    <Col lg={1} md={2} sm={4} xs={4} className='text-right'>
      <Button variant='primary' onClick={onDelete.bind(this, booking._id)}>
        Cancel
      </Button>
    </Col>
  </StyledRow>
)

export default BookingItem
