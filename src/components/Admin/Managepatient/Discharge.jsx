import React, { useState,useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {useSelector} from 'react-redux'



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#008080',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const Discharge = () => {
 
    const counsultancydata=useSelector((state)=>state.Addpatentdetails.consultationarray)
    const [inpatientdata,setinpatientdata]=useState(null)

    useEffect(()=>{
       const filterdata=counsultancydata.filter((item)=>item.type==='in_patient')
    
       setinpatientdata(filterdata)
    },[counsultancydata])


  return (
    <div className='Dashboard_maindiv'>
        <div>
        <div className='d-flex' style={{position:'fixed'}}>
            {/* <Button variant='contained' className='m-2' sx={ { borderRadius: 28 } } onClick={()=>{navigate('all')}}>All</Button>
            <Button variant='contained'  className='m-2' sx={ { borderRadius: 28 } } onClick={()=>{navigate('/doctor/mypatients')}}>Today</Button> */}
        </div>

        <div className='pt-3 '>
        <div style={{ maxHeight: '70vh', overflowY: 'auto',marginTop:'50px' }}>
        <TableContainer component={Paper} className='tablecontainer_main'>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow >
            <StyledTableCell align="center">MRN</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Token</StyledTableCell>
            <StyledTableCell align="center">Patient</StyledTableCell>
            <StyledTableCell align="center">Address</StyledTableCell>
            <StyledTableCell align="center">Allergy</StyledTableCell>
            <StyledTableCell align="center">Services</StyledTableCell>
            <StyledTableCell align="center">Room No</StyledTableCell> 
            <StyledTableCell align="center">Bed No</StyledTableCell>
            <StyledTableCell align="center">Discharge</StyledTableCell>
          </TableRow>
        </TableHead>
        {inpatientdata !== null && (
                            <TableBody>
                                {inpatientdata.map((row, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell align="center">{row.mrnno}</StyledTableCell>
                                        <StyledTableCell align="center">{row.date}</StyledTableCell>
                                        <StyledTableCell align="center">{row.token}</StyledTableCell>
                                        <StyledTableCell align="center">{row.name}</StyledTableCell>
                                        <StyledTableCell align="center">{row.address}</StyledTableCell>
                                        <StyledTableCell align="center">{row.allergy}</StyledTableCell>
                                        {row.services.length > 0 && (
                                            <StyledTableCell align="center">
                                                {row.services.map((serv, index) => (
                                                <div key={index}>{serv}</div>
                                                ))}
                                            </StyledTableCell>
                                            )}
                                        <StyledTableCell align="center">{row.addfloordata.room}</StyledTableCell>
                                        <StyledTableCell align="center">{row.addfloordata.bed}</StyledTableCell>
                                        <StyledTableCell align="center"><IconButton><MedicalServicesIcon/></IconButton></StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        )}
        </Table>
        </TableContainer>
        </div>    
        </div>
      </div>
    </div>
  )
}

export default Discharge