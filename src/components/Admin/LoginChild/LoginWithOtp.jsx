import React, { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-input-2';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PostOtpLogin } from '../../Store/ApiReducers/Auth';
import { jwtDecode } from 'jwt-decode';
import { setemptylogindata, setloginwithotp } from '../../Store/LoginSlice';
import { setemptycheckusernameexist } from '../../Store/SignupSlice';
import { TiArrowBack } from "react-icons/ti";
import { IconButton } from '@mui/material';

const LoginWithOtp = (z) => {
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const logdata=useSelector(state=>state.logindetails.loginData)
    const Existusername=useSelector((state)=>state.signup.checkloginusernameExist)

    const [inputdata,setinputdata]=useState({otp1:'',otp2:'',otp3:'',otp4:''})
    const [showOtpValues, setShowOtpValues] = useState(false);
    const [errors,seterrors]=useState({otp:'',sentotp:''})
    const [visiblevarifyotpbtn,setvisiblevarifyotpbtn]=useState(false)
    const [timer, setTimer] = useState(0);
    const [resendEnabled, setResendEnabled] = useState(true);

  
    
    useEffect(()=>{
        sendOtpHandler()
    },[])
    useEffect(()=>{ 
        const allOtpFilled=Object.values(inputdata).every(val=>val!=='')
        setvisiblevarifyotpbtn(allOtpFilled)
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

    const sendOtpHandler = () => {
        // let phone=`${logdata.countryCode}${logdata.username}`
        let phone=logdata.username.replace('-','')
        window.sendOtp(
          phone,
          (data) => {
        
          },
          (error) => {
          
          }
        );
      }
  
      const verifyOtpHandler = () => {
        let otp=`${inputdata.otp1}${inputdata.otp2}${inputdata.otp3}${inputdata.otp4}`
        window.verifyOtp(
          otp,
          (data) => {
       
            const newdata={
                PhoneNumber:logdata.username,
                otpToken:data.message,
                UserType:logdata.type
            }
            dispatch(PostOtpLogin(newdata)).then((res)=>{
          
                if(res){
                    const decodedToken = jwtDecode(res.token);
               
                    const Id=decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
                    const Role=decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
                    const decodedname = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
                    localStorage.setItem('name',decodedname)
                    localStorage.setItem('accessToken',res.token)
                    const decodedDate=new Date(decodedToken.exp*1000)
                    if(Role !==undefined){
                    
                        const currentDate=new Date()
                        if(currentDate<decodedDate && Role ==='admin'){
                          navigate(`/Home/admindashboard`); 
                          dispatch(setloginwithotp(false))
                          dispatch(setemptylogindata())
                          dispatch(setemptycheckusernameexist())
                        }
                        else if(currentDate<decodedDate && Role==='pharmacy'){
                          navigate(`/pharmacyhome/pharmacydashboard`); 
                          dispatch(setloginwithotp(false))
                          dispatch(setemptylogindata())
                          dispatch(setemptycheckusernameexist())
                        }
                        else if(currentDate<decodedDate && Role==='reception'){
                          navigate(`/receptionhome/receptiondashboard`); 
                          dispatch(setloginwithotp(false))
                          dispatch(setemptylogindata())
                          dispatch(setemptycheckusernameexist())
                        }
                        else if(currentDate<decodedDate && Role==='lab'){
                          navigate(`/labhome/labdashboard`); 
                          dispatch(setloginwithotp(false))
                          dispatch(setemptylogindata())
                          dispatch(setemptycheckusernameexist())
                        }
                        else if(currentDate<decodedDate && Role==='patient'){
                          navigate(`/patient/patientdashboard`);
                          dispatch(setloginwithotp(false))
                          dispatch(setemptylogindata()) 
                          dispatch(setemptycheckusernameexist())     
                        }
                        else if(currentDate<decodedDate &&  Role==='nurse'){
                          navigate(`/nurse/nursedashboard`);
                          dispatch(setloginwithotp(false)) 
                          dispatch(setemptylogindata())
                          dispatch(setemptycheckusernameexist())
                        }
                        else if(currentDate<decodedDate && Role==='doctor'){
                          navigate(`/doctor/doctordashboard`);
                          dispatch(setloginwithotp(false))
                          dispatch(setemptylogindata()) 
                          dispatch(setemptycheckusernameexist())
                        }
                        else{
                            dispatch(setloginwithotp(false))
                        }
                      }
                }
            })
          },
          (error) => {
         
            seterrors({otp:'Please check the otp enterd'})
          }
        );
      };
    
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
    }

    // const varifyOtp=()=>{
    //     setShowOtpValues(true)
    //     let myotp='0000'
    //     const enteredOtp = `${inputdata.otp1}${inputdata.otp2}${inputdata.otp3}${inputdata.otp4}`;
    //     if(myotp==enteredOtp){
    //       navigate('../signup')
    //     }
    //     else{
    //       seterrors({otp:'Please check the otp enterd'})
    //     }
    // }

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

  return (
    <div className='logincontent_div_containerExistuser'>
    <div>
      <IconButton onClick={()=>dispatch(setloginwithotp(false))} >
        <TiArrowBack style={{color:'#408b84'}}/>
      </IconButton>
    </div>
    <div className='logincontent_div_header1Existuser'>
      <p>OTP sent to your registerd number</p>
    </div>
    <div className='logincontent_div_phoneinputcontainer'>
      <div className='logincontent_div_phoneinput'>
        <PhoneInput
         inputStyle={{height:'45px',borderRadius:'10px'}}
         containerStyle={{borderRadius:'10px'}}
         country={'in'}
        //  value={`91${logdata.username}`}
         value={logdata.username}
        //  onChange={handlePhoneChange}
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
</div>
  )
}

export default LoginWithOtp
