import { useNotification, useGlobalState } from '../'
import { useQuery, useMutation } from '../graphql'
import { useTranslation } from 'react-i18next'
import { types } from '../../reducers/auth-reducer'

const loginQuery = `
query ($email: Email!, $password: String!) {
  token: login(email: $email, password: $password)
}
`

const createMutation = `
mutation ($email: Email!, $password: String!) {
  createUser(email: $email, password: $password) {
    _id
    email
  }
}
`

export default function useAuth () {
  const [{ user }, dispatch] = useGlobalState()
  const [query, loadingLogin] = useQuery(loginQuery)
  const [mutate, loadingRegister] = useMutation(createMutation)
  const { sendNotification, sendError } = useNotification()
  const { t } = useTranslation()

  return {
    login: async (email, password) => {
      try {
        const { token } = await query({ email, password })
        dispatch({
          type: types.LOGIN,
          payload: token
        })
        return true
      } catch (err) {
        sendError('Verifique suas credenciais')
      }
      return false
    },
    register: async (email, password) => {
      try {
        const { createUser } = await mutate({ email, password })
        sendNotification(
          createUser.email + ' ' + t('auth:registered successfully')
        )
        return true
      } catch (err) {
        console.log(err)
      }
      return false
    },
    logout: () => {
      dispatch({
        type: types.LOGOUT
      })
    },
    user,
    loadingLogin,
    loadingRegister
  }
}
