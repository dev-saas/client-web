import { useState } from 'react'
import firebase from 'firebase'

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.envREACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
})

firebase.auth().languageCode = 'pt-BR'

export function useFirebase () {
  const [loading, setLoading] = useState(false)

  async function register (email, password) {
    try {
      setLoading(true)
      const {
        user
      } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
      return user.ra
    } catch (err) {
      console.log(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  async function login (email, password) {
    try {
      setLoading(true)
      const { user } = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
      return user.ra
    } catch (err) {
      console.log(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const forgotPassword = email =>
    firebase.auth().sendPasswordResetEmail(email)

  const resetPassword = (code, password) =>
    firebase.auth().confirmPasswordReset(code, password)

  return {
    register,
    login,
    loading,
    forgotPassword,
    resetPassword
  }
}
