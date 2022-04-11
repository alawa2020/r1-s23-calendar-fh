import React from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthScreen } from '../components/auth/AuthScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'

export const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/auth" component={ AuthScreen } />
        <Route exact path="/" component={ CalendarScreen } />
      </Switch>
    </Router>
  )
}
