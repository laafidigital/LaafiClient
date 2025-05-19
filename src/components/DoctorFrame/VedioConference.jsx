import React, { useState,useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { StyledTableCell,StyledTableRow } from '../../Styles/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { Button, IconButton } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { jwtDecode } from "jwt-decode";
import { GetConsultation, GetTodaysPatient} from '../Store/Actions';
import VideoCallTwoToneIcon from '@mui/icons-material/VideoCallTwoTone';
import NoteAltTwoToneIcon from '@mui/icons-material/NoteAltTwoTone';
import { GetuserConcferenceRoom } from '../Store/ApiReducers/Conference';

const VedioConference = (props) => {
  
  
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const ispatientRoute = useLocation().pathname.includes('/patient/');

  const token=localStorage.getItem('accessToken')
  const decodeToken=jwtDecode(token)
  const Id=decodeToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]

  const onlinepatient=useSelector((state)=>state.Vedioconference.onlinepatients)

  const [rowindex,setrowindex]=useState()


  

 useEffect(()=>{
   dispatch(GetuserConcferenceRoom())
 },[dispatch])

 const clickVediocall=(row,index)=>{
  setrowindex(index)
  props.setcontent2(row)
  // const url = `https://laaficonference.azurewebsites.net/ConferenceRooms/waitingroom?roomId=${roomid}&userId=${Id}` 
  // window.open(url, '_blank');
}

const clickNote=(consultid)=>{
  navigate(`../diagnosis/${consultid}`)

}

  return (
    <div className=''>
    <div>
    <div className='d-flex' style={{position:'fixed'}}>
        {/* <Button variant='contained' className='m-2' sx={ { borderRadius: 28 } } onClick={()=>{navigate('all')}}>All</Button>
        <Button variant='contained'  className='m-2' sx={ { borderRadius: 28 } } onClick={()=>{navigate('/doctor/mypatients')}}>Today</Button> */}
    </div>
    <div className='pt-3 '>
    <div style={{ maxHeight: '70vh', overflowY: 'auto',height:'100%'}}>
    {onlinepatient  && onlinepatient.length>0 ?(
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
    <TableHead>
      <TableRow >
        <StyledTableCell align="center">MRN</StyledTableCell>
        <StyledTableCell align="center">Name</StyledTableCell>
        <StyledTableCell align="center">Time</StyledTableCell>
        <StyledTableCell align="center">Room Id</StyledTableCell>
        {!ispatientRoute &&(<StyledTableCell align="center">Diagnosis</StyledTableCell>)}
        <StyledTableCell align="center">Join</StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    {onlinepatient.map((row, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell align="center">{row.MRN}</StyledTableCell>
            <StyledTableCell align="center">{row.PatientName}</StyledTableCell>
            <StyledTableCell align="center">{row.ConsultationTime}</StyledTableCell>             
            <StyledTableCell align="center">{row.Id}</StyledTableCell>
            {!ispatientRoute &&(<StyledTableCell align="center">{rowindex==index ? <IconButton onClick={()=>{clickNote(row.ConsultationId)}}><NoteAltTwoToneIcon/></IconButton>  : null }</StyledTableCell>)}
            <StyledTableCell align="center"><IconButton onClick={()=>{clickVediocall(row,index)}} style={{color:rowindex==index ? 'green': 'grey'}}><VideoCallTwoToneIcon/></IconButton></StyledTableCell>
          </StyledTableRow>
      ))}
     </TableBody>
    </Table>
    </TableContainer>
     ):(
      ispatientRoute ? (
        <h3 className='d-flex justify-content-center align-items-center'>NO ONLINE CONSULTATION TODAY</h3>
      ) : (
        <h3>NO ONLINE PATIENTS TODAY</h3>
      )
    )}
    </div>    
    </div>
  </div>
</div>
  )
}

export default VedioConference