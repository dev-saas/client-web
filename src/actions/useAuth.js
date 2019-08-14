import { useGlobalState } from '../reducer'
import { useFirebase } from '../services'
import { useRegisterMutation } from './graphql/mutation'
import { types } from './store/auth-store'

export default function useAuth () {
  const [{ user }, dispatch] = useGlobalState()

  const [mutate, loadingRegister] = useRegisterMutation()

  const {
    login: loginFire,
    loading: loadingFire,
    register: registerFire,
    forgotPassword
  } = useFirebase()

  const login = async (email, password) => {
    const token = await loginFire(email, password)
    dispatch({
      type: types.LOGIN,
      payload: token
    })
  }

  const register = async (email, password) => {
    const token = await registerFire(email, password)
    await mutate(token)
    dispatch({
      type: types.REGISTER,
      payload: token
    })
  }

  const logout = () => {
    dispatch({
      type: types.LOGOUT
    })
  }

  const sendResetEmail = email => forgotPassword(email)

  return {
    login,
    register,
    loading: loadingFire || loadingRegister,
    sendResetEmail,
    user,
    logout
  }
}
