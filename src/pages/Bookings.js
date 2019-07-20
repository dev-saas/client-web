import React, { useState } from 'react'

import {
  BookingList,
  BookingsChart,
  BookingsControls
} from '../components/Bookings'
import { Modal } from '../components'
import {
  useInfiniteScroll,
  useGraphQL,
  useList,
  useNotification
} from '../hooks'

const BookingsPage = props => {
  const [outputType, setOutputType] = useState('list')
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [error, setError] = useState()
  const { query, mutate } = useGraphQL()
  const { sendNotification } = useNotification()
  const { list, addArray, remove, get } = useList()
  const { page, setPageInfo } = useInfiniteScroll(() => {
    fetchBookings()
  })
  const fetchBookings = async () => {
    const bookingsQuery = `
      query ($page: PageInput) {
        getBookings (page: $page){
          pageInfo {
            hasNextPage
            cursor
          }
          edges {
            _id
            createdAt
            event {
              _id
              title
              date
              price
            }
          }
        }
      }
    `

    const { getBookings } = await query({
      query: bookingsQuery,
      variables: {
        ...page()
      },
      fetchPolicy: 'no-cache'
    })
    if (!getBookings.edges[0]) return
    addArray(getBookings.edges)
    setPageInfo(getBookings.pageInfo)
  }

  const selectBookingHandler = bookingId => {
    setError()
    setSelectedBooking(get(bookingId))
  }

  const deleteBookingHandler = async () => {
    const cancelBookingMutation = `
      mutation ($id: ID!) {
        event: cancelBooking(bookingId: $id) {
        _id
          title
        }
      }
    `

    try {
      const { event } = await mutate({
        mutation: cancelBookingMutation,
        variables: {
          id: selectedBooking._id
        }
      })
      remove(selectedBooking._id)
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
        <BookingList bookings={list} onDelete={selectBookingHandler} />
      ) : (
        <BookingsChart bookings={list} />
      )}
    </React.Fragment>
  )
}

export default BookingsPage
