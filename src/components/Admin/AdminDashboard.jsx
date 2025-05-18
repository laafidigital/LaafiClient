import React, { useEffect, useState } from 'react'
import admincardthreeimg from '../../assets/admincardimg/house-door.svg'
import adminmonitoring from '../../assets/admincardimg/display.svg'
import BarChartIcon from '@mui/icons-material/BarChart';
import { MdOutlineBedroomChild } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { MdManageHistory } from "react-icons/md";
import { BsPersonGear } from "react-icons/bs";
import { FaUserDoctor } from "react-icons/fa6";
import { FaHandHoldingMedical } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import { color, style } from '@mui/system'
import { IoReceiptOutline } from "react-icons/io5";
import { MdOutlineWaterDrop } from "react-icons/md";
import { MdOutlineLocalLaundryService } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button';
import { GetBedByRoomId, GetConsultation, GetDashboardLabDetails, GetDashboardPatientDetails, GetDashboardPharmacyDetails, GetFloor, GetHospitalInfrastructure, GetRooms, GetTodaysPatientCount, GetpackageDB, GetpatientByroom } from '../Store/Actions'
import { IconButton, Table } from '@mui/material'
import { MdOutlineHealthAndSafety } from "react-icons/md";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { StyledTableCell, StyledTableRow } from '../../Styles/Table'
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { setemptypatientbyroom } from '../Store/AddfloorSlice'


const AdminDashboard = () => {

    const navigate=useNavigate()
    const dispatch=useDispatch()

    const consultation=useSelector((state)=>state.Addpatentdetails.consultation)
    const floorarray=useSelector((state)=>state.Addfloor.floorresult)
    const roomresult=useSelector((state)=>state.Addfloor.roomresult)
    const bedbyroomidresult=useSelector((state)=>state.Addfloor.bedbyidresult)
    const patientsbyroom=useSelector((state)=>state.Addfloor.patientbyroomid)
    const Dashpatientdetails=useSelector((state)=>state.Dashboard.patientdetails)
    const Dashlabdetails=useSelector((state)=>state.Dashboard.labdetails)
    const packagedb=useSelector((state)=>state.Dashboard.packagedb)
    const Dashpharmacy=useSelector((state)=>state.Dashboard.pharmacydetails)
    // const TodaysPatientCount=useSelector((state)=>state.Addpatentdetails.todaysPatientCount)
    const allfloorsandrooms=useSelector((state)=>state.Addfloor.roomresult)




 // patients per month 
    
    const [openfloorDialog,setopenfloorDialog]=useState(false)
    const [bed,setBed]=useState(false)
    const [room,setRoom]=useState(false)
    const [hoveredBedPrice, setHoveredBedPrice] = useState(null);
    const [isSecondDialogOpen, setIsSecondDialogOpen] = useState(false);
    const [subFloor,setSubfloor]=useState(false)
    const [visibile,setvisibility]=useState(false)
    

   
  useEffect(()=>{
    dispatch(GetConsultation())
    dispatch(GetDashboardPatientDetails())
    dispatch(GetDashboardLabDetails())
    dispatch(GetDashboardPharmacyDetails())
    dispatch(GetFloor())

    dispatch(GetpackageDB())
  },[])


  const clickPatientdetails=(graphid)=>{
    
        navigate(`admindashchart/${graphid}`)
    }

    const clickTodaysDoctor=()=>{
        navigate('availabledoctors')
    }

    const todaysPatientClick=()=>{
        navigate('../admindashboard/dashboard')
    }
// floor dialoge box

   const clickroombooking=()=>{
     dispatch(GetHospitalInfrastructure())
     setSubfloor(true)
     setopenfloorDialog(true)
    }  
    const onclickRoom=(roomno)=>{
      dispatch(GetBedByRoomId(roomno))
      setBed(true)
      setRoom(false)
    }

    const handlebedClick=(bedgroup)=>{
    
    }

    const handleMouseenter=(bedprice)=>{
      
        setvisibility(true)
        setHoveredBedPrice(bedprice)
      }

    const handleCloseSecondDialog = () => {
        setIsSecondDialogOpen(false);
        setSubfloor(false)
        setRoom(false)
        setBed(false)
        
      };  

    

    const clickPychomatic=()=>{
        navigate('pychomatric')
    }




 
  
    
  return (
    <div className='Dashboard_maindiv'>
        <div className='admindashmain'>

            <div className='row'>
                    <div className="card text-white  mb-3 admincard col-4 ml-2 patient_footfall">
                        <div className='card_img_div'>
                          <BsPersonGear className='adminimgone'/>
                           {/* <img className="card-img adminimgone" src={admincardoneimg} alt="Card image" ></img> */}
                        </div>
                        <div className="card-img-overlay d-flex">
                            <h4 className="admincardhead" >Patient Footfall</h4>
                            <div className='patientdetails_maindiv'>
                                {/* <div className='patiendetais_subdiv'>
                                   <p className='para'>Y-TO-D</p>:{Dashpatientdetails  &&  (<p className='pl-2'>{ Dashpatientdetails.ytd }</p>)}
                                </div> */}
                                <div className='patiendetais_subdiv'>
                                  <div className='d-flex flex-column'>
                                    <p className='para'>M-TO-D</p>
                                    {Dashpatientdetails &&  (<h4 className='para_sub1 d-flex'>Total:{Dashpatientdetails.mtd}</h4>)}
                                    {Dashpatientdetails  &&  (<h4 className='para_sub1 d-flex'>A/day:{Math.round(Dashpatientdetails.avg * 100)/100}</h4>)}
                                    <div>
                                    <IconButton onClick={()=>clickPatientdetails("consultation")}>
                                        <BarChartIcon style={{height:"50px",width:"50px"}}/>
                                    </IconButton>
                                    </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                            <div className='admincard_round1 green_card1' ></div>
                            <div className='admincard_round2 green_card2' ></div>
                    </div>

                    <div className="card text-white  mb-3 admincard col ml-2 lab_summary">
                    <div className='card_img_div'>
                      <TbReport className='adminimgone'/>
                          {/* <img className="card-img adminimgone" src={admincardtwoimg} alt="Card image"></img> */}
                    </div>
                        <div class="card-img-overlay d-flex">
                            <h4 className="admincardhead" >Lab Summary</h4>
                            <div className='patientdetails_maindiv'>
                                {/* <div className='patiendetais_subdiv'>
                                   <p className='para'>Y-TO-D</p>:{Dashlabdetails  &&  (<p className='pl-2'>{Dashlabdetails.ytd}</p>)}
                                </div> */}
                                <div className='patiendetais_subdiv'>
                                  <div className='d-flex flex-column'>
                                    <p className='para'>M-TO-D</p>
                                    {Dashlabdetails &&  (<h4 className='para_sub1 d-flex'>Total:{Dashlabdetails.mtd}</h4>)}
                                    {Dashlabdetails  &&  (<h4 className='para_sub1 d-flex'>A/day:{Math.round(Dashlabdetails.avg*100)/100}</h4>)}
                                    <div>
                                    <IconButton onClick={()=>clickPatientdetails("service")}>
                                        <BarChartIcon style={{height:"50px",width:"50px"}}/>
                                    </IconButton>
                                    </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                        <div className='admincard_round1 red_card1' ></div>
                        <div className='admincard_round2 red_card2' ></div>
                    </div>

                    <div className="card text-white  mb-3 admincard col-4 ml-2 health_package">
                       <div className='card_img_div '>
                           <MdOutlineHealthAndSafety className='adminimgone'/>
                      </div>
                      <div class="card-img-overlay d-flex">
                            <h4 className="admincardhead">Health Packages</h4>
                            <div className='patientdetails_maindiv'>
                                {/* <div className='patiendetais_subdiv'>
                                   <p className='para'>Y-TO-D</p>:{Dashlabdetails  &&  (<p className='pl-2'>{Dashlabdetails.ytd}</p>)}
                                </div> */}
                                <div className='patiendetais_subdiv'>
                                  <div className='d-flex flex-column'>
                                    <p className='para'>M-TO-D</p>
                                    {packagedb &&  (<h4 className='para_sub1 d-flex'>Total:{packagedb.mtd}</h4>)}
                                    {packagedb  &&  (<h4 className='para_sub1 d-flex'>A/day:{Math.round(packagedb.avg*100)/100}</h4>)}
                                    <div>
                                    <IconButton onClick={()=>clickPatientdetails("package")}>
                                        <BarChartIcon style={{height:"50px",width:"50px"}}/>
                                    </IconButton>
                                    </div>
                                  </div>
                                </div>
                            </div>
                      </div>
                            <div className='admincard_round1 health_packcard1'></div>
                            <div className='admincard_round2 health_packcard2'></div>
                      </div>
                    
            </div>

            <div className='row'>

            <div className="card text-white  mb-3 admincard col-4 ml-2 billing" onClick={()=>clickPatientdetails("invoicesummury")}>
                       <div className='card_img_div'>
                           <IoReceiptOutline className='adminimgone'/>
                      </div>
                      <div class="card-img-overlay d-flex">
                            <h4 className="admincardhead">Billing</h4>
                      </div>
                            <div className='admincard_round1 billing_card1'></div>
                            <div className='admincard_round2 billing_card2'></div>
                    </div>
                    

                    {/* <div className="card text-white mb-3 admincard ml-2 col room_availabily" onClick={clickroombooking}>
                       <div className='card_img_div'>
                        <MdOutlineBedroomChild className='adminimgone'/>
                      </div>
                        <div class="card-img-overlay">
                            <h4 className="admincardhead"> Room Availability </h4>
                            
                        </div>
                         <div className='admincard_round1 brown_card1'></div>
                         <div className='admincard_round2 brown_card2'></div>
                    </div> */}

<div className="card text-white mb-3 admincard ml-2 col room_availabily" onClick={clickTodaysDoctor}>
                       <div className='card_img_div'>
                       <FaUserDoctor className='adminimgone'/>
                      </div>
                        <div class="card-img-overlay">
                            <h4 className="admincardhead"> Today's Doctors </h4>
                            
                        </div>
                         <div className='admincard_round1 brown_card1'></div>
                         <div className='admincard_round2 brown_card2'></div>
                    </div>

                    <div className="card text-white mb-3 admincard ml-2 col-4 patient_history"  onClick={todaysPatientClick}>
                       <div className='card_img_div'>
                        <MdManageHistory className='adminimgone'/>
                         {/* <img className="card-img adminimgone" src={todayspatient} alt="Card image"></img> */}
                      </div>
                      <div class="card-img-overlay d-flex">
                          <h4 className="admincardhead "> Today's Patients/History</h4>
                          <div className='patientdetails_maindiv' style={{marginLeft:'-34px'}}>
                                <div className='patiendetais_subdiv'>
                                  <div className='d-flex flex-column'>
                                    <h4 className='para_sub1 d-flex'>Total:{Dashpatientdetails.today}</h4>
                                  </div>
                                </div>
                          </div>
                      </div>
                        <div className='admincard_round1 purple_card1'></div>
                        <div className='admincard_round2 purple_card2'></div>
                    </div>

                    
            </div>
            {/* onClick={()=>clickPatientdetails("bloodbank")} */}
            <div className='row'>
                    

                      {/* <div className="card text-white  mb-3 admincard ml-2 col-4 todaysdoctor"  onClick={clickTodaysDoctor} >
                         <div className='card_img_div'>
                          <FaUserDoctor className='adminimgone'/>
                        </div>   
                        <div class="card-img-overlay">
                            <h4 className="admincardhead"> Today's Doctors</h4>
                        </div>
                        <div className='admincard_round1 cyan_card1' ></div>
                        <div className='admincard_round2 cyan_card2' ></div>
                    </div>

                      */}

                      <div className="col-4 " >
                       {/* <div className='card_img_div'>
                           <MdOutlineWaterDrop className='adminimgone'/>
                      </div> */}
                      {/* <div class="card-img-overlay d-flex">
                            <h4 className="admincardhead">Blood Bank</h4>
                      </div> */}
                            {/* <div className='admincard_round1 blood_card1'></div>
                            <div className='admincard_round2 blood_card2'></div> */}
                      </div>
                    
            </div>

            <div className='row'>
                    

                    <div className="card text-white  mb-3 admincard ml-2 col-4 remote_monitoring" >
                       <div className='card_img_div'>
                          <img className="card-img adminimgone" src={adminmonitoring} alt="Card image"></img>
                       </div>
                        <div class="card-img-overlay">
                            <h4 className="admincardhead"> Remote Monitoring</h4>
                        </div>
                         {/* <div className='admincard_round1 dark_card1' ></div>
                         <div className='admincard_round2 dark_card2' ></div> */}
                    </div>
                    {/*class name roombookingcard */}
                    <div className="card text-white  mb-3 admincard col ml-2 remote_monitoring"  >
                      <div className='card_img_div'>
                         <img className="card-img adminimgone" src={admincardthreeimg} alt="Card image"></img>
                      </div>
                      <div class="card-img-overlay d-flex">
                            <h4 className="admincardhead">House Keeping</h4>
                      </div>
                            {/* <div className='admincard_round1 yellow_card1'></div>
                            <div className='admincard_round2 yellow_card2'></div> */}
                    </div>
                   {/*class name laundry_services */}
                    <div className="card text-white  mb-3 admincard col-4 ml-2 remote_monitoring">
                      <div className='card_img_div'>
                      <MdOutlineLocalLaundryService className='adminimgone' color='black'/>
                      </div>
                      <div class="card-img-overlay d-flex">
                            <h4 className="admincardhead">Laundry Service</h4>
                      </div>
                            {/* <div className='admincard_round1 blue_card1'></div>
                            <div className='admincard_round2 blue_card2'></div> */}
                    </div>
            </div>

            <div className='row'>
              {/* classname blood_bank */}
              <div className="card text-white  mb-3 admincard col-4 ml-2 remote_monitoring"  >
                       <div className='card_img_div'>
                           <MdOutlineWaterDrop className='adminimgone' style={{color:'black'}}/>
                      </div>
                      <div class="card-img-overlay d-flex">
                            <h4 className="admincardhead">Blood Bank</h4>
                      </div>
                            {/* <div className='admincard_round1 blood_card1'></div>
                            <div className='admincard_round2 blood_card2'></div> */}
                      </div>
            </div>
                   
        
                                <Dialog open={subFloor} >
                                      <DialogTitle style={{color:'black',fontFamily:'times new roman'}}> Floor</DialogTitle>
                                      <DialogContent>
                                      <div className='floorDialoge '>
                                    <div className='colorbtndiv'>
                                    <div className='d-flex'>
                                       <button className='colorbtn' style={{backgroundColor:'red'}}></button>
                                       <p className='pl-2 mb-0'>Fully Occupied</p>
                                    </div>
                                    <div className='d-flex'>
                                       <button className='colorbtn' style={{backgroundColor:'yellow'}}></button>
                                       <p className='pl-2  mb-0'>Partially Occupied</p>
                                    </div>
                                    <div className='d-flex'>
                                       <button className='colorbtn' style={{backgroundColor:'green'}}></button>
                                       <p className='pl-2 '>Fully Available</p>
                                    </div>
                                </div> 
                              <div className='d-flex justify-content-between'>
                                  <h5 className='pl-4'>Floor</h5>
                                  <h5 className='pr-5'>Rooms</h5>
                                </div>
                              { Object.entries(allfloorsandrooms).map(([key,value])=>{
                                     
                                        return(
                                           <div className='row'>
                                                <div className='col ml-1'>
                                                    <Button variant='rounded' style={{backgroundColor:'green',marginLeft:'10px',color:'white',marginTop:'5px'}} >{key}</Button>
                                                 </div>
                                                <div className='col roomdiv'>
                                                  <div className='d-flex'>
                                                    {value.map((inneritem)=>{
                                                    
                                                       const isFilled=inneritem.TotalBeds==inneritem.OccupiedBeds
                                                       const ispartiallyfilled=inneritem.TotalBeds > inneritem.OccupiedBeds && inneritem.OccupiedBeds !==0
                                                      let roomButtonColor = isFilled ? 'red' : (ispartiallyfilled ? 'yellow' : 'green'); 
                                                      return(
                                                      <Button
                                                      variant='rounded'
                                                      style={{ backgroundColor:roomButtonColor, marginLeft: '10px', color:'white', marginTop: '5px' }}
                                                      className='floorbtn'
                                                      onClick={() => {
                                                        onclickRoom(inneritem.RoomId)
                                                        dispatch(GetpatientByroom(inneritem.RoomId))
                                                      }}
                                                      // disabled={isFilled}
                                                      >
                                                      {inneritem.RoomName}
                                                      </Button>
                                                      )
                                                     })}
                                                
                                                  </div>
                                                </div>
                                            </div>
                                                  )
                                          })
                                        }
                             </div> 
                                    </DialogContent>
                                    <DialogActions>
                                       <Button onClick={handleCloseSecondDialog}>cancel</Button>
                                    </DialogActions>
                                    </Dialog>

                                    {bedbyroomidresult  && (
                         <Dialog open={bed} onClose={handleCloseSecondDialog}>
                                <DialogContent className='d-flex justify-content-center'>
                           
                                    {bedbyroomidresult.beds && bedbyroomidresult.beds.map((bedGroup, index) => {
                                       
                                        const vacancyBed=consultation.filter((item)=>item.bedNo===bedGroup.id)
                                        const btncolor=bedGroup.admitId== null?'green':'red'
                                              return(
                                                <div key={index}>
                                                        <Button 
                                                          variant='contained' 
                                                          // disabled={bedGroup.status==true} 
                                                          onMouseOver={()=>handleMouseenter(bedbyroomidresult.price)} 
                                                          onMouseLeave={()=>{handleMouseenter(bedGroup.null)
                                                                            setvisibility(false) }} 
                                                          style={{ backgroundColor:btncolor,
                                                          marginLeft: '25px', color: 'white',marginTop:'5px',borderRadius:'50px',
                                                           }} 
                                                          onClick={()=>{
                                                            // if(bedGroup.admitId==null)
                                                              handlebedClick(bedGroup)
                                                          }}
                                                         >
                                                          {bedGroup.bed_no} 
                                                         </Button>
                                                  </div>
                                              )
                                               })}
                                              </DialogContent>
                                              <p style={{ paddingTop:'10px',display:'flex',justifyContent:'center',visibility:visibile ? 'visible' : 'hidden'}}> Bed Price: {hoveredBedPrice}</p>
                                  <DialogContent>
                                   {patientsbyroom && patientsbyroom.length>0 &&(
                                  <TableContainer component={Paper} className='tablecontainer_main'>
                                  <Table sx={{ minWidth: 550 }} aria-label="customized table">
                                  <TableHead>
                                  <TableRow>
                                     <StyledTableCell align="center">MRN</StyledTableCell>
                                      <StyledTableCell align="center">NAME</StyledTableCell>
                                      <StyledTableCell align="center">PHONE</StyledTableCell>
                                      <StyledTableCell align="center">ADDRESS</StyledTableCell>
                                  </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {patientsbyroom.map((item)=>(
                                  <StyledTableRow >
                                      <StyledTableCell align="center">{item.MRN}</StyledTableCell>
                                      <StyledTableCell align="center">{item.Name}</StyledTableCell>
                                      <StyledTableCell align="center">{item.PhoneNumber}</StyledTableCell>
                                      <StyledTableCell align="center">{item.Address}</StyledTableCell>
                                  </StyledTableRow>
                                    ))}
                                  </TableBody>
                                  </Table>
                                  </TableContainer>
                                   )}           
                                  </DialogContent>
                              <DialogActions>
                                <Button onClick={()=>{
                                  setBed(false) 
                                  dispatch(setemptypatientbyroom())
                                  }}>cancel</Button>
                              </DialogActions>
                          </Dialog>
                        )}
        </div>
    </div>
  )
}

export default AdminDashboard

