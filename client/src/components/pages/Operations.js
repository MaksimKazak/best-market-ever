import React from 'react';
import { BrowserRouter as Route, Switch, useRouteMatch } from 'react-router-dom';

import Archive from './Archive';

function Operations() {
  let { path } = useRouteMatch();

  return (
    <div>
      Operations
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