import decode from 'jwt-decode'

const getUser = token => {
  try {
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

export const initialState = getUser(localStorage.getItem('token'))

export const types = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  REGISTER: 'REGISTER'
}

export const reducer = (user, action) => {
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
