import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ProductApi from '../../api/Product';

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Hidden from '@material-ui/core/Hidden'

function Operations() {
  let [products, setProducts] = useState([]);

  useEffect(async () => {
    let data = await ProductApi.list();
    setProducts(data);
  }, []);

  return (
    <div>
      <Grid container spacing={6} justify='center' className='space-bottom'>
        {
          products.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product.resource}>
              <Paper className='box box-small-spacing'>
                <Typography variant='h5' className='space-bottom'>{product.resource}</Typography>
                <Typography className='space-bottom'>Price: {product.price.toFixed(2)}$</Typography>
                <Button variant='outlined' color='primary'>Buy</Button>
              </Paper>
            </Grid>
          ))
        }
      </Grid>
      <Divider variant='middle' />
      <Grid className='space-top-large'>
        <Typography variant='h5' className='text-left'>Portfolio:</Typography>
        <Grid container className='space-top-middle'>
          <Grid item xs={12} sm>
            <Typography>Balance: 1000.00$</Typography>
          </Grid>
          <Hidden smDown>
            <div className='divider' />
          </Hidden>
          <Grid item xs={12} sm>
            <Typography className='portfolio-quantity'>Wood: 35 <Button color='primary'>sell</Button></Typography>
            <Typography className='portfolio-quantity'>Iron: 234 <Button color='primary'>sell</Button></Typography>
            <Typography className='portfolio-quantity'>Oil: 4 <Button color='primary'>sell</Button></Typography>
          </Grid>
          <Hidden smDown>
            <div className='divider' />
          </Hidden>
          <Grid item xs={12} sm>
            <Typography>Graph</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid className='space-top-large'>
        <Typography variant='h5' className='text-left'>
          Profit: <Typography className='text-left inline'>-460.00$</Typography>
        </Typography>
        <div className='space-top-middle text-left'>
          <div>Wood: <Typography className='text-left inline'>-700.00$</Typography></div>
          <div>Iron: <Typography className='text-left inline'>240.00$</Typography></div>
          <div>Oil: <Typography className='text-left inline'>220.00$</Typography></div>
        </div>
      </Grid>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state
});

export default connect(mapStateToProps)(Operations);