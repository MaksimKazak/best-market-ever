import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ProductApi from '../../../api/Product';

import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Product from './Product'
import Portfolio from './Portfolio'
import Profit from './Profit'

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
            <Product product={product} />
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
  user: state
});

export default connect(mapStateToProps)(Operations);