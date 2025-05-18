import { Button, Checkbox, Dialog, DialogActions, DialogContent, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PosTemplateData, PosTemplateList,GetTemplateByDepId } from '../../Store/Actions'
import { GetDepartmentData } from '../../Store/ApiReducers/Auth'
import DeleteIcon from '@mui/icons-material/Delete';
import { toast, ToastContainer } from 'react-toastify';
import Templatefields from './Templatefields';
import CancelIcon from '@mui/icons-material/Cancel';
import { setemptydeletetemppostresult, setemptyfindbydepartmentid, setemptytemplatepostresult } from '../../Store/AddTemplate';
import { GetFindByDepartmentId, PostAddTemplate, UpdateTemplate, DeleteTemplate } from '../../Store/ApiReducers/Templates';
import { VscDiffAdded } from "react-icons/vsc";
import { MdDeleteOutline } from "react-icons/md";
import Switch from '@mui/material/Switch';


const AddTemplate = () => {

const dispatch=useDispatch()    

const departmentarray=useSelector((state)=>state.Adddepartment.departmentArray);
const templatedata = useSelector((state)=>state.Template.templatedataBydepId)
const templatepostresult=useSelector((state)=>state.Template.templatepostresult)
const deletepostresult=useSelector((state)=>state.Template.templatedeleteresult)
const templatebydepartment=useSelector((state)=>state.Template.findbydepartmentid)



const [isnewtemplate,setisnewtemplate]=useState(false)
const [depid,setdepid]=useState(null)
const [templateData,settemplateData]=useState({Name:'',DepartmentId:''})
const [Row,setRow]=useState([{FieldName:'',Options:[],EnableAI:true,FieldType:'',Status:true}])
// const [inputdata,setInputData]=useState({DepartmentId:'',FieldName:'',Options:null,FieldType:'',AI:false,Status:true})
const [OptionDialoge,setOptionDialoge]=useState(false)
const [depName,setdepName]=useState(null)
const [Index,setindex]=useState(0)
const [templateID,settemplateid]=useState(null)



useEffect(()=>{
  dispatch(GetDepartmentData());
},[])

 useEffect(()=>{
  if(templatepostresult || deletepostresult){
    dispatch(GetTemplateByDepId(depid));
    dispatch(setemptytemplatepostresult())
    dispatch(setemptydeletetemppostresult())
  }
 },[templatepostresult,depid,deletepostresult])

 const handleChageInput=(e,index)=>{

   const {name,value,checked,type}=e.target
   const newRow = [...Row];
   if(name=='Status'){
     const currentInputData = { ...newRow[index], [name]: checked };
     newRow[index] = currentInputData;
     setRow(newRow);
   }
   else if(name=='EnableAI'){
    const currentInputData = { ...newRow[index], [name]: checked };
    newRow[index] = currentInputData;
    setRow(newRow);
   }
   else if(name=='DepartmentId'){
    // dispatch(GetTemplateByDepId(value));
    dispatch(GetFindByDepartmentId(value))
    setdepid(value)
  }
  else if(name=='templatename'){
    settemplateData({...templateData,Name:value})
  }
   else if(name=='FieldType'){
    setindex(index)
    if(value=="Radio" || value=="Checkbox"){
      setOptionDialoge(true)
      const currentInputData = { ...newRow[index], [name]: value };
      newRow[index] = currentInputData;
      setRow(newRow);
    }
    
    else{
      const currentInputData = { ...newRow[index], [name]: value };
      newRow[index] = currentInputData;
      setRow(newRow);
      setOptionDialoge(false)
    }
   }
   else if(name=='Options'){
    const updatedoption=value.split(',').map(item=>({Name:item}))
    const currentInputData = { ...newRow[index], Options: updatedoption };
    newRow[index] = currentInputData;
    setRow(newRow)
  }
   else{
    const currentInputData = { ...newRow[index], [name]: value };
    newRow[index] = currentInputData;
    setRow(newRow);
   }
  
 }

 const onClickAdd=()=>{
   setRow([...Row,{FieldName:'',Options:[],EnableAI:true,FieldType:'',Status:true}]);
  //  setInputData({...inputdata,AI:false})
 }

 const ClickDephead=()=>{
  setRow([{FieldName:'',Options:[],EnableAI:true,FieldType:'',Status:true}])
  settemplateData({Name:'',DepartmentId:''})
  dispatch(setemptyfindbydepartmentid(null))
  setisnewtemplate(false)
  // setInputData({DepartmentId:'',FieldName:'',Options:null,FieldType:'',AI:false,Status:true})
  setdepid(null)
  setdepName(null)
 }

 const clickTemplate=(id)=>{
  const filtertemplate=templatebydepartment.filter(item=>item.Id==id)
  if(filtertemplate){
    setisnewtemplate(true)
    settemplateid(filtertemplate[0].Id)
    settemplateData({...templateData,Name:filtertemplate[0].Name,DepartmentId:filtertemplate[0].DepartmentId})
     const templatedata = filtertemplate[0].TemplateData;
    //  {DepartmentId:null,FieldName:'',Options:null,FieldType:'',AI:false,Status:true}
     const updatedRows=templatedata.map((data)=>({
        // DepartmentId:filtertemplate[0].DepartmentId,
        FieldName:data.FieldName,
        FieldType:data.FieldType,
        Status:data.Status,
        Options:data.Options,
        EnableAI:data.EnableAI
     }))
     setRow(updatedRows)
  }
 }


 const onChangeOption=(e,index,optionindex)=>{
  const newValue = e.target.value;
  const filterfromrow=[...Row]
  const rowToUpdate = filterfromrow[index];

  if(rowToUpdate){
    const updatedOptions = [...rowToUpdate.Options];
    updatedOptions[optionindex]={...updatedOptions[optionindex],Name:newValue}
    filterfromrow[index]={...rowToUpdate,Options:updatedOptions}
    setRow(filterfromrow)
  }
 }

 const addOptions=(index)=>{
  const filterfromrow=[...Row]
  const rowToUpdate=filterfromrow[index]
 
  if(rowToUpdate){
    let updatedOptions =  [...rowToUpdate.Options];
  
    updatedOptions=[...updatedOptions,{Name:''}]
    filterfromrow[index]={...rowToUpdate,Options:updatedOptions}
    setRow(filterfromrow)
  }
 }
 const handleOptiondelete=(index,optionindex)=>{
  const filterfromrow=[...Row]
  const rowToUpdate=filterfromrow[index]
  if(rowToUpdate){
    let updatedOptions=[...rowToUpdate.Options]
    updatedOptions.pop(optionindex)
    filterfromrow[index]={...rowToUpdate,Options:updatedOptions}
    setRow(filterfromrow)
  }

 }

 const onCLickdeteleRow=(index)=>{
  if(index==0){
    setRow[[{FieldName:'',Options:[],EnableAI:true,FieldType:'',Status:true}]]
  }
  else{
    const updatedRow=[...Row]
    updatedRow.pop(index)
    setRow(updatedRow)
  }
 }

 const deleteTemplate=(id)=>{
  dispatch(DeleteTemplate(id)).then((res)=>{
    if(res){
      ClickDephead()
    }
  }).catch((err)=>{

  })
 }

 const submitBtn=(e)=>{
   e.preventDefault()
    if (!templateData.Name.trim()) {
      toast.error("Template Name is required");
      return;
    }
    let isValid = true;
  Row.forEach((field, index) => {
    if (!field.FieldName.trim()) {
      toast.error(`Field name is required at row ${index + 1}`);
      isValid = false;
    }
    if (!field.FieldType.trim()) {
      toast.error(`Field type is required at row ${index + 1}`);
      isValid = false;
    }
    if (["Radio", "Checkbox"].includes(field.FieldType) && (!Array.isArray(field.Options) || field.Options.length < 2)) {
      toast.error(`Field "${field.FieldName}" requires at least 2 options.`);
      isValid = false;
    }
  });
  
    if (isValid && !isnewtemplate) {
      const updatedArray = { ...templateData, TemplateData: Row };
      dispatch(PostAddTemplate(updatedArray)).then((res)=>{
        if(res){
          toast.success(`Successfully Added New Template to ${depName} Department`)
          settemplateData({Name:'',DepartmentId:''})
          setRow([{FieldName:'',Options:[],EnableAI:true,FieldType:'',Status:true}])
          dispatch(setemptyfindbydepartmentid())
          settemplateid(null)
          setisnewtemplate(false)
        }
      }).catch((err)=>{
         toast.error(err)
      })
   
    }
    if(isValid && isnewtemplate){
      const updatedArray = { ...templateData, TemplateData: Row };
      dispatch(UpdateTemplate(templateID,updatedArray)).then((res)=>{
        if(res){
          toast.success(`Successfully Updated  Template of ${depName} Department`)
          settemplateData({Name:'',DepartmentId:''})
          setRow([{FieldName:'',Options:[],EnableAI:true,FieldType:'',Status:true}])
          settemplateid(null)
          dispatch(setemptyfindbydepartmentid())
          setisnewtemplate(false)
        }
      }).catch((err)=>{
         toast.error(err)
      })
   
    }

 }

  return (
    <div className='template'>
      <ToastContainer/>
        <h4>Customize Your Template</h4>
      <div className='addtemplate_main'>
        <form onSubmit={submitBtn}>
        <div className='addtemsubmain'>
          {depName &&(
            <div  className='d-flex justify-content-center'>
            <div className='d-flex'>
              <h5 className='pt-1'>{depName}</h5>
              <IconButton onClick={ClickDephead}>
                 <CancelIcon/>
              </IconButton>
            </div>
          </div>
          )}
          {templateData.Name!==null &&(
            <div className='templatename_div'>
              <label>Template Name:</label><input type='text' value={templateData.Name} name='templatename' onChange={handleChageInput}/>
            </div>
          )}
            {Row.map((item,index)=>(
          <div className='d-flex justify-content-center' key={index}>
             {!depName &&(
            <div className='ml-2'>
              <Select
                style={{width:"150px",marginTop:"17px"}}
                name='DepartmentId'
                onChange={(e)=>handleChageInput(e,index)}
                // value={inputdata[index] && inputdata[index].DepartmentId}
                >
                  {departmentarray.map((innerItem)=>(
                <MenuItem onClick={()=>{
                  setdepName(innerItem.Name)
                  settemplateData({...templateData,DepartmentId:innerItem.Id})
                }}
                  value={innerItem.Id}>{innerItem.Name}
                  </MenuItem>
                  ))}
              </Select>
            </div>
             )}
             <div className='  mt-3'>
                <div className='d-flex ml-3'>
                  <h6 className=' pt-2 diagnosishead'>Feild name: </h6>
                  <TextField                
                    id="hpi"
                    variant="filled"
                    className='diagnostextfeild'
                    name='FieldName'
                    value={item.FieldName}
                    onChange={(e)=>handleChageInput(e,index)}
                  />
                </div>
             </div>
             <div className='ml-2'>
               <Select
                 style={{width:"150px",marginTop:"17px"}}
                 name='FieldType'
                 value={item.FieldType}
                 onChange={(e)=>handleChageInput(e,index)}
               >
               <MenuItem value='Date'>Date</MenuItem>
               <MenuItem value='Text'>Text</MenuItem>
               <MenuItem value='Radio'>Radio</MenuItem>
               <MenuItem value='Checkbox'>Checkbox</MenuItem>
               </Select>
               {item.Options &&(
               <div className='templateoption_container'>
                {item && item.Options.map((inner,optionindx)=>(
                  <>
                  <div><input type='text' onChange={(e)=>onChangeOption(e,index,optionindx)} value={inner.Name}></input><IconButton onClick={()=>handleOptiondelete(index,optionindx)}><CancelIcon/></IconButton></div>
                  </>
                ))}
                
               </div>
               )}
               {(item.FieldType=="Radio" || item.FieldType=="Checkbox") &&(
               <IconButton onClick={()=>addOptions(index)}><VscDiffAdded/></IconButton>
               )}
             </div>
             <div className='mt-2'>
                <div className='d-flex'>
                <Checkbox
                  name='EnableAI' 
                  onChange={(e)=>handleChageInput(e,index)}
                  checked={item && item.EnableAI}
                />
                <p className='pt-3'>Enable Ai</p>
                </div>
             </div>
             <div className='ml-2 mt-4'>
                <Button variant='contained' onClick={onClickAdd}
                 disabled={!depid}
                >Add+</Button>
             </div>
             <div className='ml-2 mt-4'>
               <Switch   checked={item && item.Status}
                 name='Status'
                onChange={(e) => handleChageInput(e, index)}
                />
             </div>
             <div className='ml-2 mt-4'>
              <IconButton onClick={()=>onCLickdeteleRow(index)}><MdDeleteOutline style={{color:'red'}}/></IconButton>
             </div>
             {/* <div className='col mt-4'>
                <IconButton style={{color:'red'}}>
                    <DeleteIcon/>
                </IconButton>
             </div> */}
          </div>
            ))}
          <div className='d-flex justify-content-center mt-5'>
            <Button variant='contained' style={{backgroundColor:'black'}} type='submit'>submit</Button>
          </div>
        </div>
        </form>

        <Dialog open={OptionDialoge}>
            <DialogContent>
                <TextField
                 name='Options'
                 onChange={(e)=>handleChageInput(e,Index)}
                //  value={inputdata.Options}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{setOptionDialoge(false) 
                                    }}>cancel</Button>
                <Button onClick={()=>setOptionDialoge(false)}>submit</Button>
            </DialogActions>
        </Dialog>



    </div>
    <hr/>
    <div className='addtemplate_main'>
        <div className='addtemsubmain'>
          <h4 className='d-flex justify-content-center'>Templates</h4>
          {/* <Button variant='contained' className='ml-1' onClick={ClickDephead}>ADD NEW +</Button> */}
          <div className='template_card_container'>
            {templatebydepartment && templatebydepartment.map(item=>(
            <div className='template_card' onClick={()=>clickTemplate(item.Id)} >
              <div>
                <img/>
              </div>
              <div>
                <p>{item.Name}</p>
              </div>
              <IconButton onClick={()=>{deleteTemplate(item.Id)}} ><MdDeleteOutline style={{color:'red'}}/></IconButton>
            </div>
            ))}
          </div>
          {/* {templatedata && templatedata.map((item,index)=>(
                <div className='row'>
              <div className='col ml-3' key={index}>
                <Templatefields data={item}/> 
                </div>
              </div>
          ))} */}
        </div>
   </div>
    </div>
  )
}

export default AddTemplate