import React, { useState,useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { Button, Dialog, DialogActions, DialogContent, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import {useDispatch, useSelector} from 'react-redux'
import { StyledTableCell,StyledTableRow } from '../../Styles/Table';
import { GetConsultation, GetPatientConsultation, GetTodaysPatient, PostConsultation, PostNurseUpdates, PostUpdateConsultaion, PutUpdateConsultaion } from '../Store/Actions';
import { ToastContainer } from 'react-toastify';
import { setLoading } from '../Store/LoadingSlice';
import { setpatientconsultationdialog } from '../Store/AddpatientSlice';
import PatientConsultation from '../Admin/Reusablecomponents/PatientConsultation';



const DocMypatients = () => {

   const navigate=useNavigate()
   const dispatch=useDispatch()

   const patientconsultationdialoge=useSelector((state)=>state.Addpatentdetails.patientconsultationDialog)
   const consultationByMrn=useSelector((state)=>state.Addpatentdetails.consultationByMrn)
//    const consultation=useSelector((state)=>state.Addpatentdetails.consultation)
   const searchvalue=useSelector((state)=>state.SearchNurse.searchValue)
   const todaysPatients=useSelector((state)=>state.Addpatentdetails.todaysPatient)

   const [filteredpateints,setfilteredpatients]=useState()
   const [inputValue,setinputValue]=useState({patientComplaint:'',systolic:'',diastolic:'',temp:'',pulse:'',respRate:'',weight:'',si02:''})
   const [Open,setOpen]=useState(false)
   const [selectedRow,setselectedRow]=useState()
   const [historyDialoge,sethistoryDialoge]=useState(false)
   const [filterHistory,setfilterHistory]=useState()
   const [reload,setreload]=useState(false)

   const currentDate = new Date();
   const year = currentDate.getFullYear();
   const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
   const day = String(currentDate.getDate()).padStart(2, '0');
   const formattedDate = `${year}-${month}-${day}`;
   

   useEffect(()=>{
    dispatch(GetTodaysPatient('','out_patient'))
   },[])
  
    
    // useEffect(() => {
    //     if(searchvalue && typeof searchvalue.search==='string'){
    //         const searchvalueTrimmed = searchvalue.search.trim();
    //         if(searchvalueTrimmed===''){
    //             setfilteredpatients (todaysPatients.filter((item) => {
    //                 return item.consultation.patientType==='out_patient' && item.consultation.systolic===null && item.consultation.diastolic===null
    //                }))
    //         }
    //         else{
    //             setfilteredpatients(todaysPatients.filter((item) => {
    //                 return item.consultation.patientType==='out_patient' && item.consultation.user.userName.trim().toLowerCase().includes(searchvalueTrimmed.toLowerCase())
    //                 && item.consultation.systolic===null && item.consultation.diastolic===null
    //                }))
    //         }
    //     }
    //     else{
    //         setfilteredpatients(todaysPatients.filter((item) => {
    //             return item.consultation.patientType==='out_patient'&& item.consultation.systolic===null && item.consultation.diastolic===null
    //            }))
    //     }
    // }, [consultation,searchvalue]); 

    const handleChangeInput=(e)=>{
        const {name,value}=e.target
        if(name==='patientComplaint'){
            setinputValue((prev)=>({
              ...prev,
              [name]:value
            }))
        }
        else{
            const val=parseInt(value)
            setinputValue((prev)=>({
                ...prev,
                [name]:val
              }))
        }
      }

    const hangleClickDiagnose=(row)=>{
      setOpen(true)
      setselectedRow(row)
    }

    
    const handleClose=()=>{
        setOpen(false)
        sethistoryDialoge(false)
    }
// history view details
    const handleViewDetails=(mrn)=>{
        dispatch(GetPatientConsultation(mrn))
        dispatch(setpatientconsultationdialog(true))
        
    }

 // service view details 
    const handleServiceView=(id)=>{

    }


    const submitForm=(e)=>{
        e.preventDefault()
        const updatedData={
           Pulse:inputValue.pulse ? inputValue.pulse:null,
           Temperature:inputValue.temp ? inputValue.temp : null,
           RespiratoryRate:inputValue.respRate ? inputValue.respRate: null,
           OxygenSaturation:inputValue.si02 ? inputValue.si02 :null,
           Weight:inputValue.weight ? inputValue.weight:null,
           Systolic:inputValue.systolic ? inputValue.systolic : null,
           Diastolic:inputValue.diastolic ? inputValue.diastolic :null,
        }
        const chiefComplaint=inputValue.patientComplaint ? inputValue.patientComplaint :null
        const consultid=selectedRow.Id
      
        dispatch(PostNurseUpdates(consultid,chiefComplaint,updatedData))
        setinputValue({patientComplaint:'',systolic:'',diastolic:'',temp:'',pulse:'',respRate:'',weight:'',si02:''})
        setreload(true)
        handleClose()
    }
  


  return (
    <div className='Dashboard_maindiv'>
        <div>
            <ToastContainer/>
        {/* <div className='d-flex' style={{position:'fixed'}}>
        </div> */}
        <div className='pt-3 '>
        <div style={{ maxHeight: '70vh', overflowY: 'auto',marginTop:'50px' }}>
            {todaysPatients && todaysPatients.length>0 ?(
        <TableContainer component={Paper} className='tablecontainer_main'>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow >
            <StyledTableCell align="center">MRN</StyledTableCell>
            <StyledTableCell align="center">NAME</StyledTableCell>
            {/* <StyledTableCell align="center">ADDRESS</StyledTableCell> */}
            <StyledTableCell align="center">DOCTOR</StyledTableCell>
            <StyledTableCell align="center">TOKEN</StyledTableCell>
            {/* <StyledTableCell align="center">ALLERGY</StyledTableCell> */}
            <StyledTableCell align="center">DIAGNOSIS</StyledTableCell>
            <StyledTableCell align="center">HISTORY</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {todaysPatients.map((row, index) => (
            <StyledTableRow key={index}>
                <StyledTableCell align="center">{row.MRN}</StyledTableCell>
                <StyledTableCell align="center">{row.PatientName}</StyledTableCell>
                {/* <StyledTableCell align="center">{row.consultation.user.address}</StyledTableCell> */}
                <StyledTableCell align="center">{row.DoctorName}</StyledTableCell>
                <StyledTableCell align="center">{row.Token}</StyledTableCell>
                {/* <StyledTableCell align="center">{row.consultation.allergy}</StyledTableCell>                    */}
                <StyledTableCell align="center"><IconButton onClick={()=>hangleClickDiagnose(row)}><MedicalServicesIcon/></IconButton></StyledTableCell>
                <StyledTableCell align="center"> 
                <Link
                  component="button"
                  variant="body2"
                  style={{color:'blue'}}
                  onClick={()=>{handleViewDetails(row.MRN)}}
                >
                  view details
                </Link>
                </StyledTableCell>                   
            </StyledTableRow>
        ))}
        </TableBody>                
        </Table>
        </TableContainer>
            ):(
                <h3>NO PATIENTS TODAY</h3>
            )}
        </div>    
        </div>
{/* vital signs dialoge box */}
        <Dialog open={Open}>
                <form onSubmit={submitForm}>
            <DialogContent>
                <div>
                    <h5 className='pl-2 pb-3'>NAME:{selectedRow && selectedRow.PatientName}</h5>
                    <div className='d-flex p-2'>
                        <label> CHIEF COMPLAINTS:</label>
                        <input type='text' className="form-control vital_input" style={{marginLeft:'21px' , width:'250px'}} name='patientComplaint' value={inputValue.patientComplaint} onChange={handleChangeInput}></input>
                    </div>
                    <div className='d-flex p-2'>
                        <label style={{width:'176px'}}>BLOOD PRESSURE(SYSTOLIC):</label>
                        <input type='number' className="form-control vital_input" style={{marginLeft:'2px', width:'250px'}} name='systolic' value={inputValue.systolic} onChange={handleChangeInput}></input>
                        <p className='pl-2'>mm/Hg</p>
                    </div>
                    <div className='d-flex p-2'>
                        <label style={{width:'176px'}}>BLOOD PRESSURE(DIASTOLIC):</label>
                        <input type='number' className="form-control vital_input" style={{marginLeft:'2px', width:'250px'}} name='diastolic' value={inputValue.diastolic} onChange={handleChangeInput}></input>
                        <p className='pl-2'>mm/Hg</p>
                    </div>
                    <div className='d-flex p-2'>
                        <label> BODY TEMPERATURE:</label>
                        <input type='number' className="form-control vital_input" style={{marginLeft:'10px' , width:'250px'}} name='temp' value={inputValue.temp} onChange={handleChangeInput}></input>
                        <p className='pl-2'>C</p>
                    </div>
                    <div className='d-flex p-2'>
                        <label>PULSE RATE:</label>
                        <input type='number' className="form-control vital_input" style={{marginLeft:'80px', width:'250px'}} name='pulse' value={inputValue.pulse} onChange={handleChangeInput}></input>
                        <p className='pl-2'>beats/minute</p>
                    </div>
                    <div className='d-flex p-2'>
                        <label>RESPIRATION RATE:</label>
                        <input type='number'  className="form-control vital_input" style={{marginLeft:'26px', width:'250px'}} name='respRate' value={inputValue.respRate} onChange={handleChangeInput}></input>
                        <p className='pl-2'>beats/minute</p>
                    </div>
                    <div className='d-flex p-2 '>
                        <label>BODY WEIGHT:</label>
                        <input type='number' className="form-control vital_input" style={{marginLeft:'61px', width:'250px'}} name='weight' value={inputValue.weight} onChange={handleChangeInput}></input>
                        <p className='pl-2'>KG</p>
                    </div>
                    <div className='d-flex p-2 '>
                        <label>OXYGEN SATURATION:</label>
                        <input type='number' className="form-control vital_input" style={{ marginLeft:'2px',width:'250px'}} name='si02' value={inputValue.si02} onChange={handleChangeInput}></input>
                        <p className='pl-2'>%</p>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <div className='d-flex'>
                    <Button onClick={handleClose}>close</Button>
                    <Button type='submit'>submit</Button>
                </div>
            </DialogActions>
                </form>
        </Dialog>

{/* patient history dialoge */}
        
        {patientconsultationdialoge &&(
            <PatientConsultation data={consultationByMrn}/>
        )}
        
        {/* <Dialog open={historyDialoge}>
            <DialogContent>
                {filterHistory &&(
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align='center'>DATE</StyledTableCell>
                                <StyledTableCell align='center'>DOCTOR</StyledTableCell>
                                <StyledTableCell align='center'>PATIENT NAME</StyledTableCell>
                                <StyledTableCell align='center'>SERVICES</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        {filterHistory.reverse().map((item)=>(
                        <TableBody>
                            <StyledTableRow>
                                <StyledTableCell align='center'>{item.consultation.consultationDate}</StyledTableCell>
                                <StyledTableCell align='center'>{item.consultation.doc && item.consultation.doc.userName}</StyledTableCell>
                                <StyledTableCell align='center'>{item.consultation.user.userName}</StyledTableCell>
                                {(item.services!==null || item.packageService !==null) &&(
                                <StyledTableCell align='center'>
                                    <Link
                                    component="button"
                                    variant="body2"
                                    style={{color:'blue'}}>
                                    View Details
                                    </Link>
                                </StyledTableCell>
                                )}
                            </StyledTableRow>
                        </TableBody>
                        ))}
                    </Table>
                </TableContainer>
                )}

            </DialogContent>
            <DialogActions>
            <div className='d-flex'>
                    <Button onClick={handleClose}>close</Button>
                </div>
            </DialogActions>
        </Dialog> */}
      </div>
    </div>
  )
}

export default DocMypatients