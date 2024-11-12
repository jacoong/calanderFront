import React, { useState,useEffect } from 'react';
import styles from '../pages/css/TimeSelectInput.module.css'
import CustomSelector from './CustomSelector';
import CustomSelectorDemo from './CustomSelectorDemo';
import { SelectorValue } from '../../store/types';


interface TimeSelectInputProps {
    handleStartEventTime: (time: string) => void;
    handleEndEventTime: (time: string) => void;
    initialTime:{start:any,end:any};
    isInvalidDate?:boolean;
  }

const TimeSelectInputDemo = ({isInvalidDate,initialTime,handleStartEventTime,handleEndEventTime}:TimeSelectInputProps) => {


  // 오전/오후 표시 함수



  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':');
    const formattedHour = parseInt(hour, 10) > 12 ? parseInt(hour, 10) - 12 : hour;
    const period = parseInt(hour, 10) >= 12 ? '오후' : '오전';
    return `${period} ${formattedHour}:${minute}`;
  };


  const allocateTime = () =>{
    console.log(initialTime,'initialTime')
    const startDate = initialTime.start;
    const endDate = initialTime.end;

    const startHour = startDate.getHours().toString().padStart(2, '0');
    const startMinute = startDate.getMinutes().toString().padStart(2, '0');
  
    const endHour = endDate.getHours().toString().padStart(2, '0');
    const endMinute = endDate.getMinutes().toString().padStart(2, '0');

    const startTimeString = `${startHour}:${startMinute}`;
    const endTimeString = `${endHour}:${endMinute}`;
 
    const objNewTime = (value:string) =>{
      console.log(value,'해보자리전고')
      return{
      value: value,
      label: formatTime(value)
      }
    };

    return{
      start:objNewTime(startTimeString),
      end:objNewTime(endTimeString)
    }
  }
  
  const timeLabels: SelectorValue[] = [...Array(24 * 2)].map((_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    const timeString = `${hour.toString().padStart(2, '0')}:${minute}`;
    return {
      value: timeString,
      label: formatTime(timeString)
    };
  });



  // const initialSetTime = () => {
  //   console.log('initialSetTime',initialTime);

  //       let startHour = initialTime.start.getHours();  // Returns the hour (0-23)
  //       let startMinute = initialTime.start.getMinutes(); 

  //       let endHour = initialTime.end.getHours();  // Returns the hour (0-23)
  //       let endMinute = initialTime.end.getMinutes(); 

  //       const newStartTime = `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`;
  //       const newEndTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
  //       const objTime = (newStartTime:string)=>{
  //         return {
  //           value: newStartTime,
  //         label: formatTime(newStartTime)
  //         }
  //       };
  //       setStartTime(objTime(newStartTime));
  //       setEndTime(objTime(newEndTime));
  // }


  // useEffect(()=>{
  //   console.log(initialTime,'해줘')
  //   initialSetTime(); 
  // },[])


      const {start,end} = allocateTime();


      useEffect(()=>{
      },[])
  

  const handleStartTimeChange = (value:SelectorValue) => {
    handleStartEventTime(value.value)

  };

  const handleEndTimeChange = (value:any) => {
    handleEndEventTime(value.value)
    }


  return (
    <div className={styles.timePicker}>
    <CustomSelectorDemo name={'startTime'} initialValue={start} selectorValue={timeLabels} handleItemClick={handleStartTimeChange}></CustomSelectorDemo>

    

      <span className={styles.dash}>-</span>
      <CustomSelectorDemo name={'endTime'}  initialValue={end} selectorValue={timeLabels} handleItemClick={handleEndTimeChange} isInvalidDate={isInvalidDate}></CustomSelectorDemo>
    </div>
  );
};



export default TimeSelectInputDemo;

