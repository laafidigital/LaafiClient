import { createSlice } from "@reduxjs/toolkit";

const initialState={
 searchValue:{searchtype:'',search:''}
}

export const SearchSlice=createSlice({
    name:'SearchSlice',
    initialState,
    reducers:{
        setSearchValue:(state,action)=>{
            const {name,value}=action.payload
            state.searchValue[name]=value
        }
    }
})
export const {setSearchValue}=SearchSlice.actions
export default SearchSlice.reducer