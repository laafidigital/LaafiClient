import { Autocomplete, Button, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CustomTextField } from '../../../Styles/Autocomplete'
import { setCheklistStatus, setparentstatus } from '../../Store/DoctorFrame/KycDetailSlice'
import { GetSpecilization } from '../../Store/Actions'
import { GetIssuingAuthority, PatchAdminUpdateRegistrationDetails, PatchUpdateRegistrationDetails, PatchUpdateSpecializationCertificates, PatchUpdateSpecializationDetails, PostAdminUploadRegistrationCertificate, PostUploadRegistrationCertificate } from '../../Store/ApiReducers/Auth'
import { IoIosAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

const KycSpecialisation = () => {
const dispatch=useDispatch()
const formdata=new FormData()

const specialization=useSelector((state)=>state.KycDetails.specilization)
const issuingauthority=useSelector((state)=>state.KycDetails.issuingauthority)
const Dockycdetails=useSelector((state)=>state.KycDetails.kycDoctorId)

const [row,setrow]=useState({specilizationDetails:[{RegistrationType:'',RegistrationNumber:'',StartDate:'',EndDate:'',IssuingAuthority:'',SpecializationName:'',IsVerified:false,Notes:null}],specilizationcerificates:[]})
const [inputData,setinputData]=useState({SpecializationId:'',RegistrationType:'',RegistrationNumber:'',StartDate:'',EndDate:'',IssuingAuthority:'',SpecializationName:''})
const [spetializationId,setspecializationId]=useState(null)


useEffect(()=>{
 dispatch(GetSpecilization(''))
 dispatch(GetIssuingAuthority())
},[])


const handleAutocomplt=(e,value,type,index)=>{
  const updatedspecilizationDetails=[...row.specilizationDetails]
  
 if(type=='specialization'){
  if(value){
    updatedspecilizationDetails[index]={
      ...updatedspecilizationDetails[index],
      SpecializationName:value.SpecializationName
    }
    setrow({...row,specilizationDetails:updatedspecilizationDetails})
    setinputData({...inputData,SpecializationId:value.Id,SpecializationName:value.SpecializationName})
  }
 }else if(type=='issuingauthority'){
  if(value){
    updatedspecilizationDetails[index]={
      ...updatedspecilizationDetails[index],
      IssuingAuthority:value
    }
    setrow({...row,specilizationDetails:updatedspecilizationDetails})
    setinputData({...inputData,IssuingAuthority:value})
  }
 }
 
}

const handleinputchange=(e,index)=>{
  const updatedspecilizationcerificates=[...row.specilizationcerificates]
  const updatedspecilizationDetails=[...row.specilizationDetails]
  if (!updatedspecilizationcerificates[index]) {
    updatedspecilizationcerificates[index] = []; // Initialize the array if it doesn't exist
   }
  
  const{name,value,files}=e.target
  if(Dockycdetails){
    if(name=='image'){
      const file=files[0]
      updatedspecilizationcerificates[index].push(file)
      setrow({...row,specilizationcerificates:updatedspecilizationcerificates})
      // formdata.append('certificate',file)
      // dispatch(PostAdminUploadRegistrationCertificate(spetializationId,Dockycdetails,formdata))
      setspecializationId(null)
     }else{
       setinputData({
         ...inputData,
         [name]:value
       })
     }
  }
  else{
    if(name=='image'){
     const file=files[0]
     updatedspecilizationcerificates[index].push(file)
     setrow({...row,specilizationcerificates:updatedspecilizationcerificates})
    //  formdata.append('certificate',file)
    //  dispatch(PostUploadRegistrationCertificate(spetializationId,formdata))
     setspecializationId(null)
    }else{
      updatedspecilizationDetails[index]={
        ...updatedspecilizationDetails[index],
        [name]:value
      }
      setrow({...row,specilizationDetails:updatedspecilizationDetails})
      setinputData({
        ...inputData,
        [name]:value
      })
    }
  }
}

const clickAddBtn=()=>{
  const updatedspecilizationDetails=[...row.specilizationDetails]
  updatedspecilizationDetails.push({RegistrationType:'',RegistrationNumber:'',StartDate:'',EndDate:'',IssuingAuthority:'',SpecializationName:''})
  setrow({...row,specilizationDetails:updatedspecilizationDetails})
}

const clickDltBtn=(index)=>{
  const updatedspecilizationDetails=[...row.specilizationDetails]
  const updatedspecilizationcerificates=[...row.specilizationcerificates]
  if(index==0){
    updatedspecilizationDetails.push({RegistrationType:'',RegistrationNumber:'',StartDate:'',EndDate:'',IssuingAuthority:'',SpecializationName:''})
    setrow({...row,specilizationDetails:updatedspecilizationDetails,specilizationcerificates:[]})
  }
  else{
    updatedspecilizationDetails.pop(index)
    updatedspecilizationcerificates.pop(index)
    setrow({...row,specilizationDetails:updatedspecilizationDetails,specilizationcerificates:updatedspecilizationcerificates})
  }

}

const submitForm=(e)=>{
 e.preventDefault()
 const isallfeildfilled=Object.values(inputData).some(value=>value==='')

 if(Dockycdetails){
  if(!isallfeildfilled){
    formdata.append('SpecializationId',inputData.SpecializationId)
    formdata.append('SpecializationName',inputData.SpecializationName)
    formdata.append('RegistrationType',inputData.RegistrationType)
    formdata.append('RegistrationNumber',inputData.RegistrationNumber)
    formdata.append('StartDate',inputData.StartDate)
    formdata.append('EndDate',inputData.EndDate)
    formdata.append('IssuingAuthority',inputData.IssuingAuthority)
    dispatch(PatchAdminUpdateRegistrationDetails(Dockycdetails,formdata)).then((res)=>setspecializationId(res))
    setinputData({SpecializationId:'',RegistrationType:'',RegistrationNumber:'',StartDate:'',EndDate:'',IssuingAuthority:''})
   }
   else{
    alert('all feild is required')
   }
 }
 else{
   if(!isallfeildfilled){
    // formdata.append('SpecializationId',inputData.SpecializationId)
    // formdata.append('SpecializationName',inputData.SpecializationName)
    // formdata.append('RegistrationType',inputData.RegistrationType)
    // formdata.append('RegistrationNumber',inputData.RegistrationNumber)
    // formdata.append('StartDate',inputData.StartDate)
    // formdata.append('EndDate',inputData.EndDate)
    // formdata.append('IssuingAuthority',inputData.IssuingAuthority)
    row.specilizationcerificates.forEach(file=>formdata.append('Certificates',file))
    dispatch(PatchUpdateSpecializationCertificates(formdata))
    dispatch(PatchUpdateSpecializationDetails(row.specilizationDetails)).then((res)=>{
      if(res){
        setrow({specilizationDetails:[{RegistrationType:'',RegistrationNumber:'',StartDate:'',EndDate:'',IssuingAuthority:'',SpecializationName:'',IsVerified:false,Notes:null}],specilizationcerificates:[]})
      }
    }).catch((err)=>{

    })
    setinputData({SpecializationId:'',RegistrationType:'',RegistrationNumber:'',StartDate:'',EndDate:'',IssuingAuthority:''})
   }
   else{
    alert('all feild is required')
   }
 }
}
    

  return ( 
    <div>
    <form>
      {row && row.specilizationDetails.map((item,index)=>(
     <div style={{height:'400px'}}>
     <div className='admitform_main'>
        <div className='subadmitform'>
            <label>Specialization</label>
            <Autocomplete
              options={specialization}
              getOptionLabel={(option) => option.SpecializationName}
              onChange={(e,value)=>handleAutocomplt(e,value,'specialization',index)}
              renderInput={(params) => (
                  <CustomTextField {...params} required/>
              )}
            />
        </div>
        <div className='subadmitform'>
             <label>Registration Type</label>
             <Select
               required
               name='RegistrationType'
               onChange={(e)=>handleinputchange(e,index)}
               style={{height:'38px'}}
             >
              <MenuItem value='StateMedicalCouncil'> State Medical Council</MenuItem>
              <MenuItem value='MedicalSpecialty'> Medical Specialty</MenuItem>
              <MenuItem value='Temporary'> Temporary </MenuItem>
             </Select>
        </div>
        </div>
              
      <div className='admitform_main'>
        <div className='subadmitform'>
            <label>Registration Number</label>
            <input type='text' required name='RegistrationNumber'value={row &&row.specilizationDetails[index].RegistrationNumber} onChange={(e)=>handleinputchange(e,index)}/>
        </div>
        <div className='subadmitform'>
            <label>Start date</label>
            <input type='Date' required name='StartDate'value={row &&row.specilizationDetails[index].StartDate} onChange={(e)=>handleinputchange(e,index)}/>
        </div>
      </div>
      <div className='admitform_main'>
        <div className='subadmitform'>
             <label>End Date</label>
            <input type='Date' required name='EndDate' value={row &&row.specilizationDetails[index].EndDate} onChange={(e)=>handleinputchange(e,index)}/>
        </div>
        <div className='subadmitform'>
            <label>IssuingAuthority</label>
            <Autocomplete
              options={issuingauthority}
              getOptionLabel={(option) => option}
              onChange={(e,value)=>handleAutocomplt(e,value,'issuingauthority',index)}
              renderInput={(params) => (
                  <CustomTextField {...params} required/>
              )}
            />
        </div>
      </div>
      {/* {spetializationId &&( */}
      <div className='admitform_main'>
         <div className='subadmitform'>
             <label>Registration Certificate</label>
            <input type='file' required name='image'  onChange={(e)=>handleinputchange(e,index)}/>
        </div>
        <div className='subadmitform'>
          <label>Add Specialization</label>
          <Button variant='contained' style={{maxWidth:'4rem'}} endIcon={<IoIosAdd/>} onClick={clickAddBtn}> Add</Button>
        </div>
        <div className='subadmitform'>
          <label>Delete Specialization</label>
          <Button variant='contained' color='error'  style={{maxWidth:'6rem'}} endIcon={<MdDeleteOutline/>} onClick={(e)=>clickDltBtn(index)}>Delete</Button>
        </div>
      </div>
      {/* )} */}
     </div>
      ))}
      <div className='d-flex justify-content-end'>
        <div className='d-flex'>
            <Button onClick={submitForm}>submit</Button>
            <Button onClick={()=>dispatch(setCheklistStatus(true))}>cancel</Button>
        </div>
      </div>
    </form>
    </div>
  )
}

export default KycSpecialisation
