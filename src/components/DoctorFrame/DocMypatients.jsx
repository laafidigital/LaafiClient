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
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { jwtDecode } from "jwt-decode";
import { GetConsultation, GetTodaysPatient } from '../Store/Actions';
import VideoCallTwoToneIcon from '@mui/icons-material/VideoCallTwoTone';
import NoteAltTwoToneIcon from '@mui/icons-material/NoteAltTwoTone';
import { GetuserConcferenceRoom } from '../Store/ApiReducers/Conference';
import { MdPerson } from "react-icons/md";



const DocMypatients = () => {

   const dispatch=useDispatch()
   const navigate=useNavigate()

   const consultation=useSelector((state)=>state.Addpatentdetails.consultation)
   const todaysPatients=useSelector((state)=>state.Addpatentdetails.todaysPatient)
   const onlinepatient=useSelector((state)=>state.Vedioconference.onlinepatients)
   
   const [filteredpateints,setfilteredpatients]=useState(todaysPatients && todaysPatients.length>0 ? todaysPatients :null)
   const [doctorID,setdoctorid]=useState(null)
   
  
    
   const currentDate = new Date();
   const year = currentDate.getFullYear();
   const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
   const day = String(currentDate.getDate()).padStart(2, '0');
   const formattedDate = `${year}-${month}-${day}`;

   useEffect(()=>{
    dispatch(GetTodaysPatient(formattedDate,''))
    dispatch(GetuserConcferenceRoom())
   },[])
 
    
    useEffect(() => { 
        const Token=localStorage.getItem('accessToken')
        const decodeToken=jwtDecode(Token)
        const id=decodeToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
        setdoctorid(id)
        
        const filteredData = todaysPatients.filter((item) =>(item.ConsultStatus===false));
        setfilteredpatients(filteredData);
    }, [todaysPatients]); 

    const clickVediocall=(roomid,index)=>{
      
      const url = `https://laaficonference.azurewebsites.net/ConferenceRooms/waitingroom?roomId=${roomid}&userId=${doctorID}` 
      window.open(url, '_blank');
    }
console.log(onlinepatient);

  return (
    <div className='docmypatient'>
      {(todaysPatients && todaysPatients.length>0)||(onlinepatient && onlinepatient.length>0) &&(
        <h4>Today's Appointments</h4>
      )}
      {(todaysPatients && todaysPatients.length>0)||(onlinepatient && onlinepatient.length>0) ?(
      <div className='docmypatient_content2main'>
        {/* {todaysPatients && todaysPatients.map((item,index)=>(
          <div onClick={()=>navigate(`../diagnosis/${item.Id}`)}>
            <div className='docmypatient_card'>
              <MdPerson  style={{display:'flex',width:'100%',height:'100%'}}/>
              <div>
                <h6>{item.MRN}</h6>
                <h6>TIME:{item.ConsultationTime}</h6>
              </div>
            </div>
          </div>
        ))} */}
        {onlinepatient && onlinepatient.map((item,index)=>(
          <div onClick={()=>navigate(`../diagnosis/${item.ConsultationId}`)}>
            <div className='docmypatient_card'>
              {/* <img src='' alt/> */}
              <MdPerson style={{display:'flex',width:'100%',height:'100%'}}/>
              <div>
                <h6>{item.PatientName}</h6>
                <h6>TIME:{item.ConsultationTime}</h6>
                  <VideoCallTwoToneIcon className='vedioicon'/>
              </div>
            </div>
          </div>
        ))}
      </div>
      ):(
        <h4 className='no_apponmentheading'>Sorry No Appointments For Today</h4>
      )}
    </div>


// OLD CODE
    // <div className='Dashboard_maindiv'>
    //     <div>
    //     <div className='d-flex' style={{position:'fixed'}}>
    //         {/* <Button variant='contained' className='m-2' sx={ { borderRadius: 28 } } onClick={()=>{navigate('all')}}>All</Button>
    //         <Button variant='contained'  className='m-2' sx={ { borderRadius: 28 } } onClick={()=>{navigate('/doctor/mypatients')}}>Today</Button> */}
    //     </div>
    //     <div className='pt-3 '>
    //     <div style={{ maxHeight: '70vh', overflowY: 'auto',marginTop:'50px' }}>
    //     {filteredpateints  && filteredpateints.length>0 ?(
    //     <TableContainer component={Paper}>
    //     <Table sx={{ minWidth: 700 }} aria-label="customized table">
    //     <TableHead>
    //       <TableRow >
    //         <StyledTableCell align="center">MRN</StyledTableCell>
    //         <StyledTableCell align="center">Token</StyledTableCell>
    //         <StyledTableCell align="center">Patient</StyledTableCell>
    //         <StyledTableCell align="center">Diagnosis</StyledTableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //     {filteredpateints.map((row, index) => (
    //       <StyledTableRow key={index}>
    //           <StyledTableCell align="center">{row.MRN}</StyledTableCell>
    //           <StyledTableCell align="center">{row.Token}</StyledTableCell>
    //            <StyledTableCell align="center">{row.PatientName}</StyledTableCell>
    //           <StyledTableCell align="center"><IconButton onClick={()=>navigate(`../diagnosis/${row.Id}`)}><MedicalServicesIcon/></IconButton></StyledTableCell>
    //           </StyledTableRow>
    //                             ))}
    //      </TableBody>
    //     </Table>
    //     </TableContainer>
    //      ):(<h3>NO PATIENTS FOR YOU TODAY</h3>)}
    //     </div>    
    //     </div>
    //   </div>
    // </div>
  )
}

export default DocMypatients