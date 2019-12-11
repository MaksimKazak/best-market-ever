import React from 'react';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function Registration() {
  return (
    <div>
      <Typography variant='h4' className='registration-header'>Registration</Typography>
      <Box className='registration-box'>
        <TextField className='registration-input' label='username'/>
        <TextField className='registration-input' label='email'/>
        <TextField className='registration-input' label='password' type='password'/>
        <Button color='primary' variant='contained'>Sign up!</Button>
      </Box>
    </div>
  );
}

export default Registration;