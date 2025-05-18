import React, { useState } from 'react'
import {Button} from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { StyledTableCell,StyledTableRow } from '../../../Styles/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import ListItemText from '@mui/material/ListItemText';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { StyledDialoge,Transition } from '../../../Styles/Dialoge';
import { Form, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDiagnosepatient,setDiagnosisinput ,resetinput} from '../../Store/DoctorFrame/DiagnosisSlice';
import { setconsultationarray } from '../../Store/AddpatientSlice';
import { setPatientArray } from '../../Store/NewPatientSlice';



// const StyledSelect = styled(Select)(({ theme }) => ({
//   '& .MuiOutlinedInput-root': {
//     '& fieldset': {
//       borderColor: 'white', // Set the border color to white
//     },
//     '&:hover fieldset': {
//       borderColor: 'white', // Set the border color to white on hover
//     },
//   },
//   '& .MuiSelect-select': {
//     color: 'black', // Set the text color to white
//     '&:focus': {
//       backgroundColor: 'transparent', // Set the background color to transparent when focused
//     },
//   },
//   '& .MuiSelect-icon': {
//     color: 'white', // Set the dropdown icon color to white
//   },
// }));



const Salesviewall = () => {

    const navigate=useNavigate()
    const dispatch=useDispatch()
    
    const patientdata=useSelector((state)=>state.Addpatentdetails.consultationarray)
    const inputdata=useSelector((state)=>state.DiagnosePatient.diagnosisinputdata)
    const labdetails=useSelector(state=>state.Addservices.addServicesArray)
    const purchasedata=useSelector((state)=>state.purchase.purchaseArray)
    const diagnosiedpatient=useSelector((state)=>state.DiagnosePatient.diagnosepatient)
    const newPatientArray=useSelector((state)=>state.newPatient.newPatientArray)
    const pharmacyDetailsArray=useSelector((state)=>state.PharmacyDetails.PharmacyData)
    

    const [filteredData, setFilteredData] = useState(patientdata);
    const [open, setOpen] = React.useState(false);
    const [newpatientDialog,setnewpatientDialoge]=useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const [rowpatientdata,setrowpatientdata]=useState()
    const [newpatientData,setnewPatientData]=useState({patientname:'',phone:'',address:'',previous_consulted_doctor:'',previous_consulted_hospital:'',medicinedata:[]})
    const [medicinedetails,setmedicinedetails]=useState({medicine:'',no_of_days:''})
    const [medicinDialog,setmedicinDialog]=useState(false)
    const [rowdotordetails,setrowdocterdetails]=useState()
    const[patientType,setpatientType]=useState({type:'all_patient'})


    const onClickView=(mrno)=>{
        setOpen(true);
        const mrn=mrno
        const selecteddata=patientdata.filter((item) => item.mrnno === mrn)
        
        setrowpatientdata(selecteddata[0])
        if (!patientdata.doctordetails){
             dispatch(resetinput())
          }
    }

    const onClickbutton=(id)=>{
        
        navigate(`addmedicine/${id}`)
      // }
    }

  
    const handleClose = () => {
      setOpen(false);
      setnewpatientDialoge(false)
      setpatientType({type:'all_patients'})
    };
  

    const handleinputChange=(e)=>{
      const {name,value}=e.target

      if(value==='all_patients'){
        setFilteredData(patientdata)
        setpatientType({type:'all_patients'})
        setnewpatientDialoge(false)
      }
      else if(value==='out_patient'){
        const filterOutPatient=patientdata.filter((item)=>item.type==='out_patient')
        
        setFilteredData(filterOutPatient)
        setpatientType({type:'out_patient'})
        setnewpatientDialoge(false)
      }
      else if(value==='in_patient'){
        const filteredInPatient=patientdata.filter((item)=>item.type==='in_patient')
        setFilteredData(filteredInPatient)
        setpatientType({type:'in_patient'})
      }
      else if(value==='new_patient'){
        setpatientType({type:'new_patient'})
        setnewpatientDialoge(true)
        setOpen(true)
      }

      if(name==='search'){
        
        if(!isNaN(value)){
          if(value===''){
           setFilteredData(patientdata)
           setpatientType({type:'all_patient'})
          }
          else if(value){
            const filtered = filteredData.filter((item)=>item.mrnno == value)
            
            setFilteredData(filtered)  
          }
        }
        
        else{
          const filterByname=filteredData.filter((item)=>item.name.toLowerCase().includes(value.toLowerCase()))
          setFilteredData(filterByname)
        }
      }

      if(rowpatientdata){
        if (name==='addservices'){
          const selectedservices=e.target.value
          dispatch(setDiagnosisinput({name,selectedservices}))
        }
        if(name==='addmedicine'){
          const selectedmedicine=e.target.value
          dispatch(setDiagnosisinput({name,selectedmedicine}))
        }
        dispatch(setDiagnosisinput({name,value}))
        
      }
    }


    const handleSerachMedicine=(event)=>{
        setSearchQuery(event.target.value)
        
    }
//new patient dialoge data

    const clicklistitem=(itemno)=>{
      
      if(itemno){
        const filtermedicine=purchasedata.filter((item)=>item.itemNo===itemno)
        
      setnewPatientData((prevdata)=>({
          ...prevdata,
          medicinedata:[filtermedicine[0].items]
        }))
       }
          // setlistopen(true)
      }

    const newPatientChange=(e)=>{
      const {name,value}=e.target
        setnewPatientData((prevdata)=>({
          ...prevdata,
         [name]:value
        }))
    }

    const handlenewpatientMedicine=(e)=>{
      const {name,value}=e.target
      setmedicinedetails((prevdata)=>({
        ...prevdata,
        [name]:value
      }))
    }

    const onclickAddMore=()=>{
      setnewPatientData((prevdata)=>({
        ...prevdata,
       medicinedata:[...prevdata.medicinedata,
        { medicine: medicinedetails.medicine, no_of_days: medicinedetails.no_of_days },]
      }))
      setmedicinedetails({medicine:'',no_of_days:''})
    }

    const onclickShowAll=()=>{
       setmedicinDialog(true)
    }
    const clickMedicinClose=()=>{
      setmedicinDialog(false)
    }

    const clickSubmitBtn=()=>{
      if (medicinedetails && medicinedetails.medicine && medicinedetails.no_of_days) {
        setnewPatientData((prevdata) => ({
          ...prevdata,
          medicinedata: [
            ...prevdata.medicinedata,
            { medicine: medicinedetails.medicine, no_of_days: medicinedetails.no_of_days },
          ],
        }));
      }
    }
    
    const submitmedicinData = (e) => {
      e.preventDefault();
      
      dispatch(setPatientArray(newpatientData));
      setmedicinedetails({ medicine: '', no_of_days: '' });
      setnewPatientData({
        patientname: '',
        phone: '',
        address: '',
        previous_consulted_doctor: '',
        previous_consulted_hospital: '',
        medicinedata: [],
      });
    };
  


    const submitForm=(e)=>{
      e.preventDefault()
      const doctordetails={
        ...inputdata,
      }
      dispatch(setDiagnosepatient(doctordetails))
      dispatch(resetinput())
      const indexToupdate=patientdata.findIndex((item)=>item.mrnno===rowpatientdata.mrnno)
      
      if (indexToupdate !== -1) {
        const updatedConsultation = { ...patientdata[indexToupdate] };
        updatedConsultation.status = 1;
        
        dispatch(setconsultationarray({...updatedConsultation,doctordetails}));
        handleClose()
      }
    }
    
  
  return (
    <div className='salesviewall_main'>
    <div className='d-flex'>
      <div className='d-flex'>
        <FormControl variant="filled" sx={{ mt: 1, minWidth: 120,height:'56px', borderRadius:'5px', backgroundColor: 'white'  }}>
            <InputLabel id="demo-simple-select-filled-label">  Patient Type</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              name='type'
              value={patientType ? patientType.type :null}
              onChange={handleinputChange}
            >
              <MenuItem value="all_patients">All Patients</MenuItem>
              <MenuItem value="in_patient">In Patient</MenuItem>
              <MenuItem value="out_patient" >Out Patient</MenuItem>
              <MenuItem value="new_patient">New Patient</MenuItem>
            </Select>
        </FormControl>
                <TextField
                    sx={{ m: 1, minWidth: 120 ,  borderRadius:'5px',backgroundColor: 'white'  }}
                    id="filled-required"
                    label=""
                    type='text'
                    defaultValue=""
                    variant="filled"
                    name='search'
                    // value={inputFieldData.category}
                    style={{color:'white'}}
                    onChange={handleinputChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    />
          </div>
          <div>
          <div className='pharmacycolorbtndiv'>
                 <div className='d-flex ml-2 mr-2 '>
                        <button className='colorbtn ' style={{backgroundColor:'blue' ,border:'solid'}}></button>
                         <p className='pl-2 mb-0'>NOT YET CONSULTED/MEDICINE NOT PURCHASED</p>
                  </div>
                  <div className='d-flex  ml-2 mr-2'>
                          <button className='colorbtn' style={{backgroundColor:'red',border:'solid'}}></button>
                          <p className='pl-2  mb-0'>MEDICINE PURCHASED PAYMENT PENDING</p>
                  </div>
                  <div className='d-flex  ml-2 mr-2'>
                          <button className='colorbtn' style={{backgroundColor:'green',border:'solid'}}></button>
                          <p className='pl-2  mb-0'>MEDICINE PURCHASED PAYMENT CLEARED</p>
                  </div>
            </div>  
          </div>
        </div>
    <div className='d-flex '>
      </div>
      <div style={{ maxHeight: '65vh', overflowY: 'auto',paddingTop:'15px' }}>
      <TableContainer component={Paper} className='tablecontainer_main' >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">MRN</StyledTableCell>
            <StyledTableCell align="center">NAME</StyledTableCell>
            <StyledTableCell align="center">PHONE NO</StyledTableCell>
            <StyledTableCell align="center">EMAIL</StyledTableCell>
            <StyledTableCell align="center">VIEW DETAILS</StyledTableCell>
            <StyledTableCell align="center">ADD MEDICINE</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((row,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell align="center">{row.mrnno}</StyledTableCell>
              <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="center">{row.number}</StyledTableCell>
              <StyledTableCell align="center">{row.email}</StyledTableCell>
              <StyledTableCell align="center">
                <Link
                  component="button"
                  variant="body2"
                  style={{color:row.doctordetails ? 'green' :'blue'}}
                  onClick={() => {onClickView(row.mrnno)}}
                >
                  view details
                </Link>
                </StyledTableCell>
                <StyledTableCell align="center">
        {pharmacyDetailsArray &&
        pharmacyDetailsArray.some((item) => item.mrnno === row.mrnno) ? (
          <>
            <Button
              variant="contained"
              style={{ backgroundColor: pharmacyDetailsArray.find((item) => item.mrnno === row.mrnno).payment === 'paid' ? 'green' : 'red' }}
              endIcon={<MedicalServicesIcon />}
              onClick={() => {
                // onClickbutton(row.mrnno);
              }}
            >
              Add
            </Button>
          </>
        ) : (
            <Button
              variant="contained"
              endIcon={<MedicalServicesIcon />}
              onClick={() => {
                onClickbutton(row.mrnno);
              }}
            >
              Add
            </Button>
        )}
      </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

      </div>
          <StyledDialoge
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
           className='dialoge_class'
          >
          <div className='dialogeForm '>
          {newpatientDialog ===true ?(
            <div>
              <form onSubmit={submitmedicinData}> 
                  <div className='row ml-5 mr-3 mt-1'>
                    <h6 className='col pt-2 diagnosishead'>Patient Name :</h6>
                    <div className='col'>
                    <TextField
                      id="filled-required"
                      variant="filled"
                      className='diagnostextfeild'
                      name='patientname'
                      value={newpatientData.patientname}
                      onChange={newPatientChange}
                    />
                    </div>
                  </div>
                  <div className='row ml-5 mr-3 mt-1'>
                    <h6 className='col pt-2 diagnosishead'>Phone :</h6>
                    <div className='col'>
                    <TextField
                      
                      id="filled-required"
                      variant="filled"
                      className='diagnostextfeild'
                      name='phone'
                      value={newpatientData.phone}
                      onChange={newPatientChange}

                    />
                    </div>
                  </div>
                  <div className='row ml-5 mr-3 mt-1'>
                    <h6 className='col pt-2 diagnosishead'>Address :</h6>
                    <div className='col'>
                    <TextField
                     
                      id="filled-required"
                      variant="filled"
                      className='diagnostextfeild'
                      name='address'
                      value={newpatientData.address}
                      onChange={newPatientChange}

                    />
                    </div>
                  </div>
                  <div className='row ml-5 mr-3 mt-1'>
                    <h6 className='col pt-2 diagnosishead'>Previous Consulted Doctor :</h6>
                    <div className='col'>
                    <TextField
                     
                      id="filled-required"
                      variant="filled"
                      className='diagnostextfeild'
                      name='previous_consulted_doctor'
                      value={newpatientData.previous_consulted_doctor}
                      onChange={newPatientChange}

                    />
                    </div>
                  </div>
                  <div className='row ml-5 mr-3 mt-1'>
                    <h6 className='col pt-2 diagnosishead'>Previous Consulted Hospital :</h6>
                    <div className='col-6'>
                    <TextField
                   
                      id="filled-required"
                      variant="filled"
                      className='diagnostextfeild'
                      name='previous_consulted_hospital'
                      value={newpatientData.previous_consulted_hospital}
                      onChange={newPatientChange}
                       />
                    </div>
                  </div>
                  <div className='row ml-5 mr-3 mt-1'>
                    <h6 className='col pt-2 diagnosishead'>Medicine :</h6>
                    <div className='col-3'>
                    <FormControl variant="filled" sx={{ mt: 1, minWidth: 220,height:'56px', borderRadius:'5px',}}>
                      <InputLabel id="demo-simple-select-filled-label">  Select Medicine</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        name='medicine'
                        value={ medicinedetails.medicine}
                        onChange={handlenewpatientMedicine}
                      >
                        {purchasedata.map((item,index)=>(
                                  <MenuItem key={index} value={item.items} className='menuitems'>
                                  {/* <Checkbox 
                                  checked={inputdata.medicine.indexOf(name.items) > -1} 
                                  /> */}
                                  <ListItemText primary={item.items} />
                               </MenuItem> 
                       ))}
                      </Select>
                  </FormControl>
                    </div>
                    <div className='col-3'>
                      <Button variant='contained' className='m-3' onClick={onclickAddMore}>add more</Button>
                    </div>
                  </div>
                  <div className='row ml-5 mr-3 mt-1'>
                    <h6 className='col pt-2 diagnosishead'>No Of Days :</h6>
                    <div className='col-3'>
                    <TextField
                     
                      id="filled-required"
                      variant="filled"
                      className='diagnostextfeild'
                      style={{width:'220px'}}
                      name='no_of_days'
                      onChange={handlenewpatientMedicine}
                      value={medicinedetails.no_of_days}
                    />
                    </div>
                    <div className='col-3'>
                      <Button variant='contained' className='m-3' onClick={onclickShowAll}>Show All</Button>
                    </div>
                  </div>
                  <div className='d-flex justify-content-center'>
             <Button variant='contained' sx={ {height:33,marginRight:7.5,marginTop:3} }  type='submit' onClick={clickSubmitBtn}>Submit</Button>
             </div>
              </form>
            </div>
          ):(<form onSubmit={submitForm}>
             <div className='row ml-5 mr-3 mt-1'>
                <h6 className='col pt-2 diagnosishead'>Patient Name :</h6>
                <div className='col'>
                <TextField
                  required
                  id="filled-required"
                  variant="filled"
                  className='diagnostextfeild'
                  name='patientname'
                  value={rowpatientdata ? rowpatientdata.name : ''}
                />
                </div>
             </div>
             <div className='row ml-5 mr-3 mt-1'>
                <h6 className='col pt-2'>Chief Complaints :</h6>
                <div className='col'>
                <TextField
                  id="filled-required"
                  variant="filled"
                  className='diagnostextfeild'
                  name='cheif_complaints'
                  value={rowpatientdata && rowpatientdata.doctordetails ? rowpatientdata.doctordetails.cheif_complaints :  inputdata.cheif_complaints}
                  onChange={handleinputChange}
                />
                </div>
             </div> 
             <div className='row ml-5 mr-3 mt-1'>
                <h6 className='col pt-2'>HPI :</h6>
                <div className='col'>
                <TextField
                  id="filled-required"
                  variant="filled"
                  className='diagnostextfeild'
                  name='hpi'
                  value={rowpatientdata && rowpatientdata.doctordetails ? rowpatientdata.doctordetails.hpi :inputdata.hpi}
                  onChange={handleinputChange}
                />
                </div>
             </div>
             <div className='row ml-5 mr-3 mt-1'>
                <h6 className='col pt-2'>Past History :</h6>
                <div className='col'>
                <TextField
                  id="filled-required"
                  variant="filled"
                  className='diagnostextfeild'
                  name='past_history'
                  value={rowpatientdata && rowpatientdata.doctordetails ? rowpatientdata.doctordetails.past_history :inputdata.past_history}
                  onChange={handleinputChange}
                />
                </div>
             </div>
             <div className='row ml-5 mr-3 mt-1'>
                <h6 className='col pt-2'>Family History :</h6>
                <div className='col'>
                <TextField
                  id="filled-required"
                  variant="filled"
                  className='diagnostextfeild'
                  name='family_history'
                  value={rowpatientdata && rowpatientdata.doctordetails ? rowpatientdata.doctordetails.family_history :inputdata.family_history}
                  onChange={handleinputChange}
               />
              </div>
             </div>
             <div className='row ml-5 mt-2'>
               <h6 className='col pt-2'>General Examination :</h6>
               <div className='col'>
                <TextField 
                  label='PULSE'
                  id="filled-required"
                  variant="filled"
                  name='pulse'
                  value={rowpatientdata && rowpatientdata.doctordetails ? rowpatientdata.doctordetails.pulse :inputdata.pulse}
                  onChange={handleinputChange}
               />
              </div>
              <div className='col'>
                <TextField
                  label='BP'
                  id="filled-required"
                  variant="filled"
                  name='bp'
                  value={rowpatientdata && rowpatientdata.doctordetails ? rowpatientdata.doctordetails.bp :inputdata.bp}
                  onChange={handleinputChange}
               />
              </div>
              <div className='col'>
                <TextField
                  label='R-RATE'
                  id="filled-required"
                  variant="filled"
                  name='r_rate'
                  value={rowpatientdata && rowpatientdata.doctordetails ? rowpatientdata.doctordetails.r_rate :inputdata.r_rate}
                  onChange={handleinputChange}
               />
              </div>
              <div className='col'>
                <TextField
                  label='TEMPERATURE'
                  id="filled-required"
                  variant="filled"
                  name='temp'
                  value={rowpatientdata && rowpatientdata.doctordetails ? rowpatientdata.doctordetails.temp :inputdata.temp}
                  onChange={handleinputChange}
               />
              </div>
              
             </div>
             <div className='row ml-5 mr-3 mt-2'>
                <h6 className='col pt-2'>Systemic Examination :</h6>
                <div className='col'>
                <TextField
                  id="filled-required"
                  variant="filled"
                  className='diagnostextfeild'
                  name='systemic_exam'
                  value={rowpatientdata && rowpatientdata.doctordetails ? rowpatientdata.doctordetails.systemic_exam :inputdata.systemic_exam}
                  onChange={handleinputChange}
                />
                </div>
             </div>
             <div className='row ml-5 mr-3 mt-1'>
                <h6 className='col pt-2'>Final Diagnosis :</h6>
                <div className='col'>
                <TextField
                  id="filled-required"
                  variant="filled"
                  className='diagnostextfeild'
                  name='final_diagnosis'
                  value={rowpatientdata && rowpatientdata.doctordetails ? rowpatientdata.doctordetails.final_diagnosis :inputdata.final_diagnosis}
                  onChange={handleinputChange}
                />
                </div>
             </div>
             <div className='row ml-5 mr-3 mt-1'>
                <h6 className='col pt-2'>Added Services :</h6>
                <div className='col'>
                <TextField
                  id="filled-required"
                  variant="filled"
                  className='diagnostextfeild'
                  name='final_diagnosis'
                  value={rowpatientdata && rowpatientdata.doctordetails ? rowpatientdata.doctordetails.services.join(', ') : inputdata.final_diagnosis}
                  onChange={handleinputChange}
                />
                </div>
             </div>
             <div className='row ml-5 mr-3 mt-1'>
                <h6 className='col pt-2'>Added Medicines :</h6>
                <div className='col'>
                <TextField
                  id="filled-required"
                  variant="filled"
                  className='diagnostextfeild'
                  name='final_diagnosis'
                  value={rowpatientdata && rowpatientdata.doctordetails ? rowpatientdata.doctordetails.medicine.join(', ') : inputdata.final_diagnosis}
                  onChange={handleinputChange}
                />
                </div>
             </div>
             <div className='pt-2'>
              {rowpatientdata && rowpatientdata.doctordetails && rowpatientdata.doctordetails.medicindata &&(
                <div>
                  <TableContainer component={Paper} className='tablecontainer_main' >
                   <Table sx={{ minWidth: 700 }} aria-label="customized table">
                       <TableHead>
                          <TableRow>
                            <StyledTableCell align="right">Medicine Name</StyledTableCell>
                            <StyledTableCell align="right">Times In A Day</StyledTableCell>
                            <StyledTableCell align="right">Medicine Time</StyledTableCell>
                            <StyledTableCell align="right">After/Before Food</StyledTableCell>
                            <StyledTableCell align="right">No Of Days</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        {rowpatientdata.doctordetails.medicindata  &&(
                          <TableBody>
                          {rowpatientdata.doctordetails.medicindata.map((item)=>(
                            <TableRow>
                              <StyledTableCell align="right">{item.medicinename}</StyledTableCell>
                              <StyledTableCell align="right">{item.medicine_day}</StyledTableCell>
                              <StyledTableCell align="right">{item.medicine_time}</StyledTableCell>
                              <StyledTableCell align="right">{item.medicine_time_food}</StyledTableCell>
                              <StyledTableCell align="right">{item.no_of_days}</StyledTableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                        )}
                    </Table>
               </TableContainer>
                </div>
              )}
             </div>
             <div className='d-flex justify-content-center'>
             <Button variant='contained' sx={ {height:33,marginRight:7.5,marginTop:3} }  type='submit'>Submit</Button>
             </div>
          </form>
          )}
        </div>
          {/* </DialogContentText> */}
        {/* </DialogContent> */}
      </StyledDialoge>
      {/* medicine dialoge */}
      <StyledDialoge
      open={medicinDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={clickMedicinClose}
      aria-describedby="alert-dialog-slide-description"
     className='dialoge_class'
      >
                {medicinDialog ===true &&(
               <div>
              <TableContainer component={Paper} className='tablecontainer_main' >
                   <Table sx={{ minWidth: 700 }} aria-label="customized table">
                       <TableHead>
                          <TableRow>
                            <StyledTableCell align="right">Medicine Name</StyledTableCell>
                            <StyledTableCell align="right">Number of days</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        {newpatientData && newpatientData.medicinedata &&(
                          <TableBody>
                          {newpatientData.medicinedata.map((item)=>(
                            <TableRow>
                              <StyledTableCell align="right">{item.medicine}</StyledTableCell>
                              <StyledTableCell align="right">{item.no_of_days}</StyledTableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                        )}
                    </Table>
               </TableContainer>
            </div>
                )}

          
      </StyledDialoge>
    </div>
  )
}

export default Salesviewall