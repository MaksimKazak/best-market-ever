import React, { Fragment, useEffect, useState } from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Product from "./Product";
import OperationApi from '../../../../api/Operation';
import {toast} from "react-toastify";

function Profit({ products }) {
  let [profit, setProfit] = useState(null);
  useEffect(() => {
    OperationApi.profit()
      .then(profit => {
        setProfit(profit);
      })
      .catch(err => {
        if (err.response) {
          toast.error(err.response.data.message);
        }
      })
  }, []);

  return (
    <Fragment>
      {
        profit ?
          <Grid className='space-top-large'>
            <Typography variant='h5' className='text-left'>
              Profit: <Typography className='text-left inline'>{profit.general.toFixed(2)} $</Typography>
            </Typography>
            <div className='space-top-middle text-left'>
              {
                products.map(product => (
                  <Product product={product} profit={profit[product.resource]} key={product.resource} />
                ))
              }
            </div>
          </Grid>
          :
          <CircularProgress />
      }
    </Fragment>
  );
}

export default Profit;