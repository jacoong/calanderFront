
import axios from 'axios'
import {TodosContext,UserType} from '../../store/todo_context'
import { Calendar, momentLocalizer,EventProps,Views } from 'react-big-calendar'
import moment from 'moment'
// import events from "../compoentItem/event";
import {useContext,useEffect,useState,useCallback,useMemo,useRef} from 'react';
import '../pages/css/BigCalendar.css';
import NavBar from '../compoentItem/Navbar'
import {EventItem,customViews} from '../../store/types'
import event from './event';
import ClosedButton from '../compoentItem/ClosedButton';
import MakeEvent from '../../Modal/ModalType/MakeEvent';
import { IoCloseOutline } from "react-icons/io5";
import style from '../pages/css/BigCalendar.module.css';
import {Categories,Category} from '../../store/types';
import useModal from '../../hook/useModal';
import { isEditable } from '@testing-library/user-event/dist/utils';
import { useLoginInfo } from '../../hook/useLoginInfo';
import {parseCustomDateString,dataPutEvents} from '../../store/LoadedEventExample';

export  const initialTime = (start:Date,end:Date)=>{
  const startDate = new Date(start);
  const currentTime = new Date(); // 현재 시간 가져오기

  let currentHour = currentTime.getHours();  // Returns the hour (0-23)
  let currentMinute = currentTime.getMinutes(); 
  
  console.log(currentHour,currentMinute)
  
    if (currentMinute >= 0 && currentMinute <= 30) {
      currentMinute = 30;
  } else {
      currentMinute = 0;
      currentHour = (currentHour +1) % 24;  // 24시간 이후 다시 0시로 돌아가도록 처리
  }
  
  startDate.setHours(currentHour, currentMinute);
  console.log(startDate,'startDate')
  let endDate = new Date(end);
  endDate.setHours(currentHour, currentMinute); 

  endDate.setMinutes(endDate.getMinutes() + 30);
  return {startDate,endDate}
}


function BigCalendar({fetchedEventData,category,dateValue,viewss,exceptCategoryId}:any) {
  const localizer = momentLocalizer(moment);
  const todoCtx = useContext(TodosContext);
  const [loginInfo, setLoginInfo] = useLoginInfo();
  const [dataOfevents, setDataOfEvents] = useState<any>('');
  const [eventPopup, setEventPopup] = useState<any>({isOpen:false, type:'',value:{}});
  const [view, setView] = useState<any>()


  const {openModal} = useModal();






  const updatedEvents = () =>{
    const excludeCategoryIds = exceptCategoryId.map((category:any) => category.categoryId);
    const filteredData = fetchedEventData.filter((item: any) => !excludeCategoryIds.includes(item.categoryId));
    console.log(excludeCategoryIds,'excludeCategoryIds',filteredData,'filteredData')
    setDataOfEvents(dataPutEvents(filteredData,category));
  }  // control displayed events on calender


  const onView = () =>{
    setView(viewss);
  }


  useEffect(()=>{
    onView();
  },[viewss])

  useEffect(() => {
    if(exceptCategoryId){ // excuted whenever client dis / able of category view
      updatedEvents();
      console.log('exceptCategoryId',exceptCategoryId)
    }
  }, [exceptCategoryId]);

            
  // useEffect(()=>{
  //   updatedEvents();
  // },[todoCtx.callCalendarDataApi])


  // useEffect(()=>{
  //   if(category){
  //     updatedEvents();
  //   }
  // },[category])


  const handleClosed = () =>{
    setEventPopup({isOpen:false, type:'null'})
  }


  const handleSelect = (slotInfo:any) =>{
    const {startDate,endDate} = initialTime(slotInfo.start,slotInfo.end)
    const oneDayOff = new Date(endDate.setDate(endDate.getDate()-1))
    if(view === 'week'){
      openModal({type:'MakeEvent',value:{value:{view:'makeEvent',startTime:startDate,endTime:oneDayOff,isDisplayOfDay:true,categoryValue:category,currentCategoryValue:category[0],attenderEmailDTOS:{attenderInfoAuth:[{ attenderEmail:loginInfo?.email, role: 'GENERATOR' }],isSendEmailToAttender:false,isInvitableAnyoneLink: false,}}}})
    }else if(view === 'day'){
      openModal({type:'MakeEvent',value:{value:{view:'makeEvent',startTime:startDate,endTime:oneDayOff,isDisplayOfDay:true,categoryValue:category,currentCategoryValue:category[0],attenderEmailDTOS:{attenderInfoAuth:[{ attenderEmail:loginInfo?.email, role: 'GENERATOR' }],isSendEmailToAttender:false,isInvitableAnyoneLink: false,}}}})
    }else if(view ==='month'){
      openModal({type:'MakeEvent',value:{value:{view:'makeEvent',startTime:startDate,endTime:oneDayOff,isDisplayOfDay:false,categoryValue:category,currentCategoryValue:category[0],attenderEmailDTOS:{attenderInfoAuth:[{ attenderEmail:loginInfo?.email, role: 'GENERATOR' }],isSendEmailToAttender:false,isInvitableAnyoneLink: false,}}}})
    }
  }
  //   if (view === Views.DAY) return moment(dateValue).format("dddd, MMMM DD");
  //   if (view === Views.WEEK) {
  //     const from = moment(dateValue)?.startOf("week");
  //     const to = moment(dateValue)?.endOf("week");
  //     return `${from.format("MMMM DD")} to ${to.format("MMMM DD")}`;
  //   }
  //   if (view === Views.MONTH) {
  //     return moment(dateValue).format("MMMM YYYY");
  //   }
  // }, [view, dateValue]);

  // const onPrevClick = useCallback(() => {
  //   if (view === Views.DAY) {
  //     setDateValue(moment(dateValue).subtract(1, "d").toDate());
  //   } else if (view === Views.WEEK) {
  //     setDateValue(moment(dateValue).subtract(1, "w").toDate());
  //   } else {
  //     setDateValue(moment(dateValue).subtract(1, "M").toDate());
  //   }
  // }, [view, dateValue]);

  // const onNextClick = useCallback(() => {
  //   if (view === Views.DAY) {
  //     setDateValue(moment(dateValue).add(1, "d").toDate());
  //   } else if (view === Views.WEEK) {
  //     setDateValue(moment(dateValue).add(1, "w").toDate());
  //   } else {
  //     setDateValue(moment(dateValue).add(1, "M").toDate());
  //   }
  // }, [view, dateValue]);

  // const onTodayClick = useCallback(() => {
  //   setDateValue(moment().toDate());
  // }, []);

  const getInfoOfEvent = (e:any) =>{
    console.log(e,'sef')
    openModal({type:'ViewEvent',value:{value:{eventInfo:e,category:category},isForce:true,modal:{category:category,eventId:e.eventId,eventTimeId:e.eventTimeId,navButtonOption:{isEdit:true,isDelete:true}}}})
  }


  const  eventPropGetter = (event:any)=> {
      const backgroundColor = event.category ? event.category.categoryColor : 'blue';
      return { style: { backgroundColor, color:'white'} }
  }
  




return(
  <div style={{width:'100%', position:'relative'}}>
  <Calendar
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        // defaultView="month"
        onNavigate={dateValue}
        onView={onView}
        toolbar={false}
        view={view}
        events={dataOfevents}
        date={dateValue}
        onSelectSlot={handleSelect}
        popup={true}
        onSelectEvent={getInfoOfEvent}
        eventPropGetter={eventPropGetter}
        // onSelecting={handlesss}
  
      />
  </div>
)
}

export default BigCalendar;