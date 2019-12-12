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
        <Grid item xs={4}>
          <Paper className='box box-small-spacing'>
            <Typography variant='h5' className='space-bottom'>Wood</Typography>
            <Typography className='space-bottom'>Price: 13.40$</Typography>
            <Button variant='outlined' color='primary'>Buy</Button>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className='box box-small-spacing'>
            <Typography variant='h5' className='space-bottom'>Iron</Typography>
            <Typography className='space-bottom'>Price: 30.50$</Typography>
            <Button variant='outlined' color='primary'>Buy</Button>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className='box box-small-spacing'>
            <Typography variant='h5' className='space-bottom'>Oil</Typography>
            <Typography className='space-bottom'>Price: 28.00$</Typography>
            <Button variant='outlined' color='primary'>Buy</Button>
          </Paper>
        </Grid>
      </Grid>
      <Divider variant='middle' />
      <Grid className='space-top-large'>
        <Typography variant='h5' className='text-left'>Portfolio:</Typography>
        <Grid container className='space-top-middle'>
          <Grid item xs>
            Balance: 1000.00$
          </Grid>
          <div className='divider' />
          <Grid item xs>
            <p>Wood: 34</p>
            <p>Iron: 34</p>
            <p>Oil: 34</p>
          </Grid>
          <div className='divider' />
          <Grid item xs>
            Graph
          </Grid>
        </Grid>
      </Grid>
      <Grid className='space-top-large'>
        <Typography variant='h5' className='text-left'>Profit:</Typography>
        <Typography className='text-left'>-460.00$</Typography>
        <div className='space-top-middle text-left'>
          <div>Wood: <Typography className='text-left'>-700.00$</Typography></div>
          <div>Iron: <Typography className='text-left'>240.00$</Typography></div>
          <div>Oil: <Typography className='text-left'>220.00$</Typography></div>
        </div>
      </Grid>
    </div>
  );
}

export default Operations;