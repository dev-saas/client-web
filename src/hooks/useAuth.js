import { useContext } from 'react'
import { AuthContext } from '../context'
import { useGraphQL, useNotification } from './'
import { useTranslation } from 'react-i18next'

const loginQuery = `
query ($email: Email!, $password: String!) {
  token: login(email: $email, password: $password) {
    token
  }
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

export default function useAuth() {
  const { login, logout, userId, role, email } = useContext(AuthContext)
  const { query, mutate } = useGraphQL()
  const { sendNotification } = useNotification()
  const { t } = useTranslation()

  return {
    login: async (email, password) => {
      try {
        const { token } = await query({
          query: loginQuery,
          variables: { email, password }
        })
        login(token.token)
        return true
      } catch (err) {
        console.log(err)
      }
      return false
    },
    register: async (email, password) => {
      try {
        const { createUser } = await mutate({
          mutation: createMutation,
          variables: { email, password }
        })
        sendNotification(
          createUser.email + ' ' + t('auth:registered successfully')
        )
        return true
      } catch (err) {
        console.log(err)
      }
      return false
    },
    logout,
    userId,
    role,
    email
  }
}
