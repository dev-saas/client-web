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
    try {
      const user = decode(token)
      setUserId(user.id)
      setRole(user.role)
      setEmail(user.email)
    } catch (err) {
      console.log(err)
      logout()
    }
  }, [token])

  const login = token => {
    setToken(token)
    localStorage.setItem('token', token)
  }

  const logout = () => {
    setToken(null)
    setUserId(null)
    setRole(null)
    setEmail(null)
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
