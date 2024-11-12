import React, { useState,useEffect } from 'react';
import styles from '../pages/css/TimeSelectInput.module.css'
import CustomSelector from './CustomSelector';
import CustomSelectorDemo from './CustomSelectorDemo';
interface TimeSelectInputProps {
    handleAlarmValue:(value:any,numberOfArray:string)=>void;
    alarmValue:any;
    isDisable?: boolean;
    numberOfArray:any;
  }

const AlarmCompoent = ({numberOfArray,isDisable,alarmValue,handleAlarmValue}:TimeSelectInputProps) => {
  
  
  const handleTimeChange = (value:any) => {
    

    const selectedOption = value
    setCurrentValue(selectedOption);
    const selectedForAlarm = { 
      ['label']:selectedOption.name,
      ['timeValue']:selectedOption.value,
    };
    console.log(selectedForAlarm);
    handleAlarmValue(selectedForAlarm,numberOfArray)
  };




  const timeLabels = [
    {label: "5분 전", value: 5},
    {label: "10분 전", value: 10},
    {label: "30분 전", value: 30},
    {label: "1시간 전", value: 60},
    {label: "3시간 전", value: 180},
    {label: "5시간 전", value: 300},
    {label: "10시간 전", value: 600},
    {label: "일주일 전", value: 10080}
  ];

  const [currentValue, setCurrentValue] = useState<any>(timeLabels[7]);
 
  ;
   

const contractTimeLabel = (data:any) =>{
  const labelArray = data.map((item:any, index:any) => {
   return item.label
  });
  return labelArray
}


  return (
    <div className={styles.timePicker} key={numberOfArray}>
     {/* <CustomSelector
      isDisable={isDisable}
      handleItemClick={handleTimeChange}
      selectedItem={`${contractTimeLabel(timeLabels).indexOf(alarmValue.label) + 1}`} // 초기값
      labels={contractTimeLabel(timeLabels)}  // 배열들
      name={numberOfArray}
    /> */}
    <CustomSelectorDemo selectorValue={timeLabels} handleItemClick={handleTimeChange} initialValue={currentValue}></CustomSelectorDemo>
    </div>
  );
  }



export default AlarmCompoent;

