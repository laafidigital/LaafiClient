import { createSlice } from "@reduxjs/toolkit";
import { FETCH_FAILURE, FETCH_REQUEST, FETCH_SUCCESS,FETCH_REQUEST2,FETCH_SUCCESS2,FETCH_FAILURE2,POST_REQUEST3,POST_SUCCESS3,POST_FAILURE3, FETCH_REQUEST3, FETCH_SUCCESS3, FETCH_FAILURE3 } from "./Actions";
import { toast } from "react-toastify";
import { setLoading } from './LoadingSlice';


const initialState={
    userresult:[],
    roleresult:[],
    userbyid:[],
    loading:false,
    error:null,
}

export const AssignRoleSlice=createSlice({
    name:'assignrole',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
//getusers cases
        .addCase(FETCH_REQUEST,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(FETCH_SUCCESS,(state,action)=>{
            state.loading=false;
            state.userresult=action.payload;
            state.error=null
        })
        .addCase(FETCH_FAILURE,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
//getroles cases
        .addCase(FETCH_REQUEST2,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(FETCH_SUCCESS2,(state,action)=>{
            state.loading=false;
            state.roleresult=action.payload
            state.error=null
        })
        .addCase(FETCH_FAILURE2,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase(POST_REQUEST3,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(POST_SUCCESS3,(state,action)=>{
            state.error=null
            // toast(action.payload)
            state.loading=false
        })
        .addCase(POST_FAILURE3,(state,action)=>{
            state.error=action.payload
            state.loading=false
        })
        .addCase(FETCH_REQUEST3,(state)=>{})
        .addCase(FETCH_SUCCESS3,(state,action)=>{
            state.userbyid=action.payload
        })
        .addCase(FETCH_FAILURE3,(state,action)=>{
           
            // toast(action.payload)
        })
    }
})


export default AssignRoleSlice.reducer