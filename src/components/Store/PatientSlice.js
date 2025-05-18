import { createSlice } from "@reduxjs/toolkit";

const initialState=[
    [11,'ramu',9865224411,'whitefeild Bangalour near satyasai',1100,' dr prabagar'],
    [41,'sidhart',9865224411,'whitefeild Bangalour near satyasai',500,' dr prabagar'],
    [13,'jabbar',9865224411,'whitefeild Bangalour near satyasai',600,' dr prabagar'],
    [21,'sid',9865224411,'whitefeild Bangalour near satyasai',800,' dr prabagar'],
    [56,'malavika',9865224411,'whitefeild Bangalour near satyasai',1100,' dr prabagar'],

]
export const patientSlice=createSlice({
    name:'patientdetails',
    initialState,
    reducers:{

    }

})
export default patientSlice.reducer