import React from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import PrivateRoute from './auth/privateRoute.js';
import './App.css';

// components
import Login from './components/Login.js';
import SignUp from './components/Register.js'
import Main from './components/Main.js'

function App() {
  return (
    <div className='App'>
      <div className='components'>
        <Route
          exact path='/'
          render={props => localStorage.getItem('token')
          ? <Redirect to='/home' />
          : <Login {...props} />}
        />

        <Route exact path='/signup' render={props => <SignUp {...props} /> } />
        <PrivateRoute exact path='/home' component={Main} />
        
      </div>
    </div>
  );
}

export default withRouter(App);