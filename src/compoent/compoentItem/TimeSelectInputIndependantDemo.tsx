import React,{useState,useRef,useEffect,useContext} from 'react';
import {TodosContext} from '../../store/todo_context'
import styles from '../pages/css/CustomSelector.module.css';
import CustomSelector from './CustomSelector';

interface CustomSelectorProps {
    type: string;
    handleEndEventTime:any;
    handleStartEventTime:any;
    initialTime:string;
}

const TimeSelectInputIndependantDemo: React.FC<CustomSelectorProps> = ({  initialTime,type,handleEndEventTime,handleStartEventTime}) => {

    const [selectedTime, setSelectedTime] = useState('');

    const timeLabels = [...Array(24 * 2)].map((_, i) => {
        const hour = Math.floor(i / 2);
        const minute = i % 2 === 0 ? '00' : '30';
        return `${hour.toString().padStart(2, '0')}:${minute}`;
      });


      const handleStartTimeChange = (e:any) => {
        const selectTimeIndex = e-1
        const newStartTime = timeLabels[selectTimeIndex]
        console.log(selectTimeIndex)
        console.log(newStartTime)

        setSelectedTime(newStartTime)
      };


      useEffect(() => {
        if (selectedTime) {
          if (type === 'start') {
            handleStartEventTime(selectedTime);
          } else {
            handleEndEventTime(selectedTime);
          }
        }
      }, [selectedTime]);
    
      useEffect(() => {
        if (initialTime) {
          setSelectedTime(initialTime);
        } else {
          const currentTime = getCurrentTime();
          setSelectedTime(currentTime);
        }
      }, [initialTime]);
    


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

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':');
    const formattedHour = parseInt(hour, 10) > 12 ? parseInt(hour, 10) - 12 : hour;
    const period = parseInt(hour, 10) >= 12 ? '오후' : '오전';
    return `${period} ${formattedHour}:${minute}`;
  };



    return (
      <></>
      // <CustomSelector name={'startTime'} initialValue={startTime} selectorValue={timeLabels} handleItemClick={handleStartTimeChange}></CustomSelector>
    );
};

export default TimeSelectInputIndependantDemo;