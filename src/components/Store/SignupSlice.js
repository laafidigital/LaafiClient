import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import {  toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { POST_REQUEST2,POST_SUCCESS2,POST_FAILURE2, FETCH_REQUEST37, FETCH_SUCCESS37, FETCH_FAILURE37, FETCH_REQUEST24, FETCH_SUCCESS24, FETCH_FAILURE24, POST_REQUEST24, POST_SUCCESS24, POST_FAILURE24, POST_REQUEST23, POST_SUCCESS23, POST_FAILURE23, FETCH_REQUEST85, FETCH_SUCCESS85, FETCH_FAILURE85 } from "./Actions";

const initialState={
    users:{
         name:'',
         address:'',
         email:'',
         relation:'myself',
         otp:'',
         password:'',
         confirmpassword:''
        },

        defaultinput:{
            name:'',
            email:'',
            address:'',
            otp:'',
            password:'',
            confirmpassword:''
        },
        loading:false,
        signupresult:[],
        checkusernameExist:false,
        checkloginusernameExist:null,
        registeredpatientresponse:null,
        error:null
}

export const SignupSlice=createSlice({
    name:'signup',
    initialState,
    reducers:{
        setUsers:(state,action)=>{
          const {name,value}=action.payload
          state.users[name]=value
        },
        resetinput:(state,action)=>{
            state.users={...state.defaultinput}
        },
        setuserArray:(state,action)=>{
        state.usersarray.push(action.payload)
        },
        incrementid:(state)=>{
            state.userid.id += 1
        },
        setLoading:(state,action)=>{
            state.loading=action.payload
        },
        setemptypostresponse:(state)=>{
            state.registeredpatientresponse=null
        },
        setregisteredpatientresponse:(state,action)=>{state.registeredpatientresponse=action.payload},
        setemptycheckusernameexist:(state)=>{state.checkloginusernameExist=null},
        setemptychecusernamesignupexist:(state)=>{state.checkusernameExist=false}
    },

    extraReducers:(builder)=>{
        builder
        .addCase(POST_REQUEST2,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(POST_SUCCESS2,(state,action)=>{
            state.loading=false;
            toast('registration succesfull')
            state.registeredpatientresponse=action.payload.data
            state.error=null;
        })
        .addCase(POST_FAILURE2,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        .addCase(FETCH_REQUEST37,(state)=>{  })
        .addCase(FETCH_SUCCESS37,(state,action)=>{
           
            state.loading=false;
            if(action.payload.context=='signup'){
                state.checkusernameExist=action.payload.data
            }
            else{
                state.checkloginusernameExist=action.payload.data
            }
            state.error=null;
        })
        .addCase(FETCH_FAILURE37,(state,action)=>{})

        .addCase(FETCH_REQUEST85,(state)=>{  })
        .addCase(FETCH_SUCCESS85,(state,action)=>{
      
         state.checkloginusernameExist=action.payload
          
        })
        .addCase(FETCH_FAILURE85,(state,action)=>{})


        .addCase(POST_REQUEST24,(state)=>{  })
        .addCase(POST_SUCCESS24,(state,action)=>{
            state.loading=false;
            state.registeredpatientresponse=action.payload.data
            state.error=null;
        })
        .addCase(POST_FAILURE24,(state,action)=>{})

        .addCase(POST_REQUEST23,(state)=>{  })
        .addCase(POST_SUCCESS23,(state,action)=>{
            state.loading=false;
            state.registeredpatientresponse=action.payload.data
            state.error=null;
        })
        .addCase(POST_FAILURE23,(state,action)=>{})
    }  
})

export const {setUsers,resetinput,setuserArray,incrementid,signupApidata,setLoading,setemptypostresponse,setemptycheckusernameexist,setemptychecusernamesignupexist,setregisteredpatientresponse}=SignupSlice.actions
export default SignupSlice.reducer