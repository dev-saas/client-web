import useList from '../../hooks/useList'

export const initialEvents = { events: [] }

export const eventsReducer = (state, action) => {
  const { update, add, addArray, get } = useList(state)
  switch (action.type) {
    case 'SET_EVENTS':
      return addArray(action.payload)
    case 'NEW_EVENT':
      return get(action.payload._id) ? state : add(action.payload)
    case 'UPDATE_EVENT':
      return get(action.payload._id) ? update(action.payload) : state
    default:
      return state
  }
}
