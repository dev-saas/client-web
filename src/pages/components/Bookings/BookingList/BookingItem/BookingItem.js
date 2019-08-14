import React from 'react'
import { Button } from '@material-ui/core'
import styled from 'styled-components'

const StyledRow = styled.div`
  margin: 1rem 0;
  padding: 1rem;
`

const BookingItem = ({ booking, onDelete }) => (
  <StyledRow className="justify-content-center align-items-center">
    <StyledRow lg={5} md={7} sm={8} xs={8}>
      {booking.event.title} {' - '}
      {new Date(booking.createdAt).toLocaleDateString()}
    </StyledRow>
    <StyledRow lg={1} md={2} sm={4} xs={4} className="text-right">
      <Button variant="primary" onClick={() => onDelete(booking._id)}>
        Cancel
      </Button>
    </StyledRow>
  </StyledRow>
)

export default BookingItem
