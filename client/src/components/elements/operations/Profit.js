import React from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

function Profit() {
  return (
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
  );
}

export default React.memo(Profit);