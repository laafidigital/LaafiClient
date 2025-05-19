import { createSlice } from "@reduxjs/toolkit";
import { FETCH_FAILURE35, FETCH_FAILURE36, FETCH_FAILURE58, FETCH_REQUEST35, FETCH_REQUEST36, FETCH_REQUEST58, FETCH_SUCCESS35, FETCH_SUCCESS36, FETCH_SUCCESS58 } from "./Actions";

const initialState={
 bloodbankData:[],
 bloodbankDataByStatus:[],
 bloodbankinventoryview:null
}

export const BloodBankSlice=createSlice({
    name:'bloodbank',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(FETCH_REQUEST35,(state,action)=>{})
        .addCase(FETCH_SUCCESS35,(state,action)=>{
            state.bloodbankData=action.payload
        })
        .addCase(FETCH_FAILURE35,(state,action)=>{})


        .addCase(FETCH_REQUEST36,(state,action)=>{})
        .addCase(FETCH_SUCCESS36,(state,action)=>{
            state.bloodbankDataByStatus=action.payload
        })
        .addCase(FETCH_FAILURE36,(state,action)=>{})


        .addCase(FETCH_REQUEST58,(state,action)=>{})
        .addCase(FETCH_SUCCESS58,(state,action)=>{
            state.bloodbankinventoryview=action.payload
        })
        .addCase(FETCH_FAILURE58,(state,action)=>{})
    }
})

export default BloodBankSlice.reducer