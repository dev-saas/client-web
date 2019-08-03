import decode from 'jwt-decode'

const getUser = token => {
  try {
    return { ...decode(token), logged: true }
  } catch (err) {
    return {
      id: null,
      role: null,
      email: null,
      logged: false
    }
  }
}

export const initialState = getUser(localStorage.getItem('token'))

export const types = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
}

export const reducer = (user, action) => {
  switch (action.type) {
    case types.LOGIN:
      const token = action.payload
      localStorage.setItem('token', token)
      return getUser(token)
    case types.LOGOUT:
      localStorage.removeItem('token')
      return initialState

    default:
      return user
  }
}
