import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import { useFirebase } from '../../services'
import { useAuthStore } from '../../store'
import gql from 'graphql-tag'
import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

const REGISTER = gql`
mutation($token: String!, $username: Username!) {
    register(token: $token, username: $username)
  }
`

const CHECK_USERNAME = gql`
query($username: Username!) {
    users(username: $username) {
      cursor
    }
  }
`

export function useAuth () {
  const { enqueueSnackbar } = useSnackbar()
  const { login, register } = useAuthStore()
  const { t } = useTranslation()
  const [checkUsername, { called, loading, data }] = useLazyQuery(CHECK_USERNAME)
  const [mutate] = useMutation(REGISTER)
  const {
    login: loginFire,
    loading: loadingFire,
    register: registerFire,
    forgotPassword
  } = useFirebase()
  const [aux, setAux] = useState()

  useEffect(() => {
    if ((called && loading) || !data) return
    const { cursor } = data.users
    if (cursor === '') Register()
    else enqueueSnackbar(t(`auth:User already exists`), { variant: 'error' })
  }, [data])

  const Register = async () => {
    const { email, password, username } = aux
    try {
      const token = await registerFire(email, password)
      await mutate({ variables: { token, username } })
      register(token)
    } catch (err) {
      enqueueSnackbar(t(`auth:${err.code}`), { variant: 'error' })
    }
  }

  return {
    login: async (email, password) => {
      try {
        const token = await loginFire(email, password)
        login(token)
      } catch (err) {
        enqueueSnackbar(t(`auth:${err.code}`), { variant: 'error' })
      }
    },

    register: async (email, username, password) => {
      setAux({ email, username, password })
      await checkUsername({ variables: { username } })
    },

    sendResetEmail: email => forgotPassword(email),

    loading: {
      loadingFire,
      loadingRegister: false,
      loadingCheck: called && loading
    }

  }
}
