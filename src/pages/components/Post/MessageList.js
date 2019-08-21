import React from 'react'
import gql from 'graphql-tag'
import { useMessagesContainer } from '../../containers/messages-container'
import { useInfiniteScroll } from '../../hooks'
import { formatDistanceToNow } from 'date-fns'

import { Avatar, Typography, Paper } from '@material-ui/core'

const query = gql`
  query($id: ID!, $page: PageInput) {
    post(id: $id) {
      comments(page: $page) {
        pageInfo {
          cursor
        }
        edges {
          _id
          owner {
            username
          }
          comment
          createdAt
          updatedAt
        }
      }
    }
  }
`

const subscription = gql`
  subscription($post: ID!) {
    newComment(post: $post) {
      _id
      owner {
        username
      }
      comment
      createdAt
      updatedAt
    }
  }
`

export function MessageList ({ id }) {
  const [comments, error, loading, fetchMore] = useMessagesContainer(
    id,
    query,
    subscription
  )

  useInfiniteScroll(fetchMore)

  if (loading) return <div>loading</div>

  if (error) return <div>{error.message}</div>

  return comments.map(comment => (
    <Paper
      key={comment._id}
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
        <Avatar>{comment.owner.username.charAt(0)}</Avatar>
        <div style={{ flexDirection: 'column' }}>
          <Typography
            variant="h6"
            style={{
              flexGrow: 1,
              alignItems: 'center',
              marginLeft: 10
            }}
          >
            {comment.comment}
          </Typography>
        </div>
        <Typography
          variant="h7"
          style={{ position: 'absolute', bottom: -15, right: -30 }}
        >
          {formatDistanceToNow(new Date(comment.createdAt))} ago
        </Typography>
      </div>
    </Paper>
  ))
}
