import React from 'react'
import { Button } from '@mui/material'
import { useState } from 'react'
import AddveiwAll from './AddveiwAll'
import Addservices from './Addservices'

const Services = () => {

    
    const [currentComponent,setNewcomponent] =useState(<Addservices/>) 
const OnclickUpdate=(componentname)=>{
  if(componentname=='addservice'){
    setNewcomponent(<Addservices/>)
  }
  else if(componentname=='addserviceveiwall')
  setNewcomponent(<AddveiwAll/>)
}
  return (
    <div className='Dashboard_maindiv'>
        <div className='d-flex' style={{position:'fixed'}}>
            <Button variant='contained' className='m-2' sx={ { borderRadius: 28,height:30 } } onClick={()=>{OnclickUpdate('addservice')}} >Add </Button>
            <Button variant='contained'  className='m-2' sx={ { borderRadius: 28,height:30 }} onClick={()=>{OnclickUpdate('addserviceveiwall')}} >View All</Button>
        </div>
        <div>
          {currentComponent}
        </div>
    </div>
  )
}

export default Services