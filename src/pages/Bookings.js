import React, { useState } from 'react'
import {
  BookingList,
  BookingsChart,
  BookingsControls
} from './components/Bookings'
import { Modal } from './components'
import { useInfiniteScroll } from './hooks'
import { useBookings } from '../actions'

export default function BookingsPage () {
  const [outputType, setOutputType] = useState('list')
  const {
    bookings,
    loadingBookings,
    cancelBooking,
    cancelingBook,
    loadMoreBookings
  } = useBookings()
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [error, setError] = useState()

  useInfiniteScroll(loadMoreBookings)

  const selectBookingHandler = bookingId => {
    setError()
    setSelectedBooking(bookings.find(({ _id }) => bookingId === _id))
  }

  const deleteBookingHandler = async () => {
    try {
      const event = await cancelBooking(selectedBooking._id)
      // sendNotification(`Booking ${event.title} canceled`)
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
          title="Cancel Booking"
          onHide={selectBookingHandler.bind(this, null)}
          onConfirm={deleteBookingHandler}
          error={error}
          loading={cancelingBook}>
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
