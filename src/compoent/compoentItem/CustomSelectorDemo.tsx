import React,{useState,useRef,useEffect,useContext} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {SelectorValue} from '../../store/types';


interface CustomSelectorDemo {
  selectorValue:SelectorValue[],
  handleItemClick:(value:any)=>void;
  initialValue:SelectorValue;
  name?:string;
  isDisabled?:boolean;
  isInvalidDate?:boolean;
}


export default function CustomSelectorDemo({isInvalidDate=false,isDisabled=false,name='indivisual',initialValue,handleItemClick,selectorValue}:CustomSelectorDemo) {
  const [value, setValue] = useState(initialValue.value);

  const handleChange = (event: SelectChangeEvent) => {
    const itemValue = event.target;
    // const selectedItem = JSON.parse(event.target.value) as SelectorValue;
    const selectedItem = selectorValue.find(item => item.value === itemValue.value);
    console.log(selectedItem)
    setValue(selectedItem?.value);
    handleItemClick(selectedItem);
  };

  useEffect(()=>{
    if(initialValue){
      setValue(initialValue.value);
    }
  },[initialValue])

  // const selectorValue:SelectorValue[] = [{value:10,label:'Ten'},{value:20,label:'Twenty'}];

  return (
    <Box sx={{ minWidth: 100,height:'100%',backgroundColor:isInvalidDate?'red':'white'}}>
      <FormControl disabled={isDisabled?true:false} sx={{minWidth: '100%',height:'100%'}}>
        <Select
          sx={{ height: '100%' }}
          id={name}
          value={value}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {
            selectorValue.map((item, index) => (
              <MenuItem key={`selector${index}`} value={item.value}>
                {item.label}
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </Box>
  );
}