import React, {Fragment, useState} from 'react';
import { logout } from '../../../store/user/middleware';
import cloneDeep from 'lodash/cloneDeep';
import { actions } from '../../../store/user/userSlice';
import UserApi from '../../../api/User';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { NavLink, useHistory } from 'react-router-dom';
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Slider from "@material-ui/core/Slider";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {toast} from "react-toastify";

function Header({ user, dispatch }) {
  let [open, setOpen] = useState(false);
  let [quantity, setQuantity] = useState(1);
  const history = useHistory();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleLogout = async () => {
    history.push('/');
    dispatch(logout());
  };
  const handleClose = () => {
    setOpen(false);
  };
  const changeQuantityHandler = (event, val) => {
    setQuantity(val);
  };
  const replenishBalance = () => {
    setOpen(false);
    let userCopy = cloneDeep(user);
    userCopy.balance += quantity;
    UserApi.update(userCopy)
      .then(user => {
        dispatch(actions.setUser(user));
      })
      .catch(err => {
        if (err && err.response) {
          toast.error(err.response.data.message);
        }
      });
  };

  let profileBlock;
  if (!user.isNotAuthenticated) {
    profileBlock = (
      <div className='header-profile'>
        {user.username + ' ' + user.balance.toFixed(2) + ' $'}
        <IconButton onClick={handleOpen} title='Replenish balance' color='primary' className='space-left'>
          <AddCircleIcon />
        </IconButton>
        <Button color='primary' className='space-left' onClick={handleLogout}>Sign out</Button>
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

  let links;
  if (!user.isNotAuthenticated) {
    links = (
      <NavLink to='/operations' className='link nav-link header-link' activeClassName='link-active'>Operations</NavLink>
    );
    if (user.type === 'admin') {
      links = (
        <Fragment>
          <NavLink to='/users' className='link nav-link header-link' activeClassName='link-active'>Users</NavLink>
          <NavLink to='/operations' className='link nav-link header-link' activeClassName='link-active'>Operations</NavLink>
        </Fragment>
      );
    }
  }

  return (
    <header className="app-header">
      <div className='header-left'>
        <Typography variant='h5'>Best Market Ever</Typography>
        <nav className='header-nav'>
          <NavLink to='/' className='link nav-link header-link' exact activeClassName='link-active'>Main</NavLink>
          { links }
        </nav>
      </div>
      { profileBlock }
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className='modal'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className='modal-box'>
            <h2 id="transition-modal-title">Choose quantity</h2>
            <p id="transition-modal-description">
              <Slider
                defaultValue={1}
                aria-labelledby="transition-modal-title"
                min={1}
                max={10000}
                step={1}
                valueLabelDisplay="auto"
                value={quantity}
                onChange={changeQuantityHandler}
              />
            </p>
            <p>{quantity.toFixed(2) + ' $'}</p>
            <Button color='primary' onClick={replenishBalance}>
              Replenish
            </Button>
          </div>
        </Fade>
      </Modal>
    </header>
  );
}

export default Header;