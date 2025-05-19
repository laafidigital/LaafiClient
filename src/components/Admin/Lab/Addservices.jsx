import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { FormControl } from '@mui/base/FormControl';
import { Button, Checkbox, ListItem, ListItemText } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StyledSelect } from '../../../Styles/Select';
import { styled } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { StyledTableCell,StyledTableRow } from '../../../Styles/Table';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom';
import { DeleteService, GetServiceGroups, GetServices, GetServicesByGroupId, PostServicesData } from '../../Store/Actions';
import { GetDepartmentData } from '../../Store/ApiReducers/Auth';
import { ToastContainer } from 'react-toastify';
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined';








const Addservices = () => {
 
const navigate=useNavigate()
const dispatch=useDispatch()

const deleteresult=useSelector((state)=>state.Addservices.deleteresult)
const postresult=useSelector((state)=>state.Addservices.postresult)
const serviceArray=useSelector((state)=>state.Addservices.addServicesArray)
const departments=useSelector((state)=>state.Adddepartment.departmentArray)
const servicedata=useSelector((state)=>state.Addservices.serviceresult)
const getservicegroup=useSelector((state)=>state.Addservices.servicegroups)
const getservicesbygroupid=useSelector((state)=>state.Addservices.servicesbygroupid)


const [viewaddservices,setviewaddservice]=useState(false)
const [serviceFeilddata,setservicefeilddata]=useState({deptID:13,serviceName:'',category:'',minVal:'',maxVal:'',toxicVal:'',price:'',unitOfMeasure:'',group:[],gender:'',specimen:'',method:'',reportAvailability:'',cut_Off_Time:'',Description:''})
const [errors,seterrors]=useState({deptID:'',serviceName:'',category:'',minVal:'',maxVal:'',toxicVal:'',price:'',unitOfMeasure:'',gender:'',})


useEffect(()=>{
 dispatch(GetDepartmentData())
 dispatch(GetServiceGroups(''))
 dispatch(GetServices())
 dispatch(GetServicesByGroupId('1'))
 if(postresult.length>0){
    dispatch(GetServices())
  }
else if(deleteresult.length>0){
    dispatch(GetServices())
  }
},[postresult,deleteresult])

const handleinputchange=(e)=>{
  const {name,value}=e.target

  if(name==='minVal'||name==='maxVal'||name==='toxicVal'){
    const Value=parseFloat(value)
    setservicefeilddata((prev)=>({
      ...prev,
      [name]:parseFloat(value)
    }))
  }
  if(name==='group'){
    const lastadded=value[value.length-1]
    setservicefeilddata((prev)=>({
      ...prev,
      group:value
    }))
    dispatch(GetServicesByGroupId(lastadded))
  }
  else{
    setservicefeilddata((prev)=>({
      ...prev,
      [name]:value
    }))
  }

}

const validateForm=(e)=>{

  if (!serviceFeilddata.serviceName) {
    seterrors({serviceName:'name is required'})
  }
  else if (!serviceFeilddata.deptID) {
    seterrors({deptID:'department is required'})
  }
  else if (!serviceFeilddata.category) {
    seterrors({category:'category is required'})
  }
  else if (!serviceFeilddata.unitOfMeasure) {
    seterrors({unitOfMeasure:'unit of measure is required'})
  }
  else if (!serviceFeilddata.gender) {
    seterrors({gender:'gender required'})
  }
  // else if (!serviceFeilddata.maxVal) {
  //   seterrors({maxVal:'Max val is required'})
  // }
  // else if (!serviceFeilddata.toxicVal) {
  //   seterrors({toxicVal:'Toxic Val is required'})
  // }
  else if (!serviceFeilddata.price) {
    seterrors({price:'amount is required'})
  }
  else {
    seterrors({deptID:'',serviceName:'',category:'',minVal:'',maxVal:'',toxicVal:'',price:'',unitOfMeasure:''})
  }
};

const pathname=useLocation().pathname
useEffect(()=>{
  if(pathname.includes('/doctor')){
    setviewaddservice(true)
  }
  else if(pathname.includes('/patient')){
    setviewaddservice(true)
  }
  else if(pathname.includes('/nurse')){
    setviewaddservice(true)
  }
  else if(pathname.includes('/pharmacyhome')){
    setviewaddservice(true)
  }
  else if(pathname.includes('/receptionhome')){
    setviewaddservice(true)
  }
  else{
    setviewaddservice(false)
  }
},[])

const clickBack=()=>{
  switch(true){
    case pathname.includes('/Home'):
    navigate('../admindashboard');
    break;
    case pathname.includes('/doctor'):
    navigate('../doctordashboard');
    break;
    case pathname.includes('/patient'):
    navigate('../patientdashboard');
    break
    case pathname.includes('/nurse'):
      navigate('../nursedashboard');
      break
    case pathname.includes('/pharmacyhome'):
    navigate('../pharmacydashboard');
    break
    case pathname.includes('/receptionhome'):
    navigate('../receptiondashboard');
    break
  }
}

const deleteService=(id)=>{
  dispatch(DeleteService(id))
}

const formSubmit=(e)=>{
  e.preventDefault()
  
  const allErrorsEmpty = Object.values(errors).every(error => error === "");

if(allErrorsEmpty){

  const updatedData={
    ServiceName:serviceFeilddata.serviceName,
    Description:serviceFeilddata.Description,
    Status:true,
    Price:parseInt(serviceFeilddata.price),
    Gender:serviceFeilddata.gender,
    GroupIds:serviceFeilddata.group ? serviceFeilddata.group.join(","):null,
    Category:serviceFeilddata.category,
    ReportAvailability:serviceFeilddata.reportAvailability ? serviceFeilddata.reportAvailability : null,
    DepartmentId:serviceFeilddata.deptID,
    CutoffTime:serviceFeilddata.cut_Off_Time ? serviceFeilddata.cut_Off_Time:null,
    MaxVal: serviceFeilddata.maxVal ? parseInt(serviceFeilddata.maxVal):null,
    MinVal:serviceFeilddata.minVal ?parseInt(serviceFeilddata.minVal):null,
    ToxicVal:serviceFeilddata.toxicVal ?parseInt(serviceFeilddata.toxicVal):null,
    UnitOfMeasure:serviceFeilddata.unitOfMeasure
   
  }

  dispatch(PostServicesData(updatedData))
  setservicefeilddata({deptID:13,serviceName:'',category:'',minVal:'',maxVal:'',toxicVal:'',price:'',unitOfMeasure:'',group:[],gender:'',specimen:'',method:'',reportAvailability:'',cut_Off_Time:'',Description:''})
 
  }
}


  return (
    <div className='servicemaindiv'>
      <ToastContainer/>
        <h4 className='headnames'>ADD SERVICES</h4>  
        <div className='d-flex'>
          {viewaddservices ===false &&(
            
        <form onSubmit={formSubmit} className='addservicemain' s> 
            <FormControl >
                <div className='addpatient_sub1'>
                <div class="mb-3 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Select Department</label>
                        <FormControl sx={{ m: 1, width: 400 }}>
                                <StyledSelect
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                name='deptID'
                                value={serviceFeilddata.deptID}
                                onChange={handleinputchange}
                               
                                // displayEmpty   
                                style={{width:'320px',marginLeft:'5px',height:'40px',marginLeft:'24px'}}
                                >
                              {departments.map((dep,index)=>(
                                  <MenuItem  value={dep.Id} key={index}>
                                      {dep.Name}
                                  </MenuItem>
                              ))} 
                               </StyledSelect>
                        </FormControl>
                        {errors &&(<div className='error-message_addpatient'>{errors.deptID}</div>)}
                    </div>
                    <div class="mb-3 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                        <input type="text" readonly class="form-control" name="serviceName" value={serviceFeilddata.serviceName} onChange={handleinputchange}/>
                        </div>
                        {errors &&(<div className='error-message_addpatient'>{errors.serviceName}</div>)}
                    </div>
                    <div className="mb-3 row">
                      <div className='col-6'>
                        <div className='d-flex'>
                          {/* <label for="inputPassword" class="col-sm-2 col-form-label">Category</label> */}
                          <div class="col-sm-10 pl-3 " style={{marginLeft:'60px'}}>
                          <select class="form-select form-select-lg " aria-label="Default select example" style={{borderRadius:'5px',border:'none',height:'40px',width:'130px'}} name='category' value={serviceFeilddata.category} onChange={handleinputchange} >
                              <option selected disabled value="">Select Category</option>
                              {/* <option value="injection"> Injection</option> */}
                              <option value="General">General</option>
                              <option value="Scan">Scan</option>
                              {/* <option value="others">Others</option>
                              <option value="blood_test">Blood Test</option> */}
                          </select>                  
                          </div>
                        </div>
                        {errors &&(<div className='error-message_addpatient'>{errors.category}</div>)}
                      </div>
                    <div  className="col-6">
                      <div className='d-flex'>
                          <label for="inputPassword" class="col-sm-2 col-form-label">Group:</label>
                          <div class="col-sm-10 pl-3 " style={{marginLeft:'40px'}}>
                          <StyledSelect class="form-select form-select-lg "
                            aria-label="Default select example" 
                            multiple
                            style={{borderRadius:'5px',border:'none',height:'40px',width:'130px'}} 
                            name='group'
                            value={serviceFeilddata.group} 
                            renderValue={(selected)=>{
                          
                              const value=getservicegroup && getservicegroup.filter((item)=>selected.includes(item.Id))
                              return value.map(inneritem=>inneritem.Name).join(',')
                            }}
                            onChange={handleinputchange} 
                            >
                              <MenuItem disabled value="">
                                  <em>Select group
                            
                                  </em>
                              </MenuItem>
                                  {getservicegroup && getservicegroup.map((element, index) => (
                                <MenuItem key={index} value={element.Id}>
                                  <Checkbox 
                                    checked={  serviceFeilddata.group && serviceFeilddata.group.length>0 && serviceFeilddata.group.some((item)=>item==element.Id)}
                                  />
                                   <ListItemText primary={element.Name}/>
                                </MenuItem>
                            ))}
                          </StyledSelect>                  
                          </div>
                         </div>
                    </div>
                    </div>
                    <div class="mb-3 row">
                      <div className='col-6'>
                        <div className='d-flex'>
                        {/* <label for="staticEmail" class="col-sm-2 col-form-label" style={{paddingLeft:'14px',paddingRight:'0',paddingTop:'0'}}>Unit Of Measure</label> */}
                        <div class="col-sm-10 " style={{marginLeft:"60px"}}>
                        <select class="form-select form-select-lg " aria-label="Default select example" style={{borderRadius:'5px',border:'none',height:'40px',width:'130px'}} name='unitOfMeasure' value={serviceFeilddata.unitOfMeasure} onChange={handleinputchange} >
                            <option selected disabled value="">Unit</option>
                            <option value="sec">sec</option>
                            <option value="IU/mL">	IU/mL</option>
                            <option value="U/L">	U/L</option>
                            <option value="ng/ml">	ng/ml</option>
                            <option value="pg/mL">	pg/mL</option>
                            <option value="	uIU/mL">	uIU/mL</option>
                            <option value="ug/dL">		ug/dL</option>
                            <option value="cumm">		cumm</option>
                            <option value="cells/cumm">		cells/cumm</option>
                            <option value="g/dl">			g/dl</option>
                            <option value="pg">pg</option>
                            <option value="mg/dl">	mg/dl</option>
                            <option value="HU">	HU</option>
                            <option value="mEq/l">mEq/l</option>
                            <option value="T">T</option>
                            <option value="mm/hr">	mm/hr</option>
                            <option value="lakhs/cumm">		lakhs/cumm</option>
                            <option value="%">%</option>
                            <option value="g/L NaCl">g/L NaCl</option>
                            <option value="pH">pH</option>
                            <option value="mL/min/1.73 m2"> mL/min/1.73 m2</option>
                            <option value="mm"> mm</option>
                            <option value="db HL"> db HL</option>
                          </select>         
                          </div>
                        </div>
                      </div>

                      <div className='col-6'>
                        <div className='d-flex'>
                            <label for="staticEmail" class="col-sm-2 col-form-label" >Gender</label>
                            <div style={{marginLeft:'55px'}}>
                            <StyledSelect
                              style={{borderRadius:'5px',border:'none',height:'40px',width:'130px'}} 
                              name='gender'
                              value={serviceFeilddata.gender}
                              onChange={handleinputchange}
                            >
                              <MenuItem value="Male">Male</MenuItem>
                              <MenuItem value="Female">Female</MenuItem>
                              <MenuItem value="Others">Others</MenuItem>
                              <MenuItem value="All">All</MenuItem>
                            </StyledSelect>
                            </div>
                        </div>
                      </div>
                       {errors &&(<div className='error-message_addpatient'>{errors.gender}</div>)}
                    </div>
                    {/* <div class="mb-3 row">
                        <label for="minVal" class="col-sm-2 col-form-label" style={{paddingLeft:'14px',paddingRight:'0'}}>Specimen</label>
                        <div class="col-sm-10">
                        <input type="text"  class="form-control" name='specimen' value={serviceFeilddata.specimen} onChange={handleinputchange} />
                        </div>
                        {errors &&(<div className='error-message_addpatient'>{errors.minVal}</div>)}
                    </div> */}
                    {/* <div class="mb-3 row">
                        <label for="method" class="col-sm-2 col-form-label" style={{paddingLeft:'14px',paddingRight:'0'}}>Method</label>
                        <div class="col-sm-10">
                        <input type="text"  class="form-control" name='method' value={serviceFeilddata.method} onChange={handleinputchange} />
                        </div>
                        {errors &&(<div className='error-message_addpatient'>{errors.minVal}</div>)}
                    </div> */}
                    <div class="mb-3 row">
                        <label for="method" class="col-sm-2 col-form-label" style={{paddingLeft:'14px',paddingRight:'0'}}>Report availability</label>
                        <div class="col-sm-10">
                        <input type="text"  class="form-control" name='reportAvailability' value={serviceFeilddata.reportAvailability} onChange={handleinputchange} />
                        </div>
                        {/* {errors &&(<div className='error-message_addpatient'>{errors.minVal}</div>)} */}
                    </div>
                    <div class="mb-3 row">
                        <label for="method" class="col-sm-2 col-form-label" style={{paddingLeft:'14px',paddingRight:'0'}}>Cut of time</label>
                        <div class="col-sm-10">
                        <input type="text"  class="form-control" name='cut_Off_Time' value={serviceFeilddata.cut_Off_Time} onChange={handleinputchange} />
                        </div>
                        {/* {errors &&(<div className='error-message_addpatient'>{errors.minVal}</div>)} */}
                    </div>
                    <div class="mb-3 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label" style={{paddingLeft:'14px',paddingRight:'0'}}>Min Val</label>
                        <div class="col-sm-10">
                        <input type="number"  class="form-control" name='minVal' value={serviceFeilddata.minVal} onChange={handleinputchange} />
                        </div>
                        {/* {errors &&(<div className='error-message_addpatient'>{errors.minVal}</div>)} */}
                    </div>
                    <div class="mb-3 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label" style={{paddingLeft:'14px',paddingRight:'0'}}>Max Val</label>
                        <div class="col-sm-10">
                        <input type="number"  class="form-control" name='maxVal' value={serviceFeilddata.maxVal} onChange={handleinputchange} />
                        </div>
                        {/* {errors &&(<div className='error-message_addpatient'>{errors.maxVal}</div>)} */}
                    </div>
                    <div class="mb-3 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label" style={{paddingLeft:'14px',paddingRight:'0'}}>Toxic Val</label>
                        <div class="col-sm-10 ">
                        <input type="number" class="form-control " name='toxicVal' value={serviceFeilddata.toxicVal} onChange={handleinputchange} />
                        </div>
                        {/* {errors &&(<div className='error-message_addpatient'>{errors.toxicVal}</div>)} */}
                    </div>
                    <div class="mb-3 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Description</label>
                        <div class="col-sm-10">
                        <input type="text" readonly class="form-control" name="Description" value={serviceFeilddata.Description} onChange={handleinputchange}/>
                        </div>
                        {/* {errors &&(<div className='error-message_addpatient'>{errors.serviceName}</div>)} */}
                    </div>

                <div className='d-flex justify-content-between'>
                    <div  style={{width:'350px',margin:'0',padding:'0'}} className='d-flex' >
                       <label for="staticEmail" class="col-sm-2 col-form-label " style={{paddingLeft:'0',paddingRight:'0',}}> Amount</label>
                        <CurrencyRupeeIcon style={{height:'20px',marginTop:'10px'}}/>
                        <input type="number" readonly class="form-control" id="staticEmail" style={{width:'140px'}} name='price' value={serviceFeilddata.price} onChange={handleinputchange}/>
                    </div>
                    <div className='pr-1'>
                          <Button variant='contained' type='submit' onClick={validateForm} style={{backgroundColor:'black'}}>submit</Button>
                    </div>
                </div>
                {errors &&(<div className='error-message_addpatient'>{errors.price}</div>)}

                </div>
            </FormControl>
            </form>
          )}
            <FormControl style={{paddingLeft: viewaddservices ?'15pc' :'10px'}}>
            <div style={{ maxHeight: '70vh', overflowY: 'auto' , }}>
            <div className='d-flex justify-content-end pr-5'>
              <Button startIcon={<ArrowBackIcon/>} style={{color:'black'}} onClick={clickBack}>Back</Button>
            </div>
                    <TableContainer component={Paper} className='tablecontainer_main' >
                    <Table sx={{ minWidth: 300 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell  align="center">Name</StyledTableCell>
                        <StyledTableCell align="center">Category</StyledTableCell>
                        <StyledTableCell align="center">UOM</StyledTableCell>
                        <StyledTableCell align="center">MinVal</StyledTableCell>
                        <StyledTableCell align="center">MaxVal</StyledTableCell>
                        <StyledTableCell align="center">ToxicVal</StyledTableCell>
                        <StyledTableCell align="center">Price</StyledTableCell>
                        {viewaddservices ==false &&(
                        <StyledTableCell align="center">Action</StyledTableCell>
                        )}

                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {getservicesbygroupid && getservicesbygroupid.map((row,index) => (
                        <StyledTableRow >
                        <StyledTableCell align="center">{row && row.ServiceName}</StyledTableCell>
                        <StyledTableCell align="center" > {row.Department && row.Department.Name} </StyledTableCell>
                        <StyledTableCell align="center" > {row.UnitOfMeasure} </StyledTableCell>
                        <StyledTableCell align="center">{row.MinVal}</StyledTableCell>
                        <StyledTableCell align="center">{row.MaxVal}</StyledTableCell>
                        <StyledTableCell align="center">{row.ToxicVal}</StyledTableCell>
                        <StyledTableCell align="center">{row.Price}</StyledTableCell>
                        {/* <IconButton> <SendIcon color='primary'/></IconButton>  */}
                        {viewaddservices ==false && (
                          <StyledTableCell align="center" className='d-flex'>
                           <IconButton onClick={()=>deleteService(row.id)}> <DeleteOutlineOutlined color='error'/></IconButton> 
                          </StyledTableCell>
                        )}
                    </StyledTableRow>
                    ))}
                    </TableBody>
                    </Table>
                    </TableContainer>

            </div>
            </FormControl>
            </div>

    </div>
  )
}

export default Addservices