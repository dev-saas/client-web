import useList from '../../hooks/useList'

export const initialBookings = { bookings: [] }

export const bookingsReducer = (state, action) => {
  const { add, addArray, remove } = useList(state)
  switch (action.type) {
    case 'SET_BOOKINGS':
      return addArray(action.payload)
    case 'NEW_BOOKING':
      return add(action.payload)
    case 'REMOVE_BOOKING':
      return remove(action.payload._id)
    default:
      return state
  }
}
