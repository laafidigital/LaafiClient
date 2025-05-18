import { Button, ListItemText, MenuItem, Select } from '@mui/material'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Getdoctorsonly, UploadProfilePicture } from '../../Store/Actions'
import { setCheklistStatus, setparentstatus } from '../../Store/DoctorFrame/KycDetailSlice'
import { GetRegisterdDoctors, PatchAdminUploadDoctorProfileDetails, PatchUpdateBasicProfileDetails, PostAdminUploadProfilePicture, PostUploadProfilePicture } from '../../Store/ApiReducers/Auth'

const KycProfileDetails = ({ onProfileUpdateComplete }) => {
    const dispatch=useDispatch()

    const token=localStorage.getItem('accessToken')
    const formdata=new FormData()
    const imageformdata=new FormData()

    const getregdoctors=useSelector((state)=>state.Adddoctor.registerddoctor)
    const Dockycdetails=useSelector((state)=>state.KycDetails.kycDoctorId)

    const[inputData,setinputData]=useState({Name:'',Email:'',PhoneNumber:'',Title:'Dr',Gender:'Male',Dob:'',Address:''})

    useEffect(()=>{
        if(Dockycdetails){
            dispatch(GetRegisterdDoctors(Dockycdetails))
        }
        else{
            const DecodedToken=jwtDecode(token)
            
            const userId=DecodedToken[`http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier`]
            
            dispatch(GetRegisterdDoctors(userId))
        }
    },[token])

    useEffect(()=>{
        if(getregdoctors){
            setinputData({
              ...inputData,
              Name:getregdoctors.Name ? getregdoctors.Name :'',
              PhoneNumber:getregdoctors.PhoneNumber ? getregdoctors.PhoneNumber :'',
              Email:getregdoctors.Email ? getregdoctors.Email :'',
          })
        }
    },[getregdoctors])

    const handleInpuChange=(e)=>{
      const{name,value,files}=e.target
      
      if(Dockycdetails){
        if(name=='ProfilePicture'){
            const file = e.target.files[0];
            imageformdata.append("picture",file)
            dispatch(PostAdminUploadProfilePicture(Dockycdetails,imageformdata))
            
          }
          setinputData({...inputData,[name]:value})
      }
      else{
          if(name=='ProfilePicture'){
            const file =files[0];
            
            setinputData({...inputData,ProfilePicture:file})
            
          }
          else{
            setinputData({...inputData,[name]:value})
          }
      }
    }

    const submitform = (e) => {
        e.preventDefault();
        formdata.append('Name', inputData.Name);
        formdata.append('Email', inputData.Email);
        formdata.append('PhoneNumber', inputData.PhoneNumber);
        formdata.append('Title', inputData.Title);
        formdata.append('Address', inputData.Address ? inputData.Address : null);
        formdata.append('Gender', inputData.Gender);
        formdata.append('Dob', inputData.Dob);
        formdata.append('ProfilePhoto', inputData.ProfilePicture ? inputData.ProfilePicture : null);
      
        if (Dockycdetails) {
          dispatch(PatchAdminUploadDoctorProfileDetails(Dockycdetails, formdata))
            .then(() => {
              if (onProfileUpdateComplete) {
                onProfileUpdateComplete(); 
              }
            })
            .catch((error) => {
              console.error('Error updating doctor profile:', error);
            });
        } else {
          dispatch(PatchUpdateBasicProfileDetails(formdata))
            .then(() => {
              if (onProfileUpdateComplete) {
                onProfileUpdateComplete();
              }
            })
            .catch((error) => {
              console.error('Error updating basic profile:', error);
            });
        }
      };

    const RequiredAsterisk = () => <span style={{ color: 'red' }}>*</span>;

  return (
    <div>
        <form onSubmit={submitform}>
        <div style={{height:'400px'}}>
            <div className='admitform_main'>
                <div className='subadmitform'>
                    <label>Name <RequiredAsterisk /></label>
                    <input type='text' required name='Name' value={inputData && inputData.Name} onChange={handleInpuChange}/>
                </div>
                <div className='subadmitform'>
                    <label>Email <RequiredAsterisk /></label>
                    <input type='email' required name='Email' value={inputData && inputData.Email} onChange={handleInpuChange}/>
                </div>
            </div>
            <div className='admitform_main'>
                <div className='subadmitform'>
                    <label>Phone no <RequiredAsterisk /></label>
                    <input type='text' required name='PhoneNumber' value={inputData && inputData.PhoneNumber} onChange={handleInpuChange}/>
                </div>
                <div className='subadmitform'>
                    <label>Title <RequiredAsterisk /></label>
                    <Select
                    onChange={handleInpuChange}
                    name='Title'
                    value={inputData.Title}
                    style={{height:'38px'}}
                    >
                        <MenuItem value='Dr'>Dr</MenuItem>
                        <MenuItem value='Mr'>Mr</MenuItem>
                        <MenuItem value='Ms'>Ms</MenuItem>
                        <MenuItem value='Mrs'>Mrs</MenuItem>
                    </Select>
                </div>
            </div>
            <div className='admitform_main'>
            <div className='subadmitform'>
                    <label>Address <RequiredAsterisk /></label>
                    <input type='text'  name='Address' value={inputData && inputData.Address} onChange={handleInpuChange}/>
                </div>
                <div className='subadmitform'>
                    <label>Gender <RequiredAsterisk /></label>
                    <Select
                    onChange={handleInpuChange}
                    name='Gender'
                    value={inputData.Gender}
                    style={{height:'38px'}}
                    >
                        <MenuItem value='Male'>Male</MenuItem>
                        <MenuItem value='Female'>Female</MenuItem>
                        <MenuItem value='All'>All</MenuItem>
                        <MenuItem value='Other'>Other</MenuItem>
                    </Select>
                </div>
            </div>
            <div className='admitform_main'>
                <div className='subadmitform'>
                    <label>Date of birth <RequiredAsterisk /></label>
                    <input type='date' required name='Dob' value={inputData && inputData.Dob} onChange={handleInpuChange}/>
                </div>
                <div className='subadmitform'>
                    <label>Profile picture <RequiredAsterisk /></label>
                    <input type='file'  name='ProfilePicture' onChange={handleInpuChange}/>
                </div>
              
            </div>
        </div>
        <div className='d-flex justify-content-end'>
            <div className='d-flex'>
                <Button type='submit'>submit</Button>
                <Button onClick={()=>dispatch(setCheklistStatus(true))}>cancel</Button>
            </div>
        </div>
            
        </form>
    </div>
  )
}

export default KycProfileDetails