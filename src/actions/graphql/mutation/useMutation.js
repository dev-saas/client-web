import { useState } from 'react'
import { useClient, useError } from '../'

export default function useMutation (mutation) {
  const [loading, setLoading] = useState(false)
  const client = useClient()
  const checkErrors = useError()

  async function mutate (variables) {
    try {
      setLoading(true)
      const { data, errors } = await client.mutate({
        mutation,
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

  return [mutate, loading]
}
