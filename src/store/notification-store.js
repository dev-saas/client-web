import { ArrayHelper } from './helper/array-utils'
import { useGlobalState } from '../reducer'

export const notifications = []

const types = {
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
  NEW_NOTIFICATION: 'NEW_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  ADD_MANY_NOTIFICATION: 'ADD_MANY_NOTIFICATION'
}

export function notificationReducer (notifications, action) {
  const Notifications = ArrayHelper(notifications)
  switch (action.type) {
    case types.SET_NOTIFICATIONS:
      return action.payload

    case types.NEW_NOTIFICATION:
      return Notifications.add(action.payload)

    case types.REMOVE_NOTIFICATION:
      return Notifications.removeById(action.payload)

    case types.ADD_MANY_NOTIFICATION:
      return Notifications.addMany(action.payload)

    default:
      return notifications
  }
}

export function useNotificationStore () {
  const [{ notifications }, dispatch] = useGlobalState()

  return {
    notifications,

    newNotification: notification =>
      dispatch({
        type: types.NEW_NOTIFICATION,
        payload: notification
      }),

    removeNotification: id =>
      dispatch({
        type: types.REMOVE_NOTIFICATION,
        payload: id
      }),

    setNotifications: notifications =>
      dispatch({
        type: types.SET_NOTIFICATIONS,
        payload: notifications
      }),

    addNotifications: notifications =>
      dispatch({
        type: types.ADD_MANY_NOTIFICATION,
        payload: notifications
      })
  }
}
