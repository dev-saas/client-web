import { useState } from 'react'
import { useClient } from './'
import gql from 'graphql-tag'

export default function useMutation(mutation) {
  const [loading, setLoading] = useState(false)
  const client = useClient()

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

  return [mutate, loading]
}
