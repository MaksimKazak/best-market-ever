import React, { Fragment, useEffect, useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

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
import { toast } from "react-toastify";

function Operations() {
  let [recentOperations, setRecentOperations] = useState(null);
  let [profit, setProfit] = useState(null);
  useEffect(() => {
    Promise.all([OperationApi.recent(), OperationApi.profit()])
      .then(([recentOperations, profit]) => {
        setRecentOperations(recentOperations);
        setProfit(profit);
      })
      .catch(err => {
        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  }, []);

  return (
    <div>
      <Route path='/operations'
             render={
               ({ location }) => (
                 <Fragment>
                   {
                     profit && recentOperations ?
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
                                 <OperationsPanel profit={profit} />
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
                   }
                 </Fragment>
               )
             }
      />
    </div>
  );
}

export default Operations;