import { useFirebase } from '../services'
import { useRegisterMutation } from './graphql/mutation'
import { useAuthStore } from './store/auth-store'

export default function useAuth () {
  const { user, login, logout, register } = useAuthStore()

  const [mutate, loadingRegister] = useRegisterMutation()

  const {
    login: loginFire,
    loading: loadingFire,
    register: registerFire,
    forgotPassword
  } = useFirebase()

  return {
    login: async (email, password) => {
      const token = await loginFire(email, password)
      login(token)
    },

    register: async (email, password) => {
      const token = await registerFire(email, password)
      await mutate(token)
      register(token)
    },

    sendResetEmail: email => forgotPassword(email),

    user,

    loading: { loadingFire, loadingRegister },

    logout
  }
}
