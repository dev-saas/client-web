import useList from '../../hooks/useList'

export const initialState = []

export const types = {
  SET_BOOKINGS: 'SET_BOOKINGS',
  NEW_BOOKING: 'NEW_BOOKING',
  REMOVE_BOOKING: 'REMOVE_BOOKING'
}

export const reducer = (bookings, action) => {
  const { set, remove } = useList(bookings)
  switch (action.type) {
    case types.SET_BOOKINGS:
      return set(action.payload)

    case types.NEW_BOOKING:
      return bookings

    case types.REMOVE_BOOKING:
      return remove(action.payload)

    default:
      return bookings
  }
}
