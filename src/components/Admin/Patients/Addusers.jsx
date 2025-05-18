import React from 'react'
import { FormControl } from '@mui/base/FormControl';
import { Button, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useSelector,useDispatch } from 'react-redux';
import { setAddUserInput,setErrorInput } from '../../Store/AddusersSlice';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

const Addusers = () => {
    const dispatch=useDispatch()
    const userinputdata=useSelector((state)=>state.Addusers.adduserInput)
    const Depdetails=useSelector((state)=>state.Departmentdetails)
    const errors=useSelector((state)=>state.Addusers.error)
    // const [errors, setErrors] = useState({
    //     location: '',
    //     name: '',
    //     email: '',
    //     department: '',
    //     password: '',
    //     confirmpassword: '',
    // });

   
    

    const onchangeUserinput=(e)=>{
        const {name,value}=e.target
        dispatch(setAddUserInput({name,value}))
      
    }
    const validateForm=()=>{
      

        const newErrors = {
            location: '',
            name: '',
            email: '',
            department: '',
            password: '',
            confirmpassword: '',
        };
        if (!userinputdata.location) {
            newErrors.location = 'Location is required';
        }
        if (!userinputdata.name) {
            newErrors.name = 'Name is required';
        }
        if (!userinputdata.email) {
            newErrors.email = 'email is required';
        }
       else if (!/^\S+@\S+\.\S+$/.test(userinputdata.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!userinputdata.department) {
            newErrors.department = 'department is required';
        }
         else if (userinputdata.department === 'Select department') {
            newErrors.department = 'Please select a department';
        }
        if (!userinputdata.password) {
            newErrors.password = 'password is required';
        }
         else if (userinputdata.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (!userinputdata.confirmpassword) {
            newErrors.confirmpassword = 'confirmpassword is required';
        }
        if (userinputdata.confirmpassword !== userinputdata.password) {
            newErrors.confirmpassword = 'Passwords do not match';
        }

        // Update error state
       dispatch(setErrorInput(newErrors)) ;
    };

const submitForm=(e)=>{
    e.preventDefault(); 
    validateForm()
    
 
}

  return (
    <div>
        <div className='Dashboard_maindiv'>
            <div className='d-flex justify-content-center'>
                <form onSubmit={submitForm}>
                <FormControl style={{paddingTop:'30px'}} >
                <div className='addpatient_sub1'>
                    <div class="mb-3 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Location:</label>
                        <div className='adduserinput' >
                        <input type="text" readonly class="form-control" name='location' value={userinputdata.location} onChange={onchangeUserinput}/>
                        <div className='error-message'>{errors.location}</div>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Name:</label>
                        <div className='adduserinput'>
                        <input type="text" class="form-control" name='name'  value={userinputdata.name} onChange={onchangeUserinput}  />
                        <div className='error-message'>{errors.name}</div>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Email:</label>
                        <div className='adduserinput'>
                        <input type="Email" readonly class="form-control" name='email'  value={userinputdata.email} onChange={onchangeUserinput} />
                        <div className='error-message'>{errors.email}</div>
                        </div>
                    </div>
                    {/* <div class="mb-3 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Department:</label>
                        <div className='adduserinput'>
                        <FormControl sx={{ m: 1, width: 400 }}>
                                <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                name='department'
                                value={userinputdata.department}
                                onChange={onchangeUserinput}
                               
                                // displayEmpty   
                                style={{width:'300px',height:'40px'}}
                                val
                                >
                              {Depdetails && Depdetails.map((dep,index)=>(
                                  <MenuItem  value={dep[0]} key={index}>
                                      {dep[0]}
                                  </MenuItem>
                              ))} 
                               </Select>

                        </FormControl>
                        <div className='error-message'>{errors.department}</div>
                        </div>
                    </div> */}
                    <div class="mb-3 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Password:</label>
                        <div className='adduserinputpassword'>
                        <input type="password" readonly class="form-control" name='password'  value={userinputdata.password} onChange={onchangeUserinput}  />
                        <IconButton className='passwordicon'>
                           <VisibilityIcon />
                        </IconButton>
                        </div>
                        <div className='error-message2'>{errors.password}</div>
                    </div>
                    <div class="mb-3 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Confirm Password:</label>
                        <div className='adduserinputpassword'>
                        <input type="password" readonly class="form-control" name='confirmpassword'  value={userinputdata.confirmpassword} onChange={onchangeUserinput} />
                        <IconButton className='passwordicon'>
                            <VisibilityIcon />
                        </IconButton>
                        </div>
                        <div className='error-message2'>{errors.confirmpassword}</div>
                    </div>
                    <div  className='d-flex justify-content-center'>
                    <Button variant='contained ' type='submit'>submit</Button>
                    </div>
                    </div>
            </FormControl>
            </form>
            </div>
        </div>
    </div>
  )
}

export default Addusers