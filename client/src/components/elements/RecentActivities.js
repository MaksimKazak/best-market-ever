import React from 'react';

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

function RecentActivities() {
  return (
    <Box className='box'>
      <Typography variant='h5' className='text-left space-bottom'>Recent activities</Typography>
      <Typography className='text-left'>173 items of wood were bought</Typography>
      <Typography className='text-left'>56 items of oil were sold</Typography>
    </Box>
  );
}

export default RecentActivities;