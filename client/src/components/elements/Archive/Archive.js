import React, {useEffect, useState} from 'react';

import Table from '../Table/Table';
import OperationApi from "../../../api/Operation";
import {toast} from "react-toastify";
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

function Archive() {
  let [page, setPage] = useState(initialPage);
  let [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  let [isLoading, setIsLoading] = useState(true);
  let [operations, setOperations] = useState([]);
  let [count, setCount] = useState(0);

  const fetchData = (newPage, newRowsPerPage) => {
    return OperationApi.list({
      page: newPage || newPage === 0 ? newPage : page,
      rowsPerPage: newRowsPerPage || rowsPerPage
    }).then(data => {
      setOperations(data.operations);
      setCount(data.count);
    }).catch(err => {
      if (err && err.response) {
        toast.error(err.response.data.message);
      }
    });
  };

  useEffect(() => {
    Promise.all([
      fetchData(),
      setIsLoading(true)
    ]).then(() => {
      setIsLoading(false);
    });
  }, []);

  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
    setIsLoading(true);
    await fetchData(newPage);
    setIsLoading(false)
  };

  const handleChangeRowsPerPage = async event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    setIsLoading(true);
    await fetchData(0, +event.target.value);
    setIsLoading(false);
  };

  return (
    <Table columns={columns}
           rows={operations}
           page={page}
           count={count}
           rowsPerPage={rowsPerPage}
           isLoading={isLoading}
           handleChangePage={handleChangePage}
           handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
}

export default Archive;