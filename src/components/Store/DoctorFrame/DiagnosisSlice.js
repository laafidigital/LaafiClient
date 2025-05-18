import { createSlice } from "@reduxjs/toolkit";
import { FETCH_FAILURE75, FETCH_REQUEST75, FETCH_SUCCESS75, POST_FAILURE19, POST_FAILURE26, POST_REQUEST19, POST_REQUEST26, POST_SUCCESS19, POST_SUCCESS26 } from "../Actions";

const initialState={
    diagnosepatient:[],
    diagnosisinputdata:{
        services:[],
        medicindata:[],
        medicine:[]
    },
    defaultinput:{
        patientname:'',
        cheif_complaints:'',
        hpi:'',
        past_history:'',
        family_history:'',
        pulse:'',
        bp:'',
        r_rate:'',
        temp:'',
        systemic_exam:'',
        final_diagnosis:'',
        services:[],
        medicine:[],
        medicindata:[],

    },
    docFileAi:[],
    ispreviewdialoge:false,
    Postdoctorconsultationresult:null,
    docselectedservices:[],
    docservicestatus:false,
    consultedpatients:[],
}

export const diagnosisSlice=createSlice({
    name:'diagnosepatients',
    initialState,
    reducers:{
        setDiagnosisinput:(state,action)=>{
           
            const {name,value}=action.payload
          
            if(name=='addservices'){
                state.diagnosisinputdata.services=value
            }
            else if(name==='medicinedetails'){
                state.diagnosisinputdata.medicindata.push(value)
            }
            else if(name==='addmedicine'){
                state.diagnosisinputdata.medicine=value
            }
            else{
                state.diagnosisinputdata[name]=value
            }
        },
        setDiagnosepatient:(state,action)=>{
            state.diagnosepatient.push(action.payload)
        },
        resetinput:(state,action)=>{
            state.diagnosisinputdata={...state.defaultinput}
        },
        setispreviewdialoge:(state,action)=>{
            state.ispreviewdialoge=action.payload
        },
        setemptypostdoctorconstationresult:(state)=>{
            state.Postdoctorconsultationresult=null
        },
        setdocselectedservices:(state,action)=>{
            state.docselectedservices=[...state.docselectedservices,action.payload]
        },
        removedocselectedservices:(state,action)=>{
          
           state.docselectedservices=state.docselectedservices.filter(item=>item !==action.payload)
        },
        setdocservicestatus:(state,action)=>{
            state.docservicestatus=action.payload
        },
        setemptydocselectedservices:(state)=>{
            state.docselectedservices=[]
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(POST_REQUEST19,(state,action)=>{})
        .addCase(POST_SUCCESS19,(state,action)=>{
            state.docFileAi=action.payload
        })
        .addCase(POST_FAILURE19,(state,action)=>{})

        .addCase(POST_REQUEST26,(state,action)=>{})
        .addCase(POST_SUCCESS26,(state,action)=>{
            state.Postdoctorconsultationresult=action.payload
        })
        .addCase(POST_FAILURE26,(state,action)=>{})

        .addCase(FETCH_REQUEST75,(state)=>{})
        .addCase(FETCH_SUCCESS75,(state,action)=>{
        state.consultedpatients=action.payload
        })
        .addCase(FETCH_FAILURE75,(state,action)=>{
        state.errors=action.payload
      })
    }
})

export const {setDiagnosepatient,setDiagnosisinput,resetinput,setispreviewdialoge,setemptypostdoctorconstationresult,setdocselectedservices,removedocselectedservices,setdocservicestatus,setemptydocselectedservices}=diagnosisSlice.actions
export default diagnosisSlice.reducer
