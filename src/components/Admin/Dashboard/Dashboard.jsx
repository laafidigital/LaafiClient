import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import { useLocation } from 'react-router-dom';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TextField from '@mui/material/TextField';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {useDispatch, useSelector} from 'react-redux'
import Link from '@mui/material/Link';
import { StyledTableCell,StyledTableRow } from '../../../Styles/Table';
import {DialogActions, DialogContent, IconButton } from '@mui/material';
import Doctordashboard from '../../DoctorFrame/Doctordashboard';
import { GetConsultation, GetConsultationById, GetOutPatientReport, GetPatientConsultation, GetPatientServiceByConsultId, GetServicesAndPackagesByconsultID, GetTodaysPatient, GetuserDataById } from '../../Store/Actions';
import { setemptyregisterdpatients, setemptyuserdatabyid, setpatientconsultationdialog } from '../../Store/AddpatientSlice';
import { ToastContainer, toast } from 'react-toastify';
import { setSearchValue } from '../../Store/NurseFrame/SearchNavSlice';
import ConsultationReport from '../Reusablecomponents/ConsultationReport';
import { setreportstatus } from '../../Store/DashboardSlice';
import PatientConsultation from '../Reusablecomponents/PatientConsultation';
import { GetRegisterdPatients } from '../../Store/ApiReducers/Auth';



const StyledDialoge = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    maxWidth: '1000px',
    overflowX:'hidden',
    overflowY:'hidden',
    maxHeight:'100vh', // Set your desired width here
    padding: 0, // Remove padding
    marginLeft: 0, // Remove margin
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const Dashboard = () => {
    
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const patientconsultationdialoge=useSelector((state)=>state.Addpatentdetails.patientconsultationDialog)
  const patientdata=useSelector((state)=>state.Addpatentdetails.consultationarray)
  const consultation=useSelector((state)=>state.Addpatentdetails.consultation)
  const consultationByMrn=useSelector((state)=>state.Addpatentdetails.consultationByMrn)
  const searchvalue=useSelector((state)=>state.SearchNurse.searchValue)
  const todayspatient=useSelector((state)=>state.Addpatentdetails.todaysPatient)
  const patientservicebycid=useSelector((state)=>state.Addpatentdetails.servicesandpackagesbyconsultid)
  const userdatabyid=useSelector((state)=>state.Addpatentdetails.registerdpatients)

  const errors=useSelector((state)=>state.Addpatentdetails.errors)
  // const patientservicebycid=useSelector((state)=>state.Results.patientServiceByCid)


  const [filtermrn,setfiltermrn]=useState(todayspatient && todayspatient.length>0 ? todayspatient :null)
  const [rowpatientdata,setrowpatientdata]=useState()
  const [open,setOpen] =useState(false);
  const [pastDialoge,setpastDialoge]=useState(false)
  const [servicedialoge,setservicedialogebox]=useState(false)
  const [pharmacydialogbox,setpharmacydialogbox]=useState(false)
  const [serviceDialoge,setserviceDialoge]=useState(false)
  const [filterHistory,setfilterHistory]=useState()
  // const [reportstatus,setreportstatus]=useState(false)
  const [consultid,setconultid]=useState()
  
  const {id}=useParams()
  const isDashboardRoute = useLocation().pathname.includes('/admindashboard/dashboard/');
  const isDoctorRoute=useLocation().pathname.includes('/doctordashboard/dashboard/')
  // const IsPatientToday=useLocation().pathname.includes('/admindashboard/todayspatiens')
  const isPatientdetailsChart=useLocation().pathname.includes('/patientdetailschart/dashboard/')
  const isLabdetailsChart=useLocation().pathname.includes('/labdetailschart/dashboard/')
  
  
  const Id = isDashboardRoute && id ? parseInt(id) : undefined;
  const docid=isDoctorRoute && id ? parseInt(id):undefined;
  const newId= isPatientdetailsChart && id ? parseInt(id) : undefined;
  const labId=isLabdetailsChart  && id ? parseInt(id) : undefined;
  
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add 1 to month because it's zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;



  useEffect(() => {
    dispatch(GetTodaysPatient('',''))
}, [patientdata, Id]);


  useEffect(()=>{
    if(todayspatient){
      setfiltermrn(todayspatient)
      if(searchvalue && typeof searchvalue.search==='string'){
        const searchvalueTrimmed = searchvalue.search.trim();
    
        if(searchvalueTrimmed === ''){
         setfiltermrn(todayspatient)
         dispatch(setemptyregisterdpatients())
         dispatch(setemptyuserdatabyid())
        //  dispatch(setSearchValue({ name: 'search', value: 'Patient' }));
        //  dispatch(setSearchValue({ name: 'searchtype', value: 'Patient' }));
         }
        else{
          if(searchvalue.search.length >=1){
            dispatch(setemptyregisterdpatients());
            dispatch(setemptyuserdatabyid());
            dispatch(GetRegisterdPatients(searchvalue.search))
            // isDoctorRoute ? dispatch(GetuserDataById(searchvalue.search,'Patient')) : dispatch(GetuserDataById(searchvalue.search,searchvalue.searchtype))
          }
       }
      }
    }
    if(consultationByMrn){
      setfilterHistory(consultationByMrn)
    }
   
  },[consultation,searchvalue,todayspatient,consultationByMrn])

  useEffect(()=>{
    if(errors){
      if (errors.status === 400) {
        toast('Select type');
      }  else if (errors.status === 500) {
        toast('No such user');
      }
    }
  },[errors])
  





  

  const clickviewpast=(mrn)=>{
    setpastDialoge(true)
    // let array=["Doctor","Patient"]
    dispatch(GetPatientConsultation(mrn))
    dispatch(setpatientconsultationdialog(true))
  }

   const clickviewlink=(mrno)=>{
    setOpen(true);
   const selecteddata=patientdata.filter((item) => item.mrnno === mrno)
 
    setrowpatientdata(selecteddata[0])
  // if (!patientdata.doctordetails) {
  //   dispatch(resetinput())
  // }
  }
  const clickservice=(id)=>{
    setserviceDialoge(true)
    dispatch(GetServicesAndPackagesByconsultID(id))
    // dispatch(GetPatientServiceByConsultId(id))
  }
  //  const clickviewlink=()=>{
  //   navigate(`../viewdetails/${Id}`)
  //  }
  const clickviewservice=(mrno)=>{
    const selecteddata=patientdata.filter((item) => item.mrnno === mrno)

    setservicedialogebox(true)
    setOpen(true);
    setrowpatientdata(selecteddata[0])
  }

  const clickviewpharmacy=(mrno)=>{
    const selecteddata=patientdata.filter((item) => item.mrnno === mrno)
   
    setOpen(true);
    if (selecteddata[0].doctordetails && selecteddata[0].doctordetails.medicindata){
      setrowpatientdata(selecteddata[0].doctordetails.medicindata)
      setservicedialogebox(null)
    }
    else {
      setservicedialogebox(null)
      setrowpatientdata(null)
    }

    setpharmacydialogbox(true)

  }
  
  const handleClose = () => {
    setOpen(false);
    setrowpatientdata(null)
    setservicedialogebox(false)
    setpharmacydialogbox(false)
    setpastDialoge(false)
  };

  const pathname=useLocation().pathname
  const clickBack=()=>{
    switch(true){
      case pathname.includes('/Home'):
      navigate('../admindashboard');
      break;
      case pathname.includes('/doctor'):
      navigate('../doctordashboard');
      break
      case pathname.includes('/nurse'):
      navigate('../nursedashboard');
      break
      case pathname.includes('/pharmacyhome'):
      navigate('../pharmacydashboard');
      break
      case pathname.includes('/receptionhome'):
      navigate('../receptiondashboard');
      break
    }
  }

  return (
    <div className=''>
      <div>
        <ToastContainer/>
        {/* <div className='d-flex pl-5' style={{position:'fixed'}} >
            <Button variant='contained' className='m-2 mainbtn' sx={ { borderRadius: 28 } } onClick={()=>{navigate('all')}}>All</Button>
            <Button variant='contained'  className='m-2 mainbtn' sx={ { borderRadius: 28 } } onClick={()=>{navigate('../dashboard')}}>Today</Button>
        </div> */}
           
        <div className='pt-3 pl-5'>
        <div style={{ maxHeight: '70vh', overflowY: 'auto',marginTop:'50px' }}>
           {/* <div className='d-flex justify-content-end pt-2'>
             <Button startIcon={<ArrowBackIcon/>}  onClick={clickBack} style={{color:'black'}} className='m-2'>Back</Button>
           </div> */}
        <TableContainer component={Paper} className='tablecontainer_main'>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          {userdatabyid ?(
            <TableRow >
            <StyledTableCell align="center">SL</StyledTableCell>
            <StyledTableCell align="center">MRN</StyledTableCell>
            <StyledTableCell align="center">Patient</StyledTableCell>
            <StyledTableCell align="center">Phone</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Past history</StyledTableCell>
          </TableRow>
          ):(
          <TableRow >
            <StyledTableCell align="center">SL</StyledTableCell>
            <StyledTableCell align="center">MRN</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Token</StyledTableCell>
            <StyledTableCell align="center">Doctor</StyledTableCell>
            <StyledTableCell align="center">Patient</StyledTableCell>
            <StyledTableCell align="center">Past history</StyledTableCell>
          </TableRow>
          )}
        </TableHead>
        <TableBody>
        {userdatabyid ? (
          userdatabyid.map((item,index)=>(
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{index+1}</StyledTableCell>
                <StyledTableCell align="center">{item.MRN}</StyledTableCell>
                <StyledTableCell align="center">{item.Name}</StyledTableCell>
                <StyledTableCell align="center">{item.PhoneNumber}</StyledTableCell>
                <StyledTableCell align="center">{item.Email}</StyledTableCell>
                <StyledTableCell align="center">
                  <Link
                    style={{ color:'red' }}
                    component="button"
                    variant="body2"
                    onClick={() => clickviewpast(item.MRN)}
                  >
                    view details
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
          ))
            
          ) : (
            filtermrn !== null ? (
              filtermrn.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">{index+1}</StyledTableCell>
                  <StyledTableCell align="center">{row.MRN}</StyledTableCell>
                  <StyledTableCell align="center">{row.ConsultationDate}</StyledTableCell>
                  <StyledTableCell align="center">{row.Token}</StyledTableCell>
                  <StyledTableCell align="center">{row.DoctorName}</StyledTableCell>
                  <StyledTableCell align="center">{row.PatientName}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Link
                      style={{ color: row.doctordetails ? 'green' : 'red' }}
                      component="button"
                      variant="body2"
                      onClick={() => clickviewpast(row.MRN)}
                    >
                      view details
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              patientdata.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="right">{index+1}</StyledTableCell>
                  <StyledTableCell align="right">{row.MRN}</StyledTableCell>
                  <StyledTableCell align="right">{row.ConsultationDate}</StyledTableCell>
                  <StyledTableCell align="right">{row.Token}</StyledTableCell>
                  <StyledTableCell align="right">{row.DoctorName}</StyledTableCell>
                  <StyledTableCell align="right">{row.PatientName}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Link
                      component="button"
                      variant="body2"
                      style={{ color: row.doctordetails ? 'green' : 'red' }}
                      onClick={() => clickviewlink(id)}
                    >
                      view details
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Link
                      style={{ color: row.doctordetails ? 'green' : 'red' }}
                      component="button"
                      variant="body2"
                    >
                      view details
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Link
                      style={{ color: row.doctordetails ? 'green' : 'red' }}
                      component="button"
                      variant="body2"
                    >
                      view details
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.price}</StyledTableCell>
                </StyledTableRow>
              ))
            )
          )}
        </TableBody>
        </Table>
        </TableContainer>
        </div>
        </div>

        {/* <Dialog open={pastDialoge}>
            <DialogContent>
                {filterHistory && filterHistory.length>0 ?(
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align='center'>DATE</StyledTableCell>
                                <StyledTableCell align='center'>DOCTOR</StyledTableCell>
                                <StyledTableCell align='center'>PATIENT NAME</StyledTableCell>
                                <StyledTableCell align='center'>CONSULTATION REPORT</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        {filterHistory.map((item)=>(
                        <TableBody>
                            <StyledTableRow>
                                <StyledTableCell align='center'>{item.ConsultationDate}</StyledTableCell>
                                <StyledTableCell align='center'>{item.DoctorName}</StyledTableCell>
                                <StyledTableCell align='center'>{item.PatientName}</StyledTableCell>
                                <StyledTableCell align='center'>
                                   <Link
                                    component="button"
                                    variant="body2"
                                    onClick={()=>{
                                      setconultid(item.Id)
                                      dispatch(setreportstatus(true))
                                    }}
                                    style={{color:'blue'}}>
                                    View Report
                                    </Link>
                                </StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                        ))}
                    </Table>
                </TableContainer>
                ):(
                  <p>No history is available for this patient</p>
                )}

            </DialogContent>
            <DialogActions>
            <div className='d-flex'>
                    <Button onClick={handleClose}>close</Button>
                </div>
            </DialogActions>
        </Dialog> */}

        {/* patientservice detals */}
        <Dialog open={serviceDialoge}>
          <DialogContent>
            {patientservicebycid && patientservicebycid.length>0 ?(
          <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align='center'>SERVICE NAME</StyledTableCell>
                                <StyledTableCell align='center'>MIN VALUE</StyledTableCell>
                                <StyledTableCell align='center'>MAX VALUE</StyledTableCell>
                                <StyledTableCell align='center'>TOXIC VALUE</StyledTableCell>
                                <StyledTableCell align='center'>ACTUAL VALUE</StyledTableCell>
                                <StyledTableCell align='center'>OBSERVATION</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        {patientservicebycid.map((item)=>(
                        <TableBody>
                            <StyledTableRow>
                                <StyledTableCell align='center'>{item.serv.serviceName}</StyledTableCell>
                                <StyledTableCell align='center'>{item.serv.minVal}</StyledTableCell>
                                <StyledTableCell align='center'>{item.serv.maxVal}</StyledTableCell>
                                <StyledTableCell align='center'>{item.serv.toxicVal}</StyledTableCell>
                                <StyledTableCell align='center'>{item.actualValue}</StyledTableCell>
                                <StyledTableCell align='center'>{item.observation}</StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                        ))}
                    </Table>
                </TableContainer>
            ):(
              <h5>No service details is available</h5>
            )}
          </DialogContent>
          <DialogActions><Button onClick={()=>setserviceDialoge(false)}>close</Button></DialogActions>
        </Dialog>


        <StyledDialoge
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
           className='dialoge_class'
          >
        {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
        {/* <DialogContent> */}
          {/* <DialogContentText id="alert-dialog-slide-description"> */}
          <div className='dialogeForm '>
            {servicedialoge ===false && (
          <form >
            {rowpatientdata && rowpatientdata.doctordetails ? (
              <div>
              <div className='row ml-5 mr-3 mt-1'>
                <h6 className='col pt-2 diagnosishead'>Patient Name :</h6>
                <div className='col'>
                <TextField
                  required
                  id="filled-required"
                  variant="filled"
                  className='diagnostextfeild'
                  name='patientname'  
                  value={ rowpatientdata.name }
                />
                </div>
             </div>
             <div className='row ml-5 mr-3 mt-1'>
                <h6 className='col pt-2'>Cheif Complaints :</h6>
                <div className='col'>
                <TextField
                 
                  id="filled-required"
                  variant="filled"
                  className='diagnostextfeild'
                  name='cheif_complaints'
                  value={ rowpatientdata.doctordetails.cheif_complaints }
                  
                />
                
                </div>
             </div> 
             <div className='row ml-5 mr-3 mt-1'>
                <h6 className='col pt-2'>HPI :</h6>
                <div className='col'>
                <TextField
                 
                  id="filled-required"
                  variant="filled"
                  className='diagnostextfeild'
                  name='hpi'
                  value={  rowpatientdata.doctordetails.hpi }
            
                />
                </div>
             </div>
             <div className='row ml-5 mr-3 mt-1'>
                <h6 className='col pt-2'>Past History :</h6>
                <div className='col'>
                <TextField
                 
                  id="filled-required"
                  variant="filled"
                  className='diagnostextfeild'
                  name='past_history'
                  value={  rowpatientdata.doctordetails.past_history }
                
                />
                </div>
             </div>
             <div className='row ml-5 mr-3 mt-1'>
                <h6 className='col pt-2'>Family History :</h6>
                <div className='col'>
                <TextField
                 
                  id="filled-required"
                  variant="filled"
                  className='diagnostextfeild'
                  name='family_history'
                  value={ rowpatientdata.doctordetails.family_history }
         

               />
              </div>
             </div>
             <div className='row ml-5 mt-2'>
               <h6 className='col pt-2'>Genral Examination :</h6>
               <div className='col'>
                <TextField
                 
                  label='PULSE'
                  id="filled-required"
                  variant="filled"
                  name='pulse'
                  value={ rowpatientdata.doctordetails.pulse }
               />
              </div>
              <div className='col'>
                <TextField
                 
                  label='BP'
                  id="filled-required"
                  variant="filled"
                  name='bp'
                  value={ rowpatientdata.doctordetails.bp }

               />
              </div>
              <div className='col'>
                <TextField
                 
                  label='R-RATE'
                  id="filled-required"
                  variant="filled"
                  name='r_rate'
                  value={rowpatientdata.doctordetails.r_rate }

               />
              </div>
              <div className='col'>
                <TextField
                 
                  label='TEMPERATURE'
                  id="filled-required"
                  variant="filled"
                  name='temp'
                  value={rowpatientdata.doctordetails.temp }
               

               />
              </div>
              
             </div>
             <div className='row ml-5 mr-3 mt-2'>
                <h6 className='col pt-2'>Systemic Examination :</h6>
                <div className='col'>
                <TextField
                 
                  id="filled-required"
                  variant="filled"
                  className='diagnostextfeild'
                  name='systemic_exam'
                  value={rowpatientdata.doctordetails.systemic_exam }

                />
                </div>
             </div>
             <div className='row ml-5 mr-3 mt-1'>
                <h6 className='col pt-2'>Final Diagnosis :</h6>
                <div className='col'>
                <TextField
                 
                  id="filled-required"
                  variant="filled"
                  className='diagnostextfeild'
                  name='final_diagnosis'
                  value={rowpatientdata.doctordetails.final_diagnosis }
                  

                />
                </div>
             </div>
             <div className='row ml-5 mr-3 mt-1'>
                <h6 className='col pt-2'>Added Services :</h6>
                <div className='col'>
                <TextField
                 
                  id="filled-required"
                  variant="filled"
                  className='diagnostextfeild'
                  name='final_diagnosis'
                  value={rowpatientdata.doctordetails.services.join(', ') }
                 

                />
                </div>
             </div>
             <div className='row ml-5 mr-3 mt-1'>
                <h6 className='col pt-2'>Added Medicines :</h6>
                <div className='col'>
                <TextField
                 
                  id="filled-required"
                  variant="filled"
                  className='diagnostextfeild'
                  name='final_diagnosis'
                  value={rowpatientdata.doctordetails.medicine.join(', ') }
               

                />
                </div>
             </div>
             <div className='d-flex justify-content-center'>
             {/* <Button variant='contained' sx={ {height:33,marginRight:7.5,marginTop:3} }  type='submit'>Submit</Button> */}
             </div>
             </div>
            ) :(
              <div>No doctor details available for this patient.</div>
            )}
             
          </form>
            )}

            {servicedialoge ==true &&(
                <form>
            {servicedialoge && rowpatientdata && rowpatientdata.labdetails ?(
                   <div>
                       <div className='row ml-5 mr-3 mt-1'>
                          <h6 className='col pt-2 diagnosishead'>Patient Name :</h6>
                          <div className='col'>
                        <TextField
                          required
                          id="filled-required"
                          variant="filled"
                          className='diagnostextfeild'
                          name='patientname'
                          value={ rowpatientdata.name }
                        />
                        </div>
                      </div>
                      {rowpatientdata.labdetails.map((item)=>(
                        <div>
                          <div className='row ml-5 mr-3 mt-1'>
                              <h6 className='col pt-2 diagnosishead'>Service Name :</h6>
                              <div className='col'>
                            <TextField
                              required
                              id="filled-required"
                              variant="filled"
                              className='diagnostextfeild'
                              name='patientname'
                              value={ item.servicename }
                            />
                            </div>
                          </div>
                          <div className='row ml-5 mr-3 mt-1'>
                              <h6 className='col pt-2 diagnosishead'>Min Val :</h6>
                              <div className='col'>
                            <TextField
                              required
                              id="filled-required"
                              variant="filled"
                              className='diagnostextfeild'
                              name='patientname'
                              value={ item.min_val }
                            />
                            </div>
                          </div>
                          <div className='row ml-5 mr-3 mt-1'>
                              <h6 className='col pt-2 diagnosishead'>Max Val :</h6>
                              <div className='col'>
                            <TextField
                              required
                              id="filled-required"
                              variant="filled"
                              className='diagnostextfeild'
                              name='patientname'
                              value={ item.max_val }
                            />
                            </div>
                          </div>
                          <div className='row ml-5 mr-3 mt-1'>
                              <h6 className='col pt-2 diagnosishead'>Actual Val :</h6>
                              <div className='col'>
                            <TextField
                              required
                              id="filled-required"
                              variant="filled"
                              className='diagnostextfeild'
                              name='patientname'
                              value={ item.actual }
                            />
                            </div>
                          </div>
                          <div className='row ml-5 mr-3 mt-1'>
                              <h6 className='col pt-2 diagnosishead'>observation :</h6>
                              <div className='col'>
                            <TextField
                              required
                              id="filled-required"
                              variant="filled"
                              className='diagnostextfeild'
                              name='patientname'
                              value={ item.observation }
                            />
                            </div>
                          </div>
                      </div>
                      
                            ))}
                   </div>
            ) :(
              <div>No lab details available for this patient.</div>
              )}
              </form>
            )}

            
            {pharmacydialogbox ==true && (
            <form>
            {pharmacydialogbox && rowpatientdata ?(
              <TableContainer component={Paper} className='tablecontainer_main'>
                 <Table sx={{ minWidth: 700 }} aria-label="customized table">
                   <TableHead>
                    <TableRow >
                    <StyledTableCell align="right">MED Name</StyledTableCell>
                    <StyledTableCell align="right">MED Day</StyledTableCell>
                    <StyledTableCell align="right">MED Time</StyledTableCell>
                    <StyledTableCell align="right">Before/After Food</StyledTableCell>
                    <StyledTableCell align="right">No Of Days</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
          { rowpatientdata.map((item)=>(
             <StyledTableRow >
             <StyledTableCell align="right">{item.medicinename}</StyledTableCell>
             <StyledTableCell align="right" > {item.medicine_day} </StyledTableCell>
             <StyledTableCell align="right">{item.medicine_time}</StyledTableCell>
             <StyledTableCell align="right" > {item.medicine_time_food} </StyledTableCell>
             <StyledTableCell align="right" > {item.no_of_days} </StyledTableCell>
             </StyledTableRow>
          )
          )}
          </TableBody>
          </Table>
          </TableContainer>
           ) :(
            <div>No pharmacy details available for this patient.</div>
            )}
            </form>
          )}
        </div>
      </StyledDialoge>
      </div>
      {patientconsultationdialoge &&(
        <PatientConsultation data={consultationByMrn}/>
      )}

    </div>
  )
}

export default Dashboard