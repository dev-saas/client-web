import {
  reducer as eventsReducer,
  initialState as events
} from './event-store'

import {
  reducer as bookingsReducer,
  initialState as bookings
} from './booking-store'

import {
  reducer as authReducer,
  initialState as user
} from './auth-store'

import {
  reducer as themeReducer,
  initialState as theme
} from './theme-store'

const initialState = {
  events,
  bookings,
  user,
  theme
}

function reducer ({ events, bookings, user, theme }, action) {
  return {
    events: eventsReducer(events, action),
    bookings: bookingsReducer(bookings, action),
    user: authReducer(user, action),
    theme: themeReducer(theme, action)
  }
}

export default {
  initialState,
  reducer
}
