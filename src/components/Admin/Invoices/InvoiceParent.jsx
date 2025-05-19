import React, { useState } from 'react'
import { StyledButton } from '../../../Styles/Button';
import Invoice from './Invoice';
import Labinvoice from './Labinvoice'
import Searchinvoices from './Searchinvoices'
import { Button } from '@mui/material';

const InvoiceParent = () => {
    const[currentComponent,setcurrentcomponent]=useState(<Invoice/>)
    const[selected,setselected]=useState('consultation')

    const OnclickUpdate=(componentName)=>{
        if(componentName==='lab'){
            setcurrentcomponent(<Labinvoice/>)
            setselected(componentName)
        }
        else if(componentName==='consultation'){
            setcurrentcomponent(<Invoice/>)
            setselected(componentName)
        }
        else{
            setcurrentcomponent(<Searchinvoices/>)
            setselected(componentName)
        }
    }

    const getButtonStyles = (buttonName) => ({
      backgroundColor: selected === buttonName ? 'white' : '#008080',
      color: selected === buttonName ? 'black' : 'white',
      borderRadius: 28,
      height: 30,
      '&:hover': {
        backgroundColor: 'white', 
        color: 'black',
      },
  });

  return (
    <div className='Dashboard_maindiv'>
    <div className='d-flex' style={{position:'fixed'}}>
      
        <Button variant='contained' className='m-2'  sx={getButtonStyles('lab')} onClick={()=>{OnclickUpdate('lab')}} >Generate lab invoices</Button>
        <Button variant='contained'  className='m-2' sx={getButtonStyles('consultation')} onClick={()=>{OnclickUpdate('consultation')}} >consultation invoices</Button>
        {/* <Button variant='contained'  className='m-2'  sx={getButtonStyles('search')} onClick={()=>{OnclickUpdate('search')}} >Search invoices</Button> */}
    </div>
    <div>
      {currentComponent}
    </div>
</div>
  )
}

export default InvoiceParent
