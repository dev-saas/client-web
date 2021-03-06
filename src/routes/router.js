import React from 'react'
import { Route, Redirect, Switch, BrowserRouter } from 'react-router-dom'
import { useAuthStore } from '../store'
import { AuthPage, MePage, PostPage, ProfilePage } from '../pages'
import { GAListener } from './GAListener'

export function Router () {
  const {
    user: { logged }
  } = useAuthStore()

  return (
    <BrowserRouter>
      <GAListener>
        <Switch>
          {logged && <Redirect from="/auth" to="/" exact />}
          {!logged && <Route path="/auth" component={AuthPage} />}
          <Route path="/p/:id" component={PostPage} />
          <Route path="/feed" component={MePage} />
          <Route path="/:username" component={ProfilePage} />
          {logged && <Route path="/" component={MePage} />}
          {!logged && <Redirect to="/feed" exact />}
        </Switch>
      </GAListener>
    </BrowserRouter>
  )
}
