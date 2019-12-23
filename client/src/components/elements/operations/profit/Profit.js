import React from 'react';
import { connect } from 'react-redux';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Product from "./Product";

function Profit({ user: { operations }, products }) {
  let profit = operations.reduce((acc, { type, amount }) => {
    return type === 'sold' ? acc + amount : acc - amount;
  }, 0);

  return (
    <Grid className='space-top-large'>
      <Typography variant='h5' className='text-left'>
        Profit: <Typography className='text-left inline'>{profit.toFixed(2)} $</Typography>
      </Typography>
      <div className='space-top-middle text-left'>
        {
          products.map(product => (
            <Product product={product} key={product.resource} />
          ))
        }
      </div>
    </Grid>
  );
}

const mapStateToProps = state => ({
  user: state
});

export default React.memo(connect(mapStateToProps)(Profit));