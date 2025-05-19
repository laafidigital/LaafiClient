import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, IconButton, Select } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { StyledTableCell,StyledTableRow } from '../../../Styles/Table';
import { StyledSelect } from '../../../Styles/Select';
import { StyledTimePicker } from '../../../Styles/TimePicker';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FormControl } from '@mui/base/FormControl';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import Link from '@mui/material/Link';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from 'react-redux';
import { GetCheckExistingUsername, GetUser, GetdoctorsonlybydepId, PostUpdateDocFees, PosteditDoctorSchedule, SignupData, baseimageUrl } from '../../Store/Actions';
import { GetDepartmentData } from '../../Store/ApiReducers/Auth';
import { ToastContainer } from 'react-toastify';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions } from '@mui/material';
import { FaUserDoctor } from "react-icons/fa6";
import { Schedulebutton } from '../../../Styles/Button';
import EventNoteIcon from '@mui/icons-material/EventNote';
import RegisterDoctor from './RegisterDoctor';
import PendingDocKyc from './PendingDocKyc';
import { setaddscheduleDialoge, setemptydoctorbyname, setscheduleDialoge } from '../../Store/Doctor/AddDoctorSlice';
import ViewSchedules from './ViewSchedules';
import AddSchedule from './AddSchedule';
import KycdetailsParent from '../../DoctorFrame/KycDetails/KycdetailsParent';
import { setkycDoctorId, setparentstatus } from '../../Store/DoctorFrame/KycDetailSlice';
import { Getdoctorbydepid, GetDoctorsByName, GetGenerateaSasToken, GetRegisterdDoctors, SignupDataDoctor } from '../../Store/ApiReducers/Auth';
import { Getdoctorsonly, PostEditDoctorSchedule } from '../../Store/ApiReducers/DoctorSchedules';









const AddDoctor = () => {
 
    const dispatch=useDispatch()
    const formdata=new FormData()
    const sasstoken=localStorage.getItem('sasstoken')


    const departments=useSelector((state)=>state.Adddepartment.departmentArray)
    const doctorschedulesByid=useSelector((state)=>state.Adddoctor.doctors)
    const getdoctors=useSelector((state)=>state.Adddoctor.registerddoctor)
    const Existusername=useSelector((state)=>state.signup.checkusernameExist)
    const postregistersuccess=useSelector((state)=>state.Adddoctor.postdoctorresponse)
    const getdoctorbydepid=useSelector((state)=>state.Adddoctor.doctoronlybyid)
    const getdoctorbyname=useSelector((state)=>state.Adddoctor.doctorbyname)
    const scheduleDialoge=useSelector((state)=>state.Adddoctor.scheduleDialoge)
    const addscheduleDialoge=useSelector((state)=>state.Adddoctor.addscheduleDialoge)
    const Parentstatus=useSelector((state)=>state.KycDetails.parentStatus)
    // const sasstoken=useSelector((state)=>state.logindetails.sastoken)

    const[inputData,setinputDate]=useState({search:'',Name:'',username:'',regNo:'',Dob:'',Email:'',PhoneNumber:'',Address:'',consultationTime:'',dow:'',from_time:'',to_time:'',Fee:'',DepartmentId:10,password:''})
    const[validateinput,setvalidateinput]=useState({name:'',username:'',email:'',phoneNumber:'',address:'',consultationTime:'',dow:'',from_time:'',to_time:'',fee:'',deptID:''})  
    const[filterdata,setfilterdata]=useState()
    const[showdata,setshowdata]=useState(true)
    const[viewAll,setviewAll]=useState(false)
    const[newdata,setnewdata]=useState(false)
    const[passcontroler,setpasscontroler]=useState(false)
    const[file,setfile]=useState()
    const[isShowComponent,setisShowComponent]=useState('adddoctor')
    const[docid,setdocid]=useState()
    const[sassToken,setsassToken]=useState()

    useEffect(()=>{
      dispatch(GetDepartmentData())
      dispatch(Getdoctorbydepid(inputData.DepartmentId))
      dispatch(GetRegisterdDoctors(''))
      if(postregistersuccess){
        dispatch(GetRegisterdDoctors(''))
      }
    },[dispatch,postregistersuccess]) 


    useEffect(()=>{
      if(inputData.Name && inputData.Email && inputData.PhoneNumber && !passcontroler){
        let newPassword=generatePassword()
        setinputDate((prev)=>({...prev,password:newPassword}))
        setpasscontroler(true)
      }
      else if(sasstoken){
        sassCheck()
      }else{
        dispatch(GetGenerateaSasToken(''))
      }
    },[inputData,passcontroler,sasstoken])


    useEffect(()=>{
      {Existusername ===true ? setvalidateinput({username:'username already existing'}) :setvalidateinput({username:''})}
      if(getdoctors && getdoctors.length>0){
        setfilterdata(getdoctors)
      }
      if(!inputData.search){
        dispatch(setemptydoctorbyname())
      }
   },[Existusername,getdoctors,inputData])

   
    const sassCheck=()=>{
      const decodeUriComponentSafe = (str) => {
        try {
          return decodeURIComponent(str);
        } catch (e) {
          console.error('Failed to decode URI component:', e);
          return null;
        }
      };

      const tokenParams = sasstoken.split('&');
      const params = {};

      tokenParams.forEach(param => {
        const [key, value] = param.split('=');
        params[key] = decodeUriComponentSafe(value);
      });

      const expiryTimeStr = params.se;
      if (!expiryTimeStr) {
        console.error('Expiry time not found in SAS token');
        dispatch(GetGenerateaSasToken(''));
        return;
     }

      const expirationDate = new Date(expiryTimeStr);
      const currentTime = new Date();


      const timeDifference = (expirationDate - currentTime) / (1000 * 60); 
   

      if (timeDifference <= 1) { // Updated condition to check for 1 minute or less
   
        dispatch(GetGenerateaSasToken(''));
      } else {
       
        setsassToken(sasstoken);
      }
  }

    const handleAddIconbtn=(row)=>{
      setviewAll(true)
       setinputDate({
        ...row,
        dow:'',
        consultationTime:'',
        from_time:'',
        to_time:''
       })
    }
   

    const handleTimeChange = (newTime) => {
  
      const {name}=newTime
      const value=newTime.newTime
      setinputDate((prevdata)=>({
        ...prevdata,
        [name]:value
      }))
      };


    const handleinputchange=(e)=>{
      const {name,value}=e.target
      setinputDate({[name]:value})
      if(name=='department'){
        dispatch(Getdoctorbydepid(value))
      }else if(name=='search'){
        if(value.length>0){
          dispatch(GetDoctorsByName(value))
        }
        else{
          dispatch(setemptydoctorbyname())
        }
      }
      
      
    }

    const AddBtn=()=>{
      if(inputData.dow && inputData.from_time && inputData.to_time && inputData.consultationTime){
        setpasscontroler(true)

        let fromHours = inputData.from_time.$H;
        let fromMinutes = inputData.from_time.$m;
        let toHours = inputData.to_time.$H;
        let toMinutes = inputData.to_time.$m;

        let fromTime = `${fromHours}:${fromMinutes < 10 ? '0' + fromMinutes : fromMinutes}`;
        let toTime = `${toHours}:${toMinutes < 10 ? '0' + toMinutes : toMinutes}`;

        let times = `${fromTime},${toTime}`;
    

        const scheduledata={
          [inputData.dow]:times,
          TimeWindow:parseInt(inputData.consultationTime)
        }

        dispatch(PostEditDoctorSchedule(inputData.Id,scheduledata))
        setinputDate({Id:inputData.Id,dow:'',from_time:'',to_time:'',consultationTime:''})
      }
    }

    const generatePassword = () => {

      let { Name, Email, PhoneNumber } = inputData;
    
      let capitalLetter = Name.charAt(0).toUpperCase();

      let smallLetter = Name.charAt(1).toLowerCase();
    
      let number =PhoneNumber && PhoneNumber.match(/\d+/)[0];
    
      let symbol = Email.includes('@') ? '@' : '_'; 
    
      let password = `${capitalLetter}${smallLetter}${number}${symbol}`;

      while (password.length < 8) {
        password += 'pass'
      }
      return password;
    };


    const clickviewSchedule=(id)=>{
       dispatch(setscheduleDialoge(true))
       dispatch(Getdoctorsonly(id))
    }

    const uparrowClick=()=>{
      setviewAll(false)
      setinputDate({Name:'',username:'',regNo:'',Dob:'',Email:'',PhoneNumber:'',Address:'',consultationTime:'',dow:'',from_time:'',to_time:'',Fee:'',DepartmentId:'',password:''})
    }

  
    const validateForm=()=>{
      if(!inputData.Name){
        setvalidateinput({name:'doctor name is require'})
      }
      else if(!inputData.Email){
        setvalidateinput({email:'email is required'})
      }
      else if(!inputData.PhoneNumber){
        setvalidateinput({phoneNumber:'phone number is required'})
      }
      else if(!inputData.Address){
        setvalidateinput({address:'address is required'})
      }
      // else if(!inputData.dow){
      //   setvalidateinput({dow:'day  is required'})
      // }    
      // else if(!inputData.from_time){
      //   setvalidateinput({from_time:'from time is required'})
      // }
      // else if(!inputData.to_time){
      //   setvalidateinput({to_time:'to time is required'})
      // }
      // else if(!inputData.consultationTime){
      //   setvalidateinput({consultationTime:'consultation time is required'})
      // }
      else if(!inputData.Fee){
        setvalidateinput({fee:'fee is required'})
      }
      else if(!inputData.deptID){
        setvalidateinput({deptID:'department is required'})
      }
      else{
        setvalidateinput({name:'',email:'',phoneNumber:'',address:'',consultationTime:'',dow:'',from_time:'',to_time:'',fee:'',deptID:''})
      }
    }

    const onSubmitForm=(e)=>{
        e.preventDefault()
        setshowdata(true)
        if(inputData.dow && inputData.from_time && inputData.to_time && inputData.consultationTime){
          AddBtn()
        }
            if (!viewAll) {
              formdata.append('UserName',inputData.username.trim().includes(" ") ? inputData.username.trim().replace(/\s+/g, '_') : inputData.username.trim())
              formdata.append('Name',inputData.Name)
              formdata.append('Email',inputData.Email)
              formdata.append('Password',inputData.password)
              formdata.append('PhoneNumber',inputData.PhoneNumber)
              formdata.append('Address',inputData.Address)
              formdata.append('Dob',inputData.Dob)
              formdata.append('Pic',file)
              formdata.append('DepartmentId',inputData.DepartmentId)
              formdata.append('Fee',parseInt(inputData.Fee))
              formdata.append('HospitalId',inputData.hospId)
              formdata.append('RegNo',inputData.regNo)
                dispatch(SignupDataDoctor(formdata))
                setnewdata(false)
                setinputDate({Name:'',username:'',regNo:'',Dob:'',Email:'',PhoneNumber:'',Address:'',consultationTime:'',dow:'',from_time:'',to_time:'',Fee:'',DepartmentId:'',password:''})
                setpasscontroler(false)
                setfile()
              } 
              else {
   
              } 
    }
   
  return (
    <div  className='adddocmain'>
        <div>
          <div className='adddoc_search_main'>
            <div className='d-flex justify-content-around'>
              {isShowComponent=='registerdoc' ?(
              <>
              <div className='adddoc_search_div'>
                <Button variant='contained' onClick={()=>setisShowComponent('adddoctor')}>Back</Button>
                <Button variant='contained' className='ml-5' onClick={()=>setisShowComponent('kycpending')}>kyc pending</Button>
              </div>
              </>
              ):isShowComponent=='kycpending' ?(
                <div className='adddoc_search_div'>
                <Button variant='contained' onClick={()=>setisShowComponent('adddoctor')}>Back</Button>
                <Button variant='contained' className='ml-5' onClick={()=>setisShowComponent('registerdoc')}>Add doctor</Button>
              </div>
              ):(
                <>
                <div className='adddoc_search_div'>
                <label>Department:</label>
                <Select
                style={{height:'38px',width:'200px'}}
                name='department'
                onChange={handleinputchange}
                >
                  {departments.map((dep,index)=>(
                      <MenuItem  value={dep.Id} key={index}>
                          {dep.Name}
                      </MenuItem>
                    ))} 
                </Select>
              </div>
              <div className='adddoc_search_div'>
                <div class="input-group1 d-flex mr-3">
                    <div class="form-outline avalabledoc_input">
                        <input type="search" id="form1" class="form-control avalabledoc_input" placeholder='Search' name='search' onChange={handleinputchange}/>
                    </div>
                    <Button startIcon={<SearchIcon/>} variant='contained'></Button>
                </div>
              </div>
              <div className='adddoc_search_div'>
                  <Button variant='contained' onClick={()=>setisShowComponent('registerdoc')}>Add doctor</Button>
                  <Button variant='contained' className='ml-2' onClick={()=>setisShowComponent('kycpending')}>kyc pending</Button>
              </div>
                </>
              )}
              
            </div>
          </div>
          <hr></hr>
          <div className='adddoccard_div_mainmain'>
          {isShowComponent == 'registerdoc' ? (
    <RegisterDoctor setisShowComponent={setisShowComponent} />
) : isShowComponent == 'kycpending' ? (
    <PendingDocKyc />
) : (
              <div className='card_divmain'>
                {(getdoctorbyname && getdoctorbyname.length > 0 ? getdoctorbyname : getdoctorbydepid).map((item)=>(
                <Card sx={{ maxWidth: 345 ,minWidth:345,margin:5}}>
                <CardActionArea style={{backgroundColor:'#9de3c9'}}>
                  <div className='d-flex justify-content-between'>
                    <div className='pl-3 pt-3'>
                      <h5> Name:{item.Name}</h5>
                      <h5> Phone:{item.PhoneNumber}</h5>
                    </div>
                    <div className='pt-3 pr-3'>
                      {item.ProfilePic ?(
                        <>
                        <img src={`${item.ProfilePic}?${sassToken}`} className='adddocimage'/>
                      </>
                      ):(
                      <IconButton style={{backgroundColor:'white'}}>
                        <FaUserDoctor/>
                      </IconButton>
                      )}
                    </div>
                  </div>
                </CardActionArea>
                <CardActions>
                  <div>
                    {item.KycStatus=='Completed' &&(
                      <Button size="small"
                        color='secondary' 
                        variant='contained' 
                        onClick={()=>{
                          dispatch(setaddscheduleDialoge(true))
                          setdocid(item.Id)
                        }}>
                        add schedule
                      </Button>
                    )}
                  {item.KycStatus=='Pending' ?(
                    <Schedulebutton size="small" className='ml-3'>pending</Schedulebutton>
                  ):(
                  <Button size="small" color={item.KycStatus=='Unverified'||item.KycStatus=='Rejected' ? 'error' : 'success'} 
                   variant='contained' 
                   className='ml-3'
                   onClick={() => {
                      dispatch(setkycDoctorId(item.Id));
                      dispatch(setparentstatus(true));
                   }}
                   >
                    {item.KycStatus=='Completed' ? 'kyc completed':item.KycStatus==='Rejected' ? 'Rejected':'Unverified'}
                  </Button>
                  )}
                  {item.KycStatus=='Completed' &&(
                    <IconButton style={{color:'black'}} onClick={()=>clickviewSchedule(item.Id)}>
                      <EventNoteIcon/>
                    </IconButton>
                  )}
                  </div>
                </CardActions>
                </Card>
                  )
                  )}
              </div>
            )}
          </div>
        </div>
        {scheduleDialoge &&(
          <ViewSchedules data={doctorschedulesByid}/>
        )}
        {addscheduleDialoge &&(
          <AddSchedule data={docid}/>
        )}
        {Parentstatus &&(
          <KycdetailsParent/>
        )}
    </div>
  )
}

export default AddDoctor