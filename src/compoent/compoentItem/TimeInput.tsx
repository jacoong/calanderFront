import React, { useState,useEffect } from 'react';
import styles from '../pages/css/TimeSelectInput.module.css'
import CustomSelector from './CustomSelector';
import GrayBoxContainer from './GrayBoxContainer';

interface TimeSelectInputProps {
    handleStartEventTime: (time: string) => void;
  }

const TimeInput = ({handleStartEventTime}:TimeSelectInputProps) => {
    const [startTime, setStartTime] = useState('');

  // 오전/오후 표시 함수
  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':');
    const formattedHour = parseInt(hour, 10) > 12 ? parseInt(hour, 10) - 12 : hour;
    const period = parseInt(hour, 10) >= 12 ? '오후' : '오전';
    return `${period} ${formattedHour}:${minute}`;
  };


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
  
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };
  


  useEffect(() => {
    console.log('ed')
    if (!startTime) {
      const currentTime = getCurrentTime();
      console.log(currentTime,'1')
      handleStartEventTime(currentTime)
      setStartTime(currentTime);
    }
  }, []);

  useEffect(()=>{
    if(startTime){
        console.log('start',startTime)
        handleStartEventTime(startTime)
    }
  },[startTime])

  const handleStartTimeChange = (e:any) => {
    console.log('start')
    const selectTimeIndex = e-1

    const newStartTime = timeLabels[selectTimeIndex]
    setStartTime(newStartTime)
  };


  // 시간 레이블 배열 생성
  const timeLabels = [...Array(24 * 2)].map((_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  });




  return (
    <GrayBoxContainer>
    <div className={styles.timePicker}>
    <CustomSelector
      padding={0}
      handleItemClick={handleStartTimeChange}
      selectedItem={`${timeLabels.indexOf(startTime) + 1}`}
      labels={timeLabels.map((time) => formatTime(time))}
      name={'TimeInput'}
      fontSize={'15px'}
    />
    </div>
    </GrayBoxContainer>
  );
};



export default TimeInput;


