import React, { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { StyledTableCell,StyledTableRow } from '../../../Styles/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import { Checkbox, IconButton, ListItemText } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import {Button} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { TextField } from '@mui/material';
import { GetConsultation, GetDocShecduleById, GetIncompleteServiceResult, GetPatientServices, GetPatientsWithServices, GetServicesAndPackagesByconsultID, GetTodaysLabreports, GetTodaysPatient, GetUserById, PostPatientServices, PostPatientTransaction } from '../../Store/Actions';
import { ToastContainer } from 'react-toastify';
import { setresetpostresult } from '../../Store/ResultSlice';
import { Getdoctorsonly } from '../../Store/ApiReducers/DoctorSchedules';

export const StyledSelect = styled(Select)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'black', // Set the border color to white
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
  '& .MuiOutlinedInput-notchedOutline': {
    borderWidth: '1px',
    borderColor: 'balck', // Set the border color to white
  },
}));


const UpdateResult = () => {

    const dispatch=useDispatch() 
    const getusers=useSelector(state=>state.Assignrole.userresult)
    const getuserById=useSelector((state)=>state.Profiledata.profiledata)
    const getdoctors=useSelector((state)=>state.Adddoctor.doctors)
    const labdetails=useSelector(state=>state.Addservices.addServicesArray)
    const resultdata=useSelector((state)=>state.Results.resultdata)
    const postresult=useSelector((state)=>state.Results.postresult)
    const searchvalue=useSelector((state)=>state.SearchNurse.searchValue)
    const todayslabResult=useSelector((state)=>state.Results.todaysLabresult)
    const patientservicebycid=useSelector((state)=>state.Addpatentdetails.servicesandpackagesbyconsultid)
    const todaysPatient=useSelector((state)=>state.Addpatentdetails.patientsWithServices)
    const incomplteservices=useSelector((state)=>state.Results.incompleteServices)

    const currentDate = new Date();
    const currentYear=currentDate.getFullYear()
    const currentMonth=(currentDate.getMonth()+1).toString().padStart(2, '0');
    const currentDay=currentDate.getDate().toString().padStart(2, '0');
    const todaysDate=`${currentYear}-${currentMonth}-${currentDay}`
   


    const [rowServices,setrowServices]=useState()
    const [rowPackages,setrowPackages]=useState()
    const [inputValues,setinputValues]=useState()
    const [serviceDetails, setServiceDetails] = useState([]);
    const [error,seterror]=useState()
    const [filterpatient,setfilterpatient]=useState()
    const [patientServices,setpatientServices]=useState([])
    const [patientPackage,setpatientPackage]=useState([])
    const [overallServiceResult,setoverallServiceResult]=useState([])
    const [specimen,setspecimen]=useState([])
    const [open, setOpen]=useState(false);
    const [todaysfilterresult,settodaysfilterresult]=useState()
    const [isPostResultProcessed, setPostResultProcessed] = useState(false);
    const [searchFilter,setsearchFilter]=useState(filterpatient)
    const [inputData,setinputData]=useState()
    const [consultID,setconsultID]=useState()
    const [loopController,setloopcontroller]=useState(false)



    useEffect(()=>{
      dispatch(Getdoctorsonly())
   
      dispatch(GetPatientsWithServices())
      dispatch(GetTodaysLabreports())
      if (postresult && !isPostResultProcessed) { 
        let array=['Patient','Doctor']
        dispatch(GetPatientsWithServices(array))
     
        setPostResultProcessed(true); 
       }
        else if (!postresult && isPostResultProcessed) { 
        setPostResultProcessed(false);
       }
    },[postresult,isPostResultProcessed,dispatch])

    

       useEffect(()=>{
        if(todaysPatient.length > 0){
          setfilterpatient(todaysPatient)
        }
        if(consultID && postresult.length>0){
    
          dispatch(GetIncompleteServiceResult(consultID.id,consultID.Array))
          dispatch(setresetpostresult())
          setloopcontroller(false)
        }
       },[todaysPatient,consultID,loopController,postresult])
    

    useEffect(()=>{
      if(searchvalue && typeof searchvalue.search==='string'){
   
        const searchvalueTrimmed = searchvalue.search.trim();
    
        if(searchvalueTrimmed === ''){
          setsearchFilter(filterpatient)
        }
        else{
          setsearchFilter(filterpatient.filter((item)=>{
            if (item.patient && typeof item.patient.name === 'string') {
             return item.patient.name.trim().toLowerCase().includes(searchvalueTrimmed.toLowerCase())
            }
            return false
          }))
        }
      }
      else{
         setsearchFilter(filterpatient)
      }
    },[searchvalue,filterpatient,patientservicebycid])

    useEffect(()=>{
      if(incomplteservices && incomplteservices.length>0){
        let updatedrowservice=[]
        let updatedrowPackages=[]
          {incomplteservices.forEach((service,index)=>{
            if(service.serv !==null && service.pkg ==null){
              updatedrowservice.push(service)
            }
            else if(service.pkg !==null){
              updatedrowPackages.push(service)
            }
            else{
              updatedrowPackages.push(service)
            }
          })}
          setrowServices(updatedrowservice)
          setrowPackages(updatedrowPackages)
        
      }
    },[patientservicebycid,incomplteservices])

  
    

     const getTotalPrice = (selectedServices) => {
      
        let totalPrice = 0;
        let minVal = 0;
        let maxVal = 0;
       
        
      
        if (selectedServices && selectedServices.length > 0) {
          selectedServices.forEach((service) => {
            const serviceData = labdetails.find((item) => item.servicename === service);
        
            if(serviceData){
         
              totalPrice += parseFloat(serviceData.price);
                minVal += parseFloat(serviceData.min_val);
                maxVal += parseFloat(serviceData.max_val);
                  }
                });
              }
              return{
                totalPrice: totalPrice.toFixed(2),
                minVal: minVal.toFixed(2),
                maxVal: maxVal.toFixed(2),
              }
              };


    const handleClickOpen = (row,services,packages) => {

      let array=['Service','Package']
      // dispatch(GetServicesAndPackagesByconsultID(row.id))
      dispatch(GetIncompleteServiceResult(row.id,array))
      setconsultID({id:row.id,Array:array})

   
      setoverallServiceResult([])

      setinputValues(prev=>{
        const updatedInputvalue={
          consultID:row.id,
          mrn:row.mrn,
        }
        return (updatedInputvalue)
      })
     
      setOpen(true)
 };


   const handleClose = () => {
      setconsultID(null)
      setOpen(false);
    };

   const handleresult=(e,TransID)=>{
    const { name, value } = e.target;
 

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add 1 to month because it's zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    setinputData({
      ...inputData,
      id:TransID,
      completionDate:formattedDate,
     [name]:value})
   } 
        


const submitValues=(e)=>{
  e.preventDefault()
  const updatedData={
    ...inputData,
    serviceStatus:true,
  }
  dispatch(PostPatientTransaction(updatedData))
  setloopcontroller(true)
}


  return (
    <div className='purchase_main'>
        <div style={{ maxHeight: '70vh', overflowY: 'auto', marginTop:'40px' }}>
          <ToastContainer/>
        <div className='error-message_addpatient'>{error}</div>
        {searchFilter  && searchFilter.length>0 ?(
          <>
        <TableContainer component={Paper} className='tablecontainer_main'>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">MRN</StyledTableCell>
            <StyledTableCell align="center">PATIENT NAME</StyledTableCell>
            <StyledTableCell align="center">PHONE</StyledTableCell>
            <StyledTableCell align="center">ACTION</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchFilter.map((row,index) => (
          <StyledTableRow key={index} >
        
              <StyledTableCell align="center">{row.MRN}</StyledTableCell>
              <StyledTableCell align="center">{row.UserName}</StyledTableCell>
              <StyledTableCell align="center">{row.PhoneNumber}</StyledTableCell>
              <StyledTableCell align="center"><IconButton onClick={()=>handleClickOpen(row,row.services,row.packageService)}><AddIcon style={{color:'blue'}}/></IconButton></StyledTableCell>
          </StyledTableRow>
           ))} 
        </TableBody>
        </Table>
        </TableContainer>
          </>
        ):(
          <h3>NO RESULTS TO PUBLISH TODAY</h3>
        )} 
        </div>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title" color={'inherit'} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  Lab Services
                  {/* <div>{currentDateTime}</div> */}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {rowServices && rowServices.length>0 && (
                    <>
                      <h6 className='d-flex justify-content-end'>SERVICES</h6>
                  <TableContainer component={Paper}  >
                        <Table  aria-label="customized table" style={{width:'500px'}} >
                            <TableHead >
                                <TableRow >
                                    <StyledTableCell align="center" >Services</StyledTableCell>
                                    <StyledTableCell align="center"style={{ width: '15%' }}>Price</StyledTableCell>
                                    <StyledTableCell align="center"  style={{ width: '15%' }}>Min Val</StyledTableCell>
                                    <StyledTableCell align="center" style={{ width: '15%' }}>Max Val</StyledTableCell>
                                    <StyledTableCell align="center"  style={{ width: '15%' }}>Toxic Val</StyledTableCell>
                                    <StyledTableCell align="center" style={{ width: '15%' }}>Specimen</StyledTableCell>
                                    <StyledTableCell align="center" style={{ width: '15%' }}>Actual</StyledTableCell>
                                    <StyledTableCell align="center" style={{ width: '15%' }}>Observation</StyledTableCell>
                                    <StyledTableCell align="center" style={{ width: '15%' }}>Action</StyledTableCell>
                                </TableRow> 
                            </TableHead>
                            <TableBody>
                              {rowServices.map((item,index)=>(
                                <StyledTableRow key={item.id}>
                                  <StyledTableCell align='center'>{item.service && item.service.serviceName}</StyledTableCell>
                                  <StyledTableCell align='center'>{item.service && item.service.price}</StyledTableCell>
                                  <StyledTableCell align='center'>{item.service &&item.service.minVal}</StyledTableCell>
                                  <StyledTableCell align='center'>{item.service && item.service.maxVal}</StyledTableCell>
                                  <StyledTableCell align='center'>{item.service && item.service.toxicVal}</StyledTableCell>
                                  <StyledTableCell align='center'>
                                  <StyledSelect
                                    style={{borderRadius:'5px',border:'none',height:'40px',width:'130px'}} 
                                    name='specimen'
                                    multiple
                                    value={specimen.find(spec => spec.index === index)?.speci || []}
                                    renderValue={(selected)=>selected.join(",")}
                                    onChange={(e)=>handleresult(e,item.id)}
                                  >
                                    { item.specimen && item.specimen.split(",").map((specimenValue)=>(
                                       <MenuItem value={specimenValue.trim()}>
                                        <Checkbox   checked={specimen.find(spec => spec.index === index)?.speci.includes(specimenValue.trim()) || false}/>
                                        <ListItemText primary={specimenValue.trim()}/>
                                       </MenuItem>
                                    ))}
                                  </StyledSelect>
                                  </StyledTableCell>
                                  <StyledTableCell align='center'>
                                    <TextField
                                        required
                                        type='text'
                                        variant="filled"
                                        name='actualValue'
                                        style={{width:"100px"}}
                                        // name={`actual-${item.id}`}
                                        // value={inputValues[`actual-${item.id}`] || ''}
                                        onChange={(e)=>handleresult(e,item.id)}/>
                                  </StyledTableCell>
                                  <StyledTableCell align='center'>
                                  <select class="form-select form-select-lg mb-3" aria-label="Default select example" style={{borderRadius:'5px',border:'none',width:'80px',height:'50px'}} 
                                         name='observation'
                                      // name={`observation${item.id}`}
                                      // value={inputValues[`observation-${item.id}`] || ''}
                                      placeholder='observation' 
                                      onChange={(e)=>handleresult(e,item.id)}
                                       >
                                          <option selected></option>
                                          <option value="furthur_blood_test">Furthur Blood Test</option>
                                          <option value="normal">Normal</option>
                                          <option value="test">Test</option>
                                      </select>
                                  </StyledTableCell>
                                  <StyledTableCell><Button variant='contained' onClick={submitValues}> submit</Button></StyledTableCell>
                                </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </>
                              )}
                    
                    {rowPackages && rowPackages.length > 0 && (
                      <>
                      <h6 className='d-flex justify-content-end'>PACKAGES</h6>
                                <TableContainer component={Paper}>
                                  {rowPackages.map((item, index) => {
                                
                                    return(
                                    <Table key={index} aria-label="customized table" style={{ width: '100px' }}>
                                      <TableHead>
                                        <TableRow>
                                          <StyledTableCell align="center">Services</StyledTableCell>
                                          <StyledTableCell align="center" style={{ width: '15%' }}>Price</StyledTableCell>
                                          <StyledTableCell align="center" style={{ width: '15%' }}>Min Val</StyledTableCell>
                                          <StyledTableCell align="center" style={{ width: '15%' }}>Max Val</StyledTableCell>
                                          <StyledTableCell align="center" style={{ width: '15%' }}>Toxic Val</StyledTableCell>
                                          <StyledTableCell align="center"  style={{ width: '15%' }}>Specimen</StyledTableCell>
                                          <StyledTableCell align="center" style={{ width: '15%' }}>Actual</StyledTableCell>
                                          <StyledTableCell align="center" style={{ width: '15%' }}>Observation</StyledTableCell>
                                          <StyledTableCell align="center" style={{ width: '15%' }}>Action</StyledTableCell>
                                        </TableRow>
                                      </TableHead>
                                      {/* {item.map((innerItem, innerIndex) => ( */}
                                        <TableBody key={index}>
                                          <StyledTableRow>
                                            <StyledTableCell align='center'>{item.serv && item.serv.serviceName}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.serv && item.serv.price}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.serv&& item.serv.minVal}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.serv && item.serv.maxVal}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.serv && item.serv.toxicVal}</StyledTableCell>
                                            <StyledTableCell align='center'>
                                             <StyledSelect
                                              style={{borderRadius:'5px',border:'none',height:'40px',width:'130px'}} 
                                              name='specime'
                                              multiple
                                              value={specimen.speci}
                                              renderValue={(selected)=>selected.join(",")}
                                              onChange={(e)=>handleresult(e,item.id)}
                                             >
                                              {item.specimen && item.specimen.split(",").map((specimenValue)=>(
                                                   <MenuItem value={specimenValue.trim()}>
                                                     <Checkbox checked={specimen.speci.some((item)=>item==specimenValue.trim())}/>
                                                    <ListItemText primary={specimenValue.trim()}/>
                                                   </MenuItem>
                                              ))}
                                             </StyledSelect>
                                             </StyledTableCell>
                                            <StyledTableCell align='center'>
                                              <TextField
                                                required
                                                id="filled-required"
                                                label=""
                                                type='text'
                                                defaultValue=""
                                                variant="filled"
                                                name='actualValue'
                                                style={{width:"100px"}}
                                                onChange={(e) => handleresult(e,item.id)} 
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell align='center'>
                                              <select
                                                className="form-select form-select-lg mb-3"
                                                aria-label="Default select example"
                                                style={{ borderRadius: '5px', border: 'none', width: '80px', height: '50px' }}
                                                name='observation'
                                                onChange={(e) => handleresult(e,item.id)}
                                                >
                                                <option selected></option>
                                                <option value="furthur_blood_test">Furthur Blood Test</option>
                                                <option value="normal">Normal</option>
                                                <option value="test">Test</option>
                                              </select>
                                            </StyledTableCell>
                                            <StyledTableCell><Button variant='contained' onClick={submitValues}> submit</Button></StyledTableCell>
                                          </StyledTableRow>
                                        </TableBody>
                                      {/* // ))} */}
                                    </Table>
                                    )
                                    }
                                  )}
                                </TableContainer>
                                </>
                              )}
                      
          </DialogContentText>
        </DialogContent>
        
        <DialogActions className='d-flex justify-content-between pl-4 pr-4'>
          <Button onClick={handleClose} autoFocus>
           close
          </Button>
          {/* <Button autoFocus onClick={submitValues}>Submit</Button> */}
        </DialogActions>
      </Dialog>
      
    </div>
  )
}

export default UpdateResult