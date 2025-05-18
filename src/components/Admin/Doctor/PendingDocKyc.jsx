import { Button, Card, Dialog, DialogActions, DialogContent, IconButton, MenuItem, Select } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { FaUserDoctor } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { baseimageUrl } from '../../Store/Actions';
import { GetDepartmentData } from '../../Store/ApiReducers/Auth';
import { setemptkycacceptresponse, setemptkyrejectresponse } from '../../Store/DoctorFrame/KycDetailSlice';
import { toast, ToastContainer } from 'react-toastify';
import { GetDoctorsWithPendingKyc, GetGenerateaSasToken, PatchAcceptKyc, PatchRejectKyc } from '../../Store/ApiReducers/Auth';


const PendingDocKyc = () => {
    const dispatch=useDispatch()
    const sasstoken=localStorage.getItem('sasstoken')

    const pendingdoctors=useSelector((state)=>state.KycDetails.doctorswithpendingkyc)
    const acceptresponse=useSelector((state)=>state.KycDetails.kycacceptpatchresponse)
    const rejectresponse=useSelector((state)=>state.KycDetails.kycrejectpatchresponse)
    const getdepartment=useSelector((state)=>state.Adddepartment.departmentArray)


    const[sassToken,setsassToken]=useState()
    const[department,setdepartment]=useState({departmentId:'',fee:'',Id:''})
    const[Open,setOpen]=useState(false)

  

    useEffect(()=>{
     dispatch(GetDoctorsWithPendingKyc())
     dispatch(GetDepartmentData())
    },[])

    useEffect(()=>{
        if(acceptresponse || rejectresponse){
            dispatch(GetDoctorsWithPendingKyc())
            dispatch(setemptkycacceptresponse())
            dispatch(setemptkyrejectresponse())
        }
        else if(sasstoken){
         sassCheck()
        }
        else{
            dispatch(GetGenerateaSasToken(''))
        }
    },[acceptresponse,rejectresponse])

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

    const Acceptkyc=(id)=>{
      setOpen(!Open)
      setdepartment({...department,Id:id})
      if(department.departmentId==''){
        toast('Please Select A Department')
      }
    }

    const submitAcceptkyc=()=>{
      const isallfeildempty=Object.values(department).some(item=>item=='')

      if(!isallfeildempty){
        dispatch(PatchAcceptKyc(department.Id,department.departmentId,department.fee))
        setdepartment({departmentId:'',fee:'',Id:''})
        setOpen(!Open)
      }
      else{
        toast('Please Check All The Feild')
      }
    }

  return (
    <div>
      <div className='d-flex justify-content-center'>
          <Select
           style={{width:'300px'}}
           onChange={(e)=>setdepartment({...department,departmentId:e.target.value})}
          >
            {getdepartment && getdepartment.map(item=>
            <MenuItem value={item.Id}>{item.Name}</MenuItem>
            )}
          </Select>
      </div>
      <div className='pending_doc_main'>
          <ToastContainer/>
          {pendingdoctors && pendingdoctors.length>0 ?(
              pendingdoctors.map((item)=>(
              <Card sx={{display:'flex',maxWidth:345,minWidth:345,margin:5}}>
              <Box sx={{backgroundColor:'#9de3c9'}}>
                  <div className='d-flex flex-column m-2'>
                      <h5>Name:{item.Name}</h5>
                      <h5>Phone:{item.PhoneNumber}</h5>
                      {item.ProfilePic ?(
                      <>
                      <img src={`${item.ProfilePic}?${sassToken}`} style={{height:'50px',width:'50px',borderRadius:'50%'}}></img>
                      </>
                      ):(
                      <IconButton style={{backgroundColor:'white',width:'50px',height:'50px'}}>
                          <FaUserDoctor/>
                      </IconButton>
                      )}
                  </div>
              </Box>
              <Box sx={{display:'flex',flexDirection:'column',marginLeft:5,justifyContent:'space-around'}}>
                  <Button variant='contained' color='success' onClick={()=>Acceptkyc(item.Id)}>Accept</Button>
                  <Button variant='contained' color='error' onClick={()=>dispatch(PatchRejectKyc(item.Id))}>Reject</Button>
              </Box>
              </Card>
              ))
          ):(
              <div className='d-flex justify-content-center' style={{width:'100%'}}>
                  <h4>No Kyc Pending Doctors</h4>
              </div>
          )}
      </div>
      <Dialog open={Open}>
        <DialogContent>
          <label>Fees</label>
          <input style={{width:'300px',height:'40px'}} type='number' onChange={(e)=>setdepartment({...department,fee:parseInt(e.target.value)})}></input>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitAcceptkyc}>submit</Button>
          <Button onClick={()=>setOpen(!Open)}>cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default PendingDocKyc
