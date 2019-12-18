import React, { Fragment } from 'react';
import '../assets/styles/App.sass';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { connect } from 'react-redux';
import { actions } from '../store/userSlice';
import UserApi from "../api/User";

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

  componentDidMount() {
    let token = Cookies.get('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
      UserApi.current()
        .then(res => {
          this.props.dispatch(actions.setUser(res.user));
          this.setState({ isLoading: false });
        })
        .catch(err => {
          this.setState({ isLoading: false });
        });
    } else {
      this.setState({ isLoading: false });
    }
  }

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