import { createSlice } from "@reduxjs/toolkit";
import { DELETE_FAILURE2, DELETE_REQUEST2, DELETE_SUCCESS2, FETCH_FAILURE12, FETCH_FAILURE5, FETCH_FAILURE65, FETCH_FAILURE66, FETCH_FAILURE67, FETCH_FAILURE68, FETCH_REQUEST12, FETCH_REQUEST5, FETCH_REQUEST65, FETCH_REQUEST66, FETCH_REQUEST67, FETCH_REQUEST68, FETCH_SUCCESS12, FETCH_SUCCESS5, FETCH_SUCCESS65, FETCH_SUCCESS66, FETCH_SUCCESS67, FETCH_SUCCESS68, POST_FAILURE32, POST_FAILURE33, POST_FAILURE4, POST_REQUEST32, POST_REQUEST33, POST_REQUEST4, POST_SUCCESS32, POST_SUCCESS33, POST_SUCCESS4 } from "./Actions";
import { toast } from "react-toastify";

const initialState={
  addServicesArray:[
    {servicedepartment:'neurology',servicename:'CT scan',category:'scan',unitofmeasure:'HU',min_val:'7',max_val:"9",toxic_val:'15',price:'2350'},
    {servicedepartment:'neurology',servicename:'ferritin',category:'lab',unitofmeasure:'ng/ml',min_val:'24',max_val:'336',toxic_val:'340',price:'500'},
    {servicename:'protrombin time',category:'lab',unitofmeasure:'sec',min_val:'8.76',max_val:'13.6',toxic_val:'15',price:'700'},
    {servicedepartment:'oncology',servicename:'positron emission tomography (PET)',category:'scan',unitofmeasure:'mm',min_val:'3',max_val:"5",toxic_val:'15',price:'2000'},
    {servicename:'lipase',category:'lab',unitofmeasure:'U/L',min_val:'0',max_val:'60',toxic_val:'65',price:'800'},
  ],
  condition:["Acidity","Allergy Tests","Anemia Tests","Arthritis Tests","Bone Profile Tests","COVID","Cancer Tests",
           "Diabetes Tests","Fatigue Tests","Fever","Genetic Tests","Heart Tests","Hormone Tests","infection Tests",
           "Kidney Tests","Lipid Tests","Liver Tests","Neurology Tests","Obesity Tests","PCOD","Pregnancy Tests","Stroke Condition",
           "Thyroid Tests","Tuberculosis","Tumour","Vitamin Tests",
            ],
  deleteresult:[],
  postresult:[],
  serviceresult:[],
  servicesbyid:[],
  loading:false,
  servicegroups:null,
  postservicegroupresult:null,
  specimen:null,
  postspecimenresult:null,
  servicesbygroupid:null,
  selectedservices:[],
  servicegroupstatus:false,
  servicesbyserviceids:null,
  error:null,
}

export const AddservicesSlice=createSlice({
    name:'addservice',
    initialState,
    reducers:{
        setServiceArray:(state,action)=>{state.addServicesArray.push(action.payload)}, 
        setemptypostservicegroup:(state,action)=>{state.postservicegroupresult=null},
        setemptypostspecimen:(state,action)=>{state.postspecimenresult=null},
        setselectedservices:(state,action)=>{
         
          state.selectedservices=[...state.selectedservices,action.payload]
        },
        removefromselectedservice:(state,action)=>{
          state.selectedservices = state.selectedservices.filter(serviceId => serviceId.Id !== action.payload);
        },
        setemptyselectedservices:(state,action)=>{state.selectedservices=[]},
        setservicegroupstatus:(state,action)=>{state.servicegroupstatus=action.payload},
        setemptyservicesbyserviceids:(state)=>{state.servicesbyserviceids=null},
        setemptyservicesbyservicegroupid:(state)=>{state.servicesbygroupid=null}
    },
    extraReducers:(builder)=>{
      builder
      .addCase(POST_REQUEST4,(state)=>{
        state.loading=true
        state.error=null
      })
      .addCase(POST_SUCCESS4,(state,action)=>{
        state.loading=false
        state.error=null
        state.postresult=action.payload
        toast('Succesfully Added New Service')
      })
      .addCase(POST_FAILURE4,(state,action)=>{
        state.loading=false
        state.error=action.payload
      })


      .addCase(FETCH_REQUEST5,(state)=>{
        state.loading=true
        state.error=null
      })
      .addCase(FETCH_SUCCESS5,(state,action)=>{
        state.loading=false
        state.serviceresult=action.payload
        state.error=null
      })
      .addCase(FETCH_FAILURE5,(state,action)=>{
        state.loading=false
        state.error=action.payload
      })


      .addCase(DELETE_REQUEST2,(state,action)=>{
        state.loading=true
        state.error=null
      })
      .addCase(DELETE_SUCCESS2,(state,action)=>{
        state.loading=false
        state.error=null 
        state.deleteresult=action.payload
      })
      .addCase(DELETE_FAILURE2,(state,action)=>{
        state.loading=true
        state.error=action.payload
      })


      .addCase(FETCH_REQUEST12,(state)=>{
        state.loading=true
        state.error=null
      })
      .addCase(FETCH_SUCCESS12,(state,action)=>{
        state.loading=false
        state.error=null
        state.servicesbyid=action.payload
      })
      .addCase(FETCH_FAILURE12,(state,action)=>{
        state.loading=false
        state.error=action.payload
      })


      .addCase(FETCH_REQUEST65,(state)=>{})
      .addCase(FETCH_SUCCESS65,(state,action)=>{
        state.servicegroups=action.payload
      })
      .addCase(FETCH_FAILURE65,(state,action)=>{
        state.error=action.payload
      })


      .addCase(POST_REQUEST32,(state)=>{})
      .addCase(POST_SUCCESS32,(state,action)=>{
        state.postservicegroupresult=action.payload
      })
      .addCase(POST_FAILURE32,(state,action)=>{
        state.error=action.payload
      })


      .addCase(FETCH_REQUEST66,(state)=>{})
      .addCase(FETCH_SUCCESS66,(state,action)=>{
        state.specimen=action.payload
      })
      .addCase(FETCH_FAILURE66,(state,action)=>{
        state.error=action.payload
      })


      .addCase(POST_REQUEST33,(state)=>{})
      .addCase(POST_SUCCESS33,(state,action)=>{
        state.postspecimenresult=action.payload
      })
      .addCase(POST_FAILURE33,(state,action)=>{
        state.error=action.payload
      })


      .addCase(FETCH_REQUEST67,(state)=>{})
      .addCase(FETCH_SUCCESS67,(state,action)=>{
        state.servicesbygroupid=action.payload
      })
      .addCase(FETCH_FAILURE67,(state,action)=>{
        state.error=action.payload
      })

      .addCase(FETCH_REQUEST68,(state)=>{})
      .addCase(FETCH_SUCCESS68,(state,action)=>{
        state.servicesbyserviceids=action.payload
      })
      .addCase(FETCH_FAILURE68,(state,action)=>{
        state.error=action.payload
      })

    }
})
export const {setAddserviceFeild,setserviceErrors,setServiceArray,setdefaultvalue,setemptypostservicegroup,setemptypostspecimen,setselectedservices,setservicegroupstatus,removefromselectedservice,setemptyselectedservices,setemptyservicesbyserviceids,setemptyservicesbyservicegroupid}=AddservicesSlice.actions
export default AddservicesSlice.reducer