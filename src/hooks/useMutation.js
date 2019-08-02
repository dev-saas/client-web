import { useContext } from 'react'
import useLoading from './useLoading'
import { ApolloContext } from 'react-apollo'
import gql from 'graphql-tag'

export default function useMutation(mutation) {
  const { loading, setLoading } = useLoading()
  const { client } = useContext(ApolloContext)

  const mutate = async variables => {
    try {
      setLoading(true)
      const { data } = await client.mutate({
        mutation: gql(mutation),
        variables
      })
      return data
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return [loading, mutate]
}
