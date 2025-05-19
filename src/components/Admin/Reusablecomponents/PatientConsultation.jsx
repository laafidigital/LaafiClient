import { Dialog, DialogContent, Table, TableContainer, TableHead,TableRow,TableBody,DialogActions, Button } from '@mui/material'
import React, { useState } from 'react'
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { StyledTableCell, StyledTableRow } from '../../../Styles/Table'
import { setreportstatus } from '../../Store/DashboardSlice'
import { useDispatch, useSelector } from 'react-redux';
import { setpatientconsultationdialog } from '../../Store/AddpatientSlice';
import ConsultationReport from './ConsultationReport';

const PatientConsultation = (props) => {
    const dispatch=useDispatch()

    const reportstatus=useSelector((state)=>state.Dashboard.reportstatus)

    const [Open,setOpen]=useState(true)
    const [consultid,setconultid]=useState()

    const handleclose=()=>{
     dispatch(setpatientconsultationdialog(false))
    }
  return (
    <div>
         <Dialog open={Open}>
            <DialogContent>
                {props && props.data.length>0 ?(
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align='center'>DATE</StyledTableCell>
                                <StyledTableCell align='center'>DOCTOR</StyledTableCell>
                                <StyledTableCell align='center'>PATIENT NAME</StyledTableCell>
                                <StyledTableCell align='center'>CONSULTATION REPORT</StyledTableCell>
                                {/* <StyledTableCell align='center'>SERVICES</StyledTableCell> */}
                            </TableRow>
                        </TableHead>
                        { props.data.map((item)=>(
                        <TableBody>
                            <StyledTableRow>
                                <StyledTableCell align='center'>{item.ConsultationDate}</StyledTableCell>
                                <StyledTableCell align='center'>{item.DoctorName}</StyledTableCell>
                                <StyledTableCell align='center'>{item.PatientName}</StyledTableCell>
                                <StyledTableCell align='center'>
                                   <Link
                                    component="button"
                                    variant="body2"
                                    onClick={()=>{
                                      setconultid(item.Id)
                                      dispatch(setreportstatus(true))
                                    }}
                                    style={{color:'blue'}}>
                                    View Report
                                    </Link>
                                </StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                        ))}
                    </Table>
                </TableContainer>
                ):(
                  <p>No history is available for this patient</p>
                )}

            </DialogContent>
            <DialogActions>
            <div className='d-flex'>
                    <Button onClick={handleclose}>close</Button>
                </div>
            </DialogActions>
        </Dialog>

        {reportstatus &&(
            <ConsultationReport data={consultid}/>
        )}
      
    </div>
  )
}

export default PatientConsultation
