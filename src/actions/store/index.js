import { authReducer, user } from './auth-store'
import { notificationReducer, notifications } from './notification-store'
import { themeReducer, theme } from './theme-store'

export const initialState = {
  user,
  theme,
  notifications
}

export const reducer = ({ user, theme, notifications }, action) => ({
  user: authReducer(user, action),
  theme: themeReducer(theme, action),
  notifications: notificationReducer(notifications, action)
})
