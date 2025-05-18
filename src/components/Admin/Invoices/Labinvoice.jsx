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
import { CancelTransaction, GetInvoiceDetails, GetLabTransactionbydate, GetPatientTransactionbydate, GetPatientsWithLabTransaction, PostGenerateInvoice, PostPayinvoice } from '../../Store/Actions';
import { useNavigate } from 'react-router-dom';
import { setemptypaymentpostresult, setemptypostcanceltransaction, setemptypostgenerateinvoiceresult } from '../../Store/InvoicesSlice';
import { ToastContainer } from 'react-toastify';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { StyledButton } from '../../../Styles/Button';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Box } from '@mui/system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';


const Labinvoice = () => {

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const patientswithlabtransaction=useSelector((state)=>state.Invoice.pateintswithlabtransaction)
    const patienttransaction=useSelector((state)=>state.Invoice.patienttransaction)
    const postgenerateinvoiceresult=useSelector((state)=>state.Invoice.postgenerateinvoiceresult)
    const postcanceltransaction=useSelector((state)=>state.Invoice.postcanceltransaction)

    const[filterpatienttransaction,setfilterpatienttransaction]=useState()
    const[selectedservices,setselectedservices]=useState([])
    const[ispatientwithlab,setispatientwithlab]=useState(false)
    const[selectedpatient,setselectedpatient]=useState()
    const[calculatetotal,setcalculatetotal]=useState(0)
    const[payment,setpayment]=useState(false)
    const[selectedDate, setSelectedDate] = useState(null);
    const[properdate,setproperdate]=useState()
    const[Open, setOpen] = useState(false);
    const[selectedmrn,setselectedmrn]=useState()

    useEffect(()=>{
       dispatch(GetPatientsWithLabTransaction(''))
    },[])

    useEffect(()=>{
      if(postgenerateinvoiceresult){
        navigate(`../printinvoice/${postgenerateinvoiceresult}/${'lab'}`)
        dispatch(setemptypostgenerateinvoiceresult())
      }
      if(postcanceltransaction){
        dispatch(GetLabTransactionbydate(selectedmrn,selectedDate==null ? "" : selectedDate))
        dispatch(setemptypostcanceltransaction())
      }
    },[postgenerateinvoiceresult,postcanceltransaction])


    useEffect(()=>{
      if(patientswithlabtransaction && patientswithlabtransaction.length>0 && !ispatientwithlab){
        setfilterpatienttransaction(patientswithlabtransaction)
      }
      if(patienttransaction && ispatientwithlab){
        setfilterpatienttransaction(patienttransaction)
      }
    },[patienttransaction,patientswithlabtransaction,ispatientwithlab])


    const handlePrintIconClick=(mrn)=>{
      navigate(`../printinvoice/${mrn}`)
    }

    const handleinputChange=(e)=>{
        const{name,value}=e.target
        if(ispatientwithlab){
          if(value.trim()===''){
              setfilterpatienttransaction(patienttransaction)
          }
          else{
              setfilterpatienttransaction(patienttransaction.filter((item) => item.PatientName.toLowerCase().includes(value.toLowerCase())))
          }
        }
        else{
          if(value.trim()===''){
            setfilterpatienttransaction(patientswithlabtransaction)
        }
        else{
            setfilterpatienttransaction(patientswithlabtransaction.filter((item) => item.Name.toLowerCase().includes(value.toLowerCase())))
        }
        }
    }

    const handleSendIconClick=(item)=>{
      setispatientwithlab(true)
      setselectedpatient(item)
    
      dispatch(GetLabTransactionbydate(item.MRN,selectedDate==null ? "" : selectedDate))
      setselectedmrn(item.MRN)
    }

    const handleCheckboxChange = (e, data) => {
   
        const isChecked = e.target.checked;
        const serviceAmount = parseFloat(data.ServiceAmount);
        if(isChecked){
            setselectedservices(prv=>[...prv,data.Id])
            setcalculatetotal((prev)=>prev + serviceAmount)
        }
        else{
            setselectedservices(prv=>prv.filter(item=>item!==data.Id))
            setcalculatetotal((prev)=>prev - serviceAmount)
        }
      
    };
    const handleDateChange = (date) => {
      const selectedDate = new Date(date);
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); 
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const formattedselectedDate = `${year}-${month}-${day}`;  
      setproperdate(date)
      setSelectedDate(formattedselectedDate); // Update the state with the formatted date string
    };

    const handleSubmit=()=>{
       const updateddata={
        MRN:selectedpatient.MRN,
        InvoiceName:'Lab',
        InvoiceStatus:payment ? 'Paid':'Unpaid',
        transactionIds:selectedservices
       }
    
       dispatch(PostGenerateInvoice(updateddata))
       setselectedservices([])
       setcalculatetotal(0)
       setpayment(false)
       setispatientwithlab(false)
    }

  return (
    <div className='servicemaindiv'>
       {/* <div className='invoice_btndiv'>
        <StyledButton variant='contained' className='m-2' sx={ { borderRadius: 5,height:30 } }  >Generate lab invoices</StyledButton>
        <StyledButton variant='contained'  className='m-2' sx={ { borderRadius: 5,height:30 }} onClick={()=>navigate('../invoice')} >consultation invoices</StyledButton>
        <StyledButton variant='contained' className='m-2' sx={ { borderRadius: 5,height:30 } }  onClick={()=>navigate('../searchinvoice')}>Search invoices</StyledButton>
      </div> */}
      <div className='d-flex'>
       <Dialog open={Open}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ '.css-1e6y48t-MuiButtonBase-root-MuiButton-root': { display: 'none' } }}>
              <StaticDatePicker
                orientation="landscape"
                disableFuture
                value={properdate}
                onChange={handleDateChange}
              />
              </Box>
            </LocalizationProvider>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>close</Button>
          <Button onClick={()=>{
            setOpen(false)
            dispatch(GetPatientsWithLabTransaction(selectedDate))
            }}>Submit</Button>
        </DialogActions>
       </Dialog>
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
            startAdornment: (
              !ispatientwithlab &&(
                <InputAdornment position="start">
                  <CalendarTodayIcon 
                    style={{ cursor: 'pointer' }} 
                    onClick={() => setOpen(true)}
                  />
              </InputAdornment>
              )
            ),
          }}
        />
        
         {ispatientwithlab &&(
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
         )}
      </div>
        
    <div>
      <ToastContainer/>
        {filterpatienttransaction && filterpatienttransaction.length >0 ?(
    <TableContainer component={Paper} className='tablecontainer_main'>
            <Table sx={{ minWidth: 550 }} aria-label="customized table">
                <TableHead>
                <TableRow>
                  {!ispatientwithlab ?(
                    <>
                    <StyledTableCell align="center">MRN</StyledTableCell>
                    <StyledTableCell align="center">PATIENT NAME</StyledTableCell>
                    <StyledTableCell align="center">ACTION</StyledTableCell>
                    </>
                  ):(
                    <>
                    <StyledTableCell align="center">TRANSACTION ID</StyledTableCell>
                    <StyledTableCell align="center">DATE</StyledTableCell>
                    <StyledTableCell align="center">MRN</StyledTableCell>
                    <StyledTableCell align="center">SERVICE NAME</StyledTableCell>
                    <StyledTableCell align="center">PATIENT NAME</StyledTableCell>
                    <StyledTableCell align="center">AMOUNT</StyledTableCell>
                    <StyledTableCell align="center">GENERATE INVOICE</StyledTableCell>
                    </>
                  )}
                </TableRow>
                </TableHead>
                <TableBody>
                    {filterpatienttransaction && filterpatienttransaction.map((item)=>( 
                     <StyledTableRow style={{backgroundColor:item.InvoiceNo!=null ? '#acf5ac':'inherit'}}>
                      {!ispatientwithlab ?(
                        <>
                         <StyledTableCell align="center">{item.MRN}</StyledTableCell>
                         <StyledTableCell align="center">{item.Name}</StyledTableCell>
                         <StyledTableCell align="center">
                            <IconButton onClick={() => handleSendIconClick(item)}>
                                  <AddIcon color="primary" />
                            </IconButton>
                          </StyledTableCell>
                        </>
                      ):(
                          <>
                         <StyledTableCell align="center">{item.Id}</StyledTableCell>
                         <StyledTableCell align="center">{item.TransactionDate}</StyledTableCell>
                         <StyledTableCell align="center">{item.MRN}</StyledTableCell>
                         <StyledTableCell align="center">{item.Service_PackageName}</StyledTableCell>
                         <StyledTableCell align="center">{item.PatientName}</StyledTableCell>
                         <StyledTableCell align="center">{item.ServiceAmount}</StyledTableCell>
                         {item.InvoiceNo==null?(
                         <StyledTableCell align="center" >
                            <Checkbox
                              name='checkbox'
                              checked={selectedservices.includes(item.Id)}
                              onChange={(e)=>handleCheckboxChange(e,item)}
                            />
                            <IconButton onClick={()=>dispatch(CancelTransaction(item.Id))}>
                              <DeleteTwoToneIcon/>
                            </IconButton>
                         </StyledTableCell>
                         ):(
                          <StyledTableCell align="center" >
                            <IconButton onClick={() => handlePrintIconClick(item.InvoiceNo)}>
                               <LocalPrintshopTwoToneIcon style={{color:'black'}} />
                            </IconButton>
                           {/* <CheckCircleIcon/> */}
                          </StyledTableCell>
                         )}
                        </>
                        
                      )}
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
    {selectedservices.length > 0 && (
        <div className='submit-button-container'>
          <div>
            <div className='d-flex'>
              <h5>Total :{calculatetotal}</h5>
              <h5 className='ml-5' style={{color:payment ? 'green':'red',paddingTop:'10px'}}>Paid</h5>
               {/* <PaymentsTwoToneIcon/> */}
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
      )}
</div>
  )
}

export default Labinvoice
