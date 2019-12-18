import React from 'react';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';

const mapStateToProps = state => ({
  user: state
});

function ConnectedHeader({ user }) {

  let profileBlock;
  if (user) {
    profileBlock = (
      <div className='header-profile'>
        {user.username}
        <Button color='primary' className='space-left'>Sign out</Button>
      </div>
    );
  } else {
    profileBlock = (
      <nav className='header-profile header-nav'>
        <NavLink to='/authentication' className='link nav-link header-link' activeClassName='link-active'>Sign in</NavLink>
        <NavLink to='/registration' className='link nav-link header-link' activeClassName='link-active'>Sign up</NavLink>
      </nav>
    );
  }

  return (
    <header className="App-header">
      <div className='header-left'>
        <Typography variant='h5'>Best Market Ever</Typography>
        <nav className='header-nav'>
          <NavLink to='/' className='link nav-link header-link' exact activeClassName='link-active'>Main</NavLink>
          <NavLink to='/users' className='link nav-link header-link' activeClassName='link-active'>Users</NavLink>
          <NavLink to='/operations' className='link nav-link header-link' activeClassName='link-active'>Operations</NavLink>
        </nav>
      </div>
      { profileBlock }
    </header>
  );
}

const Header = connect(mapStateToProps)(ConnectedHeader);

export default Header;