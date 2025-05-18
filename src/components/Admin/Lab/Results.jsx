import React, { useState } from 'react'
import { Button } from '@mui/material';
import { StyledButton } from '../../../Styles/Button';
import UpdateResult from './UpdateResult';
import PublishResult from './PublishResult';


const Results = () => {

const [currentComponent,setNewcomponent] =useState(<UpdateResult/>) 
const OnclickUpdate=(componentname)=>{
  if(componentname=='update'){
    setNewcomponent(<UpdateResult/>)
  }
  else if(componentname=='publish')
  setNewcomponent(<PublishResult/>)
}
  return (
    <div className='Dashboard_maindiv'>
        <div className='d-flex' style={{position:'fixed'}}>
            <StyledButton variant='contained' className='m-2' sx={ { borderRadius: 28,height:30 } } onClick={()=>{OnclickUpdate('update')}} >Pending</StyledButton>
            <StyledButton variant='contained'  className='m-2' sx={ { borderRadius: 28,height:30 }} onClick={()=>{OnclickUpdate('publish')}} >Completed</StyledButton>
        </div>
        <div>
          {currentComponent}
        </div>
    </div>
  )
}

export default Results