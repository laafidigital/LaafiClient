import React, { useState,useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { TextField } from '@mui/material';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { Button, IconButton } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {useDispatch, useSelector} from 'react-redux'
import { GetConsultedPatients } from '../Store/Actions';
import { setreportstatus } from '../Store/DashboardSlice';
import ConsultationReport from '../Admin/Reusablecomponents/ConsultationReport';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#008080',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


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
  
  
const Consultedpatients = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()

    const counsultancydata=useSelector((state)=>state.Addpatentdetails.consultationarray)
    const cosnultedpatients=useSelector((state=>state.DiagnosePatient.consultedpatients))
    const reportstatus=useSelector((state)=>state.Dashboard.reportstatus)


    const [filteredpateints,setfilteredpatients]=useState(null)
    const [rowpatientdata,setrowpatientdata]=useState()
    const [viewlabdetails,setviewlabdetails]=useState()
    const [open,setOpen]=useState(false)
    const [consultid,setconsultid]=useState()

    
 
    
    useEffect(() => {
      dispatch(GetConsultedPatients('',''))
      
    }, []); 

    const clickviewlink=(id)=>{
      setconsultid(id)
      dispatch(setreportstatus(true))
       
    }

    const clickviewReportlink=(mrno)=>{
      const selecteddata=counsultancydata.filter((item) => item.mrnno === mrno)
        setOpen(true)
        const labdata=selecteddata.map((item)=>item.labdetails)
        
        setviewlabdetails(labdata[0])
    }

    const handleClose=()=>{
        setOpen(false)
        setrowpatientdata(null)
        setviewlabdetails(null)
    }

    const pathname=useLocation().pathname
    const clickBack=()=>{
      switch(true){
        case pathname.includes('/Home'):
        navigate('../admindashboard');
        break;
        case pathname.includes('/doctor'):
        navigate('../doctordashboard');
        break
      }
    }

  return (
    <div className='Dashboard_maindiv'>
        <div>
        <div className='pt-3 '> 
        
        <div style={{ maxHeight: '70vh', overflowY: 'auto',marginTop:'50px' }}>
            <div className='d-flex justify-content-end pr-5'>
              <Button startIcon={<ArrowBackIcon/>} style={{color:'black'}} onClick={clickBack}>Back</Button>
           </div>
         {cosnultedpatients && cosnultedpatients.length>0 ?(
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow >
            <StyledTableCell align="center">MRN</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Token</StyledTableCell>
            <StyledTableCell align="center">Patient</StyledTableCell>
            {/* <StyledTableCell align="center">Address</StyledTableCell> */}
            <StyledTableCell align="center">Allergy</StyledTableCell>
            <StyledTableCell align="center">Report</StyledTableCell>
            {/* <StyledTableCell align="center">View Diagnosis</StyledTableCell>
            <StyledTableCell align="center">View Lab Report</StyledTableCell> */}

          </TableRow>
        </TableHead>
        {cosnultedpatients && cosnultedpatients.length>0 && (
                            <TableBody>
                                {cosnultedpatients.map((row, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell align="center">{row.MRN}</StyledTableCell>
                                        <StyledTableCell align="center">{row.ConsultationDate}</StyledTableCell>
                                        <StyledTableCell align="center">{row.Token}</StyledTableCell>
                                        <StyledTableCell align="center">{row.PatientName}</StyledTableCell>
                                        {/* <StyledTableCell align="center">{row.address}</StyledTableCell> */}
                                        <StyledTableCell align="center">{row.Allergy}</StyledTableCell>
                                        {/* {row.services.length > 0 && (
                                            <StyledTableCell align="center">
                                                {row.services.map((serv, index) => (
                                                <div key={index}>{serv}</div>
                                                ))}
                                            </StyledTableCell>
                                            )} */}
                                            <StyledTableCell align="center">
                                                <Link
                                                style={{ color: row.doctordetails ? 'green' : 'red' }}
                                                component="button"
                                                variant="body2"
                                                onClick={()=>{clickviewlink(row.Id)}}
                                                >
                                                view details
                                               </Link>
                                            </StyledTableCell>
                                            {/* <StyledTableCell align="center">
                                                <Link
                                                style={{ color: row.labdetails ? 'green' : 'red' }}
                                                component="button"
                                                variant="body2"
                                                onClick={()=>{clickviewReportlink(row.mrnno)}}
                                                >
                                                view Report
                                               </Link>
                                            </StyledTableCell> */}
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        )}
        </Table>
        </TableContainer>
         ):(
          <h3>NO CONSULTED PATIENTS </h3>
         )}  

        <StyledDialoge
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          //  className='dialoge_class'
          >
        {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
        {/* <DialogContent> */}
          {/* <DialogContentText id="alert-dialog-slide-description"> */}
          <div className='dialogeForm '>
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
              <div></div>
            )}
             
          </form>
          
            <form>
            { rowpatientdata ?(
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
          { rowpatientdata.doctordetails.medicindata.map((item)=>(
                <TableBody>
             <StyledTableRow >
             <StyledTableCell align="right">{item.medicinename}</StyledTableCell>
             <StyledTableCell align="right" > {item.medicine_day} </StyledTableCell>
             <StyledTableCell align="right">{item.medicine_time}</StyledTableCell>
             <StyledTableCell align="right" > {item.medicine_time_food} </StyledTableCell>
             <StyledTableCell align="right" > {item.no_of_days} </StyledTableCell>
             </StyledTableRow>
          </TableBody>
          )
          )}
          </Table>
          </TableContainer>
           ) :(
            <div></div>
            )}
            </form>

            <form>
            {viewlabdetails ?(
                   <div>
                    <TableContainer component={Paper} className='tablecontainer_main'>
                 <Table sx={{ minWidth: 700 }} aria-label="customized table">
                   <TableHead>
                    <TableRow >
                    <StyledTableCell align="right">Service Name</StyledTableCell>
                    <StyledTableCell align="right">Min Val</StyledTableCell>
                    <StyledTableCell align="right">Max Val</StyledTableCell>
                    <StyledTableCell align="right">Actual Val</StyledTableCell>
                    <StyledTableCell align="right">Observation</StyledTableCell>
                  </TableRow>
                </TableHead>                    
                      {viewlabdetails.map((item)=>(
                        <TableBody>
                          <StyledTableCell align="right">{ item.servicename }</StyledTableCell>
                          <StyledTableCell align="right">{ item.min_val }</StyledTableCell>
                          <StyledTableCell align="right">{ item.max_val }</StyledTableCell>
                          <StyledTableCell align="right">{ item.actual }</StyledTableCell>
                          <StyledTableCell align="right">{ item.observation }</StyledTableCell>
                        </TableBody>                     
                            ))}
                            </Table>
                   </TableContainer>
                   </div>                  
            ) :(
              <div></div>
              )}
              </form>
            </div>
            </StyledDialoge>
        </div>    
        </div>
        </div>

        {reportstatus &&(
        <ConsultationReport data={consultid}/>
      )}

    </div>
  )
}

export default Consultedpatients