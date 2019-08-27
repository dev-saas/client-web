import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useUsersContainer } from '../../pages/containers/users-container'
import { Input } from '@material-ui/core'

const query = gql`
  query($username: Username!, $page: PageInput) {
    users(username: $username, page: $page) {
      cursor
      hasNextPage
      nodes {
        uid
        username
      }
    }
  }
`

export function UserSearch ({ classes }) {
  const [username, setUsername] = useState('')
  const [users, error, loading] = useUsersContainer(username, query)

  return (
    <div className={classes.root}>
      <Input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="search"
        className={classes.input}
        inputProps={{ 'aria-label': 'search' }}
      />
      {/* {users.map(edge => (
        <div key={edge._id} style={{ marginBottom: 30, fontSize: 30 }}>
          <a href={`/${edge.username}`}>{edge.username}</a>
        </div>
      ))} */}
    </div>
  )
}
