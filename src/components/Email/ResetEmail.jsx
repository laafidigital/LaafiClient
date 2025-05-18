import React, { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-input-2';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setemptylogindata, setforgetmpin, setlogindata } from '../Store/LoginSlice';
import { loginData, PostResetMpin, RegisterHospitalUser, SignupDataPatient } from '../Store/ApiReducers/Auth';
import { jwtDecode } from 'jwt-decode';
import { TiArrowBack } from "react-icons/ti";
import { IconButton } from '@mui/material';
import { setemptycheckusernameexist } from '../Store/SignupSlice';
import axios from 'axios'


const ResetEmail = (props) => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const { email,userType } = props;
    const logdata=useSelector(state=>state.logindetails.loginData)
    const Existusername=useSelector((state)=>state.signup.checkloginusernameExist)
    const forgotmpin=useSelector(state=>state.logindetails.forgotmpin)


    const [inputdata,setinputdata]=useState({otp1:'',otp2:'',otp3:'',otp4:'',mpin1:'',mpin2:'',mpin3:'',mpin4:'',mpin5:'',mpin6:'',mpin7:'',mpin8:'',hospId:''})
    const [showOtpValues, setShowOtpValues] = useState(false);
    const [errors,seterrors]=useState({otp:'',sentotp:''})
    const [visiblevarifyotpbtn,setvisiblevarifyotpbtn]=useState(false)
    const [timer, setTimer] = useState(0);
    const [resendEnabled, setResendEnabled] = useState(true);
    const [visiblesetmpin,setvisiblesetmpin]=useState(false)
    const [visiblevarifympinbtn,setvisiblevarifympinbtn]=useState(false)

   
    useEffect(()=>{
      sendOtpHandler()
    },[])

    useEffect(()=>{
      const mpinValues = [inputdata.mpin2, inputdata.mpin2, inputdata.mpin3, inputdata.mpin4,
                          inputdata.mpin5,inputdata.mpin6,inputdata.mpin7,inputdata.mpin8 
                          ];
      const allmpinFilled = mpinValues.every(value => value.trim() !== '');
      setvisiblevarifympinbtn(allmpinFilled)
      seterrors({mpin:''})
    },[inputdata])
    
    useEffect(()=>{
        const allOtpFilled=[inputdata.otp1, inputdata.otp2, inputdata.otp3, inputdata.otp4,];
        const isfilled=allOtpFilled.every(val=>val.trim() !=='')
        setvisiblevarifyotpbtn(isfilled)
    },[inputdata])

    useEffect(()=>{
        let interval = null;
        if (timer > 0) {
          interval = setInterval(() => {
            setTimer(prev => prev - 1);
          }, 1000);
        } else if (timer === 0) {
          setResendEnabled(true);
        }
        return () => clearInterval(interval);
    },[timer])
    

    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setinputdata((prev)=>({
          ...prev,
          [name]:value
         }))
      
       if(name.startsWith('otp')){
        const inputFields = Array.from(document.querySelectorAll('.otp-input'));
        const currentIndex = inputFields.findIndex(input => input.name === name);
        if (currentIndex < inputFields.length - 1 && value) {
          inputFields[currentIndex + 1].focus();
        }
        else if (!value && currentIndex > 0) {
          inputFields[currentIndex - 1].focus();
        }
       }
       if(name.startsWith('mpin') ){
        const inputFields = Array.from(document.querySelectorAll('.otp-input'));
        const currentIndex = inputFields.findIndex(input => input.name === name);
        if (currentIndex < inputFields.length - 1 && value) {
          inputFields[currentIndex + 1].focus();
        }
        else if (!value && currentIndex > 0) {
          inputFields[currentIndex - 1].focus();
        }
       }
    }

    
    const sendOtpHandler = async() => {
      try {
        const response = await axios.post(`https://laafi.in/auth/api/Auth/SendEmailOtp?email=${email}&purpose=login&userType=${userType}`);
        
        seterrors({ ...errors, sentotp: 'OTP sent successfully!' });
        setTimer(60); // Start timer
        setResendEnabled(false);
      } catch (error) {
        console.error('Error sending OTP:', error);
        seterrors({ ...errors, sentotp: 'Failed to send OTP. Please try again.' });
      }
    }

    const verifyOtpHandler = async () => {
      try {
        let otp=`${inputdata.otp1}${inputdata.otp2}${inputdata.otp3}${inputdata.otp4}`

        const { email, userType } = props; // Get email and userType from props
        
        const response = await axios.post(
          `https://laafi.in/auth/api/Auth/VerifyOtp?userName=${email}&purpose=login&token=${otp}&userType=${userType}`);
          
        if (response.status==200) {
          
          setvisiblesetmpin(true); // Enable MPIN input fields
          seterrors({ otp: '' }); // Clear any previous OTP errors
        } else {
          
          seterrors({ otp: 'Invalid OTP. Please try again.' });
        }
      } catch (error) {
        
        seterrors({ otp: 'Error verifying OTP. Please try again.' });
      }
    };

    const resentOtp=()=>{
      sendOtpHandler()
        if(resendEnabled){
            seterrors({otp:'',sentotp:'OTP sent!'})
            setTimer(60);
            setResendEnabled(false);
            setTimeout(() => {
             setinputdata((prev)=>({
               username:prev.username,
               type:prev.type,
               password:prev.password,
               otp1:'',
               otp2:'',
               otp3:'',
               otp4:'',
             }))
           },2000);
          }
    }


    const saveMpin=()=>{
      const { mpin1, mpin2, mpin3, mpin4, mpin5, mpin6, mpin7, mpin8 } = inputdata;
      const formdata = new FormData();
      let allErrorsEmpty = true; // Determine if there are any errors

        if (mpin1 !== mpin5) {
            console.error("MPIN 1 does not match MPIN 5");
            allErrorsEmpty = false;
        }

        if (mpin2 !== mpin6) {
            console.error("MPIN 2 does not match MPIN 6");
            allErrorsEmpty = false;
        }

        if (mpin3 !== mpin7) {
            console.error("MPIN 3 does not match MPIN 7");
            allErrorsEmpty = false;
        }

        if (mpin4 !== mpin8) {
            console.error("MPIN 4 does not match MPIN 8");
            allErrorsEmpty = false;
        }

        if (allErrorsEmpty) {
          const combinedMpin = `${mpin1}${mpin2}${mpin3}${mpin4}`;
            const data={
              PhoneNumber:email,
              UserType:userType,
              otpToken:'',
              mpin:combinedMpin
            }
            dispatch(PostResetMpin(data)).then((res)=>{
              
              if(res){
                let data={
                  UserName:email,
                  Password:combinedMpin,
                  type:userType
                }
                dispatch(loginData(data)).then((res)=>{
                  
                  
                  if(res){
                    navigateToPage(res.token)
                  }
                })
              }
            })
        }
        else{
          seterrors({mpin:'MPIN not matching'})
        }  
 }

 const navigateToPage=(token)=>{
    const decodedToken = jwtDecode(token);
    
    const Id=decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    const Role=decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    const decodedname = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    localStorage.setItem('name',decodedname)
    const decodedDate=new Date(decodedToken.exp*1000)
    if(Role !==undefined){
      
      const currentDate=new Date()
      if(currentDate<decodedDate && Role ==='admin'){
        navigate(`/Home/admindashboard`); 
        dispatch(setforgetmpin(false))
        dispatch(setemptylogindata())
        dispatch(setemptycheckusernameexist())
      }
      else if(currentDate<decodedDate && Role==='pharmacy'){
        navigate(`/pharmacyhome/pharmacydashboard`); 
        dispatch(setforgetmpin(false))
        dispatch(setemptylogindata())
        dispatch(setemptycheckusernameexist())
      }
      else if(currentDate<decodedDate && Role==='reception'){
        navigate(`/receptionhome/receptiondashboard`); 
        dispatch(setforgetmpin(false))
        dispatch(setemptylogindata())
        dispatch(setemptycheckusernameexist())
      }
      else if(currentDate<decodedDate && Role==='lab'){
        navigate(`/labhome/labdashboard`); 
        dispatch(setforgetmpin(false))
        dispatch(setemptylogindata())
        dispatch(setemptycheckusernameexist())
      }
      else if(currentDate<decodedDate && Role==='patient'){
        navigate(`/patient/patientdashboard`);
        dispatch(setforgetmpin(false))
        dispatch(setemptylogindata()) 
        dispatch(setemptycheckusernameexist())     
      }
      else if(currentDate<decodedDate &&  Role==='nurse'){
        navigate(`/nurse/nursedashboard`);
        dispatch(setforgetmpin(false))
        dispatch(setemptylogindata())
        dispatch(setemptycheckusernameexist())
      }
      else if(currentDate<decodedDate && Role==='doctor'){
        navigate(`/doctor/doctordashboard`);
        dispatch(setforgetmpin(false))
        dispatch(setemptylogindata()) 
        dispatch(setemptycheckusernameexist())
      }
      else{
        dispatch(setforgetmpin(false))
      }
    }
    
}


  return (
    <div className='logincontent_div_containerExistuser'>
      
      {visiblesetmpin ?(
        <>
         <div className='d-flex justify-content-between flex-column'  style={{height:'100%'}}>
                    <div>
                        <IconButton onClick={()=>dispatch(setforgetmpin(false))} >
                          <TiArrowBack style={{color:'#408b84'}}/>
                        </IconButton>
                    </div>
                    <div className='logincontent_div_header'>
                     <p>Please set your MPIN {logdata.name} </p>
                    </div>
                    <div className='login_mpin_divcontainer'>
                    <div className='login_mpin_div'>
                        <input type={inputdata.mpin1 && !showOtpValues ?"text":'number' } name='mpin1'  className='otp-input' maxLength='1' value={inputdata.mpin1 && !showOtpValues ? '*':inputdata.mpin1} onChange={handleInputChange}/>
                        <input type={inputdata.mpin2 && !showOtpValues ?"text":'number' } name='mpin2'  className='otp-input' maxLength='1' value={inputdata.mpin2 && !showOtpValues ? '*':inputdata.mpin2} onChange={handleInputChange}/>
                        <input type={inputdata.mpin3 && !showOtpValues ?"text":'number' } name='mpin3'  className='otp-input' maxLength='1' value={inputdata.mpin3 && !showOtpValues ? '*':inputdata.mpin3} onChange={handleInputChange}/>
                        <input type={inputdata.mpin4 && !showOtpValues ?"text":'number' } name='mpin4'  className='otp-input' maxLength='1' value={inputdata.mpin4 && !showOtpValues ? '*':inputdata.mpin4} onChange={handleInputChange}/>
                    </div>
                    </div>
                    <div className='login_mpin_divcontainer'>
                    <div className='signup_mpin_div'>
                        <input type={inputdata.mpin5 && !showOtpValues ?"text":'number' } name='mpin5'  className='otp-input' maxLength='1' value={inputdata.mpin5 && !showOtpValues ? '*':inputdata.mpin5} onChange={handleInputChange}/>
                        <input type={inputdata.mpin6 && !showOtpValues ?"text":'number' } name='mpin6'  className='otp-input' maxLength='1' value={inputdata.mpin6 && !showOtpValues ? '*':inputdata.mpin6} onChange={handleInputChange}/>
                        <input type={inputdata.mpin7 && !showOtpValues ?"text":'number' } name='mpin7'  className='otp-input' maxLength='1' value={inputdata.mpin7 && !showOtpValues ? '*':inputdata.mpin7} onChange={handleInputChange}/>
                        <input type={inputdata.mpin8 && !showOtpValues ?"text":'number' } name='mpin8'  className='otp-input' maxLength='1' value={inputdata.mpin8 && !showOtpValues ? '*':inputdata.mpin8} onChange={handleInputChange}/>
                    </div>
                    </div>
                    {errors.mpin &&(
                     <div className='d-flex justify-content-center'>
                       <p className='login_error'>{errors.mpin}</p>
                      </div>
                    )}
                    <div className='d-flex justify-content-center'>
                        <button disabled={!visiblevarifympinbtn} className={!visiblevarifympinbtn ? 'login-disabled' :'login_btn'} onClick={saveMpin}>Save</button>
                    </div>
                </div>
        </>
      ):(
       <>
      <div>
        <IconButton onClick={()=>dispatch(setforgetmpin(false))} >
          <TiArrowBack style={{color:'#408b84'}}/>
        </IconButton>
      </div>
       <div className='logincontent_div_header1Existuser'>
                  <p>OTP sent to your registerd email</p>
                </div>
                <div className="logincontent_div_emailinputcontainer">
                <div className="logincontent_div_emailinput">
                  <input
                type="email"
                placeholder="Enter your email"
                value={email}
                  className="email-input"
                  />
                </div>
              </div>
                <div className='login_mpin_divcontainer'>
                    <div className='login_mpin_divNotExistuser'>
                        <input type={inputdata.otp1 && !showOtpValues ?"text":'number' } name='otp1'  className='otp-input' maxLength='1' value={inputdata.otp1 && !showOtpValues ? '*':inputdata.otp1} onChange={handleInputChange}/>
                        <input type={inputdata.otp2 && !showOtpValues ?"text":'number' } name='otp2'  className='otp-input' maxLength='1' value={inputdata.otp2 && !showOtpValues ? '*':inputdata.otp2} onChange={handleInputChange}/>
                        <input type={inputdata.otp3 && !showOtpValues ?"text":'number' } name='otp3'  className='otp-input' maxLength='1' value={inputdata.otp3 && !showOtpValues ? '*':inputdata.otp3} onChange={handleInputChange}/>
                        <input type={inputdata.otp4 && !showOtpValues ?"text":'number' } name='otp4'  className='otp-input' maxLength='1' value={inputdata.otp4 && !showOtpValues ? '*':inputdata.otp4} onChange={handleInputChange}/>
                    </div>
                </div>
                {errors.otp &&(
                      <div className='d-flex justify-content-center mt-2'>
                      <p className='login_error'>{errors.otp}</p>
                      </div>
                    )}
                     {errors.sentotp &&(
                      <div className='d-flex justify-content-center mt-2'>
                      <p style={{color:'#008080', fontFamily:'Roboto Slab'}}>{errors.sentotp}</p>
                      </div>
                    )}
                    <div className='d-flex justify-content-center mt-3'>
                     <p style={{cursor:'pointer'}} onClick={resentOtp}>Resend OTP</p> 
                     {timer > 0 && (
                        <span style={{ marginLeft: '10px', color: 'black' }}>
                          {`(${Math.floor(timer / 60)}:${('0' + (timer % 60)).slice(-2)})`}
                        </span>
                      )}
                    </div>
                    <div className='d-flex justify-content-center mt-2 mb-3'>
                      <div className='loginvarifyOtp_resend'>
                        <button disabled={!visiblevarifyotpbtn} className={!visiblevarifyotpbtn ? 'login-disabled' :'login_btn'} onClick={verifyOtpHandler}>Verify OTP</button>
                      </div>
                   </div>
       </>
      )}
      
                
    </div>
  )
}

export default ResetEmail
