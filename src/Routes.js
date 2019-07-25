import React from 'react'
import { useAuth } from './hooks'
import { Route, Redirect, Switch } from 'react-router-dom'
import { AuthPage, BookingsPage, EventsPage, RoomPage } from './pages'
const Routes = props => {
  const { userId } = useAuth()
  return (
    <Switch>
      {userId && <Redirect from='/' to='/events' exact />}
      {userId && <Redirect from='/auth' to='/events' exact />}
      {!userId && <Route path='/auth' component={AuthPage} />}
      <Route path='/events' component={EventsPage} />
      {userId && <Route path='/bookings' component={BookingsPage} />}
      {userId && <Route path='/bat' component={RoomPage} />}
      {!userId && <Redirect to='/auth' exact />}
    </Switch>
  )
}

export default Routes
