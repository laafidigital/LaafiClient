import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { GetInvoiceDetailsByInvoiceNo, GetTransactionByInvoiceNo, PostPayinvoice } from '../../Store/Actions';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from '../../../assets/Logos/laafi_logo_horizontal-light_504X251_colored.jpg';
import { setemptypaymentpostresult } from '../../Store/InvoicesSlice';

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
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Printinvoice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { invoiceno, type } = useParams();
  
  const invoicedetails = useSelector((state) => state.Invoice.patienttransactionbyinvoiceno);
  const invoicedetailsbyinvoiceno = useSelector((state) => state.Invoice.invoicedetailsbyinvoiceno);

  useEffect(() => {
    if (type === 'lab') {
      dispatch(GetTransactionByInvoiceNo(invoiceno));
    } else {
      dispatch(GetInvoiceDetailsByInvoiceNo(invoiceno));
    }
  }, [invoiceno, type, dispatch]);

  const currentDateTime = new Date().toLocaleString();

  const handleCollectPayment = () => {
    const updateddata = {
      InvoiceNumber: invoiceno,
      razorpayPaymentId: null,
    };
    dispatch(PostPayinvoice(updateddata))
    navigate('../invoicemain'); 
    
  };

  const handleCancel = () => {
    navigate('../invoicemain'); 
  };

  const submitPrint = () => {
    const capture = document.querySelector('.printresult_main');
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL('img/png');
      const doc = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      doc.save('receipt.pdf');
    });
  };

  return (
    <div className='Dashboard_maindiv'>
      <Button variant='contained' className='m-2' sx={{ borderRadius: 28, height: 30 }} onClick={() => navigate('../invoicemain')}>
        Back
      </Button>
      <div className='pt-5'>
        {invoicedetails !== null && type === 'lab' ? (
          <div className='printresult_main'>
            <div className='d-flex justify-content-between'>
              <h6>{currentDateTime}</h6>
              <img src={logo} className='login_logo' alt='logo' />
            </div>
            <div className='d-flex justify-content-center'>
              <h6>
                Cash Bill (License No. KA-B12-159413/17)<br />
                ABC PHARMA<br />
              </h6>
            </div>
            <div>
              <h6>MRN: {invoicedetails[0].MRN}</h6>
              <h6>NAME: {invoicedetails[0].PatientName}</h6>
              <h6>INVOICE NO: {invoicedetails[0].InvoiceNo}</h6>
            </div>
            <div style={{ maxHeight: '70vh', overflowY: 'auto', marginTop: '40px' }}>
              <TableContainer component={Paper}>
                {invoicedetails && invoicedetails.length > 0 && (
                  <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align='center'>CHARGES</StyledTableCell>
                        <StyledTableCell align='center'>HEAD</StyledTableCell>
                        <StyledTableCell align='center'>Amount</StyledTableCell>
                        <StyledTableCell align='center'>Qty</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {invoicedetails.map((row, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell align='center'>{row.Service_PackageName}</StyledTableCell>
                          <StyledTableCell align='center'>Lab</StyledTableCell>
                          <StyledTableCell align='center'>{row.ServiceAmount}</StyledTableCell>
                          <StyledTableCell align='center'>1.00</StyledTableCell>
                        </StyledTableRow>
                      ))}
                      <StyledTableRow>
                        <StyledTableCell align='center'></StyledTableCell>
                        <StyledTableCell align='center'></StyledTableCell>
                        <StyledTableCell align='center'>SUB TOTAL:</StyledTableCell>
                        <StyledTableCell align='center'></StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell align='center'></StyledTableCell>
                        <StyledTableCell align='center'></StyledTableCell>
                        <StyledTableCell align='center'>
                          <p style={{ fontWeight: 'bold' }}>BILL AMOUNT</p>:
                        </StyledTableCell>
                        <StyledTableCell align='center'></StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                )}
              </TableContainer>
            </div>
            <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align='center'>PAYMENTS</StyledTableCell>
                      <StyledTableCell align='center'>RECEIPT NO</StyledTableCell>
                      <StyledTableCell align='center'>MODE</StyledTableCell>
                      <StyledTableCell align='center'>CARD TYPE</StyledTableCell>
                      <StyledTableCell align='center'>RECEIPT NO</StyledTableCell>
                      <StyledTableCell align='center'>AMOUNT</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell align='center'></StyledTableCell>
                      <StyledTableCell align='center'></StyledTableCell>
                      <StyledTableCell align='center'></StyledTableCell>
                      <StyledTableCell align='center'></StyledTableCell>
                      <StyledTableCell align='center'></StyledTableCell>
                      <StyledTableCell align='center'></StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <div className='d-flex justify-content-between'>
                <div>
                  <p>Received by thanks:</p>
                  <p>
                    Kindly produce the receipt at the time of collection the report and collect the report within 30 days.
                    <br />
                    The collection fee is valid for 7 days only with the same doctor. Culture and outsourced reports will be
                    delayed. Please check lab for these.
                  </p>
                </div>
                <div>
                  <p>Signature</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='printresult_main'>
            <div className='d-flex justify-content-between'>
              <h6>{currentDateTime}</h6>
            </div>
            <div className='d-flex justify-content-center'>
              <h6>
                Cash Bill (License No. KA-B12-159413/17)<br />
                ABC PHARMA<br />
              </h6>
            </div>
            <div>
              <h6>MRN: {invoicedetailsbyinvoiceno && invoicedetailsbyinvoiceno.MRN}</h6>
              <h6>NAME: {invoicedetailsbyinvoiceno && invoicedetailsbyinvoiceno.PatientName}</h6>
              <h6>INVOICE NO: {invoicedetailsbyinvoiceno && invoicedetailsbyinvoiceno.Id}</h6>
            </div>
            <div style={{ maxHeight: '70vh', overflowY: 'auto', marginTop: '40px' }}>
              <TableContainer component={Paper}>
                {invoicedetailsbyinvoiceno && (
                  <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align='center'>Doctor</StyledTableCell>
                        <StyledTableCell align='center'>Amount</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <StyledTableRow>
                        <StyledTableCell align='center'>{invoicedetailsbyinvoiceno.PatientName}</StyledTableCell>
                        <StyledTableCell align='center'>{invoicedetailsbyinvoiceno.InvoiceAmount}</StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                )}
              </TableContainer>
            </div>
          </div>
        )}
          <div className='d-flex justify-content-center'>
         <Button
          variant='contained'
          className='m-2'
          sx={{ borderRadius: 28, height: 30 }}
          onClick={handleCollectPayment}
        >
          Collect Payment
        </Button>
        <Button variant='contained' className='m-2' sx={{ borderRadius: 28, height: 30 }} onClick={handleCancel}>
          Cancel
        </Button>
        </div>
      </div>
     
      <div className='d-flex justify-content-center'>
       
        <Button variant='contained' className='m-2' sx={{ borderRadius: 28, height: 30 }} onClick={submitPrint}>
          Download
        </Button>
      </div>
    </div>
  );
};

export default Printinvoice;