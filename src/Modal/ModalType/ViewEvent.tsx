import React, {ReactNode,useContext,useEffect,useState} from 'react';
import style from './ModalTypeCss/MakeEvent.module.css';
import {TodosContext} from '../../store/todo_context'
import { ImParagraphLeft } from "react-icons/im";
import { FaRegClock } from "react-icons/fa"
import CopyInputField from '../../compoent/compoentItem/CopyInputField';
import { MdOutlinePeopleAlt } from "react-icons/md";
import ModalLayer from '../ModalLayerType/ModalLayer';
// type ButtonType = {
// };


const ViewEvent =({value}:any) => {
    const {eventInfo,category} = value;
    console.log(value,'dd')
    const [eventValueForm, setEventValueForm] = useState<any>(null);
    const [numberOfParticipater, setNmberOfParticipater] = useState<number>(1);
    // const buttonStyle={
    //     width:width,
    //     borderRadius:borderRadius,
    //     color:color,
    //     disabled:disabled
    // }



    // const changeDayForLang = (date:string) =>{
    //     const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    // } function to change lang

    const formatTime = (time: string) => {
        const [hour, minute] = time.split(':');
        const formattedHour = parseInt(hour, 10) > 12 ? parseInt(hour, 10) - 12 : hour;
        const period = parseInt(hour, 10) >= 12 ? '오후' : '오전';
        return `${period} ${formattedHour}:${minute}`;
      };
      
useEffect(()=>{
        if(value){
        const start = new Date(eventInfo.start)
        const end = new Date(eventInfo.end)
        const EventValue ={
            eventId:eventInfo.eventId,
            title:eventInfo.title,
            startDay:`${start.getFullYear()}년 ${start.getMonth() + 1}월 ${start.getDay()}일`,
            startTime:formatTime(`${start.getHours()}:${("0" + start.getMinutes()).slice(-2)}`),
            endDay:`${end.getFullYear()}년 ${end.getMonth() + 1}월 ${end.getDay()}일`,
            endTime:formatTime(`${end.getHours()}:${("0" + end.getMinutes()).slice(-2)}`),
            interval:eventInfo.interval,
            selectedDays:eventInfo.selectedDays,
            category:eventInfo.category,
            description:eventInfo.description,
            alarm:eventInfo.alarm,
            attenderEmailDTOS:eventInfo.attenderEmailDTOS
        }

        console.log(EventValue,'asdas')
        setEventValueForm(EventValue)
    }
    return
},[value])

    
return (
        eventValueForm ===null
        ?
        <></>
        :
        <>

        <div className={style.container__list}>
        <div className={style.container__list__padding}>
            <div className={style.container__list__container__labelOfStatus} style={{marginRight:'0px',background:`${eventValueForm.category.categoryColor}`}}></div>
        </div>
        <div className={style.container__list__dateInfo} style={{height:'100%'}}>
        <div className={style.container__list__dateInfo__titleValue}>
            <h1>{eventValueForm.title}</h1>
        </div>
        <div className={style.container__list__dateInfo__eventInfo}>
        <p>{`${eventValueForm.startDay}, ${eventValueForm.startTime}~${eventValueForm.endDay}, ${eventValueForm.endTime}`}</p>
                {eventValueForm.interval >1 ?
                <>
                <br/>
                <p>{`매주 ${eventValueForm.selectedDays.map((day:string) =>day).join(', ')}, ${eventValueForm.interval} 회`}</p>
                </>
                :
                null
                }
        </div>
        
        </div>
        </div>

        <div className={style.container__list}>
            <div className={style.container__list__padding}>
                <ImParagraphLeft></ImParagraphLeft>
            </div>
            <div className={style.container__list__dateInfo}>
                <p>{eventValueForm.description}</p>
            </div>
        </div>



        {eventValueForm.alarm.length > 0 ?
        <div className={style.container__list}>
            <div className={style.container__list__padding}>
                <FaRegClock></FaRegClock>
            </div>
            <div className={style.container__list__dateInfo}>
                 <p>{`${eventValueForm.alarm.map((day:any) =>day.customAlarmState ? day.alarmOption.label:`${day.customAlarmOption.alarmNumberInput} ${day.customAlarmOption.option.label}`).join(', ')} 전에 알림`}</p>
            </div>
        </div>
            :
            null
            }


        <div className={style.container__list}>
            <div className={style.container__list__padding}>
                <MdOutlinePeopleAlt></MdOutlinePeopleAlt>
            </div>
            <div className={style.container__list__dateInfo} style={{height:'100%'}}>
                 <div className={style.container__list__dateInfo__Invite}>
                        <div className={style.container__list__dateInfo__Invite__numberField}>
                            <div className={style.container__list__dateInfo__Invite__numberField__div}>
                                <p>{`참석자 ${eventValueForm.attenderEmailDTOS.attenderInfoAuth} 명`}</p>
                            </div>
                            <div className={style.container__list__dateInfo__Invite__numberField__div}>
                                <p className={style.container__list__dateInfo__Invite__numberField__div__acceptNumber}>{`초대 수락 1 명`}</p>
                            </div>
                        </div>
                        <div className={style.container__list__dateInfo__Invite__numberField}>

                        <p>ssefsee@gmail.com,sefsef@gmail.com</p>
                        </div>
               
                 </div>
        
                <CopyInputField urlInformation={`http://localhost:3000/invite/${eventValueForm.eventId}`}></CopyInputField>
            </div>
        </div>
        </>
);
}

export default ViewEvent;