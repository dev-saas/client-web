import React from 'react'
import { useAuth } from './hooks/api'
import { Route, Redirect, Switch } from 'react-router-dom'
import { AuthPage, BookingsPage, EventsPage, RoomPage } from './pages'
const Routes = props => {
  const {
    user: { logged }
  } = useAuth()
  return (
    <Switch>
      {logged && <Redirect from='/' to='/events' exact />}
      {logged && <Redirect from='/auth' to='/events' exact />}
      {!logged && <Route path='/auth' component={AuthPage} />}
      <Route path='/events' component={EventsPage} />
      {logged && <Route path='/bookings' component={BookingsPage} />}
      {logged && <Route path='/bat' component={RoomPage} />}
      {!logged && <Redirect to='/auth' exact />}
    </Switch>
  )
}

export default Routes
