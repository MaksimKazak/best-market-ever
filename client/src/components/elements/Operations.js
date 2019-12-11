import React from 'react';

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

function Operations() {
  return (
    <div>
      <Grid container spacing={6} className='space-bottom'>
        <Grid item xs={4} spacing={16}>
          <Paper className='box box-small-spacing'>
            <Typography variant='h5' className='space-bottom'>Wood</Typography>
            <Typography variant='p' component='div' className='space-bottom'>Price: 13.40$</Typography>
            <Button variant='outlined' color='primary'>Buy</Button>
          </Paper>
        </Grid>
        <Grid item xs={4} spacing={16}>
          <Paper className='box box-small-spacing'>
            <Typography variant='h5' className='space-bottom'>Iron</Typography>
            <Typography variant='p' component='div' className='space-bottom'>Price: 30.50$</Typography>
            <Button variant='outlined' color='primary'>Buy</Button>
          </Paper>
        </Grid>
        <Grid item xs={4} spacing={16}>
          <Paper className='box box-small-spacing'>
            <Typography variant='h5' className='space-bottom'>Oil</Typography>
            <Typography variant='p' component='div' className='space-bottom'>Price: 28.00$</Typography>
            <Button variant='outlined' color='primary'>Buy</Button>
          </Paper>
        </Grid>
      </Grid>
      <Divider variant='middle' />
      <Grid class='space-top-large'>
        <Typography variant='h5'>Portfolio</Typography>
      </Grid>
    </div>
  );
}

export default Operations;