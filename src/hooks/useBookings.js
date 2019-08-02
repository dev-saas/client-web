import { useMutation, useQuery, useGlobalState, usePagination } from './'

import { types } from '../store/reducer/booking-reducer'

const { NEW_BOOKING, REMOVE_BOOKING, SET_BOOKINGS } = types

const cancelBookingMutation = `
  mutation ($id: ID!) {
    event: cancelBooking(bookingId: $id) {
    _id
      title
    }
  }
  `

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

const bookEventMutation = `
  mutation BookEvent($id: ID!) {
    bookEvent(eventId: $id) {
      _id
      createdAt
      updatedAt
    }
  }
`

export default function useEvents() {
  const [state, dispatch] = useGlobalState()
  const [isbookingEvent, BookEvent] = useMutation(bookEventMutation)
  const [cancelingBook, CancelBook] = useMutation(cancelBookingMutation)
  const [loadingBookings, FetchBookings] = useQuery(bookingsQuery)
  const { page, setPageInfo } = usePagination()

  const bookEvent = async event => {
    const { bookEvent } = await BookEvent(event)

    dispatch({
      type: NEW_BOOKING,
      payload: bookEvent
    })

    return bookEvent
  }

  const cancelBooking = async booking => {
    const { event } = await CancelBook(booking)

    dispatch({
      type: REMOVE_BOOKING,
      payload: booking.id
    })

    return event
  }

  const fetchBookings = async () => {
    const { getBookings } = await FetchBookings(page())

    if (!getBookings.edges[0]) return

    setPageInfo(getBookings.pageInfo)

    dispatch({
      type: SET_BOOKINGS,
      payload: getBookings.edges
    })
  }

  return {
    bookings: state.bookings,
    bookEvent,
    fetchBookings,
    loadingBookings,
    isbookingEvent,
    cancelingBook,
    cancelBooking
  }
}
