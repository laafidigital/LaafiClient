import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';

export const StyledAppbar = styled(AppBar)(({ theme }) => ({
    backgroundColor:'#408b84', // Apply primary color from the palette
    // height: '72px',             // Set custom height
    paddingTop: '15px', 
  }));