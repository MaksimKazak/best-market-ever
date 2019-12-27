import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';

function Main({ user }) {
  let products = ['wood', 'iron', 'oil'];

  return (
    <Box className='box main-page'>
      <p>
        This application allows you to do one of the most important things - buy imaginary wood, iron and oil.
      </p>
      {
        user ?
          <p>
            It's time to buy some { products[Math.floor(Math.random()*products.length)] }!
          </p>
          :
          <p>
            <Link to='/registration' className='link'>Sign up</Link>/<Link to='/authentication' className='link'>Sign
            in</Link>
            &nbsp;or try&nbsp;
            <Link to='/operations' className='link'>demo</Link>.
          </p>
      }
    </Box>
  );
}

const mapStateToProps = state => ({
  user: state.user
});

export default React.memo(connect(mapStateToProps)(Main));