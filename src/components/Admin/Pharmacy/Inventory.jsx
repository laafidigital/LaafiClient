import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { StyledTableCell,StyledTableRow } from '../../../Styles/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { GetPharmacyPurchase } from '../../Store/Actions';




const Inventory = () => {
  const dispatch=useDispatch()
  const data=useSelector(state=>state.expired)
  const pharmacypurchase=useSelector((state)=>state.purchase.pharmacypurchase)


  const [reorderMedicine,setreorderMedicine]=useState()
  const [nonreorder,setnonreorder]=useState()

  useEffect(()=>{
   dispatch(GetPharmacyPurchase())
  },[])

  useEffect(()=>{
    if(pharmacypurchase){
      const reorderMedicine=pharmacypurchase.filter((item)=>item.nooftablets_bottles < item.reorderLevel? item.reorderLevel:null)
      const nonreorderMedicine= pharmacypurchase.filter(item => item.nooftablets_bottles >= item.reorderLevel);
      setreorderMedicine(reorderMedicine)
      setnonreorder(nonreorderMedicine)
      

    }
  },[pharmacypurchase])
  
  return (
    <div className='purchase_main'>
       <div style={{ maxHeight: '70vh', overflowY: 'auto',marginTop:'40px'}}>
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
              {reorderMedicine && reorderMedicine.map((row, index) => (
                <StyledTableRow key={index} className='reorder-medicine'>
                  <StyledTableCell align="center">{row.item}</StyledTableCell>
                  <StyledTableCell align="center">{row.itemName}</StyledTableCell>
                  <StyledTableCell align="center">{row.category}</StyledTableCell>
                  <StyledTableCell align="center">{row.barcode}</StyledTableCell>
                  <StyledTableCell align="center">{row.purchaseDate}</StyledTableCell>
                  <StyledTableCell align="center">{row.description}</StyledTableCell>
                  <StyledTableCell align="center">{row.costpertable_bottle}</StyledTableCell>
                  <StyledTableCell align="center">{row.mrpOne}</StyledTableCell>
                  <StyledTableCell align="center">{row.tax}</StyledTableCell>
                  <StyledTableCell align="center">{row.nooftablets_bottles}</StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                </StyledTableRow>
              ))}
              {nonreorder && nonreorder.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">{row.item}</StyledTableCell>
                  <StyledTableCell align="center">{row.itemName}</StyledTableCell>
                  <StyledTableCell align="center">{row.category}</StyledTableCell>
                  <StyledTableCell align="center">{row.barcode}</StyledTableCell>
                  <StyledTableCell align="center">{row.purchaseDate}</StyledTableCell>
                  <StyledTableCell align="center">{row.description}</StyledTableCell>
                  <StyledTableCell align="center">{row.costpertable_bottle}</StyledTableCell>
                  <StyledTableCell align="center">{row.mrpOne}</StyledTableCell>
                  <StyledTableCell align="center">{row.tax}</StyledTableCell>
                  <StyledTableCell align="center">{row.nooftablets_bottles}</StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
        </Table>
        </TableContainer>

        </div>

    </div>
  )
}

export default Inventory