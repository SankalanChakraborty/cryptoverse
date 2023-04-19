import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

const Loader = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress style={{backgroundColor: "gold"}}/>
    </Box>
  )
}

export default Loader;
