import { useEffect } from 'react'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import { usePagination } from '../hooks'

export function useMessagesContainer (id, query, subscription) {
  const { data, error, loading, fetchMore } = useQuery(query, {
    variables: { id }
  })

  const [messages, updateMessages, cursor, hasNextPage, addOne] = usePagination(
    data && data.post && data.post.comments
  )

  const response = useSubscription(subscription, { variables: { post: id } })

  useEffect(
    () => {
      let { data: d, loading, error } = response
      if (error || loading || !d) return
      addOne(d.newComment)
    },
    [response]
  )

  function FetchMore () {
    if (!hasNextPage) return
    fetchMore({
      variables: { page: { cursor }, id },
      updateQuery: (_, { fetchMoreResult }) =>
        updateMessages(fetchMoreResult.post.comments)
    })
  }

  return [messages, error, loading, FetchMore]
}
