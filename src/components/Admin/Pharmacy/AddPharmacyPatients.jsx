
import React, { useState ,useEffect} from 'react'
import { FormControl } from '@mui/base/FormControl';
import { StyledSelect } from '../../../Styles/Select';
import Select from '@mui/material/Select';
import { IconButton, Typography } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useSelector } from 'react-redux';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import AddIcon from '@mui/icons-material/Add';
import { StyledTableCell,StyledTableRow } from '../../../Styles/Table';
import { useDispatch } from 'react-redux';
import { GetConsultation, PostConsultation, SignupData } from '../../Store/Actions';
import { GetDepartmentData } from '../../Store/ApiReducers/Auth';
import { ToastContainer } from 'react-toastify';
import { RegisterHospitalUser } from '../../Store/ApiReducers/Auth';
import { GetDocShecduleById, GetdoctorsonlybydepId } from '../../Store/ApiReducers/DoctorSchedules';



const AddPharmacyPatients = () => {

    const dispatch=useDispatch()
//api
    const consultation=useSelector((state)=>state.Addpatentdetails.consultation)
    const postconsultationResult=useSelector((state)=>state.Addpatentdetails.consultationPostResult)
    const getusers=useSelector(state=>state.Assignrole.userresult)
    const postresult=useSelector((state)=>state.signup.signupresult)
    const getdepartment=useSelector((state)=>state.Adddepartment.departmentArray)
    const getdoctorById=useSelector((state)=>state.Adddoctor.doctorsById)
    const doctorschedules=useSelector((state)=>state.Adddoctor.doctorSchedulebyId)

    const currentDateTime = new Date().toLocaleString();
 
   
    const labdetails=useSelector(state=>state.Addservices.addServicesArray)
    const departmentdoctor=useSelector((state)=>state.Adddoctor.doctorArray)
  
//floordata


    const [inputvalues,setinputvalue]=useState({mrn:'',userName:'',phoneNumber:'',deptID:'',email:'',address:'',relation:'myself',allergy:'',docID:'',})
    const [error,seterror]=useState()
    const [signupStatus,setsignupStatus]=useState(false)
  


  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;



// states of room selection
  const [open, setOpen] = React.useState(false);
  const [filterview,setfilterview]=useState(false)
  const [displayAllData, setDisplayAllData] = useState(false);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [filteddcotor,setfilterddoctor]=useState(null)
  const [filterservices,setfilterservices]=useState(null)
  const [selecteddoctor,setselecteddoctor]=useState(null)
  const [selectfilterdoctor,setselectfilterdoctor]=useState(null)
  const [doccalender,setdoccalender]=useState(false)
  const [isSecondDialogOpen, setIsSecondDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const[isValueSet, setIsValueSet] = useState(false); 

//doctorschedule states

  const[TimeDialogue,setTimeDialogue]=useState(null)
  const [timeanddate,settimeanddate]=useState({docdate:'',doctime:''})
 
 
 useEffect(()=>{
  dispatch(GetDepartmentData())
  dispatch(GetConsultation())
  if(postresult.length>0){
    setDisplayAllData(true)
  }
  if(postconsultationResult.length>0){
    dispatch(GetConsultation())
  }
 },[postresult,postconsultationResult])

 useEffect(()=>{
  if(inputvalues && inputvalues.phoneNumber && !isValueSet) {
    const filteruserId = getusers.filter((item) => item.phoneNumber === inputvalues.phoneNumber);


    if(filteruserId.length > 0) {
      setinputvalue((prev) => ({
          ...prev,
          mrn: filteruserId[0].id
        }));
        setIsValueSet(true);
      }
  }

  if(inputvalues.userName && inputvalues.email && inputvalues.phoneNumber && !inputvalues.password) {
    let newPassword = generatePassword();
    setinputvalue((prev) => ({ ...prev, password: newPassword }));
  }

 },[inputvalues,getusers])


 const handleinputchange=(e)=>{
  const {name,value}=e.target

  if(selectedRow){
    if(name==='deptID'){
      dispatch(GetdoctorsonlybydepId(value))
      setSelectedRow((prev)=>({
        ...prev,
      [name]:value
      }))
    }
    if(name==='docID'){
      dispatch(GetDocShecduleById(value))
      const docdetails=getdoctorById.filter((item)=>item.docID===value)
      setdoccalender(true)
      setSelectedRow((prev)=>({
        ...prev,
      [name]:value,
      }))
      if(docdetails){
        setSelectedRow((prev)=>({
          ...prev,
          price:docdetails[0].fee
        }))
      }
    }
    setSelectedRow((prev)=>({
      ...prev,
    [name]:value
    }))

  }
  else{
   setinputvalue((prevData)=>({
     ...prevData,
     [name]:value
   }))
    if(name==='mrn'){
     const filterbyphone=getusers.filter((item)=>{
       if(item && item.phoneNumber){
       return(
         item.phoneNumber.includes(value)
       )
       }
     })
     setFilteredData(filterbyphone)
     setfilterview(true)
    }
    if(name==='userName'){
       const filtered = getusers.filter((item) =>
       item.userName.toLowerCase().includes(value.toLowerCase())
     );
     setFilteredData(filtered);
     setDisplayAllData(false);
     setfilterview(true)
     }
   //  if(name==='number'){
   //     const filternumber=inputArray.filter((item)=>item.number.includes(value))
   //     setFilteredData(filternumber)
   //     setDisplayAllData(false)
   //   }
   
    if(name==='deptID'){
      dispatch(GetdoctorsonlybydepId(value))

    }
    if(name==='docID'){
      dispatch(GetDocShecduleById(value))
      const docdetails=getdoctorById.filter((item)=>item.docID===value)
      setinputvalue((prev)=>({
        ...prev,
        price:docdetails[0].fee
      }))
      setdoccalender(true)
    }

  }

 }

 
 const generatePassword = () => {

  let { userName, email, phoneNumber } = inputvalues;

  let capitalLetter = userName.charAt(0).toUpperCase();

  let smallLetter = userName.charAt(1).toLowerCase();

  let number = phoneNumber.match(/\d+/)[0];

  let symbol = email.includes('@') ? '@' : '_'; 

  let password = `${capitalLetter}${smallLetter}${number}${symbol}`;

  while (password.length < 8) {
    password += 'pass'
  }
  return password;
};  


const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

const handleDateChange = (date) => {
  const selectedDate = new Date(date);
  const year = selectedDate.getFullYear();
  const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); 
  const day = String(selectedDate.getDate()).padStart(2, '0');
  const formattedselectedDate = `${year}-${month}-${day}`;


  if(selectedRow){
      setSelectedRow((prev)=>({
     ...prev,
      consultationDate:formattedselectedDate
  }))
     setIsSecondDialogOpen(true)
  }
  else{
        setinputvalue((prev)=>({
         ...prev,
         consultationDate:formattedselectedDate
   }))
        setIsSecondDialogOpen(true)
   }
};


const onClickTime=(time)=>{
  if(selectedRow){
    setSelectedRow((prev)=>({
      ...prev,
      consultTime:time
    }))
  }
  else{
    setinputvalue((prev)=>({
      ...prev,
      consultTime:time
    }))
  }
  handleCloseSecondDialog()
}

const handleCloseSecondDialog = () => {
  setIsSecondDialogOpen(false);
  setdoccalender(false)

};

const handleCloseDialog = () => {
  setdoccalender(false);
};

const handleSendIconClick=(row,index)=>{
  setDisplayAllData(true)
  setSelectedRow({
   mrn:row.id,
   userName:row.userName,
   phoneNumber:row.phoneNumber,
   email:row.email,
   address:row.address,
   allergy:null,
   relation:row.relation,
   type:'out_patient'
  });
  setsignupStatus(true)
}

const validateForm=()=>{

  const errors={userName:'',email:'',address:'',phoneNumber:'',deptID:'',age:'',docID:''}

  if(selectedRow){
   errors.userName = '';
   errors.email = '';
   errors.address = '';
   errors.phoneNumber = '';
   if(!selectedRow.age) {
     errors.age = 'Age is required';
   }
   if(!selectedRow.docID){
    errors.docID='Select Doctor'
   }
   seterror(errors)
 }
 else{
   if (!inputvalues.userName) {
     errors.userName='Name Is Required'
   }
   if (!inputvalues.email) {
     errors.email='Email Is Required'
   }
   else if (!/^\S+@\S+\.\S+$/.test(inputvalues.email)) {
     errors.email='Invalid Email'
     }
   if (!inputvalues.phoneNumber) {
     errors.phoneNumber='Phone Number Is Required'
   }
   else if (inputvalues.phoneNumber.length !== 10) {
     errors.phoneNumber='Invalid Phone Number'
   }
   if(!inputvalues.address){
     errors.address='Address is required'
   }
   if(!inputvalues.age){
     errors.age='age is required'
   }
   if(!inputvalues.docID ){
     errors.docID='Select Doctor'
   }
   seterror(errors);
 }


  // Return true if there are no errors
  return Object.keys(errors).length === 0;
}


const submitForm=(e)=>{
  e.preventDefault()
  const requiredSignupFields = ['phoneNumber', 'email', 'userName','address'];
  const emptyAllRequired=requiredSignupFields.every(field => error[field] === '');
  const allErrorsEmpty = Object.values(error).every(error => error === "");


  
  if(emptyAllRequired && !signupStatus){
    const updatedsignupdata={
      userName:inputvalues.userName,
      email:inputvalues.email,
      password:inputvalues.password,
      phoneNumber:inputvalues.phoneNumber,
      address:inputvalues.address,
      relation:inputvalues.relation,
    }
    dispatch(RegisterHospitalUser(updatedsignupdata))
    setsignupStatus(true)
  }
  else if(allErrorsEmpty && selectedRow && signupStatus){
    const updatedSelectdData={
      mrn:selectedRow.mrn,
      docID:selectedRow.docID ? selectedRow.docID:null,
      deptID:selectedRow.deptID ? selectedRow.deptID:null,
      relation:selectedRow.relation,
      gender:selectedRow.gender,
      age:selectedRow.age,
      allergy:selectedRow.allergy ? selectedRow.allergy:null,
      consultationDate:selectedRow.consultationDate==null?formattedDate:selectedRow.consultationDate,
      consultTime:selectedRow.consultTime ? selectedRow.consultTime:null,
      services:selectedRow.formattedservices ? selectedRow.formattedservices:null,
      packages:selectedRow.formattedpackages ? selectedRow.formattedpackages:null,
      roomNo:selectedRow.roomno ? selectedRow.roomno:null,
      bedNo:selectedRow.bedno ? selectedRow.bedno :null,
      patientType:selectedRow.type
    }
 
    dispatch(PostConsultation(updatedSelectdData))
    setsignupStatus(false)
    setDisplayAllData(false)
    setSelectedRow(null)

  }
  else if(allErrorsEmpty && signupStatus){
    const updatedConsultationData={
      mrn:inputvalues.mrn,
      docID:inputvalues.docID ? inputvalues.docID:null ,
      deptID:inputvalues.deptID ? inputvalues.deptID:null,
      relation:inputvalues.relation,
      gender:inputvalues.gender,
      age:inputvalues.age,
      allergy:inputvalues.allergy ? inputvalues.allergy:null,
      consultationDate:inputvalues.consultationDate==null?formattedDate:inputvalues.consultationDate,
      consultTime:inputvalues.consultTime ? inputvalues.consultTime:null ,
      services:inputvalues.formattedservices ? inputvalues.formattedservices:null,
      packages:inputvalues.formattedpackages ? inputvalues.formattedpackages:null,
      roomNo:inputvalues.roomno ? inputvalues.roomno:null,
      bedNo:inputvalues.bedno ? inputvalues.bedno:null,
      patientType:inputvalues.type
    }
  
    dispatch(PostConsultation(updatedConsultationData))
    setsignupStatus(false)
    setDisplayAllData(false)
    setinputvalue({mrn:'',userName:'',phoneNumber:'',deptID:'',email:'',address:'',relation:'myself',allergy:'',docID:'',})
  }
 
 
}

return (
    <div className='pharmacyaddpatient_main'>
        <h4 className='headnames'>ADD PATIENTS</h4>
        <ToastContainer/>
        <div className='d-flex'>
         <form onSubmit={submitForm}> 
            <FormControl >
                <div className='addpatient_sub1'>
          
                  <div class="mb-3 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">MRN</label>
                        <div class="col-sm-10">
                        <input type="text" readonly class="form-control" name="mrn" value={selectedRow ? selectedRow.mrn:inputvalues.mrn} onChange={handleinputchange}/>
                        </div>
                        {/* {error && error.name &&(<div className='error-message_addpatient'>{error.name}</div>)} */}
                    </div>
                  
                    {/* <div className='d-flex'>
                        <div className='error-message_addpatient'>{errors.MRN}</div>
                        <div className='error-message_addpatient'>{errors.token}</div>
                    </div> */}
                    <div class="mb-3 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                        <input type="text" readonly class="form-control" name="userName" value={selectedRow ? selectedRow.userName:inputvalues.userName} onChange={handleinputchange}/>
                        </div>
                        {error && error.userName &&(<div className='error-message_addpatient'>{error.userName}</div>)}
                    </div>
                    <div class="mb-3 row d-flex">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Phone</label>
                        <div class="col-sm-10">
                        <input type="number" class="form-control" name='phoneNumber' value={selectedRow ? selectedRow.phoneNumber:inputvalues.phoneNumber} onChange={handleinputchange} />
                        </div>
                        {error && error.phoneNumber &&(<div className='error-message_addpatient'>{error.phoneNumber}</div>)}

                    </div>
                    {/* <div class="mb-3 row d-flex">
                        <label for="inputPassword" class="col-sm-2 col-form-label">OTP</label>
                        <div className="col-sm-10 d-flex">
                        <input type="number" class="form-control" style={{width:'300px'}} name='otp' value={inputvalues.otp} onChange={handleinputchange} />
                        <Button variant="contained" className='ml-1' >send</Button>
                        </div>
                        {error && error.otp &&(<div className='error-message_addpatient'>{error.otp}</div>)}
                    </div> */}
                    <div class="mb-3  d-flex" style={{marginLeft:'-33px'}}>
                        <label for="inputPassword" class="col-sm-2 col-form-label">Relation</label>
                        <FormControl sx={{ m: 1, width: 400 }}>
                                <StyledSelect
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                name='relation'
                                value={selectedRow ? selectedRow.relation:inputvalues.relation}
                                onChange={handleinputchange}  
                                className="relationfeild"
                                >
                                  <MenuItem value="myself">Myself</MenuItem>
                                  <MenuItem value="father">Father</MenuItem>
                                  <MenuItem value="mother">Mother</MenuItem>
                                  <MenuItem value="son">Son</MenuItem>
                                  <MenuItem value="daugter">daugter</MenuItem>
                                  <MenuItem value="grandfather">grandfather</MenuItem>
                                  <MenuItem value="grandmother">grandmother</MenuItem>
                                  <MenuItem value="others">others</MenuItem>
                               </StyledSelect>
                               </FormControl>
                               {displayAllData &&(
                                <>
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Department</label>
                                    <FormControl sx={{ m: 1, width: 400 }}>
                                          <StyledSelect
                                          labelId="demo-multiple-checkbox-label"
                                          id="demo-multiple-checkbox"
                                          name='deptID'
                                          value={selectedRow?selectedRow.deptID:inputvalues.deptID}
                                          onChange={handleinputchange}
                                          className="departmentfeild "
                                          >
                                        {getdepartment.map((dep,index)=>(
                                            <MenuItem  value={dep.id} key={index} className='menuitemfeild'>
                                                {dep.name}
                                            </MenuItem>
                                        ))} 
                                        </StyledSelect>
                                  </FormControl>
                                </>
                               )}
                    </div>
                    <div className='d-flex justify-content-around'>
                    {error && error.relation &&(<div className='error-message_addpatient'>{error.relation}</div>)}
                    {error && error.deptID &&(<div className='error-message_addpatient'>{error.deptID}</div>)}
                    </div>
                    <div class="mb-3 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                        <input type="Email" readonly class="form-control" name='email' value={selectedRow ? selectedRow.email:inputvalues.email} onChange={handleinputchange} />
                        </div>
                        {error && error.email &&(<div className='error-message_addpatient'>{error.email}</div>)}

                    </div>
                    <div class="mb-3 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Address</label>
                        <div class="col-sm-10">
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="1" name='address' value={selectedRow ? selectedRow.address:inputvalues.address} onChange={handleinputchange}></textarea>
                        </div>
                        {error && error.address &&(<div className='error-message_addpatient'>{error.address}</div>)}
                    </div>
                    {displayAllData &&(
                      <>
                    <div className='d-flex justify-content-around ' style={{marginLeft:'70px'}}>
                         <select class="form-select form-select-lg mb-3" aria-label="Default select example" style={{borderRadius:'5px',border:'none'}} name='gender' value={selectedRow ? selectedRow.gender:inputvalues.gender} onChange={handleinputchange} placeholder='gender'>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                        </select>
                        <div>
                        <div class="mb-3 d-flex">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Age</label>
                            <div style={{width:'100px',paddingLeft:'20px'}}>
                            <input type="number" readonly class="form-control" id="staticEmail" name='age' value={selectedRow ? selectedRow.age:inputvalues.age} onChange={handleinputchange}/>
                            </div>
                         </div>
                        </div>
                        {/* <select class="form-select form-select-lg mb-3" aria-label="Default select example" style={{borderRadius:'5px',border:'none'}} name='type' value={selectedRow ? selectedRow.type:inputfeilddata.type} onChange={handleinputchange}>
                            <option value="out_patient">Out_patient</option>
                            <option value="in_patient">In-patient</option>
                        </select> */}
                    </div>
                    <div className='d-flex'  >
                        {error && error.gender &&(<div className='error-message_addpatient'>{error.gender}</div>)}
                        {error && error.age &&(<div className='error-message_addpatient'>{error.age}</div>)}
                        {/* <div className='error-message'  style={{width:'20px',marginLeft:'100px'}}>{errors.type}</div> */}
                    </div>
                    <div class="mb-3 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Allergy</label>
                        <div class="col-sm-10">
                        <input type="text" readonly class="form-control" name='allergy' value={selectedRow ? selectedRow.allergy:inputvalues.allergy} onChange={handleinputchange} />
                        </div>
                        {/* <div className='error-message_addpatient'>{errors.address}</div> */}
                    </div>
                    <div class="mb-3 d-flex">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Doctor</label>
                        <FormControl sx={{ m: 1, width: 400 }}>
                                <StyledSelect
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                name='docID'
                                value={selectedRow ? selectedRow.docID:inputvalues.docID}
                                onChange={handleinputchange} 
                                style={{width:'300px',marginLeft:'5px',height:'40px'}}
                                >
                                  {getdoctorById !== null
                                    ? getdoctorById.map((doctor, index) => (
                                        <MenuItem value={doctor.docID} key={index}>
                                          {doctor.docName}
                                        </MenuItem>
                                      ))
                                    : <div>Select The Department First</div>
                                    // departmentdoctor.map((doc, index) => (
                                    //     <MenuItem value={doc.doctor_name} key={index}>
                                    //       {doc.doctor_name}
                                    //     </MenuItem>
                                    //   ))
                                      }
                               </StyledSelect>
                        </FormControl>
                    </div> 
                    {error && error.doctor &&(<div className='error-message_addpatient'>{error.doctor}</div>)}
                    {/* <div className='d-flex mb-3'>
                       <label for="staticEmail" class="col-sm-2 col-form-label">Services</label>
                       <FormControl sx={{ m: 1, width: 400 }}>
                               <StyledSelect
                               labelId="demo-multiple-checkbox-label"
                               id="demo-multiple-checkbox"
                               name='services'
                               value={inputvalues.services}
                               onChange={handleinputchange}
                               multiple
                               renderValue={(selected) => selected.join(', ')}
                               style={{width:'300px',marginLeft:'5px',height:'40px'}}
                               MenuProps={{
                                 PaperProps: {
                                     style: {
                                         maxHeight: '200px', // Set the maximum height of the menu
                                     },
                                 },
                             }}
                               >
                               {filterservices!==null
                               ?
                               filterservices.map((name,index) => (
                                   <MenuItem key={index} value={name.servicename} className='menuitems'>
                                   <Checkbox 
                                   checked={inputfeilddata.services.indexOf(name.servicename) > -1} 
                                   />
                                   <ListItemText primary={name.servicename} />
                                   </MenuItem>
                               ))
                               :labdetails.map((name,index) => (
                                 <MenuItem key={index} value={name.servicename} className='menuitems'>
                                 <Checkbox 
                                 checked={inputfeilddata.services.indexOf(name.servicename) > -1} 
                                 />
                                 <ListItemText primary={name.servicename} />
                                 </MenuItem>
                             ))}
                               </StyledSelect>
                       </FormControl>
                       <IconButton onClick={handleClickOpen}><EditIcon/></IconButton>
                   </div>  */}
                       {/* <div className='error-message_addpatient'>{errors.services}</div> */}
                       <div className='d-flex' style={{marginRight:'50px'}}>
                           <label for="staticEmail" class="col-sm-2 col-form-label mr-3"> Amount</label>
                           <CurrencyRupeeIcon style={{height:'20px',marginTop:'10px'}}/>
                           <div  style={{width:'150px'}}>
                           <input type="number" readonly class="form-control" id="staticEmail" style={{width:'140px'}} name='price' value={selectedRow?selectedRow.price:inputvalues.price}  onChange={handleinputchange}/>
                           </div>
                          
                       </div> 
                           {/* <div className='error-message_addpatient'>{errors.amount}</div> */}
                      </>
                    )}
                    <div className='d-flex justify-content-end'> 
                      <Button variant="contained"  type='submit' onClick={validateForm} style={{backgroundColor:'black'}} >submit</Button>
                    </div>
                </div>
            </FormControl>
            </form>
            <FormControl style={{paddingLeft:'10px'}}>

            <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <TableContainer component={Paper} className='tablecontainer_main'>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">ACTIONS</StyledTableCell>
                        <StyledTableCell align="center">NAME</StyledTableCell>
                        <StyledTableCell align="center">PHONE</StyledTableCell>
                        <StyledTableCell align="center">ADDRESS</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {filterview
                        ? filteredData.map((row, index) => (
                            <StyledTableRow key={index}>
                              <StyledTableCell align="center" className="d-flex">
                                <IconButton onClick={() => handleSendIconClick(row,index)}>
                                  <AddIcon color="primary" />
                                </IconButton>
                              </StyledTableCell>
                              <StyledTableCell align="center">{row.userName}</StyledTableCell>
                              <StyledTableCell align="center">{row.phoneNumber}</StyledTableCell>
                              <StyledTableCell align="center">{row.address}</StyledTableCell>
                            </StyledTableRow>
                          ))
                        : getusers.map((row, index) => (
                            <StyledTableRow key={index}>
                              <StyledTableCell align="center" className="d-flex">
                                <IconButton onClick={() => handleSendIconClick(row,index)}>
                                  <AddIcon color="primary" />
                                </IconButton>
                              </StyledTableCell>
                              <StyledTableCell align="center">{row.userName}</StyledTableCell>
                              <StyledTableCell align="center">{row.phoneNumber}</StyledTableCell>
                              <StyledTableCell align="center">{row.address}</StyledTableCell>
                            </StyledTableRow>
                          ))}
                    </TableBody>
                    </Table>
                    </TableContainer>
     
                        <div className='d-flex'>
                        <Dialog open={doccalender} onClose={handleCloseDialog}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <StaticDatePicker
                              orientation="landscape"
                              disablePast
                              value={selectedDate} // Set the selected date
                              onChange={handleDateChange} // Handle date changes
                            />
                        </LocalizationProvider>
                        </Dialog>

                        { doctorschedules && doctorschedules.consultTiming &&(
                        <Dialog open={isSecondDialogOpen} onClose={handleCloseSecondDialog}>
                          <DialogTitle style={{ color: 'black', fontFamily: 'times new roman' }}> Select Your Time</DialogTitle>
                          <DialogContent>
                          <div className='d-flex justify-content-between'>
                                {doctorschedules.consultTiming.split(',').map((formattedHour, index) => {
                              
                                  if(selectedRow && selectedRow.docID){
                                    const consultedocfilter=consultation.filter((item)=>item.docID===selectedRow.docID)
                                    const isTimeBooked = consultedocfilter.some((item) => 
                                        item.consultTime === formattedHour && 
                                        item.consultationDate.split('T')[0] === selectedRow.consultationDate
                                      );
                             
                                    return(
                                      <Button
                                      key={index}
                                      variant='rounded'
                                      style={{
                                        backgroundColor: isTimeBooked ? 'red' : 'green',
                                        marginLeft: '10px',
                                        color: 'white',
                                        marginTop: '4px',
                                        cursor: isTimeBooked ? 'not-allowed' : 'pointer',
                                      }}
                                      disabled={isTimeBooked}
                                      onClick={() => {
                                        onClickTime(formattedHour);
                                      }}
                                    >
                                      {formattedHour.trim()}
                                    </Button>
                                    )
                                  }
                                  else {
                                    const consultedocfilter=consultation.filter((item)=>item.docID?item.docID:null===inputvalues.docID?inputvalues.docID:null)
                                    const isTimeBooked = consultedocfilter.some((item) => 
                                        item.consultTime === formattedHour && 
                                        item.consultationDate.split('T')[0] === inputvalues.consultationDate
                                      );
                                   
                                    return(
                                      <Button
                                      key={index}
                                      variant='rounded'
                                      style={{
                                        backgroundColor: isTimeBooked ? 'red' : 'green',
                                        marginLeft: '10px',
                                        color: 'white',
                                        marginTop: '4px',
                                        cursor: isTimeBooked  ?  'not-allowed' : 'pointer',
                                      }}
                                      disabled={isTimeBooked }
                                      onClick={() => {
                                        onClickTime(formattedHour);
                                      }}
                                    >
                                      {formattedHour.trim()}
                                    </Button>
                                    )}
                                })}
                              </div>
                          </DialogContent>
                        </Dialog>
                      )} 
                  </div>
            </div>
            </FormControl>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title" color={'inherit'} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  Lab Services
                  <div>{currentDateTime}</div>
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">

          <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Services</StyledTableCell>
                            <StyledTableCell align="center">Price</StyledTableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {/* {inputArray.length > 0 && (
            <StyledTableRow>
              <StyledTableCell align="center">
                {inputArray[inputArray.length - 1].services.map((service, serviceIndex) => (
                  <div key={serviceIndex}>{service}</div>
                ))}
              </StyledTableCell>
              <StyledTableCell align="center">
                {inputArray[inputArray.length - 1].services.map((service, serviceIndex) => {
                  const serviceData = labdetails.find(item => item.servicename === service);
                  const servicePrice = serviceData ? parseFloat(serviceData.price) : 0;
                  return <div key={serviceIndex}>{servicePrice.toFixed(2)}</div>;
                })}
              </StyledTableCell>
            </StyledTableRow>
          )} */}
                    </TableBody>
                </Table>
            </TableContainer>
            {selectfilterdoctor && selectfilterdoctor.length > 0 && (
             <TableContainer component={Paper}>
             <Table sx={{ minWidth: 500 }} aria-label="customized table">
                 <TableHead>
                     <TableRow>
                         <StyledTableCell align="center">Doctor</StyledTableCell>
                         <StyledTableCell align="center">Price</StyledTableCell>
                         
                     </TableRow>
                 </TableHead>
                 <TableBody>
         <StyledTableRow>
         {selectfilterdoctor.map((value) => (
                      <React.Fragment key={value.fee}>
                        {/* <StyledTableCell>Doctor</StyledTableCell> */}
                        <StyledTableCell align="center">{value.doctor_name}</StyledTableCell>
                        <StyledTableCell align="center">{value.fee}</StyledTableCell>
                      </React.Fragment>
                    ))}
         </StyledTableRow>
                 </TableBody>
             </Table>
         </TableContainer>
            )}
            
            
          </DialogContentText>
        </DialogContent>
        <DialogActions className='d-flex justify-content-between pl-4 pr-4'>
          <Button onClick={handleClose} autoFocus>
           close
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}

export default AddPharmacyPatients