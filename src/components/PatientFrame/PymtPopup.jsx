import React from 'react'
import Lottie from 'lottie-react';
import animationData from '../../../src/success.json'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
const PymtPopup = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Lottie animationData={animationData} loop={false} style={{ width: 200, height: 200 }} />
                <h3>Payment Done Successfully!</h3>
                <p>Redirecting to Patient Dashboard...</p>
            </DialogContent>
        </Dialog>
    );
};

export default PymtPopup
