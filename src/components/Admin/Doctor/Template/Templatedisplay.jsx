import { Checkbox, MenuItem, Select, TextField } from '@mui/material';
import React from 'react'

const Templatedisplay = (props) => {
    const {templatedata,AddiInputData,setAddiInputData}=props
    

    const handleAdditionalInput = (e, index) => {
      const { name, value, type, checked } = e.target;
    
      setAddiInputData((prevData) => {
        const updatedSpecialityInfos = [...(prevData.SpecialityInfos || [])];
    
        const currentFieldIndex = updatedSpecialityInfos.findIndex((item) => item.FieldName === name);
  
        const currentField = updatedSpecialityInfos[currentFieldIndex];

    
        
    
        if (currentField) {
          if (type === 'checkbox') {
            let valuesArray = currentField.Value ? currentField.Value.split(',') : [];
          
            if (checked) {
              if (!valuesArray.includes(value)) {
                valuesArray.push(value);
              }
            } else {
              valuesArray = valuesArray.filter(item => item !== value);
            }
            updatedSpecialityInfos[currentFieldIndex] = {
              ...currentField,
              FieldName: name,
              FieldType: type,
              Value: valuesArray.join(','),
            };
          } 
          else {
            updatedSpecialityInfos[currentFieldIndex] = {
              ...currentField,
              FieldName: name,
              FieldType: type,
              Value: value,
            };
          }
        } else {
          updatedSpecialityInfos.push({
            FieldName: name,
            FieldType: type,
            Value: value,
          });
        }
        return {
          ...prevData,
          SpecialityInfos: updatedSpecialityInfos,
        };
      });
    };

  return (
    <div>
        {templatedata && (
        <div className='row'>
        {templatedata.TemplateData.map((item,index) =>(
        <div className='d-flex mt-4'>
          <div className='d-flex ml-3'>
            <h6 className=' pt-2 diagnosishead'> {item.FieldName}</h6>
            {(() => {
      switch (item.FieldType) {
        case 'Text':
          return (
            <div className='d-flex flex-column'>
            <TextField                 
              id={`text-field-${index}`}
              variant="filled"
              className='diagnostextfeild'
              type='text'
              name={item.FieldName}
              onChange={(e)=>{handleAdditionalInput(e,index)}}
            />
            {/* {item.EnableAI &&(
              <div>
              <div className='d-flex pl-5 col'>
              <p className='pt-4'>Enable AI suggestion</p>
              <Checkbox
                // checked={chatOpen2}
                // onChange={ClickEnableAi2} // Better to use onChange for handling changes
              />
            </div>
              </div>
            )} */}
            </div>
            
          );
        case 'CheckBox':
        //   const selectoptions=item.Option.split(",")
        return (
            <div>
              {item.Options && item.Options.map((option, idx) => (
                <div key={idx} className='d-flex align-items-center'>
                  <Checkbox
                    name={item.FieldName}
                    onChange={(e) => handleAdditionalInput(e, index)}
                    value={option.Name}
                    color="primary"
                  />
                  <label>{option.Name}</label>
                </div>
              ))}
            </div>
          );
        case 'Radio':
        //   const radioOptions=item.Options.split(",")
          return (
            <div>
            {item.Options && item.Options.map((option, idx) => (
              <div className='d-flex'>
              <label key={idx}>
                <input
                  name={item.FieldName}
                  type='radio'
                //   name={`radio-field-${index}`}
                  value={option.Name}
                onChange={(e) => handleAdditionalInput(e, index)}
                />
                {option.Name}
              </label>
              </div>
            ))}
          </div>
          );
        default:
          return null;
      }
    })()}
          
          </div>
        </div>           
        ))
      }
      </div>
       )}
      
    </div>
  )
}

export default Templatedisplay
