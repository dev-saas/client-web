import { useQuery } from '@apollo/react-hooks'
import { usePagination } from '../hooks'

export function usePostsContainer (username, query) {
  const { data, error, loading, fetchMore } = useQuery(query, {
    variables: { username }
  })

  const [posts, updatePosts, cursor] = usePagination(
    data && data.user && data.user.posts
  )

  function FetchMore () {
    fetchMore({
      variables: { page: { cursor }, username },
      updateQuery: (_, { fetchMoreResult }) =>
        updatePosts(fetchMoreResult.user.posts)
    })
  }

  return [posts, error, loading, FetchMore]
}
