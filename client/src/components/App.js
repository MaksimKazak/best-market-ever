import React, { Fragment } from 'react';
import '../assets/styles/App.sass';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import loadProducts from '../store/products/middleware';
import login from '../store/user/middleware';

import Header from './elements/Header';
import Footer from './elements/Footer';
import Main from './pages/Main';
import Users from './pages/Users';
import Operations from './pages/Operations';
import Registration from './pages/Registration';
import Authentication from './pages/Authentication';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';

class App extends React.PureComponent {
  state = {
    isLoading: true
  };

  componentDidMount = async () => {
    await Promise.all([
      this.props.dispatch(loadProducts()),
      this.props.dispatch(login())
    ]);
    this.setState({ isLoading: false });
  };

  render() {
    return (
      <Router>
        <div className="App">
          {
            this.state.isLoading ?
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
}

export default connect()(App);