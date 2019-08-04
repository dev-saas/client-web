import { useState } from 'react'
import firebase from 'firebase'
import { useNotification } from '../'

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.envREACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
})

firebase.auth().languageCode = 'pt-BR'

export default function useFirebase () {
  const [loadingLogin, setLoadingLogin] = useState(false)
  const [loadingRegister, setLoadingRegister] = useState(false)
  const { sendError } = useNotification()

  const register = async (email, password) => {
    try {
      setLoadingRegister(true)
      const {
        user
      } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
      return user.ra
    } catch (err) {
      sendError(err.message)
    } finally {
      setLoadingRegister(false)
    }
  }

  const login = async (email, password) => {
    try {
      setLoadingLogin(true)
      const { user } = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)

      return user.ra
    } catch (err) {
      sendError(err.message)
    } finally {
      setLoadingLogin(false)
    }
  }

  return { register, login, loadingLogin, loadingRegister }
}
