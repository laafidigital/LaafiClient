import { createSlice } from "@reduxjs/toolkit";
import { FETCH_FAILURE13, FETCH_FAILURE14, FETCH_FAILURE15, FETCH_FAILURE45, FETCH_FAILURE46, FETCH_FAILURE54, FETCH_REQUEST13, FETCH_REQUEST14, FETCH_REQUEST15, FETCH_REQUEST45, FETCH_REQUEST46, FETCH_REQUEST54, FETCH_SUCCESS13, FETCH_SUCCESS14, FETCH_SUCCESS15, FETCH_SUCCESS45, FETCH_SUCCESS46, FETCH_SUCCESS54, POST_FAILURE28, POST_FAILURE6, POST_REQUEST23, POST_REQUEST28, POST_REQUEST6, POST_SUCCESS28, POST_SUCCESS6 } from "./Actions";
import { toast } from "react-toastify";
import { setLoading } from './LoadingSlice';

const initialState={
    Floordetails:[
        {floor_no: '0', room_type: 'ICCU', room_no: 'g1', no_of_beds: '2', price_of_bed: '5000',bed_number:[{bedNumber: 'b1', status: 1},{bedNumber: 'b2', status: 1}]},   
        {floor_no: '0', room_type: 'ICU', room_no: 'g2', no_of_beds: '3', price_of_bed: '5000',bed_number:[{bedNumber: 'b1', status: 1},{bedNumber: 'b2', status: 0},{bedNumber: 'b3', status: 0}]},     
        {floor_no: '0', room_type: 'premium', room_no: 'g3', no_of_beds: '2', price_of_bed: '3000',bed_number:[{bedNumber: 'b1', status: 0},{bedNumber: 'b2', status: 0}]},
        {floor_no: '1', room_type: 'ICCU', room_no: 'f1', no_of_beds: '2', price_of_bed: '5000',bed_number:[{bedNumber: 'b1', status: 0},{bedNumber: 'b2', status: 0}]},   
        {floor_no: '1', room_type: 'ICU', room_no: 'f2', no_of_beds: '3', price_of_bed: '2000',bed_number:[{bedNumber: 'b1', status: 0},{bedNumber: 'b2', status: 0},{bedNumber: 'b3', status: 0}]},     
        {floor_no: '1', room_type: 'premium', room_no: 'f3', no_of_beds: '2', price_of_bed: '3000',bed_number:[{bedNumber: 'b1', status: 0},{bedNumber: 'b2', status: 0}]}
    ],
    postresult:[],
    floorresult:[],
    addedfloors:[],
    roomresult:[],
    bedbyidresult:[],
    roombyfloorid:[],
    postfloorresult:[],
    patientbyroomid:null,
    loading:false,
    error:null

}

export const AddfloorSlice=createSlice({
    name:'addfloor',
    initialState,
    reducers:{
     setFloordetails:(state,action)=>{
      
            const existingIndex = state.Floordetails.findIndex(
              (item) => item.floor_no === action.payload.floor_no && item.room_no==action.payload.room_no
              );
             
              if (existingIndex !== -1) {
                // Remove the object with 'status === 0'
                state.Floordetails.splice(existingIndex, 1);
                state.Floordetails.splice(existingIndex, 0, action.payload);
              }
              else{

                  state.Floordetails.push(action.payload)
              }  
     },
     setemptyroombyfloor:(state,action)=>{
        state.roombyfloorid=[]
     },
     setemptypostfloorresult:(state)=>{
        state.postfloorresult=null
     },
     setemptypatientbyroom:(state,action)=>{
        state.patientbyroomid=null
     }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(POST_REQUEST6,(state)=>{
            setLoading(state,true)
            state.loading=true
            state.error=null
        })
        .addCase(POST_SUCCESS6,(state,action)=>{
            setLoading(state,false)
            state.loading=false
            state.postresult=action.payload
            toast(' Added Successfully')
            state.error=null
        })
        .addCase(POST_FAILURE6,(state,action)=>{
            setLoading(state,false)
            state.loading=false
            state.error=action.payload
        })


        .addCase(FETCH_REQUEST13,(state)=>{
            setLoading(state,true)
            state.loading=true
            state.error=null
        })
        .addCase(FETCH_SUCCESS13,(state,action)=>{
            setLoading(state,false)
            state.loading=false
            state.error=null
            state.floorresult=action.payload
        })
        .addCase(FETCH_FAILURE13,(state,action)=>{
            setLoading(state,false)
            state.loading=false
            state.error=action.payload
        })


        .addCase(FETCH_REQUEST14,(state)=>{
            setLoading(state,true)
            state.loading=true
            state.error=null
        })
        .addCase(FETCH_SUCCESS14,(state,action)=>{
            setLoading(state,false)
            state.loading=false
            state.roomresult=action.payload
            state.error=null
        })
        .addCase(FETCH_FAILURE14,(state,action)=>{
            setLoading(state,false)
            state.loading=false
            state.error=action.payload
        })


        .addCase(FETCH_REQUEST15,(state)=>{
            setLoading(state,true)
            state.loading=true
            state.error=null
        })
        .addCase(FETCH_SUCCESS15,(state,action)=>{
            setLoading(state,false)
            state.loading=false
            state.bedbyidresult=action.payload
            state.error=null
        })
        .addCase(FETCH_FAILURE15,(state,action)=>{
            setLoading(state,false)
            state.loading=false
            state.error=action.payload
        })


        .addCase(FETCH_REQUEST45,(state)=>{
            setLoading(state,true)
            state.loading=true
            state.error=null
        })
        .addCase(FETCH_SUCCESS45,(state,action)=>{
            setLoading(state,false)
            state.loading=false
            state.addedfloors=action.payload
            state.error=null
        })
        .addCase(FETCH_FAILURE45,(state,action)=>{
            setLoading(state,false)
            state.loading=false
            state.error=action.payload
        })


        .addCase(FETCH_REQUEST46,(state)=>{
            setLoading(state,true)
            state.error=null
        })
        .addCase(FETCH_SUCCESS46,(state,action)=>{
            setLoading(state,false)
            state.roombyfloorid=action.payload
            state.error=null
        })
        .addCase(FETCH_FAILURE46,(state,action)=>{
            setLoading(state,false)          
            state.error=action.payload.message
        })


        .addCase(POST_REQUEST28,(state)=>{
            setLoading(state,true)
            state.error=null
        })
        .addCase(POST_SUCCESS28,(state,action)=>{
            setLoading(state,false)
            state.postfloorresult=action.payload
            state.error=null
        })
        .addCase(POST_FAILURE28,(state,action)=>{
            setLoading(state,false)          
            state.error=action.payload.message
        })


        .addCase(FETCH_REQUEST54,(state)=>{state.error=null})
        .addCase(FETCH_SUCCESS54,(state,action)=>{
            state.patientbyroomid=action.payload
            state.error=null
        })
        .addCase(FETCH_FAILURE54,(state,action)=>{state.error=action.payload.message})

    }
})

export const {setinputfloordata,setFloordetails,setresetinput,setemptyroombyfloor,setemptypostfloorresult,setemptypatientbyroom}=AddfloorSlice.actions
export default AddfloorSlice.reducer