import {
  reducer as eventsReducer,
  initialState as events
} from './events-reducer'

import {
  reducer as bookingsReducer,
  initialState as bookings
} from './booking-reducer'

import {
  reducer as authReducer,
  initialState as user
} from './auth-reducer'

export const initialState = {
  events,
  bookings,
  user
}

export const mainReducer = ({ events, bookings, user }, action) => {
  return {
    events: eventsReducer(events, action),
    bookings: bookingsReducer(bookings, action),
    user: authReducer(user, action)
  }
}
