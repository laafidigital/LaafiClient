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
import { GetConsultation, GetTodaysPatient } from '../Store/Actions';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';



const NurseInpatients = () => {
    

   const navigate=useNavigate()
   const dispatch=useDispatch()

   const inpatients=useSelector((state)=>state.Addpatentdetails.todaysPatient)
   const consultation=useSelector((state)=>state.Addpatentdetails.consultation)
   const searchvalue=useSelector((state)=>state.SearchNurse.searchValue)

   const [filteredpateints,setfilteredpatients]=useState(null)
   const [inputValue,setinputValue]=useState({patientCompaliant:'',systolic:'',diastolic:'',temperature:'',pulse:'',respiration:'',weight:'',oxygen:''})
   const [Open,setOpen]=useState(false)
   const [selectedRow,setselectedRow]=useState()
   const [historyDialoge,sethistoryDialoge]=useState(false)
   const [filterHistory,setfilterHistory]=useState()

   const currentDate = new Date();
   const year = currentDate.getFullYear();
   const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
   const day = String(currentDate.getDate()).padStart(2, '0');
   const formattedDate = `${year}-${month}-${day}`;
   


   useEffect(()=>{
    dispatch(GetTodaysPatient('','in_patient'))
    dispatch(GetConsultation())
   },[])
  
    
    
    const handleChangeInput=(e)=>{
        const {name,value}=e.target
        setinputValue((prev)=>({
          ...prev,
          [name]:value
        }))
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
        const filterhistory=consultation.filter((item)=>item.consultation.mrn===mrn)
   
        setfilterHistory(filterhistory)
        sethistoryDialoge(true)
    }

 // service view details 
    const handleServiceView=(id)=>{

    }

  


  return (
    <div className='Dashboard_maindiv'>
        <div>
        {/* <div className='d-flex' style={{position:'fixed'}}>
        </div> */}

        <div className='pt-3 '>
        <div style={{ maxHeight: '70vh', overflowY: 'auto',marginTop:'50px' }}>
            {filteredpateints && filteredpateints.length>0 ?(
        <TableContainer component={Paper} className='tablecontainer_main'>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow >
            <StyledTableCell align="center">COMPLETED</StyledTableCell>
            <StyledTableCell align="center">MRN</StyledTableCell>
            <StyledTableCell align="center">FLOOR</StyledTableCell>
            <StyledTableCell align="center">ROOM</StyledTableCell>
            <StyledTableCell align="center">BED </StyledTableCell>
            <StyledTableCell align="center">NAME</StyledTableCell>
            <StyledTableCell align="center">ADDRESS</StyledTableCell>
            <StyledTableCell align="center">DOCTOR</StyledTableCell>
            <StyledTableCell align="center">ALLERGY</StyledTableCell>
            <StyledTableCell align="center">DIAGNOSIS</StyledTableCell>
            <StyledTableCell align="center">HISTORY</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
        {filteredpateints.map((row, index) => (
            <StyledTableRow key={index}>
                <StyledTableCell align="center">{<CheckCircleRoundedIcon style={{color:'green'}}/>}</StyledTableCell>
                <StyledTableCell align="center">{row.consultation.mrn}</StyledTableCell>
                <StyledTableCell align="center">{row.consultation.bn && row.consultation.bn.rm && row.consultation.bn.rm.floorno}</StyledTableCell>
                <StyledTableCell align="center">{row.consultation.bn && row.consultation.bn.room_no}</StyledTableCell>
                <StyledTableCell align="center">{row.consultation.bn && row.consultation.bn.bed_no}</StyledTableCell>
                <StyledTableCell align="center">{row.consultation.user.userName}</StyledTableCell>
                <StyledTableCell align="center">{row.consultation.user.address}</StyledTableCell>
                <StyledTableCell align="center">{row.consultation.doc &&row.consultation.doc.userName}</StyledTableCell>
                <StyledTableCell align="center">{row.consultation.allergy}</StyledTableCell>                   
                <StyledTableCell align="center"><IconButton onClick={()=>hangleClickDiagnose(row)}><MedicalServicesIcon/></IconButton></StyledTableCell>
                <StyledTableCell align="center"> 
                   <Link
                  component="button"
                  variant="body2"
                  style={{color:'blue'}}
                  onClick={()=>{handleViewDetails(row.consultation.mrn)}}
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
            <DialogContent>
                <div>
                    <h5 className='pl-2 pb-3'>NAME:{selectedRow && selectedRow.consultation.user.userName}</h5>
                    <div className='d-flex p-2'>
                        <label> PATIENT COMPLAINT:</label>
                        <input type='text' className="form-control vital_input" style={{marginLeft:'15px' , width:'250px'}} name='patientCompaliant' value={inputValue.patientCompaliant} onChange={handleChangeInput}></input>
                    </div>
                    <div className='d-flex p-2'>
                        <label style={{width:'176px'}}>BLOOD PRESSURE(SYSTOLIC):</label>
                        <input type='text' className="form-control vital_input" style={{marginLeft:'2px', width:'250px'}} name='systolic' value={inputValue.systolic} onChange={handleChangeInput}></input>
                        <p className='pl-2'>mm/Hg</p>
                    </div>
                    <div className='d-flex p-2'>
                        <label style={{width:'176px'}}>BLOOD PRESSURE(DIASTOLIC):</label>
                        <input type='text' className="form-control vital_input" style={{marginLeft:'2px', width:'250px'}} name='diastolic' value={inputValue.diastolic} onChange={handleChangeInput}></input>
                        <p className='pl-2'>mm/Hg</p>
                    </div>
                    <div className='d-flex p-2'>
                        <label> BODY TEMPERATURE:</label>
                        <input type='text' className="form-control vital_input" style={{marginLeft:'10px' , width:'250px'}} name='temperature' value={inputValue.temperature} onChange={handleChangeInput}></input>
                        <p className='pl-2'>C</p>
                    </div>
                    <div className='d-flex p-2'>
                        <label>PULSE RATE:</label>
                        <input type='text' className="form-control vital_input" style={{marginLeft:'80px', width:'250px'}} name='pulse' value={inputValue.pulse} onChange={handleChangeInput}></input>
                        <p className='pl-2'>beats/minute</p>
                    </div>
                    <div className='d-flex p-2'>
                        <label>RESPIRATION RATE:</label>
                        <input type='text'  className="form-control vital_input" style={{marginLeft:'26px', width:'250px'}} name='respiration' value={inputValue.respiration} onChange={handleChangeInput}></input>
                        <p className='pl-2'>beats/minute</p>
                    </div>
                    <div className='d-flex p-2 '>
                        <label>BODY WEIGHT:</label>
                        <input type='text' className="form-control vital_input" style={{marginLeft:'61px', width:'250px'}} name='weight' value={inputValue.weight} onChange={handleChangeInput}></input>
                        <p className='pl-2'>KG</p>
                    </div>
                    <div className='d-flex p-2 '>
                        <label>OXYGEN SATURATION:</label>
                        <input type='text' className="form-control vital_input" style={{ marginLeft:'2px',width:'250px'}} name='oxygen' value={inputValue.oxygen} onChange={handleChangeInput}></input>
                        <p className='pl-2'>%</p>
                    </div>
                </div>

            </DialogContent>
            <DialogActions>
                <div className='d-flex'>
                    <Button onClick={handleClose}>close</Button>
                    <Button>submit</Button>
                </div>
            </DialogActions>
        </Dialog>

{/* patient history dialoge */}
        <Dialog open={historyDialoge}>
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
        </Dialog>
      </div>
    </div>
  )
}

export default NurseInpatients