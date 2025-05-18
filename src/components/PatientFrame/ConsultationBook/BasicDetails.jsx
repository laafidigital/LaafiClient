import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import laafilogo from '../../../assets/Logos/laafiheader_transparentlogo.png'
import rightarrow from '../../../assets/rightarrow.svg'
import { jwtDecode } from 'jwt-decode';
import { Getdoctorbydepid, GetRegisterdDoctors, GetRegisterdPatients } from '../../Store/ApiReducers/Auth';
import {LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Backimg from '../../../assets/svg/Back.svg'
import hospitalimg from '../../../assets/svg/clinic2.svg'
import onlineimg from '../../../assets/svg/online.svg'
import onlinewhite from '../../../assets/svg/onlinewhite.svg'
import hospitalwhite from '../../../assets/svg/clinicwhite.svg'
import dayjs from 'dayjs';
import {PostConsultation,UpdateProfile} from '../../Store/Actions'
import Dobimg from '../../../assets/svg/Dob.svg'
import genderimg from '../../../assets/svg/Gender.svg'

const BasicDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [view, setView] = useState('options');
  const [selectedOption, setSelectedOption] = useState(null);
  const userById = useSelector((state) => state.Addpatentdetails.registerdpatients);
  const [inputFieldData, setInputFieldData] = useState({
    DepartmentName: '',
    DoctorName: '',
    mrn: '',
    name: '',
    phone: '',
    email: '',
    relation: 'myself',
    docID: '',
    deptID: '',
    address: '',
    gender: 'male',
    type: 'out_patient',
    allergy: '',
    consultationDate: '',
    consultTime: '',
    servicegroup: [],
    services: [],
    packages: [],
    price: '',
    Dob: '',
  });
  const [dobError, setDobError] = useState(false); 
  const [gender,setGender]=useState(null)
  const [dob,setDob]=useState(null)

  const Token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (Token) {
      const decodedToken = jwtDecode(Token);
      const Id = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      dispatch(GetRegisterdPatients(Id));
      const decodedName = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      localStorage.setItem('username', decodedName);
    }
  }, [Token]);

  useEffect(() => {
    if (userById && userById.length > 0) {
      setInputFieldData((prev) => ({
        ...prev,
        mrn: userById[0].MRN || '',
        name: userById[0].Name || '',
        email: userById[0].Email || '',
        phone: userById[0].PhoneNumber || '',
        address: userById[0].Address || '',
        gender: userById[0].Gender || null,
        Dob: userById[0].Dob || null,
      }));
      setGender(userById[0].Gender||null)
      setDob(userById[0].Dob||null)
    }
  }, [userById]);

  const selectDept = async () => {
    if (userById[0].Gender===null && userById[0].Dob===null) {
      try {
        const updatedData = {
          gender: inputFieldData.gender,
          Dob: inputFieldData.Dob,
        };
  
        dispatch(UpdateProfile(updatedData));
        navigate('../department');
      } catch (error) {
    
      }
    } else {
      navigate(`../department/${selectedOption}`);
    }
  };


  const handleGenderChange = (event) => {
    setInputFieldData((prev) => ({
      ...prev,
      gender: event.target.value,
    }));
  };

  const handleDobChange = (date) => {
    setDobError(false); 
    setInputFieldData((prev) => ({
      ...prev,
      Dob: date ? dayjs(date).toISOString() : '',
    }));
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setView('details');
  };

  return (
    <div className="docdash_maindiv">
      <div className="docdash_maindiv_container">
        {view === 'options' ? (
          <div className="docdash_content1_main">
            <div className="content_div">
              <div className="options_container">
                <div
                  className="option_card"
                  onClick={() => handleOptionSelect('online')}
                >
                  <img src={onlineimg} className="option_icon" />
                  <p className="option_text">Consult a Doctor Online</p>
                </div>
                <div
                  className="option_card"
                  onClick={() => handleOptionSelect('out_patient')}
                >
                  <img src={hospitalimg} className="option_icon" />
                  <p className="option_text">Book a Hospital Appointment</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="docdash_content1_main">
            <div className="content_div">
              <div
                className="frame_505"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <p className="book_consultation">Book a consultation</p>
                {view === 'details' && (
                  <img
                    src={selectedOption === 'online' ? onlineimg : hospitalimg}
                    alt="consultation type"
                    style={{ width: '40px', height: '40px', marginRight: '40px' }}
                  />
                )}
              </div>
              <div className="frame_490">
                <div className="input_row">
                  <div className="icon"></div>
                  <p className="placeholder">{inputFieldData.name}</p>
                </div>
                <div className="input_row">
                  <div className="icon"></div>
                  <p className="placeholder">{inputFieldData.phone}</p>
                </div>
                <div className="input_row">
                  <img className="icon" src={genderimg}></img>
                  <div className="placeholder">
                    <label>
                      <input
                        type="radio"
                        value="Male"
                        checked={inputFieldData.gender === "Male"}
                        onChange={handleGenderChange}
                      />
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Female"
                        checked={inputFieldData.gender === "Female"}
                        onChange={handleGenderChange}
                      />
                      Female
                    </label>
                  </div>
                </div>
                <div className="input_row">
                <img className="icon" src={Dobimg}></img>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={inputFieldData.Dob ? dayjs(inputFieldData.Dob) : null}
                      onChange={handleDobChange}
                      renderInput={(params) => <input {...params} />}
                      className='placeholder'
                      
                    />
                  </LocalizationProvider>
                  {dobError && (
                    <p className="error_message">Please select your Date of Birth.</p>
                  )}
                </div>
              </div>
              <div className="frame_491">
                <div className="icon_button" onClick={selectDept}>
                  <p className="button_text">Select a department</p>
                  <div className="navigate_icon">
                    <img src={rightarrow} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="content2_main">
          <div className="content2_second_div">
            <div className="content2_imagediv">
              <img src={laafilogo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;