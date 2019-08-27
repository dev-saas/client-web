import { useQuery } from '@apollo/react-hooks'
import { usePagination } from '../hooks'

export function usePostsContainer (username, query) {
  const { data, error, loading, fetchMore } = useQuery(query, {
    variables: { username }
  })

  const [posts, updatePosts, cursor, hasNextPage] = usePagination(
    data && data.user && data.user.posts
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
