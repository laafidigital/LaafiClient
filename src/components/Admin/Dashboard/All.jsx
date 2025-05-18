import React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const All = () => {
  const [value, setValue] = React.useState(dayjs('2022-04-17'));
  const navigate=useNavigate()
  return (
    <div className='Dashboard_maindiv'>
        <div className='d-flex'>
            <Button variant='contained' className='m-2' sx={ { borderRadius: 28 } } onClick={()=>{navigate('../all')}}>All</Button>
            <Button variant='contained'  className='m-2' sx={ { borderRadius: 28 } } onClick={()=>{navigate('../dashboard')}}>Today</Button>
        </div>
        <div className='all_main'>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} /> */}
                <DatePicker
                label="FROM"
                value={value}
                onChange={(newValue) => setValue(newValue)}
                className='mr-5'
                />
                <DatePicker
                label="TO"
                value={value}
                onChange={(newValue) => setValue(newValue)}
                />
            </LocalizationProvider>
          </div>
    </div>
  );
}

export default All;
