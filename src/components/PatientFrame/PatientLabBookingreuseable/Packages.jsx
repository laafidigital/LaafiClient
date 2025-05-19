import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetPackages } from '../../Store/Actions'
import { Button, IconButton } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { setbooklabselectectedPackages } from '../../Store/AddpackageSlice';

const Packages = () => {
    const dispatch=useDispatch()

    const getpackages=useSelector((state)=>state.Addpackages.getpackages)
    const bookedlab=useSelector((state)=>state.Addpackages.booklabselectedpackages)

    const[isviewAll,setisviewAll]=useState(null)
     
 

    useEffect(()=>{
      if(getpackages &&getpackages.length==0){
        dispatch(GetPackages())
      }
    },[getpackages])
  return (
    <div>
      <div className='booklabpackages_maindiv'>
      {getpackages && getpackages.map((item)=>(
      <div className='booklabpackage_card'>
          <h5>{item.Name}</h5>
          <div className='booklablinked_services'>
            <div className='d-flex'>
              <h6 className='pt-2'>Linked Services</h6>
                {isviewAll==item.Id ?(
                  <IconButton onClick={()=>setisviewAll(null)}>
                  <KeyboardArrowUpIcon/>
                 </IconButton>
                ):(
                  <IconButton onClick={()=>setisviewAll(item.Id)}>
                  <KeyboardArrowDownIcon/>
               </IconButton>
                )}
                <h6 className='pt-2 pl-5'>Price:{item.Price}</h6>
            </div>
              {isviewAll && item.Id==isviewAll &&(
              <div>
                {item.ServiceList.map((inneritem,index)=>(
                  <div className='d-flex'>
                    <p>{index+1}:</p>
                    <p>{inneritem.ServiceName}</p>
                  </div>
                ))}
              </div>
              )}
          </div>
        <div className='d-flex justify-content-center'>
          <Button size='small' variant='contained' onClick={()=>dispatch(setbooklabselectectedPackages(item.Id))}>BOOk</Button>
        </div>
      </div>
      ))}
    </div>
    </div>
  )
}

export default Packages
