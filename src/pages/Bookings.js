import React, { useState, useEffect } from 'react'

import {
  BookingList,
  BookingsChart,
  BookingsControls
} from '../components/Bookings'
import { Modal } from '../components'
import { useInfiniteScroll, useList, useNotification } from '../hooks'

import { useBookings } from '../hooks/api'
import { ArrayHelper } from '../helper/array-utils'

const BookingsPage = props => {
  const [outputType, setOutputType] = useState('list')
  const {
    bookings,
    loadingBookings,
    fetchBookings,
    cancelBooking,
    cancelingBook,
    loadMoreBookings
  } = useBookings()
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [error, setError] = useState()
  const { sendNotification } = useNotification()

  const Bookings = ArrayHelper(bookings)

  useEffect(() => {
    fetchBookings()
  }, [])

  useInfiniteScroll(loadMoreBookings)

  const selectBookingHandler = bookingId => {
    setError()
    setSelectedBooking(Bookings.findById(bookingId))
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

export default BookingsPage
