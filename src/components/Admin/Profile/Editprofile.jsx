import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import FileBase64 from 'react-file-base64';
import { useSelector,useDispatch } from 'react-redux';
import { setEditInput,setEditError } from '../../Store/EditProfileSlice';
import { jwtDecode } from 'jwt-decode';
import {GetUserById } from '../../Store/Actions';
import { GetStaff } from '../../Store/ApiReducers/Auth';

const Editprofile = () => {


  const dispatch=useDispatch()

  const user=useSelector((state)=>state.Assignrole.userbyid)
  
  const error=useSelector((state)=>state.Editprofile.Editerror)

  const [inputdata,setinputdata]=useState({name:'',email:'',phone:'',current_password:'',new_password:'',confirm:''})


  const token=localStorage.getItem('accessToken')
  const decodedToken=jwtDecode(token)
  const Id=decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]

 
  useEffect(()=>{
   if(Id && user==null){
    dispatch(GetStaff(Id))
   }
    if(user){
      setinputdata((prev)=>({
        ...prev,
        name:user.userName,
        email:user.email
      }))

    }
   
  },[user])
 
  const ChangeInput=(e)=>{
    const {name,value}=e.target
    setinputdata((prev)=>({
      ...prev,
      [name]:value
    }))
    dispatch(setEditInput({name,value}))
    
  }

const VadidateEditProfile=(e)=>{

      const newError={
        name:'',
        email:'',
        phone:'',
        current_pass:'',
        new_pass:'',
        confirm_pass:'' 
      } 

      if(!inputdata.name){
        newError.name='require name';
      }

      if(!inputdata.email){
        newError.email='require email';
      }
      else if (!/^\S+@\S+\.\S+$/.test(inputdata.email)) {
        newError.email = 'Invalid email format';
      }
      if(!inputdata.phone){
        newError.phone='require number';
      }
      if(!inputdata.current_password){
        newError.current_pass='require current password';
      }
      if(!inputdata.new_password){
        newError.new_pass='require new password';
      }
      if(!inputdata.confirm){
        newError.confirm_pass='require confirm password';
      }

      dispatch(setEditError(newError))
    }
  
    const submitEditForm=(e)=>{
      e.preventDefault()
      VadidateEditProfile()
    }

  return (
    <div className='edit_maindiv' >
      <form onSubmit={submitEditForm}> 
        {/* <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    ></Box> */}
        <div className='edit_subdiv1 '>
        <TextField
          required
          id="filled-required"
          label="Name"
          defaultValue="Jhon"
          variant="filled"
          className='m-2'
          style={{backgroundColor:"white"}}
          name='name'
          value={inputdata.name}
          onChange={ChangeInput}
        />
        <div className='error-message'>{error.name}</div>
        <TextField
          required
          id="filled-required"
          label="Email"
          type='email'
          defaultValue="Jhon@gmail.com"
          variant="filled"
          className='m-2'
          style={{backgroundColor:"white"}}
          name='email'
          value={inputdata.email}
          onChange={ChangeInput}
        />
          <div className='error-message'>{error.email}</div>

          <TextField
            id="filled-number"
            label="PHONE"
            type="number"
            style={{backgroundColor:"white"}}
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
            className='m-2'
            name='phone'
            value={inputdata.phone}
            onChange={ChangeInput}
          />
          <div className='error-message'>{error.phone}</div>

          <div className='pl-2'>
          <FileBase64
          multiple={ false }
          onDone={(res)=>{
          }}
          />
          </div>
        <TextField
          id="filled-password-input"
          label="Current Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
          className='m-2'
          style={{backgroundColor:"white"}}
          name='current_password'
          value={inputdata.password}
          onChange={ChangeInput}
        />
        <div className='error-message'>{error.current_pass}</div>

        <TextField
          id="filled-password-input"
          label="New Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
          className='m-2'
          style={{backgroundColor:"white"}}
          name='new_password'
          value={inputdata.new_password}
          onChange={ChangeInput}
        />
         <div className='error-message'>{error.new_pass}</div>

        <TextField
          id="filled-password-input"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
          className='m-2'
          style={{backgroundColor:"white"}}
          name='confirm_password'
          value={inputdata.confirm_password}
          onChange={ChangeInput}
        />
        <div className='error-message'>{error.confirm_pass}</div>

        <Button variant='contained' className='m-2' sx={ { borderRadius: 28,width:100 } } type='submit'>Submit</Button>   
        </div>
        </form>
    </div>
  )
}

export default Editprofile