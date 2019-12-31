import React  from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Product from "./Product";

function Profit({ products, profit }) {
  return (
    <Grid className='space-top-large'>
      <Typography variant='h5' className='text-left'>
        Profit: <Typography className='text-left inline'>{profit.general.toFixed(2)} $</Typography>
      </Typography>
      <div className='space-top-middle text-left'>
        {
          products.map(product => (
            <Product product={product} profit={profit[product.resource]} key={product.resource} />
          ))
        }
      </div>
    </Grid>
  );
}

export default Profit;