import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch, useRouteMatch, Link } from 'react-router-dom';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';

import Archive from './Archive';

function Operations() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Route path='/operations'
             render={
               ({ location }) => (
                 <Fragment>
                   <AppBar position="static">
                     <Tabs value={location.pathname} onChange={handleChange}>
                       <Tab label="Operations" value='/operations' component={Link} to='/operations' />
                       <Tab label="Archive" value='/operations/archive' component={Link} to='/operations/archive'/>
                     </Tabs>
                   </AppBar>
                   <Box className='box'>
                     <Switch>
                       <Route exact path='/operations'>Operations</Route>
                       <Route path='/operations/archive'>
                         <Archive />
                       </Route>
                     </Switch>
                   </Box>
                 </Fragment>
               )
             }
      />
    </div>
  );
}

export default Operations;