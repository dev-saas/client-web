import React from 'react'
import gql from 'graphql-tag'
import { usePostsContainer } from '../../containers/posts-container'
import { useInfiniteScroll } from '../../hooks'
import { formatDistanceToNow } from 'date-fns'

import { Link, Typography, Paper } from '@material-ui/core'

const query = gql`
  query($username: Username!, $page: PageInput) {
    user(username: $username) {
      posts(page: $page) {
        cursor
        hasNextPage
        nodes {
          _id
          message
          createdAt
          updatedAt
        }
      }
    }
  }
`

export function PostList ({ username, owner = false }) {
  const [posts, error, loading, fetchMore] = usePostsContainer(username, query)

  useInfiniteScroll(fetchMore)

  if (loading) return <div>loading</div>

  if (error) return <div>{error.message}</div>

  return posts.map(post => (
    <Paper
      key={post._id}
      style={{
        marginBottom: 15,
        // paddingBottom: 30,
        // paddingTop: 30,
        // paddingLeft: 15,
        // paddingRight: 30,
        flexGrow: 1,
        padding: 50
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', position: 'relative' }}>
        <div style={{ flexDirection: 'column' }}>
          <Typography
            variant="h6"
            style={{
              flexGrow: 1,
              alignItems: 'center',
              marginLeft: 10
            }}
          >
            <Link href={`/p/${post._id}`}>{post.message}</Link>
          </Typography>
        </div>
        <Typography
          variant="h7"
          style={{ position: 'absolute', bottom: -30, right: -30 }}
        >
          {formatDistanceToNow(new Date(post.createdAt))} ago
        </Typography>
        {owner && 'edit'}
      </div>
    </Paper>
  ))
}
