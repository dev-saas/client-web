import React, { useState, useEffect } from 'react'

import { AuthContext } from '../context'
import decode from 'jwt-decode'

const AuthProvider = props => {
  const [token, setToken] = useState(localStorage.getItem('token', null))
  const [userId, setUserId] = useState()
  const [email, setEmail] = useState()
  const [role, setRole] = useState()
  const [recaptcha, setRecaptcha] = useState()

  useEffect(() => {
    if (!token) return
    const user = decode(token)
    setUserId(user.id)
    setRole(user.role)
    setEmail(user.email)
  }, [token])

  const login = token => {
    setToken(token)
    localStorage.setItem('token', token)
    localStorage.setItem('userId', userId)
    localStorage.setItem('role', role)
  }

  const logout = () => {
    setToken(null)
    setUserId(null)
    setRole(null)
    localStorage.clear()
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        role,
        login,
        logout,
        recaptcha,
        setRecaptcha,
        email
      }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
