import { authReducer, user } from './auth-store'
import { notificationReducer, notifications } from './notification-store'
import { themeReducer, theme } from './theme-store'

const initialState = {
  user,
  theme,
  notifications
}

const reducer = ({ user, theme, notifications }, action) => ({
  user: authReducer(user, action),
  theme: themeReducer(theme, action),
  notifications: notificationReducer(notifications, action)
})

const store = { initialState, reducer }

export { store }
export { useAuthStore } from './auth-store'
export { useNotificationStore } from './notification-store'
export { useThemeStore } from './theme-store'
