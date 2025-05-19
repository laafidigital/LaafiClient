import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Dialog from '@mui/material/Dialog';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { TextField } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { StyledTableCell,StyledTableRow } from '../../../Styles/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { Button, IconButton } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import { useNavigate } from 'react-router-dom';
import { GetConsultation, GetPatientServices, GetTodaysLabreports, GetTodaysPatient } from '../../Store/Actions';
import { Getdoctorsonly } from '../../Store/ApiReducers/DoctorSchedules';

  

const PublishResult = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const resultdata=useSelector((state)=>state.Results.resultdata)
  const consultationdata=useSelector((state)=>state.Addpatentdetails.consultation)
  const todaysPatient=useSelector((state)=>state.Addpatentdetails.todaysPatient)
  const todayslabResult=useSelector((state)=>state.Results.todaysLabresult)

  const [selectedRow,setselectedRow]=useState(null)
  const [filterdata,setfilterdata]=useState(null)
  const [todaysResult,settodaysResult]=useState()
  const [todayspatients,settodaysPatinet]=useState()
  const [Open,setOpen]=useState(false)
  const [ServiceDetails, setServiceDetails] = useState();

  const currentDate = new Date();
  const currentYear=currentDate.getFullYear()
  const currentMonth=(currentDate.getMonth()+1).toString().padStart(2, '0');
  const currentDay=currentDate.getDate().toString().padStart(2, '0');
  const todaysDate=`${currentYear}-${currentMonth}-${currentDay}`
 


  useEffect(()=>{
    dispatch(GetConsultation())
    dispatch(GetTodaysLabreports())
    dispatch(GetTodaysPatient())
    dispatch(Getdoctorsonly())
    dispatch(GetPatientServices())
  },[])

  useEffect(()=>{
   
    const todaysresultdata=resultdata.filter((item)=>item.creationDate?item.creationDate.split('T')[0] ===todaysDate:null)
    settodaysResult(todaysresultdata)
   
    const filterTodaysPatients = todaysPatient.filter((item) => {
    const hasServicesOrPackage = (item.services?.length ?? 0) > 0 || (item.packageService?.length ?? 0) > 0;     
       return hasServicesOrPackage
   });
   settodaysPatinet(filterTodaysPatients)

   if (filterTodaysPatients.length > 0) {
      const filteredPatients = filterTodaysPatients.filter(item => {
      const isUpdatedData = todayslabResult.filter(innerItem => innerItem.consultID ===  item.consultation.id);
    

      if (isUpdatedData.length > 0) {
      
        const allServicesUpdated = item.services !== null ? item.services.every(service => isUpdatedData.some(data => data.serviceID === (service ?service.id :null))) : false;
        const allPackagesUpdated = item.packageService !== null ? item.packageService.every(pack => pack.every((item)=>isUpdatedData.some(data => data.serviceID === item.service))) : false;   
       
        if (item.packageService !== null && item.services !== null) {
          return allServicesUpdated && allPackagesUpdated;
        } else if (item.packageService !== null) {
          return allPackagesUpdated;
        } else if (item.services !== null) {
          return allServicesUpdated;
        } 
      }
      else {
        return false
      }
      
      });



     if (filteredPatients.length > 0) {
      setfilterdata([...filteredPatients]);
     } 


   }
  },[resultdata,todaysPatient,todayslabResult])

  const ClickViewServices=(consultid)=>{
    setOpen(true)

    const filterResultdata=todaysResult.filter(item=>item.consultID===consultid)
    const filterResultPatient=todayspatients.filter(item=>item.consultation.id===consultid)
    if(filterResultdata){
      setServiceDetails(filterResultdata)
    }

  }

  const handleClose=()=>{
    setOpen(false)
  }

  const onChangesearchInput=(e)=>{
    const {name,value}=e.target

    if(name=='search'){
      if (!value.trim()) {
        setfilterdata(filterdata);
    } else if (!isNaN(value)) {
        const filterbyPhone = filterdata.filter((item) => item.consultation.user.phoneNumber.includes(value));
      
        setfilterdata(filterbyPhone);
    } else {
        const filterByname = filterdata.filter((item) => item.consultation.user.userName.includes(value));
     
        setfilterdata(filterByname);
    }
    }
  }

  const handlePrint=(mrno)=>{
    if(mrno){
  
      navigate(`printresult/${mrno}`)
    }
  }
  return (
    <div className='purchase_main'>
        <div style={{ maxHeight: '70vh', overflowY: 'auto', marginTop:'40px' }}>

        <div className='d-flex justify-content-between'>
        
          <div className='publishresultcolordiv'>
            
                  <div className='d-flex  ml-2 mr-2'>
                          <button className='colorbtn' style={{backgroundColor:'red', border:'solid'}}></button>
                          <p className='pl-2  mb-0'>ABOVE TOXIC VALUE</p>
                  </div>
                 <div className='d-flex ml-2 mr-2 '>
                        <button className='colorbtn ' style={{backgroundColor:'orange', border:'solid'}}></button>
                         <p className='pl-2 mb-0'>ABOVE MAXIMUM VALUE</p>
                  </div>
                  <div className='d-flex  ml-2 mr-2'>
                          <button className='colorbtn' style={{backgroundColor:'white',border:'solid'}}></button>
                          <p className='pl-2  mb-0'>NORMAL</p>
                  </div>
          </div>  
        <div>
        <TextField
           sx={{ m: 1, minWidth: 120, backgroundColor:'white',borderRadius:'5px'}}
           id="filled-required"
           label=""
           type='text'
           defaultValue=""
           variant="filled"
           name='search'
                 // value={inputFieldData.category}
           onChange={onChangesearchInput}
           InputProps={{
              endAdornment: (
              <InputAdornment position="end">
                   <SearchIcon />
               </InputAdornment>
                  ),
              }}
          />    
        </div>
             
        </div>
        {filterdata !==null &&(
        <TableContainer component={Paper} className='tablecontainer_main'>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {/* <StyledTableCell align="right">Transact#</StyledTableCell> */}
            <StyledTableCell align="center">MRN</StyledTableCell>
            <StyledTableCell align="center">PATIENT NAME</StyledTableCell>
            <StyledTableCell align="center">PHONE</StyledTableCell>
            <StyledTableCell align="center">SERVICES</StyledTableCell>
            <StyledTableCell align="center">PRINT</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {/* {patientdata.map((row,index) => ( */}
          {filterdata.map((row, index) => {
            const checkiscritical=todayslabResult.filter((item)=>item.consultID===row.consultation.id)
          
            const isCritical = checkiscritical.some((item) => item.actualValue > item.serv.toxicVal || item.actualValue < item.serv.minVal);
            const isAboveMax = checkiscritical.some((item) => item.actualValue > item.serv.maxVal && item.actualValue < item.serv.toxicVal);
   
            return(
                <StyledTableRow key={index} style={{ backgroundColor: isCritical ? 'red' : (isAboveMax ?'orange':'transparent') }}>
                  <StyledTableCell align="center" style={{color:isCritical || isAboveMax ? 'white' :'black'}}>{row.consultation.mrn}</StyledTableCell>
                  <StyledTableCell align="center" style={{color:isCritical || isAboveMax ? 'white' :'black'}}>{row.consultation.user.userName}</StyledTableCell>
                  <StyledTableCell align="center" style={{color:isCritical || isAboveMax ? 'white' :'black'}}>{row.consultation.user.phoneNumber}</StyledTableCell>
                  <StyledTableCell align="center" style={{color:isCritical || isAboveMax ? 'white' :'black'}}><Button variant='contained' endIcon={<KeyboardDoubleArrowRightIcon/>} onClick={()=>ClickViewServices(row.consultation.id)}>VIEW</Button></StyledTableCell>
                  <StyledTableCell align="center" style={{color:isCritical || isAboveMax ? 'white' :'black'}}>
                    <IconButton onClick={()=>handlePrint(row.consultation.id)}><PrintIcon /></IconButton>
                  </StyledTableCell>
                </StyledTableRow>
            )
              })}
            
           {/* ))}  */}
        </TableBody>
        </Table>
        </TableContainer>
        )}
      <Dialog open={Open}>
        <DialogContent>
         {ServiceDetails && ServiceDetails .length>0 &&(
          <>
        <TableContainer component={Paper} className='tablecontainer_main'>
        <Table  aria-label="customized table" style={{ width: '100px' }}>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Services</StyledTableCell>
            <StyledTableCell align="center" style={{ width: '15%' }}>Price</StyledTableCell>
            <StyledTableCell align="center" style={{ width: '15%' }}>Min Val</StyledTableCell>
            <StyledTableCell align="center" style={{ width: '15%' }}>Max Val</StyledTableCell>
            <StyledTableCell align="center" style={{ width: '15%' }}>Toxic Val</StyledTableCell>
            <StyledTableCell align="center" style={{ width: '15%' }}>Actual</StyledTableCell>
            <StyledTableCell align="center" style={{ width: '15%' }}>Observation</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ServiceDetails.map((item)=>{
            const isAboveToxic = item.actualValue > item.serv.toxicVal || item.actualValue < item.serv.minVal
            const  isaboveMax = item.actualValue > item.serv.maxVal && item.actualValue < item.serv.toxicVal
      
            return(
          <StyledTableRow style={{backgroundColor :isAboveToxic ? 'red' :(isaboveMax ? 'orange' : 'transparent') }}>
            <StyledTableCell align='center' style={{color : isAboveToxic || isaboveMax ? 'white' :'black'}}>{item.serv.serviceName}</StyledTableCell>
            <StyledTableCell align='center' style={{color : isAboveToxic || isaboveMax ? 'white' :'black'}}>{item.serv.price}</StyledTableCell>
            <StyledTableCell align='center' style={{color : isAboveToxic || isaboveMax ? 'white' :'black'}}>{item.serv.minVal}</StyledTableCell>
            <StyledTableCell align='center' style={{color : isAboveToxic || isaboveMax ? 'white' :'black'}}>{item.serv.maxVal}</StyledTableCell>
            <StyledTableCell align='center' style={{color : isAboveToxic || isaboveMax ? 'white' :'black'}}>{item.serv.toxicVal}</StyledTableCell>
            <StyledTableCell align='center' style={{color : isAboveToxic || isaboveMax ? 'white' :'black'}}>{item.actualValue}</StyledTableCell>
            <StyledTableCell align='center' style={{color : isAboveToxic || isaboveMax ? 'white' :'black'}}>{item.observation}</StyledTableCell>
          </StyledTableRow>
            )
          })}
        </TableBody>
        </Table>
        </TableContainer>
          </>
         )}
         </DialogContent>
        <DialogActions>
           <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </Dialog>


        </div>
    </div>
  )
}

export default PublishResult