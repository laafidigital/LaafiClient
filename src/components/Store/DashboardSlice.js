import { createSlice } from "@reduxjs/toolkit";
import { FETCH_FAILURE22, FETCH_FAILURE23, FETCH_FAILURE24, FETCH_FAILURE27, FETCH_FAILURE47, FETCH_FAILURE48, FETCH_FAILURE49, FETCH_FAILURE50, FETCH_FAILURE51, FETCH_FAILURE52, FETCH_FAILURE53, FETCH_FAILURE71, FETCH_REQUEST22, FETCH_REQUEST23, FETCH_REQUEST24, FETCH_REQUEST27, FETCH_REQUEST47, FETCH_REQUEST48, FETCH_REQUEST49, FETCH_REQUEST50, FETCH_REQUEST51, FETCH_REQUEST52, FETCH_REQUEST53, FETCH_REQUEST71, FETCH_SUCCESS22, FETCH_SUCCESS23, FETCH_SUCCESS24, FETCH_SUCCESS27, FETCH_SUCCESS47, FETCH_SUCCESS48, FETCH_SUCCESS49, FETCH_SUCCESS50, FETCH_SUCCESS51, FETCH_SUCCESS52, FETCH_SUCCESS53, FETCH_SUCCESS71 } from "./Actions";

const initialState={
    patientdetails:[],
    labdetails:[],
    pharmacydetails:[],
    monthData:[],
    dailyconsultation:null,
    dailylabservices:null,
    dailylab:null,
    montlypackage:null,
    dailypackage:null,
    packagedb:null,
    consultationreport:null,
    reportstatus:false,
}

export const DashboardSlice=createSlice({
    name:'dashboard',
    initialState,
    reducers:{
      setreportstatus:(state,action)=>{
        state.reportstatus=action.payload
      },
      setemptyconsultationreport:(state,action)=>{
        state.consultationreport=null
      }
    },
    extraReducers:(builder)=>{
      builder
      .addCase(FETCH_REQUEST22,(state)=>{})
      .addCase(FETCH_SUCCESS22,(state,action)=>{state.patientdetails=action.payload})
      .addCase(FETCH_FAILURE22,(state,action)=>{})

      .addCase(FETCH_REQUEST23,(state)=>{})
      .addCase(FETCH_SUCCESS23,(state,action)=>{state.labdetails=action.payload})
      .addCase(FETCH_FAILURE23,(state,action)=>{})

      .addCase(FETCH_REQUEST24,(state)=>{})
      .addCase(FETCH_SUCCESS24,(state,action)=>{state.pharmacydetails=action.payload})
      .addCase(FETCH_FAILURE24,(state,action)=>{})

      .addCase(FETCH_REQUEST27,(state)=>{})
      .addCase(FETCH_SUCCESS27,(state,action)=>{state.monthData=action.payload})
      .addCase(FETCH_FAILURE27,(state,action)=>{})

      .addCase(FETCH_REQUEST48,(state)=>{})
      .addCase(FETCH_SUCCESS48,(state,action)=>{state.dailyconsultation=action.payload})
      .addCase(FETCH_FAILURE48,(state,action)=>{})

      .addCase(FETCH_REQUEST49,(state)=>{})
      .addCase(FETCH_SUCCESS49,(state,action)=>{state.dailylab=action.payload})
      .addCase(FETCH_FAILURE49,(state,action)=>{})

      .addCase(FETCH_REQUEST50,(state)=>{})
      .addCase(FETCH_SUCCESS50,(state,action)=>{state.dailylabservices=action.payload})
      .addCase(FETCH_FAILURE50,(state,action)=>{})

      .addCase(FETCH_REQUEST51,(state)=>{})
      .addCase(FETCH_SUCCESS51,(state,action)=>{state.montlypackage=action.payload})
      .addCase(FETCH_FAILURE51,(state,action)=>{})

      .addCase(FETCH_REQUEST52,(state)=>{})
      .addCase(FETCH_SUCCESS52,(state,action)=>{state.dailypackage=action.payload})
      .addCase(FETCH_FAILURE52,(state,action)=>{})

      .addCase(FETCH_REQUEST53,(state)=>{})
      .addCase(FETCH_SUCCESS53,(state,action)=>{state.packagedb=action.payload})
      .addCase(FETCH_FAILURE53,(state,action)=>{})

      .addCase(FETCH_REQUEST71,(state)=>{})
      .addCase(FETCH_SUCCESS71,(state,action)=>{state.consultationreport=action.payload})
      .addCase(FETCH_FAILURE71,(state,action)=>{})

    }
})
export const {setreportstatus,setemptyconsultationreport}=DashboardSlice.actions
export default DashboardSlice.reducer