import React, { Fragment, useEffect, useState } from 'react';
import '../assets/styles/App.sass';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import loadProducts from '../store/products/middleware';
import { login } from '../store/user/middleware';

import Header from './elements/Header';
import Footer from './elements/Footer';
import Main from './Main';
import Users from './Users';
import Operations from './Operations';
import Registration from './Registration';
import Authentication from './Authentication';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';

function App({ dispatch }) {
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      dispatch(loadProducts()),
      dispatch(login())
    ]).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        {
          isLoading ?
            <LinearProgress/>
            :
            <Fragment>
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
            </Fragment>
        }
      </div>
    </Router>
  );
}

export default connect()(React.memo(App));