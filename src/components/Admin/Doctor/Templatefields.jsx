import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { StyledTableCell,StyledTableRow } from '../../../Styles/Table';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton} from '@mui/material';
import { useDispatch } from 'react-redux';
import { DeleteTemplate, UpdateTemplateSwitch } from '../../Store/Actions';

const Templatefields = (props) => {
    const dispatch=useDispatch()
    const sts = props.data.Status;

    const [success, setSuccess] = React.useState(sts);
    
    const handleChange = (event) => {
      const newStatus = event.target.checked;
      const updated= {
        Id: props.data.Id,
        DepartmentId: props.data.DepartmentId,
        FieldName: props.data.FieldName,
        FieldType: props.data.FieldType,
        Options: null,
        AI: true,
        Status: newStatus,
        Department: null
      }
   
        dispatch(UpdateTemplateSwitch(props.data.Id,updated))
        setSuccess(event.target.checked);
      };

     const clickDelete=(id)=>{

      dispatch(DeleteTemplate(id))
     }
  return (
    <TableContainer component={Paper} >
    <Table  aria-label="customized table">
        <TableBody style={{'width':'30%','align':'center'}}>
            <StyledTableCell align="left" className='td'>{props.data.Department.Name}</StyledTableCell>
            <StyledTableCell align="left" className='td'>{props.data.FieldName}</StyledTableCell>
            <StyledTableCell align="left" className='td'>{props.data.FieldType}</StyledTableCell>
           <TableCell align="left" className='td'>{props.data.Status}
            <FormControlLabel
        control={
          <Switch
            checked={success}
            onChange={handleChange}
            color="primary"
            value="dynamic-class-name"
          />
        }
        label="Enable"
      /></TableCell>
       <StyledTableCell align="left" className='td'>
       <IconButton style={{color:'red'}} onClick={()=>clickDelete(props.data.Id)}>
              <DeleteIcon/>
            </IconButton>
        </StyledTableCell>
    </TableBody>
    </Table>
    </TableContainer>
  )
}

export default Templatefields
