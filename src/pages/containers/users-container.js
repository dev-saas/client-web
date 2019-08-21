import { useEffect } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { usePagination } from '../hooks'

export function useUsersContainer (username, query) {
  const [execute, { data, error, loading, fetchMore }] = useLazyQuery(query)

  const [users, updateUsers, cursor] = usePagination(data && data.users)

  useEffect(
    () => {
      if (username.length < 1) return
      execute({
        variables: { username }
      })
    },
    [username]
  )

  function FetchMore () {
    fetchMore({
      variables: { page: { cursor }, username },
      updateQuery: (_, { fetchMoreResult }) => updateUsers(fetchMoreResult.users)
    })
  }

  return [users, error, loading, FetchMore]
}
