import React from 'react';

import { Link } from 'react-router-dom';

function Main() {

  let isAuthenticated = true;
  let products = ['wood', 'iron', 'oil'];

  return (
    <div className='main-page'>
      <p>
        This application allows you to do one of the most important things - buy imaginary wood, iron and oil.
      </p>
      {
        isAuthenticated ?
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
    </div>
  );
}

export default Main;