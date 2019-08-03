import { useContext } from 'react'
import { ApolloContext } from 'react-apollo'

export default function() {
  const { client } = useContext(ApolloContext)

  return client
}
