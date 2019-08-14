import { useContext } from 'react'
import { ApolloContext } from 'react-apollo'

export default function useClient () {
  const { client } = useContext(ApolloContext)
  return client
}
