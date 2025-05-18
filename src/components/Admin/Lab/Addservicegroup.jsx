import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { useSelector,useDispatch } from 'react-redux'
import { FormControl } from '@mui/base/FormControl';
import { Button, Dialog, Link } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StyledTableCell,StyledTableRow } from '../../../Styles/Table';
import Slide from '@mui/material/Slide';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { GetServiceGroups, GetServicesByGroupId, PostServiceGroup } from '../../Store/Actions';
import { setemptypostservicegroup, setemptyservicesbyservicegroupid } from '../../Store/AddservicesSlice';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const Addservicegroup = () => {
   
  const dispatch=useDispatch()
  const formdata=new FormData()

  const getservicesgroup=useSelector((state)=>state.Addservices.servicegroups)
  const postservicesgroup=useSelector((state)=>state.Addservices.postservicegroupresult)
  const getservicesbygroupid=useSelector((state)=>state.Addservices.servicesbygroupid)


  const[inputdata,setinputdata]=useState({name:'',description:''})
  const[Open,setopen]=useState(false)




  useEffect(()=>{
    dispatch(GetServiceGroups(''))
  },[])  

  useEffect(()=>{
    if(postservicesgroup){
      dispatch(GetServiceGroups(''))
      dispatch(setemptypostservicegroup())
    }
  },[postservicesgroup])

  const handleinputchange=(e)=>{
    const {name,value}=e.target
    if(name=='image'){
      formdata.append('Image',e.target.files[0])
    }else{
      setinputdata({...inputdata,[name]:value})
    }
  }

  const onClickView=(id)=>{
    dispatch(GetServicesByGroupId(id))
    setopen(true)
  }

  const submitform=(e)=>{
    e.preventDefault()
    formdata.append('Name',inputdata.name)
    formdata.append('Description',inputdata.description)
    dispatch(PostServiceGroup(formdata))
    setinputdata({name:'',description:'',image:''})
  }

  return (
    <div className='servicemaindiv'>
         <h4 className='headnames'>ADD SERVICE GROUP</h4>
         <ToastContainer/>
        <div className='d-flex'>
        <form  className='addservicemain' onSubmit={submitform}> 
                <div className='addpatient_sub1'>
                    <div class="mb-3 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                        <input type="text" required  class="form-control" name="name" style={{marginLeft:'10px'}} value={inputdata.name} onChange={handleinputchange}/>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Description</label>
                        <div class="col-sm-10">
                        <input type="text"  class="form-control" name="description" style={{marginLeft:'10px'}} value={inputdata.description} onChange={handleinputchange}/>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Image</label>
                        <div class="col-sm-10">
                        <input type="file"  class="form-control" name="image" style={{marginLeft:'10px'}} value={inputdata.image} onChange={handleinputchange}/>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <div className='pr-1'>
                            <Button variant='contained' type='submit' style={{backgroundColor:'black'}} >submit</Button>
                        </div>
                    </div>

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
                        <StyledTableCell align="center">Linked Services</StyledTableCell>
                        {/* <StyledTableCell align="center">Action</StyledTableCell> */}
                    </TableRow>
                  </TableHead>
                   <TableBody>
                    {getservicesgroup && getservicesgroup.map((row,index) => (
                     <StyledTableRow >
                        <StyledTableCell align="center">{row.Name}</StyledTableCell>
                        <StyledTableCell align="center" > {row.Description} </StyledTableCell>
                        <StyledTableCell align="center" >
                           <Link
                              component="button"
                              variant="body2"
                              style={{color:row.doctordetails ? 'green' :'blue'}}
                              onClick={() => {onClickView(row.Id)}}
                            >
                              view details
                           </Link>
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
              {getservicesbygroupid ?(
                <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align='center'>Linked Services</StyledTableCell>
                      <StyledTableCell align='center'>Description</StyledTableCell>
                      <StyledTableCell align='center'>Price</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getservicesbygroupid &&(
                      getservicesbygroupid.map((item)=>(
                      <StyledTableRow>
                        <StyledTableCell align='center'>{item.ServiceName}</StyledTableCell>
                        <StyledTableCell align='center'>{item.Description}</StyledTableCell>
                        <StyledTableCell align='center'>{item.Price}</StyledTableCell>
                      </StyledTableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              ):(
              <h4>No Services For This Service Group</h4>
              )}
              
            </DialogContent>
              <DialogActions>
                <Button onClick={()=>{
                  setopen(false)
                  dispatch(setemptyservicesbyservicegroupid())
                  }}
                >
                    Close</Button>
               </DialogActions>
            </Dialog>
    </div>
  )
}

export default Addservicegroup
