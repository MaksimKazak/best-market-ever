import React from 'react';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class Registration extends React.Component {
  state = {
    username: '',
    email: '',
    password: ''
  };

  inputChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  signUpHandler(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Typography variant='h5' className='registration-header'>Registration</Typography>
        <Box className='registration-box'>
          <form onSubmit={this.signUpHandler}>
            <TextField className='registration-input'
                       label='username'
                       name='username'
                       onChange={this.inputChangeHandler}
                       value={this.state.username}
            />
            <TextField className='registration-input'
                       label='email'
                       name='email'
                       onChange={this.inputChangeHandler}
                       value={this.state.email}
            />
            <TextField className='registration-input'
                       label='password'
                       type='password'
                       name='password'
                       onChange={this.inputChangeHandler}
                       value={this.state.password}
            />
            <Button type='submit' color='primary' variant='contained'>Sign up!</Button>
          </form>
        </Box>
      </div>
    );
  }
}

export default Registration;