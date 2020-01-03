import React from 'react';

import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Product from './Product'
import Portfolio from './Portfolio'
import Profit from './Profit'

function Operations({ products, profit, createOperation }) {
  return (
    <div>
      <Grid container spacing={6} justify='center' className='space-bottom'>
        {
          products.map(product => (
            <Product product={product} key={product.resource} createOperation={createOperation} />
          ))
        }
      </Grid>
      <Divider variant='middle' />
      <Portfolio createOperation={createOperation} />
      <Profit profit={profit} />
    </div>
  );
}

export default Operations;