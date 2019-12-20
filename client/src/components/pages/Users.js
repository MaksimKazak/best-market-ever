import React from 'react';
import { connect } from "react-redux";
import { Redirect, withRouter } from 'react-router-dom';
import UserApi from '../../api/User';
import { toast } from 'react-toastify';

import Table from '../elements/Table';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const columns = [
  {
    id: 'username',
    label: 'Username'
  },
  {
    id: 'email',
    label: 'Email'
  },
  {
    id: 'balance',
    label: 'Balance',
    format: value => `${value.toFixed(2)} $`
  }
];

class Users extends React.PureComponent {
  state = {
    page: 0,
    rowsPerPage: 10,
    users: [],
    count: 0
  };

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage
    });
  };

  handleChangeRowsPerPage = event => {
    this.setState({
      rowsPerPage: +event.target.value,
      page: 0
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    UserApi.list({
      page: this.state.page,
      rowsPerPage: this.state.rowsPerPage
    }).then(data => {
      console.log(data);
      this.setState({
        users: data.users,
        count: data.count
      });
    }).catch(err => {
      if (err && err.response) {
        toast.error(err.response.data.message);
      }
    });
  }

  render() {
    if (!this.props.user || this.props.user.type !== 'admin') {
      return <Redirect to='/' />
    }

    return (
      <Box className='box'>
        <Typography variant='h4' className='text-left space-bottom-middle'>
          Users
        </Typography>
        <Table columns={columns}
               rows={this.state.users}
               page={this.state.page}
               count={this.state.count}
               rowsPerPage={this.state.rowsPerPage}
               handleChangePage={this.handleChangePage}
               handleChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  user: state
});

export default withRouter(connect(mapStateToProps)(Users));