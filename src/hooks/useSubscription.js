import { useContext, useEffect } from 'react'
import { ApolloContext } from 'react-apollo'
import gql from 'graphql-tag'

export default function useSubscription(subscription, next) {
  const { client } = useContext(ApolloContext)
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
