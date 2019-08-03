import { useState } from 'react'
import { useClient } from './'
import gql from 'graphql-tag'

export default function useQuery(query) {
  const [loading, setLoading] = useState(false)
  const client = useClient()

  const Query = async variables => {
    try {
      setLoading(true)
      const { data } = await client.query({
        query: gql(query),
        variables
      })
      return data
    } catch (err) {
      console.log('useQuery', err)
    } finally {
      setLoading(false)
    }
  }

  return [Query, loading]
}
