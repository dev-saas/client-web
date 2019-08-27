import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { PostList } from '../Post/PostList'

const query = gql`
  query {
    me {
      uid
      username
    }
  }
`

export function Me () {
  const { data, error, loading } = useQuery(query)

  if (loading) return <div>loading</div>

  if (error) return <div>{error.message}</div>

  if (!data.me) return <div>User not found</div>

  let { me } = data

  return <div>{me.username}<PostList username={me.username} owner={true}/></div>
}
