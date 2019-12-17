import React from 'react';

import Table from './Table';
const columns = [
  {
    id: 'id',
    label: '#'
  },
  {
    id: 'resource',
    label: 'Resource'
  },
  {
    id: 'quantity',
    label: 'Quantity'
  },
  {
    id: 'amount',
    label: 'Amount',
    format: value => `${value.toFixed(2)} $`
  },
  {
    id: 'createdAt',
    label: 'Date'
  },
  {
    id: 'type',
    label: 'Type'
  }
];
const operations = [
  {
    id: 1,
    resource: 'Wood',
    quantity: 5,
    amount: 67,
    createdAt: '05.12.2019',
    type: 'bought'
  },
  {
    id: 2,
    resource: 'Iron',
    quantity: 12,
    amount: 300,
    createdAt: '07.12.2019',
    type: 'bought'
  },
  {
    id: 3,
    resource: 'Oil',
    quantity: 2,
    amount: 60,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 4,
    resource: 'Oil',
    quantity: 2,
    amount: 60,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 5,
    resource: 'Oil',
    quantity: 2,
    amount: 60,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 6,
    resource: 'Oil',
    quantity: 2,
    amount: 60,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 7,
    resource: 'Oil',
    quantity: 2,
    amount: 60,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 8,
    resource: 'Oil',
    quantity: 2,
    amount: 60,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 9,
    resource: 'Oil',
    quantity: 2,
    amount: 60,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 10,
    resource: 'Oil',
    quantity: 2,
    amount: 60,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 11,
    resource: 'Oil',
    quantity: 2,
    amount: 60,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 12,
    resource: 'Oil',
    quantity: 2,
    amount: 60,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 13,
    resource: 'Oil',
    quantity: 2,
    amount: 60,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 14,
    resource: 'Oil',
    quantity: 2,
    amount: 60,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 15,
    resource: 'Oil',
    quantity: 2,
    amount: 60,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 16,
    resource: 'Oil',
    quantity: 2,
    amount: 60,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 17,
    resource: 'Oil',
    quantity: 2,
    amount: 60,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 18,
    resource: 'Oil',
    quantity: 2,
    amount: 60,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 19,
    resource: 'Oil',
    quantity: 2,
    amount: 60,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 20,
    resource: 'Oil',
    quantity: 2,
    amount: 60,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 21,
    resource: 'Oil',
    quantity: 2,
    amount: 60,
    createdAt: '09.12.2019',
    type: 'sold'
  }
];

class Archive extends React.PureComponent {
  state = {
    page: 0,
    rowsPerPage: 10,
    operations
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
      <Table columns={columns}
             rows={this.state.operations}
             page={this.state.page}
             rowsPerPage={this.state.rowsPerPage}
             handleChangePage={this.handleChangePage}
             handleChangeRowsPerPage={this.handleChangeRowsPerPage}
      />
    );
  }
}

export default Archive;