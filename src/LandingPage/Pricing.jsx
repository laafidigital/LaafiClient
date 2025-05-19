import React from 'react'

const Pricing = () => {
    const styles = {
        container: {
          fontFamily: 'Arial, sans-serif',
          maxWidth: '600px',
          margin: '0 auto',
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        header: {
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#333',
        },
        section: {
          marginBottom: '20px',
        },
        title: {
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '10px',
          color: '#555',
        },
        content: {
          fontSize: '16px',
          color: '#666',
          lineHeight: '1.6',
        },
        highlight: {
          color: '#007BFF',
          fontWeight: 'bold',
        },
      };
    
      return (
        <div style={styles.container}>
          <div style={styles.header}>NETSRISHTI SOFTWARE LLP Pricing Sheet</div>
          <div style={styles.section}>
            <div style={styles.title}>Product Name:</div>
            <div style={styles.content}>LAAFI Hospital Management</div>
          </div>
          <div style={styles.section}>
            <div style={styles.title}>Category:</div>
            <div style={styles.content}>Hospital Management System Portal and App</div>
          </div>
          <div style={styles.section}>
            <div style={styles.title}>Users:</div>
            <div style={styles.content}>Hospitals, Individual Doctors, Hospital Staff, and Patients</div>
          </div>
          <div style={styles.section}>
            <div style={styles.title}>Pricing Details:</div>
            <div style={styles.content}>
              <p>- SaaS Subscription Fee for Doctors: <span style={styles.highlight}>₹0</span></p>
              <p>- Consultation Fee: Doctor Consultation Fee Paid by Patient is <span style={styles.highlight}>500 or above</span></p>
              <p>- Total Fee Collected by NETSRISHTI: <span style={styles.highlight}>5%</span> of Consultation Fee</p>
              <p>- Net Revenue: For ₹1000 Consultation Fee, <span style={styles.highlight}>₹50</span> is the Revenue for NETSRISHTI SOFTWARE LLP (Excluding Payment Gateway Charge)</p>
            </div>
          </div>
          <div style={styles.section}>
            <div style={styles.title}>Last Updated:</div>
            <div style={styles.content}>July 3, 2024</div>
          </div>
        </div>
      );
    };
export default Pricing
