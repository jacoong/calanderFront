import React, { useState,useEffect } from 'react';
import style from './pages/css/MakeEvent.module.css'
import PopupCalendar from './compoentItem/PopupCalendar'


const MakeEvent = () => {


    const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    const [selectedDays, setsSelectedDays] = useState<string[]>([]);
    const [isRecurrence, setsRecurrence] = useState<boolean>(false);
    const [isAlarm, setIsAlarm] = useState<boolean>(false);
    const [value, setValue] = useState(1);

    const handleClick = (day:string) => {
        // 선택된 요일이 이미 배열에 있는지 확인
        const index = selectedDays.indexOf(day);
        if (index === -1) {
            // 배열에 없는 경우 추가
            setsSelectedDays([...selectedDays, day]);
        } else {
            const updatedDays = [...selectedDays];
            updatedDays.splice(index, 1);
            setsSelectedDays(updatedDays);
        }
    };

    const handleNumberChange = (event:any) => {
        setValue(event.target.value);
    };


    const handleToggle =()=>{
        setsRecurrence(!isRecurrence)
    }

    const handleAlarm =()=>{
        setIsAlarm(!isAlarm)
    }

    useEffect(()=>{
        console.log(selectedDays,'selectedDays')
    },[selectedDays])

  return(
  <form className={style.container}>
        <div className={style.container__list}>
            <input className={style.container__list__title} type="text"></input>
        </div>
        <div className={style.container__list}>
            <div className={style.container__list__selectOfDays}>
                {daysOfWeek.map((day, index) => (
                    <div key={index}  className={style.container__list__selectOfDays__block} onClick={() => handleClick(day)}>
                        {day}
                    </div>
                ))}
            </div>
        </div>
            <div className={style.container__list}>
            <label className={style.recurrenceLabel}>Recurrence</label>
                <label className={style.switch}>
                <input type="checkbox" checked={isRecurrence} onClick={handleToggle}/>
                <span className={`${style.switch__slider} ${style.switch__round}`}></span>
                </label>
            </div>
            {
            isRecurrence?
            <div className={style.recurrence}>
            <div className={style.recurrenceValue}>
            <input type="number" id="quantity" name="quantity" value={value} onChange={handleNumberChange}/>
            </div>
        </div>
            :
                <></>
        }
        <div className={style.container__list}>
            <input className={style.container__list__description} type="text"></input>
        </div>
        <div className={style.container__list}>
            <label className={style.recurrenceLabel}>Alarm</label>
                <label className={style.switch}>
                <input type="checkbox" checked={isAlarm} onClick={handleAlarm}/>
                <span className={`${style.switch__slider} ${style.switch__round}`}></span>
                </label>
                {
            isAlarm?
            <div className={style.recurrence}>
            <div className={style.recurrenceValue}>
            <input type="number" id="quantity" name="quantity" value={value} onChange={handleNumberChange}/>
            </div>
        </div>
            :
                <></>
        }
            </div>
        <div className={style.container__list}>
        <PopupCalendar></PopupCalendar>
        </div>
  </form>
  )
};



export default MakeEvent;


