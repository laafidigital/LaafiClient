import { Dialog, DialogActions, DialogContent } from '@mui/material'
import React, { useEffect, useState } from 'react'
import KycProfileDetails from './KycProfileDetails'
import KycEducation from './KycEducation'
import KycIdproof from './KycIdproof'
import { ToastContainer } from 'react-toastify'
import KycSpecialisation from './KycSpecialisation'
import KycCheckList from './KycCheckList'
import { useSelector } from 'react-redux'
import KycBankDetails from './KycBankDetails'
import Kycmeeting from './Kycmeeting'
const KycdetailsParent = () => {
  const Checkliststatus = useSelector((state) => state.KycDetails.checklistStatus);
  const checklisteditid = useSelector((state) => state.KycDetails.checklistEditId);

  const [Open, setOpen] = useState(false);
  const [selected, setselected] = useState(checklisteditid);

  useEffect(() => {
    setOpen(true);
    setselected(checklisteditid);
  }, [checklisteditid]);

  const handleProfileUpdateComplete = () => {
    setselected(1); // Automatically switch to KycEducation after profile update
  };

  const renderSelectedComponent = () => {
    switch (selected) {
      case 0:
        return <KycProfileDetails onProfileUpdateComplete={handleProfileUpdateComplete} />;
      case 1:
        return <KycEducation />;
      case 2:
        return <KycIdproof />;
      case 3:
        return <KycSpecialisation />;
      case 4:
        return <KycBankDetails />;
      case 5:
        return <Kycmeeting />;
      default:
        return null;
    }
  };

  return (
    <div>
      <ToastContainer />
      <Dialog
        open={Open}
        PaperProps={{
          style: {
            width: '80%',
            maxWidth: '1000px',
            minHeight: '400px',
          },
        }}
      >
        <DialogContent>
          {Checkliststatus ? (
            <KycCheckList />
          ) : (
            <div className='parentkycmain_div'>
              <div className='parentkycsub1_div'>
                {['PROFILE', 'EDUCATION', 'ID PROOF', 'SPECIALISATION', 'MOBILE WALLET', 'MEETING LINK'].map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setselected(index)}
                    className={selected === index ? 'selected' : ''}
                  >
                    <h5>{item}</h5>
                  </div>
                ))}
              </div>
              {renderSelectedComponent()}
            </div>
          )}
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};

export default KycdetailsParent;