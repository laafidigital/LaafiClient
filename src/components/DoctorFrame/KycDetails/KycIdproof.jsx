import { Button, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { setCheklistStatus, setparentstatus } from '../../Store/DoctorFrame/KycDetailSlice'
import { useDispatch, useSelector } from 'react-redux'
import { PatchAdminUpdateIdProof, PatchUpdateIdProof, PostAdminUploadIdProofDocument, PostUploadIdProofDocument } from '../../Store/ApiReducers/Auth'

const KycIdproof = () => {
    const dispatch=useDispatch()
    const formdata=new FormData()

    const Dockycdetails=useSelector((state)=>state.KycDetails.kycDoctorId)

    const[inputData,setinputData]=useState({IdProofType:''})

    const idproofType=[{name:'Aadhar card',value:'Aadhar_Card'},
                       {name:'Passport',value:'Passport'},
                       {name:'Pan card',value:'Pan_Card'},
                       {name:'Election commission card',value:'Election_Commision_Card'},
                       {name:'Driving license',value:'Driving_License'},
                       {name:'Passport',value:'Passport'},
                       {name:'Ration card with photo',value:'Ration_Card_With_Photo'},
                       {name:'Voter id',value:'Voter_Id'},
                      ]

    

    const handleInpuChange=(e)=>{
      const{name,value,files}=e.target
      if(Dockycdetails){
        if(name=='IdProofImage'){
          formdata.append('IdProof',files ? files[0] :null)
          
        }else{
          setinputData({...inputData,[name]:value})
        }
      }
      else{
        if(name=='IdProofImage'){
          formdata.append('IdProof',files ? files[0] :null)
          // dispatch(PostUploadIdProofDocument(formdata))
        }else{
          setinputData({...inputData,[name]:value})
        }
      }
    }

    const submitform=(e)=>{
      e.preventDefault()
      if(Dockycdetails){
        if(inputData.IdProofType){
          formdata.append('IdProofType',inputData.IdProofType)
          dispatch(PatchAdminUpdateIdProof(Dockycdetails,formdata))
          setinputData({IdProofType:''})
        }
      }else{
        if(inputData.IdProofType){
          formdata.append('IdProofType',inputData.IdProofType)
          dispatch(PatchUpdateIdProof(formdata))
          setinputData({IdProofType:''})
        }
      }
    }
  return (
    <div>
      <form onSubmit={submitform}>
      <div style={{height:'400px'}}>
        <div className='admitform_main'>
            <div className='subadmitform'>
                <label>Id Proof Type</label>
                <Select
                 required
                 onChange={handleInpuChange}
                 name='IdProofType'
                 value={inputData.IdProofType}
                 style={{height:'37px'}}
                >
                  {idproofType && idproofType.map(item=>
                  <MenuItem value={item.value}>{item.name}</MenuItem>
                  )}
                </Select>
                {/* <input type='text' required name='IdProofType' value={inputData.IdProofType} onChange={handleInpuChange}/> */}
            </div>
            <div className='subadmitform'>
                <label>Id Proof Image</label>
                <input type='file'  name='IdProofImage' value={inputData.IdProofImage} onChange={handleInpuChange}/>
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

export default KycIdproof
