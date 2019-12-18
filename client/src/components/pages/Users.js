import React from 'react';

import Table from '../elements/Table';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
const columns = [
  {
    id: 'id',
    label: '#'
  },
  {
    id: 'name',
    label: 'Name'
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
const users = [
  {
    id: 1,
    name: 'Kek',
    email: 'kek@gmail.com',
    balance: 56
  },
  {
    id: 2,
    name: 'Lol',
    email: 'lol@gmail.com',
    balance: 500
  }
];

class Users extends React.PureComponent {
  state = {
    page: 0,
    rowsPerPage: 10,
    users
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

  render() {
    return (
      <Box className='box'>
        <Typography variant='h4' className='text-left space-bottom-middle'>
          Users
        </Typography>
        <Table columns={columns}
               rows={this.state.users}
               page={this.state.page}
               rowsPerPage={this.state.rowsPerPage}
               handleChangePage={this.handleChangePage}
               handleChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Box>
    );
  }
}

export default Users;