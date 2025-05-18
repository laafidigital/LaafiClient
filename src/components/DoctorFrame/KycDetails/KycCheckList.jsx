import { Button, Dialog, DialogActions, DialogContent, IconButton, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import { useDispatch, useSelector } from 'react-redux';
import { GetDepartmentData } from '../../Store/ApiReducers/Auth';
import { jwtDecode } from 'jwt-decode';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { setchecklistEditId, setCheklistStatus, setemptykycDoctorid, setemptykycUpdatedtoPendingResponse, setparentstatus } from '../../Store/DoctorFrame/KycDetailSlice';
import { toast } from 'react-toastify';
import { GetRefreshkycStatus, GetRegisterdDoctors, PatchAcceptKyc, PatchUpdateKycToPending } from '../../Store/ApiReducers/Auth';
import { useLocation } from 'react-router-dom';
import { GetZoomcallback, GetZoomtokenBydoctorId } from '../../Store/ApiReducers/Conference';
import Unauthorized from '../../Admin/Unauthorized';
import axios from 'axios'

const KycCheckList = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    const token = localStorage.getItem('accessToken')
    const formdata = new FormData()
    const imageformdata = new FormData()
    const [zoomTokenStatus, setZoomTokenStatus] = useState(null);

    const getregdoctors = useSelector((state) => state.Adddoctor.registerddoctor)
    const kyctopending = useSelector((state) => state.KycDetails.kycupdatedtopendingresponse)
    const Dockycdetails = useSelector((state) => state.KycDetails.kycDoctorId)
    const getdepartment = useSelector((state) => state.Adddepartment.departmentArray)

    const [selected, setselected] = useState({ profile: false, education: false, idproof: false, specilisation: false, bankdetails: false, meetinglink: false })
    const [departement, setdepartment] = useState({ departmentId: '', fee: '' })
    const [Open, setOpen] = useState(false)
    const [code, setCode] = useState('');

    useEffect(() => {
        if (Dockycdetails) {
            dispatch(GetRegisterdDoctors(Dockycdetails))
        } else {
            const DecodedToken = jwtDecode(token)
            const userId = DecodedToken[`http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier`]
            dispatch(GetRegisterdDoctors(userId))
        }
    }, [token])

    useEffect(() => {
        setselected({
            profile: checkcompltetionStatus('PROFILE'),
            education: checkcompltetionStatus('EDUCATION'),
            idproof: checkcompltetionStatus('ID PROOF'),
            specialisation: checkcompltetionStatus('SPECIALISATION'),
            bankdetails: checkcompltetionStatus('MOBILE WALLET'),
            meetinglink: checkcompltetionStatus('MEETING LINK')
        });
    }, [getregdoctors, zoomTokenStatus]) // Add zoomTokenStatus as a dependency

    useEffect(() => {
        if (kyctopending) {
            dispatch(GetRefreshkycStatus())
            dispatch(setparentstatus(false))
            dispatch(setemptykycUpdatedtoPendingResponse())
        } else if (!code) {
            const params = new URLSearchParams(location.search);
            const codeParam = params.get('code');
            if (codeParam && zoomTokenStatus === 404) {
                setCode(codeParam);
                dispatch(GetZoomcallback(codeParam))
            }
        }
    }, [kyctopending, location.search])

    useEffect(() => {
        const fetchZoomToken = async () => {
            try {
                const external = 'https://laafi.in/conference/api/';
                const headers = Unauthorized.Actionsauthorized();
                const response = await axios.get(external + 'ZoomAuth/GetZoomTokenByDoctorId', { headers });
                setZoomTokenStatus(response.status);
                if (response.status === 200) {
                    setselected(prev => ({ ...prev, meetinglink: true }));
                } else if (response.status === 404) {
                    setZoomTokenStatus(404);
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setZoomTokenStatus(404);
                } else {
                    // console.error('Error fetching Zoom token:', error);
                }
            }
        };

        fetchZoomToken();
    }, []);

    const checkcompltetionStatus = (type) => {
        if (!getregdoctors) return false;
        if (type === 'PROFILE') {
            const { Gender, Dob, Email, Address } = getregdoctors;
            return !!Gender && !!Dob && !!Email;
        } else if (type === 'EDUCATION') {
            return getregdoctors && getregdoctors.EducationalQualifications && getregdoctors.EducationalQualifications.length > 0;
        } else if (type === 'ID PROOF') {
            const { IdProof, IdProofType } = getregdoctors;
            return !!IdProof && !!IdProofType;
        } else if (type === 'MOBILE WALLET') {
            return !!(getregdoctors && getregdoctors.BankDetails && getregdoctors.BankDetails.AccountNo) && !!(getregdoctors && getregdoctors.BankDetails && getregdoctors.BankDetails.NameOnAccount);
        } else if (type === 'MEETING LINK') {
            return zoomTokenStatus === 200; // Check if zoomTokenStatus is 200
        } else {
            return getregdoctors && getregdoctors.DoctorSpecializations && getregdoctors.DoctorSpecializations.length > 0;
        }
    }

    const isAllSelectedTrue = Object.values(selected).every(item => item === true);

    const submitForm = () => {
        if (Dockycdetails) {
            if (departement.departmentId && departement.fee) {
                dispatch(PatchAcceptKyc(Dockycdetails, departement.departmentId, departement.fee))
                setdepartment({ departmentId: '', fee: '' })
                setOpen(!Open)
            } else {
                toast('Please Select A Department')
            }
        } else {
            if (code && zoomTokenStatus === 404) {
                dispatch(GetZoomcallback(code))
            }
            dispatch(PatchUpdateKycToPending())
            dispatch(setemptykycDoctorid())
        }
    }

    return (
        <div>
            <div className='kycchecklist_subdiv1'>
                <h5>KYC CHECK LIST</h5>
            </div>
            <form>
                <div>
                    <div className='kycchecklist_subdiv4'>
                        {['PROFILE', 'EDUCATION', 'ID PROOF', 'SPECIALISATION', 'MOBILE WALLET', 'MEETING LINK'].map((item, index) => (
                            <div className='kycchecklist_dubdiv2'>
                                {checkcompltetionStatus(item) ? (
                                    <div>
                                        <CheckCircleIcon style={{ color: 'green' }} />
                                    </div>
                                ) : (
                                    <div>
                                        <PanoramaFishEyeIcon />
                                    </div>
                                )}
                                <div
                                    key={index}
                                    className='kycchecklist_subdiv3'
                                >
                                    <h5 style={{ textDecoration: checkcompltetionStatus(item) ? 'line-through' : '' }}>{item}</h5>
                                </div>
                                <div>
                                    <IconButton
                                        onClick={() => {
                                            dispatch(setchecklistEditId(index))
                                            dispatch(setCheklistStatus(false))
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='kycchecklist_subdiv5'>
                        {isAllSelectedTrue && Dockycdetails ? (
                            <Button onClick={() => {
                                setOpen(!Open)
                                dispatch(GetDepartmentData())
                            }} >submit</Button>
                        ) : isAllSelectedTrue ? (
                            <Button onClick={submitForm} >submit</Button>
                        ) : (<></>)}
                        <Button onClick={() => dispatch(setparentstatus(false))}>Close</Button>
                    </div>
                </div>

                <Dialog open={Open}>
                    <DialogContent>
                        <label>Department:</label>
                        <Select
                            style={{ width: '300px', height: '40px' }}
                            onChange={(e) => setdepartment({ ...departement, departmentId: e.target.value })}
                        >
                            {getdepartment && getdepartment.map(item =>
                                <MenuItem value={item.Id}>{item.Name}</MenuItem>
                            )}
                        </Select>
                        <div style={{ marginLeft: '47px', marginTop: '10px' }}>
                            <label>Fees:</label>
                            <input type='number' style={{ height: '40px', width: '300px' }} onChange={(e) => setdepartment({ ...departement, fee: parseInt(e.target.value) })}></input>
                        </div>

                    </DialogContent>
                    <DialogActions>
                        <Button type='button' onClick={submitForm}>submit</Button>
                        <Button onClick={() => setOpen(!Open)}>cancel</Button>
                    </DialogActions>
                </Dialog>
            </form>

        </div>
    )
}

export default KycCheckList