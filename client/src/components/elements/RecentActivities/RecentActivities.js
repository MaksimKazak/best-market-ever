import React from 'react';
import moment from 'moment';
import _ from 'lodash';

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

function RecentActivities({ user: { operations } }) {
  let dayEarlier = moment().subtract(1, 'day');
  // get operations for 1 day and group them by resource
  let recentOperations = _.groupBy(
    operations.filter(operation => moment(operation.createdAt).isAfter(dayEarlier)),
    'resource'
  );

  for (let resource in recentOperations) {
    if (recentOperations.hasOwnProperty(resource)) {
      // group grouped by resource operations by type(sold/bought)
      recentOperations[resource] = _.groupBy(
        recentOperations[resource],
        'type'
      );
      // convert grouped arrays of operations into quantities of items
      for (let type in recentOperations[resource]) {
        if (recentOperations[resource].hasOwnProperty(type)) {
          recentOperations[resource][type] = recentOperations[resource][type].reduce((acc, { quantity }) => acc + quantity, 0);
        }
      }
    }
  }

  return (
    <Box className='box'>
      <Typography variant='h5' className='text-left space-bottom'>Recent activities</Typography>
      {
        Object.entries(recentOperations).map(([resource, resourceOperations]) => (
          Object.entries(resourceOperations).map(([type, quantity]) => (
            <Typography className='text-left' key={quantity + type + resource}>{quantity} items of {resource.toLowerCase()} were {type}</Typography>
          ))
        ))
      }
    </Box>
  );
}

export default RecentActivities;