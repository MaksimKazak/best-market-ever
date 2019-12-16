import React from 'react';
import UserApi from '../../api/User';
import { Redirect } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Authentication extends React.Component {
  state = {
    email: '',
    password: '',
    redirect: false
  };

  inputChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  login = async (event) => {
    event.preventDefault();
    let res = await UserApi.login({
      email: this.state.email,
      password: this.state.password
    });
    this.setState({
      redirect: true
    });
  };

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to='/' />
      );
    }

    return (
      <div>
        <Typography variant='h5' className='registration-header'>Authentication</Typography>
        <Box className='registration-box'>
          <form onSubmit={this.login}>
            <TextField className='registration-input'
                       label='email'
                       name='email'
                       value={this.state.email}
                       onChange={this.inputChangeHandler}
            />
            <TextField className='registration-input'
                       label='password'
                       type='password'
                       name='password'
                       value={this.state.password}
                       onChange={this.inputChangeHandler}
            />
            <Button type='submit' color='primary' variant='contained'>Sign in!</Button>
          </form>
        </Box>
      </div>
    );
  }
}

export default Authentication;