import React, { useEffect, useState } from 'react'
import { FormControl } from '@mui/base/FormControl';
import { Button, IconButton, Link } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useSelector,useDispatch } from 'react-redux';
import { setUsers,resetinput,setuserArray,incrementid,signupApidata, setemptypostresponse, setemptycheckusernameexist, setemptychecusernamesignupexist} from './Store/SignupSlice';
import { setLoading } from './Store/LoadingSlice';
import { setemptyloginresponse, setforgetmpin, setloginArray, setlogindata, setuserdataUpdate } from './Store/LoginSlice';
import { width } from '@mui/system';
import { NavLink, useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2'
import dashboardImage from '../assets/dashboard.jpg.avif';
import labimage from '../assets/labdashimg.jpg'
// import labimage from '../assets/loginbackgroudnew.jpg'
import 'react-phone-input-2/lib/style.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/Logos/laafi_logo_horizontal-light_504X251_colored.jpg'
import { SignupData, SignupDataDoctor } from './Store/Actions';
import { GetDepartmentData, PatchSetPin, PostExternalLogincallback } from './Store/ApiReducers/Auth';
import { jwtDecode } from 'jwt-decode';
import loginlogo from '../assets/Logos/loginlogo.png'
import googlelogo from '../assets/Logos/GoogleIcon.jpeg'
import { GetCheckExistingUsername, loginData, PostResetMpin, RegisterHospitalUser, SignupDataPatient } from './Store/ApiReducers/Auth';

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



const Signup = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const formdata= new FormData()
    

    const signupdata=useSelector((state)=>state.signup.signupresult)
    const Existusername=useSelector((state)=>state.signup.checkusernameExist)
    const Existloginusername=useSelector((state)=>state.signup.checkloginusernameExist)
    const postresult=useSelector((state)=>state.signup.registeredpatientresponse)
    const getdepartment=useSelector((state)=>state.Adddepartment.departmentArray)
    const loginresponse=useSelector((state)=>state.logindetails.result)
    const logdata=useSelector(state=>state.logindetails.loginData)
    const error=useSelector((state)=>state.Errorhandle.errors)
    const forgotmpin=useSelector(state=>state.logindetails.forgotmpin)

    const [roles,setroles]=useState()
    const [decodedDate,setDecodedDate]=useState()
    const [userId, setUserid] = useState(null);
    const [tokenControl,settokenControl]=useState(false)
    const [Token,setToken]=useState(null)
    const [phone,setphone]=useState({phone:'+91',country:''})
    const [depview,setdepview]=useState(false)
    const [visible,setvisible]=useState(false)
    const [file,setfile]=useState()
    const [istype,setistype]=useState(false)
    const [showMpinDiv,setshowMpindiv]=useState(false)
    const [visiblevarifympinbtn,setvisiblevarifympinbtn]=useState(false)
    const [showOtpValues, setShowOtpValues] = useState(false);
    const [errors,seterrors]=useState({ username:'',name: '',address: '',email: '',phone:'', confirmpassword: '',dob:''})
    const [signupdetails,setsignupdetails]=useState({
         name:'',
         userName:'',
         address:'',
         email:'',
         department:'',
         relation:'myself',
         regNo:'',
         hospId:'',
         dob:'',
         otp:'',
         password:'',
         confirmpassword:'',
         fee:'',
         mpin1:'',
         mpin2:'',
         mpin3:'',
         mpin4:'',
         mpin5:'',
         mpin6:'',
         mpin7:'',
         mpin8:'',
        })
    
    
    
    


    useEffect(()=>{
        {Existusername ==true ? seterrors({username:'Phone no already existing'}) :seterrors({username:''})}
        // if(postresult && postresult.length>0){
        //     const modifiedPhone = phone.phone.slice(2);
        //     let data={
        //         UserName:logdata.username,
        //         Password:logdata.newpassword,
        //         type:logdata.type
        //       }
        //     dispatch(loginData(data))
        //     // setTimeout(()=>navigate('/'),2000)
        //     dispatch(setemptypostresponse())
        // }
        // if(loginresponse){
        //     const token=localStorage.getItem('accessToken')
        //     dispatch(setemptyloginresponse(null))
        //     setToken(token)
        // }
        if(error){
          seterrors({mpin:'Role not added try login after sometime'})
           setTimeout(()=>navigate('/'),2000)
        }
    },[Existusername,postresult,loginresponse,error])

    useEffect(()=>{
        if(Token !==null && !tokenControl){
          navigateToPage()
        //   seterror({invalid:''})
        }
        if(roles !==undefined){
       
          const currentDate=new Date()
          if(currentDate<decodedDate && roles ==='admin'){
            navigate(`/Home/admindashboard`); 
            setsignupdetails({ name:'',address:'',userName:'',email:'', department:'',type:'Patient',relation:'myself',regNo:'',hospId:'',dob:'',otp:'',password:'',confirmpassword:'',fee:'',})
            setphone({phone:'+91',country:''})
            dispatch(setforgetmpin(false))
            dispatch(setemptycheckusernameexist())
          }
          else if(currentDate<decodedDate && roles==='pharmacy'){
            navigate(`/pharmacyhome/pharmacydashboard`); 
            setsignupdetails({ name:'',address:'',userName:'',email:'', department:'',type:'Patient',relation:'myself',regNo:'',hospId:'',dob:'',otp:'',password:'',confirmpassword:'',fee:'',})
            setphone({phone:'+91',country:''})
            dispatch(setforgetmpin(false))
            dispatch(setemptycheckusernameexist())
          }
          else if(currentDate<decodedDate && roles==='reception'){
            navigate(`/receptionhome/receptiondashboard`); 
            setsignupdetails({ name:'',address:'',userName:'',email:'', department:'',type:'Patient',relation:'myself',regNo:'',hospId:'',dob:'',otp:'',password:'',confirmpassword:'',fee:'',})
            setphone({phone:'+91',country:''})
            dispatch(setforgetmpin(false))
            dispatch(setemptycheckusernameexist())
          }
          else if(currentDate<decodedDate && roles==='lab'){
            navigate(`/labhome/labdashboard`); 
            setsignupdetails({ name:'',address:'',userName:'',email:'', department:'',type:'Patient',relation:'myself',regNo:'',hospId:'',dob:'',otp:'',password:'',confirmpassword:'',fee:'',})
            setphone({phone:'+91',country:''})
            dispatch(setemptycheckusernameexist())
          }
          else if(currentDate<decodedDate && roles==='patient'){
            navigate(`/patient/patientdashboard`); 
            setsignupdetails({ name:'',address:'',userName:'',email:'', department:'',type:'Patient',relation:'myself',regNo:'',hospId:'',dob:'',otp:'',password:'',confirmpassword:'',fee:'',})
            setphone({phone:'+91',country:''})
            dispatch(setforgetmpin(false))
            dispatch(setemptycheckusernameexist())
          }
          else if(currentDate<decodedDate &&  roles==='nurse'){
            navigate(`/nurse/nursedashboard`); 
            setsignupdetails({ name:'',address:'',userName:'',email:'', department:'',type:'Patient',relation:'myself',regNo:'',hospId:'',dob:'',otp:'',password:'',confirmpassword:'',fee:'',})
            setphone({phone:'+91',country:''})
            dispatch(setforgetmpin(false))
            dispatch(setemptycheckusernameexist())
          }
          else if(currentDate<decodedDate && roles==='doctor'){
            navigate(`/doctor/doctordashboard`); 
            setsignupdetails({ name:'',address:'',userName:'',email:'', department:'',type:'Patient',relation:'myself',regNo:'',hospId:'',dob:'',otp:'',password:'',confirmpassword:'',fee:'',})
            setphone({phone:'+91',country:''})
            dispatch(setforgetmpin(false))
            dispatch(setemptycheckusernameexist())
          }
          else{
            navigate('signup')
          }
        }
      },[userId,decodedDate,Token,tokenControl,roles])

      useEffect(()=>{
        const mpinValues = [signupdetails.mpin2, signupdetails.mpin2, signupdetails.mpin3, signupdetails.mpin4,
                            signupdetails.mpin5,signupdetails.mpin6,signupdetails.mpin7,signupdetails.mpin8 
                            ];
        const allmpinFilled = mpinValues.every(value => value.trim() !== '');
        setvisiblevarifympinbtn(allmpinFilled)
        seterrors({mpin:''})
      },[signupdetails])

    const navigateToPage=()=>{
        settokenControl(true)
          const decodedToken = jwtDecode(Token);
        
          const Id=decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
          const Role=decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
          const decodedname = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
          dispatch(setuserdataUpdate({name:signupdetails.name,type:Role}))
          localStorage.setItem('name',decodedname)
          setUserid(Id)
          const decodedDate=new Date(decodedToken.exp*1000)
          setDecodedDate(decodedDate)
          setroles(Role)
          
      }
    


    const onchangeUserinput=(e)=>{
        const {name,value}=e.target
        setsignupdetails((prev)=>({
            ...prev,
            [name]:value
        }))
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

    const NextClick=()=>{
        if(signupdetails.name){
            setshowMpindiv(true)
            dispatch(setlogindata(signupdetails))
        }
        else{
            seterrors({name:'Please fill your name'})
        }
    }
    const saveMpin=()=>{
      const { mpin1, mpin2, mpin3, mpin4, mpin5, mpin6, mpin7, mpin8 } = signupdetails;
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
                PhoneNumber:logdata.username,
                mpin:combinedMpin,
                userType:logdata.type,
                name:logdata.name
              }
          dispatch(PatchSetPin(data)).then((res)=>{
               setToken(res.Token)
              }).catch((err)=>{
  
              })
       
        }
        else{
          seterrors({mpin:'MPIN not matching'})
        }  
 }

    const onChangephone = ( formattedValue,country) => {
        
            if(formattedValue.length==10){
                seterrors({username:''})
            }
            else if(formattedValue.length<10){
                seterrors({username:' 10 digit is required'})
                dispatch(setemptychecusernamesignupexist())
            }
            else if(formattedValue.length==12){
                seterrors({username:''}) 
                let type='Patient'
                if (signupdetails.type === 'Staffs') {
                    type = 'Staff';
                } else if (signupdetails.type === 'Doctor') {
                    type = 'Doctor';
                } else {
                    type = 'Patient';
                }
                const updatedphone=formattedValue.slice(2)
                dispatch(GetCheckExistingUsername(updatedphone,type,'signup'))
            }
            else{
               
                
            }

        setphone({ phone: formattedValue,country: country.countryCode});
     
      };


    const validateForm=()=>{
        
    //     if (!signupdetails.name) {
    //         seterrors({name : 'Name is required'})
    //     }
    //     else if (!signupdetails.address) {
    //         seterrors({address : 'address is required'})
    //      }
    //     else if (!signupdetails.email) {
    //         seterrors({email : ' email is required'})
    //     }
    //    else if (!/^\S+@\S+\.\S+$/.test(signupdetails.email)) {
    //         seterrors({email :'Invalid email format'})
    //     }
    //     else if (!signupdetails.relation) {
    //         seterrors({relation :'relation  is required'})
    //     }
    //     else if (!signupdetails.dob) {
    //         seterrors({dob :'dob  is required'})
    //     }
         if (!phone.phone) {
            seterrors({phone :'Phone No is required'})
        }
        else if (phone.phone.length < 12) {
            seterrors({phone :'invalid phone no'})
        }
        // else if (!signupdetails.otp) {
        //     seterrors({otp :'OTP No is required'})
        // }
       
        else if (!signupdetails.password) {
            seterrors({password : 'password is required'})
        }
        else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(signupdetails.password)) {
            seterrors({password : 'invalid Password'})
        }
        else if (signupdetails.password.length <= 7) {
            seterrors({password : 'lenght should be more than 8 characters'})
        }
       else if (!signupdetails.confirmpassword) {
            seterrors({confirmpassword : 'confirm password is required'})
        }
        else if (signupdetails.confirmpassword && signupdetails.password) {
            if(signupdetails.confirmpassword!==signupdetails.password){
                seterrors({confirmpassword : 'password is not matching'})
            }
            else{
                seterrors({confirmpassword : ''})
            }
        }
        else{
            seterrors({name: '',username:'',address: '', email: '',phone:'',password: '',confirmpassword: '',dob:''})
        }
     
    };
  

    const notify=()=>{
        toast('succesfully sign up',{
            position:toast.POSITION.TOP_RIGHT
        })
        setTimeout(()=>{
            navigate('/')
        },1500)
        
    }

    const onClickeyebtn=(val)=>{
        setvisible(val)
    }

    const SelectType=(selectedtype)=>{
        setistype(true)
        setsignupdetails({...signupdetails,type:selectedtype})
        if(selectedtype==='Doctor'){
            dispatch(GetDepartmentData())
            setdepview(true)
        }
          else if(selectedtype==='Patient' ||  selectedtype==='Vendors'){
              setdepview(false)
          }
          else if (selectedtype==='Staffs'){
              setdepview(true)
          }
    }
    
    const submitForm = async (e) => {
        e.preventDefault();
        validateForm();
    
        const allErrorsEmpty = Object.values(errors).every((error) => error === "");
      

        formdata.append('Name',signupdetails.name)
        formdata.append('Password',signupdetails.password)
        
        // formdata.append('UserName',signupdetails.userName.trim().includes(" ") ? signupdetails.userName.replace(/\s+/g, '_'):signupdetails.userName.trim())
        // formdata.append('Email',signupdetails.email)
        // formdata.append('Address',signupdetails.address)
        // formdata.append('Dob',signupdetails.dob)
        // formdata.append('Pic',file)
        
        if (allErrorsEmpty){ 
            if(signupdetails.type==='Patient'){
                const modifiedPhone = phone.phone.slice(2);
                formdata.append('PhoneNumber',modifiedPhone)
                formdata.append('CountryCode',phone.country)
                formdata.append('Relation',signupdetails.relation)
               
                dispatch(SignupDataPatient(formdata))
                // setphone({phone:'+91',country:''})
            }
            else if(signupdetails.type==='Doctor'){
                const modifiedPhone = phone.phone.slice(2);
                formdata.append('PhoneNumber',modifiedPhone)
               
                dispatch(RegisterHospitalUser(formdata,signupdetails.type))
             
            }
            else if (signupdetails.type==='Staff'){
                const modifiedPhone = phone.phone.slice(2);
                formdata.append('PhoneNumber',modifiedPhone)
                formdata.append('HospitalId',signupdetails.hospId)
                dispatch(RegisterHospitalUser(formdata,signupdetails.type));
            }

         
          
            setfile(null)
            setdepview(false)     
        }
    };
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
            <div className='logincontent_div'>
              <div className= 'signup_div_container'>
                {!showMpinDiv  ?(
                <>
                <div className='logincontent_div_header'>
                     <p>What do we call you?</p>
                </div>
                <div className='logincontent_div_phoneinputcontainer'>
                  <div className='logincontent_div_phoneinput'>
                   <input name='name' className='signupnameinput' placeholder='Your Name...' onChange={onchangeUserinput}/>
                    {/* <button><IoIosArrowForward style={{color:'white'}}/></button> */}
                  </div>
                </div>
                {errors.name &&(
                    <div className='d-flex justify-content-center'>
                    <p>{errors.name}</p>
                    </div>
                )}
                <div className='d-flex justify-content-center mt-5'>
                    <button className='login_btn' onClick={NextClick}>Next</button>
                </div>
                </>
                ):(
                <div className='d-flex justify-content-around flex-column'  style={{height:'100%'}}>
                    <div className='logincontent_div_header'>
                     <p>Please set your MPIN {logdata.name} </p>
                    </div>
                    <div className='login_mpin_divcontainer'>
                    <div className='login_mpin_div'>
                        <input type={signupdetails.mpin1 && !showOtpValues ?"text":'number' } name='mpin1'  className='otp-input' maxLength='1' value={signupdetails.mpin1 && !showOtpValues ? '*':signupdetails.mpin1} onChange={onchangeUserinput}/>
                        <input type={signupdetails.mpin2 && !showOtpValues ?"text":'number' } name='mpin2'  className='otp-input' maxLength='1' value={signupdetails.mpin2 && !showOtpValues ? '*':signupdetails.mpin2} onChange={onchangeUserinput}/>
                        <input type={signupdetails.mpin3 && !showOtpValues ?"text":'number' } name='mpin3'  className='otp-input' maxLength='1' value={signupdetails.mpin3 && !showOtpValues ? '*':signupdetails.mpin3} onChange={onchangeUserinput}/>
                        <input type={signupdetails.mpin4 && !showOtpValues ?"text":'number' } name='mpin4'  className='otp-input' maxLength='1' value={signupdetails.mpin4 && !showOtpValues ? '*':signupdetails.mpin4} onChange={onchangeUserinput}/>
                    </div>
                    </div>
                    <div className='login_mpin_divcontainer'>
                    <div className='signup_mpin_div'>
                        <input type={signupdetails.mpin5 && !showOtpValues ?"text":'number' } name='mpin5'  className='otp-input' maxLength='1' value={signupdetails.mpin5 && !showOtpValues ? '*':signupdetails.mpin5} onChange={onchangeUserinput}/>
                        <input type={signupdetails.mpin6 && !showOtpValues ?"text":'number' } name='mpin6'  className='otp-input' maxLength='1' value={signupdetails.mpin6 && !showOtpValues ? '*':signupdetails.mpin6} onChange={onchangeUserinput}/>
                        <input type={signupdetails.mpin7 && !showOtpValues ?"text":'number' } name='mpin7'  className='otp-input' maxLength='1' value={signupdetails.mpin7 && !showOtpValues ? '*':signupdetails.mpin7} onChange={onchangeUserinput}/>
                        <input type={signupdetails.mpin8 && !showOtpValues ?"text":'number' } name='mpin8'  className='otp-input' maxLength='1' value={signupdetails.mpin8 && !showOtpValues ? '*':signupdetails.mpin8} onChange={onchangeUserinput}/>
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
                )}
                </div>
            </div>
          </div>
        </div>
        </div>
    // <div className='signup_maindiv'>
    //     <div>
    //     <img src={logo} className='logo'/>
    //    </div>
    //     <ToastContainer/>
    //      <div style={{ position: "relative"}}> 
    //          <img src={labimage} alt="New Home Background" className='signupbackground1' />
    //       </div>
    //         <div className='signup_subdiv'>
    //             <form onSubmit={submitForm} id='signupform'>
    //                 {!istype &&(
    //                  <div className='d-flex justify-content-center'>
    //                     <h4>SELECT USER TYPE</h4>
    //                 </div>
    //                 )}
    //             <FormControl className='signupform' >
    //              {!istype ? (
    //                 <div className='signintype_main'>
    //                     <div onClick={()=>{SelectType("Doctor")}}><h4>DOCTOR</h4></div>
    //                     <div onClick={()=>{SelectType("Patient")}}><h4>PATIENT</h4></div>
    //                     <div onClick={()=>{SelectType("Staff")}}><h4>STAFF</h4></div>
    //                 </div>
    //              ):(
                    
    //             <div className='signupmain'>
    //                 <div class="signuprowdiv">
    //                     <label htmlFor='name' class="col-sm-2 col-form-label signuplabel">Name:</label>
    //                     <div className='adduserinput'>
    //                       <input type="text" class="form-control" name='name'  value={signupdetails.name} onChange={onchangeUserinput} />
    //                     {errors && errors.name && <div className='error-message'>{errors.name}</div>}
    //                     </div>
    //                 </div>
    //                 <div class="signuprowdiv">
    //                     <label htmlFor="phone" class="col-sm-2 col-form-label signuplabel">Phone:</label>
    //                     <div className='adduserinput'>
    //                         <div className='d-flex signuphonediv'>
    //                          <PhoneInput 
    //                           country={phone.country} 
    //                           name='phone'  
    //                           value={phone.phone} 
    //                           onChange={onChangephone}  
    //                           inputStyle={{ width: '260px', height:'37px' }}
    //                           />
    //                         </div>
    //                     {errors && errors.username && <div className='signuperror-message'>{errors.username}</div>}
    //                     </div>
    //                 </div>
                  
    //                     <div class="signuprowdiv">
    //                      <label htmlFor="password" class="col-sm-2 col-form-label signuplabel">Password:</label>
    //                      <div className='adduserinputpassword'>
    //                         <input
    //                             type={visible ? 'text':'password'}  
    //                             class="form-control" name='password'  
    //                             value={signupdetails.password} 
    //                             onChange={onchangeUserinput}  
    //                             onPaste={(e)=>{e.preventDefault() 
    //                                     return false}}
    //                             onCopy={(e)=>{e.preventDefault()
    //                                     return false}}
    //                         />
    //                     {visible==true ?(
    //                     <IconButton className='passwordicon' onClick={()=>onClickeyebtn(false)}>
    //                        <VisibilityIcon />
    //                     </IconButton>
    //                     ):(
    //                     <IconButton className='passwordicon' onClick={()=>onClickeyebtn(true)}>
    //                         <VisibilityOffIcon />
    //                      </IconButton>  
    //                     )}
    //                     </div>
    //                 </div>
    //                     {errors && errors.password && 
    //                     <div className='signuperror-message'>{errors.password}</div>
    //                     }
    //                 <div class="signuprowdiv">
    //                     <label htmlFor="confirmpassword" class="col-sm-2 col-form-label signuplabel">Confirm Password:</label>
    //                     <div className='adduserinputpassword'>
    //                     <input 
    //                       type={visible ? 'text':'password'}  
    //                       class="form-control" name='confirmpassword' 
    //                       value={signupdetails.confirmpassword}
    //                       onChange={onchangeUserinput} 
    //                       onPaste={(e)=>{e.preventDefault() 
    //                             return false}}
    //                       onCopy={(e)=>{e.preventDefault()
    //                              return false}}
    //                     />
    //                     {visible==true ?(
    //                     <IconButton className='passwordicon' onClick={()=>onClickeyebtn(false)}>
    //                        <VisibilityIcon />
    //                     </IconButton>
    //                     ):(
    //                     <IconButton className='passwordicon' onClick={()=>onClickeyebtn(true)}>
    //                         <VisibilityOffIcon />
    //                      </IconButton>  
    //                     )}
    //                     </div>
    //                 </div>
    //                     {errors && errors.confirmpassword && 
    //                     <div className='signuperror-message'>{errors.confirmpassword}</div>
    //                     }
    //                 <div  className='d-flex justify-content-center'>
    //                 <Button variant='contained ' className="mainbtn" type='submit'  style={{backgroundColor:'black'}}  onClick={validateForm}>submit</Button>
    //                 </div>
    //                 <NavLink to={'/'} style={{color:'white'}}>Login</NavLink>
    //                 </div>
    //              )}   
    //         </FormControl>
    //         </form>
    //         </div>
    // </div>
  )
}

export default Signup