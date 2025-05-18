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

const VerifyEmail = () => {
  const location = useLocation();
  const { email, userType } = location.state || {};
    const [signup,setsignup]=useState(false)
    const navigate=useNavigate()
        const dispatch=useDispatch()
        const formdata=new FormData()
    const error=useSelector((state)=>state.Errorhandle.errors)
      const loginerror=useSelector((state)=>state.logindetails.error)
      const Existusername=useSelector((state)=>state.signup.checkloginusernameExist)
      const forgotmpin=useSelector(state=>state.logindetails.forgotmpin)
      const loginwithotp=useSelector(state=>state.logindetails.loginwithotp)
       const [Token,setToken]=useState(null)
   
  const authurl=''
        const [inputdata,setinputdata]=useState({username:'',password:'',type:'Patient',otp1:'',otp2:'',otp3:'',otp4:'',logmpin1:'',logmpin2:'',logmpin3:'',logmpin4:'',logmpin5:'',logmpin6:'',logmpin7:'',logmpin8:'',name:'',email:'',countryCode:''})
        const [typeselect,settypeselect]=useState(false)
        const SelectType=(selected)=>{
          settypeselect(true)
          setinputdata((prev)=>({
            ...prev,
            type:selected
          }))
        }
    const [errors,seterror]=useState({username:'',password:'',invalid:''})
    const [visiblevarifyotpbtn,setvisiblevarifyotpbtn]=useState(false)
    const [timer, setTimer] = useState(0);
    const handleInputChange=(e)=>{
        const {name,value}=e.target;
          setinputdata((prev)=>({
            ...prev,
            [name]:value
           }))
        }  
    const [showOtpValues, setShowOtpValues] = useState(false);
    
    
      const handleVerifyOtp = () => {
        const enteredOtp = `${inputdata.otp1}${inputdata.otp2}${inputdata.otp3}${inputdata.otp4}`;
        axios
          .post(
            `https://laafi.in/auth/api/Auth/VerifyOtp?userName=${email}&purpose=registration&token=${enteredOtp}&userType=${userType}`
          )
          .then((response) => {
            if (response.status === 200) {
              
      
              setShowOtpValues(true);
              dispatch(setlogindata(inputdata));
              setsignup(true);
      
              if (Existusername && Existusername.IsNewUser) {
                formdata.append("PhoneNumber", inputdata.username);
      
                if (inputdata.type === "Doctor") {
                  dispatch(RegisterHospitalUser(formdata, inputdata.type)).then((res) => {
                    if (res) {
                      dispatch(GetExistingUser(inputdata.username, inputdata.type));
                    }
                  });
                } else if (inputdata.type === "Patient") {
                  formdata.append("CountryCode", "in");
                  dispatch(SignupDataPatient(formdata)).then((res) => {
                    if (res) {
                      dispatch(GetExistingUser(inputdata.username, inputdata.type));
                    }
                  });
                } else {
                  formdata.append("HospitalId", 1);
                  dispatch(RegisterHospitalUser(formdata, inputdata.type)).then((res) => {
                    if (res) {
                      dispatch(GetExistingUser(inputdata.username, inputdata.type));
                    }
                  });
                }
              }
            }
          })
          .catch((error) => {
            console.error("Error verifying OTP:", error);
            seterror((prev) => ({
              ...prev,
              otp: "Invalid OTP. Please try again.",
            }));
          });
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
  
        
  return (
    !signup ?(
    <div className='login_main' >
        <div className='login_subdiv1'>
        <img src={loginlogo} className='loginlogo'/>
        <div className='d-flex justify-content-center'>
        <h6>Terms of use</h6><div className='vl'></div><h6>Privacy policy</h6>
        </div>
        </div>

        <div className='login_subdiv2'>
            <div className='login_main_container'>
                <div className='logintypesel_div'>
                    <div className={userType=='Patient' ? "logintypesel_subdiv1_selected" : "logintypesel_subdiv1"} onClick={()=>{SelectType("Patient")}}>
                        <div className='d-flex mt-3 mb-3 ml-4 '>
                            <MdPersonalInjury className='login_icon'/>
                            <h5 className='pl-1'>Patient</h5>
                        </div>
                        </div>
                        <div className={userType=='Doctor' ? "logintypesel_subdiv2_selected" : "logintypesel_subdiv2" }  onClick={()=>{SelectType("Doctor")}}>
                        <div className='d-flex mt-3 mb-3' >
                        <CiStethoscope className='login_icon'/>
                        <h5 className='pl-1'>Doctor</h5>
                        </div>
                        </div>
                        <div className={userType=='Staff' ? "logintypesel_subdiv3_selected" : "logintypesel_subdiv3"} onClick={()=>{SelectType("Staff")}}>
                        <div className='d-flex mt-3 mb-3 mr-4'>
                        <LiaClinicMedicalSolid className='login_icon'/>
                        <h5 className='pl-1'>Staff</h5>
                        </div>
                        </div>
                    </div>
                    <div className='logincontent_div1   '>
                        <div className='logincontent_div_containerNotExistuser'>
                            <div className='logincontent_div_header'>
                            <p>Welcome Aboard!</p>
                            </div>
                            <div >
                                <div className="logincontent_div_emailinput">
                                <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                className="email-input"
                                />
                                </div>
                            </div>
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
                                <p style={{cursor:'pointer',fontFamily:'Caveat Brush'}} >Resend OTP</p> 
                               
                                </div>
                                <div className='d-flex justify-content-center mt-2 mb-3'>
                                    <div className='loginvarifyOtp_resend'>
                                        <button  className={'login_btn'} onClick={handleVerifyOtp}>Verify OTP</button>
                                    
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                </div>

        </div>
    </div>
      ):(
        <EmailSignup  email={email}
    userType={userType}
    username={inputdata.username}/>
      )
  );
};

export default VerifyEmail;
