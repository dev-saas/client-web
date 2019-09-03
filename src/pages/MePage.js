import React from 'react'
import { Me, NewPost } from './components/Profile'
import { useAuthStore } from '../store'

export function MePage () {
  const {
    user: {
      logged
    }
  } = useAuthStore()
  return (
    <>
      {logged && <NewPost/>}
      <Me />
    </>
  )
}
