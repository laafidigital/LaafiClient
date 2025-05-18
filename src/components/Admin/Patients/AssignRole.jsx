import { Autocomplete, Button, FormControl, IconButton, ListItemText, MenuItem, styled, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { StyledSelect } from '../../../Styles/Select';
import {Select,Checkbox,ListItem} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserById } from '../../Store/Actions';
import { ToastContainer } from 'react-toastify';
import CancelIcon from '@mui/icons-material/Cancel';
import { GetRoles, GetStaff, PostRoles } from '../../Store/ApiReducers/Auth';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiAutocomplete-popupIndicator': {
    color: 'white', // Ensure the dropdown icon color is set to white
  },
  '& .MuiInputBase-input': {
    color: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'black',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
     '& .MuiSelect-icon': {
      color: 'white', // Set the dropdown icon color to white
    },
  },
  // width: '300px',
}));


const AssignRole = () => {
    const dispatch=useDispatch()
    const getusers=useSelector(state=>state.Assignrole.userbyid)
    const getroles=useSelector(state=>state.Assignrole.roleresult)

    
    const [selectedData,setselectedData]=useState({users:[],roles:[],names:[]})
    const [selectedUser,setselectedUser]=useState([])
    const [inputtedvalue,setinputedvalue]=useState([])
    
   
    
    useEffect(()=>{
   
        dispatch(GetRoles())
    },[])

    const autoCompleteInput=(event, newInputValue)=>{
   
      setinputedvalue(newInputValue)
      dispatch(GetStaff(newInputValue))
    }

    const onChangeInput=(e,newvalue)=>{
     
      const {name,value}=e.target
      if(name==='roles'){
        const selectedroles=e.target.value
        setselectedData((prev)=>({
          ...prev,
          roles:selectedroles
        }))
      }else{
        if(newvalue){
          setselectedData((prev)=>({
            ...prev,
            users:[...prev.users,newvalue.Id],
            names:[...prev.names,`${newvalue.Name}(${newvalue.PhoneNumber})`]
          }))
        }
      }
      
    }
    
    const RemoveUser=(index)=>{
   
      setselectedData((prev)=>{
        const updatedusers=[...prev.users]
        const updatedname=[...prev.names]
        updatedusers.splice(index,1)
        updatedname.splice(index,1)
        return{
          ...prev,
          users:updatedusers,
          names:updatedname
        }
      })
    }
    
    

    const submitForm=(e)=>{
      e.preventDefault()
      const updatedData={
        userIds:selectedData.users,
        roleName: selectedData.roles[0]
      }
      dispatch(PostRoles(updatedData))
      setselectedData({users:[],roles:[],names:[]})
    }

  return (
    <div className='assignrole_main'>
       <ToastContainer/>
        <div className='assignmain' >
          <form className='p-4' onSubmit={submitForm}>
            <div> 
              {selectedData.names &&selectedData.names.length>0 &&(
                <>
                <h5 className='pl-2' style={{color:'white'}}>SELECTED USERS</h5>
                <div className='assignrole_selectedusers'>
                  {selectedData.names.map((item,index)=>(
                    <div>
                      <h5>{item}</h5>
                      <IconButton style={{color:'red'}} onClick={()=>RemoveUser(index)}>
                        <CancelIcon/>
                      </IconButton>
                    </div>
                  ))}
                </div>
                </>
              )}
                <div>

                </div>
                <div>
                  <h5 className='pl-2' style={{color:'white'}}>SELECT USERS</h5>
                </div>
                <Autocomplete
                  options={getusers}
                  getOptionLabel={(getusers) => `${getusers.Name} (${getusers.PhoneNumber})`||''}
                  // value={getusers && getusers.length>0 && getusers.find(option => option.Name === inputtedvalue) || null}
                  onChange={onChangeInput}
                  onInputChange={autoCompleteInput}
                  inputValue={inputtedvalue}
                  renderInput={(params) => (
                    <StyledTextField {...params} name="users" />
                 )}
                />
                
            {/* <FormControl sx={{ m: 1, width: 400 }} >
                <StyledSelect
                  name='users'
                  value={selectedData.users}
                  onChange={onChangeInput}
                  multiple
                  renderValue={(selected) => (
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {selected.map((value) => (
                      <div
                        key={value}
                        style={{
                          margin: '2px',
                          padding: '2px',
                          background: 'rgba(255, 255, 255, 0.2)',
                          borderRadius: '4px',
                        }}
                      >
                         {getusers && getusers.find((user) => user.id === value)?.email}
                      </div>
                    ))}
                  </div>
                )}
                > 
                    {getusers && getusers.slice().sort((a, b) => a.email.localeCompare(b.email)).map((item)=>(
                    <MenuItem key={item.id} value={item.id} >
                      <Checkbox
                        checked={selectedData && selectedData.users.indexOf(item.id)>-1}
                      />
                      <ListItemText primary={item.email} />
                    </MenuItem>
                    ))}
                </StyledSelect> 
            </FormControl> */}
            </div>
            <div>
            <h5 className='pl-2' style={{color:'white'}}>SELECT ROLE</h5>
            <FormControl sx={{ m: 0, width: 400 }} >
                <StyledSelect
                 name='roles'
                 value={selectedData.roles}
                 onChange={onChangeInput}
                 multiple
                 renderValue={(selected) => (
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {selected.map((value) => (
                      <div
                        key={value}
                        style={{
                          margin: '2px',
                          padding: '2px',
                          background: 'rgba(255, 255, 255, 0.2)',
                          borderRadius: '4px',
                        }}
                      >
                         {getroles.find((user) => user.Name === value)?.Name}
                      </div>
                    ))}
                  </div>
                )}
                >
                  {getroles && getroles.map((item)=>(
                    <MenuItem value={item.Name}>
                    <Checkbox
                     checked={selectedData && selectedData.roles.indexOf(item.Name)>-1}
                    />
                    <ListItemText primary={item.Name}/>
                    </MenuItem>
                  ))}
                </StyledSelect> 
            </FormControl>
            </div>
            <div  style={{marginLeft:'120px',marginTop:'10px',marginBottom:'10px'}}>
            <Button variant="contained" className='ml-5 ' type='submit' style={{backgroundColor:'black'}} >submit</Button>
            </div>
            </form>
        </div>

    </div>
  )
}

export default AssignRole