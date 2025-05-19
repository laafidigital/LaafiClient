import { createSlice } from "@reduxjs/toolkit";
import { FETCH_FAILURE20, FETCH_FAILURE25, FETCH_REQUEST20, FETCH_REQUEST25, FETCH_SUCCESS20, FETCH_SUCCESS25 } from "./Actions";

const initialState={
    Airesult:[],
    error:null
}

export const OpenAIslice=createSlice({
    name:'OpenAIslice',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(FETCH_REQUEST25,(state)=>{})
        .addCase(FETCH_SUCCESS25,(state,action)=>{
            state.Airesult=action.payload
        })
        .addCase(FETCH_FAILURE25,(state,action)=>{
            state.error=action.payload
        })
    }
})

export default OpenAIslice.reducer