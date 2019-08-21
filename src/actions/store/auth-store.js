import decode from 'jwt-decode'
import { useGlobalState } from '../../reducer'

export const user = getUser(localStorage.getItem('token'))

export const types = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  REGISTER: 'REGISTER'
}

export function authReducer (user, action) {
  switch (action.type) {
    case types.LOGIN:
    case types.REGISTER:
      const token = action.payload
      localStorage.setItem('token', token)
      return getUser(token)
    case types.LOGOUT:
      localStorage.removeItem('token')
      return getUser(null)

    default:
      return user
  }
}

export function useAuthStore () {
  const [{ user }, dispatch] = useGlobalState()

  return {
    user,

    login: token =>
      dispatch({
        type: types.LOGIN,
        payload: token
      }),

    register: token =>
      dispatch({
        type: types.REGISTER,
        payload: token
      }),

    logout: () =>
      dispatch({
        type: types.LOGOUT
      })
  }
}

function getUser (token) {
  try {
    // eslint-disable-next-line camelcase
    const { user_id, email } = decode(token)
    return { uid: user_id, email, logged: true }
  } catch (err) {
    return {
      uid: null,
      email: null,
      logged: false
    }
  }
}
