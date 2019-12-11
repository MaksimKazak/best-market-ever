import React from 'react';

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

function Operations() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={4} spacing={16}>
        <Paper className='box'>
          <div>Wood</div>
          <div>Price: 13.40$</div>
          <Button variant='outlined' color='primary'>Buy</Button>
        </Paper>
      </Grid>
      <Grid item xs={4} spacing={16}>
        <Paper className='box'>
          <div>Iron</div>
          <div>Price: 30.50$</div>
          <Button variant='outlined' color='primary'>Buy</Button>
        </Paper>
      </Grid>
      <Grid item xs={4} spacing={16}>
        <Paper className='box'>
          <div>Oil</div>
          <div>Price: 28.00$</div>
          <Button variant='outlined' color='primary'>Buy</Button>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Operations;