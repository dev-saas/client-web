import React, { useState, useEffect } from 'react'

import {
  BookingList,
  BookingsChart,
  BookingsControls
} from '../components/Bookings'
import { Modal } from '../components'
import {
  useInfiniteScroll,
  useBookings,
  useList,
  useNotification
} from '../hooks'

const BookingsPage = props => {
  const [outputType, setOutputType] = useState('list')
  const {
    bookings,
    loadingBookings,
    fetchBookings,
    cancelBooking,
    cancelingBook
  } = useBookings()
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [error, setError] = useState()
  const { sendNotification } = useNotification()
  const { get } = useList(bookings)
  useEffect(() => {
    fetchBookings()
  }, [])

  useInfiniteScroll(fetchBookings)

  const selectBookingHandler = bookingId => {
    setError()
    setSelectedBooking(get(bookingId))
  }

  const deleteBookingHandler = async () => {
    try {
      const event = await cancelBooking({ id: selectedBooking._id })
      sendNotification(`Booking ${event.title} canceled`)
      setSelectedBooking(null)
    } catch (err) {
      setError(err.message)
    }
  }

  const changeOutputTypeHandler = outputType => {
    if (outputType === 'list') {
      setOutputType('list')
    } else {
      setOutputType('chart')
    }
  }
  return (
    <React.Fragment>
      {selectedBooking && (
        <Modal
          show={selectedBooking}
          title='Cancel Booking'
          onHide={selectBookingHandler.bind(this, null)}
          onConfirm={deleteBookingHandler}
          error={error}>
          {selectedBooking.event.title}
        </Modal>
      )}
      <BookingsControls
        activeOutputType={outputType}
        onChange={changeOutputTypeHandler}
      />
      {outputType === 'list' ? (
        <BookingList
          bookings={bookings}
          onDelete={selectBookingHandler}
        />
      ) : (
        <BookingsChart bookings={bookings} />
      )}
    </React.Fragment>
  )
}

export default BookingsPage
