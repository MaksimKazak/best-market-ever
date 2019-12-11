import React from 'react';
import { BrowserRouter as Route, Switch, useRouteMatch, NavLink } from 'react-router-dom';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';

import Archive from './Archive';

function Operations() {
  let { path } = useRouteMatch();

  return (
    <div>
      <AppBar position="static">
        <Tabs>
          <NavLink to='/operations'>
            <Tab label="Operations" />
          </NavLink>
          <NavLink to='/operations/archive'>
            <Tab label="Archive" />
          </NavLink>
        </Tabs>
      </AppBar>
      <Switch>
        <Route exact path={path}/>
        <Route path={`${path}/archive`}>
          <Archive />
        </Route>
      </Switch>
    </div>
  );
}

export default Operations;