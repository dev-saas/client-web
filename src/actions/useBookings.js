import { useEffect } from 'react'
import { useGlobalState } from '../reducer'
import { types } from './store/booking-store'
import { useGetBookingsQuery } from './graphql/query'
import {
  useBookEventMutation,
  useCancelBookingMutation
} from './graphql/mutation'

export default function useEvents () {
  const [{ bookings }, dispatch] = useGlobalState()
  const [BookEvent, isbookingEvent] = useBookEventMutation()
  const [CancelBook, cancelingBook] = useCancelBookingMutation()
  const [FetchBookings, loadingBookings] = useGetBookingsQuery()

  useEffect(() => {
    fetchBookings()
  }, [])

  const bookEvent = async eventId => {
    const event = await BookEvent(eventId)
    return event
  }

  const cancelBooking = async bookingId => {
    const event = await CancelBook(bookingId)
    dispatch({
      type: types.REMOVE_BOOKING,
      payload: bookingId
    })
    return event
  }

  const fetchBookings = async () => {
    const getBookings = await FetchBookings()
    dispatch({
      type: types.SET_BOOKINGS,
      payload: getBookings
    })
  }

  const loadMoreBookings = async () => {
    const getBookings = await FetchBookings()
    dispatch({
      type: types.ADD_MANY_BOOKING,
      payload: getBookings
    })
  }

  return {
    bookings,
    bookEvent,
    fetchBookings,
    loadingBookings,
    isbookingEvent,
    cancelingBook,
    cancelBooking,
    loadMoreBookings
  }
}
