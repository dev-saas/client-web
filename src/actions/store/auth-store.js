import decode from 'jwt-decode'
import { useGlobalState } from '../../reducer'
export const initialState = getUser(localStorage.getItem('token'))

export const types = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  REGISTER: 'REGISTER'
}

export function reducer (user, action) {
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

export function useAuthCreator () {
  const [state, dispatch] = useGlobalState()

  function login (token) {
    dispatch({
      type: types.LOGIN,
      payload: token
    })
  }

  function register (token) {
    dispatch({
      type: types.REGISTER,
      payload: token
    })
  }

  function logout () {
    dispatch({
      type: types.LOGOUT
    })
  }

  return { login, register, logout }
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
