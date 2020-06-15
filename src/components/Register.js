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

    axios.post('https://keep-react-be.herokuapp.com/auth/register')
  }
}