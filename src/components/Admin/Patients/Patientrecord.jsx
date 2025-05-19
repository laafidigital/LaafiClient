import React from 'react'
import { Button } from '@mui/material'
import {TextField} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { StyledTableCell,StyledTableRow } from '../../../Styles/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FormControl } from '@mui/base/FormControl';
import { IconButton, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from 'react-redux';



const Patientrecord = () => {
    const data=useSelector(state=>state.Addpatentdetails.fixedPatient)
  return (
    <div>
        <div>
        <FormControl style={{paddingTop:'10px',padding:'10px'}}>
            <div style={{ maxHeight: '70vh', overflowY: 'auto' ,marginTop:'75px'}}>
                    <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell  align="center">MRN</StyledTableCell>
                        <StyledTableCell align="center">Name</StyledTableCell>
                        <StyledTableCell align="center">Phone</StyledTableCell>
                        <StyledTableCell align="center">Address</StyledTableCell>
                        <StyledTableCell align="center">Patient History</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map((row,index) => (
                        <StyledTableRow >
                        <StyledTableCell align="center">{row[0]}</StyledTableCell>
                        <StyledTableCell align="center" > {row[1]} </StyledTableCell>
                        <StyledTableCell align="center">{row[2]}</StyledTableCell>
                        <StyledTableCell align="center">{row[3]}</StyledTableCell>
                        <StyledTableCell align="center">
                        <IconButton> <SendIcon color='primary'/></IconButton> 
                            </StyledTableCell>
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

export default Patientrecord