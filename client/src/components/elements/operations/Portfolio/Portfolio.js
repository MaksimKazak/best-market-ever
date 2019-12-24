import React from 'react';
import { connect } from 'react-redux';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Product from './Product';

function Portfolio({ user, products }) {
  return (
    <Grid className='space-top-large'>
      <Typography variant='h5' className='text-left'>Portfolio:</Typography>
      <Grid container className='space-top-middle'>
        <Grid item xs={12} sm>
          <Typography>Balance: {user ? user.balance.toFixed(2) : 0} $</Typography>
        </Grid>
        <Hidden smDown>
          <div className='divider' />
        </Hidden>
        <Grid item xs={12} sm>
          {
            products.map(product => (
              <Product product={product} key={product.resource} />
            ))
          }
        </Grid>
        <Hidden smDown>
          <div className='divider' />
        </Hidden>
        <Grid item xs={12} sm>
          <Typography>Graph</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  products: state.products
});

export default connect(mapStateToProps)(React.memo(Portfolio));