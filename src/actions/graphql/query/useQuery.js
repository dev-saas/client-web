import { useState } from 'react'
import { useClient, useError } from '../'

export default function useQuery (query) {
  const [loading, setLoading] = useState(false)
  const client = useClient()
  const checkErrors = useError()

  const Query = async variables => {
    try {
      setLoading(true)
      const { data, errors } = await client.query({
        query,
        variables
      })
      checkErrors(errors)
      return data
    } catch (err) {
      console.log(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return [Query, loading]
}
