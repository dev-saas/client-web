import { useEffect } from 'react'
import { useClient } from '../'

export default function useSubscription (query, next) {
  const client = useClient()

  useEffect(() => {
    const sub = client.subscribe({ query }).subscribe({
      next,
      error (err) {
        console.log(err)
        // sendError(err.message)
      }
    })

    return () => sub.unsubscribe()
  }, [])
}
