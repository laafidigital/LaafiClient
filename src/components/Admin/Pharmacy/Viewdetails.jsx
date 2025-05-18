import React from 'react'
import { Button } from '@mui/material'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import { FormControl } from '@mui/base/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch, useSelector } from 'react-redux';
import { StyledSelect } from '../../../Styles/Select';


const Viewdetails = () => {
    const navigate=useNavigate()
  const dispatch=useDispatch()
  const counsultancydata=useSelector((state)=>state.Addpatentdetails.consultationarray)
  const inputdata=useSelector((state)=>state.DiagnosePatient.diagnosisinputdata)
  const labdetails=useSelector(state=>state.Addservices.addServicesArray)
  const purchasedata=useSelector((state)=>state.purchase.purchaseArray)
  const diagnosiedpatient=useSelector((state)=>state.DiagnosePatient.diagnosepatient)
  


  const mrnid=useParams()
  const mrnId = parseInt(mrnid.id);

  const [searchQuery, setSearchQuery] = useState('');

  const selecteddata=counsultancydata.filter((item) => item.mrnno === mrnId)
  
  const submitForm=(e)=>{
  
    navigate('/doctor/mypatients')
  }
  return (
    <div className='Dashboard_maindiv'>
      
      <div className='pt-3'>
        <div className='diagnosis_main p-2'>
          <form onSubmit={submitForm}>
             <div className='row ml-5 mr-3 mt-1'>
                <h6 className='col pt-2 diagnosishead'>Patient Name :</h6>
                <div className='col'>
                <TextField
                  required
                  id="filled-required"
                  variant="filled"
                  className='diagnostextfeild'
                  name='patientname'
                  value={selecteddata[0].name}
                />
                </div>
             </div>
             <div className='row ml-5 mr-3 mt-1'>
                <h6 className='col pt-2'>Cheif Complaints :</h6>
                <div className='col'>
                <TextField
                 
                  id="filled-required"
                  variant="filled"
                  className='diagnostextfeild'
                  name='cheif_complaints'
                  value={inputdata.cheif_complaints}
              
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
                  value={inputdata.hpi}
               
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
                  value={inputdata.past_history}
                 
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
                  value={inputdata.family_history}

               />
              </div>
             </div>
             <div className='row ml-5 mt-2'>
               <h6 className='col pt-2'>Genral Examination :</h6>
               <div className='col'>
                <TextField
                 
                  label='PULSE'
                  id="filled-required"
                  variant="filled"
                  name='pulse'
                  value={inputdata.pulse}
                 

               />
              </div>
              <div className='col'>
                <TextField
                 
                  label='BP'
                  id="filled-required"
                  variant="filled"
                  name='bp'
                  value={inputdata.bp}
                 

               />
              </div>
              <div className='col'>
                <TextField
                 
                  label='R-RATE'
                  id="filled-required"
                  variant="filled"
                  name='r_rate'
                  value={inputdata.r_rate}
                  

               />
              </div>
              <div className='col'>
                <TextField
                 
                  label='TEMPERATURE'
                  id="filled-required"
                  variant="filled"
                  name='temp'
                  value={inputdata.temp}
                 

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
                  value={inputdata.systemic_exam}
                 

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
                  value={inputdata.final_diagnosis}
                 

                />
                </div>
             </div>
             <div className='row ml-5 mr-3 mt-1' >
                <h6 className='col pt-2'>Add Services :</h6>
                <div className='col'>
                <FormControl sx={{ m: 1, width: 400 }}>
                                <StyledSelect
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                name='addservices'
                                value={inputdata.services}
                               
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
                                {labdetails.map((name,index) => (
                                  <MenuItem key={index} value={name.servicename} className='menuitems'>
                                  <Checkbox 
                                  checked={inputdata.services.indexOf(name.servicename) > -1} 
                                  />
                                  <ListItemText primary={name.servicename} />
                                  </MenuItem>
                              ))}
                                </StyledSelect>
                        </FormControl>
                </div>
             </div>
             <div className='row ml-5 mr-3 mt-1' >
                <h6 className='col pt-2'>Add Medicine :</h6>
                <div className='col'>
                <FormControl sx={{ m: 1, width: 400 }}>
                              
                                      <TextField
                                      label="Search Medicine"
                                      name="searchText"
                                      value={searchQuery}
                                      
                                      style={{ width: '300px', marginLeft: '5px' }}
                                      InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                            <SearchIcon />
                                          </InputAdornment>
                                        ),
                                      }}
                                    />
                                <StyledSelect
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                name='addmedicine'
                                value={inputdata.medicine}
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
                                {purchasedata.filter((name) =>
                                    name.items.toLowerCase().includes(searchQuery.toLowerCase())
                                  ).map((name,index) => (
                                  <MenuItem key={index} value={name.items} className='menuitems'>
                                  <Checkbox 
                                  checked={inputdata.medicine.indexOf(name.items) > -1} 
                                  />
                                  <ListItemText primary={name.items} />
                                  </MenuItem>
                              ))}
                                </StyledSelect>
                        </FormControl>
                </div>
             </div>
             <div className='d-flex justify-content-end'>
             <Button variant='contained' sx={ {height:33,marginRight:7.5,marginTop:3} }  type='submit'>Submit</Button>
             </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Viewdetails