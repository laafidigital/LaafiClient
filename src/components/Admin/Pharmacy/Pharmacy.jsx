import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Purchase from './Purchase'
import Sales from './Sales'
import Expired from './Expired'
import Inventory from './Inventory'
import Salesviewall from './Salesviewall'
import Addpatients from '../Patients/Addpatients'
import AddPharmacyPatients from './AddPharmacyPatients'
import { StyledButton } from '../../../Styles/Button';


const Pharmacy = () => {
    const navigate=useNavigate()
    const [currentcomponent,setCurrentComponent]=useState(<Purchase/>)
    const handleComponentChange = (componentName) => {
      if (componentName === 'purchase') {
          setCurrentComponent(<Purchase />);
      } else if (componentName === 'viewall') {
          setCurrentComponent(<Salesviewall />);
      }
      else if (componentName === 'expired') {
        setCurrentComponent(<Expired />);
    }
    else if (componentName === 'inventory') {
      setCurrentComponent(<Inventory />);
  }
  else if (componentName === 'addpharmacypatients') {
    setCurrentComponent(<AddPharmacyPatients />);
}
      // Add more conditions for other components if needed
  };
  return (
    <div className='Dashboard_maindiv'>
        <div className='d-flex' style={{position:'fixed',}}>
            <StyledButton variant='contained' className=' m-2 '  onClick={()=>{handleComponentChange('purchase');}}>Purchase</StyledButton>
            <StyledButton variant='contained'  className='m-2 '   onClick={()=>{handleComponentChange('viewall');}} >Sales</StyledButton>
            <StyledButton variant='contained'  className='m-2 '  onClick={()=>{handleComponentChange('expired');}} >Expired</StyledButton>
            <StyledButton variant='contained'  className='m-2 '  onClick={()=>{handleComponentChange('inventory');}}  >Inventory</StyledButton>
            {/* navigate:'addpharmacypatients' */}
            {/* <StyledButton variant='contained' className='m-2 '   onClick={()=>{handleComponentChange('');}}>Add patient</StyledButton> */}
        </div>

        <div className='currentcomponent_main'>
          {currentcomponent}
        </div>
    </div>
  )
}

export default Pharmacy