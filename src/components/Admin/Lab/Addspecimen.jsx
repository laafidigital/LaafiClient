import React ,{ useEffect, useState } from 'react';
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
import { GetSpecimen, PostSpecimen } from '../../Store/Actions';
import { setemptypostspecimen } from '../../Store/AddservicesSlice';

const Addspecimen = () => {

   const dispatch=useDispatch()

   const getspecimen=useSelector((state)=>state.Addservices.specimen)
   const postspecimen=useSelector((state)=>state.Addservices.postspecimenresult)

   const[inputdata,setinputdata]=useState({Name:'',Description:''}) 

   useEffect(()=>{
    dispatch(GetSpecimen())
   },[])

   useEffect(()=>{
    if(postspecimen){
        dispatch(GetSpecimen())
        dispatch(setemptypostspecimen())
    }
   },[postspecimen])

   const handleinputchange=(e)=>{
     const{name,value}=e.target
     setinputdata({...inputdata,[name]:value})
   }


   const submitform=(e)=>{
     e.preventDefault()
     dispatch(PostSpecimen(inputdata))
     setinputdata({Name:'',Description:''})
   }

  return (
    <div className='servicemaindiv'>
    <h4 className='headnames'>ADD SPECIMEN</h4>
    <ToastContainer/>
   <div className='d-flex'>
   <form  className='addservicemain' onSubmit={submitform}> 
           <div className='addpatient_sub1'>
               <div class="mb-3 row">
                   <label for="staticEmail" class="col-sm-2 col-form-label">Name</label>
                   <div class="col-sm-10">
                   <input type="text" required  class="form-control" name="Name" style={{marginLeft:'10px'}} value={inputdata.Name} onChange={handleinputchange}/>
                   </div>
               </div>
               <div class="mb-3 row">
                   <label for="staticEmail" class="col-sm-2 col-form-label">Description</label>
                   <div class="col-sm-10">
                   <input type="text"  class="form-control" name="Description" style={{marginLeft:'10px'}} value={inputdata.Description} onChange={handleinputchange}/>
                   </div>
               </div>
               {/* <div class="mb-3 row">
                   <label for="staticEmail" class="col-sm-2 col-form-label">Image</label>
                   <div class="col-sm-10">
                   <input type="file"  class="form-control" name="image" style={{marginLeft:'10px'}} value={inputdata.image} onChange={handleinputchange}/>
                   </div>
               </div> */}
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
                   {/* <StyledTableCell align="center">Linked Services</StyledTableCell> */}
                   {/* <StyledTableCell align="center">Action</StyledTableCell> */}
               </TableRow>
             </TableHead>
              <TableBody>
               {getspecimen && getspecimen.map((row,index) => (
                <StyledTableRow >
                   <StyledTableCell align="center">{row.Name}</StyledTableCell>
                   <StyledTableCell align="center" > {row.Description} </StyledTableCell>
                   {/* <StyledTableCell align="center" >
                      <Link
                         component="button"
                         variant="body2"
                         style={{color:row.doctordetails ? 'green' :'blue'}}
                         onClick={() => {onClickView(row.Id)}}
                       >
                         view details
                      </Link>
                    </StyledTableCell> */}
                   {/* <StyledTableCell align="center" className='d-flex'>
                         <IconButton> 
                           <Switch
                            checked={row.Status}
                            name='switch'
                            onChange={(e)=>{handleSwitch(e,row)
                                        setenable(true)
                                       }}
                            inputProps={{ 'aria-label': 'controlled' }}
                           />
                         </IconButton> 
                   </StyledTableCell> */}
                </StyledTableRow>
               ))}
               </TableBody>
               </Table>
               </TableContainer>

       </div>
       </FormControl>
       </div>
       {/* <Dialog
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
               <StyledTableRow>
               {getpackageswithId &&(
                 getpackageswithId.map((item)=>(
                   <StyledTableCell align='center'>{item.s.serviceName}</StyledTableCell>
                 ))
               )}
               </StyledTableRow>
             </TableBody>
           </Table>
         </TableContainer>
       </DialogContent>
         <DialogActions>
           <Button onClick={()=>setopen(false)}>Close</Button>
          </DialogActions>
       </Dialog> */}
</div>
  )
}

export default Addspecimen
