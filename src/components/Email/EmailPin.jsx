import React,{ useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import loginlogo from '../../assets/Logos/loginlogo.png'
import { CiStethoscope } from "react-icons/ci";
import { LiaClinicMedicalSolid } from "react-icons/lia";
import { MdPersonalInjury } from "react-icons/md";
import axios from 'axios'
import { useSelector} from 'react-redux'
import { useDispatch } from 'react-redux'
import Signup from '../../components/Signup'
import { PostExternallogin,GetExistingUser,PatchSetPin,loginData,RegisterHospitalUser,SignupDataPatient } from '../Store/ApiReducers/Auth';
import { useNavigate } from 'react-router-dom';
import { setemptyerror, setemptylogindata, setforgetmpin, setlogindata, setloginwithotp, setuserdataUpdate  } from '../Store/LoginSlice';
import { setLoading } from '../Store/LoadingSlice';
import EmailSignup from './EmailSignup';
import LoginWithOtp from '../Admin/LoginChild/LoginWithOtp';
import ForgotMPIN from '../Admin/LoginChild/ForgotMPIN';
import { toast, ToastContainer } from 'react-toastify'
import copyrightlogo from '../../assets/Logos/netsrishticlrlogo.jpeg'
import { IoArrowBack } from "react-icons/io5";
import {  IconButton} from '@mui/material'
import { jwtDecode } from "jwt-decode";
import { TiArrowBack } from "react-icons/ti";
import { setemptycheckusernameexist } from '../Store/SignupSlice';
import { resetError } from '../Store/ErrorSlice';
import ResetEmail from './ResetEmail';
import LoginwithEmail from './LoginwithEmail';

const EmailPin = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const formdata=new FormData()
    const location = useLocation();
    const { email, userType,Name } = location.state || {};
    
    const [errors,seterror]=useState({username:'',password:'',invalid:''})
    const [activeloginbtn,setloginactivebtn]=useState(false)
    
    const [Token,setToken]=useState(null)
    const error=useSelector((state)=>state.Errorhandle.errors)
    const loginerror=useSelector((state)=>state.logindetails.error)
    const Existusername=useSelector((state)=>state.signup.checkloginusernameExist)
    const forgotmpin=useSelector(state=>state.logindetails.forgotmpin)
    const loginwithotp=useSelector(state=>state.logindetails.loginwithotp)
     const [inputdata,setinputdata]=useState({username:'',password:'',type:'Patient',otp1:'',otp2:'',otp3:'',otp4:'',logmpin1:'',logmpin2:'',logmpin3:'',logmpin4:'',logmpin5:'',logmpin6:'',logmpin7:'',logmpin8:'',name:'',email:'',countryCode:''})
         const [showOtpValues, setShowOtpValues] = useState(false);
         const [userId, setUserid] = useState(null);
         const [decodedDate,setDecodedDate]=useState()
         const [tokenControl,settokenControl]=useState(false)
         const [roles,setroles]=useState()
         const [registerd,setregisterd]=useState(false)
     
    
    const handleInputChange=(e)=>{
        const {name,value}=e.target;
          setinputdata((prev)=>({
            ...prev,
            [name]:value
           }))
        }
        
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
          const Clickloginbtn=()=>{
                let data={
                  UserName:email,
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
              const clickNotnow=()=>{
                    dispatch(setemptycheckusernameexist())
                    setinputdata({username:'',password:'',type:'Patient',otp1:'',otp2:'',otp3:'',otp4:'',logmpin1:'',logmpin2:'',logmpin3:'',logmpin4:''})
                  } 

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
      
  return (
  
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
                {(email,Name) ?(
                  forgotmpin ?(
                    <ResetEmail email={email} userType={userType}/>
                  ):loginwithotp ?(
                    <LoginwithEmail email={email} userType={userType}/>
                  ):(
                  <div className='logincontent_div_containerExistuser'>
                    <div>
                    <IconButton onClick={()=>navigate('/login')} >
                      <TiArrowBack style={{color:'#408b84'}}/>
                    </IconButton>
                   </div>
                    <div className='logincontent_div_header1Existuser'>
                      <p>Welcome Back {Name}!</p>
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
                      <button  className={'login_btn'} onClick={Clickloginbtn}>Login</button>
                    </div>
                    <div className='login_notyoudiv' onClick={clickNotnow}>
                      <IoArrowBack className='mt-1'/>
                      <p className='ml-3'>Not You ?</p>
                    </div>
                  </div>
                  )
                ):(
                null
                )}
              </div>
              <div className='footer_div'>
                <p>Powered by</p>
                <img src={copyrightlogo}/>
              </div>
            </div>  
          </div>
      </div>
   
  )
}


export default EmailPin
