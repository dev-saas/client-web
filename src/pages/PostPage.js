import React from 'react'
import { MessageList } from './components/Post/MessageList'
import { Post } from './components/Post/Post'

export function PostPage ({ match }) {
  const { id } = match.params

  return (
    <>
      <Post id={id} />
      {/* <NewMessage id={id} /> */}
      <MessageList id={id} />
    </>
  )
}
