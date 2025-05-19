import React, { useEffect, useState } from 'react'
import { FormControl } from '@mui/base/FormControl';
import { IconButton, ListItemButton, Select, Typography } from '@mui/material'
import { StyledTableCell,StyledTableRow } from '../../../Styles/Table';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { StyledSelect } from '../../../Styles/Select';
import AddIcon from '@mui/icons-material/Add';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { PostBloodBankData, SignupData } from '../../Store/Actions';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { style } from '@mui/system';
import { GetuserDataById, RegisterHospitalUser } from '../../Store/ApiReducers/Auth';



const RequestDonation = () => {
  const dispatch=useDispatch()

  const isadminDash=useLocation().pathname.includes('/admindashboard/')
  const isrecepDash=useLocation().pathname.includes('/receptiondashboard/')
  const islabDash=useLocation().pathname.includes('/labdashboard/')
  const isdocDash=useLocation().pathname.includes('/doctordashboard/')

  const ispatientdash=useLocation().pathname.includes('/patientdashboard')

  const getusers=useSelector(state=>state.Assignrole.userresult)
  const userById=useSelector(state=>state.Addpatentdetails.UserDataById)


  const [inputFeilddata,setinputFeilddata]=useState({userName:'',address:'',contactNumber:'',email:''})
  const [selectedData,setselectedData]=useState({mrn:'',dob:'',gender:'',userName:'',address:'',contactNumber:'',email:'',
                                                 govIssuedIdentity:'',medicalHistory:'',currentMedications:'',allergies:'',
                                                 infectiousDiseases:'',recentTravelHistory:'',recentVaccinations:'',lastAlcoholIntake:'',
                                                 bloodSafetyActivities:'',tobaccoUse:false,dateOfLastDonation:'',noOfDonationsLastOneYear:'',
                                                 adverseReactionLastDonation:'',consent:false,concentForTestingAndScreening:false,screenQuestionStatus:false,
                                                 medicalStaffComments:'',emergencyContact:'',bloodType:'',comments:'' })
  const [filteredData, setFilteredData] = useState();
  const [displayAllData, setDisplayAllData] = useState(false);
  const [viewTable,setviewTable]=useState(false)
  const [userbyIdcontroller,setuserbyidcontroller]=useState(false)


 


  useEffect(()=>{
    if(inputFeilddata && inputFeilddata.userName && inputFeilddata && inputFeilddata.email && inputFeilddata && inputFeilddata.contactNumber && inputFeilddata.contactNumber.length >=10 && inputFeilddata && !inputFeilddata.password) {
      let newPassword = generatePassword();
      setinputFeilddata({ ...inputFeilddata, password: newPassword });
    }
    if(isadminDash || isrecepDash){
      setviewTable(true)
      setDisplayAllData(false)
      setselectedData({userName:'',address:'',contactNumber:'',email:''})
    }
    if(ispatientdash && !userbyIdcontroller || isdocDash && !userbyIdcontroller){
      const token=localStorage.getItem("accessToken")
      const decodedToken=jwtDecode(token)
      const Id=decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
      dispatch(GetuserDataById(Id))
      setuserbyidcontroller(true)
      setDisplayAllData(true)
    }
    if(userById && ispatientdash || userById && isdocDash){
      setselectedData({mrn:userById.id,userName:userById.userName,email:userById.email,contactNumber:userById.phoneNumber,address:userById.address})
    }
   
  },[inputFeilddata,userById,isdocDash,isadminDash,islabDash,isrecepDash])

  const generatePassword = () => {

    let { userName, email, contactNumber } = inputFeilddata;
  
    let capitalLetter = userName.charAt(0).toUpperCase();

    let smallLetter = userName.charAt(1).toLowerCase();
  
    let number = contactNumber.match(/\d+/)[0];
  
    let symbol = email.includes('@') ? '@' : '_'; 
  
    let password = `${capitalLetter}${smallLetter}${number}${symbol}`;

    while (password.length < 8) {
      password += 'pass'
    }
    return password;
  };  

  const handleinputchange=(e)=>{
   const {name,value}=e.target
   if(name==='userName'){
    // setDisplayAllData(true)
    const filteruser=getusers.filter((item)=>item.userName.includes(value))
    setFilteredData(filteruser)
   }
   if(selectedData){
    if(name==='consent' || name==='tobaccoUse'){
       if(value=='yes'){
         setselectedData({...selectedData,[name]:true})
        }
        else{
          setselectedData({...selectedData,[name]:false})
        }
     }
    else if(name==='concentForTestingAndScreening'){
      if(value=='yes'){
        setselectedData({...selectedData,[name]:true,screenQuestionStatus:true})
       }
       else{
         setselectedData({...selectedData,[name]:false,screenQuestionStatus:false})
       }
    }
    else{
        setselectedData({...selectedData,[name]:value})
     }
   }
   else{
     setinputFeilddata({...inputFeilddata,[name]:value})
   }
  }

  const handleSendIconClick=(row,index)=>{
    setDisplayAllData(true)
   
    const rowdetails={
      mrn:row.id,
      userName:row.userName,
      email:row.email,
      contactNumber:row.phoneNumber,
      address:row.address
    }
    setselectedData(rowdetails)
  }

  const formSubmit=(e)=>{
    e.preventDefault()
    if(!displayAllData){
      const updatedsigindata={
        userName:inputFeilddata.userName,
        email:inputFeilddata.email,
        password:inputFeilddata.password,
        phoneNumber:inputFeilddata.phoneNumber,
        address:inputFeilddata.address
      }
      dispatch(RegisterHospitalUser(updatedsigindata))
      setDisplayAllData(true)
      setinputFeilddata({userName:'',address:'',contactNumber:'',email:''})
    }
    else{
      if(isadminDash || isrecepDash){
        const updatedselectedData={...selectedData}
        delete updatedselectedData.userName
        updatedselectedData.status="pending"
        if(selectedData.consent){
          dispatch(PostBloodBankData(updatedselectedData))
          setDisplayAllData(false)  
          setselectedData({mrn:'',userName:'',address:'',contactNumber:'',email:''})
        }
        if(!selectedData.consent){
          toast('Cannot submit the form.consent is no')
        }
      }
      else{
        const updatedselectedData={...selectedData}
        delete updatedselectedData.userName
        updatedselectedData.status="pending"
        if(selectedData.consent){
          dispatch(PostBloodBankData(updatedselectedData))
          setDisplayAllData(true) 
          setselectedData({mrn:selectedData.mrn,userName:selectedData.userName,address:selectedData.address,
            contactNumber:selectedData.contactNumber,email:selectedData.email, govIssuedIdentity:'',medicalHistory:'',currentMedications:'',allergies:'',
            infectiousDiseases:'',recentTravelHistory:'',recentVaccinations:'',lastAlcoholIntake:'',
            bloodSafetyActivities:'',tobaccoUse:false,dateOfLastDonation:'',noOfDonationsLastOneYear:'',
            adverseReactionLastDonation:'',consent:false,concentForTestingAndScreening:false,screenQuestionStatus:false,
            medicalStaffComments:'',emergencyContact:'',bloodType:'',comments:''}) 
        }
        if(!selectedData.consent){
          toast('Cannot submit the form.consent is no')
        }
      }

    }

  }

  return (
    <div className='servicemaindiv'>
      <h4 className='headnames'>Blood Donation</h4>
      <ToastContainer/>
      <div className={viewTable ? 'bloodformdiv' :`d-flex justify-content-center`}  style={viewTable ? {} : { height:'900px' }} >
     
      <form onSubmit={formSubmit}> 
            <FormControl >
                <div className='bloodbank_sub'>
                  <div className='d-flex blood_submain'>
                  <div class="mb-3 d-flex blood_sub">
                        <label  class=" col-form-label ">Name</label>
                        <div >
                          <input type="text" required class="form-control" name="userName" value={selectedData ? selectedData.userName:inputFeilddata && inputFeilddata.userName} onChange={handleinputchange}/>
                        </div>
                        {/* {validateInput &&(<div className='error-message_addpatient'>{validateInput.userName}</div>)} */}
                    </div>
                    <div class="mb-3 d-flex blood_sub ">
                        <label  class=" col-form-label ">Address</label>
                        <div  >
                        <input type="text" required class="form-control" name="address" value={selectedData ? selectedData.address:inputFeilddata && inputFeilddata.address} onChange={handleinputchange}/>
                        </div>
                        {/* {validateInput &&(<div className='error-message_addpatient'>{validateInput.userName}</div>)} */}
                    </div>
                  </div>

                  <div className='d-flex blood_submain'>
                  <div class="mb-3 d-flex blood_sub">
                        <label  class="col-form-label ">Email</label>
                        <div  >
                          <input type="Email" required class="form-control" name='email' value={selectedData ? selectedData.email:inputFeilddata && inputFeilddata.email} onChange={handleinputchange} />
                        </div>
                        {/* {validateInput &&(<div className='error-message_addpatient'>{validateInput.email}</div>)} */}

                    </div>
                    <div class="mb-3 d-flex blood_sub">
                        <label  class=" col-form-label ">Phone</label>
                        <div>
                          <input type="text" required class="form-control" name="contactNumber" value={selectedData ? selectedData.contactNumber:inputFeilddata && inputFeilddata.contactNumber} onChange={handleinputchange}/>
                        </div>
                        {/* {validateInput &&(<div className='error-message_addpatient'>{validateInput.userName}</div>)} */}
                    </div>
                  </div>

                  <div className='d-flex blood_submain'>
                     <div class="mb-3 d-flex blood_sub"    >
                        {/* <label  class=" col-form-label " >MRN</label>
                        <div style={{marginLeft:'30px'}} >
                        <input type="text"  class="form-control" name="mrn" value={selectedData ? selectedData.mrn:inputFeilddata && inputFeilddata.mrn} onChange={handleinputchange}/>
                        </div> */}
                    </div>
                    <div className='mb-3 d-flex blood_sub' >
                         <div class="d-flex ">
                         <select class="form-select form-select-lg " aria-label="Default select example" style={{borderRadius:'5px',border:'none'}} name='gender' value={selectedData ? selectedData.gender:inputFeilddata && inputFeilddata.gender} onChange={handleinputchange} placeholder='gender'>
                            <option selected disabled value="">gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                        </select>
                         </div>
                    </div>
                    <div class="mb-3 d-flex blood_sub">
                        <label  class=" col-form-label ">DOB</label>
                        <div>
                          <input type="date" class="form-control" name="dob" value={selectedData ? selectedData.age:inputFeilddata && inputFeilddata.age} onChange={handleinputchange}/>
                        </div>
                        {/* {validateInput &&(<div className='error-message_addpatient'>{validateInput.userName}</div>)} */}
                    </div>
                  </div>
                  
                  
                  <div className='d-flex blood_submain'>
                   <div class="mb-3 d-flex blood_sub">
                        <label  class=" col-form-label ">Allergies</label>
                        <div>
                          <input type="text" class="form-control" name="allergies" value={selectedData && selectedData.allergies} onChange={handleinputchange}/>
                        </div>
                        {/* {validateInput &&(<div className='error-message_addpatient'>{validateInput.userName}</div>)} */}
                    </div>
                    <div class="mb-3 d-flex blood_sub">
                        <label  class="col-form-label ">Goverment issued Identity</label>
                        <div >
                        <input type="text" class="form-control" name="govIssuedIdentity" value={selectedData && selectedData.govIssuedIdentity} onChange={handleinputchange}/>
                        </div>
                        {/* {validateInput &&(<div className='error-message_addpatient'>{validateInput.userName}</div>)} */}
                    </div>
                    </div>
                  
                  <>
                  <div className='d-flex blood_submain'>
                    <div class="mb-3 d-flex blood_sub">
                        <label  class="col-form-label ">Medical history</label>
                        <div >
                        <input type="text" class="form-control" name="medicalHistory" value={selectedData && selectedData.medicalHistory} onChange={handleinputchange}/>
                        </div>
                        {/* {validateInput &&(<div className='error-message_addpatient'>{validateInput.userName}</div>)} */}
                    </div>
                    <div class="mb-3 d-flex blood_sub">
                        <label  class="col-form-label ">Current medications</label>
                        <div >
                        <input type="text" class="form-control" name="currentMedications" value={selectedData && selectedData.currentMedications} onChange={handleinputchange}/>
                        </div>
                        {/* {validateInput &&(<div className='error-message_addpatient'>{validateInput.userName}</div>)} */}
                    </div>
                  </div>

                    <div className='d-flex blood_submain'>
                    <div class="mb-3 d-flex blood_sub">
                        <label  class=" col-form-label ">Recent travel history</label>
                        <div >
                            <input type="text"  class="form-control" name='recentTravelHistory' value={selectedData && selectedData.recentTravelHistory } onChange={handleinputchange} />
                        </div>
                        {/* <div className='error-message_addpatient'>{errors.address}</div> */}
                    </div>
                    <div class="mb-3 d-flex blood_sub">
                        <label  class=" col-form-label ">Recent vaccinations</label>
                        <div >
                            <input type="text"  class="form-control" name='recentVaccinations' value={selectedData && selectedData.recentVaccinations } onChange={handleinputchange} />
                        </div>
                        {/* <div className='error-message_addpatient'>{errors.address}</div> */}
                    </div>
                  </div>

                  <div className='d-flex blood_submain'>
                      <div class="mb-3 d-flex blood_sub" >
                          <label  class=" col-form-label ">Last alcohol intake</label>
                          <div >
                              <input type="date"  class="form-control" name='lastAlcoholIntake' value={selectedData && selectedData.lastAlcoholIntake } onChange={handleinputchange} />
                          </div>
                          {/* <div className='error-message_addpatient'>{errors.address}</div> */}
                      </div>
                      <div class="mb-3 d-flex blood_sub" >
                          <label  class=" col-form-label ">Infectious diseases</label>
                          <div >
                              <input type="text"  class="form-control" name='infectiousDiseases' value={selectedData && selectedData.infectiousDiseases } onChange={handleinputchange} />
                          </div>
                          {/* <div className='error-message_addpatient'>{errors.address}</div> */}
                      </div>
                    </div>

                    <div className='d-flex blood_submain'>
                      <div class="mb-3 d-flex blood_sub">
                          <label  class=" col-form-label ">Blood type</label>
                          <div >
                            <StyledSelect
                             onChange={handleinputchange}
                             name='bloodType'
                             value={selectedData && selectedData.bloodType }
                             style={{width:'155px'}}
                            >
                              <MenuItem value='o+'>O+</MenuItem>
                              <MenuItem value='o-'>O-</MenuItem>
                              <MenuItem value='a+'>A+</MenuItem>
                              <MenuItem value='a-'>A-</MenuItem>
                              <MenuItem value='b+'>B+</MenuItem>
                              <MenuItem value='b-'>B-</MenuItem>
                              <MenuItem value='ab+'>AB+</MenuItem>
                              <MenuItem value='ab-'>AB-</MenuItem>
                            </StyledSelect>
                              {/* <input type="text"  class="form-control" name='bloodType' value={selectedData && selectedData.bloodType } onChange={handleinputchange} /> */}
                          </div>
                          {/* <div className='error-message_addpatient'>{errors.address}</div> */}
                      </div>
                      <div class="mb-3 d-flex blood_sub">
                          <label  class=" col-form-label ">Date of last donation</label>
                          <div >
                              <input type="date"  class="form-control" name='dateOfLastDonation' value={selectedData && selectedData.dateOfLastDonation ? inputFeilddata.dateOfLastDonation:null} onChange={handleinputchange} />
                          </div>
                          {/* <div className='error-message_addpatient'>{errors.address}</div> */}
                      </div>
                    </div>

                    <div className='d-flex blood_submain'>
                      <div class="mb-3 d-flex blood_sub">
                          <label  class=" col-form-label ">No of donations last one year</label>
                          <div >
                              <input type="text"  class="form-control" name='noOfDonationsLastOneYear' value={selectedData && selectedData.noOfDonationsLastOneYear ? inputFeilddata.noOfDonationsLastOneYear:null} onChange={handleinputchange} />
                          </div>
                          {/* <div className='error-message_addpatient'>{errors.address}</div> */}
                      </div>
                      <div class="mb-3 d-flex blood_sub">
                          <label  class=" col-form-label ">Adverse reaction last donation</label>
                          <div >
                              <input type="text"  class="form-control" name='adverseReactionLastDonation' value={selectedData && selectedData.adverseReactionLastDonation ? inputFeilddata.adverseReactionLastDonation:null} onChange={handleinputchange} />
                          </div>
                          {/* <div className='error-message_addpatient'>{errors.address}</div> */}
                      </div>
                    </div>

                    <div className='d-flex justify-content-around'>

                      <div class="mb-3 d-flex justify-content-between blood_sub">
                          <label  class=" col-form-label ">Tobaco use</label>
                          <div className='d-flex flex-column ' style={{marginLeft:'10px'}}>
                            <div className='d-flex '>
                              <input type="radio"  class="form-control" name='tobaccoUse' value='yes' onChange={handleinputchange}  />
                              <label className='mt-2'>Yes</label>
                            </div>
                            <div className='d-flex'>
                                <input type="radio"  class="form-control" name='tobaccoUse' value='no' onChange={handleinputchange} /> 
                                <label className='mt-2'>No</label>
                            </div>
                          </div>
                          {/* <div className='error-message_addpatient'>{errors.address}</div> */}
                      </div>
                      <div class="mb-3 d-flex justify-content-between blood_sub">
                          <label  class=" col-form-label ">Consent</label>
                          <div className='d-flex flex-column ' style={{marginLeft:'10px'}}>
                            <div className='d-flex '>
                              <input type="radio" required class="form-control" name='consent' value='yes' onChange={handleinputchange}  />
                              <label className='mt-2'>Yes</label>
                            </div>
                            <div className='d-flex'>
                                <input type="radio"  class="form-control" name='consent' value='no' onChange={handleinputchange} /> 
                                <label className='mt-2'>No</label>
                            </div>
                          </div>
                          {/* <div className='error-message_addpatient'>{errors.address}</div> */}
                      </div>
                      
                      <div class="mb-3 d-flex justify-content-between blood_sub">
                          <label  class=" col-form-label " style={{width:'123px'}}>Concent for testing and screening</label>
                          <div className='d-flex flex-column 'style={{marginLeft:'10px'}}>
                            <div className='d-flex '>
                              <input type="radio"  class="form-control" name='concentForTestingAndScreening' value='yes' onChange={handleinputchange}  />
                              <label className='mt-2'>Yes</label>
                            </div>
                            <div className='d-flex'>
                                <input type="radio"  class="form-control" name='concentForTestingAndScreening' value='no' onChange={handleinputchange} /> 
                                <label className='mt-2'>No</label>
                            </div>
                          </div>
                          {/* <div className='error-message_addpatient'>{errors.address}</div> */}
                      </div>

                      
                    </div>

                    <div className='d-flex blood_submain'>
                      <div class="mb-3 d-flex blood_sub">
                          <label  class=" col-form-label">Comments</label>
                          <div >
                              <input type="text"  class="form-control" name='comments' value={selectedData && selectedData.comments } onChange={handleinputchange} />
                          </div>
                      </div>
                      <div class="mb-3 d-flex blood_sub">
                          <label  class=" col-form-label ">Emergency contact</label>
                          <div >
                              <input type="text"  class="form-control" name='emergencyContact' value={selectedData && selectedData.emergencyContact } onChange={handleinputchange} />
                          </div>
                      </div>
                    </div>

                    <div className='d-flex'>
                     
                      {/* <div class="mb-3 d-flex">
                          <label  class=" col-form-label">Emergency contact</label>
                          <div >
                              <input type="date"  class="form-control" name='emergencyContact' value={inputFeilddata && inputFeilddata.emergencyContact ? inputFeilddata.emergencyContact:null} onChange={handleinputchange} />
                          </div>
                           <div className='error-message_addpatient'>{errors.address}</div> 
                      </div> */}
                    </div>
                  </>
                
                   
                    {/* <div className='d-flex'  >
                        {validateInput &&(<div className='error-message'  style={{width:'20px',marginLeft:'100px'}}>{validateInput.age}</div>)}
                        <div className='error-message' style={{width:'20px',marginLeft:'100px'}}>{errors.gender}</div>
                        <div className='error-message'  style={{width:'20px',marginLeft:'100px'}}>{errors.type}</div>
                    </div> */}

                    <div className='d-flex justify-content-end'>
                      <Button variant="contained" style={{backgroundColor:'black'}} type='submit'>submit</Button>
                    </div>
                </div>
            </FormControl>
            </form>
            {viewTable && (
            <div className='ml-3'>
            <TableContainer component={Paper} className='tablecontainer_main'>
                    <Table sx={{ minWidth: 550 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">ACTION</StyledTableCell>
                        <StyledTableCell align="center">NAME</StyledTableCell>
                        <StyledTableCell align="center">PHONE</StyledTableCell>
                        <StyledTableCell align="center">ADDRESS</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {!displayAllData 
                      ? getusers.map((row, index) => (
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
                    
                        : filteredData && filteredData.length>0 ? 
                        (filteredData.map((row, index) => (
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
                      ):(
                        getusers.map((row, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell align="center" className="d-flex">
                              <IconButton onClick={() => handleSendIconClick(row, index)}>
                                <AddIcon color="primary" />
                              </IconButton>
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.userName}</StyledTableCell>
                            <StyledTableCell align="center">{row.phoneNumber}</StyledTableCell>
                            <StyledTableCell align="center">{row.address}</StyledTableCell>
                          </StyledTableRow>
                        ))
                      )
                          }
                    </TableBody>
                    </Table>
                    </TableContainer>
            </div>
            )}
      </div>
    </div>
  )
}

export default RequestDonation