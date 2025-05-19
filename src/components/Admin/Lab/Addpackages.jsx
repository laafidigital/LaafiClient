import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { FormControl } from '@mui/base/FormControl';
import { Button, Dialog, Link } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { StyledTableCell,StyledTableRow } from '../../../Styles/Table';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import { IconButton, Typography } from '@mui/material'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { EnableDisablePackages, GetPackages, GetPackagesWithId, GetServiceGroups, GetServices, GetServicesByGroupId, PostPackageData, UpdatePackageStatus } from '../../Store/Actions';
import { ToastContainer } from 'react-toastify';
import Servicebygroupid from '../Reusablecomponents/Servicebygroupid';
import { emptyputpackagestatus, emptyselectedserviceforpackage, setpackagestatus } from '../../Store/AddpackageSlice';



  const StyledSelect = styled(Select)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white', // Set the border color to white
      },
      '&:hover fieldset': {
        borderColor: 'white', // Set the border color to white on hover
      },
    },
    '& .MuiSelect-select': {
      color: 'white', // Set the text color to white
      '&:focus': {
        backgroundColor: 'transparent', // Set the background color to transparent when focused
      },
    },
    '& .MuiSelect-icon': {
      color: 'white', // Set the dropdown icon color to white
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '1px',
      borderColor: 'white', // Set the border color to white
    },
  }));

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
  
  const Addpackages = () => {

       const dispatch=useDispatch()
       const formdata=new FormData()
     
       const serviceArray=useSelector((state)=>state.Addservices.serviceresult)
       const packageArray=useSelector((state)=>state.Addpackages.getpackages)
       const getpackageswithId=useSelector((state)=>state.Addpackages.getpackagesbyid)
       const postresult=useSelector((state)=>state.Addpackages.postresult)
       const putresult=useSelector((state)=>state.Addpackages.putresultpackagestatus)
       const getservicegroup=useSelector((state)=>state.Addservices.servicegroups)
       const packagestatus=useSelector((state)=>state.Addpackages.packagestatus)
       const getservicesbygroupid=useSelector((state)=>state.Addservices.servicesbygroupid)
       const selectedpackageservices=useSelector((state)=>state.Addpackages.selectedserviceforpackage)



       
       const [Open,setOpen]=useState(false)
       const [switchStatus,setswitchStatus]=useState(false)
       const [inputdata,setinputdata]=useState({name:'',description:'',Services:[],price:''})
       const [error,seterror]=useState({name:'',description:'',selectedservices:'',price:'',})
       const [linkedServices,setlinkedservices]=useState()
       

    useEffect(()=>{
      dispatch(GetServices())
      dispatch(GetServiceGroups(''))
      dispatch(GetPackages())
    },[postresult]) 

    useEffect(()=>{
      if(postresult){
        dispatch(GetPackages())
        dispatch(emptyputpackagestatus())
      }
    },[putresult])

    const handleinputchange=(e)=>{
        const {name,value}=e.target
  

        if(name==='pkgServices'){
          const pkgServicesArray=value
          const lastId=value[value.length-1]
          dispatch(GetServicesByGroupId(lastId))
          dispatch(setpackagestatus(true))
          // const pkgServicesArray = value.map((serviceId) => ({ service: serviceId }));
          setinputdata((prev)=>({
            ...prev,
             Services:pkgServicesArray
          }))
        }
        else if(name==='image'){
          const file = e.target.files[0];
          formdata.append('Image',inputdata.image)
        }
        else if(name==='price'){
          setinputdata((prev)=>({
            ...prev,
            [name]:parseInt(value)
          }))
        }
        else{
          setinputdata((prev)=>({
            ...prev,
            [name]:value
          }))
        }
        
   
     
      }
   
    const handleSwitch=(e,val)=>{

       dispatch(UpdatePackageStatus(val.Id))
        dispatch(GetPackages())
     }  

    const onClickView=(list)=>{
       setlinkedservices(list)
      //  dispatch(GetPackagesWithId(id))
       setOpen(true)
     }

    const handleClose=()=>{
      setOpen(false)
    } 
  
    const validateform=()=>{

        if (!inputdata.name) {
            seterror({name:'name is required'})
          }
        else if (!inputdata.Services || inputdata.Services.length === 0) {
            seterror({selectedservices:'select Services '})
          }
        else if (!inputdata.price) {
           seterror({price:'price is required'})
          }
        else{
            seterror({name:'',description:'',selectedservices:'',price:'',})
          }
     }


    const submitValue=(e)=>{
      e.preventDefault()
     
      const allErrorsEmpty = Object.values(error).every(error => error === "");
      
     if(allErrorsEmpty){
       formdata.append('Name',inputdata.name)
       formdata.append('Description ',inputdata.description)
       formdata.append('Price',inputdata.price)
       formdata.append('Status','true')
       selectedpackageservices.map((service)=>(
        formdata.append('Services',service)
       ))
       dispatch(PostPackageData(formdata))
       setinputdata({name:'',description:'',Services:[],price:''})
       dispatch(emptyselectedserviceforpackage())
        }
     }

  return (
    <div className='servicemaindiv'>
         <h4 className='headnames'>ADD PACKAGES</h4>
         <ToastContainer/>
        <div className='d-flex'>
        <form  className='addservicemain' onSubmit={submitValue}> 
                <div className='addpatient_sub1'>
                    <div class="mb-3 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                        <input type="text"  class="form-control" name="name" style={{marginLeft:'10px'}} value={inputdata.name} onChange={handleinputchange}/>
                        </div>
                        {error &&(<div className='error-message_addpatient'>{error.name}</div>)}
                    </div>
                    <div class="mb-3 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Description</label>
                        <div class="col-sm-10">
                        <input type="text"  class="form-control" name="description" style={{marginLeft:'10px'}} value={inputdata.description} onChange={handleinputchange}/>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">image</label>
                        <div class="col-sm-10">
                        <input type="file"  class="form-control" name="image" style={{marginLeft:'10px'}} value={inputdata.image} onChange={handleinputchange}/>
                        </div>
                    </div>
                    <div className='d-flex'>
                    <label for="staticEmail" style={{width:'70px'}} class="col-sm-2 col-form-label" className='pr-3'>Services Group</label>
                    <FormControl sx={{ m: 1, width: 400 }}>
                                <StyledSelect
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                name='pkgServices'
                                value={inputdata.Services}
                                onChange={handleinputchange}
                                multiple
                                // input={<OutlinedInput label="Tag" />}
                                renderValue={(selected) => {
                                  const selectedServices = getservicegroup.filter(service => selected.includes(service.Id));
                                  return selectedServices.map(service => service.Name).join(', ');
                                }}
                                
                                // MenuProps={MenuProps}
                                style={{width:'332px',marginLeft:'12px',height:'40px',marginBottom:'10px'}}
                                MenuProps={{
                                  PaperProps: {
                                      style: {
                                          maxHeight: '200px', // Set the maximum height of the menu
                                      },
                                  },
                              }}
                                >
                                {getservicegroup && getservicegroup.map((item, index) => (
                                      <MenuItem key={index} value={item.Id} className='menuitems'>
                                        {/* <Checkbox
                                          checked={inputdata.Services.some(val => val === item.Id)}
                                        /> */}
                                        <ListItemText primary={item.Name} />
                                      </MenuItem>
                                ))}
                              </StyledSelect>
                        </FormControl>
                    </div>
                    {error &&(<div className='error-message_addpatient'>{error.selectedservices}</div>)}  

                    <div className='d-flex justify-content-between'>
                        <div  style={{width:'350px',margin:'0',padding:'0'}} className='d-flex' >
                           <label for="staticEmail" class="col-sm-2 col-form-label " style={{paddingLeft:'0',paddingRight:'0',}}> Amount</label>
                        <CurrencyRupeeIcon style={{height:'20px',marginTop:'10px'}}/>
                            <input type="number"  class="form-control" id="staticEmail" style={{width:'140px'}} name='price' value={inputdata.price} onChange={handleinputchange}/>
                        </div>
                        <div className='pr-1'>
                            <Button variant='contained' type='submit' style={{backgroundColor:'black'}} onClick={validateform}>submit</Button>
                        </div>
                    </div>
                    {error &&(<div className='error-message_addpatient'>{error.price}</div>)}
                </div>
            </form>
            <FormControl style={{paddingLeft:'10px'}}>
            <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              <TableContainer component={Paper} className='tablecontainer_main'>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                        <StyledTableCell  align="center">Name</StyledTableCell>
                        <StyledTableCell align="center">Description</StyledTableCell>
                        <StyledTableCell align="center">Price</StyledTableCell>
                        <StyledTableCell align="center">Linked Services</StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                   <TableBody>
                    {packageArray.map((row,index) => (
                     <StyledTableRow >
                        <StyledTableCell align="center">{row.Name}</StyledTableCell>
                        <StyledTableCell align="center" > {row.Description} </StyledTableCell>
                        <StyledTableCell align="center" > {row.Price} </StyledTableCell>
                        <StyledTableCell align="center" >
                           <Link
                              component="button"
                              variant="body2"
                              style={{color:row.doctordetails ? 'green' :'blue'}}
                              onClick={() => {onClickView(row.ServiceList)}}
                            >
                              view details
                           </Link>
                         </StyledTableCell>
                      
                        <StyledTableCell align="center" className='d-flex'>
                              <IconButton> 
                                <Switch
                                 checked={row.Status}
                                 name='switch'
                                 onChange={(e)=>{handleSwitch(e,row)}}
                                 inputProps={{ 'aria-label': 'controlled' }}
                                />
                              </IconButton> 
                        </StyledTableCell>
                     </StyledTableRow>
                    ))}
                    </TableBody>
                    </Table>
                    </TableContainer>

            </div>
            </FormControl>
            </div>
            <Dialog
              open={Open}
              TransitionComponent={Transition}
              keepMounted
              aria-describedby="alert-dialog-slide-description"
             >
            <DialogContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align='center'>Linked Services</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {linkedServices &&(
                      linkedServices.map((item)=>(
                    <StyledTableRow>
                        <StyledTableCell align='center'>{item.ServiceName}</StyledTableCell>
                    </StyledTableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
               </DialogActions>
            </Dialog>

            {packagestatus &&(
              <Servicebygroupid data={getservicesbygroupid}/>
            )}
    </div>
  )
}

export default Addpackages