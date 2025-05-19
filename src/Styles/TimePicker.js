import { styled } from '@mui/material/styles';
import { width } from '@mui/system';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export  const StyledTimePicker = styled(TimePicker)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
      width:'200px',
      '& fieldset': {
        borderColor: 'black', 
      },
      '&:hover fieldset': {
        borderColor: 'black', 
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '1px',
      borderColor: 'black',
    },
    '& .MuiInputBase-input': {
      color: 'black', 
    },
    '& .MuiSvgIcon-root': {
      color: 'black', 
    },
  }));