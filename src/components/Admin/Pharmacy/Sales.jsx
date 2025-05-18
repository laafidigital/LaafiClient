import React from 'react'
import {Button} from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Salesviewall from './Salesviewall';
import { useSelector } from 'react-redux';



const top100Films = [
  { label: 'Arjun', year: 1994 },
  { label: 'Rohan', year: 1972 },
  { label: 'Abulla', year: 1974 },
  { label: 'kishor', year: 2008 },
]



const Sales = () => {

  const navigate=useNavigate()
  const [viewall,setveiwall]=useState('')
  const patientserachdata=useSelector((state)=>state.Addpatentdetails.addiputdataToarray)

  const onchangePatientsearch=(e)=>{

  }

    
  const clickViewallbtn=(componentName)=>{
  if (componentName === 'viewall') {
    setveiwall(<Salesviewall />);
 }
 
}


  return (
    <div>
    
    <div className='d-flex purchase_main'>

        <div>
          {/* <h6>Search For Patients</h6> */}
          <Button variant='contained' endIcon={<ExpandMoreIcon/>} onClick={()=>{clickViewallbtn('viewall')}}>View all</Button>
        </div>
      </div>
      <div>
        {viewall}

      </div>
      

    </div>
  )
}

export default Sales