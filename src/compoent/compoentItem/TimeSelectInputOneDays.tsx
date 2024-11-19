import React,{useEffect,useState} from 'react';
import TimeSelectInputIndependant from '../compoentItem/TimeSelectInputIndependantDemo';
import TimeSelectInput from '../compoentItem/TimeSelectInputDemo'
import style from '../../Modal/ModalType/ModalTypeCss/MakeEvent.module.css'
import useModal from '../../hook/useModal';

interface CustomSelectorProps {
    end: string;
    handleEndEventTime:any;
    handleStartEventTime:any;
    initialTime:string;
    isInvalidDate:boolean;
}

const TimeSelectInputOneDays = ({start,end,handleStartEventTime,handleEndEventTime,isInvalidDate}:any) => {
    const  { openModal,closeModal } = useModal();
    const [startEventTime, setStartEventTime] = useState(start);
    const [endEventTime, setEndEventTime] = useState(end);
    const [isSameDate, setIsSameDate] = useState<boolean>(true);
    

    console.log(start,end,'aa')





    useEffect(()=>{   
      console.log('isSameDate 함수 실행')    
        if(isSameDateFunc(new Date(start),new Date(end))){
          setIsSameDate(true)
          console.log('true')
        }else{
          setIsSameDate(false)
          console.log('false')
        }
    },[start,end])

    const handleStartTime = (Time:string) => {
        console.log(Time,'timeee start');
        handleStartEventTime(CombinedDayMonthYear(Time,start))
        };
      
      const handleEndTime = (Time:string) => {
        console.log(Time,'timeee end!')
        handleEndEventTime(CombinedDayMonthYear(Time,end))
      };
      

      const CombinedDayMonthYear = (Time:any,yearMonthDay:string) =>{
        const dateObject = new Date(yearMonthDay);

        const [hours, minutes] = Time.split(':').map((num: string) => parseInt(num, 10)); // num의 타입을 명시적으로 string으로 지정

        dateObject.setHours(hours);
        dateObject.setMinutes(minutes);
        console.log(dateObject.toString())
        return new Date(dateObject.toString());
    }

    function isSameDateFunc(date1:Date, date2:Date) {
        // 연도, 월, 일 추출
        const year1 = date1.getFullYear();
        const month1 = date1.getMonth(); // 월은 0부터 시작 (0 = 1월)
        const day1 = date1.getDate();
      
        const year2 = date2.getFullYear();
        const month2 = date2.getMonth();
        const day2 = date2.getDate();
      
        // 연도, 월, 일 비교
        return year1 === year2 && month1 === month2 && day1 === day2;
      }




      return (
        <div style={{position:'relative',width:'100%'}}>
          <div style={{display:'flex'}}>
                <div
                  className={`${style.container__list__Date__container} ${style.focus}`}
                  onClick={() => {
                    openModal({
                      type: 'Popup',
                      value: { isPotal: true, potalSpot:'PopupCalendarStart',typeOfPopup: 'PopupCalendar', initialDate: start, type:isSameDate?{typeOfCalender:'makeSameDay'}:{typeOfCalender:'makeDifferentDay',startPoint:'start'} }
                    });
                  }}
                >
                  <p>
                    {start ? `${new Date(start).getMonth() + 1}월  ${new Date(start).getDate()}일` : ''}
                  </p>
                </div>

                <TimeSelectInput
                  initialTime={{ 'start':start, 'end':end }}
                  handleEndEventTime={handleEndTime}
                  handleStartEventTime={handleStartTime}
                  isInvalidDate={isInvalidDate}
                />
                {!isSameDate
                ?
                <>
                <div style={{ backgroundColor: isInvalidDate ? 'red' : '' }} className={style.container__list__Date__container} 
                onClick={()=>{
                    openModal({
                        type:'Popup',
                        value:{isPotal:true, potalSpot:'PopupCalendarEnd',typeOfPopup:'PopupCalendar',initialDate: end,type:{typeOfCalender:'makeDifferentDay',startPoint:'end'}}})}}>
                <p>  {end ? 
                  `${new Date(end).getMonth() + 1}월  ${new Date(end).getDate()}일` 
                    : ''}</p>
                </div>
                </>
                :
                null
                }  
          </div>

          <div className={style.container__list__Date__PopupCalendar}>
                      <div id="PopupCalendarStart"></div>
                      <div id="PopupCalendarEnd"></div>
                    </div>


        </div>
      );
    };
    
    export default TimeSelectInputOneDays;
