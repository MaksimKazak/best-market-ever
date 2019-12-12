import React, { Fragment } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
const operations = [
  {
    id: 1,
    product: {
      id: 1,
      name: 'Wood'
    },
    quantity: 5,
    oneItemPrice: 13.40,
    createdAt: '05.12.2019',
    type: 'bought'
  },
  {
    id: 2,
    product: {
      id: 2,
      name: 'Iron'
    },
    quantity: 12,
    oneItemPrice: 25.00,
    createdAt: '07.12.2019',
    type: 'bought'
  },
  {
    id: 3,
    product: {
      id: 3,
      name: 'Oil'
    },
    quantity: 2,
    oneItemPrice: 30.00,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 4,
    product: {
      id: 3,
      name: 'Oil'
    },
    quantity: 2,
    oneItemPrice: 30.00,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 5,
    product: {
      id: 3,
      name: 'Oil'
    },
    quantity: 2,
    oneItemPrice: 30.00,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 6,
    product: {
      id: 3,
      name: 'Oil'
    },
    quantity: 2,
    oneItemPrice: 30.00,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 7,
    product: {
      id: 3,
      name: 'Oil'
    },
    quantity: 2,
    oneItemPrice: 30.00,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 8,
    product: {
      id: 3,
      name: 'Oil'
    },
    quantity: 2,
    oneItemPrice: 30.00,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 9,
    product: {
      id: 3,
      name: 'Oil'
    },
    quantity: 2,
    oneItemPrice: 30.00,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 10,
    product: {
      id: 3,
      name: 'Oil'
    },
    quantity: 2,
    oneItemPrice: 30.00,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 11,
    product: {
      id: 3,
      name: 'Oil'
    },
    quantity: 2,
    oneItemPrice: 30.00,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 12,
    product: {
      id: 3,
      name: 'Oil'
    },
    quantity: 2,
    oneItemPrice: 30.00,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 13,
    product: {
      id: 3,
      name: 'Oil'
    },
    quantity: 2,
    oneItemPrice: 30.00,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 14,
    product: {
      id: 3,
      name: 'Oil'
    },
    quantity: 2,
    oneItemPrice: 30.00,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 15,
    product: {
      id: 3,
      name: 'Oil'
    },
    quantity: 2,
    oneItemPrice: 30.00,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 16,
    product: {
      id: 3,
      name: 'Oil'
    },
    quantity: 2,
    oneItemPrice: 30.00,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 17,
    product: {
      id: 3,
      name: 'Oil'
    },
    quantity: 2,
    oneItemPrice: 30.00,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 18,
    product: {
      id: 3,
      name: 'Oil'
    },
    quantity: 2,
    oneItemPrice: 30.00,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 19,
    product: {
      id: 3,
      name: 'Oil'
    },
    quantity: 2,
    oneItemPrice: 30.00,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 20,
    product: {
      id: 3,
      name: 'Oil'
    },
    quantity: 2,
    oneItemPrice: 30.00,
    createdAt: '09.12.2019',
    type: 'sold'
  },
  {
    id: 21,
    product: {
      id: 3,
      name: 'Oil'
    },
    quantity: 2,
    oneItemPrice: 30.00,
    createdAt: '09.12.2019',
    type: 'sold'
  }
];

class Archive extends React.Component {
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
      <Fragment>
        <div className='operations-table-wrapper'>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Resource</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.state.operations.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(operation => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={operation.id}>
                      <TableCell>{ operation.id }</TableCell>
                      <TableCell>{ operation.product.name }</TableCell>
                      <TableCell>{ operation.quantity }</TableCell>
                      <TableCell>{ operation.oneItemPrice * operation.quantity }</TableCell>
                      <TableCell>{ operation.createdAt }</TableCell>
                      <TableCell>{ operation.type }</TableCell>
                    </TableRow>
                  );
                })
              }
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={this.state.operations.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Fragment>
    );
  }
}

export default Archive;