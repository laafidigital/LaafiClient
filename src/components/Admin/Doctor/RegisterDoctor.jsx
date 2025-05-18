import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setemptypostresponse } from '../../Store/SignupSlice'
import { ToastContainer ,toast} from 'react-toastify'
import { GetCheckExistingUsername, RegisterHospitalUser } from '../../Store/ApiReducers/Auth'
import PhoneInput from 'react-phone-input-2'
import { useNavigate } from 'react-router-dom'

const RegisterDoctor = ({ setisShowComponent }) => {
    const dispatch = useDispatch()
    const formdata = new FormData()
    const navigate = useNavigate();
    const Existusername = useSelector((state) => state.signup.checkusernameExist)
    const postresult = useSelector((state) => state.signup.registeredpatientresponse)

    const [inputData, setinputData] = useState({ Name: '', PhoneNumber: '', Password: '' })
    const [ispassword, setispassword] = useState(false)
    const [error, seterror] = useState({ PhoneNumber: '' })

    useEffect(() => {
        if (Existusername == true) {
            seterror({ PhoneNumber: 'Phone no already existing' })
        } else {
            seterror({ PhoneNumber: '' })
        }
        
        if (postresult && postresult.length > 0) {
          toast.success('Doctor registered successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
            dispatch(setemptypostresponse())
            setinputData({ Name: '', PhoneNumber: '91', Password: '' })
            // Close the register view and show default view after successful registration
            setisShowComponent('adddoctor')
        }
    }, [Existusername, postresult])

    const handleinputchange = (e) => {
        const { name, value } = e.target
        setinputData({
            ...inputData,
            [name]: value
        })
    }

    const handlephoneinput = (value, countryData) => {
        const countryCode = countryData.dialCode
        const phoneNumberOnly = value.slice(countryCode.length);

        setinputData({
            ...inputData,
            PhoneNumber: `${countryCode}-${phoneNumberOnly}`
        })
        dispatch(GetCheckExistingUsername(`${countryCode}-${phoneNumberOnly}`, 'Doctor', 'signup'))
    }

    const onSubmitForm = (e) => {
        e.preventDefault()
        if (error.PhoneNumber == '') {
            formdata.append('Name', inputData.Name)
            formdata.append('PhoneNumber', inputData.PhoneNumber)
            dispatch(RegisterHospitalUser(formdata, 'Doctor'))
        }
    }

    return (
        <div className='d-flex justify-content-center'>
            <ToastContainer />
            <form className='addservicemain' onSubmit={onSubmitForm}>
                <div className='addpatient_sub1'>
                    <div class="d-flex mt-1">
                        <label className='doclabel'> Name</label>
                        <div style={{ marginLeft: '66px' }}>
                            <input type="text" class="form-control" name="Name"
                                value={inputData.Name} onChange={handleinputchange}
                                style={{ width: '300px' }}
                            />
                        </div>
                    </div>
                    <div class="d-flex mt-2">
                        <label className='doclabel'> Phone</label>
                        <div style={{ marginLeft: '65px' }}>
                            <PhoneInput
                                inputStyle={{ height: '45px', borderRadius: '5px' }}
                                containerStyle={{ borderRadius: '10px' }}
                                name="PhoneNumber"
                                onChange={(value, country) => handlephoneinput(value, country)}
                                country={'in'}
                                value={inputData.PhoneNumber}
                            />
                        </div>
                    </div>
                    {error.PhoneNumber && (<div className='error-message'>{error.PhoneNumber}</div>)}
                    <div className='d-flex justify-content-center mt-2'>
                        <Button variant='contained' type='submit' style={{ backgroundColor: 'black' }}>submit</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegisterDoctor