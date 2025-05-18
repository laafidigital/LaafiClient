import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { MdOutlinePayment } from "react-icons/md";
import VideoCallTwoToneIcon from '@mui/icons-material/VideoCallTwoTone';
import { IconButton } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { GetPatientConsultation, GetInvoiceDetailsByInvoiceNo, PostPayinvoice } from '../Store/Actions';
import { PostCreateMeeting } from '../Store/ApiReducers/Conference';

const Myschedule = (props) => {
  const dispatch = useDispatch();
  const Token = localStorage.getItem('accessToken');

  const consultationBymrn = useSelector((state) => state.Addpatentdetails.consultationByMrn);
  const [scheduledata, setscheduledata] = useState([]);
  const [timers, setTimers] = useState({});
  const [videoButtonStates, setVideoButtonStates] = useState({});
  
  useEffect(() => {
    if (Token !== null) {
      const decodedToken = jwtDecode(Token);
      const Id = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      dispatch(GetPatientConsultation(Id));
    }
  }, [Token]);

  useEffect(() => {
    if (consultationBymrn && consultationBymrn.length > 0) {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      const filteredConsultations = consultationBymrn.filter(item => {
        const consultationDate = new Date(item.ConsultationDate);
        consultationDate.setHours(0, 0, 0, 0);
        return consultationDate >= currentDate && item.ConsultStatus === false;
      });
      setscheduledata(filteredConsultations);
    }
  }, [consultationBymrn]);

  useEffect(() => {
    const timerIntervals = {};
    // Commenting out entire timer logic as per your request
    /*
    const buttonStates = {};
  
    scheduledata.forEach((item) => {
      const dateOnly = item.ConsultationDate.split("T")[0];
      const combinedDateTime = new Date(`${dateOnly}T${item.ConsultationTime}:00`);
      const consultationEndTime = new Date(combinedDateTime.getTime() + 30 * 60000);
      const endOfDay = new Date(combinedDateTime);
      endOfDay.setHours(23, 59, 59, 999);
  
      const interval = setInterval(() => {
        const now = new Date();
        const timeDifference = combinedDateTime - now;
        const isConsultationTime = now >= combinedDateTime && now <= consultationEndTime;
        const isWithin10Minutes = timeDifference <= 10 * 60 * 1000 && timeDifference > 0;
        const isSameDay = now <= endOfDay && now >= new Date(combinedDateTime).setHours(0, 0, 0, 0);
        const isPastConsultation = now > consultationEndTime;
  
        if (isWithin10Minutes) {
          setTimers(prev => ({ ...prev, [item.Id]: formatTimeRemaining(timeDifference) }));
        } else {
          setTimers(prev => ({ ...prev, [item.Id]: null }));
        }
  
        buttonStates[item.Id] = {
          visible: item.Type === 'online' && !item.ConsultStatus && (isWithin10Minutes || isConsultationTime || (isSameDay && isPastConsultation)),
          disabled: !(isConsultationTime || isPastConsultation)
        };
        setVideoButtonStates({ ...buttonStates });
      }, 1000);
  
      timerIntervals[item.Id] = interval;
    });
    */
  
    return () => {
      Object.values(timerIntervals).forEach(clearInterval);
    };
  }, [scheduledata]);
  

  const formatTimeRemaining = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handlepaybtn = (invoiceNo, item) => {
    dispatch(GetInvoiceDetailsByInvoiceNo(invoiceNo)).then((res) => {
      if (res) {
        handlepayment(res, item);
      }
    }).catch(() => toast.error('Payment failed'));
  };

  const handlepayment = async (data, item) => {
    const dateOnly = item.ConsultationDate.split("T")[0];
    const combinedDateTime = `${item.consultationDate}T${item.consultTime}:00`;
    const localDateTime = new Date(combinedDateTime);
    const utcDateTime = localDateTime.toISOString();    
    const options = {
      key: "rzp_test_p2L7ixWPGijQ8o",
      amount: data.Order.Amount,
      currency: "INR",
      name: "Laafi",
      order_id: data.Order.Id,
      method: { upi: true },
      handler: async function (response) {
        toast.success('Payment done successfully');
        if (response) {
          dispatch(PostPayinvoice({ InvoiceNumber: data.Id, razorpayPaymentId: response.razorpay_payment_id }))
          .then(() => {
            if (item.Type === 'online') {
               dispatch(PostCreateMeeting(item.DoctorId,item.Id,utcDateTime,null,null))
                .then(() => {
                  dispatch(GetPatientConsultation());
                })
                .catch(() => toast.error('Failed to create meeting'));
            } else {
              dispatch(GetPatientConsultation());
            }
          })
            .catch(() => toast.error('Payment failed'));
        }
      },
      notes: { "address": "Razorpay Corporate Office" },
      theme: { "color": "#3399cc" }
    };

    var pay = new window.Razorpay(options);
    pay.open();
  };
  const showUpcomingLabel = (item) => {
    const dateOnly = item.ConsultationDate.split("T")[0];
    const consultationDateTime = new Date(`${dateOnly}T${item.ConsultationTime}:00`);
    const now = new Date();
    const timeDifference = consultationDateTime - now;
  
    return timeDifference > 10 * 60 * 1000; // More than 10 mins away
  };
  console.log(scheduledata)
    return (
    <div className='shedulemain'>
      <ToastContainer />
      {scheduledata.length > 0 ? (
        scheduledata.map((item) => {
          const buttonState = videoButtonStates[item.Id] || { visible: false, disabled: true };
          
          return (
            <Card key={item.Id} sx={{ minWidth: 100, width: 'fit-content', color: 'black', backgroundColor: 'white' }}>
              <CardContent>
  <div className='d-flex'>
    <Typography sx={{ fontSize: 24 }}>Doctor:</Typography>
    <Typography sx={{ fontSize: 24 }}>{item.DoctorName}</Typography>
  </div>
  <div className='d-flex'>
    <Typography sx={{ fontSize: 24 }}>Date:</Typography>
    <Typography sx={{ fontSize: 24 }}>{new Date(item.ConsultationDate).toLocaleDateString()}</Typography>
  </div>
  <div className='d-flex'>
    <Typography sx={{ fontSize: 24 }}>Time:</Typography>
    <Typography sx={{ fontSize: 24 }}>{item.ConsultationTime}</Typography>
  </div>
  <div className='d-flex'>
    <Typography sx={{ fontSize: 24 }}>Payment:</Typography>
    <Typography sx={{ fontSize: 24 }} style={{ color: item.PaymentStatus === 'Unpaid' ? 'red' : 'green' }}>
      {item.PaymentStatus}
    </Typography>
  </div>
  {/* {item.Type === 'online' && !item.ConsultStatus && showUpcomingLabel(item) && (
  <div className='d-flex'>
    <Typography sx={{ fontSize: 20, color: 'red' }}>
      Consultation link will be available at {item.ConsultationTime}
    </Typography>
  </div>
)}

  {timers[item.Id] && (
    <div className='d-flex'>
      <Typography sx={{ fontSize: 20, color: 'red' }}>Video starts in: {timers[item.Id]}</Typography>
    </div>
  )} */}
</CardContent>
<CardActions>
  <div className='d-flex '>
    {item.PaymentStatus === 'Unpaid' && (
      <Button variant='contained' color='primary' endIcon={<MdOutlinePayment />} onClick={() => handlepaybtn(item.InvoiceNo, item)}>Pay</Button>
    )}
    {item.Type === 'online' && !item.ConsultStatus && (
      <IconButton 
        onClick={() => props.setcontent2(item)}
        color="primary"
      >
        <VideoCallTwoToneIcon />
      </IconButton>
    )}
  </div>
</CardActions>

            </Card>
          );
        })
      ) : (
        <h3 className='d-flex justify-content-center align-items-center'>Sorry, no schedules are available right now.</h3>
      )}
    </div>
  );
};

export default Myschedule;