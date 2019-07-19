import React from 'react'

export default React.createContext({
  token: null,
  userId: null,
  role: null,
  recaptcha: null,
  setRecaptcha: recaptcha => {},
  login: (token, userId, tokenExpiration) => {},
  logout: () => {}
})
