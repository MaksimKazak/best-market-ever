import React from 'react';

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

function RecentActivities({ recentOperations }) {
  return (
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
  );
}

export default RecentActivities;