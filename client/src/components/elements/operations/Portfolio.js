import React from 'react';
import { connect } from 'react-redux';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";

function Portfolio({ user }) {
  return (
    <Grid className='space-top-large'>
      <Typography variant='h5' className='text-left'>Portfolio:</Typography>
      <Grid container className='space-top-middle'>
        <Grid item xs={12} sm>
          <Typography>Balance: {user.balance.toFixed(2)}$</Typography>
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
  );
}

const mapStateToProps = state => ({
  user: state
});

export default connect(mapStateToProps)(React.memo(Portfolio));