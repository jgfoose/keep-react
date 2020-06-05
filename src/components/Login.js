import React, { useState } from 'react';
import axios from 'axios';
import { Message, Form, Segment, Image, Grid, GridColumn } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function Login(props) {
  // credentials store username/password submitted by user and sent to backend for verification
  const [ credentials, setCredentials ] = useState({
    username: '',
    password: ''
  });

  // will cause error message to appear if true
  const [ incorrectCreds, setIncorrectCreds ] = useState({
    isIncorrect: false
  });

  const submitHandler = e => {
    e.preventDefault();

    axios.post('http://localhost:5000/auth/login', credentials)
      .then(response => {
        setIncorrectCreds({ isIncorrect: false })

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user_id', response.data.user.id);

        props.history.push('/home');
      })
      .catch(error => {
        setIncorrectCreds({ isIncorrect: true })
      })
  };

  const changeHandler = e => {
    setIncorrectCreds({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className="container">
      {incorrectCreds.isIncorrect && <Message error header="Email or password is incorrect" />}
      <Form className="form" onSubmit={submitHandler}>
        <Form.Input
          className="email"
          type="email" 
          placeholder="email" 
          icon="user" 
          iconPosition="left" 
          name="email" 
          value={credentials.email} 
          onChange={changeHandler} 
          required
        />
        <Form.Input
          type="password"
          placeholder="password"
          icon="user"
          iconPosition="left"
          name="password"
          value={credentials.password}
          onChange={changeHandler}
          required
        />
        <Form.Button color="blue" content="Login" size="medium" />
      </Form>
      <div className="message">
        No account? {' '}<Link to="/signup" className="sign-up">Sign Up</Link>
      </div>
    </div>
  )
}