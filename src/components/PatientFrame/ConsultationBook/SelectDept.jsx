import React, { useEffect, useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import laafilogo from '../../../assets/Logos/laafiheader_transparentlogo.png'
import rightarrow from '../../../assets/rightarrow.svg'
import { jwtDecode } from 'jwt-decode';
import { Getdoctorbydepid, GetRegisterdDoctors, GetRegisterdPatients } from '../../Store/ApiReducers/Auth';
import { GetDepartmentData } from '../../Store/ApiReducers/Auth';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { FormControl } from '@mui/base/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { GetConsultation, GetDocShecduleById, GetPackages, GetRoleById, GetServiceGroups, GetServices, GetServicesByGroupId, GetServicesById, GetServicesByServiceids, GetTimeSlotsBydocid, GetUserById, GetuserDataById, PostConsultation, PostPayinvoice } from '../../Store/Actions';
import { GetDoctorSlotsForTheWeek } from '../../Store/ApiReducers/DoctorSchedules';
import docimg from '../../../assets/doctor.jpeg'
import hospitalimg from '../../../assets/svg/clinic2.svg'
import onlineimg from '../../../assets/svg/online.svg'
import { toast } from 'react-toastify'
import Razorpay from '../../Razorpay'
import dayjs from 'dayjs';

const SelectDept = () => {
    const navigate=useNavigate()
    const location=useLocation()
    const match = location.pathname.match(/department\/([^/]+)/);
    let consultationtype = match ? match[1] : null;
    const [showBreakdown, setShowBreakdown] = useState(false);
    const dispatch=useDispatch()
    const userById=useSelector((state)=>state.Addpatentdetails.registerdpatients)
    const getdepartment=useSelector((state)=>state.Adddepartment.departmentArray)
    const getdoctorbydepid=useSelector((state)=>state.Adddoctor.doctoronlybyid)
    const [inputfeilddata,setinputfeilddata]=useState({DepartmentName:'',DoctorName:'',mrn:'',name:'',phone:'',email:'',relation:'',docID:'',deptID:'',address:'',gender:'',type:'out_patient',allergy:'',consultationDate:'',consultTime:'',servicegroup:[],services:[],packages:[],price:'',Dob:''})
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [doctorId,setdoctorId]=useState({id:'',type:''})
    const doctorslotfortheWeek=useSelector((state)=>state.Adddoctor.doctorSlotFortheWeek)
    const [weeklySlots, setWeeklySlots] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);

  
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
          gender: userById[0].Gender || '',
          Dob:userById[0].Dob||''
        }))
    }
},[userById])

const handledepchange = (value, type) => {
   
    if (type === 'department' && value) {
        dispatch(Getdoctorbydepid(value.Id));
        setinputfeilddata((prev) => ({
            ...prev,
            deptID: value.Id,
            DepartmentName: value.Name,
        }));
    } else {
        console.error('Invalid department selected');
    }
};

const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    dispatch(GetDoctorSlotsForTheWeek(doctor.Id))
        .then((response) => {
            setWeeklySlots(response);
        })
        .catch((error) => {
            console.error('Error fetching doctor slots:', error);
        });
};

const handleSlotSelect =(slot)=>{
    setSelectedSlot(slot)
}

const handlePayAndConfirm = async () => {
  if (!selectedDoctor || !selectedDay || !selectedSlot) {
    alert("Please select a doctor, day, and time slot.");
    return;
  }
  const selectedDate = new Date(selectedDay);
  const [hours, minutes] = selectedSlot.split(":").map(Number);
  selectedDate.setHours(hours, minutes, 0, 0);

  const consultationSlot = selectedDate.toISOString();

  const payload = {
    DoctorName: selectedDoctor.Name,
    PatientName: inputfeilddata.name,
    DepartmentName: inputfeilddata.DepartmentName,
    MRN: inputfeilddata.mrn,
    DoctorId: selectedDoctor.Id,
    Gender: inputfeilddata.gender,
    Fee: selectedDoctor.Fee,
    Dob: inputfeilddata.Dob,
    ConsultationSlot: consultationSlot,
    DepartmentId: inputfeilddata.deptID,
    ConsultationType: consultationtype,
  };

  try {
    const response = await dispatch(PostConsultation(payload));

    if (response && response.data) {
      const invoiceNumber = response.data.InvoiceNumber;
      const newConsultationId = response.data.ConsultationId;
      const orderId = response.data.Order?.Id;
      const amount = response.data.Order?.Amount;
      const currency = response.data.Order?.Currency;

      // Proceed to initiate Razorpay payment
      initiateRazorpayPayment(orderId, amount, currency, invoiceNumber, newConsultationId);
    }
  } catch (error) {
    console.error("Error booking consultation:", error);
    alert("Failed to book consultation. Please try again.");
    if (error.response) {
      console.error('Error Response:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers,
      });
  } else if (error.request) {
      console.error('Error Request:', error.request);
  } else {
      console.error('Error Message:', error.message);
  }
  }
};

const initiateRazorpayPayment = (orderId, amount, currency, invoiceNumber, consultationId) => {

  const options = {
    key: Razorpay.testkey, 
    amount: amount,
    currency: currency,
    name: "Laafi",
    order_id: orderId,
    handler: function (response) {
      navigate('/patient/patientdashboard')
    },
    prefill: {
      name: inputfeilddata.name,
      contact: inputfeilddata.phone,
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};


const isSlotDisabled = (day, timeSlot) => {
  const now = dayjs();
  const slotTime = dayjs(`${day} ${timeSlot}`);
  return slotTime.isBefore(now);
};

const formatDay = (day) => dayjs(day).format("dddd, MMMM D, YYYY");

return (

    <div className='docdash_maindiv'>
        <div className='docdash_maindiv_container'>
            <div className='docdash_content1_main'>
        
            <div className="content_div">
            <div
                className="frame_505"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                    <p className="book_consultation">Book a consultation</p>
                    {consultationtype === 'online' ? (
                      <img src={onlineimg} alt="Online Consultation" style={{ width: '40px', height: '40px', marginRight: '40px' }} />
                    ) : (
                      <img src={hospitalimg} alt="Out Patient Hospital" style={{ width: '40px', height: '40px', marginRight: '40px' }} />
                    )}
                </div>
                <div className="frame-492">
                <p className="frame-492-text">{inputfeilddata.name}, {inputfeilddata.phone}</p>
                </div>
            <div style={{ position: 'relative', width: '100%', maxWidth: '450px', margin: '20px auto' }}>
            <select
                className="form-select form-select-lg mb-3"
                aria-label="Department select"
                name="deptID"
                style={{
                    borderRadius: '15px',
                    border: 'none',
                    width: '100%',
                    height: '80px',
                    fontFamily: 'Roboto Slab, sans-serif',
                    fontWeight: 500,
                    fontSize: '24px',
                    lineHeight: '32px',
                    textAlign: 'center',
                    color: '#4A4A4A',
                    boxShadow: '-2px 2px 4px 2px rgba(0, 0, 0, 0.25)',
                    padding: '10px',
                  }}
                value={inputfeilddata.deptID}
                onChange={(event) => {
                    const selectedId = event.target.value;
               
                    const selectedDep = getdepartment.find((dep) => String(dep.Id) === selectedId); // Ensure type match
                    if (selectedDep) {
                        handledepchange(selectedDep, 'department');
                    } else {
                        console.error('Selected department not found');
                    }
                }}
            >
                <option value="" disabled>Select Department</option>
                {getdepartment.map((dep) => (
                    <option key={dep.Id} value={String(dep.Id)}> 
                        {dep.Name}
                    </option>
                ))}
            </select>

            </div>

            {selectedDoctor && (
              <div className='datarow'>
                <div className="doctor-card2">
                    <img src={docimg} className="image-container2"/>
                    <p className="doctor-name2">Dr.{selectedDoctor.Name}</p>
                    <p className="doctor-details2">{selectedDoctor.PhoneNumber}</p>
                </div>    
                {selectedDay && selectedSlot && (
                <div className="selected-slot-info">
                <p className="doctor-name2">Date : {selectedDay}</p>
                <p className="doctor-name2">Time : {selectedSlot}</p>
                </div>
              )}
              </div>     
            )}

            {selectedDay && selectedSlot && (
                <div className="payment-section">
                  <p
                    className="total-payable"
                    onMouseEnter={() => setShowBreakdown(true)}
                    onMouseLeave={() => setShowBreakdown(false)}
                  >
                    Total Payable: {selectedDoctor.Fee}
                  </p>
                  {showBreakdown && (
                    <div className="payment-breakdown">
                      <h3 className="payment-summary">Payment Summary</h3>
                      <div className="breakdown-item">
                        <span className="item-label">Consultation Fee:</span>
                        <span className="item-value">{selectedDoctor.Fee}</span>
                      </div>
                      {/* <div className="breakdown-item">
                        <span className="item-label">Convenience Fee:</span>
                        <span className="item-value">$1</span>
                      </div> */}
                      <hr className="divider" />
                      <div className="breakdown-item total">
                        <span className="item-label">Total Payable:</span>
                        <span className="item-value">{selectedDoctor.Fee}</span>
                      </div>
                    </div>
                  )}
                  <button className="pay-button" onClick={handlePayAndConfirm}>Pay & Confirm</button>
                </div>
              )}
            </div>
        </div>
        
        <div className="content2_main">
            <div className="content2_second_div">
            {!selectedDoctor && getdoctorbydepid && getdoctorbydepid.length > 0 ? (
            <div>
                <h3 className='book_consultation'>Who would you like to consult?</h3>
              <div className="doctor_list">
                {getdoctorbydepid.map((doctor) => (
                  <button
                    key={doctor.Id}
                    className="doctor_card"
                    onClick={() => handleDoctorSelect(doctor)}
                  >
                    <p className="doctor_name">Dr.{doctor.Name}</p>
                    <p className="doctor_speciality">{doctor.PhoneNumber}</p>
                  </button>
                ))}
              </div>
            </div>
            ) : !selectedDoctor ? (
              <div className="content2_imagediv">
                <img src={laafilogo} alt="Logo" />
              </div>
            ) : (
                <div className="slots_container">
          <h3 className='book_consultation'>When would you like to consult?</h3>

          <div className="days_container">
            {weeklySlots.map((daySlot) => (
              <div
                key={daySlot.day}
                className={`day_card ${selectedDay === daySlot.day ? "active" : ""}`}
                onClick={() => {
                  setSelectedDay(daySlot.day);
                  setSelectedSlot(null); 
                }}
              >
                {daySlot.day}
              </div>
            ))}
          </div>
          {selectedDay && (
              <div className="slots_for_day">
                <h4>Available Slots for {selectedDay}</h4>
                <div className="time_slots">
                  {weeklySlots
                    .find((daySlot) => daySlot.day === selectedDay)
                    ?.slots
                    .filter((slot) => {
                      const currentTime = new Date();
                      const currentHours = currentTime.getHours();
                      const currentMinutes = currentTime.getMinutes();
                      const currentFormattedTime = `${String(currentHours).padStart(2, '0')}:${String(currentMinutes).padStart(2, '0')}`;

                      const isToday = selectedDay === new Date().toISOString().split('T')[0]; // Format the selected day to "YYYY-MM-DD"
                      
                      if (isToday) {
                        return !slot.status && slot.timeSlot > currentFormattedTime;
                      } else {
                        return !slot.status; 
                      }
                    })
                    .map((slot, index) => (
                      <button
                        key={index}
                        className={`slot_button ${
                          selectedSlot === slot.timeSlot ? "selected" : ""
                        }`}
                        onClick={() => setSelectedSlot(slot.timeSlot)}
                      >
                        {slot.timeSlot}
                      </button>
                    ))}
                </div>
              </div>
            )}

        </div>
            )}
          </div>
        </div>

      </div>
    </div> 
 )
}

export default SelectDept