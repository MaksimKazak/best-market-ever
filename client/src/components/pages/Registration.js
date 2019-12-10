import React from 'react';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function Registration() {
  return (
    <div>
      Registration
      <Box className='registration-box'>
        <TextField className='registration-input' label='email'/>
        <TextField className='registration-input' label='password' type='password'/>
        <Button color='primary' variant='contained'>Sign up!</Button>
      </Box>
    </div>
  );
}

export default Registration;