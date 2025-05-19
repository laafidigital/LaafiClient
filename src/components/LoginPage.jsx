import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector} from 'react-redux'
import { useDispatch } from 'react-redux'
import loginlogo from '../assets/Logos/loginlogo.png'
import googlelogo from '../assets/Logos/GoogleIcon.jpeg'
import 'react-toastify/dist/ReactToastify.css';
import {  IconButton} from '@mui/material'
import { PostExternallogin,GetExistingUser, PostValidateGoogleToken, PostExternalLogincallback, GetGoogleuserinfoBytoken, PatchSetPin, loginData, GetCheckExistingEmail, RegisterHospitalUser, SignupDataPatient } from './Store/ApiReducers/Auth';
import { jwtDecode } from "jwt-decode";
import { resetError} from './Store/ErrorSlice';
import { setemptycheckusernameexist } from './Store/SignupSlice';
import { CiStethoscope } from "react-icons/ci";
import { LiaClinicMedicalSolid } from "react-icons/lia";
import { MdPersonalInjury } from "react-icons/md";
import PhoneInput from 'react-phone-input-2';
import { IoLogoFacebook } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import { setemptyerror, setemptylogindata, setforgetmpin, setlogindata, setloginwithotp, setuserdataUpdate } from './Store/LoginSlice';
import ForgotMPIN from './Admin/LoginChild/ForgotMPIN';
// import FacebookLogin from 'react-facebook-login';
import {useGoogleLogin } from '@react-oauth/google';
import { toast, ToastContainer } from 'react-toastify'
import LoginWithOtp from './Admin/LoginChild/LoginWithOtp'
import { TiArrowBack } from "react-icons/ti";
import copyrightlogo from '../assets/Logos/netsrishticlrlogo.jpeg'
import Signup from './Signup'
import axios from 'axios'
import { setLoading } from './Store/LoadingSlice'

const LoginPage = () => {

    const navigate=useNavigate()
    const dispatch=useDispatch()
    const formdata=new FormData()

    const error=useSelector((state)=>state.Errorhandle.errors)
    const loginerror=useSelector((state)=>state.logindetails.error)
    const Existusername=useSelector((state)=>state.signup.checkloginusernameExist)
    const forgotmpin=useSelector(state=>state.logindetails.forgotmpin)
    const loginwithotp=useSelector(state=>state.logindetails.loginwithotp)
 

    const [Token,setToken]=useState(null)
    const [inputdata,setinputdata]=useState({username:'',password:'',type:'Patient',otp1:'',otp2:'',otp3:'',otp4:'',logmpin1:'',logmpin2:'',logmpin3:'',logmpin4:'',logmpin5:'',logmpin6:'',logmpin7:'',logmpin8:'',name:'',email:'',countryCode:''})
    const [decodedDate,setDecodedDate]=useState()
    const [userId, setUserid] = useState(null);
    const [tokenControl,settokenControl]=useState(false)
    const [roles,setroles]=useState()
    const [visible,setvisible]=useState(false);
    const [typeselect,settypeselect]=useState(false)
    const [errors,seterror]=useState({username:'',password:'',invalid:''})
    const [registerd,setregisterd]=useState(false)
    const [showOtpValues, setShowOtpValues] = useState(false);
    const [visiblevarifyotpbtn,setvisiblevarifyotpbtn]=useState(false)
    const [timer, setTimer] = useState(0);
    const [resendEnabled, setResendEnabled] = useState(true);
    const [validategoogleToken,setvalidategoogleToken]=useState(false)
    const [visilbegooglesendotp,setvisiblegooglesendotp]=useState(false)
    const [visiblegoogleOTPsec,setvisiblegoogleOTPsec]=useState(false)
    const [visiblephoneInput,setvisiblePhoneInput]=useState(false)
    const [loginSinup,setloginSignup]=useState(false)
    const [activeloginbtn,setloginactivebtn]=useState(false)
    const [existEmail,setExistEmail]=useState(false)
    const [signup,setsignup]=useState(false)
    const [registerHospitalResult,setregisterHospitalResult]=useState(null)
    const [selectedOption,setSelectedOption]=useState('Phone')
  const [inputMethod, setInputMethod] = useState('phone');  // 'phone' or 'email'
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setloginSignup(true)
  };
   
    
    

   
    useEffect(() => {
      window.initSendOTP({
        widgetId: "34686d693032373537373935",
        tokenAuth: "428158THJcQpp566bb2617P1",
        exposeMethods: true,
        success: (data) => {
       
        },
        failure: (error) => {
 
        },
      });
    }, []);

    useEffect(()=>{
      if(Token !==null && !tokenControl){
        navigateToPage()
        seterror({invalid:''})
        dispatch(setemptycheckusernameexist())
        dispatch(setemptylogindata())
      }
      if(roles !==undefined){
     
        const currentDate=new Date()
        if(currentDate<decodedDate && roles ==='admin'){
          dispatch(resetError())
          setinputdata({username:'',password:'',type:'Patient',otp1:'',otp2:'',otp3:'',otp4:'',logmpin1:'',logmpin2:'',logmpin3:'',logmpin4:'',logmpin5:'',logmpin6:'',logmpin7:'',logmpin8:'',name:'',email:'',countryCode:''})
          seterror({username:'',password:'',invalid:''})
          setregisterd(false)
   
          navigate(`/Home/admindashboard`); 
        }
        else if(currentDate<decodedDate && roles==='pharmacist'){
          dispatch(resetError())
          setinputdata({username:'',password:'',type:'Patient',otp1:'',otp2:'',otp3:'',otp4:'',logmpin1:'',logmpin2:'',logmpin3:'',logmpin4:'',logmpin5:'',logmpin6:'',logmpin7:'',logmpin8:'',name:'',email:'',countryCode:''})
          seterror({username:'',password:'',invalid:''})
          setregisterd(false)
          navigate(`/pharmacyhome/pharmacydashboard`); 
        }
        else if(currentDate<decodedDate && roles==='receptionist'){
          dispatch(resetError())
          setinputdata({username:'',password:'',type:'Patient',otp1:'',otp2:'',otp3:'',otp4:'',logmpin1:'',logmpin2:'',logmpin3:'',logmpin4:'',logmpin5:'',logmpin6:'',logmpin7:'',logmpin8:'',name:'',email:'',countryCode:''})
          seterror({username:'',password:'',invalid:''})
          setregisterd(false)
          navigate(`/receptionhome/receptiondashboard`); 
        }
        else if(currentDate<decodedDate && roles==='lab'){
          dispatch(resetError())
          setinputdata({username:'',password:'',type:'Patient',otp1:'',otp2:'',otp3:'',otp4:'',logmpin1:'',logmpin2:'',logmpin3:'',logmpin4:'',logmpin5:'',logmpin6:'',logmpin7:'',logmpin8:'',name:'',email:'',countryCode:''})
          seterror({username:'',password:'',invalid:''})
          setregisterd(false)
          navigate(`/labhome/labdashboard`); 
        }
        else if(currentDate<decodedDate && roles==='patient'){
          dispatch(resetError())
          setinputdata({username:'',password:'',type:'Patient',otp1:'',otp2:'',otp3:'',otp4:'',logmpin1:'',logmpin2:'',logmpin3:'',logmpin4:'',logmpin5:'',logmpin6:'',logmpin7:'',logmpin8:'',name:'',email:'',countryCode:''})
          seterror({username:'',password:'',invalid:''})
          setregisterd(false)
          navigate(`/patient/patientdashboard`); 
        }
        else if(currentDate<decodedDate &&  roles==='nurse'){
          dispatch(resetError())
          setinputdata({username:'',password:'',type:'Patient',otp1:'',otp2:'',otp3:'',otp4:'',logmpin1:'',logmpin2:'',logmpin3:'',logmpin4:'',logmpin5:'',logmpin6:'',logmpin7:'',logmpin8:'',name:'',email:'',countryCode:''})
          seterror({username:'',password:'',invalid:''})
          setregisterd(false)
          navigate(`/nurse/nursedashboard`); 
        }
        else if(currentDate<decodedDate && roles==='doctor'){
          dispatch(resetError())
          setinputdata({username:'',password:'',type:'Patient',otp1:'',otp2:'',otp3:'',otp4:'',logmpin1:'',logmpin2:'',logmpin3:'',logmpin4:'',logmpin5:'',logmpin6:'',logmpin7:'',logmpin8:'',name:'',email:'',countryCode:''})
          seterror({username:'',password:'',invalid:''})
          setregisterd(false)
          navigate(`/doctor/doctordashboard`); 
        }
        else{
          navigate('/')
        }
      }
    },[userId,decodedDate,Token,tokenControl,roles])
  
  
    useEffect(() => {
      if(Existusername && Existusername.PasswordExists){
        dispatch(setlogindata(inputdata))
        dispatch(setuserdataUpdate({name:Existusername.Name}))
      }
      if(Existusername && !Existusername.PasswordExists && !registerHospitalResult){
        sendOtpHandler()
      }
   
      if(error && error.data && error.data.status===401){
        seterror({invalid:'Incorrect MPIN'})
        setregisterd(true)
      }
     if(error && error.status && error.status===500){
        seterror({invalid:'KYC in progress'})
      }
      if(loginerror && loginerror.status && loginerror.status===401){
        seterror({invalid:'Incorrect MPIN'})
      }
    }, [error,Existusername,loginerror,registerHospitalResult]);

    useEffect(()=>{
      if((Existusername && Existusername.PasswordExists) || (existEmail) ){
        const mpinvalues=[inputdata.logmpin1,inputdata.logmpin2,inputdata.logmpin3,inputdata.logmpin4]
        const allmpinFilled = mpinvalues.every(value => value ? value.trim() !== '':'');
        setloginactivebtn(allmpinFilled)
        seterror({otp:''})
   
      }
      else if(Existusername && !Existusername.PasswordExists){
        const otpValues = [inputdata.otp1, inputdata.otp2, inputdata.otp3, inputdata.otp4];
        const allOtpFilled = otpValues.every(value => value.trim() !== '');
    
        setvisiblevarifyotpbtn(allOtpFilled) 
        seterror({otp:''})
      }
      else if(!visiblegoogleOTPsec){
        const mpinvalues=[inputdata.logmpin1,inputdata.logmpin2,inputdata.logmpin3,inputdata.logmpin4,
                            inputdata.logmpin5,inputdata.logmpin6,inputdata.logmpin7,inputdata.logmpin8]
        const allmpinFilled = mpinvalues && mpinvalues.every(value => value.trim() !== '');
        setvisiblevarifyotpbtn(allmpinFilled)
        seterror({mpin:''})
   
      }
      else{
        const otpValues = [inputdata.otp1, inputdata.otp2, inputdata.otp3, inputdata.otp4];
        const allOtpFilled = otpValues.every(value => value.trim() !== '');
  
        setvisiblevarifyotpbtn(allOtpFilled) 
        seterror({otp:''})
      }
    },[inputdata,Existusername,visiblegoogleOTPsec])

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
  },[Existusername,registerd,timer])


  const handlePhoneChange = (value, country) => {
    const countrynewCode = country.dialCode;
    const phoneNumberOnly = value.slice(countrynewCode.length);
  
    if (validategoogleToken) {
      if (value.length < 6) {
        setvisiblegooglesendotp(false);
        setvisiblegoogleOTPsec(false);
        seterror({ username: '' });
        setregisterd(false);
      } else if (value.length) {
        setvisiblegooglesendotp(true);
        setinputdata((prev) => ({
          ...prev,
          username: `${countrynewCode}-${phoneNumberOnly}`,
          countryCode: countrynewCode,
        }));
      } else {
        seterror({ username: '' });
      }
    } else {
      if (value.length < 6) {
        seterror({ username: '' });
        setregisterd(false);
        if (Existusername == null) {
          setloginSignup(false); 
        }
        dispatch(setemptycheckusernameexist());
      } else if (value.length >= 6) {
        setinputdata((prev) => ({
          ...prev,
          username: `${countrynewCode}-${phoneNumberOnly}`,
          countryCode: countrynewCode,
        }));
        setloginSignup(true); 
      } else {
        seterror({ username: '' });
      }
    }
  };
  const handleLoginSignup = async () => {
    let username = inputdata.username;
    if (inputMethod === 'email') {
      try {
        dispatch(setLoading(true))
        const checkUserResponse = await axios.get(
          `https://laafi.in/auth/api/Auth/CheckExistingUser?userName=${email}&userType=${inputdata.type}`
        );
        const {PasswordExists,Name} = checkUserResponse.data;
       
        if (PasswordExists) {
   
          navigate('/emailpin', {
            state: {
              email: email,
              userType: inputdata.type,
              Name
            },
          });
        } else {
          const emailLoginResponse = await axios.post(
            `https://laafi.in/auth/api/Auth/EmailLogin?Email=${email}&userType=${inputdata.type}`
          );
      
  
          navigate('/verifyemail', {
            state: {
              email: email,
              userType: inputdata.type,
            },
          });
        }
        dispatch(setLoading(false))
      } catch (error) {
        console.error("Error during login/signup process:", error);
        dispatch(setLoading(false))
      }
    } else if (inputMethod === 'phone') {
      dispatch(GetExistingUser(username, inputdata.type));
      setloginSignup(false);
    }
  };
  
  
    
    

  const handleKeyUpchange=(e)=>{

    const keypress=e.key
    const {name}=e.target
    const value=e.target.value

    
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
     else if(name.startsWith('logmpin')){
      const inputFields = Array.from(document.querySelectorAll('.otp-input'));
 
      const currentIndex = inputFields.findIndex(input => input.name === name);
     
      
      if (value && currentIndex < inputFields.length - 1) {
        inputFields[currentIndex + 1].focus();
      }
      else if (!value && currentIndex > 0) {
        inputFields[currentIndex - 1].focus();
      }
      dispatch(setemptyerror())
     }
  }
  

    const handleInputChange=(e)=>{
      const {name,value}=e.target;
        setinputdata((prev)=>({
          ...prev,
          [name]:value
         }))
      
     
     }

     const sendOtpHandler = () => {
  
      setvisiblegoogleOTPsec(true)
 
      let phone=inputdata.username.replace('-','')
   
      
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
          const userdata={
            userType:inputdata.type,
            phoneNumber:inputdata.username,
            countryCode:inputdata.countryCode,
            email:inputdata.email,
            name:inputdata.name,
            accessToken:data.message
          }
         
          if(!visiblegoogleOTPsec){
            dispatch(GetExistingUser(inputdata.username,inputdata.type))
          }
          dispatch(PostExternalLogincallback(userdata)).then((res)=>{
           
            if(res){
              setvisiblegoogleOTPsec(false)
              setvisiblePhoneInput(true)
            }
          })
        },
        (error) => {
    
          toast(error.message)
        }
      );
    };

    const saveMpin=()=>{
      const { logmpin1, logmpin2, logmpin3, logmpin4, logmpin5, logmpin6, logmpin7, logmpin8 } = inputdata;
      let allErrorsEmpty = true; // Determine if there are any errors

        if (logmpin1 !== logmpin5) {
            console.error("MPIN 1 does not match MPIN 5");
            allErrorsEmpty = false;
        }

        if (logmpin2 !== logmpin6) {
            console.error("MPIN 2 does not match MPIN 6");
            allErrorsEmpty = false;
        }

        if (logmpin3 !== logmpin7) {
            console.error("MPIN 3 does not match MPIN 7");
            allErrorsEmpty = false;
        }

        if (logmpin4 !== logmpin8) {
            console.error("MPIN 4 does not match MPIN 8");
            allErrorsEmpty = false;
        }

        if (allErrorsEmpty) {
            const combinedMpin = `${logmpin1}${logmpin2}${logmpin3}${logmpin4}`;
            const data={
              PhoneNumber:inputdata.username,
              userType:inputdata.type,
              mpin:combinedMpin,
              name:inputdata.name
            }
            dispatch(PatchSetPin(data)).then((res)=>{
              if(res){
                dispatch(GetExistingUser(inputdata.username,inputdata.type))
              }
            })
        }
        else{
          seterror({mpin:'MPIN not matching'})
        }  
 }

     const valifyOtp=()=>{
      setShowOtpValues(true)
      let enteredOtp =`${inputdata.otp1}${inputdata.otp2}${inputdata.otp3}${inputdata.otp4}`;
      window.verifyOtp(
        enteredOtp,
        (data) => {
        
          if(data){
            setinputdata({...inputdata})
            dispatch(setlogindata(inputdata))
            setsignup(true)
            if(Existusername && Existusername.IsNewUser){
              formdata.append('PhoneNumber',inputdata.username)
              if(inputdata.type=='Doctor'){
                dispatch(RegisterHospitalUser(formdata,inputdata.type)).then((res)=>{
                  setregisterHospitalResult(res.data)
                  if(res){
                    dispatch(GetExistingUser(username,inputdata.type))
                  }
                })
              }
              else if(inputdata.type=='Patient'){
                formdata.append('CountryCode', 'in');
               
                  dispatch(SignupDataPatient(formdata)).then((res)=>{
                    setregisterHospitalResult(res.data)
                    if(res){
                      dispatch(GetExistingUser(username,inputdata.type))
                    }
                  })
              }
              else{
                formdata.append('HospitalId', 1);
                dispatch(RegisterHospitalUser(formdata,inputdata.type)).then((res)=>{
                  setregisterHospitalResult(res.data)
                  if(res){
                    dispatch(GetExistingUser(username,inputdata.type))
                  }
                })
              }
            }
            // navigate('../signup')
            // dispatch(setemptycheckusernameexist(null))
          }
        },
        (error) => {
       
          seterror({otp:'Please check the otp entered'})
        }
      );
     }

     const resentOtp=()=>{
      sendOtpHandler()
      if(resendEnabled){
        seterror({otp:'',sentotp:'OTP sent!'})
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
           logmpin1:'',
           logmpin2:'',
           logmpin3:'',
           logmpin4:'',
           logmpin5:'',
           logmpin6:'',
           logmpin7:'',
           logmpin8:'',
           name:'',
           email:'',
           countryCode:''
         }))
       },2000);
      }
     }

    const clickNotnow=()=>{
      dispatch(setemptycheckusernameexist())
      setinputdata({username:'',password:'',type:'Patient',otp1:'',otp2:'',otp3:'',otp4:'',logmpin1:'',logmpin2:'',logmpin3:'',logmpin4:''})
    } 

    const clickEyeBtn=(val)=>{
      setvisible(val)
    }

    const SelectType=(selected)=>{
      settypeselect(true)
      setinputdata((prev)=>({
        ...prev,
        type:selected
      }))
    }

    const validate=()=>{
      if (!inputdata.username) {
        seterror({username:'Phone no is required'})
      }
      else if(inputdata.username.length<10){
        seterror({username:'Invalid phone no'})
      }
      else if (!inputdata.password) {
        seterror({password:'password is required'})
      }
      else if(inputdata.password.length<6){
        seterror({password:'Password should be more than 6 digit'})
      }
      else{seterror({username:'',password:'',invalid:''})}
      
    }

    const navigateToPage=()=>{
      settokenControl(true)
        const decodedToken = jwtDecode(Token);
       
        const Id=decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
        const Role=decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
        const decodedname = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
        dispatch(setuserdataUpdate({type:Role}))
        localStorage.setItem('name',decodedname)
        setUserid(Id)
        const decodedDate=new Date(decodedToken.exp*1000)
        setDecodedDate(decodedDate)
        setroles(Role)
       
    }

    const Clickloginbtn=()=>{
      let data={
        UserName:inputdata.username,
        Password:`${inputdata.logmpin1}${inputdata.logmpin2}${inputdata.logmpin3}${inputdata.logmpin4}`,
        type:inputdata.type
      }
      dispatch(loginData(data)).then((res)=>{
        if(res){
          let token=localStorage.getItem('accessToken')
          setToken(token)
        }
      })
    }

    const socialMediaLogin=(logintype)=>{
      const formdata=new FormData()
      formdata.append('provider',logintype)
      formdata.append('userType',inputdata.type)
      dispatch(PostExternallogin(formdata))
    }

    const googleloginClick = useGoogleLogin({
      onSuccess: tokenResponse => {
     
        dispatch(GetGoogleuserinfoBytoken(tokenResponse.access_token)).then((res)=>{
       
          if(res){
            setinputdata({...inputdata,name:res.name,email:res.email})
            setvalidategoogleToken(true)
            setloginSignup(false)
            dispatch(GetCheckExistingEmail(res.email,inputdata.type)).then((response)=>{
             
              if(response.PasswordExists){
                setExistEmail(true)
                setinputdata({...inputdata,username:response.userName,name:response.Name})
                setuserdataUpdate({name:response.Name})
              }
            }).catch((err)=>{

            })
          }
        })
      },
      onError:error=>{alert(error)}
    });

    const responseFacebook = (response) => {
    
    };
    

    const onClickBtn= async (e)=>{
        e.preventDefault()
      

        const allErrorsEmpty = Object.values(errors).every((error)=>error ==='')
      
        let data={
          UserName:inputdata.username.trim().includes(" ") ? inputdata.username.trim().replace(/\s+/g, '_') : inputdata.username.trim(),
          Password:inputdata.password,
          type:inputdata.type
        }
        if(allErrorsEmpty){
           dispatch(loginData(data))
           seterror({username:'',password:'',invalid:''})
           dispatch(setemptycheckusernameexist())
        }
       
    }
  return (
  !signup ?(

      <div className='login_main' >
        <ToastContainer/>
          <div className='login_subdiv1'>
              <img src={loginlogo} className='loginlogo'/>
              <div className='d-flex justify-content-center'>
                <h6>Terms of use</h6><div className='vl'></div><h6>Privacy policy</h6>
              </div>
          </div>
          <div className='login_subdiv2'>
            <div className='login_main_container'>
              <div className='logintypesel_div'>
                <div className={inputdata.type=='Patient' ? "logintypesel_subdiv1_selected" : "logintypesel_subdiv1"} onClick={()=>{SelectType("Patient")}}>
                  <div className='d-flex mt-3 mb-3 ml-4 '>
                    <MdPersonalInjury className='login_icon'/>
                    <h5 className='pl-1'>Patient</h5>
                  </div>
                </div>
                <div className={inputdata.type=='Doctor' ? "logintypesel_subdiv2_selected" : "logintypesel_subdiv2" }  onClick={()=>{SelectType("Doctor")}}>
                  <div className='d-flex mt-3 mb-3' >
                    <CiStethoscope className='login_icon'/>
                    <h5 className='pl-1'>Doctor</h5>
                  </div>
                </div>
                <div className={inputdata.type=='Staff' ? "logintypesel_subdiv3_selected" : "logintypesel_subdiv3"} onClick={()=>{SelectType("Staff")}}>
                  <div className='d-flex mt-3 mb-3 mr-4'>
                  <LiaClinicMedicalSolid className='login_icon'/>
                  <h5 className='pl-1'>Staff</h5>
                  </div>
                </div>
              </div>
        {/*classname={Existusername && Existusername.PasswordExists==false ?'logincontent_divNoExistuser':'logincontent_div'} */}
              <div className='logincontent_div'>
                {(Existusername  && Existusername.PasswordExists==true) || (existEmail) ?(
                  forgotmpin ?(
                    <ForgotMPIN/>
                  ):loginwithotp ?(
                    <LoginWithOtp/>
                  ):(
                  <div className='logincontent_div_containerExistuser'>
                    <div>
                    <IconButton onClick={()=>dispatch(setemptycheckusernameexist())} >
                      <TiArrowBack style={{color:'#408b84'}}/>
                    </IconButton>
                   </div>
                    <div className='logincontent_div_header1Existuser'>
                      <p>Welcome Back {Existusername ? Existusername.Name :inputdata.name}!</p>
                    </div>
                    <div className='logincontent_div_header2Existuser'>
                      <p>Please enter your MPIN</p>
                    </div>
                    <div className='login_mpin_divcontainer'>
                      <div className='login_mpin_div'>
                        <input type={inputdata.logmpin1 && !showOtpValues ?"text":'number' } name='logmpin1'  className='otp-input' maxLength='1' value={inputdata.logmpin1 && !showOtpValues ? '*':inputdata.logmpin1}  onChange={handleInputChange} onKeyUp={handleKeyUpchange}/>
                        <input type={inputdata.logmpin2 && !showOtpValues ?"text":'number' } name='logmpin2'  className='otp-input' maxLength='1' value={inputdata.logmpin2 && !showOtpValues ? '*':inputdata.logmpin2}  onChange={handleInputChange} onKeyUp={handleKeyUpchange}/>
                        <input type={inputdata.logmpin3 && !showOtpValues ?"text":'number' } name='logmpin3'  className='otp-input' maxLength='1' value={inputdata.logmpin3 && !showOtpValues ? '*':inputdata.logmpin3}  onChange={handleInputChange} onKeyUp={handleKeyUpchange}/>
                        <input type={inputdata.logmpin4 && !showOtpValues ?"text":'number' } name='logmpin4'  className='otp-input' maxLength='1' value={inputdata.logmpin4 && !showOtpValues ? '*':inputdata.logmpin4}  onChange={handleInputChange} onKeyUp={handleKeyUpchange}/>
                      </div>
                    </div>
                    {errors.invalid &&(
                      <div className='d-flex justify-content-center mt-3'>
                        <p className='login_error'>{errors.invalid}</p>
                      </div>
                    )}
                    <div className='d-flex justify-content-around mt-4'>
                      <div className='login_forgot_mpin_otp_div'>
                        <div onClick={()=>{dispatch(setforgetmpin(true))}}>
                          <p>Forgot MPIN</p>
                        </div>
                        <div onClick={()=>dispatch(setloginwithotp(true))}>
                          <p>Login with OTP</p>
                        </div>
                      </div>
                    </div>
                    <div className='login_loginbtndiv'>
                      <button disabled={!activeloginbtn} className={!activeloginbtn ? 'login-disabled' :'login_btn'} onClick={Clickloginbtn}>Login</button>
                    </div>
                    <div className='login_notyoudiv' onClick={clickNotnow}>
                      <IoArrowBack className='mt-1'/>
                      <p className='ml-3'>Not You ?</p>
                    </div>
                  </div>
                  )
                ):(
                <div className={Existusername && Existusername.PasswordExists==false ? 'logincontent_div_containerNotExistuser' : 'logincontent_div_container'}>
                   <div>
                    {Existusername!==null ?(
                    <IconButton onClick={()=>{
                       dispatch(setemptycheckusernameexist())
                       setloginSignup(false)
                    }}>
                      <TiArrowBack style={{color:'#408b84'}}/>
                    </IconButton>
                    ):validategoogleToken ?(
                      <IconButton onClick={()=>{setvalidategoogleToken(false) 
                                         setvisiblePhoneInput(false)}}>
                      <TiArrowBack style={{color:'#408b84'}}/>
                    </IconButton>
                    ):(<></>)}
                  </div>
                  <div className='logincontent_div_header'>
                    {Existusername && Existusername.PasswordExists ==false &&!validategoogleToken ? (
                      <>
                       <p>Welcome Aboard!</p>
                      </>
                    ):validategoogleToken ?(
                      <>
                       <p>Welcome Aboard,{inputdata.name}!</p>
                      </>
                    ):(
                      <>
                       <p>Login/Signup</p>
                     </>
                    )}
                  </div>
                  {!visiblephoneInput &&(
                    <>
                     { 
                  (!loginSinup && !visiblephoneInput && 
                  !(Existusername && Existusername.PasswordExists ==false &&!validategoogleToken)) && ( 
                    <div className='methodcontainer'>
                    <button 
                      className={`input-toggle-btn ${inputMethod === 'phone' ? 'active' : ''}`} 
                      onClick={() => setInputMethod('phone')}
                    >
                      Phone
                    </button>
                    <button 
                      className={`input-toggle-btn ${inputMethod === 'email' ? 'active' : ''}`} 
                      onClick={() => setInputMethod('email')}
                    >
                      Email
                    </button>
                  </div>
                    )}

                    {inputMethod === 'phone' && (
                    <div className='logincontent_div_phoneinputcontainer'>
                      <div className='logincontent_div_phoneinput'>
                        <PhoneInput
  inputStyle={{ height: '45px', borderRadius: '10px' }}
  containerStyle={{ borderRadius: '10px' }}
  country={'bf'}
  value={phone}
  onChange={handlePhoneChange}
  onPaste={(e) => {
    const pastedValue = e.clipboardData.getData('text');
    handlePhoneChange(pastedValue, { dialCode: 'bf' }); // Adjust the country code as needed
  }}
/>
                      </div>
                    </div>
                  )}

                      {inputMethod === 'email' && (
                        <div className="logincontent_div_emailinputcontainer">
                          <div className="logincontent_div_emailinput">
                            <input
                              type="email"
                              placeholder="Enter your email"
                              value={email}
                              onChange={handleEmailChange}
                              className="email-input"
                            />
                          </div>
                        </div>
                      )}

                    {loginSinup &&(
                    <div className='d-flex justify-content-center'>
                      <button  className={'login_btn'} onClick={handleLoginSignup}>Login/Signup</button>
                    </div>
                    )}
                    </>
                  )}
                  {Existusername && Existusername.PasswordExists==false &&!validategoogleToken &&(
                    <div>
                      <div className='login_mpin_divcontainer'>
                        <div className='login_mpin_divNotExistuser'>
                          <input type={inputdata.otp1 && !showOtpValues ?"text":'number' } name='otp1'  className='otp-input' maxLength='1' value={inputdata.otp1 && !showOtpValues ? '*':inputdata.otp1} onChange={handleInputChange} onKeyUp={handleKeyUpchange}/>
                          <input type={inputdata.otp2 && !showOtpValues ?"text":'number' } name='otp2'  className='otp-input' maxLength='1' value={inputdata.otp2 && !showOtpValues ? '*':inputdata.otp2} onChange={handleInputChange} onKeyUp={handleKeyUpchange}/>
                          <input type={inputdata.otp3 && !showOtpValues ?"text":'number' } name='otp3'  className='otp-input' maxLength='1' value={inputdata.otp3 && !showOtpValues ? '*':inputdata.otp3} onChange={handleInputChange} onKeyUp={handleKeyUpchange}/>
                          <input type={inputdata.otp4 && !showOtpValues ?"text":'number' } name='otp4'  className='otp-input' maxLength='1' value={inputdata.otp4 && !showOtpValues ? '*':inputdata.otp4} onChange={handleInputChange} onKeyUp={handleKeyUpchange}/>
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
                       <p style={{cursor:'pointer',fontFamily:'Caveat Brush'}} onClick={resentOtp}>Resend OTP</p> 
                       {timer > 0 && (
                          <span style={{ marginLeft: '10px', color: 'black' }}>
                            {`(${Math.floor(timer / 60)}:${('0' + (timer % 60)).slice(-2)})`}
                          </span>
                        )}
                      </div>
                      <div className='d-flex justify-content-center mt-2 mb-3'>
                        <div className='loginvarifyOtp_resend'>
                          {visiblevarifyotpbtn &&(
                             <button disabled={!visiblevarifyotpbtn} className={!visiblevarifyotpbtn ? 'login-disabled' :'login_btn'} onClick={valifyOtp}>Verify OTP</button>
                          )}
                          
                        </div>
                     </div>
                    </div>
                  )}
  {/* login with google section */}
  
                  {validategoogleToken &&(
                    <>
                    {visiblegoogleOTPsec &&(
                     <div className='login_mpin_divcontainer'>
                        <div className='login_mpin_divNotExistuser'>
                          <input type={inputdata.otp1 && !showOtpValues ?"text":'number' } name='otp1'  className='otp-input' maxLength='1' value={inputdata.otp1 && !showOtpValues ? '*':inputdata.otp1} onChange={handleInputChange} onKeyUp={handleKeyUpchange}/>
                          <input type={inputdata.otp2 && !showOtpValues ?"text":'number' } name='otp2'  className='otp-input' maxLength='1' value={inputdata.otp2 && !showOtpValues ? '*':inputdata.otp2} onChange={handleInputChange} onKeyUp={handleKeyUpchange}/>
                          <input type={inputdata.otp3 && !showOtpValues ?"text":'number' } name='otp3'  className='otp-input' maxLength='1' value={inputdata.otp3 && !showOtpValues ? '*':inputdata.otp3} onChange={handleInputChange} onKeyUp={handleKeyUpchange}/>
                          <input type={inputdata.otp4 && !showOtpValues ?"text":'number' } name='otp4'  className='otp-input' maxLength='1' value={inputdata.otp4 && !showOtpValues ? '*':inputdata.otp4} onChange={handleInputChange} onKeyUp={handleKeyUpchange}/>
                        </div>
                    </div>
                    )}
                    {visiblegoogleOTPsec &&(
                      <div className='d-flex justify-content-center mt-3'>
                          <p style={{cursor:'pointer',fontFamily:'Caveat Brush'}} onClick={resentOtp}>Resend OTP</p> 
                          {timer > 0 && (
                             <span style={{ marginLeft: '10px', color: 'black' }}>
                               {`(${Math.floor(timer / 60)}:${('0' + (timer % 60)).slice(-2)})`}
                             </span>
                           )}
                      </div>
                    )}
                    {!visiblephoneInput &&(
                    <div className='d-flex justify-content-center mt-2 mb-3'>
                      <div className='loginvarifyOtp_resend'>
                        {visiblegoogleOTPsec ?(
                         <button disabled={!visiblevarifyotpbtn} className={!visiblevarifyotpbtn ? 'login-disabled' :'login_btn'} onClick={verifyOtpHandler}>Verify OTP</button>
                        ):(
                        <button  className={'login_btn'} onClick={sendOtpHandler}>Send OTP</button>
                        )}
                      </div>
                    </div>
                    )}
                    {errors.sentotp &&(
                        <div className='d-flex justify-content-center mt-2'>
                        <p style={{color:'#008080', fontFamily:'Roboto Slab'}}>{errors.sentotp}</p>
                        </div>
                      )}
                    {visiblephoneInput&&(
                      <>
                      <div className='login_mpin_divcontainer'>
                        <div className='login_mpin_divNotExistuser1'>
                        <input type={inputdata.logmpin1 && !showOtpValues ?"text":'number' } name='logmpin1'  className='otp-input' maxLength='1' value={inputdata.logmpin1 && !showOtpValues ? '*':inputdata.logmpin1} onChange={handleInputChange} onKeyUp={handleKeyUpchange}/>
                        <input type={inputdata.logmpin2 && !showOtpValues ?"text":'number' } name='logmpin2'  className='otp-input' maxLength='1' value={inputdata.logmpin2 && !showOtpValues ? '*':inputdata.logmpin2} onChange={handleInputChange} onKeyUp={handleKeyUpchange}/>
                        <input type={inputdata.logmpin3 && !showOtpValues ?"text":'number' } name='logmpin3'  className='otp-input' maxLength='1' value={inputdata.logmpin3 && !showOtpValues ? '*':inputdata.logmpin3} onChange={handleInputChange} onKeyUp={handleKeyUpchange}/>
                        <input type={inputdata.logmpin4 && !showOtpValues ?"text":'number' } name='logmpin4'  className='otp-input' maxLength='1' value={inputdata.logmpin4 && !showOtpValues ? '*':inputdata.logmpin4} onChange={handleInputChange} onKeyUp={handleKeyUpchange}/>
                        </div>
                      </div>
                       <div className='login_mpin_divcontainer'>
                       <div className='login_mpin_divNotExistuser1'>
                       <input type={inputdata.logmpin5 && !showOtpValues ?"text":'number' } name='logmpin5'  className='otp-input' maxLength='1' value={inputdata.logmpin5 && !showOtpValues ? '*':inputdata.logmpin5} onChange={handleInputChange} onKeyUp={handleKeyUpchange}/>
                       <input type={inputdata.logmpin6 && !showOtpValues ?"text":'number' } name='logmpin6'  className='otp-input' maxLength='1' value={inputdata.logmpin6 && !showOtpValues ? '*':inputdata.logmpin6} onChange={handleInputChange} onKeyUp={handleKeyUpchange}/>
                       <input type={inputdata.logmpin7 && !showOtpValues ?"text":'number' } name='logmpin7'  className='otp-input' maxLength='1' value={inputdata.logmpin7 && !showOtpValues ? '*':inputdata.logmpin7} onChange={handleInputChange} onKeyUp={handleKeyUpchange}/>
                       <input type={inputdata.logmpin8 && !showOtpValues ?"text":'number' } name='logmpin8'  className='otp-input' maxLength='1' value={inputdata.logmpin8 && !showOtpValues ? '*':inputdata.logmpin8} onChange={handleInputChange} onKeyUp={handleKeyUpchange}/>
                       </div>
                     </div>
                     {errors.mpin &&(
                      <div className='d-flex justify-content-center mt-2'>
                        <p className='login_error'>{errors.mpin}</p>
                      </div>
                    )}
                     <div className='d-flex justify-content-center mt-1 mb-3'>
                      <div className='loginvarifyOtp_resend'>
                        <button disabled={!visiblevarifyotpbtn} className={!visiblevarifyotpbtn ? 'login-disabled' :'login_btn'} onClick={saveMpin}>Save</button>
                      </div>
                    </div>
                      </>
                    )}
                    </>
                  )}
                  
                  {!validategoogleToken &&(
                    <>
                    <div className='logincontent_div_line'>
                      <div className='login_or_line'></div>
                        <p className='ml-2 mr-2'>OR</p>
                      <div className='login_or_line'></div>
                    </div>
                    <div className='logincontent_div_footer_container'>
                      <div className='logincontent_div_footer'>
                        
                        <div>
                          <img src={googlelogo} className='footer_icon' onClick={googleloginClick}></img>
                        </div>
                        <div>
                        
                        </div>
                    </div>
                  </div>
                    </>
                  )}
                </div>
                )}
              </div>
              <div className='footer_div'>
                <p>Powered by</p>
                <img src={copyrightlogo}/>
              </div>
            </div>  
          </div>
      </div>
    ):(
      <Signup/>
    )
  )
}

export default LoginPage