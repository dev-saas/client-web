import { useContext } from 'react'
import { NotificationContext } from '../context'

export default function useGraphQL() {
  const {
    sendError,
    sendNotification,
    sendWarning,
    warnings,
    errors,
    notifications
  } = useContext(NotificationContext)

  return {
    sendError,
    sendNotification,
    sendWarning,
    warnings,
    errors,
    notifications
  }
}
