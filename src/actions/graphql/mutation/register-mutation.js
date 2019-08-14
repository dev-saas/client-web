import gql from 'graphql-tag'
import { useMutation } from './'

const createMutation = gql`
  mutation($token: String!) {
    register(token: $token)
  }
`

export default function useRegister () {
  const [mutate, loading] = useMutation(createMutation)

  const register = async token => {
    try {
      await mutate({ token })
    } catch (err) {
      throw err
    }
  }

  return [register, loading]
}
