import React, { useEffect, useState } from 'react'
import { StyledTableCell,StyledTableRow } from '../../../Styles/Table'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import { Button, Dialog, DialogActions, DialogContent, IconButton, MenuItem, Select } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { useDispatch, useSelector } from 'react-redux';
import { GetBloodDonaters, GetBloodDonatersByStatus, UpdateBloodBankData } from '../../Store/Actions';
import { StyledSelect } from '../../../Styles/Select';
import { ToastContainer } from 'react-toastify';




const BloodDonation = () => {
    const dispatch=useDispatch()

    const blooddonorsbystatus=useSelector((state)=>state.Bloodbank.bloodbankDataByStatus)


    const [filteredpateints,setfilteredpatients]=useState()
    const [OpennurseDialoge,setopennurseDialoge]=useState(false)
    const [isupdated,setisupdated]=useState(false)
    const [selectedRow,setselectedRow]=useState()
    const [inputFeilddata,setinputFeilddata]=useState({bloodType:'',qty:'',sellingPrice:'',emergencyContact:''})

   

    useEffect(()=>{
       dispatch(GetBloodDonatersByStatus('pending'))
    },[])

    useEffect(()=>{
        if(blooddonorsbystatus && blooddonorsbystatus.length>0){
           setfilteredpatients(blooddonorsbystatus)
        }
        if(!isupdated){
          dispatch(GetBloodDonatersByStatus('pending'))
          setisupdated(true)
        }
     },[blooddonorsbystatus,isupdated])

    const handleinputchange=(e)=>{
     const {name,value}=e.target
     setinputFeilddata({...inputFeilddata,[name]:value})
    }

    const hangleClickDiagnose=(row)=>{
      const removeUser={...row}
      delete removeUser.user
      setselectedRow(removeUser)

      setinputFeilddata(prev=>{
        let updated={...prev}
        if(row.bloodType !==''){
          updated.bloodType=row.bloodType
        }
        if (row.emergencyContact !== '') {
          updated.emergencyContact = row.emergencyContact;
        }
        return updated
      })
      setopennurseDialoge(true)
    }

    const handleViewDetails=()=>{

    }

    const submitform=(e)=>{

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

      e.preventDefault()
      const updatedData={
        ...selectedRow,
        ...inputFeilddata,
        collectedOn:formattedDate,
        status:'instock'
      }
      dispatch(UpdateBloodBankData(updatedData))
      setinputFeilddata({bloodType:'',qty:'',sellingPrice:'',emergencyContact:''})
      setopennurseDialoge(false)
      setisupdated(false)
    }
  return (
    <div className='Dashboard_maindiv'>
      <ToastContainer/>
          <div className='pt-3 '>
        <div style={{ maxHeight: '70vh', overflowY: 'auto',marginTop:'50px' }}>
            {filteredpateints && filteredpateints.length>0 ?(
        <TableContainer component={Paper} className='tablecontainer_main'>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow >
            <StyledTableCell align="center">MRN</StyledTableCell>
            <StyledTableCell align="center">NAME</StyledTableCell>
            <StyledTableCell align="center">ADDRESS</StyledTableCell>
            <StyledTableCell align="center">ALLERGY</StyledTableCell>
            <StyledTableCell align="center">DONATE</StyledTableCell>
            <StyledTableCell align="center">HISTORY</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {filteredpateints.map((row, index) => (
            <StyledTableRow key={index}>
                <StyledTableCell align="center">{row.mrn}</StyledTableCell>
                <StyledTableCell align="center">{row.user && row.user.userName}</StyledTableCell>
                <StyledTableCell align="center">{row.user && row.user.address}</StyledTableCell>
                <StyledTableCell align="center">{row.allergies}</StyledTableCell>                   
                <StyledTableCell align="center"><IconButton onClick={()=>hangleClickDiagnose(row)}><BloodtypeIcon/></IconButton></StyledTableCell>
                <StyledTableCell align="center"> 
                <Link
                  component="button"
                  variant="body2"
                  style={{color:'blue'}}
                  onClick={()=>{handleViewDetails(row.consultation.mrn)}}
                >
                  view details
                </Link>
                </StyledTableCell>                   
            </StyledTableRow>
        ))}
        </TableBody>                
        </Table>
        </TableContainer>
            ):(
                <h3>NO PATIENTS TODAY</h3>
            )}
        </div>    

        <Dialog open={OpennurseDialoge}>
          <form style={{backgroundColor:'#008080',color:'white'}} onSubmit={submitform}>
          <DialogContent>
                   <div className='d-flex blood_submain'>
                     <div class="mb-3 d-flex blood_sub">
                        <label  class=" col-form-label ">Blood Type</label>
                        <div >
                          <StyledSelect
                           name='bloodType'
                           value={inputFeilddata && inputFeilddata.bloodType}
                           style={{width:'175px'}}
                           onChange={handleinputchange}
                           >
                            <MenuItem value='o+'>O+</MenuItem>
                            <MenuItem value='o-'>O-</MenuItem>
                            <MenuItem value='a+'>A+</MenuItem>
                            <MenuItem value='a-'>A-</MenuItem>
                            <MenuItem value='b+'>B+</MenuItem>
                            <MenuItem value='b-'>B-</MenuItem>
                            <MenuItem value='ab+'>AB+</MenuItem>
                            <MenuItem value='ab-'>AB-</MenuItem>
                          </StyledSelect>
                      </div>
                    </div>
                    <div class="mb-3 d-flex blood_sub ">
                        <label  class=" col-form-label ">Quantity</label>
                        <div  >
                        <input type="text" required class="form-control" name="qty" value={inputFeilddata && inputFeilddata.qty} onChange={handleinputchange}/>
                        </div>
                    </div>
                  </div>
                  <div className='d-flex blood_submain'>
                     <div class="mb-3 d-flex blood_sub">
                        <label  class=" col-form-label ">Price</label>
                        <div >
                          <input type="text" required class="form-control" name="sellingPrice" value={inputFeilddata && inputFeilddata.sellingPrice} onChange={handleinputchange}/>
                        </div>
                    </div>
                    <div class="mb-3 d-flex blood_sub ">
                        <label  class=" col-form-label ">Emergency</label>
                        <div  >
                        <input type="text" required class="form-control" name="emergencyContact" value={inputFeilddata && inputFeilddata.emergencyContact} onChange={handleinputchange}/>
                        </div>
                    </div>
                  </div>
          </DialogContent>
          <DialogActions>
            <div className='d-flex'>
              <Button 
               onClick={()=>{setinputFeilddata({bloodType:'',qty:'',sellingPrice:'',emergencyContact:''})
                               setopennurseDialoge(false)}}
                style={{color:'white'}}
                variant='outlined'
                >
                cancel</Button>
              <Button 
               type='submit'
               style={{color:'white'}}
               variant='outlined'
              >
                submit</Button>
            </div>
          </DialogActions>
            </form>
        </Dialog>
        </div>
    </div>
  )
}

export default BloodDonation