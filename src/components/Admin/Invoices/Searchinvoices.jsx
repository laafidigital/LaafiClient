import React, { useEffect, useState } from 'react'
import { StyledTableCell,StyledTableRow } from '../../../Styles/Table';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LocalPrintshopTwoToneIcon from '@mui/icons-material/LocalPrintshopTwoTone';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, IconButton, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { GetInvoiceDetails, GetInvoicesByPatientName, GetLabTransactionbydate, GetPatientTransactionbydate, GetPatientsWithLabTransaction, PostGenerateInvoice, PostPayinvoice } from '../../Store/Actions';
import { useNavigate } from 'react-router-dom';
import { setemptyinvoicesbyname, setemptypaymentpostresult, setemptypostgenerateinvoiceresult } from '../../Store/InvoicesSlice';
import { ToastContainer } from 'react-toastify';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { StyledButton } from '../../../Styles/Button';
import PaymentsTwoToneIcon from '@mui/icons-material/PaymentsTwoTone';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Box } from '@mui/system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Searchinvoices = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const invoicedetailsbyname=useSelector((state)=>state.Invoice.invoicesbypatientname)
    const paymentdetails=useSelector((state)=>state.Invoice.paymentpostresult)



    const[searchvalue,setsearchvalue]=useState()

    useEffect(()=>{
        if(paymentdetails){
            dispatch(GetInvoicesByPatientName(searchvalue))
            dispatch(setemptypaymentpostresult())
        }
    },[searchvalue,paymentdetails])

    const handleinputChange=(e)=>{
      const {name,value}=e.target
      if(value.length>3){
        setsearchvalue(value)
        dispatch(GetInvoicesByPatientName(value))
      }
      if(value.length==0){
        dispatch(setemptyinvoicesbyname())
      }
    }
  return (
    <div className='servicemaindiv'>
    {/* <div className='invoice_btndiv'>
     <StyledButton variant='contained' className='m-2' sx={ { borderRadius: 5,height:30 } }  onClick={()=>navigate('../labinvoice')}>Generate lab invoices</StyledButton>
     <StyledButton variant='contained'  className='m-2' sx={ { borderRadius: 5,height:30 }} onClick={()=>navigate('../invoice')} >consultation invoices</StyledButton>
     <StyledButton variant='contained' className='m-2' sx={ { borderRadius: 5,height:30 } }  >Search invoices</StyledButton>
   </div> */}
   <div className='d-flex'>
     <TextField
       sx={{ m: 1, minWidth: 120, borderRadius: '5px', backgroundColor: 'white' }}
       id="filled-required"
       label=""
       type="text"
       defaultValue=""
       variant="filled"
       name="search"
       style={{ color: 'white' }}
       onChange={handleinputChange}
       InputProps={{
         endAdornment: (
           <InputAdornment position="end">
             <SearchIcon />
           </InputAdornment>
         ),
        //  startAdornment: (
        //    !ispatientwithlab &&(
        //      <InputAdornment position="start">
        //        <CalendarTodayIcon 
        //          style={{ cursor: 'pointer' }} 
        //          onClick={() => setOpen(true)}
        //        />
        //    </InputAdornment>
        //    )
        //  ),
       }}
     />
     
      {/* {ispatientwithlab &&(
      <div className='labinvoice_namediv'>
       <div>
         <h6>{selectedpatient.Name}</h6>
         <IconButton onClick={()=>{
               setselectedpatient(null)
               setispatientwithlab(false)
               setselectedservices([])
           }}>
           <CancelIcon style={{color:'white'}}/>
         </IconButton>
       </div>
      </div>
      )} */}
   </div>
     
 <div>
   <ToastContainer/>
     {invoicedetailsbyname && invoicedetailsbyname.length >0 ?(
 <TableContainer component={Paper} className='tablecontainer_main'>
         <Table sx={{ minWidth: 550 }} aria-label="customized table">
             <TableHead>
             <TableRow>
                 <StyledTableCell align="center">TRANSACTION ID</StyledTableCell>
                 <StyledTableCell align="center">DATE</StyledTableCell>
                 <StyledTableCell align="center">MRN</StyledTableCell>
                 <StyledTableCell align="center">INVOICE NAME</StyledTableCell>
                 <StyledTableCell align="center">PATIENT NAME</StyledTableCell>
                 <StyledTableCell align="center">AMOUNT</StyledTableCell>
                 <StyledTableCell align="center">PAYMENT</StyledTableCell>
             </TableRow>
             </TableHead>
             <TableBody>
                 {invoicedetailsbyname && invoicedetailsbyname.map((item)=>( 
                  <StyledTableRow style={{backgroundColor:item.InvoiceNo!=null ? '#acf5ac':'inherit'}}>
                      <StyledTableCell align="center">{item.Id}</StyledTableCell>
                      <StyledTableCell align="center">{item.InvoiceDate}</StyledTableCell>
                      <StyledTableCell align="center">{item.MRN}</StyledTableCell>
                      <StyledTableCell align="center">{item.InvoiceName}</StyledTableCell>
                      <StyledTableCell align="center">{item.PatientName}</StyledTableCell>
                      <StyledTableCell align="center">{item.InvoiceAmount}</StyledTableCell>
                      <StyledTableCell align="center" >
                        <IconButton disabled={item.InvoiceStatus =='Paid'} onClick={() => {
                          const updateddata={
                            InvoiceNumber:item.Id,
                            razorpayPaymentId:null
                          }
                          dispatch(PostPayinvoice(updateddata))
                          }}>
                            <PaymentsTwoToneIcon style={{color:item.InvoiceStatus =='Paid' ? 'green':'red'}} />
                        </IconButton>
                      </StyledTableCell>
                 </StyledTableRow>
                 ))
                 }
             </TableBody>
             </Table>
 </TableContainer>
     ):(
         <h4>NO INVOICES</h4>
     )}
 </div>
 {/* {selectedservices.length > 0 && (
     <div className='submit-button-container'>
       <div>
         <div className='d-flex'>
           <h5>Total :{calculatetotal}</h5>
           <h5 className='ml-5' style={{color:payment ? 'green':'red',paddingTop:'10px'}}>Paid</h5>
           <Checkbox
             onClick={(e)=>setpayment(e.target.checked)}
           />
         </div>
       <Button
         variant='contained'
         style={{backgroundColor:'black'}}
         onClick={handleSubmit}
       >
         Submit
       </Button>
       </div>
     </div>
   )} */}
</div>
  )
}

export default Searchinvoices
