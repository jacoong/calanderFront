import React, { useState,useEffect } from 'react';
import InputNumber from './InputNumber';
import CustomSelector from './CustomSelectorDemo';
import {SelectorValue} from '../../store/types';

interface TimeSelectInputProps {
    isDisable?: boolean;
    numberOfArray:any;
    sendValueOfCustomAlarm:(value:any,index:number,type:string)=>void;
  }

const CustomAlarmCompoent = ({numberOfArray,sendValueOfCustomAlarm}:TimeSelectInputProps) => {
  
  
  const handleTimeChange = (value:any,type:string) => {
    
    if(type === 'numberInput'){
        setCurrentNumberValue(value)
    }else{
        setCurrentValue(value)
    }
    sendValueOfCustomAlarm(value,numberOfArray,type)
  };



  const timeLabels =[{id:'minute',label:'Mintue',value:1},{id:'hour',label:'Hour',value:60},{id:'day',label:'Day',value:1440},{id:'week',label:'Week',value:10080}];

  const [currentValue, setCurrentValue] = useState<any>(timeLabels[3]);
  const [currentNumberValue, setCurrentNumberValue] = useState<number>(1);
 
  ;



  return (

    <div style={{display:'flex',alignItems:'center'}}>  
     {/* <PopupCalendar isCalenderOpen={todoCtx.openAndType.popupValue === 'OpenCustomAlarmCalender'} selectedDay={handleAlarmSelectedDay} setStartDay={selectedStartDay}></PopupCalendar> */}
     <InputNumber  initialValue={currentNumberValue} updateValue={(value:number) =>handleTimeChange(value,'numberInput')}></InputNumber>
     <CustomSelector selectorValue={timeLabels} handleItemClick={(value:SelectorValue) => handleTimeChange(value,'option')} initialValue={currentValue}></CustomSelector>
     </div>
  );
  }



export default CustomAlarmCompoent;

