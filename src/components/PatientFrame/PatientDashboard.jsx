import React, { useEffect, useState } from 'react'
import admincardoneimg from '../../assets/admincardimg/person-gear.svg'
import admincardtwoimg from '../../assets/admincardimg/clipboard2-pulse.svg'
import doctorcardthree from '../../assets/admincardimg/prescription.svg'
import { StyledTableRow,StyledTableCell} from '../../Styles/Table'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { BsPersonGear } from "react-icons/bs";
import { MdOutlineWaterDrop } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import { Button, Dialog, DialogActions, DialogContent, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { GetPatientConsultation } from '../Store/Actions'
import { jwtDecode } from 'jwt-decode'
import { FaUserDoctor } from "react-icons/fa6";
import { TbReport } from "react-icons/tb";
import ConsultationReport from '../Admin/Reusablecomponents/ConsultationReport'
import { setreportstatus } from '../Store/DashboardSlice'
import {DragDropContext,Droppable,Draggable} from  'react-beautiful-dnd'
import laafilogo from '../../assets/Logos/laafiheader_transparentlogo.png'
import AvailableDoctor from '../Admin/Doctor/AvailableDoctor'
import Myschedule from '../PatientFrame/Myschedule'
import VedioConference from '../DoctorFrame/VedioConference'
import VedioCreateRoom from '../DoctorFrame/VedioCreateRoom'
import { useLocation } from 'react-router-dom';



const PatientDashboard = () => {

    const navigate=useNavigate()
    const dispatch=useDispatch()
    const location = useLocation();
    const { value } = location.state || {};

    
    const [buttons, setButtons] = useState([
        { id: '1', label: 'Consultation Details',value:'Consultation Details' },
        { id: '2', label: 'Available Doctors',value:'Available Doctors' },
        { id: '3', label: 'My Schedules',value:'My Schedules' },
        { id: '4', label: 'Book Apponitemt',value:'Book Apponitemt'},
        // { id: '5', label: 'Online Schedule',value:'Online Schedule'},
        // { id: '4', label: 'My Schedules',value:'myschedule' },
      ]);

    const consultationbymrn=useSelector((state)=>state.Addpatentdetails.consultationByMrn)

    const [historyDialoge,sethistoryDialoge]=useState(false)
    const [filterHistory,setfilterHistory]=useState([])
    const [consultId,setconsultId]=useState(null)
    const [content,setcontent]=useState('Available Doctors')
    const [content2,setcontent2]=useState(null)
    
   
    useEffect(()=>{
        if(consultationbymrn){
            setfilterHistory(consultationbymrn)
        }
    },[consultationbymrn])

    const handlebuttonClick=(value)=>{
        setcontent(value)
      if(value==='Consultation Details'){
        clickPatientdetails()
      }
      else if(value==='Book Apponitemt')
      navigate('../patientbooking')
    }

    useEffect(() => {
        if (value === 'My Schedules') {
            setButtons(prevButtons => {
                const updatedButtons = [...prevButtons];
                const mySchedulesButton = updatedButtons.find(button => button.value === 'My Schedules');
                if (mySchedulesButton) {
                    const index = updatedButtons.indexOf(mySchedulesButton);
                    updatedButtons.splice(index, 1);
                    updatedButtons.unshift(mySchedulesButton);
                }
                return updatedButtons;
            });
            setcontent('My Schedules'); 
        }
    }, [value]);
    
    const clickPatientdetails=()=>{
       sethistoryDialoge(true)
       const Token=localStorage.getItem("accessToken")
       if(Token){
        const decodedToken = jwtDecode(Token);
        const Id=decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
        dispatch(GetPatientConsultation(Id))
      }
    }

    const handleClickreport=(id)=>{
        setconsultId(id)
        dispatch(setreportstatus(true))
    }

    const handleDragEnd = (result) => {
        
        if (!result.destination) return; // If dropped outside of a droppable area
        const items = Array.from(buttons);
        const [reorderedItem] = items.splice(result.source.index, 1); // Remove from source
        items.splice(result.destination.index, 0, reorderedItem); // Insert in the new place
    
        setButtons(items); // Update state with new order
      };


      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = days[date.getDay()];
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${dayName} ${day}-${month}-${year}`;
    };
    
    const formatTime = (timeString) => {
        const time = new Date(`1970-01-01T${timeString}`);
        return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
  return (
    
        <div className='docdash_maindiv'>
        <div className='docdash_maindiv_container'>
            <div className='docdash_content1_main'>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="ROOt" type="group">
                    {(provider) => (
                        <div className="button_div" {...provider.droppableProps} ref={provider.innerRef}>
                        {buttons.map((button, index) => (
                        <Draggable key={button.id} draggableId={button.id} index={index}>
                            {(provider) => (
                            <div
                                {...provider.dragHandleProps}
                                {...provider.draggableProps}
                                ref={provider.innerRef}
                                onClick={()=>handlebuttonClick(button.value)}
                            >
                                {button.label}  
                            </div>
                            )}
                        </Draggable>
                        ))}
                        {provider.placeholder} 
                    </div>
                    )}
                </Droppable>
            </DragDropContext>
            <div className='content_div'>
                {content ==='Consultation Details' 
                ?(
                    filterHistory ?(
<TableContainer component={Paper}>
    <Table>
        <TableHead>
            <TableRow>
                <StyledTableCell align='center'>DATE</StyledTableCell>
                <StyledTableCell align='center'>TIME</StyledTableCell>
                <StyledTableCell align='center'>DOCTOR</StyledTableCell>
                <StyledTableCell align='center'>PATIENT NAME</StyledTableCell>
                <StyledTableCell align='center'>Report</StyledTableCell>
            </TableRow>
        </TableHead>
        {filterHistory.map((item) => (
            <TableBody key={item.Id}>
                <StyledTableRow>
                    <StyledTableCell align='center'>
                        {formatDate(item.ConsultationDate)}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                        {formatTime(item.ConsultationTime)}
                    </StyledTableCell>
                    <StyledTableCell align='center'>{item.DoctorName}</StyledTableCell>
                    <StyledTableCell align='center'>{item.PatientName}</StyledTableCell>
                    {(item.services !== null || item.packageService !== null) && (
                        <StyledTableCell align='center'>
                            <Link
                                component="button"
                                variant="body2"
                                style={{ color: 'blue' }}
                                onClick={() => { handleClickreport(item.Id) }}
                            >
                                View Report
                            </Link>
                        </StyledTableCell>
                    )}
                </StyledTableRow>
            </TableBody>
        ))}
    </Table>
</TableContainer>
                        ):(
                            <h4>No past consultation </h4>
                        )
                )
                :content==='Available Doctors'?(
                <AvailableDoctor/>
                ):content==='My Schedules'?(
                <Myschedule setcontent2={setcontent2}/>
                )
                :content==='Online Schedule'?(
                  <VedioConference setcontent2={setcontent2}/> 
                ):(
                    <></>
                )
                }
            </div>
            </div>
        
            <div className='content2_main'>
               {content2 ?(
                <VedioCreateRoom data={content2}/>
               ):(
                <div className='content2_second_div'>
                    <div className='content2_imagediv'>
                        <img src={laafilogo} />
                    </div>
                </div>
               )}
            </div>
        </div>
        {/* <div className='admindashmain '>

            <div className='row'>

              <div className="card text-white  mb-3 admincard col-4 ml-2 patient_footfall" onClick={clickPatientdetails}  style={{backgroundColor:'#1cd346'}}>
                  <div className='card_img_div'>
                   <BsPersonGear className='adminimgone'/>                  </div>
                  <div className="card-img-overlay" >
                     <h4 className="admincardhead"> Consultation Details</h4>
                 </div>
                 <div className='admincard_round1 green_card1'></div>
                 <div className='admincard_round2 green_card2'></div>
             </div>

             <div className="card text-white  mb-3 admincard col ml-2 lab_summary" onClick={clicklabdetails}>
                 <div className='card_img_div'>
                   <TbReport className='adminimgone'/>               
                  </div>
                 <div class="card-img-overlay" >
                     <h4 className="admincardhead">Lab Details</h4>
                 </div>
                 <div className='admincard_round1 red_card1'></div>
                 <div className='admincard_round2 red_card2'></div>
            </div>

            <div className="card text-white  mb-3 admincard col-4 ml-2 todaysdoctor" onClick={clickFinddoctor} >
                <div className='card_img_div'>
                  <FaUserDoctor className='adminimgone'/>
                </div>
                <div class="card-img-overlay" >
                    <h4 className="admincardhead">Find Doctor</h4>
                </div>
                <div className='admincard_round1  cyan_card1'></div>
                <div className='admincard_round2 cyan_card2'></div>
            </div>
            </div>

            <div className='row'>
               
                <div className="card text-white  mb-3 admincard col-4 ml-2 remote_monitoring" >
                    <div className='card_img_div'>
                           <MdOutlineWaterDrop className='adminimgone' style={{color:'black'}}/>
                    </div>
                    <div class="card-img-overlay d-flex">
                        <h4 className="admincardhead">Blood Bank</h4>
                    </div>
                    <div className='admincard_round1 blood_card1'></div>
                    <div className='admincard_round2 blood_card2'></div>
                </div>

            </div>

            <Dialog open={historyDialoge}>
            <DialogContent>
                {filterHistory ?(
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align='center'>DATE</StyledTableCell>
                                <StyledTableCell align='center'>DOCTOR</StyledTableCell>
                                <StyledTableCell align='center'>PATIENT NAME</StyledTableCell>
                                <StyledTableCell align='center'>Report</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        {filterHistory.map((item)=>(
                        <TableBody>
                            <StyledTableRow>
                                <StyledTableCell align='center'>{item.ConsultationDate}</StyledTableCell>
                                <StyledTableCell align='center'>{item.DoctorName}</StyledTableCell>
                                <StyledTableCell align='center'>{item.PatientName}</StyledTableCell>
                                {(item.services!==null || item.packageService !==null) &&(
                                <StyledTableCell align='center'>
                                    <Link
                                    component="button"
                                    variant="body2"
                                    style={{color:'blue'}}
                                    onClick={()=>{handleClickreport(item.Id)}}
                                    >
                                    View Report
                                    
                                    </Link>
                                </StyledTableCell>
                                )}
                            </StyledTableRow>
                        </TableBody>
                        ))}
                    </Table>
                </TableContainer>
                ):(
                    <h4>No past consultation </h4>
                )}

            </DialogContent>
            <DialogActions>
            <div className='d-flex'>
                    <Button onClick={handleClose}>close</Button>
                </div>
            </DialogActions>
        </Dialog>
        </div> */}
        {consultId &&(
            <ConsultationReport data={consultId}/>
        )}
    </div>
  )
}

export default PatientDashboard