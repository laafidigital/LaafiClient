import { createSlice } from "@reduxjs/toolkit";

export const AddusersSlice=createSlice({
    name:'addusers',
    initialState:{
        adduserInput:{},
        error:{
            location: '',
            name: '',
            email: '',
            department: '',
            password: '',
            confirmpassword: '',
          }
    },
    reducers:{
        setAddUserInput:(state,action)=>{
            const {name,value}=action.payload
            state.adduserInput[name]=value
        },
        setErrorInput:(state,action)=>{
           
            state.error.location=action.payload.location
            state.error.name=action.payload.name
            state.error.email=action.payload.email
            state.error.department=action.payload.department
            state.error.password=action.payload.password
            state.error.confirmpassword=action.payload.confirmpassword
            const {name,value}=action.payload
            state.error[name]=value
 
        }

    }
})
export const {setAddUserInput,setErrorInput}=AddusersSlice.actions
export default AddusersSlice.reducer