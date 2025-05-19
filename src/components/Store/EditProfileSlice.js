import { createSlice } from "@reduxjs/toolkit";

const initialState={
    EditInput:{},
    Editerror:{
    name:'',
    email:'',
    number:'',
    current_pass:'',
    new_pass:'',
    confirm_pass:''    
    }
}
export const EditProfileSlice=createSlice({
 name:'editprofile',
 initialState,
 reducers:{
    setEditInput:(state,action)=>{
        const {name,value}=action.payload
        state.EditInput[name]=value
    },
    setEditError:(state,action)=>{
        const {name,value}=action.payload
        state.Editerror.name=action.payload.name
        state.Editerror.email=action.payload.email
        state.Editerror.number=action.payload.number
        state.Editerror.current_pass=action.payload.current_pass
        state.Editerror.new_pass=action.payload.new_pass
        state.Editerror.confirm_pass=action.payload.confirm_pass
        state.EditInput[name]=value
    }
 }
})

export const {setEditInput,setEditError}=EditProfileSlice.actions
export default EditProfileSlice.reducer