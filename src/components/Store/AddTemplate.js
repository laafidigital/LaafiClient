import { createSlice } from "@reduxjs/toolkit";
import { DELETE_FAILURE3, DELETE_REQUEST3, DELETE_SUCCESS3, FETCH_FAILURE31, FETCH_FAILURE87, FETCH_REQUEST31, FETCH_REQUEST87, FETCH_SUCCESS31, FETCH_SUCCESS87, POST_FAILURE, POST_FAILURE18, POST_REQUEST18, POST_SUCCESS18 } from "./Actions";

const initialState={
  templatedataBydepId:[],
  templatepostresult:null,
  templatedeleteresult:null,
  findbydepartmentid:null
}

export const TemplateSlice=createSlice({
    name:'template',
    initialState,
    reducers:{
      setemptytemplatepostresult:(state,action)=>{
       state.templatepostresult=null
      },
      setemptydeletetemppostresult:(state,action)=>{
        state.templatedeleteresult=null
      },
      setemptyfindbydepartmentid:(state,action)=>{
        state.findbydepartmentid=null
      }
    },
    extraReducers:(builder)=>{
      builder
      .addCase(FETCH_REQUEST31,(state,action)=>{})
      .addCase(FETCH_SUCCESS31,(state,action)=>{
         state.templatedataBydepId=action.payload
      })
      .addCase(FETCH_FAILURE31,(state,action)=>{})

      .addCase(FETCH_REQUEST87,(state,action)=>{})
      .addCase(FETCH_SUCCESS87,(state,action)=>{
         state.findbydepartmentid=action.payload
      })
      .addCase(FETCH_FAILURE87,(state,action)=>{})

      .addCase(POST_REQUEST18,(state,action)=>{})
      .addCase(POST_SUCCESS18,(state,action)=>{
         state.templatepostresult=action.payload
      })
      .addCase(POST_FAILURE18,(state,action)=>{})

      .addCase(DELETE_REQUEST3,(state,action)=>{})
      .addCase(DELETE_SUCCESS3,(state,action)=>{
         state.templatedeleteresult=action.payload
      })
      .addCase(DELETE_FAILURE3,(state,action)=>{})
    }
})

export const {setemptytemplatepostresult,setemptydeletetemppostresult,setemptyfindbydepartmentid}=TemplateSlice.actions
export default TemplateSlice.reducer