import axios from 'axios'
import { setLoading } from '../LoadingSlice'
import { DeleteFailure4, DeleteRequest4, DeleteSuccess4, FetchFailure87, FetchRequest87, FetchSuccess87, PostFailure52, PostRequest52, PostSuccess52, PutFailure7, PutRequest7, PutSuccess7 } from '../Actions'

const baseurl='https://laafi.in/template/api/'


export const PostAddTemplate=(data)=>{
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest52())
        return axios.post(baseurl+`Templates/AddTemplate`,data)
        .then((response)=>{
            dispatch(setLoading(false))
            dispatch(PostSuccess52(response.data))
            return response.data
            
        })
        .catch((err)=>{
          
            dispatch(setLoading(false))
            dispatch(PostFailure52(err))
           return err
        })
    }
}

export const GetFindByDepartmentId=(id)=>{
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(FetchRequest87())
         axios.get(baseurl+`Templates/FindByDepartmentId?departmentId=${id}`)
        .then((response)=>{
            dispatch(setLoading(false))
            dispatch(FetchSuccess87(response.data))
            
        })
        .catch((err)=>{
      
            dispatch(setLoading(false))
            dispatch(FetchFailure87(err))
           
        })
    }
}

export const UpdateTemplate=(id,data)=>{
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PutRequest7())
        return axios.put(baseurl+`Templates/UpdateTemplate?templateId=${id}`,data)
        .then((response)=>{
            dispatch(setLoading(false))
            dispatch(PutSuccess7(response.data))
            return response
        })
        .catch((err)=>{
          
            dispatch(setLoading(false))
            dispatch(PutFailure7(err))
            return err
        })
    }
}

export const DeleteTemplate=(id)=>{
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(DeleteRequest4())
        return axios.delete(baseurl+`Templates/DeleteTemplate?templateId=${id}`)
        .then((response)=>{
            dispatch(setLoading(false))
            dispatch(DeleteSuccess4(response.data))
            return response
        })
        .catch((err)=>{
          
            dispatch(setLoading(false))
            dispatch(DeleteFailure4(err))
            return err
        })
    }
}