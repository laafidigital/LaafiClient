import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { StyledTableCell,StyledTableRow } from '../../../Styles/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';



const Expired = () => {

  const data=useSelector(state => state.expired)

  return (
    <div className='purchase_main'>
      
        <div style={{ maxHeight: '70vh', overflowY: 'auto', marginTop:'40px' }}>
        <TableContainer component={Paper} className='tablecontainer_main'>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">ITEMNO</StyledTableCell>
            <StyledTableCell align="center">ITEMS</StyledTableCell>
            <StyledTableCell align="center">CATEGORY</StyledTableCell>
            <StyledTableCell align="center">BARCODE</StyledTableCell>
            <StyledTableCell align="center">EXPIRY</StyledTableCell>
            <StyledTableCell align="center">DISCRIPTION</StyledTableCell>
            <StyledTableCell align="center">COST</StyledTableCell>
            <StyledTableCell align="center">MRP</StyledTableCell>
            <StyledTableCell align="center">TAX</StyledTableCell>
            <StyledTableCell align="center">QTY</StyledTableCell>
            <StyledTableCell align="center">SOLD</StyledTableCell>
            <StyledTableCell align="center">BALANCE</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,index) => (
            <StyledTableRow >
              <StyledTableCell align="center">{row[0]}</StyledTableCell>
              <StyledTableCell align="center" > {row[1]} </StyledTableCell>
              <StyledTableCell align="center">{row[2]}</StyledTableCell>
              <StyledTableCell align="center">{row[3]}</StyledTableCell>
              <StyledTableCell align="center">{row[4]}</StyledTableCell>
              <StyledTableCell align="center">{row[5]}</StyledTableCell>
              <StyledTableCell align="center">{row[6]}</StyledTableCell>
              <StyledTableCell align="center">{row[7]}</StyledTableCell>
              <StyledTableCell align="center">{row[8]}</StyledTableCell>
              <StyledTableCell align="center">{row[9]}</StyledTableCell>
              <StyledTableCell align="center">{row[10]}</StyledTableCell>
              <StyledTableCell align="center">{row[11]}</StyledTableCell>
          </StyledTableRow>
          ))}
        </TableBody>
        </Table>
        </TableContainer>

        </div>
    </div>
  )
}

export default Expired