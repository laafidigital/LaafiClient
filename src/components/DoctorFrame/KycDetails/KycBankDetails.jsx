import { Button, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'
import {setCheklistStatus} from '../../Store/DoctorFrame/KycDetailSlice';
import { useDispatch } from 'react-redux';
import { PatchUpdateBankDetails } from '../../Store/ApiReducers/Auth';


const KycBankDetails = () => {
    const dispatch=useDispatch()
    const formdata=new FormData()
    const[inputData,setinputData]=useState({NameOnAccount :'',AccountNo:'',confirmAccountNo:'',IFSCode:'',AccountType:'',SwiftCode:'',Fee:''})
    const [error,seterror]=useState({err:'',fee:''})
    
    
    const handleInpuChange=(e)=>{
        const {name,value}=e.target
        setinputData({...inputData,[name]:value})
        if(name==='confirmAccountNo'){
            if(!inputData.AccountNo){
                seterror({err:'please enter the account no first'})
            }
            else if(inputData.AccountNo!==value){
                seterror({err:'account no mismatch'})
            }
            else{
                seterror({err:''})
            }
        }
        else if(name==='Fee'){
            if(value>=5000){
                seterror({fee:'The fee you are entering is little high please confirm'})
            }
            else{
                seterror({fee:''})

            }
        }
    }

    const submitform=(e)=>{
        e.preventDefault()
        // formdata.append('AccountNo',inputData.AccountNo)
        // formdata.append('NameOnAccount',inputData.NameOnAccount)
        // formdata.append('IFSCode',inputData.IFSCode)
        // formdata.append('AccountType',inputData.AccountType)
        // formdata.append('SwiftCode',inputData.SwiftCode)
        // formdata.append('Fee',inputData.Fee)
        if(!error.err){
            dispatch(PatchUpdateBankDetails(inputData)).then((res)=>{
                if(res){
                    setinputData({NameOnAccount :'',AccountNo:'',confirmAccountNo:'',IFSCode:'',AccountType:'',SwiftCode:'',Fee:''})
                }
            }).catch((err)=>{

            })
        }
    }

  return (
    <div>
    <form onSubmit={submitform}>
    <div style={{height:'400px'}}>
        <div className='admitform_main'>
            <div className='subadmitform'>
                <label>Acc Holder Name</label>
                <input type='text' required name='NameOnAccount' value={inputData.NameOnAccount} onChange={handleInpuChange}/>
            </div>
            <div className='subadmitform'>
                <label>Acc No</label>
                <input type='number' required name='AccountNo' value={inputData.AccountNo} onChange={handleInpuChange}/>
            </div>
        </div>
        <div className='admitform_main'>
            <div className='subadmitform'>
                <label>Confirm Acc No</label>
                <input type='number' required name='confirmAccountNo' value={inputData && inputData.confirmAccountNo} onChange={handleInpuChange}/>
                {error && error.err &&(<h4>{error.err}</h4>)}
            </div>
            <div className='subadmitform'>
                <label>IFSC Code</label>
                <input type='text' required  name='IFSCode' value={inputData.IFSCode} onChange={handleInpuChange}/>
            </div>
        </div>
        <div className='admitform_main'>
            <div className='subadmitform'>
                <label>Acc Type</label>
                <Select
                onChange={handleInpuChange}
                name='AccountType'
                value={inputData.Gender}
                style={{height:'38px'}}
                >
                    <MenuItem value='savings'>Savings</MenuItem>
                    <MenuItem value='current'>Current</MenuItem>
                </Select>
            </div>
            <div className='subadmitform'>
                <label>Swift Code</label>
                <input type='text'  name='SwiftCode' value={inputData.SwiftCode} onChange={handleInpuChange}/>
            </div>
        </div>
        <div className='admitform_main'>
            <div className='subadmitform'>
                <label>Fee</label>
                <input type='number' required name='Fee' value={inputData.Fee} onChange={handleInpuChange}/>
                {error.fee &&(<h4>{error.fee}</h4>)}
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

export default KycBankDetails
