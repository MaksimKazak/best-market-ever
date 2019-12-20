import React from 'react';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

function Product({ product }) {
  return (
    <Grid item xs={12} sm={6} md={4} key={product.resource}>
      <Paper className='box box-small-spacing'>
        <Typography variant='h5' className='space-bottom'>{product.resource}</Typography>
        <Typography className='space-bottom'>Price: {product.price.toFixed(2)}$</Typography>
        <Button variant='outlined' color='primary'>Buy</Button>
      </Paper>
    </Grid>
  );
}

export default React.memo(Product);