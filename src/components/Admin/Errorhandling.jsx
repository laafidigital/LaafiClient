import React, { useEffect, useState } from 'react'
import loginImage from '../../assets/loginbackgroudcompressed.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { display } from '@mui/system';
import { setError } from '../Store/ErrorSlice';

const Errorhandling = () => {
    const dispatch=useDispatch()
    
    const error=useSelector((state)=>state.Errorhandle.errors)
    const [diplayErr,setdisplayErr]=useState(null)
    
    const ErrorMessages={
         404:'A error occured, Page not found, check the URL and try again.',
         400:'A error occured, Page not found, check the URL and try again.',
         401 :'Unauthorized please check your username And password',
         500 :'Web server is too busy',
    }
   

    useEffect(()=>{
      if(error && error.data && error.data.status==404){
       setdisplayErr(ErrorMessages[404])
      }
      else if(error && error.status==400){
          setdisplayErr(ErrorMessages[400])
       }
      else if(error && error.status==401){
        setdisplayErr(ErrorMessages[401])
      }
      else if(error && error.status==500){
        setdisplayErr(ErrorMessages[500])
      }
     else{
        setdisplayErr(null)
      }
    },[error,diplayErr])

    return (
  
            <div className='error_maindiv'>
                <div className='errorsubdiv'>
                    <div className="container">
                        <h1 className='errh1'>:(</h1><br />
                        <h2> Oops Page Not Found</h2><br /><br />
                        <h3>
                            <a href="/">Return to home</a>&nbsp;&nbsp;
                            <div className='errorClickdiv' 
                                onClick={() => 
                                    {window.history.back()
                                    dispatch(setError(null))
                                   }}
                            >Go Back</div>
                        </h3>
                    </div>
                </div>
            </div>
        
    );
};
export default Errorhandling