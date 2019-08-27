import React from 'react'
import { MessageList } from './components/Post/MessageList'
import { Post } from './components/Post/Post'
import { NewMessage } from './components/Post/NewMessage'
import { useAuthStore } from '../store'

export function PostPage ({ match }) {
  const { id } = match.params
  const {
    user: {
      logged
    }
  } = useAuthStore()
  return (
    <>
      <Post id={id} />
      {logged && <NewMessage id={id} />}
      <MessageList id={id} />
    </>
  )
}
