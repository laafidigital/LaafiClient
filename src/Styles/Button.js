import { styled } from '@mui/material/styles';
import { Button } from '@mui/material'
import { purple,lime, amber } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';



export const StyledButton = styled(Button)(({ theme }) => ({
    '&.MuiButton-contained': {
      color: 'white', 
      backgroundColor: '#008080', 
      '&:hover': {
        backgroundColor: 'white', 
        color: 'black',
      },
    },
  }));

  export const StyledButton1 = styled(Button)(({ theme }) => ({
    '&.MuiButton-contained': {
      backgroundColor: 'white', 
      color: 'black', 
    },
  }));

  export const Schedulebutton=styled(Button)(({theme})=>({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: '#ff9100',
    '&:hover': {
      backgroundColor: '#b26500',
    },
  }))

  