import React, { useState,useEffect } from 'react';
import styles from '../pages/css/TimeSelectInput.module.css'
import CustomSelector from './CustomSelector';
import CustomSelectorDemo from './CustomSelectorDemo';

interface TimeSelectInputProps {
    handleStartEventTime: (time: string) => void;
    handleEndEventTime: (time: string) => void;
    initialTime:any;
  }

const TimeSelectInput = ({initialTime,handleStartEventTime,handleEndEventTime}:TimeSelectInputProps) => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

  // 오전/오후 표시 함수
  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':');
    const formattedHour = parseInt(hour, 10) > 12 ? parseInt(hour, 10) - 12 : hour;
    const period = parseInt(hour, 10) >= 12 ? '오후' : '오전';
    return `${period} ${formattedHour}:${minute}`;
  };
  
  const timeLabels = [...Array(24 * 2)].map((_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  });


  const getCurrentTime = () => {
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
  
    // 가장 가까운 30분 간격으로 올림
    if (minute < 30) {
      minute = 30;
    } else {
      hour = (hour + 1) % 24; // 시(hour)가 24가 되면 0으로 설정
      minute = 0;
    }
  
    console.log(`this one${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };
  


  

  const initialSetTime = () => {
    console.log('sssss');
      if(initialTime === 'normal'){
        console.log('fseafsaefijseaoisejafiosaejoi');
        const currentTime = getCurrentTime();
        handleStartEventTime(currentTime)
        setStartTime(currentTime);
        const currentHour = parseInt(currentTime.substring(0, 2), 10);
        const currentMinute = parseInt(currentTime.substring(3, 5), 10);
        const nextHour = currentMinute < 30 ? currentHour : (currentHour + 1) % 24;
        const nextMinute = currentMinute < 30 ? 30 : 0;
        const newEndTime = `${nextHour.toString().padStart(2, '0')}:${nextMinute.toString().padStart(2, '0')}`;
        setEndTime(newEndTime);
      }else{
        console.log(initialTime.startTime,'fseafsaefijseaoisejafiosaejoisssss');
        setStartTime(initialTime.startTime)
        setEndTime(initialTime.endTime);
      }
  }


  useEffect(()=>{
    console.log(initialTime,'해줘')
    initialSetTime(); 
  },[initialTime])

  useEffect(()=>{
    if(startTime){
        handleStartEventTime(startTime)
    }
  },[startTime])


  useEffect(()=>{
    if(startTime){
        handleEndEventTime(endTime)
    }
  },[endTime])

  const handleStartTimeChange = (e:any) => {
    const selectTimeIndex = e-1

    const newStartTime = timeLabels[selectTimeIndex]
    setStartTime(newStartTime)

    if(newStartTime >= endTime){
        const currentHour = parseInt(newStartTime.substring(0, 2), 10);
        const currentMinute = parseInt(newStartTime.substring(3, 5), 10);
        const nextHour = currentMinute < 30 ? currentHour : (currentHour + 1) % 24;
        const nextMinute = currentMinute < 30 ? 30 : 0;
        const newEndTime = `${nextHour.toString().padStart(2, '0')}:${nextMinute.toString().padStart(2, '0')}`;
        setEndTime(newEndTime);
    }
  };

  const handleEndTimeChange = (e:any) => {

    const selectTimeIndex = e-1
    const newEndTime = timeLabels[selectTimeIndex]
    setEndTime(newEndTime)
    if(newEndTime <= startTime){
        const currentHour = parseInt(newEndTime.substring(0, 2), 10);
        const currentMinute = parseInt(newEndTime.substring(3, 5), 10);
        const prevHour = currentMinute === 30 ? currentHour : (currentHour - 1 + 24) % 24;
        const prevMinute = currentMinute === 30 ? 0 : 30;
        const newStartTime = `${prevHour.toString().padStart(2, '0')}:${prevMinute.toString().padStart(2, '0')}`;
        setStartTime(newStartTime);
    }
  };



  // 시간 레이블 배열 생성





  return (
    <div className={styles.timePicker}>
    {/* <CustomSelectorDemo handleItemClick={handleStartTimeChange}></CustomSelectorDemo>

    

      <span className={styles.dash}>-</span>
      <CustomSelectorDemo handleItemClick={handleStartTimeChange}></CustomSelectorDemo> */}
    </div>
  );
};



export default TimeSelectInput;

