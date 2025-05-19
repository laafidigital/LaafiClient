import { createSlice } from "@reduxjs/toolkit";
import { FETCH_FAILURE71, FETCH_FAILURE72, FETCH_FAILURE73, FETCH_FAILURE74, FETCH_FAILURE77, FETCH_FAILURE80, FETCH_FAILURE81, FETCH_FAILURE82, FETCH_REQUEST71, FETCH_REQUEST72, FETCH_REQUEST73, FETCH_REQUEST74, FETCH_REQUEST77, FETCH_REQUEST80, FETCH_REQUEST81, FETCH_REQUEST82, FETCH_SUCCESS71, FETCH_SUCCESS72, FETCH_SUCCESS73, FETCH_SUCCESS74, FETCH_SUCCESS77, FETCH_SUCCESS80, FETCH_SUCCESS81, FETCH_SUCCESS82, PATCH_FAILURE1, PATCH_FAILURE3, PATCH_FAILURE4, PATCH_FAILURE7, PATCH_REQUEST3, PATCH_REQUEST4, PATCH_REQUEST7, PATCH_SUCCESS3, PATCH_SUCCESS4, PATCH_SUCCESS7 } from "../Actions";

const initialState={
 parentStatus:false,
 checklistStatus:true,
 checklistEditId:0,
 contries:null,
 city:null,
 degree:[{DegreeName:'Bachelor of Arts (B.A.)'},
        {DegreeName:'Bachelor of Science (B.Sc.)'},
        {DegreeName:'Bachelor of Technology (B.Tech.)'}],
 universities:[{UniversityName:'University of Delhi (Delhi University)'},
             {UniversityName:'Indian Institute of Science (IISc), Bangalore'},
             {UniversityName:'University of Mumbai'}],
 error:null,
 specilization:null,
 issuingauthority:null,
 doctorswithpendingkyc:null,
 kycacceptpatchresponse:null,
 kycrejectpatchresponse:null,
 kycupdatedtopendingresponse:null,
 kycDoctorId:null,
}

export const KycderailsSlice=createSlice({
    name:'SearchSlice',
    initialState,
    reducers:{
        setparentstatus:(state,action)=>{state.parentStatus=action.payload},
        setemptkycacceptresponse:(state)=>{state.kycacceptpatchresponse=null},
        setemptkyrejectresponse:(state)=>{state.kycrejectpatchresponse=null},
        seterror:(state,action)=>{state.error=action.payload},
        setemptyerror:(state)=>{state.error=null},
        setCheklistStatus:(state,action)=>{state.checklistStatus=action.payload},
        setchecklistEditId:(state,action)=>{state.checklistEditId=action.payload},
        setemptykycUpdatedtoPendingResponse:(state,action)=>{state.kycupdatedtopendingresponse=null},
        setkycDoctorId:(state,action)=>{state.kycDoctorId=action.payload},
        setemptykycDoctorid:(state)=>{state.kycDoctorId=null}
    },
    extraReducers:(builder)=>{
        builder
        .addCase(FETCH_REQUEST73,(state,action)=>{})
        .addCase(FETCH_SUCCESS73,(state,action)=>{state.contries=action.payload})
        .addCase(FETCH_FAILURE73,(state,action)=>{state.error=action.payload})

        .addCase(FETCH_REQUEST74,(state,action)=>{})
        .addCase(FETCH_SUCCESS74,(state,action)=>{state.city=action.payload})
        .addCase(FETCH_FAILURE74,(state,action)=>{state.error=action.payload})

        .addCase(FETCH_REQUEST72,(state,action)=>{})
        .addCase(FETCH_SUCCESS72,(state,action)=>{
            // action.payload
            state.universities=state.universities
        })
        .addCase(FETCH_FAILURE72,(state,action)=>{ state.error=action.payload})

        .addCase(FETCH_REQUEST77,(state,action)=>{})
        .addCase(FETCH_SUCCESS77,(state,action)=>{state.doctorswithpendingkyc=action.payload})
        .addCase(FETCH_FAILURE77,(state,action)=>{state.error=action.payload})

        .addCase(FETCH_REQUEST80,(state,action)=>{})
        .addCase(FETCH_SUCCESS80,(state,action)=>{state.degree=action.payload})
        .addCase(FETCH_FAILURE80,(state,action)=>{state.error=action.payload})

        .addCase(FETCH_REQUEST81,(state,action)=>{})
        .addCase(FETCH_SUCCESS81,(state,action)=>{state.specilization=action.payload})
        .addCase(FETCH_FAILURE81,(state,action)=>{state.error=action.payload})

        .addCase(FETCH_REQUEST82,(state,action)=>{})
        .addCase(FETCH_SUCCESS82,(state,action)=>{state.issuingauthority=action.payload})
        .addCase(FETCH_FAILURE82,(state,action)=>{state.error=action.payload})

        .addCase(PATCH_REQUEST3,(state,action)=>{})
        .addCase(PATCH_SUCCESS3,(state,action)=>{state.kycacceptpatchresponse=action.payload})
        .addCase(PATCH_FAILURE3,(state,action)=>{state.error=action.payload})

        .addCase(PATCH_REQUEST4,(state,action)=>{})
        .addCase(PATCH_SUCCESS4,(state,action)=>{state.kycrejectpatchresponse=action.payload})
        .addCase(PATCH_FAILURE4,(state,action)=>{state.error=action.payload})

        .addCase(PATCH_REQUEST7,(state,action)=>{})
        .addCase(PATCH_SUCCESS7,(state,action)=>{state.kycupdatedtopendingresponse=action.payload})
        .addCase(PATCH_FAILURE7,(state,action)=>{state.error=action.payload})
    }
})
export const {setparentstatus,setemptkycacceptresponse,setemptkyrejectresponse,seterror,setemptyerror,setCheklistStatus,setchecklistEditId,setemptykycUpdatedtoPendingResponse,setkycDoctorId,setemptykycDoctorid}=KycderailsSlice.actions
export default KycderailsSlice.reducer