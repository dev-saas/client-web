import { ArrayHelper } from '../helper/array-utils'

export const types = {
  SET_EVENTS: 'SET_EVENTS',
  NEW_EVENT: 'NEW_EVENT',
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_MANY_EVENTS: 'ADD_MANY_EVENTS'
}

export const initialState = []

export const reducer = (events, action) => {
  const Events = ArrayHelper(events)
  switch (action.type) {
    case types.SET_EVENTS:
      return action.payload

    case types.NEW_EVENT:
      return Events.add(action.payload)

    case types.UPDATE_EVENT:
      return Events.update(action.payload)

    case types.ADD_MANY_EVENTS:
      return Events.addMany(action.payload)

    default:
      return events
  }
}
