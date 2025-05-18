
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';

export const StyledSelect = styled(Select)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white', // Set the border color to white
      },
      '&:hover fieldset': {
        borderColor: 'white', // Set the border color to white on hover
      },
    },
    '& .MuiSelect-select': {
      color: 'white', // Set the text color to white
      '&:focus': {
        backgroundColor: 'transparent', // Set the background color to transparent when focused
      },
    },
    '& .MuiSelect-icon': {
      color: 'white', // Set the dropdown icon color to white
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '1px',
      borderColor: 'white', // Set the border color to white
    },
  }));




 export const StyledSalesSelect = styled(Select)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white', // Set the border color to white
      },
      '&:hover fieldset': {
        borderColor: 'white', // Set the border color to white on hover
      },
    },
    '& .MuiSelect-select': {
      color: 'black', // Set the text color to white
      '&:focus': {
        backgroundColor: 'transparent', // Set the background color to transparent when focused
      },
    },
    '& .MuiSelect-icon': {
      color: 'white', // Set the dropdown icon color to white
    },
  }));