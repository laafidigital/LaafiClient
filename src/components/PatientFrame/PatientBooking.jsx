import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Select from '@mui/material/Select';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { IconButton } from '@mui/material';
import { FormControl } from '@mui/base/FormControl';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import {  useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { setaddpatientInput ,setError,setInputdataArray,resetInput,incrementMRN, incrementENO, incrementToken ,refreshToken,setconsultationarray } from '../Store/AddpatientSlice';
import { setDoctorArray, setemptyregisterdoctor } from '../Store/Doctor/AddDoctorSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { GetConsultation, GetDocShecduleById, GetPackages, GetRoleById, GetServiceGroups, GetServices, GetServicesByGroupId, GetServicesById, GetServicesByServiceids, GetTimeSlotsBydocid, GetUserById, GetuserDataById, PostConsultation, PostPayinvoice } from '../Store/Actions';
import { GetDepartmentData } from '../Store/ApiReducers/Auth';
import { jwtDecode } from 'jwt-decode';
import { removepatientselectedservices, setemptypatientservices, setpatientservicestatus } from '../Store/PatientFrame/Bookconsultation';
import Servicebygroupid from '../Admin/Reusablecomponents/Servicebygroupid';
import { setemptyservicesbyserviceids } from '../Store/AddservicesSlice';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Getdoctorbydepid, GetRegisterdDoctors, GetRegisterdPatients, } from '../Store/ApiReducers/Auth';
import { GetDoctorSlotsForTheWeek } from '../Store/ApiReducers/DoctorSchedules';
import Slotbooking from './Slotbooking';
import { PostCreateMeeting } from '../Store/ApiReducers/Conference';
import { CircularProgress } from '@mui/material';
// import { load } from "@cashfreepayments/cashfree-js";
import PaymentSuccessAnimation from './PymtPopup'
import PymtfailPopup from './PymtfailPopup';
import { UpdatePersonalDetails } from '../Store/ApiReducers/Auth';

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
  

const StyledSelect = styled(Select)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white', // Set the border color to white
      },
      '&:hover fieldset': {
        borderColor: 'white', // Set the border color to white on hover
      },
    },
    '& .MuiSelect-select': {
      color: 'white', // Set the text color to white
      '&:focus': {
        backgroundColor: 'transparent', // Set the background color to transparent when focused
      },
    },
    '& .MuiSelect-icon': {
      color: 'white', // Set the dropdown icon color to white
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '1px',
      borderColor: 'white', // Set the border color to white
    },
  }));


const PatientBooking = () => {

    const dispatch=useDispatch()
    const navigate=useNavigate()
    const location=useLocation()

    const match = location.pathname.match(/patientbooking\/([^/]+)/);
    let docid = match ? match[1] : null;
    
    // const { error, isLoading, Razorpay } = useRazorpay();
     
    const getservices=useSelector((state)=>state.Addservices.servicesbyid)
    const getdoctorbydepid=useSelector((state)=>state.Adddoctor.doctoronlybyid)
    const getpackages=useSelector((state)=>state.Addpackages.getpackages)
    const getdepartment=useSelector((state)=>state.Adddepartment.departmentArray)
    const userdata=useSelector((state)=>state.Assignrole.userbyid)
    const userById=useSelector((state)=>state.Addpatentdetails.registerdpatients)
    const Notimeslotavailable=useSelector((state)=>state.Adddoctor.error)
    const timesSlotes=useSelector((state)=>state.Adddoctor.timeSlotsbydocId)
    const getregdoctors=useSelector((state)=>state.Adddoctor.registerddoctor)
    const getservicegroup=useSelector((state)=>state.Addservices.servicegroups)
    const getservicesbygroupid=useSelector((state)=>state.Addservices.servicesbygroupid)
    const patientservicestatus=useSelector((state)=>state.Bookconsultation.patientservicestatus)
    const selectedservices=useSelector((state)=>state.Bookconsultation.patientselectedservices)
    const servicesbyserviceids=useSelector((state)=>state.Addservices.servicesbyserviceids)
    const doctorslotfortheWeek=useSelector((state)=>state.Adddoctor.doctorSlotFortheWeek)
    // let cashfree;

    // var initializeSDK = async function () {
    //     cashfree = await load({
    //         mode: "sandbox",
    //     });
    // };
    // initializeSDK();

    const [loading, setLoading] = useState(false);
    const currentDateTime = new Date().toLocaleString();
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    
    const [inputfeilddata,setinputfeilddata]=useState({DepartmentName:'',DoctorName:'',mrn:'',name:'',phone:'',email:'',relation:'',docID:'',deptID:'',address:'',gender:'',type:'online',allergy:'',consultationDate:'',consultTime:'',servicegroup:[],services:[],packages:[],price:''})
    const [consulted,setconsulted]=useState()
    const [open, setOpen] = React.useState(false);
    const [error,seterror]=useState(null)
    const [priceDetails,setPriceDetails]=useState()
    const [doccalender,setdoccalender]=useState(false)
    const [isSecondDialogOpen, setIsSecondDialogOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isdoctorid,setisdoctorid]=useState(true)
    const [doctorId,setdoctorId]=useState({id:'',type:''})
    const prevPriceDetails = useRef(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentFailed, setPaymentFailed] = useState(false);
    const Token =localStorage.getItem('accessToken')
    useEffect(()=>{
      if(Token){
        const decodedToken = jwtDecode(Token);
        const Id=decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
        dispatch(GetRegisterdPatients(Id))
        const decodedDate=new Date(decodedToken.exp*1000)
        const decodedname = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
        localStorage.setItem('username',decodedname)
      }
      dispatch(GetDepartmentData())
      // dispatch(GetConsultation())
      // dispatch(GetServices())
      // dispatch(GetPackages())
      // dispatch(GetServiceGroups(''))
    },[Token])

    useEffect(()=>{
      if(userById && userById.length>0){
        setinputfeilddata((prev)=>({
          ...prev,
          mrn: userById[0].MRN || null,
          name: userById[0].Name || null,
          email: userById[0].Email || null,
          phone: userById[0].PhoneNumber || null,
          relation: userById[0].Relation || 'myself',
          address: userById[0].Address || null,
          gender: userById[0].gender || 'male',
        }))
      }
      if(priceDetails && prevPriceDetails.current !== priceDetails){
        const grandTotal = getTotalPrice();
        setinputfeilddata((prev) => ({
          ...prev,
          price: grandTotal
        }));
        prevPriceDetails.current = priceDetails; 
      } 
      else if(docid && isdoctorid){
        setinputfeilddata({...inputfeilddata,docID:docid})
        setLoading(true); 
        dispatch(GetDoctorSlotsForTheWeek(docid)).then((res)=>{
          setIsSecondDialogOpen(true)
          setLoading(false); 
        }).catch((err)=>{
          setLoading(false); 
        })
        dispatch(GetRegisterdDoctors(docid)).then((res)=>{
          setinputfeilddata({...inputfeilddata,DoctorName:res.Name,deptID:res.PrimaryDepartmentId})
        })
      }
    },[userdata,priceDetails,userById,docid])

    useEffect(()=>{
    if(getregdoctors){
          setPriceDetails((prev)=>({
           ...prev,
           price:getregdoctors.Fee ? getregdoctors.Fee : 0
        }))
      }
      if(selectedservices && selectedservices.length>0){
        let total=0
        selectedservices.forEach(service=>{
          total += parseFloat(service.price)
        })
        setPriceDetails((prev)=>({
          ...prev,
          servicesum:total
        }))
      }
    },[getregdoctors,selectedservices])
    
    const handleinputchange=(e)=>{
      const {name,value}=e.target
      if(name=='deptID'){
        // if(value.Id===4){
        //   dispatch(Getdoctorbydepid(''))
        //   dispatch(GetServicesById(''))
        // }
        // else{
          //dispatch(GetServicesById(value.Id))
          dispatch(Getdoctorbydepid(value.Id))
        // }
        setinputfeilddata((prev)=>({
          ...prev,
          [name]:value.Id,
          DepartmentName:value.Name
        }))
       }
    
      else if(name ==='services'){
        const selected=e.target.value
        const servicearray = selected[selected.length >1 ? selected.length-1 :0]
        setinputfeilddata((prev)=>({
          ...prev,
          servicegroup:selected
        }))
        //dispatch(GetServicesByGroupId(servicearray))
        dispatch(setpatientservicestatus(true))
        
      }
      else if(name=='type'){
        setdoctorId({...doctorId,type:value})
        setinputfeilddata((prev)=>({
          ...prev,
          [name]:value
        }))
      }
      else if(name ==='packages'){
        const selectedPackages = e.target.value
        setinputfeilddata((prev)=>({
          ...prev,
          packages:value
        }))

        if(selectedPackages){
          let totalAmount=0
          selectedPackages.forEach((packages)=>{
            const pakageData=getpackages.find((item)=>item.Id===packages)
            const packagePrice = pakageData ? parseFloat(pakageData.Price) : 0;
            totalAmount+=packagePrice
          })
          setPriceDetails((prv)=>({
            ...prv,
            packageprice:totalAmount})
            )
         }
      }
      else{
        setinputfeilddata((prev)=>({
          ...prev,
          [name]:value
        }))
      }
    }
    const handledepchange=(value,type)=>{
      
      if (type=='department'){
        // if(value.Id===4){
        //   dispatch(Getdoctorbydepid(''))
        //   dispatch(GetServicesById(''))
        // }
        // else{
          //dispatch(GetServicesById(value.Id))
          dispatch(Getdoctorbydepid(value.Id))
        // }
          setinputfeilddata((prev)=>({
            ...prev,
            deptID:value.Id,
            DepartmentName:value.Name
          }))
        
      }
      else {
        setdoctorId({ ...doctorId, id: value.Id });
        setLoading(true); 
        dispatch(GetRegisterdDoctors(value.Id));
        dispatch(GetDoctorSlotsForTheWeek(value.Id))
            .then((res) => {
                setIsSecondDialogOpen(true);
                setLoading(false); 
            })
            .catch((err) => {
                setLoading(false); 
            });
        
        setinputfeilddata((prev) => ({
            ...prev,
            docID: value.Id,
            DoctorName: value.Name
        }));
    }
};

    const handleClickOpen = () => {
        const services=selectedservices && selectedservices.length>0 ?selectedservices.map(item=>item.Id).join(','):null
        dispatch(GetServicesByServiceids(services))
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
        dispatch(setemptyservicesbyserviceids())
      };
      

      // datedialogebox functions
      const handleCloseDialog = () => {
        setdoccalender(false);
      };


      const handleDateChange = (date) => {
         
        setIsSecondDialogOpen(true)
        const Consultate= new Date(date)
        const year = Consultate.getFullYear();
        const month = String(Consultate.getMonth() + 1).padStart(2, '0');
        const day = String(Consultate.getDate()).padStart(2, '0');
        
        const formattedcosultDate = `${year}-${month}-${day}`;
        setinputfeilddata((prev)=>({
          ...prev,
          consultationDate:formattedcosultDate
        }))
        dispatch(GetTimeSlotsBydocid(formattedcosultDate,inputfeilddata.docID))
      };

      const onClickTime=(time)=>{
        setinputfeilddata((prev)=>({
          ...prev,
          consultTime:time
        }))
      }

      const handleCloseSecondDialog = () => {
        setinputfeilddata({...inputfeilddata,consultationDate:''})
        setIsSecondDialogOpen(false);
        setdoccalender(false)
      };

      const getTotalPrice = () => {
        let totalPrice = 0;

        if (priceDetails) {
          Object.keys(priceDetails).forEach((key) => {
            totalPrice += parseFloat(priceDetails[key]) ;
          });
        }
        return totalPrice; 
      };

      const validateData=()=>{
        if(!inputfeilddata.docID && inputfeilddata.services.length==0){
          seterror('Either doctor or services should select')
       }
       else{seterror("")}
      }

      const handleSlotChange=(slot)=>{
        setinputfeilddata((prev) => ({
          ...prev,
          consultationDate: slot.consultationDate || prev.consultationDate,
          consultTime: slot.consultTime || prev.consultTime,  
        }));
        if(slot.consultTime){
          setIsSecondDialogOpen(false)
        }
      }
      const handleDoctorSelection = async (value) => {
        try {
          localStorage.setItem('patientEmail', inputfeilddata.email);
          const personalDetails = {
            Name: inputfeilddata.name,
            Phone: inputfeilddata.phone,
            Email: inputfeilddata.email,
            Address: inputfeilddata.address
          };
          
          await dispatch(UpdatePersonalDetails(personalDetails));
          
          // Then handle doctor selection
          handledepchange(value, 'doctor');
        } catch (error) {
          // console.error("Error updating personal details:", error);
          // toast.error("Failed to update personal details");
        }
      };
// livekey:"rzp_live_fwcUYoyXPoakL8"
const handlepayment = (data) => {
  const combinedDateTime = `${inputfeilddata.consultationDate}T${inputfeilddata.consultTime}:00`;
  const localDateTime = new Date(combinedDateTime);
  const utcDateTime = localDateTime.toISOString();
  const patientEmail = localStorage.getItem('patientEmail') || inputfeilddata.email;
  var options = {
      key: "rzp_test_p2L7ixWPGijQ8o",
      amount: inputfeilddata.price,
      currency: "INR",
      name: "Laafi",
      order_id: data.Order.Id,
      handler: async function (response) {
          if (response) {
              const updateddata = {
                  InvoiceNumber: data.InvoiceNumber,
                  razorpayPaymentId: response.razorpay_payment_id,
              };

              try {
                  // Post the payment invoice
                  await dispatch(PostPayinvoice(updateddata));

                  if (inputfeilddata.type === 'online') {
                      await dispatch(PostCreateMeeting(inputfeilddata.docID ? inputfeilddata.docID : null, data.ConsultationId, utcDateTime,patientEmail,inputfeilddata.phone));
                  }

                  // Only reset state and navigate after all operations are successful
                  setPaymentSuccess(true);
                  setinputfeilddata({ docID: '', deptID: '', allergy: '', consultationDate: '', consultTime: '', servicegroup: [], services: [], packages: [], price: '', type: 'out_patient' });
                  setPriceDetails(null);
                  dispatch(setemptypatientservices());
                  dispatch(setemptyregisterdoctor(null));
                  setIsSecondDialogOpen(false);
                  setisdoctorid(false);

                  setTimeout(() => {
                      navigate(`/patient/patientdashboard`, { state: { value: 'My Schedules' } });
                  }, 5000);
              } catch (error) {
                  console.error("Payment or meeting creation failed:", error);
                  setPaymentFailed(true);
              }
          }
      },
      prefill: {
          name: inputfeilddata.name,
          email: inputfeilddata.email,
          contact: inputfeilddata.phone,
      },
      notes: {
          address: "Razorpay Corporate Office",
      },
      theme: {
          color: "#3399cc",
      },
      modal: {
          ondismiss: function () {
              setPaymentFailed(true);
              setTimeout(() => {
                  navigate(`/patient/patientdashboard`, { state: { value: 'My Schedules' } });
              }, 5000);
          },
      },
  };

  var pay = new window.Razorpay(options);
  pay.open();
};
const formSubmit = (e) => {
  e.preventDefault();
  const EmptyAllError = Object.values(error).every(errors => errors === "");
  const updateddata = {
    DoctorName: inputfeilddata.DoctorName ? inputfeilddata.DoctorName : null,
    PatientName: inputfeilddata.name ? inputfeilddata.name : null,
    DepartmentName: inputfeilddata.DepartmentName ? inputfeilddata.DepartmentName : null,
    MRN: inputfeilddata.mrn,
    DoctorId: inputfeilddata.docID ? inputfeilddata.docID : null,
    DepartmentId: inputfeilddata.deptID,
    Relation: inputfeilddata.relation,
    Gender: inputfeilddata.gender,
    Allergy: inputfeilddata.allergy ? inputfeilddata.allergy : null,
    Fee: inputfeilddata.price ? inputfeilddata.price : null,
    ConsultationDate: inputfeilddata.consultationDate,
    ConsultationTime: inputfeilddata.consultTime,
    Services: selectedservices && selectedservices.length > 0 ? selectedservices.map((item) => item.Id).join(',') : null,
    Packages: inputfeilddata.packages && inputfeilddata.packages.length > 0 ? inputfeilddata.packages.map((item) => item).join(',') : null,
    Type: inputfeilddata.type,
  };
  if (EmptyAllError) {
    dispatch(PostConsultation(updateddata)).then((res) => {
      handlepayment(res.data);
    }).catch((err) => {
      // Handle error
    });
  }
};
      useEffect(() => {
        return () => {
          setPaymentSuccess(false);
        };
      }, []);
      useEffect(() => {
        return () => {
          setPaymentFailed(false);
        };
      }, []);

  return (
    <div>
      <div className='patientmaindiv'>
      <ToastContainer/>
      <form onSubmit={formSubmit} className='d-flex justify-content-center' > 
        {consulted  && consulted[0].status ===0 ?(
          <div>
            <h2 style={{color:'black'}}>Sorry You Can't Take Any Appointments </h2>
          </div>
        ):(
            <FormControl className='d-flex justify-content-between'>
                {error && <div className='error-message_addpatient'>{error}</div>} 
                <div className='patientform'>
                     <div class="mb-3 row">
                        <label  class="col-sm-2 col-form-label">MRN</label>
                        <div class="col-sm-10">
                        <input type="text" className="form-control" name="mrn"  value={inputfeilddata && inputfeilddata.mrn}/>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label  class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                        <input type="text" className="form-control" name="name"  value={inputfeilddata && inputfeilddata.name}/>
                        </div>
                        {/* <div className='error-message_addpatient'>{errors.name}</div> */}
                    </div>
                    <div class="mb-3 row d-flex">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Phone</label>
                        <div class="col-sm-10">
                        <input type="text" class="form-control" name='phone' value={inputfeilddata && inputfeilddata.phone}/>
                        </div>
                        {/* <div className='error-message_addpatient'>{errors.number}</div> */}

                    </div>
                  
                    <div class="mb-3 d-flex">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Relation</label>
                        <FormControl sx={{ m: 1, width: 400 }}>
                                <StyledSelect
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                name='relation'
                                value={inputfeilddata.relation}
                                // onChange={handleinputchange}  
                                className="relationfeild"
                                >
                                  <MenuItem value="myself">myself</MenuItem>
                                  <MenuItem value="father">father</MenuItem>
                                  <MenuItem value="mother">mother</MenuItem>
                                  <MenuItem value="son">son</MenuItem>
                                  <MenuItem value="daughter">daughter</MenuItem>
                                  <MenuItem value="grandfather">grandfather</MenuItem>
                                  <MenuItem value="grandmother">grandmother</MenuItem>
                                  <MenuItem value="others">others</MenuItem>
                               </StyledSelect>
                        </FormControl>
                           <label for="inputPassword" class="col-sm-2 col-form-label">Department</label>
                           <FormControl sx={{ m: 1, width: 400 }}>
                                <StyledSelect
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                name='deptID'
                                value={inputfeilddata.deptID}
                                onChange={(event) => {
                                  const selectedName = event.target.value; // Get the selected department name
                                  const selectedDep = getdepartment.find(dep => dep.Id === selectedName); // Find the full dep object
                                  handledepchange(selectedDep,'department'); // Pass the full dep object to the handler
                              }}
                                className="departmentfeild "
                                >
                              {getdepartment.map((dep,index)=>(
                                  <MenuItem  value={dep.Id} key={index} className='menuitemfeild'>
                                      {dep.Name}
                                  </MenuItem>
                              ))} 
                               </StyledSelect>
                        </FormControl>
      
                    </div>
                   
                    <div className='d-flex justify-content-around'>
                    {/* <div className='error-message_addpatient'>{errors.relation}</div>
                    <div className='error-message_addpatient'>{errors.department}</div> */}
                    </div>
                    <div class="mb-3 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                        <input type="Email" readonly class="form-control" name='email' onChange={handleinputchange}  value={inputfeilddata.email}/>
                        </div>
                        {/* <div className='error-message_addpatient'>{errors.email}</div> */}

                    </div>
                    <div class="mb-3 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Address</label>
                        <div class="col-sm-10">
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="1" name='address' value={inputfeilddata.address} onChange={handleinputchange}></textarea>
                        </div>
                        {/* <div className='error-message_addpatient'>{errors.address}</div> */}
                    </div>

                    <div className='d-flex justify-content-around ' >
                         <select class="form-select form-select-lg mb-3" aria-label="Default select example" style={{borderRadius:'5px',border:'none'}} name='gender'  onChange={handleinputchange} placeholder='gender'>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                        </select>
                       
                         <div class="mb-3 d-flex">
                            <select class="form-select-lg mb-3" aria-label="Default select example" style={{borderRadius:'5px',border:'none'}} name='type'  onChange={handleinputchange}>
                              <option value="online">Online</option>
                              {/* <option value="out_patient">Out patient</option> */}
                            </select>
                         </div>
                        
                      
                    </div>
                    <div className='d-flex'  >
                       
                    </div>
                    <div class="mb-3 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Allergy</label>
                        <div class="col-sm-10">
                        <input type="text"  class="form-control" name='allergy'  onChange={handleinputchange} />
                        </div>
                    </div>
                    <div class="mb-3 d-flex">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Doctor</label>
                        <FormControl sx={{ m: 1, width: 400 }}>
                                <StyledSelect
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                name='doctor'
                                value={inputfeilddata.docID}
                                onChange={(event) => {
                                  const selectedName = event.target.value;
                                  const selectedDoc = getdoctorbydepid.find(doc => doc.Id === selectedName);
                                  handleDoctorSelection(selectedDoc, 'doctor');
                                }}
                                style={{width:'300px',marginLeft:'5px',height:'40px'}}
                                >
                                  {getdoctorbydepid !==null
                                    ? getdoctorbydepid.map((doctor, index) => (
                                        <MenuItem value={doctor.Id} key={index}>
                                          {doctor.Name}
                                        </MenuItem>
                                      ))
                                    : 
                                      <div>Select A Department</div>
                                      }
                               </StyledSelect>
                        </FormControl>
                    </div>
                        
                        {/* <div className='error-message_addpatient'>{errors.services}</div> */}
                    <div className='d-flex' style={{marginRight:'50px'}}>
                        <label for="staticEmail" class="col-sm-2 col-form-label mr-3"> Amount</label>
                        {/* <CurrencyRupeeIcon style={{height:'20px',marginTop:'10px'}}/> */}
                        <div  style={{width:'150px'}}>
                        <input type="number" className="form-control pricefeild" id="staticEmail" style={{width:'140px', backgroundColor:'#B8B8B8'}} name='price'  value={inputfeilddata.price}/>
                        </div>
                        <Button variant="contained" className='ml-5' type='submit' style={{backgroundColor:'black'}} onClick={validateData}>submit</Button>
                    </div> 
                        {/* <div className='error-message_addpatient'>{errors.amount}</div> */}
                </div>
                {(inputfeilddata.consultationDate || inputfeilddata.consultTime) &&(
                <div className='patient_time'>
               
                  <div className='mt-3'>
                    <div className='d-flex'>
                      <CalendarMonthIcon/>
                      <h6 className='ml-2'>Consultation Date:</h6>
                      <h6><mark style={{backgroundColor:'yellow'}}>{inputfeilddata.consultationDate}</mark></h6>
                    </div>
                    <div className='d-flex '>
                      <AccessTimeIcon/>
                      <h6 className='ml-2'>Consultation Time:</h6>
                      <h6><mark style={{backgroundColor:'yellow'}}>{inputfeilddata.consultTime}</mark></h6>
                    </div>
                  </div>
                </div>
                )}
            </FormControl>
        )}
            <PaymentSuccessAnimation open={paymentSuccess} onClose={() => setPaymentSuccess(false)} />
            <PymtfailPopup open={paymentFailed} onClose={()=>setPaymentFailed(false)}/>
            <div className='d-flex'>
                        <Dialog open={doccalender} onClose={handleCloseDialog}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <StaticDatePicker
                              orientation="landscape"
                              disablePast
                              value={selectedDate} 
                              onChange={handleDateChange}
                            />
                        </LocalizationProvider>
                        </Dialog>
                        {loading && (
                            <div style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.4)', 
                                zIndex: 9999,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <CircularProgress  style={{ color: 'white' }} />
                            </div>
                        )}
                        <Dialog open={isSecondDialogOpen} >
                          <DialogTitle style={{ color: 'black', fontFamily: 'times new roman' }}> Select Your Time</DialogTitle>
                          <DialogContent>
                            <Slotbooking onsloteChange={handleSlotChange}/>
                      
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCloseSecondDialog}>close</Button>
                        </DialogActions>
                        </Dialog>
            </div>
            </form>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title" color={'inherit'} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  Lab Services
                  <div>{currentDateTime}</div>
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
          {inputfeilddata.services  && inputfeilddata.services.length > 0 &&(
          <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Services</StyledTableCell>
                            <StyledTableCell align="center">Price</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                      {servicesbyserviceids && servicesbyserviceids.map((item)=>{
                        return(
                      <StyledTableRow>
                         <StyledTableCell align="center">{item.ServiceName}</StyledTableCell>
                         <StyledTableCell align="center">{item.Price}</StyledTableCell>
                     </StyledTableRow>
                        )
                       })}
                    </TableBody>
                </Table>
            </TableContainer>
          )}
            {inputfeilddata && inputfeilddata.docID  && (
             <TableContainer component={Paper}>
             <Table sx={{ minWidth: 500 }} aria-label="customized table">
                 <TableHead>
                     <TableRow>
                         <StyledTableCell align="center">Doctor</StyledTableCell>
                         <StyledTableCell align="center">Price</StyledTableCell>
                         
                     </TableRow>
                 </TableHead>
                 <TableBody>
                 {getdoctorbydepid.filter((item)=>item.Id===inputfeilddata.docID).map((inneritem)=>(
                  <StyledTableRow>
                        <StyledTableCell align="center">{inneritem.UserName}</StyledTableCell>
                        <StyledTableCell align="center">{inneritem.Fee}</StyledTableCell>
                   </StyledTableRow>
                 ))}
                 </TableBody>
             </Table>
         </TableContainer>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions className='d-flex justify-content-between pl-4 pr-4'>
          <Button onClick={handleClose} autoFocus>
           close
          </Button>
        </DialogActions>
      </Dialog>
      
      {patientservicestatus &&(
        <Servicebygroupid data={getservicesbygroupid}/>
      )}
      </div>
    </div>
  )
}

export default PatientBooking