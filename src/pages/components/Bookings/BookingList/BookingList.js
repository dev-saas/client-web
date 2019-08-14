import React from 'react'

import BookingItem from './BookingItem/BookingItem'

const bookingList = ({ bookings, onDelete }) => (
  <React.Fragment>
    {bookings.map(booking => (
      <BookingItem key={booking._id} booking={booking} onDelete={onDelete} />
    ))}
  </React.Fragment>
)

export default bookingList
