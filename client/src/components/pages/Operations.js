import React from 'react';
import { BrowserRouter as Route, Switch, useRouteMatch, NavLink } from 'react-router-dom';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';

import Archive from './Archive';

function Operations() {
  let { path } = useRouteMatch();

  return (
    <div>
      <AppBar position="static">
        <Tabs>
          <NavLink to='/operations' className='tab' exact activeClassName='tab-active'>
            <Tab label="Operations" />
          </NavLink>
          <NavLink to='/operations/archive' className='tab' activeClassName='tab-active'>
            <Tab label="Archive" />
          </NavLink>
        </Tabs>
      </AppBar>
      <Box className='box'>
        <Switch>
          <Route exact path={path}>Operations</Route>
          <Route path={`${path}/archive`}>
            <Archive />
          </Route>
        </Switch>
      </Box>
    </div>
  );
}

export default Operations;