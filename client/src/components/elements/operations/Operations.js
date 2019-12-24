import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ProductApi from '../../../api/Product';

import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Product from './Product'
import Portfolio from './Portfolio/Portfolio'
import Profit from './profit/Profit'

function Operations({ products }) {
  return (
    <div>
      <Grid container spacing={6} justify='center' className='space-bottom'>
        {
          products.map(product => (
            <Product product={product} key={product.resource} />
          ))
        }
      </Grid>
      <Divider variant='middle' />
      <Portfolio />
      <Profit />
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  products: state.products
});

export default connect(mapStateToProps)(Operations);