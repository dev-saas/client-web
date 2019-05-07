import React from 'react'

import { Fragment } from '../..'
import BookingItem from './BookingItem/BookingItem'

const bookingList = ({ bookings, onDelete, isLoading }) => (
  <Fragment isLoading={isLoading}>
    {bookings.map(booking => (
      <BookingItem key={booking._id} booking={booking} onDelete={onDelete} />
    ))}
  </Fragment>
)

export default bookingList
