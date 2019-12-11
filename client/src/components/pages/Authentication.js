import React from 'react';

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function Authentication() {
  return (
    <div>
      <Typography variant='h5' className='registration-header'>Authentication</Typography>
      <Box className='registration-box'>
        <TextField className='registration-input' label='email'/>
        <TextField className='registration-input' label='password' type='password'/>
        <Button color='primary' variant='contained'>Sign in!</Button>
      </Box>
    </div>
  );
}

export default Authentication;