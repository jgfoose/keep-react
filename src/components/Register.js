import React, { useState } from 'react';
import axios from 'axios';

export default function SignUp(props) {
  const [ userCreds, setUserCreds ] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  });

  const [ incorrectCreds, setIncorrectCreds ] = useState({
    isIncorrect: false
  });

  const submitHandler = e => {
    e.preventDefault();

    axios.post('https://keep-react-be.herokuapp.com/auth/register', userCreds)
      .then(res => {
        setIncorrectCreds({ isIncorrect: false });
        props.history.push('/')
      })
      .catch(error => {
        setIncorrectCreds({ isIncorrect: true })
      })
  };

  const changeHandler = e => {
    setUserCreds({ ...userCreds, [e.target.name]: e.target.value })
  };

  return (
    <div className="container">
      {incorrectCreds.isIncorrect && <Message error header="Please provide proper account details" />}
      <Form className="form" onSubmit={submitHandler}>
        <Segment>
          <Form.Input 
            type="text"
            placeholder="First Name"
            name="firstname"
            onChange={changeHandler}
            value={userCreds.firstname}
            required 
          />
          <Form.Input 
            type="text"
            placeholder="Last Name"
            name="lastname"
            onChange={changeHandler}
            value={userCreds.lastname}
            required 
          />
          {/* <Form.Input 
            type="text"
            placeholder="Username"
            name="username"
            autoComplete="new-password"
            onChange={changeHandler}
            value={userCreds.username}
            required 
          /> */}
          <Form.Input 
            type="email"
            placeholder="Email"
            name="email"
            onChange={changeHandler}
            value={userCreds.email}
            required 
          />
          <Form.Input 
            type="password"
            placeholder="Password"
            name="password"
            onChange={changeHandler}
            value={userCreds.password}
            required 
          />
          <Form.Button content="Sign Up" size="medium" />
        </Segment>
      </Form>
            
    </div>
  )
}