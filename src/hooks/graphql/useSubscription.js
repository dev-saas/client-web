import { useEffect } from 'react'
import { useClient } from './'
import gql from 'graphql-tag'

export default function useSubscription(subscription, next) {
  const client = useClient()

  useEffect(() => {
    const sub = client
      .subscribe({ query: gql(subscription) })
      .subscribe({
        next,
        error(err) {
          console.log(err)
        }
      })

    return () => {
      sub.unsubscribe()
    }
  }, [])
}
