import { eventsReducer, initialEvents } from './reducer/events-reducer'
import {
  bookingsReducer,
  initialBookings
} from './reducer/booking-reducer'

export const initialState = {
  ...initialEvents,
  ...initialBookings
}

export const mainReducer = ({ events, bookings }, action) => {
  return {
    events: eventsReducer(events, action),
    bookings: bookingsReducer(bookings, action)
  }
}
