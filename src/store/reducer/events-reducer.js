import useList from '../../hooks/useList'

export const types = {
  SET_EVENTS: 'SET_EVENTS',
  NEW_EVENT: 'NEW_EVENT',
  UPDATE_EVENT: 'UPDATE_EVENT'
}

export const initialState = []

export const reducer = (events, action) => {
  const { update, add, set, get } = useList(events)
  switch (action.type) {
    case types.SET_EVENTS:
      return set(action.payload)

    case types.NEW_EVENT:
      return get(action.payload._id) ? events : add(action.payload)

    case types.UPDATE_EVENT:
      return get(action.payload._id) ? update(action.payload) : events

    default:
      return events
  }
}
