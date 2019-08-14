import React from 'react'
import { Route, Redirect, Switch, HashRouter } from 'react-router-dom'
import { useAuth } from '../actions'
import { AuthPage, BookingsPage, EventsPage } from '../pages'
import GAListener from './GAListener'

export default function Router () {
  const {
    user: { logged }
  } = useAuth()

  return (
    <HashRouter>
      <GAListener>
        <Switch>
          {logged && <Redirect from="/" to="/events" exact />}
          {logged && <Redirect from="/auth" to="/events" exact />}
          {!logged && <Route path="/auth" component={AuthPage} />}
          <Route path="/events" component={EventsPage} />
          {logged && <Route path="/bookings" component={BookingsPage} />}
          {!logged && <Redirect to="/auth" exact />}
        </Switch>
      </GAListener>
    </HashRouter>
  )
}
