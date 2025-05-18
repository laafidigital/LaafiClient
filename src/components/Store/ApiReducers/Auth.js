import { FetchFailure, FetchFailure2, FetchFailure21, FetchFailure3, FetchFailure33, FetchFailure37, FetchFailure4, FetchFailure41, FetchFailure42, FetchFailure6, FetchFailure77, FetchFailure78, FetchFailure79, FetchFailure82, FetchFailure83, FetchFailure85, FetchFailure88, FetchRequest, FetchRequest2, FetchRequest21, FetchRequest3, FetchRequest33, FetchRequest37, FetchRequest4, FetchRequest41, FetchRequest42, FetchRequest6, FetchRequest77, FetchRequest78, FetchRequest79, FetchRequest82, FetchRequest83, FetchRequest85, FetchRequest88, FetchSuccess, FetchSuccess2, FetchSuccess21, FetchSuccess3, FetchSuccess33, FetchSuccess37, FetchSuccess4, FetchSuccess41, FetchSuccess42, FetchSuccess6, FetchSuccess77, FetchSuccess78, FetchSuccess79, FetchSuccess82, FetchSuccess83, FetchSuccess85, FetchSuccess88, PatchFailure10, PatchFailure11, PatchFailure12, PatchFailure13, PatchFailure14, PatchFailure15, PatchFailure16, PatchFailure2, PatchFailure3, PatchFailure4, PatchFailure5, PatchFailure6, PatchFailure7, PatchFailure8, PatchFailure9, PatchRequest1, PatchRequest10, PatchRequest11, PatchRequest12, PatchRequest13, PatchRequest14, PatchRequest15, PatchRequest16, PatchRequest2, PatchRequest3, PatchRequest4, PatchRequest5, PatchRequest6, PatchRequest7, PatchRequest8, PatchRequest9, PatchSuccess10, PatchSuccess11, PatchSuccess12, PatchSuccess13, PatchSuccess14, PatchSuccess15, PatchSuccess16, PatchSuccess2, PatchSuccess3, PatchSuccess4, PatchSuccess5, PatchSuccess6, PatchSuccess7, PatchSuccess8, PatchSuccess9, PostFailure, PostFailure2, PostFailure23, PostFailure24, PostFailure3, PostFailure35, PostFailure37, PostFailure38, PostFailure39, PostFailure40, PostFailure41, PostFailure42, PostFailure43, PostFailure47, PostFailure48, PostFailure49, PostFailure5, PostFailure50, PostFailure51, PostRequest, PostRequest2, PostRequest23, PostRequest24, PostRequest3, PostRequest35, PostRequest37, PostRequest38, PostRequest39, PostRequest40, PostRequest41, PostRequest42, PostRequest43, PostRequest47, PostRequest48, PostRequest49, PostRequest5, PostRequest50, PostRequest51, PostSuccess, PostSuccess2, PostSuccess23, PostSuccess24, PostSuccess3, PostSuccess35, PostSuccess37, PostSuccess38, PostSuccess39, PostSuccess40, PostSuccess41, PostSuccess42, PostSuccess43, PostSuccess47, PostSuccess48, PostSuccess49, PostSuccess5, PostSuccess50, PostSuccess51 } from "../Actions"
import axios from 'axios'
import { setLoading } from "../LoadingSlice"
import { toast } from "react-toastify"
import Unauthorized from "../../Admin/Unauthorized"

const external='https://laafi.in/auth/api/'

export const loginData=(newdata)=>{

    return (dispatch)=>{
        dispatch(PostRequest())
        dispatch(setLoading(true))
        return axios.post(external+'Auth/login',newdata)
        .then((response)=>{
            dispatch(setLoading(false))
            dispatch(PostSuccess(response))
            return response.data
        })
        .catch((error)=>{
            dispatch(setLoading(false))
            dispatch(PostFailure(error.response.data))
        })
    }
}
export const UpdatePersonalDetails = (personalDetails) => async (dispatch) => {
    try {
        const headers = Unauthorized.Actionsauthorized();
        const response = await axios.post(external + 'Kyc/UpdatePatientPersonalDetails', personalDetails, { headers });
        return response;  // Return response to handle it in formSubmit

    } catch (error) {
        dispatch(setLoading(false));
        // toast.error('Failed to update personal details');
        throw error;
    }
};

export const UpdateAdminPersonalDetails = (personalDetails,mrn) => async (dispatch) => {
    try {
        const headers = Unauthorized.Actionsauthorized();
        const response = await axios.post(external + `Kyc/UpdatePatientPersonalDetails?mrn=${mrn}`, personalDetails, { headers });
        return response;  // Return response to handle it in formSubmit

    } catch (error) {
        dispatch(setLoading(false));
        // toast.error('Failed to update personal details');
        // throw error;
    }
};
export const PostRoles=(data)=>{
    return(dispatch)=>{
        dispatch(PostRequest3())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        axios.post(external+'Auth/assign-role',data,{headers})
        .then((response)=>{
            toast('Successfully Assigned')
           
            dispatch(setLoading(false))
            dispatch(PostSuccess3(response.data))
        })
        .catch((error)=>{
            dispatch(setLoading(false))
            dispatch(PostFailure3(error))
        })
    }
}

export const SignupDataDoctor=(newdata)=>{
  
     return(dispatch)=>{
        dispatch(PostRequest23())
        dispatch(setLoading(true))
        axios.post(external+'Auth/RegisterDoc',newdata)
        .then((response)=>{
           
            toast('Successfully registerd as doctor')
            dispatch(setLoading(false))
            dispatch(PostSuccess23(response))
        })
        .catch((error)=>{
            dispatch(setLoading(false))
            dispatch(PostFailure23(error))
        })
     }
}

export const PostExternallogin=(data)=>{
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest47())
        axios.post(external+`Auth/ExternalLogin`,data)
        .then((response)=>{
         
            dispatch(setLoading(false))
            dispatch(PostSuccess47(response.data))
         
            if (response.headers['content-type'].includes('text/html')) {
                const responseUrl = window.URL.createObjectURL(new Blob([response.data], { type: 'text/html' }));
                window.open(responseUrl, '_blank');
            } else {
                //console.error('Unexpected response format:', response.headers['content-type']);
                toast('Unexpected response format');
            }
        })
        .catch((error) => {
       
            dispatch(setLoading(false));
            dispatch(PostFailure47(error));
            toast('Please Select A Specialization');
        });
    }
}

export const PostValidateGoogleToken=(credential,cliendId)=>{
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest48())
        return axios.post(external+`Auth/ValidateGoogleToken?credential=${credential}&googleClientId=${cliendId}`)
        .then((response)=>{
          
            dispatch(setLoading(false))
            dispatch(PostSuccess48(response.data))
            return response.data
        })
        .catch((error) => {
      
            dispatch(setLoading(false));
            dispatch(PostFailure48(error));
            toast('Please Select A Specialization');
        });
    }
}

export const PostExternalLogincallback=(data)=>{
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest49())
        return axios.post(external+`Auth/ExternalLoginCallback?userType=${data.userType}&phoneNumber=${data.phoneNumber}&countryCode=${data.countryCode}&email=${data.email}&name=${data.name}&accessToken=${data.accessToken}`)
        .then((response)=>{
          
            dispatch(setLoading(false))
            dispatch(PostSuccess49(response.data))
            localStorage.setItem('accessToken',response.data.Token)
            return response.data
        })
        .catch((error) => {
           
            dispatch(setLoading(false));
            dispatch(PostFailure49(error));
            toast('Please Select A Specialization');
        });
    }
}

export const SignupDataPatient=(newdata)=>{
  
     return(dispatch)=>{
        dispatch(PostRequest24())
        dispatch(setLoading(true))
       
        return axios.post(external+'Auth/RegisterPatient',newdata)
        .then((response)=>{
            toast("Registration successful")
            dispatch(setLoading(false))
            dispatch(PostSuccess24(response))
            return response
        })
        .catch((error)=>{
            dispatch(setLoading(false))
            dispatch(PostFailure24(error))
            return error
        })
     }
}

export const RegisterHospitalUser=(newdata,type)=>{
     return(dispatch)=>{
        dispatch(PostRequest2())
        dispatch(setLoading(true))
        return axios.post(external+`Auth/RegisterHospitalUser?userType=${type}`,newdata)
        .then((response)=>{
            dispatch(setLoading(false))
            dispatch(PostSuccess2(response))
            return response
        })
        .catch((error)=>{
            dispatch(setLoading(false))
            dispatch(PostFailure2(error))
            return error
        })
     }
}

export const PostOtpLogin=(data)=>{
 
     return(dispatch)=>{
        dispatch(PostRequest50())
        dispatch(setLoading(true))
        return axios.post(external+`Auth/OtpLogin?phoneNumber=${data.PhoneNumber}&accessToken=${data.otpToken}&userType=${data.UserType}`)
        .then((response)=>{
          
            dispatch(setLoading(false))
            dispatch(PostSuccess50(response))
            return response.data
        })
        .catch((error)=>{
            dispatch(setLoading(false))
            dispatch(PostFailure50(error))
        })
     }
}

export const PostResetMpin=(data)=>{
  
     return(dispatch)=>{
        dispatch(PostRequest51())
        dispatch(setLoading(true))
        return axios.post(external+`Auth/ResetMpin?UserName=${data.PhoneNumber}&accessToken=${data.otpToken}&userType=${data.UserType}&MPIN=${data.mpin}`)
        .then((response)=>{
           
            dispatch(setLoading(false))
            dispatch(PostSuccess51(response))
            return response.data
        })
        .catch((error)=>{
            dispatch(setLoading(false))
            dispatch(PostFailure51(error))
        })
     }
}
//kyc
export const PostUploadProfilePicture=(data)=>{
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest35())
        const headers=Unauthorized.Actionsauthorized()
        axios.post(external+`Kyc/UploadProfilePicture`,data,{headers})
        .then((response)=>{
         
            dispatch(setLoading(false))
            dispatch(PostSuccess35(response.data))
            toast('Successfully updated profile picture')
        })
        .catch((error) => {
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            
            dispatch(setLoading(false));
            dispatch(PostFailure35(error));
            toast(errorMessage);
        });
    }
}

export const PostUploadEducationCertificate=(data)=>{
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest37())
        const headers=Unauthorized.Actionsauthorized()
        axios.post(external+`Kyc/UploadEducationalCertificate`,data,{headers})
        .then((response)=>{
        
            dispatch(setLoading(false))
            dispatch(PostSuccess37(response.data))
            toast('Successfully Added Certificate')
        })
        .catch((error) => {
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
          
            dispatch(setLoading(false));
            dispatch(PostFailure37(error));
            toast(errorMessage);
        });
    }
}

export const PostUploadIdProofDocument=(data)=>{
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest38())
        const headers=Unauthorized.Actionsauthorized()
        axios.post(external+`Kyc/UploadIdProofDocument`,data,{headers})
        .then((response)=>{
           
            dispatch(setLoading(false))
            dispatch(PostSuccess38(response.data))
            toast('Successfully Uploaded Id Proof')
        })
        .catch((error) => {
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            //console.error('Error in posting image:', errorMessage);
            dispatch(setLoading(false));
            dispatch(PostFailure38(error));
            toast(errorMessage);
        });
    }
}


export const PostUploadRegistrationCertificate=(id,data)=>{
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest39())
        const headers=Unauthorized.Actionsauthorized()
        axios.post(external+`Kyc/UploadRegistrationCertificate?specializationId=${id}`,data,{headers})
        .then((response)=>{
            
            dispatch(setLoading(false))
            dispatch(PostSuccess39(response.data))
            toast('Successfully Uploaded certificate')
        })
        .catch((error) => {
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
           
            dispatch(setLoading(false));
            dispatch(PostFailure39(error));
            toast('Please Select A Specialization');
        });
    }
}

export const PostAdminUploadProfilePicture=(id,data)=>{
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest40())
        const headers=Unauthorized.Actionsauthorized()
        axios.post(external+`Kyc/AdminUploadProfilePicture?doctorId=${id}`,data,{headers})
        .then((response)=>{
         
            dispatch(setLoading(false))
            dispatch(PostSuccess40(response.data))
            toast('Successfully Uploaded Profile Picture By Admin')
        })
        .catch((error) => {
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
          
            dispatch(setLoading(false));
            dispatch(PostFailure40(error));
            toast('Please Select A Specialization');
        });
    }
}

export const PostAdminUploadEducationDetails=(id,data)=>{
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest41())
        const headers=Unauthorized.Actionsauthorized()
        axios.post(external+`Kyc/AdminUploadEducationalCertificate?doctorId=${id}`,data,{headers})
        .then((response)=>{
         
            dispatch(setLoading(false))
            dispatch(PostSuccess41(response.data))
            toast('Successfully Uploaded Certificate By Admin')
        })
        .catch((error) => {
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            //console.error('Error in posting image:', errorMessage);
            dispatch(setLoading(false));
            dispatch(PostFailure41(error));
            toast('Please Select A Specialization');
        });
    }
}

export const PostAdminUploadIdProofDocument=(id,data)=>{
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest42())
        const headers=Unauthorized.Actionsauthorized()
        axios.post(external+`Kyc/AdminUploadIdProofDocument?doctorId=${id}`,data,{headers})
        .then((response)=>{
       
            dispatch(setLoading(false))
            dispatch(PostSuccess42(response.data))
            toast('Successfully Uploaded Id Proof By Admin')
        })
        .catch((error) => {
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            //console.error('Error in posting image:', errorMessage);
            dispatch(setLoading(false));
            dispatch(PostFailure42(error));
            toast('Please Select A Specialization');
        });
    }
}

export const PostAdminUploadRegistrationCertificate=(id,docId,data)=>{
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest43())
        const headers=Unauthorized.Actionsauthorized()
        axios.post(external+`Kyc/AdminUploadRegistrationCertificate?specializationId=${id}&doctorId=${docId}`,data,{headers})
        .then((response)=>{
          
            dispatch(setLoading(false))
            dispatch(PostSuccess43(response.data))
            toast('Successfully Uploaded Specilization Certificate By Admin')
        })
        .catch((error) => {
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            //console.error('Error in posting image:', errorMessage);
            dispatch(setLoading(false));
            dispatch(PostFailure43(error));
            toast('Please Select A Specialization');
        });
    }
}
// DEPARTMENTS

export const PostDepartmentData=(data)=>{
    return(dispatch)=>{
        dispatch(PostRequest5())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        axios.post(external+'Departments/AddDepartment',data,{headers})
        .then((response)=>{
            dispatch(setLoading(false))
            dispatch(PostSuccess5(response.data))
        })
        .catch((error)=>{
            dispatch(setLoading(false))
            dispatch(PostFailure5(error))
        })
    }
}




// GET APIS
export const GetRoles=(header)=>{
    return(dispatch)=>{
        dispatch(FetchRequest2())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        axios.get(external+'Auth/GetRoles',{headers})
        .then((response)=>{
            dispatch(setLoading(false))
            dispatch(FetchSuccess2(response.data))
        })
        .catch((error)=>{
            dispatch(setLoading(false))
            dispatch(FetchFailure2(error))
        })
    }
}

export const GetStaff=(name)=>{;
    return(dispatch)=>{
        dispatch(FetchRequest3())
        dispatch(setLoading(true))
        axios.get(external+`Auth/GetStaff?name=${name}`)
        .then((response)=>{
          
            dispatch(FetchSuccess3(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure3(error))
            dispatch(setLoading(false))
        })
    }
}


export const Getdoctorbydepid=(id)=>{
  
    return(dispatch)=>{
        dispatch(FetchRequest21())
        dispatch(setLoading(true))
        axios.get(external+`Auth/GetDoctorsByDeptID?DepartmentId=${id}`)
        .then((response)=>{
            dispatch(setLoading(false))
            dispatch(FetchSuccess21(response.data))
        })
        .catch((error)=>{
            dispatch(setLoading(false))
            dispatch(FetchFailure21(error))
        })
    }
}

export const GetRegisterdDoctors=(id)=>{
    return(dispatch)=>{
        dispatch(FetchRequest41())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        return axios.get(external+`Auth/GetDoctors?id=${id}`,{headers})
        .then((response)=>{
            dispatch(FetchSuccess41(response.data))
            dispatch(setLoading(false))
            return response.data
        })
        .catch((error)=>{
            dispatch(FetchFailure41(error))
            dispatch(setLoading(false))
            return error
        })
    }
}

export const GetRegisterdPatients=(id)=>{
    return(dispatch)=>{
        dispatch(FetchRequest42())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        axios.get(external+`Auth/GetPatients?id=${id}`,{headers})
        .then((response)=>{
            dispatch(FetchSuccess42(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure42(error))
            dispatch(setLoading(false))

        })
    }
}

export const GetuserDataById=(id,type)=>{
    return(dispatch)=>{
        dispatch(FetchRequest33())
        dispatch(setLoading(true))
        axios.get(external+`Auth/GetUserData?id=${id}&UserType=${type}`)
        .then((response)=>{
          
            dispatch(FetchSuccess33(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
       
            dispatch(FetchFailure33(error.response))
            dispatch(setLoading(false))
        })
    }
}

export const GetExistingUser=(username,type)=>{
    return(dispatch)=>{
        dispatch(FetchRequest85())
        dispatch(setLoading(true))
        axios.get(external+`Auth/CheckExistingUser?userName=${username}&userType=${type}`)
        .then((response)=>{
            
            dispatch(FetchSuccess85(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
        
            dispatch(FetchFailure85(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetCheckExistingUsername=(data,type,context)=>{
   
    return(dispatch)=>{
        dispatch(FetchRequest37())
        dispatch(setLoading(true))
        axios.get(external+`Auth/CheckExistingUser?userName=${data}&userType=${type}`)
        .then((response)=>{
          
            dispatch(FetchSuccess37(response.data,context))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure37(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetGoogleuserinfoBytoken=(accessToken)=>{
    return(dispatch)=>{
        dispatch(setLoading(true))
        const headers={ Authorization: `Bearer ${accessToken}`}
        return axios.get(`https://www.googleapis.com/oauth2/v2/userinfo`,{headers})
        .then((response)=>{
          
            dispatch(setLoading(false))
            return response.data
        })
        .catch((error)=>{
          
            dispatch(setLoading(false))
        })
    }
}

export const GetDoctorsByName=(name)=>{
    return(dispatch)=>{
        dispatch(FetchRequest78())
        dispatch(setLoading(true))
        // const headers=Unauthorized.Actionsauthorized()
        axios.get(external+`Auth/GetDoctorsByName?name=${name}`)
        .then((response)=>{
          
            dispatch(FetchSuccess78(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
       
            dispatch(FetchFailure78(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetGenerateaSasToken=(name)=>{
    return(dispatch)=>{
        dispatch(FetchRequest79())
        dispatch(setLoading(true))
        // const headers=Unauthorized.Actionsauthorized()
        axios.get(external+`Auth/GenerateSasToken?containerName=${name}`)
        .then((response)=>{
          
            dispatch(FetchSuccess79(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
           
            dispatch(FetchFailure79(error))
            dispatch(setLoading(false))
        })
    }
}


export const GetCheckExistingEmail=(email,type)=>{
    return(dispatch)=>{
        dispatch(FetchRequest88())
        dispatch(setLoading(true))
        // const headers=Unauthorized.Actionsauthorized()
        return axios.get(external+`Auth/CheckExistingEmail?Email=${email}&userType=${type}`)
        .then((response)=>{
          
            dispatch(FetchSuccess88(response.data))
            dispatch(setLoading(false))
            return response.data
        })
        .catch((error)=>{
        
            dispatch(FetchFailure88(error))
            dispatch(setLoading(false))
            return error
        })
    }
}
//kyc

export const GetDoctorsWithPendingKyc=()=>{
    return(dispatch)=>{
        dispatch(FetchRequest77())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        axios.get(external+`Kyc/GetDoctorsWithPendingKyc`,{headers})
        .then((response)=>{
          
            dispatch(FetchSuccess77(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
          
            dispatch(FetchFailure77(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetIssuingAuthority=(id)=>{
    return(dispatch)=>{
        dispatch(FetchRequest82())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        axios.get(external+`Kyc/GetIssuingAuthorities`,{headers})
        .then((response)=>{
          
            dispatch(FetchSuccess82(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
       
            dispatch(FetchFailure82(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetRefreshkycStatus=()=>{
    return(dispatch)=>{
        dispatch(FetchRequest83())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        axios.get(external+`Kyc/RefreshKycStatus`,{headers})
        .then((response)=>{
           
            localStorage.setItem('accessToken',response.data.token)
            dispatch(FetchSuccess83(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            
            dispatch(FetchFailure83(error))
            dispatch(setLoading(false))
        })
    }
}

// DEPARTMENT
export const GetDepartmentData=()=>{
    return(dispatch)=>{
        dispatch(FetchRequest6())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        axios.get(external+'Departments/GetAllDepartments',{headers})
        .then((response)=>{
            dispatch(setLoading(false))
            dispatch(FetchSuccess6(response.data))
        })
        .catch((error)=>{
            dispatch(setLoading(false))
            dispatch(FetchFailure6(error))
        })
    }
}

// PATCH APIS

export const PatchUpdatePatientDob=(mrn,date)=>{
    return(dispatch)=>{
        dispatch(PatchRequest12())
        dispatch(setLoading(true))
        axios.patch(external+`Auth/UpdatePatientDob?MRN=${mrn}&dob=${date}`)
        .then((response)=>{
        
            toast('updated date of birth')
            dispatch(PatchSuccess12(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            //console.error('Error in posting image:', errorMessage);
            dispatch(PatchFailure12(error))
            dispatch(setLoading(false))
        })
    }
}

export const PatchSetPin=(data)=>{
    return(dispatch)=>{
        dispatch(PatchRequest13())
        dispatch(setLoading(true))
        return axios.patch(external+`Auth/SetMpin?UserName=${data.PhoneNumber}&MPIN=${data.mpin}&userType=${data.userType}&name=${data.name}`)
        .then((response)=>{
            toast('succesfully set the mpin')
            dispatch(PatchSuccess13(response.data))
            dispatch(setLoading(false))
            localStorage.setItem('accessToken',response.data.Token)
            return response.data
        })
        .catch((error)=>{
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            console.error('Error in posting image:', errorMessage);
            dispatch(PatchFailure13(error))
            dispatch(setLoading(false))
        })
    }
}

//kyc
export const PatchUpdateBasicProfileDetails=(data)=>{
    return(dispatch)=>{
        dispatch(PatchRequest1())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
    
        return axios
         .patch(external+`Kyc/UpdateBasicProfileDetials`,data,{headers})
        .then((response)=>{
            toast('Successfully updated profile')
            dispatch(PatchSuccess2(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            //console.error('Error in posting image:', errorMessage);
            dispatch(PatchFailure3(error))
            dispatch(setLoading(false))
        })
    }
}

export const PatchUpdateIdProof=(data)=>{
    return(dispatch)=>{
        dispatch(PatchRequest2())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
     
        axios.patch(external+`Kyc/UpdateIdProof`,data,{headers})
        .then((response)=>{
         
            toast('Successfully updated id proof')
            dispatch(PatchSuccess2(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            //console.error('Error in posting image:', errorMessage);
            dispatch(PatchFailure2(error))
            dispatch(setLoading(false))
        })
    }
}

export const PatchAcceptKyc=(docid,depid,fee)=>{
    return(dispatch)=>{
        dispatch(PatchRequest3())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
  
        axios.patch(external+`Kyc/AcceptKyc?doctorId=${docid}&departmentId=${depid}&fee=${fee}`,null,{headers})
        .then((response)=>{
         
            toast('Kyc Accepted')
            dispatch(PatchSuccess3(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            //console.error('Error in posting image:', errorMessage);
            toast(error.response.data.Message)
            dispatch(PatchFailure3(error))
            dispatch(setLoading(false))
        })
    }
}

export const PatchRejectKyc=(docid)=>{
    return(dispatch)=>{
        dispatch(PatchRequest4())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
      
        axios.patch(external+`Kyc/RejectKyc?doctorId=${docid}`,null,{headers})
        .then((response)=>{
         
            toast('Kyc Rejected')
            dispatch(PatchSuccess4(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            //console.error('Error in posting image:', errorMessage);
            dispatch(PatchFailure4(error))
            dispatch(setLoading(false))
        })
    }
}

export const PatchUpdateEducationDetails=(data)=>{
    return(dispatch)=>{
        dispatch(PatchRequest5())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
     
        axios.patch(external+`Kyc/UpdateEducationalDetails`,data,{headers})
        .then((response)=>{
           
            toast('Successfully Updated Education Details')
            dispatch(PatchSuccess5(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            //console.error('Error in posting image:', errorMessage);
            dispatch(PatchFailure5(error))
            dispatch(setLoading(false))
        })
    }
}

export const PatchUpdateEducationProofs=(data)=>{
    return(dispatch)=>{
        dispatch(PatchRequest15())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        
        axios.patch(external+`Kyc/UpdateEducationalProofs`,data,{headers})
        .then((response)=>{
           
            toast('Successfully Updated Education proofs')
            dispatch(PatchSuccess15(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            //console.error('Error in posting image:', errorMessage);
            dispatch(PatchFailure15(error))
            dispatch(setLoading(false))
        })
    }
}

export const PatchUpdateSpecializationDetails=(data)=>{
    return(dispatch)=>{
        dispatch(PatchRequest6())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
      
        return axios.patch(external+`Kyc/UpdateSpecializationDetails`,data,{headers})
        .then((response)=>{
         
            toast('Successfully Updated SpecializationDetails Details')
            dispatch(PatchSuccess6(response.data))
            dispatch(setLoading(false))
            return response.data
        })
        .catch((error)=>{
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            //console.error('Error in posting image:', errorMessage);
            dispatch(PatchFailure6(error))
            dispatch(setLoading(false))
        })
    }
}

export const PatchUpdateSpecializationCertificates=(data)=>{
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PatchRequest16())
        const headers=Unauthorized.Actionsauthorized()
        axios.patch(external+`Kyc/UpdateSpecializationCertificates`,data,{headers})
        .then((response)=>{
     
            dispatch(setLoading(false))
            dispatch(PatchSuccess16(response.data))
            toast('Successfully updated specialization certificates')
        })
        .catch((error) => {
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
           
            dispatch(setLoading(false));
            dispatch(PatchFailure16(error));
            toast('Please Select A Specialization');
        });
    }
}

export const PatchUpdateKycToPending=()=>{
    return(dispatch)=>{
        dispatch(PatchRequest7())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
   
        axios.patch(external+`Kyc/UpdateKycToPending`,null,{headers})
        .then((response)=>{
           
            toast('Successfully Updated Kyc To Pending Details')
            dispatch(PatchSuccess7(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
           
            dispatch(PatchFailure7(error))
            dispatch(setLoading(false))
        })
    }
}

export const PatchAdminUploadDoctorProfileDetails=(id,data)=>{
    return(dispatch)=>{
        dispatch(PatchRequest8())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
     
       return axios
       .patch(external+`Kyc/AdminUpdateDoctorProfileDetials?doctorId=${id}`,data,{headers})
        .then((response)=>{
      
            toast('Successfully Updated Profile Details By Admin')
            dispatch(PatchSuccess8(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            //console.error('Error in posting image:', errorMessage);
            dispatch(PatchFailure8(error))
            dispatch(setLoading(false))
        })
    }
}


export const PatchAdminUpdateEducationDetails=(id,data)=>{
    return(dispatch)=>{
        dispatch(PatchRequest9())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
   
        axios.patch(external+`Kyc/AdminUpdateEducationalDetails?doctorId=${id}`,data,{headers})
        .then((response)=>{
           
            toast('Successfully Updated Education Details By Admin')
            dispatch(PatchSuccess9(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            //console.error('Error in posting image:', errorMessage);
            dispatch(PatchFailure9(error))
            dispatch(setLoading(false))
        })
    }
}

export const PatchAdminUpdateIdProof=(id,data)=>{
    return(dispatch)=>{
        dispatch(PatchRequest10())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
       
        axios.patch(external+`Kyc/AdminUpdateIdProof?doctorId=${id}`,data,{headers})
        .then((response)=>{
          
            toast('Successfully Updated Id Proof Details By Admin')
            dispatch(PatchSuccess10(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
          
            dispatch(PatchFailure10(error))
            dispatch(setLoading(false))
        })
    }
}

export const PatchAdminUpdateRegistrationDetails=(id,data)=>{
    return(dispatch)=>{
        dispatch(PatchRequest11())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
       
        return axios.patch(external+`Kyc/AdminUpdateRegistrationDetails?doctorId=${id}`,data,{headers})
        .then((response)=>{
           
            toast('Successfully Updated Registration Details By Admin')
            dispatch(PatchSuccess11(response.data))
            dispatch(setLoading(false))
            return response.data
        })
        .catch((error)=>{
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            //console.error('Error in posting image:', errorMessage);
            dispatch(PatchFailure11(error))
            dispatch(setLoading(false))
        })
    }
}

export const PatchUpdateBankDetails=(data)=>{
    return(dispatch)=>{
        dispatch(PatchRequest14())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        
        return axios.patch(external+`Kyc/UpdateBankDetails`,data,{headers})
        .then((response)=>{
          
            toast('Successfully Updated Bank Details')
            dispatch(PatchSuccess14(response.data))
            dispatch(setLoading(false))
            return response.data
        })
        .catch((error)=>{
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            //console.error('Error in posting image:', errorMessage);
            dispatch(PatchFailure14(error))
            dispatch(setLoading(false))
        })
    }
}
