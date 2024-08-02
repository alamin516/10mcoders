import React from 'react';
import { DataGrid, GridOverlay } from '@mui/x-data-grid';
import { Typography, Box } from '@mui/material';

const CustomNoRowsOverlay = () => {
  return (
    <GridOverlay>
      <Box sx={{ mt: 1 }}>
        <Typography variant="h6">No user found</Typography>
      </Box>
    </GridOverlay>
  );
};

export default CustomNoRowsOverlay;