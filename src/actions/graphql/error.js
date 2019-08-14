import { useAuthCreator } from '../../actions/store/auth-store'

const codes = {
  UNAUTHENTICATED: 'UNAUTHENTICATED'
}

export function useError () {
  const { logout } = useAuthCreator()

  function checkErrors (errors) {
    if (errors) {
      errors.map(({ message }) => {
        switch (message) {
          case codes.UNAUTHENTICATED:
            return logout()
          default:
            throw new Error(message)
        }
      })
      return false
    }
  }

  return checkErrors
}
