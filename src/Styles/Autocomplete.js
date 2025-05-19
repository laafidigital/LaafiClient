import { styled } from '@mui/system';
import { TextField } from '@mui/material';

export const CustomTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    height: '20px', // Adjust this height as needed
    padding: '0 14px', // Adjust padding as needed
    boxSizing: 'border-box', // Ensure the height includes padding
  },
});