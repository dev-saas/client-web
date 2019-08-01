import { useContext } from 'react'
import useLoading from './useLoading'
import { ApolloContext } from 'react-apollo'
import gql from 'graphql-tag'

export default function useQuery(query) {
  const { loading, setLoading } = useLoading()
  const { client } = useContext(ApolloContext)

  const Query = async variables => {
    try {
      setLoading(true)
      const { data } = await client.query({
        query: gql(query),
        variables
      })
      return data
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return [loading, Query]
}
