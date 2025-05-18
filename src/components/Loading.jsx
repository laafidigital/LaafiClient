import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';

export default function SimpleBackdrop() {
  const loading=useSelector(state=>state.loading.loading)
  
  

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: 2000 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}