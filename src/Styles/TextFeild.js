import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': {
      backgroundColor: 'white',
    },
  }));