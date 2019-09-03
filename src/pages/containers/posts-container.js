import { useEffect } from 'react'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import { usePagination } from '../hooks'

export function usePostsContainer (username, query, subscription) {
  const { data, error, loading, fetchMore } = useQuery(query, {
    variables: { username }
  })

  const [posts, updatePosts, cursor, hasNextPage, addOne] = usePagination(
    data && data.user && data.user.posts
  )

  const response = useSubscription(subscription, { variables: { uid: data && data.user && data.user.uid } })

  useEffect(
    () => {
      let { data: d, loading, error } = response
      if (error || loading || !d) return
      addOne(d.newPost)
    },
    [response]
  )

  function FetchMore () {
    if (!hasNextPage) return
    fetchMore({
      variables: { page: { cursor }, username },
      updateQuery: (_, { fetchMoreResult }) =>
        updatePosts(fetchMoreResult.user.posts)
    })
  }

  return [posts, error, loading, FetchMore]
}
