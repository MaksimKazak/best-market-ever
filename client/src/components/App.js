import React, { Fragment } from 'react';
import '../assets/styles/App.sass';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { connect } from 'react-redux';
import { actions as userActions } from '../store/userSlice';
import { actions as productsActions } from '../store/productsSlice';
import UserApi from "../api/User";
import ProductApi from "../api/Product";

import Header from './elements/Header';
import Footer from './elements/Footer';
import Main from './pages/Main';
import Users from './pages/Users';
import Operations from './pages/Operations';
import Registration from './pages/Registration';
import Authentication from './pages/Authentication';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import { toast } from "react-toastify";

class App extends React.PureComponent {
  state = {
    isLoading: true
  };

  loadUser = () => {
    let token = Cookies.get('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
      return UserApi.current().then(res => res.user);
    }
    return Promise.resolve();
  };

  componentDidMount = async () => {
    try {
      let [user, products] = await Promise.all([
        this.loadUser(),
        ProductApi.list()
      ]);
      this.props.dispatch(userActions.setUser(user || null));
      this.props.dispatch(productsActions.setProducts(products));
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      }
    } finally {
      this.setState({ isLoading: false });
    }
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