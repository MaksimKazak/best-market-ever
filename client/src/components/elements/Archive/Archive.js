import React, {useEffect, useState} from 'react';
import { toast } from "react-toastify";
import dbPromise from '../../../idb';

import Table from '../Table/Table';
import OperationApi from "../../../api/Operation";

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

function Archive({ user: { isNotAuthenticated } }) {
  let [page, setPage] = useState(initialPage);
  let [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  let [isLoading, setIsLoading] = useState(true);
  let [operations, setOperations] = useState([]);
  let [count, setCount] = useState(0);
  let [db, setDb] = useState(null);

  const fetchData = (newPage, newRowsPerPage) => {
    page = newPage || newPage === 0 ? newPage : page;
    rowsPerPage = newRowsPerPage || rowsPerPage;
    setIsLoading(true);
    if (!isNotAuthenticated) {
      return OperationApi.list({
        page,
        rowsPerPage
      }).then(data => {
        setOperations(data.operations);
        setCount(data.count);
      }).catch(err => {
        if (err && err.response) {
          toast.error(err.response.data.message);
        }
      }).finally(() => {
        setIsLoading(false);
      });
    }
    return getDataFromIdb();
  };

  const getDataFromIdb = async () => {
    const transaction = db.transaction('operations', 'readonly');
    const store = transaction.objectStore('operations');
    let cursor = await store.openCursor();
    let newOperations = [];
    while (cursor) {
      if (cursor.key > page * rowsPerPage && cursor.key <= page * rowsPerPage + rowsPerPage) {
        newOperations.push(cursor.value);
      }
      cursor = await cursor.continue();
    }
    let newCount = await store.count();
    setCount(newCount);
    setOperations(newOperations);
    setIsLoading(false);
  };

  useEffect(() => {
    dbPromise.then(db => setDb(db))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    db && fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db]);

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