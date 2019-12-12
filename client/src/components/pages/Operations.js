import React, { Fragment } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import ArchivePanel from '../elements/Archive';
import OperationsPanel from '../elements/Operations';
import RecentActivities from "../elements/RecentActivities";

function Operations() {
  return (
    <div>
      <Route path='/operations'
             render={
               ({ location }) => (
                 <Grid container spacing={6}>
                   <Grid item xs={8}>
                     <AppBar position="static">
                       <Tabs value={location.pathname} >
                         <Tab label="Operations" value='/operations' component={Link} to='/operations' />
                         <Tab label="Archive" value='/operations/archive' component={Link} to='/operations/archive'/>
                       </Tabs>
                     </AppBar>
                     <Box className='box'>
                       <Switch>
                         <Route exact path='/operations'>
                           <OperationsPanel />
                         </Route>
                         <Route path='/operations/archive'>
                           <ArchivePanel />
                         </Route>
                       </Switch>
                     </Box>
                   </Grid>
                   <Grid item xs={4}>
                     <RecentActivities />
                   </Grid>
                 </Grid>
               )
             }
      />
    </div>
  );
}

export default Operations;