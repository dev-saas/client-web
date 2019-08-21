import React from 'react'
import gql from 'graphql-tag'
import { usePostsContainer } from '../../containers/posts-container'
import { useInfiniteScroll } from '../../hooks'
import { formatDistanceToNow } from 'date-fns'

const query = gql`
  query($username: Username!, $page: PageInput) {
    user(username: $username) {
      posts(page: $page) {
        pageInfo {
          cursor
        }
        edges {
          _id
          message
          createdAt
          updatedAt
        }
      }
    }
  }
`

export function PostList ({ username }) {
  const [posts, error, loading, fetchMore] = usePostsContainer(username, query)

  useInfiniteScroll(fetchMore)

  if (loading) return <div>loading</div>

  if (error) return <div>{error.message}</div>

  return (
    <div>
      {posts.map(post => (
        <div key={post._id} style={{ marginBottom: 70 }}>
          <a href={`/p/${post._id}/`}>
            ({formatDistanceToNow(new Date(post.createdAt))} ago) {post.message}
          </a>
        </div>
      ))}
      <button onClick={fetchMore}>load more</button>
    </div>
  )
}
