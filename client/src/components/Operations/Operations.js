import React, { useEffect, useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import dbPromise from '../../idb';
import _ from 'lodash';
import { computeRecent, computeProfit } from './helpers';
import { toast } from "react-toastify";
import { actions } from '../../store/user/userSlice';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CircularProgress from "@material-ui/core/CircularProgress";
import ArchivePanel from '../elements/Archive';
import OperationsPanel from '../elements/Operations';
import RecentActivities from "../elements/RecentActivities";
import OperationApi from "../../api/Operation";

function Operations({ products, user, dispatch }) {
  let { isNotAuthenticated } = user;
  let [recentOperations, setRecentOperations] = useState(null);
  let [profit, setProfit] = useState(null);
  let [isLoading, setIsLoading] = useState(true);
  let [db, setDb] = useState(null);

  const initDb = () => {
    dbPromise.then(db => setDb(db));
  };

  const fetchData = () => {
    setIsLoading(true);
    if (!isNotAuthenticated) {
      return Promise.all([OperationApi.recent(), OperationApi.profit()])
        .then(([recentOperations, profit]) => {
          setRecentOperations(recentOperations);
          setProfit(profit);
        })
        .catch(err => {
          if (err.response) {
            toast.error(err.response.data.message);
          }
        }).finally(() => {
          setIsLoading(false);
        });
    }
    db.getAll('operations')
      .then(operations => {
        setRecentOperations(computeRecent(operations));
        setProfit(computeProfit(operations, products));
        setIsLoading(false);
      });
  };

  const createOperation = (type, resource, quantity) => {
    if (!isNotAuthenticated) {
      return OperationApi.create({ type, resource, quantity })
        .then(operation => {
          toast.success(`${quantity} item${quantity > 1 ? 's': ''} of ${resource.toLowerCase()} successfully sold.`);
          updateState(operation);
        })
        .catch(err => {
          if (err.response) {
            toast.error(err.response.data.message);
          }
        });
    }
    const product = _.find(products, { resource });
    const userResourceQuantity = user.resources[resource];
    let amount = +(product.price * quantity).toFixed(2);
    if (type === 'bought' && user.balance < amount) {
      toast.error('Insufficient funds.');
      return;
    } else if (type === 'sold' && quantity > userResourceQuantity) {
      toast.error('Not enough resources.');
      return;
    }
    const operation = {
      type,
      resource,
      quantity,
      amount,
      createdAt: new Date()
    };
    db.add('operations', operation)
      .then(() => updateState(operation));
  };

  const updateState = ({ type, amount, quantity, resource }) => {
    const diff = type === 'bought' ? -amount : amount;
    updateUser(diff, resource, quantity, type);
    updateProfit(diff, resource);
    updateRecentOperations(resource, type, quantity);
  };

  const updateProfit = (diff, resource) => {
    let profitCopy = _.cloneDeep(profit);
    profitCopy.general += diff;
    profitCopy[resource] += diff;
    setProfit(profitCopy);
  };

  const updateRecentOperations = (resource, type, quantity) => {
    let recentOperationsCopy = _.cloneDeep(recentOperations);
    recentOperationsCopy[resource] = recentOperationsCopy[resource] || {};
    const recentResourceOperationQuantity = recentOperationsCopy[resource][type];
    recentOperationsCopy[resource][type] = recentResourceOperationQuantity ? recentResourceOperationQuantity + quantity : quantity;
    setRecentOperations(recentOperationsCopy);
  };

  const updateUser = (diff, resource, quantity, type) => {
    let userCopy = _.cloneDeep(user);
    userCopy.balance += diff;
    const userResourceQuantity = userCopy.resources[resource];
    if (userResourceQuantity) {
      userCopy.resources[resource] = type === 'bought' ? userResourceQuantity + quantity : userResourceQuantity - quantity;
    } else {
      userCopy.resources[resource] = quantity;
    }
    dispatch(actions.setUser(userCopy));
    if (isNotAuthenticated) {
      db.put('user', userCopy, 'user');
    }
  };

  useEffect(() => {
    initDb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    db && fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db]);


  useEffect(() => {
    // TODO: Save user to idb
  });

  return (
    <div>
      <Route path='/operations'
             render={
               ({ location }) => (
                 !isLoading ?
                   <Grid container spacing={6}>
                     <Grid item xs={12} md={8}>
                       <AppBar position="static">
                         <Tabs value={location.pathname} >
                           <Tab label="Operations" value='/operations' component={Link} to='/operations' />
                           <Tab label="Archive" value='/operations/archive' component={Link} to='/operations/archive'/>
                         </Tabs>
                       </AppBar>
                       <Box className='box'>
                         <Switch>
                           <Route exact path='/operations'>
                             <OperationsPanel profit={profit} createOperation={createOperation} />
                           </Route>
                           <Route path='/operations/archive'>
                             <ArchivePanel />
                           </Route>
                         </Switch>
                       </Box>
                     </Grid>
                     <Grid item xs={12} md={4}>
                       <RecentActivities recentOperations={recentOperations} />
                     </Grid>
                   </Grid>
                   :
                   <CircularProgress />
               )
             }
      />
    </div>
  );
}

export default Operations;