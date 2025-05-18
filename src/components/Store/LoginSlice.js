import { createSlice } from "@reduxjs/toolkit";
import { POST_REQUEST,POST_SUCCESS,POST_FAILURE, FETCH_REQUEST4, FETCH_SUCCESS4, FETCH_FAILURE4, FETCH_REQUEST79, FETCH_SUCCESS79, FETCH_FAILURE79 } from "./Actions";

const initialState={
    logindata: [{id:1,name:'admin', email:'admin@gmail.com',password:'pwd12345',type:'admin'},
              {id:2,name:'prabas',address:'whitefeild', email:'prabas@gmail.com',phone:'9988776655',otp:'2233',password:'pwd12345',type:'doctor'},
              {id:3,name:'mohan',address:'channasandra', email:'mohan@gmail.com',phone:'9876543212',otp:'2235',relation:'father',password:'123456',type:'patient'},
              {id:4,name:'lab',address:'whitefeild', email:'lab@gmail.com',phone:'9988776699',otp:'2275',password:'pwd12345',type:'lab'},
              {id:5,name:'pharmacy',address:'whitefeild', email:'pharmacy@gmail.com',phone:'9988776699',otp:'2277',password:'pwd12345',type:'pharmacy'},
              {id:6,name:'reception',address:'whitefeild', email:'reception@gmail.com',phone:'9988776699',otp:'2277',password:'pwd12345',type:'reception'},
           ],
    loginData:{},       
    inputdata:{username:'',password:'',},
    defaulinput:{ email:'',password:'',},
    userdetailsfordashboard:{name:'',phone:'',type:''},
      loading:false,
      result:null,
      rolesdata:[],
      sastoken:null,
      error:null,
      forgotmpin:false,
      loginwithotp:false
}


export const LoginSlice=createSlice({
    name:'logindetails',
    initialState,
    reducers:{
    setinputdata: (state, action) => {
        const { name, value } = action.payload;
          state.inputdata[name] = value;
      },
      setloginArray:(state,action)=>{
        state.logindata.push(action.payload)
      },
      setresetinput:(state)=>{
        state.inputdata={...state.defaulinput}
      },
      resetroledata:(state)=>{
        state.rolesdata=[]
      },
      setemptyloginresponse:(state,action)=>{
        state.result=action.payload
      },
      setlogindata:(state,action)=>{
       state.loginData={...state.loginData,...action.payload}
      },
      setemptylogindata:(state)=>{
        state.loginData={}
      },
      setforgetmpin:(state,action)=>{
        state.forgotmpin=action.payload
      },
      setloginwithotp:(state,action)=>{
        state.loginwithotp=action.payload
      },
      setemptyerror:(state,action)=>{
        state.error=null
      },
      setuserdataUpdate:(state,action)=>{
        state.userdetailsfordashboard = {
          ...state.userdetailsfordashboard, 
          ...action.payload                 
        };
      },
      setemptyuserdataupdate:(state)=>{
        state.userdetailsfordashboard={name:'',phone:'',type:''}
      }
 },
    extraReducers:(builder)=>{
      builder
      .addCase(POST_REQUEST,(state)=>{
        state.error=null;
      })
      .addCase(POST_SUCCESS,(state,action)=>{
        state.error=null;
        state.result=action.payload.data
        localStorage.setItem('accessToken',action.payload.data.token)
      })
      .addCase(POST_FAILURE,(state,action)=>{
        state.error=action.payload
      })

      .addCase(FETCH_REQUEST4,(state)=>{state.error=null})
      .addCase(FETCH_SUCCESS4,(state,action)=>{state.rolesdata=action.payload})
      .addCase(FETCH_FAILURE4,(state,action)=>{state.error=action.payload})

      .addCase(FETCH_REQUEST79,(state)=>{state.error=null})
      .addCase(FETCH_SUCCESS79,(state,action)=>{
        localStorage.setItem('sasstoken',action.payload)
        state.sastoken=action.payload
      })
      .addCase(FETCH_FAILURE79,(state,action)=>{ state.error=action.payload})
    }
})
export const {setinputdata,setErrors,setloginArray,setresetinput,loginApidata,setresultdata,resetroledata,setemptyloginresponse,setlogindata,setemptylogindata,setforgetmpin,setloginwithotp,setemptyerror,setuserdataUpdate,setemptyuserdataupdate}=LoginSlice.actions
export default LoginSlice.reducer