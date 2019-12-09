import React from 'react';

import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Link } from 'react-router-dom';

function Header() {

  let profileBlock;
  let isAuthenticated = false /* check for authenticated user */;
  if (isAuthenticated) {
    profileBlock = <div className='header-profile'>Profile</div>; /* to be changed */
  } else {
    profileBlock = (
      <nav className='header-profile'>
        <Link to='/authentication' className='header-link'>Sign in</Link>
        <Link to='/registration' className='header-link'>Sign up</Link>
      </nav>
    );
  }

  return (
    <header className="App-header">
      <div className='header-left'>
        <Typography variant='h4'>Best Market Ever</Typography>
        <nav className='header-nav'>
          <Link to='/' className='header-link'>Main</Link>
          <Link to='/users' className='header-link'>Users</Link>
          <Link to='/operations' className='header-link'>Operations</Link>
          <Link to='/operations/archive' className='header-link'>Archive</Link>
        </nav>
      </div>
      { profileBlock }
    </header>
  );
}

export default Header;