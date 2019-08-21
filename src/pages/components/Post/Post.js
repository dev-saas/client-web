import React, { useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import { formatDistanceToNow } from 'date-fns'

const query = gql`
  query($id: ID!) {
    post(id: $id) {
      message
      createdAt
      owner {
        username
      }
    }
  }
`

const subscription = gql`
  subscription($post: ID!) {
    updatedPost(post: $post) {
      message
      createdAt
    }
  }
`

export function Post ({ id }) {
  const { data, error, loading } = useQuery(query, { variables: { id } })
  const [upost, setPost] = useState({ message: null })
  const response = useSubscription(subscription, { variables: { post: id } })

  useEffect(
    () => {
      let { data: d, loading, error } = response
      if (error || loading || !d) return
      setPost(d.updatedPost)
    },
    [response]
  )

  if (loading) return <div>loading</div>

  if (error) return <div>{error.message}</div>

  if (!data.post) return <div>Post not found</div>

  let { post } = data
  return (
    <>
      {post.owner.username}({formatDistanceToNow(new Date(post.createdAt))} ago):{' '}
      {upost.message || post.message}
    </>
  )
}
