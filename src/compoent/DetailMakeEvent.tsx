import React, { useState,useEffect,useContext,useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import style from './pages/css/DetailMakeEvent.module.css'
import TimeSelectInput from './compoentItem/TimeSelectInput'
import TimeInput from './compoentItem/TimeInput'
import AlarmCompoent from './compoentItem/AlarmCompoent'
import PopupCalendar from '../Modal/PopUpType/PopupCalendar';
import { SlCalender } from "react-icons/sl";
import {TodosContext} from '../store/todo_context'
import LabelPopUp from '../Modal/PopUpType/PopupCategory'
import DownOutLineLetter from '../compoent/compoentItem/DownOutLineLetter';
import { instance,addAccessTokenInterceptor, addResponseInterceptor } from '../store/axios_context';
import TimeSelectInputIndependant from './compoentItem/TimeSelectInputIndependant'
import Button from '../compoent/compoentItem/Button';
import InputNumber from '../compoent/compoentItem/InputNumber';
import DropDownBoxContainer from './compoentItem/DropDownBoxContainer'
import GrayBoxContainer from './compoentItem/GrayBoxContainer';
import NewTodos from './NewTodos';
import ClosedButton from './compoentItem/ClosedButton';
import InviteUserEmail from './compoentItem/InviteUserEmail';
import CheckBox from './compoentItem/CheckBox';
import { FaRegClock } from "react-icons/fa";
import { MdRestartAlt } from "react-icons/md";
import { ImParagraphLeft } from "react-icons/im";
import { LuCalendarClock } from "react-icons/lu";
import { LuAlarmCheck } from "react-icons/lu";
import { MdOutlineAccessAlarms } from "react-icons/md";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { typeCheckBox } from '../store/types';
import { IoCloseOutline } from "react-icons/io5";
import { EmailTag} from '../store/types';

const DetailMakeEvent = ({valueOfEvent,InfoOfEvent}:any) => {
    const daysOfWeek = [{label:'MON',value:'MONDAY'},{label:'TUE',value:'TUESDAY'},{label:'WED',value:'WEDNESDAY'},{label:'THU',value:'THURSDAY'},{label:'FRI',value:'FRIDAY'},{label:'SAT',value:'SATURDAY'},{label:'SUN',value:'SUNDAY'}];
    const navigate = useNavigate();

    const [titleValue, setTitleValue] = useState<string>('');
    const [selectedDays, setsSelectedDays] = useState<string[]>([]);
    const [isRecurrence, setsRecurrence] = useState<boolean>(false);
    const [isDisplayOfDay, setIsDisplayOfDay] = useState<boolean>(false);
    const [descriptionValue, setDescriptionValue] = useState<string|undefined>(undefined);
    const [recurrenceValue, setRecurrenceValue] = useState<number>(1);
    const [customAlarmeValue, setCustomAlarmeValue] = useState<number>(1);
    const [startEventTime, setStartEventTime] = useState('');
    const [endEventTime, setEndEventTime] = useState('');
    const [selectedStartDay, setSelectedStartDay] = useState<any>();
    const [selectedEndDay, setSelectedEndDay] = useState<any>();
    const [dateOfSelectedDay, setDateOfSelectedDay] = useState<string>();
    const [isCalenderOpen, setIsCalenderOpen] = useState<boolean>(false);
    const [isLabelOpen, setisLabelOpen] = useState<boolean>(false);
    // const [initialTime,setInitialTime] = useState({start:'',end:''})


    const [isdetailLabelAlarmOption, setIsdetailLabelAlarmOption] = useState<boolean>(false);
    const [isdetailInviateOption, setIsdetailInviateOption] = useState<boolean>(false);
    const [isdetailInviateRigthOption, setIsdetailInviateRigthOption] = useState<boolean>(false);

    const [LabelColor, setLabelColor] = useState<string>('red');
    const [LabelValue, setLabelValue] = useState<string>('');

    const [isAlarm, setIsAlarm] = useState<boolean>(false);
    // const [openCustomAlarmState, setOpenCustomAlarmState] = useState<boolean>(false);
    const [alarmCustomMethod, setAlarmCustomMethod] = useState<any>({label:'Week',timeValue:10080});
    // const [alarmCustomTimeValue, setAlarmCustomTimeValue] = useState<string>();
    const [alarmCompoent, setAlarmCompoent] = useState<any>([]);
    // const [isAlarmDeleteShowed, setIsAlarmDeleteShowed] = useState<boolean>(false);


    const [initialTimes, setInitialTimes] = useState<any>('normal');
    const [selectMetnod, setSelectMetnod] = useState<string>('week');


    const [inviteUserEmail, setInviteUserEmail] = useState<any>([]); //{"value":"sefe"},{"value":"sefew"}] initial value
    const [invitedUserAuthority, setInvitedUserAuthority] = useState<any>([{isEditable:false}]);
    const optionOfInviteUser:typeCheckBox[] = [{label:'editable',value:'isEditable'}];

    const todoCtx = useContext(TodosContext);
   

    const addAlarm = () => { 
      console.log('dd')
        const addAlarmCompoent= [...alarmCompoent, 
          {
          'alarmOption':{
            'label': '일주일 전', 
            'timeValue': 10080,
          },
          'customAlarmOption':{
            alarmNumberInput:1,
            option:{
              id:'week',
              label:'Week',
              timeValue:10080}
          },
          'isAlarmDeleteShowed':false,
          'isCustomAlarmState':false
        }
        ]
      if(alarmCompoent.length < 3){    
        setAlarmCompoent(addAlarmCompoent);
      }else{
        alert("최대 3개의 알람을 추가할 수 있습니다.");
      }
    };


    const handleAlarmValue = (alarmOption:string,numberOfArray:string) =>{

      const alarmValueArray = alarmCompoent.map((item:string, index:any) => {
        // 특정 인덱스에 해당하는 항목을 교체하고 나머지는 원래 값 유지
        if (index === Number(numberOfArray)) {
          return {'alarmOption':alarmOption,'isAlarmDeleteShowed':false}; // 'bird'로 교체
        }else{
          return item; // 나머지는 원래 값 유지
        }
      });
        setAlarmCompoent(alarmValueArray)
    }



    const putInfoEventData = (InfoOfEvent:any) =>{
      setTitleValue(InfoOfEvent.title)

      const startGetDate = new Date(InfoOfEvent.startTime.yearMonthDay);
      const { monthDay: startMonthDay, dayOfWeek: startDayOfWeek } = transFormGetDateToRightForm(startGetDate);
      setSelectedStartDay({monthDay:{'monthDay':startMonthDay,'day':startDayOfWeek},yearMonthDay:startGetDate.toString()});
      
      const endGetDate = new Date(InfoOfEvent.endTime.yearMonthDay);
      const { monthDay: endMonthDay, dayOfWeek: endDayOfWeek } = transFormGetDateToRightForm(endGetDate);
      setSelectedEndDay({monthDay:{'monthDay':endMonthDay,'day':endDayOfWeek},yearMonthDay:endGetDate.toString()});

      setInitialTimes({startTime:InfoOfEvent.startTime.time,endTime:InfoOfEvent.endTime.time})
      console.log(InfoOfEvent.alarmTime,'이거');
      setAlarmCompoent(InfoOfEvent.alarm)
      updateRecurrenceValue(InfoOfEvent.interval);
      setDescriptionValue(InfoOfEvent.description)
      setInviteUserEmail(InfoOfEvent.inviteUserEmail)
    }

    const handleSetAlarmArrays = (AlarmArray:any) =>{
      if(AlarmArray.length === 0){
        return
      }else{
        AlarmArray.map((alarm:any)=>{
          if(alarm.isCustomAlarmState){
            const addAlarmCompoent= [...alarmCompoent, {'alarmOption': {'label': alarm.alarmTime, 'timeValue': 10080}, 'isAlarmDeleteShowed': false , 'isCustomAlarmState':false}]
            // setAlarmCompoent()
          }else{
            const addAlarmCompoent= [...alarmCompoent, {'alarmOption': {'label': alarm.alarmTime, 'timeValue': alarm.alarmMinute}, 'isAlarmDeleteShowed': false , 'isCustomAlarmState':false}]
            setAlarmCompoent(addAlarmCompoent);
          }
        })
      }

    }


    const handleClick = (day:string) => {
        // 선택된 요일이 이미 배열에 있는지 확인
        const index = selectedDays.indexOf(day);
        if(day === dateOfSelectedDay){
            alert('Can not unselect the day on calender')
            return}
        if (index === -1) {
            // 배열에 없는 경우 추가
            setsSelectedDays([...selectedDays, day]);
        }
        else {
                const updatedDays = [...selectedDays];
                updatedDays.splice(index, 1);
                setsSelectedDays(updatedDays);
        }
    };




    const handleToggle =()=>{
        setsRecurrence(true)


    }

    const updateLabel =(labelValue:string)=>{
        setLabelColor(labelValue)
        const currentValue = todoCtx.openAndType;
        // todoCtx.sendFlexbox({ ...currentValue,  popupValue:''});
    }

    // const handleAlarm =()=>{
    //     setIsAlarm(!≈)
    // }


    const handleStartEventTime = (Time:string) => {
      console.log(Time,'timeee')
        setStartEventTime(Time);
      };
    
    const handleEndEventTime = (Time:string) => {
        setEndEventTime(Time);
    };


    const inputRef = useRef<HTMLInputElement>(null);
    
      useEffect(() => {
        // 컴포넌트가 마운트될 때 input에 포커스를 설정합니다.
        if(inputRef.current !== null){
        inputRef!.current.focus();
        }
      }, [inputRef]); // 빈 배열을 전달하여 이펙트가 한 번만 실행되도록 합니다.


      const transFormGetDateToRightForm = (DateObejct:any)=>{
        console.log('sss')
        const month = DateObejct.toLocaleString('default', { month: 'short' });
        const dayOfMonth = DateObejct.getDate();
        const monthDay = `${month} ${dayOfMonth}`;
        const dayOfWeek = DateObejct.toLocaleString('default', { weekday: 'short' });
        return {monthDay, dayOfWeek };
      }

      const handleSelectedDay = (startDate:any,startOrEnd:string) => {
          if(startOrEnd === 'start'){
            const getDate = new Date(startDate);
            const {monthDay,dayOfWeek} = transFormGetDateToRightForm(getDate);
            setSelectedStartDay({monthDay:{'monthDay':monthDay,'day':dayOfWeek},yearMonthDay:getDate.toString()});
            const isLessThanTwoDay = valueOfEvent.isDisplayOfDay;
            console.log(isLessThanTwoDay,'datada')
            setIsDisplayOfDay(valueOfEvent.isLessThanTwoDay);
            if(isLessThanTwoDay){
              setSelectedEndDay({monthDay:monthDay,yearMonthDay:getDate.toString()});
              console.log({monthDay:monthDay,yearMonthDay:getDate.toString()});
              console.log(getDate,'sfe');
              let dayOfWeekIndex = getDate.getDay()-1;
              console.log(dayOfWeekIndex,'sibal')
              if(dayOfWeekIndex<0){
                dayOfWeekIndex = daysOfWeek.length
              }
              console.log(dayOfWeekIndex,'index')
              const uppercaseDay = daysOfWeek[dayOfWeekIndex-1].value;
              console.log(uppercaseDay,'awdw')
              setDateOfSelectedDay(uppercaseDay)
            }
          }else{
            const getDate = new Date(startDate);
            const month = getDate.toLocaleString('default', { month: 'short' });
            const dayOfMonth = getDate.getDate();
            const monthDay = `${month} ${dayOfMonth}`;
            const dayOfWeek = getDate.toLocaleString('default', { weekday: 'short' });
            setSelectedEndDay({monthDay:{'monthDay':monthDay,'day':dayOfWeek},yearMonthDay:getDate.toString()});
          }
          const currentValue = todoCtx.openAndType;
          todoCtx.sendFlexbox({ ...currentValue,  popupValue:''});
        }

      // useEffect(()=>{
      //   console.log('sefes')
      //   handleSelectedDay(startDate)
      // },[])

      // const handleAlarmSelectedDay = (Time:any) =>{
      //   const month = Time.toLocaleString('default', { month: 'short' });
      //   const dayOfMonth = Time.getDate();
      //   const monthDay = `${month} ${dayOfMonth}`;
      //   const dayOfWeek = Time.toLocaleString('default', { weekday: 'short' });
      //   setAlarmCustomDay({monthDay:{'monthDay':monthDay,'day':dayOfWeek},yearMonthDay:Time.toString()});
      //   const currentValue = todoCtx.openAndType
      //   todoCtx.sendFlexbox({ ...currentValue,  popupValue:''});
      // }

      const handleOpenCalendar = (type:string) => {
        const currentValue = todoCtx.openAndType
        todoCtx.sendFlexbox({ ...currentValue,  popupValue:`OpenCalendar${type}`});
      }
      const handleOpenCustomAlarmCalender = () => {
        const currentValue = todoCtx.openAndType
        todoCtx.sendFlexbox({ ...currentValue,  popupValue:'OpenCustomAlarmCalender'});
      }

      const handleLabel = () => {
        const currentValue = todoCtx.openAndType
        todoCtx.sendFlexbox({ ...currentValue,  popupValue:'OpenLabel'});
      }

      const handleDropDownBox = (type:string)=>{
        const currentValue = todoCtx.openAndType
        todoCtx.sendFlexbox({ ...currentValue,  popupValue:type});
      }

      const handleOpenAlarm = () =>{
         setIsAlarm(!isAlarm)
      }

      function formatDate(dateString:any) {
        const date = new Date(dateString);
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
    
        return `${year}${month}${day}${hours}${minutes}`;
    }

      const sendRequestOfMakePlan = (e:any)=>{
            e.preventDefault()

            // if (!selectedDays.includes(dateOfSelectedDay)) {
            //     selectedDays.push(dateOfSelectedDay);
            //   }

            const EventValue = {
                title:titleValue,
                startTime:formatDate(CombinedDayMonthYear(startEventTime,selectedStartDay.yearMonthDay)),
                endTime:formatDate(CombinedDayMonthYear(endEventTime,selectedEndDay.yearMonthDay)),
                selectedDays:selectedDays,
                interval:recurrenceValue,
                description:descriptionValue,
                categoryId:null,
                alarmTime:filterAlarmValue(alarmCompoent)
    
                // isAlarm:{value:isAlarm,AlarmTime:isAlarm?(openCustomAlarmState?handleSetAlarm(alarmTimeValue,alarmCustomDay.yearMonthDay):handleSetAlarm(alarmCustomTimeValue,CombinedDayMonthYear(startEventTime,selectedStartDay.yearMonthDay))):0}
            }

            console.log(EventValue);
            todoCtx.callCalendarDataApi();



            const EventValue2 = {
              inviteUserEmail:inviteUserEmail,
              authority:invitedUserAuthority
            }
            console.log(EventValue2);

    
          

        // const createEvent = async () => {
        //     console.log('createEvent executed',EventValue) 
        //     try {
        //       const res = await instance.post(`${todoCtx.serverUrl}/api/event/insert`,EventValue);
        //         if (res.status === 200) {
        //             alert('success')
        //             todoCtx.callCalendarDataApi();
        //           return
        //         }else if(res.status === 401){
        //             alert('wrong')
        //             todoCtx.callCalendarDataApi();
        //           return
        //         }
        //         return
        //     } catch (err) {
        //         todoCtx.callCalendarDataApi();
        //         return
        //     }
        // }

        // createEvent();
      }

      const handleDetailMakeEvent = () =>{
        const EventValue = {
          title:titleValue,
          startTime:{time:startEventTime,yearMonthDay:selectedStartDay.yearMonthDay},
          endTime:{time:endEventTime,yearMonthDay:selectedEndDay.yearMonthDay},
          selectedDays:selectedDays,
          interval:recurrenceValue,
          description:descriptionValue,
          categoryId:null,
          alarmTime:filterAlarmValue(alarmCompoent),
      }

      const sibal = {
        typeOfMakeInfo:{
          view: "detail",
          isDisplayOfDay: isDisplayOfDay,
        },
        EventValue:EventValue
    }

      navigate( '/calendar/eventId/null', { state:sibal})

    }


      const CombinedDayMonthYear = (MonthDay:string,yearMonthDay:string) =>{
        console.log(MonthDay,yearMonthDay,'##')
        const dateObject = new Date(yearMonthDay);

        const [hours, minutes] = MonthDay.split(':').map((num: string) => parseInt(num, 10)); // num의 타입을 명시적으로 string으로 지정

        dateObject.setHours(hours);
        dateObject.setMinutes(minutes);
        return dateObject.toString()
    }

      const openCustomAlarm = (index:number) =>{
        setAlarmCompoent((prevState:any) => {
          const newAlarmCompoent = [...prevState];
          newAlarmCompoent[index].isCustomAlarmState = !(newAlarmCompoent[index].isCustomAlarmState);
          return newAlarmCompoent;
        });

      }

      const filterAlarmValue = (AlarMarray:any) =>{
        const newArray = AlarMarray.map((alarmValue:any)=>{
          if(alarmValue.isCustomAlarmState){
            console.log(customAlarmeValue*alarmCustomMethod.timeValue)
            return {'label':`${customAlarmeValue} ${alarmCustomMethod.label}`,'timeValue':customAlarmeValue*alarmCustomMethod.timeValue}
          }else{
            console.log( alarmValue.alarmOption.timeValue)
            return {'label':alarmValue.alarmOption.label,'timeValue':alarmValue.alarmOption.timeValue}
          }
        });
        return newArray;
      };



      // const addCustomTime = (Time:string) =>{
      //   setAlarmTimeValue(Time)
      //   // if(alarmCustomDay){

      //   // const dateObject = new Date(alarmCustomDay.yearMonthDay);
        
      //   // const [hours, minutes] = Time.split(':').map((num: string) => parseInt(num, 10)); // num의 타입을 명시적으로 string으로 지정
        
      //   // dateObject.setHours(hours);
      //   // dateObject.setMinutes(minutes);

      //   // setAlarmValue(dateObject.toString());
      //   // }else{
      //   //     console.error('can not get alarmCustomDay')
      //   //     return
      //   // }
      // }





      const handleValueOfTitle = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setTitleValue(e.target.value)
      }

      const handleValueOfDescription = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setDescriptionValue(e.target.value)
      }

      // const handleSetAlarm = (alarmTimeValue:any,alarmCustomTimeValue:any) => {
      //   if(openCustomAlarmState){
      //       return CombinedDayMonthYear(alarmTimeValue,alarmCustomTimeValue)
      //   }else{
            
      //       return GetAlarmInfo(alarmTimeValue,alarmCustomTimeValue)
      //   }
      // }

    
      const GetAlarmInfo = (selectedOption:string,startEventDate:any) =>{
    startEventDate = new Date(startEventDate);
    switch (selectedOption) {
        case "일주일 전":
            startEventDate.setDate(startEventDate.getDate() - 7);
          break;
        case "10시간 전":
            startEventDate.setTime(startEventDate.getTime() - 10 * 60 * 60 * 1000);
          break;
        case "5시간 전":
            startEventDate.setTime(startEventDate.getTime() - 5 * 60 * 60 * 1000);
          break;
        case "3시간 전":
            startEventDate.setTime(startEventDate.getTime() - 3 * 60 * 60 * 1000);
          break;
        case "1시간 전":
            startEventDate.setTime(startEventDate.getTime() - 1 * 60 * 60 * 1000);
          break;
        case "30분 전":
            startEventDate.setTime(startEventDate.getTime() - 30 * 60 * 1000);
          break;
        case "15분 전":
            startEventDate.setTime(startEventDate.getTime() - 15 * 60 * 1000);
          break;
        case "10분 전":
            startEventDate.setTime(startEventDate.getTime() - 10 * 60 * 1000);
          break;
        case "5분 전":
            startEventDate.setTime(startEventDate.getTime() - 5 * 60 * 1000);
          break;
        default:
          return null;
      }
      return startEventDate
    }
      
    const initialTime = () =>{

        setInitialTimes({startTime:timeExtractor(valueOfEvent.start),endTime:timeExtractor(valueOfEvent.end)})

        return 
    }
    useEffect(()=>{
      console.log(valueOfEvent.view)
      if(valueOfEvent.view === 'week' || valueOfEvent.view === 'day' ){
        initialTime()
        console.log('1')
      }
      return
    },[valueOfEvent.value])


    useEffect(()=>{
      console.log(valueOfEvent,'please')
    },[valueOfEvent])

    useEffect(()=>{
      if(InfoOfEvent){
        putInfoEventData(InfoOfEvent)
      }
    },[])
  
    const timeExtractor = (dateObject:any) =>{
      const hours = dateObject.getHours();
      const minutes = dateObject.getMinutes();
      const time = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
      return time
    }


    const handleIsdetailLabelAlarmOption = () =>{
      setIsdetailLabelAlarmOption(true)
    }


    const handleIsdetailInviateOption = () =>{
      if(!isdetailInviateOption){
        setIsdetailInviateOption(true)
      }else{
        return
      }
    }

    const handleIsdetailInviateRightOption = () =>{
    setIsdetailInviateRigthOption(true)

    }

    const handleSelectMetnodClick =(value:string) =>{
      setSelectMetnod(value)
    }

    const updateRecurrenceValue =(value:number)=>{
      setRecurrenceValue(value);
      console.log(recurrenceValue,'recurrenceValue')
    }


    const updateCustomAlarmeValue =(value:number)=>{
      setCustomAlarmeValue(value);
    }



    const handlePopUpClick= (value:string|number,selectedIndex:number,type:string) =>{
      const alarmValueArray = alarmCompoent.map((item:any, index:number) => {
        if (selectedIndex === index) {
            if(type === 'option'){
              return {
                ...item, // Keep the other properties of the item
                customAlarmOption: {
                  ...item.customAlarmOption,
                  option: value
                }
            };
            }else{
              return {
                ...item, // Keep the other properties of the item
                customAlarmOption: {
                  ...item.customAlarmOption,
                  alarmNumberInput: value
                }
            };
            }
            return {
                ...item, // Keep the other properties of the item
                customAlarmOption: value
            };
        } else {
            return item; // Keep the item unchanged
        }
    });
    setAlarmCompoent(alarmValueArray);
      return
    }

    const openAlarmOption = () =>{
      setIsAlarm(true)
    }

    const showDeleteOptionOfAlarm = (indexValue:number) =>{
      setAlarmCompoent((prevState:any) => {
        const newAlarmCompoent = [...prevState];
        newAlarmCompoent[indexValue].isAlarmDeleteShowed = true;
        return newAlarmCompoent;
      });
    }


    const hideDeleteOptionOfAlarm = (indexValue:number) =>{
      setAlarmCompoent((prevState:any) => {
        const newAlarmCompoent = [...prevState];
        newAlarmCompoent[indexValue].isAlarmDeleteShowed = false;
        return newAlarmCompoent;
      });
    }

    const deleteOptionOfAlarm = (index:number) =>{
      console.log(index,'index')
      setAlarmCompoent((prevState:any) => {
        const AlarmValue = [...prevState];
        console.log(AlarmValue,'AlarmValue')
        return AlarmValue.filter((_, i) => i !== index)
      });
    }

    const sendInviteUserEmail = (value:EmailTag[])=>{
      console.log(value,'value');
        setInviteUserEmail(value) 
        ;
    }

    const extractValues = (data:any) => {
      if(data){
      return data.map((item:any) => item.value).join(',');
      }else{
        return
      }
    };
    const handleInvitedUserAuthority = (isChecked:boolean, value:string) => {
      setInvitedUserAuthority((prevState:any) => {
        // 이전 상태 복제
        const updatedData = prevState.map((item:any) => {
          // isEditable 속성을 가진 요소인 경우 수정
          if (item.hasOwnProperty(value)) {
            return { ...item, isEditable: isChecked };
          } else {
            // isEditable 속성을 가지지 않은 경우 그대로 반환
            return item;
          }
        });
        return updatedData; // 수정된 데이터 반환
      });
    };



    const updateDiscriptionValue = (value:string) =>{
      setDescriptionValue(value)
    }

  return(
  <form className={style.container} onSubmit={sendRequestOfMakePlan}>
       <div className={style.container__div}>
       <div className={style.container__div__items}>
       <div className={style.container__list}>
            <div className={style.container__list__padding}>
            <SlCalender></SlCalender>
            </div>
            <input ref={inputRef} placeholder="Title" className={style.container__list__title} onChange={handleValueOfTitle} value={titleValue} type="text"></input>
        </div>


            {valueOfEvent.isDisplayOfDay
            ?
            <>
            <div className={style.container__list}>
            <div className={style.container__list__padding}>
            <FaRegClock></FaRegClock>
            </div>
            <div className={style.container__list__Date}>

                <div className={`${style.container__list__Date__container} ${todoCtx.openAndType.popupValue === 'OpenCalendarStart' ? style.focus: null}`} onClick={()=>handleOpenCalendar('Start')}>
                <p>  {selectedStartDay ? 
                  `${selectedStartDay.monthDay.monthDay} (${selectedStartDay.monthDay.day})` 
              : ''}</p>
                </div>
        
                <div className={style.container__list__Date__PopupCalendar}>
              <PopupCalendar isCalenderOpen={todoCtx.openAndType.popupValue === 'OpenCalendarStart'} initialDate={valueOfEvent?valueOfEvent.start:new Date()} selectedDay={handleSelectedDay} selectedValue={'start'}></PopupCalendar>
              </div>
            </div>
            <TimeSelectInput initialTime={initialTimes} handleEndEventTime={handleEndEventTime} handleStartEventTime={handleStartEventTime}></TimeSelectInput>
            </div>
            <div className={style.container__list}>
            <div className={style.container__list__padding}>
            <SlCalender></SlCalender>
            </div>
            <div className={style.container__list__selectOfDays}>
                {daysOfWeek.map((day, index) => (
                    <div key={index}               
                    className={`${style.container__list__selectOfDays__block} ${ selectedDays.includes(day.value) || dateOfSelectedDay === day.value ? style.selected: ''}`} onClick={() => handleClick(day.value)}>
                        <p>{day.label}</p>
                    </div>
                ))}
            </div>
            </div>
            </>
            :
            <>
                <div className={style.container__list}>
                <div className={style.container__list__padding}>
                <SlCalender></SlCalender>
                </div>

                <div className={style.container__list__Date}>

                    <div className={style.container__list__Date__container} onClick={()=>handleOpenCalendar('Start')}>
                    <p>{selectedStartDay ? `${selectedStartDay.monthDay.monthDay} (${selectedStartDay.monthDay.day})` : ''}</p>
                    </div>
            

                    <PopupCalendar isCalenderOpen={todoCtx.openAndType.popupValue === 'OpenCalendarStart'} initialDate={valueOfEvent?valueOfEvent.start:new Date()} selectedDay={handleSelectedDay} selectedValue={'start'}></PopupCalendar>
                </div>
                <TimeSelectInputIndependant initialTime={initialTimes.startTime} type={'start'} handleEndEventTime={handleEndEventTime} handleStartEventTime={handleStartEventTime}></TimeSelectInputIndependant>
                      
                <div className={style.container__list__Date}>
                <div className={style.container__list__Date__container} onClick={()=>handleOpenCalendar('End')}>
                <p>{selectedEndDay ? `${selectedEndDay.monthDay.monthDay} (${selectedEndDay.monthDay.day})` : ''}</p>
                </div>
                <PopupCalendar isCalenderOpen={todoCtx.openAndType.popupValue === 'OpenCalendarEnd'} initialDate={valueOfEvent?valueOfEvent.end:new Date()} selectedDay={handleSelectedDay} selectedValue={'end'}></PopupCalendar>
                </div>
                <TimeSelectInputIndependant  initialTime={initialTimes.endTime} type={'end'} handleEndEventTime={handleEndEventTime} handleStartEventTime={handleStartEventTime}></TimeSelectInputIndependant>
                </div>
            </>
            }

            <div className={style.container__list}>
            <div className={style.container__list__popupContainer} style={{alignItems: 'center'}}>
            <div className={style.container__list__padding}></div>
            <InputNumber updateValue={updateRecurrenceValue}></InputNumber>
    
               <Button background_color={'b-darkGary'} color={'white'} handleClick={()=> handleSelectMetnodClick('week')} width={'80px'} borderRadius={'15px'} disabled={selectMetnod === 'week' ? true :false} >week</Button>
               <Button background_color={'b-darkGary'} color={'white'} handleClick={()=> handleSelectMetnodClick('month')} width={'80px'} borderRadius={'15px'} disabled={selectMetnod === 'week' ? false :true} >month</Button>
            </div>
            </div>

        </div>
        <div className={style.container__div__sideItems}>
        <Button width={'100px'} borderRadius={'5px'} color={'white'} type={'submit'}>Submit</Button>
        </div>
        
        </div>


        
        <div className={style.container__Downdiv}>
        <div className={style.container__div__items}>
        <div className={style.container__div__items__title}>
        <div className={style.container__list__padding}>

            </div>
          <div className={style.container__div__items__title__p}>
            <p>Detail of Event</p>
          </div>
        </div>



        <div className={style.container__list__popupContainer}  style={{flexDirection: 'column',overflow:'scroll'}}>
            <div className={style.container__list}>
              <div className={style.container__list__padding}>
                <SlCalender></SlCalender>
              </div>
          <div className={style.containerNavbar__todayContainer} onClick={handleLabel}>
          <DownOutLineLetter padding={'10px 8px'}>

              <div  className={style.containerNavbar__todayContainer__label} style={{'backgroundColor':LabelColor}}></div>
      
      </DownOutLineLetter>
      </div>
      <LabelPopUp updateLabel={updateLabel} isLabelOpen={todoCtx.openAndType.popupValue === 'OpenLabel'}></LabelPopUp>
      </div>


      <div className={style.container__list}>
          <div className={style.container__list__padding} style={{flexDirection:'column'}}>
              <MdOutlineAccessAlarms></MdOutlineAccessAlarms>
          </div>

          
  
              <div className={style.container__list__alarmContainer}>
              {alarmCompoent.map((alarm:any, index:number) => (
                  <div className={`${style.container__list__alarmContainer__container}`} onMouseEnter={() => showDeleteOptionOfAlarm(index)} onMouseLeave={() => hideDeleteOptionOfAlarm(index)} key={index}>
                    {
                   alarm.isCustomAlarmState?
                   <div className={style.container__list__popupContainer}>
                   <div className={style.container__list}>
  
                   <div className={style.container__list__Date}>
           
              
           
                       {/* <PopupCalendar isCalenderOpen={todoCtx.openAndType.popupValue === 'OpenCustomAlarmCalender'} selectedDay={handleAlarmSelectedDay} setStartDay={selectedStartDay}></PopupCalendar> */}
                       <InputNumber  initialValue={alarm.customAlarmOption.alarmNumberInput} updateValue={(value:number) =>handlePopUpClick(value,index,'numberInput')}></InputNumber>
      
                       </div>
                       <DropDownBoxContainer typeOfBox={'gray'} typeOfPopup={'handleCustomAlarm'} selectOption={[{id:'minute',label:'Mintue',timeValue:1},{id:'hour',label:'Hour',timeValue:60},{id:'day',label:'Day',timeValue:1440},{id:'week',label:'Week',timeValue:10080}]} onClickSelectOption={(value) => handlePopUpClick(value,index,'option')}>
                        {alarm.customAlarmOption.option.label}
                       </DropDownBoxContainer>
                   </div>
                          </div>
                    :
                    <div className={style.container__list__alarmContainer__container}>
                      <AlarmCompoent  numberOfArray={index} alarmValue={alarm.alarmOption} handleAlarmValue={handleAlarmValue}></AlarmCompoent>
                    </div>
 
                    }
                    <label className={style.customAlarm}>Custom Alarm</label>
                    <label className={style.switch}>
                    <input type="checkbox" checked={alarm.isCustomAlarmState} onClick={() => openCustomAlarm(index)}/>
                    <span className={`${style.switch__slider} ${style.switch__round}`}></span>
                    </label>

                    {alarmCompoent[index].isAlarmDeleteShowed === true
                    ?
                    <ClosedButton onClick={() => deleteOptionOfAlarm(index)}>
                         <IoCloseOutline/>
                    </ClosedButton> // onClick={deleteOptionOfAlarm(index)
                    :
                    null
                    }
                    </div>
                ))}

            
              <GrayBoxContainer onClick={addAlarm}>    
                  <div style={{width:'100%'}}>알람 추가</div>
              </GrayBoxContainer>



              </div>

      

            </div> 

            <div className={style.container__list}>
      <div className={style.container__list__padding}>
          <ImParagraphLeft></ImParagraphLeft>
          </div>
          <NewTodos descriptionValue={descriptionValue} valueOfParagraph={updateDiscriptionValue} height={'500px'}></NewTodos>
                    </div>




      
          </div>   
        </div>
        <div className={style.container__div__sideItems}>
        <div className={style.container__div__items__title}>
        <div className={style.container__list__padding}>

            </div>
          <div className={style.container__div__items__title__p}>
            <p>Detail of Event</p>
          </div>
        </div>

        <div className={style.container__list}  style={{padding: '10px 0'}} >
                    <div className={style.container__list__padding} style={{flexDirection:'column'}}>
                        <MdOutlinePeopleAlt></MdOutlinePeopleAlt>
                    </div>
                    <div className={style.container__list__invite__container} style={{flexDirection:'column'}}>
                    <InviteUserEmail sendInviteUserEmail={sendInviteUserEmail} defaultInviteValue={inviteUserEmail}></InviteUserEmail>
                    {/* sendInviteUserEmail={sendInviteUserEmail} initialValueOfInvateUserEmail={extractValues(inviteUserEmail)} valueOfInvateUserEmail={inviteUserEmail} */}
                    {
                  isdetailInviateOption
                  ?
                  <div className={style.container__list__right__container}>
                      {optionOfInviteUser.map((inviteOption:typeCheckBox)=>(
                              <CheckBox handleCheckedLogic={handleInvitedUserAuthority} option={inviteOption}></CheckBox>
                      ))}
                  </div>
                      :
                      null

                    }
            

                    </div>
                    

        </div> 
        </div>
        </div>
       
            

  </form>
  )
};



export default DetailMakeEvent;
