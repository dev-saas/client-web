import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const query = gql`
  query($username: Username!) {
    user(username: $username) {
      uid
      username
    }
  }
`

export function Profile ({ username }) {
  const { data, error, loading } = useQuery(query, {
    variables: { username }
  })

  if (loading) return <div>loading</div>

  if (error) return <div>{error.message}</div>

  if (!data.user) return <div>User not found</div>

  let { user } = data

  return <>{user.username}</>
}
