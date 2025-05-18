import React, { useEffect, useState } from 'react'
import { StyledTableCell,StyledTableRow } from '../../../Styles/Table';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LocalPrintshopTwoToneIcon from '@mui/icons-material/LocalPrintshopTwoTone';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { GetInvoiceDetails, PostPayinvoice } from '../../Store/Actions';
import PaymentsTwoToneIcon from '@mui/icons-material/PaymentsTwoTone';
import { useNavigate } from 'react-router-dom';
import { setemptypaymentpostresult } from '../../Store/InvoicesSlice';
import { ToastContainer } from 'react-toastify';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { StyledButton } from '../../../Styles/Button';


const Invoice = () => {

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const invoicedetails=useSelector((state)=>state.Invoice.invoicedetails)
    const paymentdetails=useSelector((state)=>state.Invoice.paymentpostresult)
    const[filterinvoicedetails,setfilterinvoicedetails]=useState()
    const[invoiceno,setinvoiceno]=useState()

   



    useEffect(()=>{
      if(paymentdetails){
         dispatch(GetInvoiceDetails('','Consultation'))
         dispatch(setemptypaymentpostresult())
        //  navigate(`../printinvoice/${invoiceno}/${'consultation'}`)
       }
       else{
        dispatch(GetInvoiceDetails('','Consultation'))
       
       }
    },[paymentdetails,invoiceno])

    useEffect(()=>{
      if(invoicedetails){
        setfilterinvoicedetails(invoicedetails)
      }
    },[invoicedetails])

    const handlePrintIconClick=(row)=>{
      navigate(`../printinvoice/${row}`)
    }

    const handleinputChange=(e)=>{
      const {name,value}=e.target

      if (value.trim() === '') {
        setfilterinvoicedetails(invoicedetails);
    } else {
        setfilterinvoicedetails(invoicedetails.filter((item) => item.PatientName.toLowerCase().includes(value.toLowerCase())));
    }
    }
  return (
    <div className='servicemaindiv'>
      {/* <div className='invoice_btndiv'>
        <StyledButton variant='contained' className='m-2' sx={ { borderRadius: 5,height:30 } }  onClick={()=>navigate('../labinvoice')}>Generate lab invoices</StyledButton>
        <StyledButton variant='contained'  className='m-2' sx={ { borderRadius: 5,height:30 }}  onClick={()=>navigate("#")}>consultation invoices</StyledButton>
        <StyledButton variant='contained' className='m-2' sx={ { borderRadius: 5,height:30 } }  onClick={()=>navigate('../searchinvoice')}>Search invoices</StyledButton>

      </div> */}
       {/* <TextField
          sx={{ m: 1, minWidth: 120 ,  borderRadius:'5px',backgroundColor: 'white'  }}
          id="filled-required"
          label=""
          type='text'
          defaultValue=""
          variant="filled"
          name='search'
          style={{color:'white'}}
          onChange={handleinputChange}
          InputProps={{
          endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
          ),
          }}
         /> */}
        <div>
          <ToastContainer/>
            {filterinvoicedetails && filterinvoicedetails.length >0 ?(
        <TableContainer component={Paper} className='tablecontainer_main'>
                <Table sx={{ minWidth: 550 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">TRANSACTION ID</StyledTableCell>
                        <StyledTableCell align="center">DATE</StyledTableCell>
                        <StyledTableCell align="center">MRN</StyledTableCell>
                        <StyledTableCell align="center">PATIENT NAME</StyledTableCell>
                        <StyledTableCell align="center">AMOUNT</StyledTableCell>
                        <StyledTableCell align="center">PAY</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {filterinvoicedetails && filterinvoicedetails.map((item)=>(
                         <StyledTableRow>
                             <StyledTableCell align="center">{item.Id}</StyledTableCell>
                             <StyledTableCell align="center">{item.InvoiceDate}</StyledTableCell>
                             <StyledTableCell align="center">{item.MRN}</StyledTableCell>
                             <StyledTableCell align="center">{item.PatientName}</StyledTableCell>
                             <StyledTableCell align="center">{item.InvoiceAmount}</StyledTableCell>
                             <StyledTableCell align="center" >
                             <IconButton onClick={() => {
                              const updateddata={
                                InvoiceNumber:item.Id,
                                razorpayPaymentId:null
                              }
                              // dispatch(PostPayinvoice(updateddata))
                              // setinvoiceno(item.Id)
                              navigate(`../printinvoice/${item.Id}/${'consultation'}`)
                              }}>
                                 <PaymentsTwoToneIcon style={{color:item.Paid ? 'green':'red'}} />
                               </IconButton>
                               {/* <IconButton onClick={() => handlePrintIconClick(item.MRN)}>
                                 <LocalPrintshopTwoToneIcon color="primary" />
                               </IconButton> */}
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
    </div>
  )
}

export default Invoice
