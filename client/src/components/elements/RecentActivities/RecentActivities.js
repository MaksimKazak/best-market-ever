import React, { Fragment, useEffect, useState } from 'react';
import OperationApi from "../../../api/Operation";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

function RecentActivities() {
  let [recentOperations, setRecentOperations] = useState(null);
  useEffect(() => {
    OperationApi.recent()
      .then(recentOperations => {
        setRecentOperations(recentOperations);
      })
  }, []);

  return (
    <Fragment>
      {
        recentOperations ?
          <Box className='box'>
            <Typography variant='h5' className='text-left space-bottom'>Recent activities</Typography>
            {
              Object.entries(recentOperations).map(([resource, resourceOperations]) => (
                Object.entries(resourceOperations).map(([type, quantity]) => (
                  <Typography className='text-left' key={quantity + type + resource}>
                    {quantity} item{quantity > 1 && 's'} of {resource.toLowerCase()} {quantity > 1 ? 'were' : 'was'} {type}
                  </Typography>
                ))
              ))
            }
          </Box>
          :
          <CircularProgress />
      }
    </Fragment>
  );
}

export default RecentActivities;