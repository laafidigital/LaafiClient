import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, IconButton } from '@mui/material'
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
import { GetCheckExistingUsername, GetDepartmentData, GetRegisterdDoctors, GetUser, Getdoctorsonly, PostUpdateDocFees, PosteditDoctorSchedule, SignupData, SignupDataDoctor } from '../../Store/Actions';
import { ToastContainer } from 'react-toastify';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';







const AddDoctor = () => {
 
    const dispatch=useDispatch()
    const formdata=new FormData()

    const departments=useSelector((state)=>state.Adddepartment.departmentArray)
    const doctorschedulesByid=useSelector((state)=>state.Adddoctor.doctors)
    const getdoctors=useSelector((state)=>state.Adddoctor.registerddoctor)
    const Existusername=useSelector((state)=>state.signup.checkusernameExist)
    const postregistersuccess=useSelector((state)=>state.Adddoctor.postdoctorresponse)


    
    
    const[inputData,setinputDate]=useState({Name:'',username:'',regNo:'',Dob:'',Email:'',PhoneNumber:'',Address:'',consultationTime:'',dow:'',from_time:'',to_time:'',Fee:'',DepartmentId:'',password:''})
    const[validateinput,setvalidateinput]=useState({name:'',username:'',email:'',phoneNumber:'',address:'',consultationTime:'',dow:'',from_time:'',to_time:'',fee:'',deptID:''})  
    const[filterdata,setfilterdata]=useState()
    const[showdata,setshowdata]=useState(true)
    const[viewAll,setviewAll]=useState(false)
    const[newdata,setnewdata]=useState(false)
    const[passcontroler,setpasscontroler]=useState(false)
    const[DialogeOpen,setDialogeOpen]=useState(false)
    const[file,setfile]=useState()


    useEffect(()=>{
      dispatch(GetDepartmentData())
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
    },[inputData,passcontroler])


    useEffect(()=>{
      {Existusername ===true ? setvalidateinput({username:'username already existing'}) :setvalidateinput({username:''})}
      if(getdoctors && getdoctors.length>0){
        setfilterdata(getdoctors)
      }
   },[Existusername,getdoctors])


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
        setinputDate((prev)=>({
          ...prev,
          [name]:value
        }))
        if(name==='username'){
          if(value.length<=0){
              setvalidateinput({username:''})
          }
          else if(value.length<4){
              setvalidateinput({username:'minimum 4 character ir required'})
          }
          else{
              setvalidateinput({username:''}) 
              const username=value.trim().includes(" ") ? value.trim().replace(/\s+/g, '_') : value.trim()
              dispatch(GetCheckExistingUsername(username,'Doctor'))
          }
        }
        if(name==='image'){
          setfile(e.target.files[0])
        }
        if(name==='fee' && inputData.id){
          if(value.length > 3 ){
            dispatch(PostUpdateDocFees(inputData.id,value))
          }
        }
        if(name==='userName'){
            const filterinputdata = getdoctors.filter((item) => {
                if (item && item.userName) {
                  return item.userName.toLowerCase().includes(value.toLowerCase());
                }
                return false;
              })
           filterinputdata ? setfilterdata(filterinputdata):setfilterdata([])
          setshowdata(false);
        }
        else if(name==='phoneNumber'){
          const filterinputdata = getdoctors.filter((item) => {
            if (item && item.phoneNumber) {
              return item.phoneNumber.includes(value);
            }
            return false;
          })
          setfilterdata(filterinputdata)
     
         setshowdata(false);
        }
        else{
          setfilterdata(getdoctors)
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
       
        dispatch(PosteditDoctorSchedule(inputData.Id,scheduledata))
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
       setDialogeOpen(true)
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
    <div className='servicemaindiv'>
         <h4 className='headnames'>ADD DOCTORS</h4>
        <div className='d-flex'>
          <ToastContainer/>
           <form  className='addservicemain' onSubmit={onSubmitForm} > 
                <div className='addpatient_sub1'>
                   {!viewAll &&(
                  <div class="d-flex">
                    <label className='doclabel'> Image</label>
                    <div style={{marginLeft:'66px'}}>
                      <input type="file" 
                        class="form-control" 
                        name="image"
                        onChange={handleinputchange}
                        style={{width:'300px'}}
                     />
                    </div>
                  </div>
                   )}
                     <div class="d-flex mt-2">
                        <label className='doclabel'>Select Department</label>
                        <div style={{marginLeft:'26px'}} >
                        <FormControl sx={{ m: 1, width: 400 }}>
                                <StyledSelect
                                  labelId="demo-multiple-checkbox-label"
                                  id="demo-multiple-checkbox"
                                  name='DepartmentId'
                                  value={inputData.DepartmentId}
                                  onChange={handleinputchange}
                                  className='doctorinput'
                                >
                              {departments.map((dep,index)=>(
                                  <MenuItem  value={dep.Id} key={index}>
                                      {dep.Name}
                                  </MenuItem>
                              ))} 
                               </StyledSelect>
                        </FormControl>
                        </div>
                        {viewAll &&(
                        <IconButton style={{color:'white'}} onClick={uparrowClick}>
                          <ArrowUpwardIcon/>
                        </IconButton>
                        )}
                        </div>
                        <div class="d-flex mt-2">
                        <label className='doclabel'> Hospital</label>
                        <div style={{marginLeft:'26px'}}> 
                        <FormControl>
                                <StyledSelect
                                  labelId="demo-multiple-checkbox-label"
                                  id="demo-multiple-checkbox"
                                  name='hospId'
                                  value={inputData.hospId}
                                  onChange={handleinputchange}
                                  className='doctorinput'
                                >
                                  <MenuItem  value='0'>
                                      Laafi
                                  </MenuItem>
                               </StyledSelect>
                        </FormControl>
                        </div>
                        { validateinput.deptID &&<div className='error-message_addpatient'>{validateinput.deptID}</div>}
                        { validateinput.deptID &&<div className='error-message_addpatient'>{validateinput.deptID}</div>}
                     </div>
                    <div class="d-flex mt-1">
                        <label className='doclabel'> Name</label>
                        <div style={{marginLeft:'66px'}}>
                          <input type="text"  class="form-control" name="Name"
                            value={inputData.Name} onChange={handleinputchange}
                            style={{width:'300px'}}
                         />
                        { validateinput.name &&<div className='error-message_addpatient'>{validateinput.name}</div>}
                        </div>
                    </div>
                    {!viewAll &&(
                      <>
                    <div class="d-flex mt-2">
                        <label className='doclabel'>Username</label>
                        <div style={{marginLeft:'66px'}}>
                          <input type="text"  class="form-control" name="username"
                            value={inputData.username} onChange={handleinputchange}
                            style={{width:'300px'}}
                         />
                        { validateinput.username &&<div className='error-message_addpatient'>{validateinput.username}</div>}
                        </div>
                    </div>
                    <div class="d-flex mt-2">
                        <label className='doclabel'>Registration No</label>
                        <div style={{marginLeft:'66px'}}>
                          <input type="text"  class="form-control" name="regNo"
                            value={inputData.regNo} onChange={handleinputchange}
                            style={{width:'300px'}}
                         />
                        </div>
                    </div>
                    <div class="d-flex mt-2">
                    <label className='doclabel'> Dob</label>
                        <div style={{marginLeft:'66px'}}>
                          <input type="date"  class="form-control" name="Dob"
                            value={inputData.Dob} onChange={handleinputchange}
                            style={{width:'300px'}}
                         />
                        </div>
                    </div>
                      </>
                    )}
                    <div class="d-flex mt-2">
                        <label className='doclabel'> Email</label>
                        <div style={{marginLeft:'66px'}}>
                        <input type="text"  class="form-control" name="Email"
                         value={inputData.Email} onChange={handleinputchange}
                         style={{width:'300px'}}
                         />
                        { validateinput.email &&<div className='error-message_addpatient'>{validateinput.email}</div>}
                        </div>
                    </div>
                    <div class="d-flex mt-2">
                        <label className='doclabel'> Phone</label>
                        <div style={{marginLeft:'65px'}}>
                        <input type="number"  class="form-control" name="PhoneNumber"
                         value={inputData.PhoneNumber} onChange={handleinputchange}
                         style={{width:'300px'}}
                         />
                        { validateinput.phoneNumber &&<div className='error-message_addpatient'>{validateinput.phoneNumber}</div>}
                        </div>
                    </div>
                    <div class="d-flex mt-2">
                        <label className='doclabel'> Address</label>
                        <div style={{marginLeft:'65px'}}>
                        <input type="text"  class="form-control" name="Address"
                         value={inputData.Address} onChange={handleinputchange}
                         style={{width:'300px'}}
                         />
                        { validateinput.address &&<div className='error-message_addpatient'>{validateinput.address}</div>}
                        </div>
                    </div>
                    {viewAll &&(
                    <>
                    
                    <div class="d-flex mt-2">
                        <label className='doclabel'>Day</label>
                        <div style={{marginLeft:'26px'}}>
                        <FormControl sx={{ m: 1, width: 300 }} className='dropdown'>
                                <StyledSelect
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                name='dow'
                                value={inputData.dow}
                                onChange={handleinputchange}
                                className='doctorinput'
                                >
                                  <MenuItem value='Monday'>Monday</MenuItem>
                                  <MenuItem value='Tuesday'>Tuesday</MenuItem>
                                  <MenuItem value='Wednesday'> Wednesday</MenuItem>
                                  <MenuItem value='Thursday'>Thursday</MenuItem>
                                  <MenuItem value='Friday'>Friday</MenuItem>
                                  <MenuItem value='Saturday'>Saturday</MenuItem>
                                  <MenuItem value='Sunday'>Sunday</MenuItem>
                               </StyledSelect>
                        </FormControl>
                        { validateinput.dow &&<div className='error-message_addpatient'>{validateinput.dow}</div>}
                        </div>
                    </div>
                    <div className='d-flex'>
                        <label  className='doclabel mt-3'>From Time</label>
                        <div style={{marginLeft:'66px',marginBottom:'10px'}} >
                      <LocalizationProvider dateAdapter={AdapterDayjs} >
                         <DemoContainer components={['TimePicker', 'TimePicker']} >
                         <StyledTimePicker
                              name="from_time"
                              value={inputData.from_time}
                              onChange={(newTime)=>handleTimeChange({newTime,name:'from_time'})}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                        </div>
                        { validateinput.from_time &&<div className='error-message_addpatient'>{validateinput.from_time}</div>}
                    </div>
                    <div className='d-flex'>
                        <label className='doclabel mt-3'> To Time</label>
                        <div style={{marginLeft:'66px',marginBottom:'10px'}}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                         <DemoContainer components={['TimePicker', 'TimePicker']}>
                            <StyledTimePicker
                             name="to_time"
                             value={inputData.to_time}
                             onChange={(newTime)=>handleTimeChange({newTime,name:'to_time'})}
                            />
                        </DemoContainer>
                      </LocalizationProvider>
                        </div>
                        { validateinput.to_time &&<div className='error-message_addpatient'>{validateinput.to_time}</div>}
                    </div>
                    <div class="d-flex mt-2">
                        <label className='doclabel' >Consultation Time</label>
                        <div style={{marginLeft:'66px',marginBottom:'10px',display:'flex'}} >
                        <FormControl sx={{ m: 1, width: 400 }}>
                                <StyledSelect
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                name='consultationTime'
                                value={inputData.consultationTime}
                                onChange={handleinputchange}
                                style={{width:'165px',height:'40px',marginLeft:'2px'}}
                                >
                                  <MenuItem value='15 '>15 min</MenuItem>
                                  <MenuItem value='30 '>30 min</MenuItem>
                                  <MenuItem value='45 '> 45 min</MenuItem>
                                  <MenuItem value='60 '>60 min</MenuItem>
                               </StyledSelect>
                        </FormControl>
                        { validateinput.consultationTime &&<div className='error-message_addpatient'>{validateinput.consultationTime}</div>}
                         <Button variant='contained' endIcon={<AddIcon/>} className='ml-2 mb-3' onClick={AddBtn} style={{backgroundColor:'black'}}>add</Button>
                        </div>
                    </div>
                    </>
                    )}
                    
                    <div class="d-flex mt-2">
                        <label className='doclabel' >Fee</label>
                        <div style={{marginLeft:'66px'}}>
                        <input type="number"  class="form-control" name="Fee"
                         value={inputData.Fee ? inputData.Fee : ''} onChange={handleinputchange}
                         style={{width:'300px'}}
                         />
                        </div>
                    </div>
                        { validateinput.fee &&<div className='error-message_addpatient'>{validateinput.fee}</div>}
                  
                    {!viewAll &&(
                        <div className='d-flex justify-content-center mt-2'>
                            <Button variant='contained' type='submit' onClick={validateForm} style={{backgroundColor:'black'}}>submit</Button>
                        </div>
                    )}

                </div>
            </form>
            <FormControl style={{paddingLeft:'10px',maxHeight: '400px'}}>
            <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <TableContainer component={Paper} className='tablecontainer_main'>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow >
                        <StyledTableCell  align="center">EDIT</StyledTableCell>
                        <StyledTableCell  align="center">DOCTOR NAME</StyledTableCell>
                        <StyledTableCell align="center">PHONE </StyledTableCell>
                        <StyledTableCell align="center">EMAIL</StyledTableCell>
                        <StyledTableCell align="center">SCHEDULES</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {showdata && getdoctors && getdoctors.length>0 ? getdoctors.map((row,index) => (
                        <StyledTableRow key={index}>
                        <StyledTableCell align="center"><IconButton onClick={()=>handleAddIconbtn(row)}><AddIcon color="primary"/></IconButton></StyledTableCell>
                        <StyledTableCell align="center">{row.Name}</StyledTableCell>
                        <StyledTableCell align="center">{row.PhoneNumber}</StyledTableCell>  
                        <StyledTableCell align="center">{row.Email}</StyledTableCell> 
                        <StyledTableCell align="center">
                         <Link
                           style={{ color: row.doctordetails ? 'green' : 'red' }}
                           component="button"
                           variant="body2"
                           onClick={()=>{
                            clickviewSchedule(row.Id)
                          }}
                         >
                           view details
                        </Link>
                        </StyledTableCell> 
                    </StyledTableRow>
                    ))
                     :filterdata && filterdata.map((row,index)=>(
                     <StyledTableRow key={index}>
                     <StyledTableCell align="center"><IconButton onClick={()=>handleAddIconbtn(row)}><AddIcon color="primary"/></IconButton></StyledTableCell>
                     <StyledTableCell align="center">{row.Name}</StyledTableCell>
                     <StyledTableCell align="center">{row.PhoneNumber}</StyledTableCell>
                     <StyledTableCell align="center">{row.Email}</StyledTableCell>  
                      <StyledTableCell align="center">
                         <Link
                           style={{ color: row.doctordetails ? 'green' : 'red' }}
                           component="button"
                           variant="body2"
                           onClick={()=>{clickviewSchedule(row.Id)}}
                         >
                           view details
                        </Link>
                        </StyledTableCell> 
                 </StyledTableRow>
                   ))}
                    </TableBody>
                    </Table>
                    </TableContainer>

            </div>
            </FormControl>

            <Dialog open={DialogeOpen}>
               <DialogContent>
                <div className='docdialoge_div1'>
                  <div className='d-flex'>
                     <h5 className='doddays'>Monday</h5>
                     <div className='docdialoge_div2'> 
                       {doctorschedulesByid.Monday ? (
                         doctorschedulesByid.Monday.split(',').map((time, index) => (
                          <Button key={index} className="green-button">{time.trim()}</Button> 
                         ))
                        ) : (
                          <p> Schedules not assigned</p>
                        )}
                    </div>
                    <div>
                      <IconButton >

                      </IconButton>
                    </div>
                  </div>
                  <div className='d-flex'>
                     <h5 className='doddays'>Tuesday</h5>
                     <div className='docdialoge_div2'>
                     {doctorschedulesByid.Tuesday ? (
                         doctorschedulesByid.Tuesday.split(',').map((time, index) => (
                          <Button key={index} className="green-button">{time.trim()}</Button> 
                         ))
                        ) : (
                          <p> Schedules not assigned</p>
                        )}
                    </div>
                  </div>
                  <div className='d-flex'>
                     <h5 className='doddays'>Wednesday</h5>
                     <div className='docdialoge_div2'>
                        {doctorschedulesByid.Wednesday ? (
                         doctorschedulesByid.Wednesday.split(',').map((time, index) => (
                          <Button key={index} className="green-button">{time.trim()}</Button> 
                         ))
                        ) : (
                          <p> Schedules not assigned</p>
                        )}
                     </div>
                  </div>
                  <div className='d-flex'>
                     <h5 className='doddays'>Thursday</h5>
                     <div className='docdialoge_div2'>
                     {doctorschedulesByid.Thursday ? (
                         doctorschedulesByid.Thursday.split(',').map((time, index) => (
                          <Button key={index} className="green-button">{time.trim()}</Button> 
                         ))
                        ) : (
                          <p> Schedules not assigned</p>
                        )}
                      </div>
                  </div>
                  <div className='d-flex'>
                     <h5 className='doddays'>Friday</h5>
                     <div className='docdialoge_div2'>
                     {doctorschedulesByid.Friday ? (
                         doctorschedulesByid.Friday.split(',').map((time, index) => (
                          <Button key={index} className="green-button">{time.trim()}</Button> 
                         ))
                        ) : (
                          <p> Schedules not assigned</p>
                        )}
                      </div>
                  </div>
                  <div className='d-flex'>
                     <h5 className='doddays'>Saturday</h5>
                     <div className='docdialoge_div2'>
                     {doctorschedulesByid.Saturday ? (
                         doctorschedulesByid.Saturday.split(',').map((time, index) => (
                          <Button key={index} className="green-button">{time.trim()}</Button> 
                         ))
                        ) : (
                       <p> Schedules not assigned</p>
                        )}
                      </div>
                  </div>
                  <div className='d-flex'>
                     <h5 className='doddays'>Sunday</h5>
                     <div className='docdialoge_div2'>
                     {doctorschedulesByid.Sunday ? (
                         doctorschedulesByid.Sunday.split(',').map((time, index) => (
                          <Button key={index} className="green-button">{time.trim()}</Button> 
                         ))
                        ) : (
                      <p> Schedules not assigned</p>
                        )}
                      </div>
                  </div>
                </div>
               </DialogContent>
              <DialogActions>
                <Button variant='outlined' onClick={()=>setDialogeOpen(false)}>CLOSE</Button>
              </DialogActions>
            </Dialog>
            </div>
    </div>
  )
}

export default AddDoctor