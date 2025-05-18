import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetServiceGroups, GetServicesByGroupId } from '../../Store/Actions'
import { Button } from '@mui/material'
import { setservicegroupstatus } from '../../Store/AddservicesSlice'
import Servicebygroupid from '../../Admin/Reusablecomponents/Servicebygroupid'
import { setpatientservicestatus } from '../../Store/PatientFrame/Bookconsultation'

const ServiceGroup = () => {
    const dispatch=useDispatch()

    const getservicegroup=useSelector((state)=>state.Addservices.servicegroups)
    const getservicesbygroupid=useSelector((state)=>state.Addservices.servicesbygroupid)
    const patientservicestatus=useSelector((state)=>state.Bookconsultation.patientservicestatus)
    const selectedservices=useSelector((state)=>state.Bookconsultation.patientselectedservices)

    


    useEffect(()=>{
      dispatch(GetServiceGroups(''))
    },[])
    
  return (
    <div className='booklabservicegroup_maindiv'>
      {getservicegroup && getservicegroup.map((item)=>(
      <div className='booklabservicegroup_card'>
          <h5>{item.Name}</h5>
          <p className='pl-3'><li>{item.Description}</li></p>
          <div className='d-flex justify-content-center'>
            <Button size='small' variant='contained' onClick={()=>{
              dispatch(GetServicesByGroupId(item.Id))
              dispatch(setpatientservicestatus(true))
              }}>BOOk</Button>
          </div>
      </div>
      ))}
       {patientservicestatus &&(
         <Servicebygroupid data={getservicesbygroupid}/>
        )}
    </div>
  )
}

export default ServiceGroup
