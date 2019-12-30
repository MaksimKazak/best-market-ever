import React, {useState} from 'react';

import Table from '../Table/Table';
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
    format: value => `${(+value).toFixed(2)} $`
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
const initialPage = 0;
const initialRowsPerPage = 10;

function Archive({ user: { operations } }) {
  let [page, setPage] = useState(initialPage);
  let [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(initialPage);
  };

  return (
    <Table columns={columns}
           rows={operations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
           page={page}
           count={operations.length}
           rowsPerPage={rowsPerPage}
           handleChangePage={handleChangePage}
           handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
}

export default Archive;