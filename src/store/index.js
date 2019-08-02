import React, { createContext, useReducer } from 'react'

import {
  reducer as eventsReducer,
  initialState as events
} from './reducer/events-reducer'

import {
  reducer as bookingsReducer,
  initialState as bookings
} from './reducer/booking-reducer'

const initialState = {
  events,
  bookings
}

const mainReducer = ({ events, bookings }, action) => {
  return {
    events: eventsReducer(events, action),
    bookings: bookingsReducer(bookings, action)
  }
}

export const StateContext = createContext()

export const StateProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(mainReducer, initialState)}>
    {children}
  </StateContext.Provider>
)
