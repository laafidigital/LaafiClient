import axios from 'axios'
import { FetchFailure47, FetchFailure89, FetchFailure90, FetchFailure91, FetchRequest47, FetchRequest89, FetchRequest90, FetchRequest91, FetchSuccess47, FetchSuccess89, FetchSuccess90, FetchSuccess91, PostFailure53, PostRequest53, PostSuccess53 } from "../Actions"
import { setLoading } from '../LoadingSlice'
import Unauthorized from '../../Admin/Unauthorized'

const baseUrl='https://laafi.in/dev/api/'
const zoomurl='https://laafi.in/conference/api/'

export const GetuserConcferenceRoom=()=>{
    return(dispatch)=>{
        dispatch(FetchRequest47())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        axios.get(baseUrl+`conference/UserConferenceRooms`,{headers})
        .then((response)=>{
         
            dispatch(FetchSuccess47(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
        
            dispatch(FetchFailure47(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetZoomcallback = (code) => {
    return (dispatch) => {
        dispatch(FetchRequest89());
        dispatch(setLoading(true));

        const headers = Unauthorized.Actionsauthorized();

        return axios.get(zoomurl + `ZoomAuth/ZoomCallback?code=${code}`, { headers })
            .then((response) => {
                dispatch(FetchSuccess89(response.data));
                dispatch(setLoading(false));
                return response.data;
            })
            .catch((error) => {
                dispatch(FetchFailure89(error));
                dispatch(setLoading(false));
                throw error; 
            });
    };
};


export const GetZoomtokenBydoctorId=()=>{
    return (dispatch)=>{
        dispatch(FetchRequest90())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        return axios.get(zoomurl+`ZoomAuth/GetZoomTokenByDoctorId`,{headers})
        .then((response)=>{
            dispatch(FetchSuccess90(response.data))
            dispatch(setLoading(false))
            return response.data
        })
        .catch((error)=>{
       
            dispatch(FetchFailure90(error))
            dispatch(setLoading(false))
            return error
        })
    }
}

export const GetGenerateMeetingSignature=(meetnum,role)=>{
    return (dispatch)=>{
        dispatch(FetchRequest91())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        return axios.get(zoomurl+`ZoomAuth/GenerateMeetingSignature?meetingNumber=${meetnum}&role=${role}`,{headers})
        .then((response)=>{
            dispatch(FetchSuccess91(response.data))
            dispatch(setLoading(false))
            return response.data
        })
        .catch((error)=>{
           
            dispatch(FetchFailure91(error))
            dispatch(setLoading(false))
            return error
        })
    }
}
export const GetGenerateMeetingZak=(meetnum,role)=>{
    return (dispatch)=>{
        dispatch(FetchRequest91())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        return axios.get(zoomurl+`ZoomAuth/GenerateMeetingSignature?meetingNumber=${meetnum}&role=${role}`,{headers})
        .then((response)=>{
            dispatch(FetchSuccess91(response.data))
            dispatch(setLoading(false))
            return response.data
        })
        .catch((error)=>{
           
            dispatch(FetchFailure91(error))
            dispatch(setLoading(false))
            return error
        })
    }
}

export const PostCreateMeeting = (docid, consultid, ConsultationTime,email,phone) => {
    return (dispatch) => {
        dispatch(PostRequest53()); 
        dispatch(setLoading(true));

        const headers = Unauthorized.Actionsauthorized(); 
        return axios.post(zoomurl + `Meetings/create?doctorId=${docid}&consultationId=${consultid}&meetingTime=${ConsultationTime}&phoneNumber=${phone}&email=${email}`, { headers })
            .then((response) => {
                dispatch(PostSuccess53(response.data));
                dispatch(setLoading(false));
                return response.data;
            })
            .catch((error) => {
                console.error(error);
                dispatch(PostFailure53(error));
                dispatch(setLoading(false));
                throw error;
            });
    };
};