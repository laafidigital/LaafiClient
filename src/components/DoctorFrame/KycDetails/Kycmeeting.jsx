import { Button } from '@mui/material'
import React from 'react'
import { setCheklistStatus } from '../../Store/DoctorFrame/KycDetailSlice'
import { useDispatch } from 'react-redux'

const Kycmeeting = () => {
    const dispatch=useDispatch()
  return (
    <div>
        <div className='d-flex justify-content-center align-items-center flex-column' style={{height:'400px',gap:'4rem'}}>
            <h4>I have my own meeting link (zoom)</h4>
            <Button variant='contained' onClick={()=>window.location.href='https://zoom.us/oauth/authorize?client_id=Ex6IDDIjQuCwGfPCwSUdA&response_type=code&redirect_uri=https%3A%2F%2Flaafi.in%2Fdoctor%2Fdoctordashboard'}>Login for meeting link</Button>
            <h4>* You can always update your preference later from your profilepage</h4>
       
        </div>
        <div className='d-flex justify-content-end'>
                <div className='d-flex'>
                    <Button onClick={()=>dispatch(setCheklistStatus(true))}>cancel</Button>
                </div>
        </div>
    </div>
  )
}

export default Kycmeeting
