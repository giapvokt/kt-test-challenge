import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { MainLayoutRoute, SubLayoutRoute } from './routes';
import Home from './scenes/Home';
import LoginPage from './scenes/LoginPage';
import Requests from './services/requests';
import RequireAuth from './services/requireAuth';

const AdminRole = ['Admin'];


class App extends Component {
  render() {
    return (
      <Switch>
        <MainLayoutRoute exact path="/" component={RequireAuth(Requests, AdminRole)} />
        <SubLayoutRoute path="/signin" component={LoginPage} />
      </Switch>
    );
  }
}

export default App;
