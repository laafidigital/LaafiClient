import React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/material/styles';

export const StyledDialoge = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
      maxWidth: '1000px',
      overflowX:'hidden',
      overflowY:'hidden',
      maxHeight:'100vh', // Set your desired width here
      padding: 0, // Remove padding
      marginLeft: 0, // Remove margin
    },
  }));
  
  
  
  
  export const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });