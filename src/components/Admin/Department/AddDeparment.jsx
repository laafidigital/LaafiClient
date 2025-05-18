import React, { useEffect, useState } from 'react'
import { Button, IconButton } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { StyledTableCell,StyledTableRow } from '../../../Styles/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FormControl } from '@mui/base/FormControl';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteDepartment } from '../../Store/Actions';
import { GetDepartmentData,PostDepartmentData } from '../../Store/ApiReducers/Auth';
import { ToastContainer } from 'react-toastify';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { setemptydeletedepartmentresult, setemptydepartmentpostresult } from '../../Store/Department/AddDepartmentSlice';


  

const AddDeparment = () => {

    const dispatch=useDispatch()
    const formdata=new FormData()
    // const inputdata=useSelector((state)=>state.Adddepartment.inputdepdata)
    const deleteresult=useSelector((state)=>state.Adddepartment.deleteresult)
    const postresult=useSelector((state)=>state.Adddepartment.postresult)
    const departmentarray=useSelector((state)=>state.Adddepartment.departmentArray)

    
    const [validateinput,setvalidateinput]=useState({department_name:'',department_description:''})
    const [inputdata,setinputdata]=useState({Name:'',Description:''})
    const [displayData, setDisplayData] = useState(true);
    const [filterdata,setfilterdata]=useState(departmentarray)

   

    useEffect(()=>{
      dispatch(GetDepartmentData())
      if(postresult){
        dispatch(GetDepartmentData())
        dispatch(setemptydepartmentpostresult())
      }
      else if(deleteresult){
        dispatch(GetDepartmentData()) 
        dispatch(setemptydeletedepartmentresult())
      }
    },[postresult,deleteresult])

    const handleinputchange=(e)=>{
        const {name,value}=e.target
        // dispatch(setinputdepdata({name,value}))
        setinputdata((prev)=>({
          ...prev,
          [name]:value
        }))
     
        if(name==='name'){
          const filterinputdata = departmentarray.filter((item) => {
            if (item && item.department_name) {
              return item.department_name.toLowerCase().includes(value.toLowerCase());
            }
            return false;
          })
          setfilterdata(filterinputdata)
          setDisplayData(false);
          ;}
          if(name=='department_icon'){
            const file = e.target.files[0];
            formdata.append("Icon",file)
          }
    }


    const validateform=()=>{
        if(!inputdata.Name){
            setvalidateinput({department_name:'department name is required'})
        }
        else if (!inputdata.Description){
            setvalidateinput({department_description:'department discription is required'})
        }
        // else if(!inputdata.department_name && !inputdata.department_discription){
        //     setvalidateinput({department_name:'department name is required',department_discription:'department discription is required'})
        // }
        else{
          setvalidateinput({department_name:'',department_description:''})
        }
    }


    const Deletedepartment=(id)=>{
  
      dispatch(DeleteDepartment(id))
    }
   

    const submitForm=(e)=>{
        e.preventDefault()
        setDisplayData(true);
        const allErrorsEmpty = Object.values(validateinput).every(error => error === "");
        if(allErrorsEmpty){
          
          //  formdata.append('Name',inputdata.Name)
          //  formdata.append('Description',inputdata.Description)
          //  formdata.append('DepartmentIcon',inputdata.department_icon)
           dispatch(PostDepartmentData(inputdata))
           setinputdata({Name:'',Description:''})
            // dispatch(setinputdeparray(inputdata))            
        }  
    }


    

  return (
    <div className='servicemaindiv'>
         <h4 className='headnames'>ADD DEPARTMENT</h4>
         <ToastContainer/>
        <div className='d-flex'>
        <form  className='addservicemain' onSubmit={submitForm} > 
            <FormControl >
                <div className='adddepartment'>
                    <div class="mb-3 d-flex">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Department Name</label>
                        <div class="col-sm-10 ml-2">
                        <input type="text"  class="form-control" name="Name" value={inputdata.Name} onChange={handleinputchange}/>
                        </div>
                    </div>
                        { validateinput.department_name &&<div className='error-message'>{validateinput.department_name}</div>}
                    <div class="mb-3 d-flex">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Description</label>
                        <div class="col-sm-10 ml-2">
                          <input type="text"  class="form-control" name="Description" value={inputdata.Description} onChange={handleinputchange}/>
                        </div>
                        { validateinput.department_description &&<div className='error-message'>{validateinput.department_description}</div>}
                    </div>
                    {/* <div class="mb-3 d-flex ">
                        <label htmlFor="relation" class="col-sm-2 col-form-label signuplabel">Department Icon</label>
                        <div className='col-sm-10 ml-2'>
                            <input type="file" className='form-control' name='department_icon'  value={inputdata.department_icon} onChange={handleinputchange} />
                        </div>
                    </div> */}
                        <div className='d-flex justify-content-center'>
                            <Button variant='contained' type='submit'onClick={validateform} style={{backgroundColor:'black'}}>submit</Button>
                        </div>

                </div>
            </FormControl>
            </form>
            <FormControl style={{paddingLeft:'10px'}}>
            <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <TableContainer component={Paper} className='tablecontainer_main'>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell  align="center">DEPARTMENT NAME</StyledTableCell>
                        <StyledTableCell align="center">DEPARTMENT DISCRIPTION</StyledTableCell>
                        <StyledTableCell align="center">ACTION</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {displayData 
                    ? departmentarray.map((row,index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">{row.Name}</StyledTableCell>
                      <StyledTableCell align="center">{row.Description}</StyledTableCell>  
                      <StyledTableCell align="center"><IconButton onClick={()=>Deletedepartment(row.Id)}>{<DeleteOutlineOutlinedIcon  color='error'/>}</IconButton></StyledTableCell>  
                    </StyledTableRow>
                    ))
                    :filterdata.map((row,index)=>(
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">{row.name}</StyledTableCell>
                      <StyledTableCell align="center">{row.description}</StyledTableCell>
                      <StyledTableCell align="center"><IconButton onClick={()=>Deletedepartment(row.id)}>{<DeleteOutlineOutlinedIcon color='error'/>}</IconButton></StyledTableCell>  
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

export default AddDeparment