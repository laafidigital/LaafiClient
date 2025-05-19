import React, { useState,useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { Button, Dialog, DialogActions, DialogContent, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import {useDispatch, useSelector} from 'react-redux'
import { StyledTableCell,StyledTableRow } from '../../Styles/Table';
import { GetConsultation, GetPatientServiceByConsultId, GetTodaysPatient } from '../Store/Actions';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';



const DocINpatients = () => {
    
   const navigate=useNavigate()
   const dispatch=useDispatch()

   const consultation=useSelector((state)=>state.Addpatentdetails.consultation)
   const searchvalue=useSelector((state)=>state.SearchNurse.searchValue)
   const patientservicebycid=useSelector((state)=>state.Results.patientServiceByCid)

   const [filteredpateints,setfilteredpatients]=useState(null)
   const [inputValue,setinputValue]=useState({patientCompaliant:'',systolic:'',diastolic:'',temperature:'',pulse:'',respiration:'',weight:'',oxygen:''})
   const [Open,setOpen]=useState(false)
   const [historyDialoge,sethistoryDialoge]=useState(false)
   const [servicedialoge,setservicedialoge]=useState(false)
   const [filterHistory,setfilterHistory]=useState()
   
   const currentDate = new Date();
   const year = currentDate.getFullYear();
   const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
   const day = String(currentDate.getDate()).padStart(2, '0');
   const formattedDate = `${year}-${month}-${day}`;
   
   
   useEffect(()=>{
    dispatch(GetTodaysPatient('','in_patient'))
   },[])
  
    
   useEffect(() => {
    if (searchvalue && typeof searchvalue.search === 'string') {
        const searchvalueTrimmed = searchvalue.search.trim();
        if (searchvalueTrimmed === '') {
           setfilteredpatients(consultation.filter((item) => item.consultation.patientType === 'in_patient'));
        } else {
         setfilteredpatients(
           consultation.filter((item) => {
           if (item.consultation.user && typeof item.consultation.user.userName === 'string') {
            return item.consultation.user.userName.trim().toLowerCase().includes(searchvalueTrimmed.toLowerCase()) &&  item.consultation.patientType === 'in_patient';
          }
          return false;
        })
      );
    }
    } else {
      setfilteredpatients(consultation.filter((item) => item.consultation.patientType === 'in_patient'));
    }
    }, [consultation,searchvalue]); 

    const handleChangeInput=(e)=>{
        const {name,value}=e.target
        setinputValue((prev)=>({
          ...prev,
          [name]:value
        }))
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
    const clickservice=(id)=>{
       setservicedialoge(true)
       dispatch(GetPatientServiceByConsultId(id))
    }

  


  return (
    <div className='Dashboard_maindiv'>
        <div>
        {/* <div className='d-flex' style={{position:'fixed'}}>
        </div> */}

        <div className='pt-3 '>
        <div style={{ maxHeight: '70vh', overflowY: 'auto',marginTop:'50px', width:'fit-content'}}>
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
            <StyledTableCell align="center">DISCHARGE</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
        {filteredpateints.map((row, index) => (
            <StyledTableRow key={index}>
                <StyledTableCell align="center">{<CheckCircleRoundedIcon style={{color:'red'}}/>}</StyledTableCell>
                <StyledTableCell align="center">{row.consultation.mrn}</StyledTableCell>
                <StyledTableCell align="center">{row.consultation.bn && row.consultation.bn.rm && row.consultation.bn.rm.floorno}</StyledTableCell>
                <StyledTableCell align="center">{row.consultation.bn && row.consultation.bn.room_no}</StyledTableCell>
                <StyledTableCell align="center">{row.consultation.bn && row.consultation.bn.bed_no}</StyledTableCell>
                <StyledTableCell align="center">{row.consultation.user.userName}</StyledTableCell>
                <StyledTableCell align="center">{row.consultation.user.address}</StyledTableCell>
                <StyledTableCell align="center">{row.consultation.doc &&row.consultation.doc.userName}</StyledTableCell>
                <StyledTableCell align="center">{row.consultation.allergy}</StyledTableCell>                   
                <StyledTableCell align="center"><IconButton onClick={()=>navigate(`../diagnosis/${row.consultation.id}`)}><MedicalServicesIcon/></IconButton></StyledTableCell>
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
                <StyledTableCell align="center">
                    <IconButton>
                    <PersonRemoveAlt1Icon 
                    //   style={{width:'50px',height:'20px'}}
                    />
                    </IconButton>
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
                        {filterHistory.map((item)=>(
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
                                    onClick={()=>{clickservice(item.consultation.id)}}
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

        {/* patient service details */}
        <Dialog open={servicedialoge}>
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
          <DialogActions><Button onClick={()=>setservicedialoge(false)}>close</Button></DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

export default DocINpatients