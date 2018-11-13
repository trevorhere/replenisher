import React from 'react';
import Header from './Header';
import Test from './Test';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import requireAuth from './requireAuth';
import Dashboard from './Dashboard';

import { Route, IndexRoute } from 'react-router';
import {  HashRouter, Switch, Link } from 'react-router-dom';
import CreateList from './CreateList';
import ViewList from './ViewList';

import CreateTask from './CreateTask';
import ViewTask from './ViewTask';

import ViewTeam from './ViewTeam';
import CreateTeam from './CreateTeam';





const App = (props) => {
  return (
    <div className="container">
      <Header />
      < Switch>
          <Route path="/test" component={Test} />
          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={SignupForm} />
          <Route path="/dashboard/team/:teamID" component={requireAuth(ViewTeam)} />
          <Route path="/dashboard/createteam" component={requireAuth(CreateTeam)} />
          <Route path="/dashboard/list/:listID/task/:taskID" component={requireAuth(ViewTask)} />
          <Route path="/dashboard/list/:listID/createtask" component={requireAuth(CreateTask)} />
          <Route path="/dashboard/list/:listID" component={requireAuth(ViewList)} />
          <Route path="/dashboard/createlist" component={requireAuth(CreateList)} />
          <Route path="/dashboard" component={requireAuth(Dashboard)} />

      </ Switch>
    </div>
  );
};

export default App;

