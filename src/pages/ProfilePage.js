import React from 'react'
import { Profile } from './components/Profile/Profile'
import { PostList } from './components/Post/PostList'

export function ProfilePage ({ match }) {
  const { username } = match.params
  return (
    <>
      <Profile username={username} />
      <PostList username={username} />
    </>
  )
}
