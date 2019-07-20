import { useContext } from 'react'
import { NotificationContext } from '../context'

export default function useGraphQL() {
  const { sendError, sendNotification, sendWarning } = useContext(
    NotificationContext
  )

  return {
    sendError,
    sendNotification,
    sendWarning
  }
}
