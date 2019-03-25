import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import CalendarPage from '../src/components/CalendarPage'
import LoginForm from '../src/components/LoginForm'
import { createBrowserHistory } from 'history';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const history = createBrowserHistory();

const App = () => (
  <Router history={history}>
    <Switch>
      <Route path="/calendar" component={CalendarPage} />
      <Route path="/" component={LoginForm} />
    </Switch>
  </Router>
)

export default App;
