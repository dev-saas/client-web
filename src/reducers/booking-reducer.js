import { ArrayHelper } from '../helper/array-utils'

export const initialState = []

export const types = {
  SET_BOOKINGS: 'SET_BOOKINGS',
  NEW_BOOKING: 'NEW_BOOKING',
  REMOVE_BOOKING: 'REMOVE_BOOKING',
  ADD_MANY_BOOKING: 'ADD_MANY_BOOKING'
}

export const reducer = (bookings, action) => {
  const Bookings = ArrayHelper(bookings)
  switch (action.type) {
    case types.SET_BOOKINGS:
      return action.payload

    case types.NEW_BOOKING:
      return bookings

    case types.REMOVE_BOOKING:
      return Bookings.removeById(action.payload)

    case types.ADD_MANY_BOOKING:
      return Bookings.addMany(action.payload)

    default:
      return bookings
  }
}
