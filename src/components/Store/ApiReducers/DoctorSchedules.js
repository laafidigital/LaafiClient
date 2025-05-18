import axios from 'axios'
import { setLoading } from "../LoadingSlice"
import { toast } from "react-toastify"
import Unauthorized from "../../Admin/Unauthorized"
import { FetchFailure16, FetchFailure43, FetchFailure55, FetchFailure8, FetchFailure86, FetchFailure87, FetchFailure9, FetchRequest16, FetchRequest43, FetchRequest55, FetchRequest8, FetchRequest86, FetchRequest87, FetchRequest9, FetchSuccess16, FetchSuccess43, FetchSuccess55, FetchSuccess8, FetchSuccess86, FetchSuccess87, FetchSuccess9, PostFailure25, PostFailure46, PostRequest25, PostRequest46, PostSuccess25, PostSuccess46 } from '../Actions'

const baseUrl='https://laafi.in/schedule/api/'

export const PostEditDoctorSchedule=(id,data)=>{
 
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest25())
        const headers=Unauthorized.Actionsauthorized()
        axios.post(baseUrl+`DoctorSchedules/EditDocSchedules?id=${id}`,data,{headers})
        .then((response)=>{
           
            dispatch(setLoading(false))
            dispatch(PostSuccess25(response.data))
            toast('Successfully Added')
        })
        .catch((error) => {
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            //console.error('Error in posting image:', errorMessage);
            dispatch(setLoading(false));
            dispatch(PostFailure25(error));
            toast(errorMessage);
        });
    }
}

export const PostEditDoctorByToken=(data)=>{
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest46())
        const headers=Unauthorized.Actionsauthorized()
        return axios.post(baseUrl+`DoctorSchedules/EditDoctorScheduleByToken`,data,{headers})
        .then((response)=>{
          
            dispatch(setLoading(false))
            dispatch(PostSuccess46(response.data))
          
            return(response.data)
        })
        .catch((error) => {
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            //console.error('Error in posting image:', errorMessage);
            dispatch(setLoading(false));
            dispatch(PostFailure46(error));
            toast('Please Select A Specialization');
            return(error)
        });
    }
}

// GET
export const Getdoctorsonly=(id)=>{
    return(dispatch)=>{
        dispatch(FetchRequest8())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        axios.get(baseUrl+`DoctorSchedules/GetdoctorSchedule?DoctorId=${id}`,{headers})
        .then((response)=>{
            dispatch(setLoading(false))
            dispatch(FetchSuccess8(response.data))
        })
        .catch((error)=>{
            dispatch(setLoading(false))
            dispatch(FetchFailure8(error))
        })
    }
}

export const GetdoctorsonlybydepId=(id)=>{
    return(dispatch)=>{
        dispatch(FetchRequest9())
        dispatch(setLoading(true))
        axios.get(baseUrl+`DoctorSchedules/GetDoctorScheduleByDept/${id}`)
        .then((response)=>{
            dispatch(FetchSuccess9(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure9(error))
            dispatch(setLoading(false))

        })
    }
}

export const GetDocShecduleById=(id)=>{
    return(dispatch)=>{
        dispatch(FetchRequest16())
        dispatch(setLoading(true))
        axios.get(baseUrl+`DoctorSchedules/${id}`)
        .then((response)=>{
            dispatch(FetchSuccess16(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure16(error))
            dispatch(setLoading(false))
        })
    }
}


export const GetDocShecduleBydocIdandDate=(id)=>{
    return(dispatch)=>{
        dispatch(FetchRequest43())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        axios.get(baseUrl+`DoctorSchedules/${id}`,{headers})
        .then((response)=>{
            dispatch(FetchSuccess43(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure43(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetdocSchedulebyDay=(day)=>{
    return(dispatch)=>{
        dispatch(FetchRequest55())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        axios.get(baseUrl+`DoctorSchedules/GetdoctorScheduleByDay?day=${day}`,{headers})
        .then((response)=>{
         
            dispatch(FetchSuccess55(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
         
            dispatch(FetchFailure55(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetDoctorSlotsForTheWeek=(id)=>{
    return(dispatch)=>{
        dispatch(FetchRequest86())
        dispatch(setLoading(true))
        return axios.get(baseUrl+`DoctorSchedules/GetDoctorSlotsForTheWeek?DoctorId=${id}`)
        .then((response)=>{
          
            dispatch(FetchSuccess86(response.data))
            dispatch(setLoading(false))
            return response.data;
        })
        .catch((error)=>{
          
            dispatch(FetchFailure86(error))
            dispatch(setLoading(false))
        })
    }
}

