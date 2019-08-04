import { useNotification, useGlobalState } from '../'
import { useMutation } from '../graphql'
import { types } from '../../reducers/auth-reducer'
import { useFirebase } from './'

const createMutation = `
mutation ($token: String!) {
  register(token: $token)
}
`

export default function useAuth () {
  const [{ user }, dispatch] = useGlobalState()
  const [mutate, loadingRegisterA] = useMutation(createMutation)
  const { sendError } = useNotification()
  const {
    login: loginFire,
    loadingLogin,
    register: registerFire,
    loadingRegister
  } = useFirebase()

  const login = async (email, password) => {
    try {
      const token = await loginFire(email, password)

      dispatch({
        type: types.LOGIN,
        payload: token
      })

      return true
    } catch (err) {
      sendError('Verifique suas credenciais')
    }
    return false
  }

  const register = async (email, password) => {
    try {
      const token = await registerFire(email, password)
      await mutate({ token })

      dispatch({
        type: types.REGISTER,
        payload: token
      })
    } catch (err) {
      console.log(err)
      sendError(err.message)
    }
    return false
  }

  const logout = () => {
    dispatch({
      type: types.LOGOUT
    })
  }

  return {
    login,
    register,
    logout,
    user,
    loadingLogin,
    loadingRegister: loadingRegister || loadingRegisterA
  }
}
