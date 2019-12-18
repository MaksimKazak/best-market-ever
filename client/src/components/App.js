import React from 'react';
import '../assets/styles/App.sass';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { connect } from 'react-redux';
import { actions } from '../store/userSlice';

import Header from './elements/Header';
import Footer from './elements/Footer';
import Main from './pages/Main';
import Users from './pages/Users';
import Operations from './pages/Operations';
import Registration from './pages/Registration';
import Authentication from './pages/Authentication';
import Container from "@material-ui/core/Container";
import UserApi from "../api/User";

function App({ dispatch }) {
  let token = Cookies.get('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    UserApi.current()
      .then(res => {
        dispatch(actions.setUser(res.user));
      });
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <Container className='main-container'>
          <Switch>
              <Route path='/' exact component={Main}/>
              <Route path='/users' component={Users}/>
              <Route path='/operations' component={Operations}/>
              <Route path='/registration' component={Registration}/>
              <Route path='/authentication' component={Authentication}/>
              <Route>
                404 Error
              </Route>
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
}

export default connect()(App);