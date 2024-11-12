import React, { useState,useEffect,useContext } from 'react';
import Calendar from 'react-calendar';
import './PopUpTypeCss/popupCalendar.css';
import { SlCalender } from "react-icons/sl";
import useModal from '../../hook/useModal';
import { ModalStateContext } from "../../store/ModalProvider";
// const PopupCalendar = ({selectedDay,selectedValue,isCalenderOpen,initialDate}:any) => {
const PopupCalendarStart = (value:any) => {

    const {typeOfPopup,initialDate,type} = value;
    const ModalCtx = useContext(ModalStateContext);
    console.log(value,'calendarpopup!')
    const  { updateModalValue,closeModal } = useModal();
    const [date, setDate] = useState<any>(initialDate);
    const [monthDay, setMonthDay] = useState<any>('');







    const preventOnclick = (e: React.MouseEvent) => {
        console.log('sef')
            e.stopPropagation();
    }

    const isStartEarly = (a: Date, b: Date) => {
        return new Date(a).getTime() <= new Date(b).getTime();
      };

    const addOneDay = (date: Date) => {
    const newDate = new Date(date);  // 기존 날짜 객체를 복사
    newDate.setDate(newDate.getDate() + 1);  // 날짜를 하루 더함
    return newDate;
    };

    const combineDateAndTime = (oldDate: Date, newDate: Date): Date => {
        // newDate의 연도, 월, 일을 복사한 새로운 Date 객체 생성
        const combinedDate = new Date(newDate);
        const oldValuedDate = new Date(oldDate);
      
        // oldDate의 시간 정보 추출
        const hours = oldValuedDate.getHours();
        const minutes = oldValuedDate.getMinutes();
        const seconds = oldValuedDate.getSeconds();
        const milliseconds = oldValuedDate.getMilliseconds();
      
        // 새로운 날짜에 시간 정보 설정
        combinedDate.setHours(hours, minutes, seconds, milliseconds);
      
        return combinedDate;
      };

    useEffect(()=>{
        console.log(date,'ss')
    },[date])

    const handledDate = (e:any) =>{
        setDate(e)
        const MainPopup = ModalCtx[ModalCtx.length-2].value?.value
        console.log(type,e);

        let updatedData;

        console.log(type,'typesibal')
        if(type.typeOfCalender === 'makeSameDay'){
            updatedData = {
                    ...MainPopup,      // value 객체 내부를 복사
                    startTime: combineDateAndTime(MainPopup.startTime,e),          // start 부분만 새 값으로 덮어씌움
                    endTime: combineDateAndTime(MainPopup.startTime,e)
            }
        }
        else if(type.typeOfCalender === 'makeDifferentDay'){
            if(type.startPoint ==='start'){
                if(isStartEarly(e,MainPopup.end)){
                    const combineDate = combineDateAndTime(MainPopup.startTime,e)
                    updatedData = {
                        ...MainPopup,      // value 객체 내부를 복사
                        startTime: combineDate,         // start 부분만 새 값으로 덮어씌움
                        isDisplayOfDay:false,
                    }
                }else{
                    const combineDate = new Date(combineDateAndTime(MainPopup.startTime,e))
                    const endDate = new Date(combineDate);
                    updatedData = {
                        ...MainPopup,      // value 객체 내부를 복사
                        startTime: combineDate,          // start 부분만 새 값으로 덮어씌움
                        endTime: new Date(endDate.setDate(combineDate.getDate() + 1)),
                        isDisplayOfDay:false,
                    }
                }
            }else{
                updatedData = {
                    ...MainPopup,      // value 객체 내부를 복사
                    endTime: combineDateAndTime(MainPopup.endTime,e),          // start 부분만 새 값으로 덮어씌움
            }
            }
        }
        
          console.log(updatedData,'포포탄');
          const updatedMainPopup = {
            ...ModalCtx[ModalCtx.length - 2].value, // 기존 value 객체를 복사
            value: updatedData, // 기존의 value 안에 있는 값들 중 start만 변경된 값을 할당
          };
          console.log(updatedMainPopup);
        updateModalValue(ModalCtx.length-2,updatedMainPopup)
        closeModal(ModalCtx.length-1)
    }

    
  return(
    <div id={`${typeOfPopup}`} className={'PopupCalendarContainer'}>  
            <div className={'Calender__container'} onClick={preventOnclick}>
                <Calendar onChange={handledDate} value={`${date}`} />
            </div>
</div>
    );
};



export default PopupCalendarStart;


