import React, { useState,useEffect,useContext,useRef,useMemo } from 'react';
import { useNavigate,useLocation } from 'react-router-dom'
import style from './ModalTypeCss/MakeEvent.module.css';
import TimeSelectInput from '../../compoent/compoentItem/TimeSelectInputDemo'
import TimeInput from '../../compoent/compoentItem/TimeInput'
import AlarmCompoent from '../../compoent/compoentItem/AlarmCompoent'
import { SlCalender } from "react-icons/sl";
import {TodosContext} from '../../store/todo_context'
import DownOutLineLetter from '../../compoent/compoentItem/DownOutLineLetter';
import { instance,addAccessTokenInterceptor, addResponseInterceptor } from '../../store/axios_context';
import TimeSelectInputIndependant from '../../compoent/compoentItem/TimeSelectInputIndependant'
import Button from '../../compoent/compoentItem/Button';
import InputNumber from '../../compoent/compoentItem/InputNumber';
import DropDownBoxContainer from '../../compoent/compoentItem/DropDownBoxContainer'
import GrayBoxContainer from '../../compoent/compoentItem/GrayBoxContainer';
import NewTodos from '../../compoent/NewTodos';
import ClosedButton from '../../compoent/compoentItem/ClosedButton';
import InviteUserEmail from '../../compoent/compoentItem/InviteUserEmail';
import CustomSelector from '../../compoent/compoentItem/CustomSelectorDemo';
import CustomAlarmCompoent from '../../compoent/compoentItem/CustomAlarmCompoent';
import CheckBox from '../../compoent/compoentItem/CheckBox';
import { FaRegClock } from "react-icons/fa";
import { MdRestartAlt } from "react-icons/md";
import { ImParagraphLeft } from "react-icons/im";
import { LuCalendarClock } from "react-icons/lu";
import { LuAlarmCheck } from "react-icons/lu";
import { MdOutlineAccessAlarms } from "react-icons/md";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { typeCheckBox } from '../../store/types';
import { IoCloseOutline } from "react-icons/io5";
import { arch } from 'os';
import { EmailTag,AttenderEmailDTOS} from '../../store/types';
import { ModalStateContext } from "../../store/ModalProvider";
import useModal from "../../hook/useModal";
import {titleValidator} from '../../compoent/validator'
import TimeSelectInputOneDays from '../../compoent/compoentItem/TimeSelectInputOneDays';
import { Alert } from '@mui/material';
import {fetchedData,dataPutEvents} from '../../store/LoadedEventExample';
import useBackButton from '../../hook/useBackButton';
import axios, { AxiosResponse, AxiosError } from 'axios';
import {useMock} from '../../hook/useMock';
import AxiosMockAdapter from 'axios-mock-adapter';

const SERVERURL = process.env.REACT_APP_SERVER_URL as string;


// need to swiched axios to instance

export const editEventReq = async (EventValue: any):Promise<AxiosResponse<any> | undefined> => {
    console.log('editEvent api executed', {eventValue:EventValue});

    try {
      console.log('aaa')
      const res = await axios.post(`${SERVERURL}/api/event/edit`, {eventValue:EventValue});
      console.log(res,'imortant res')
      return res;
    }catch (err) {
      console.error('Error occurred during API request:', err);
      if (axios.isAxiosError(err)) {
        return err.response;
      }
      return undefined;
    }
  }

export const editInviteReq = async (editInviteData:any):Promise<AxiosResponse<any> | undefined>  =>{
  // await addGeneratorEmail();
  const EventValue2 = {
    attenderEmailDTOS:editInviteData.attenderEmailDTOS,
    eventId:editInviteData.eventId,
  }
  console.log('editInviteReq execute',EventValue2)
  try {
    const res = await axios.post(`${SERVERURL}/api/invite/edit`,EventValue2);
    console.log(res)
    return res;
  }
  catch (err) {
    if (axios.isAxiosError(err)) {
      throw err
    }
    return undefined;
  }
}

export const createInvite = async (editInviteData:any):Promise<AxiosResponse<any> | undefined> =>{

  console.log('createInvite executed');
  try {
    const res = await axios.post(`${SERVERURL}/api/invite/send`,editInviteData);
    console.log(res,'res important')
    return res;
  }   
  catch (err) {
    if (axios.isAxiosError(err)) {
      throw err
    }
    return undefined;
  }
}




const MakeEvent = ({value}:any) => {
  const  { openModal,closeModal,updateModalValue } = useModal();
  //  const {eventId,isSingleDate,eventTimeId,selectedDays=[],attenderEmailDTOS,startTime,title,alarm=[],endTime,interval=1,description,isDisplayOfDay,view,categoryValue,currentCategoryValue,generatorEmail} = value;
  const { eventId, isSingleDate, eventTimeId, startTime, title, alarm, endTime, interval, description, isDisplayOfDay, view, categoryValue, currentCategoryValue, generatorEmail, selectedDays = [], attenderEmailDTOS = [] } = value;


   const eventDetails = useMemo(() => {
    return { eventId, isSingleDate, eventTimeId, startTime, title, alarm, endTime, interval, description, isDisplayOfDay, view, categoryValue, currentCategoryValue, generatorEmail, selectedDays, attenderEmailDTOS };
  }, [
    value.eventId, value.isSingleDate, value.eventTimeId, value.startTime, value.title, value.alarm, value.endTime, value.interval, value.description,
    value.isDisplayOfDay, value.view, value.categoryValue, value.currentCategoryValue, value.generatorEmail, value.selectedDays, value.attenderEmailDTOS
  ]);

  console.log(value,eventId,eventTimeId)


const daysOfWeek: { label: string; value: string; }[] = [
  { label: 'SUN', value: 'SUNDAY' },
  { label: 'MON', value: 'MONDAY' },
  { label: 'TUE', value: 'TUESDAY' },
  { label: 'WED', value: 'WEDNESDAY' },
  { label: 'THU', value: 'THURSDAY' },
  { label: 'FRI', value: 'FRIDAY' },
  { label: 'SAT', value: 'SATURDAY' }
];
    const navigate = useNavigate();
    const location = useLocation();

    const [initialDataValue, setInitialDataValue] = useState<any>({});

    const [titleValue, setTitleValue] = useState<string>('');
    const [titleValidatorStatus, setTitleValidatorStatus] = useState<any>({ touched: false, error: false, message: "" });
    const [selectedDaysValue, setSelectedDaysValue] = useState<string[]>([]);
    const [isRecurrence, setsRecurrence] = useState<boolean>(false);
    // const [isDisplayOfDay, setIsDisplayOfDay] = useState<boolean>(false);
    const [descriptionValue, setDescriptionValue] = useState<string>('');
    const [recurrenceValue, setRecurrenceValue] = useState<number>(1);
    const [isInvalidDate, setIsInvalidDate] = useState<boolean>(false);
    const [dateOfSelectedDay, setDateOfSelectedDay] = useState<string|undefined>(undefined);


    const [isdetailLabelAlarmOption, setIsdetailLabelAlarmOption] = useState<boolean>(false);
    const [isdetailInviateOption, setIsdetailInviateOption] = useState<boolean>(false);


    const [isDetected,setIsDetected] = useState<boolean>(false);


    const [alarmCompoent, setAlarmCompoent] = useState<any>([]);


    const [initialTimes, setInitialTimes] = useState<any>('normal');
    const [selectMetnod, setSelectMetnod] = useState<string>('week');


    const [isDetailInviteOption,setIsdetailInviteOption]= useState<boolean>(false);

    const [attenderEmailDTOSValue, setAttenderEmailDTOSValue] = useState<AttenderEmailDTOS>(attenderEmailDTOS); //{"value":"sefe"},{"value":"sefew"}] initial value
    
    const [invitedUserAuthority, setInvitedUserAuthority] = useState<any>([{isEditable:false}]);
    const optionOfInviteUser:typeCheckBox[] = [{label:'editable',value:'isEditable'}];

    const todoCtx = useContext(TodosContext);
    const ModalCtx = useContext(ModalStateContext);
   

    
    window.onpopstate = (event) => {
      // 상태가 있을 때만 조건 확인
      if(event.state){
        const handleResult = (result:boolean) => {
          if (result === true) {
            console.log(event.state.date)
            const url = event.state.date
            const viewType = event.state.viewType
            if (view === 'eventEdit') {
              updateMakeToView(url,viewType);
            } else if (view === 'detail') {
              updateModalSmall(url,viewType);
            } else {
              closeModal(0);
            }
          } else {
            // URL을 이전 상태로 복구
            return
          }
        };

                const result = askOnemoreTimeToReture();
                handleResult(result);
      
  
      }else{
       alert('event state is not exist!')
      }
    };



    // useEffect(() => {
    //   const handlePopState = (event:PopStateEvent) => {
    //     event.preventDefault();
    //     console.log('뒤로 가기 또는 앞으로 가기 버튼이 눌렸습니다.');
    //     setIsDetected(true)
    //   };
  
    //   window.addEventListener('popstate', handlePopState);
  
    //   return () => {
    //     window.removeEventListener('popstate', handlePopState);
    //   };
    // }, []);

  


    // useEffect(() => {
    //   if (isDetected === true) {
    //     console.log('executed!', view);
    
    //     const handleResult = (result:boolean) => {
    //       if (result === true) {
    //         if (view === 'eventEdit') {
    //           updateMakeToView();
    //         } else if (view === 'detail') {
    //           updateModalSmall();
    //         } else {

    //           closeModal(0);
    //         }
    //       } else {
    //         // URL을 이전 상태로 복구
    //         window.history.go(1); // 1은 "뒤로 가기 취소"를 의미
    //       }
    //       setIsDetected(false);
    //     };
    

    //       if(isChangedValue() === true){
    //         const result = askOnemoreTimeToReture();
    //         handleResult(result);
    //       }else{
    //         closeModal(0);
    //       }
    //       // const result = askOnemoreTimeToReture();
    //       // handleResult(result);
    //     }
      
    // }, [isDetected]);






    useEffect(() => {
      const handleBeforeUnload = (event:BeforeUnloadEvent) => {

        event.preventDefault();
        event.returnValue = ''; // Chrome에서는 이것이 필요합니다.
        return ''; // 다른 브라우저용으로 반환값을 설정합니다.
      };
    
      window.addEventListener('beforeunload', handleBeforeUnload);
    
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, []);


    function updateMakeToView(url:string,viewType:string) {
      console.log('updateMakeTOview')
      navigate(`/main/${viewType}${url}`)
      closeModal(0);
      const eventInfo = dataPutEvents([fetchedData],categoryValue)[0];
      const ViewValue =  {type:'ViewEvent',value:{value:{eventInfo:eventInfo,category:categoryValue},isForce:true,modal:{category:categoryValue,eventId:eventInfo.eventId,navButtonOption:{isEdit:true,isDelete:true}}}}
      console.log('ready to open modal',ViewValue);
      openModal(ViewValue)
      setIsDetected(false)
    }

    function updateModalSmall(url:string,viewType:string) {
      const MainPopup = ModalCtx[0].value?.modal
      const MainValuePopup = ModalCtx[0].value?.value
      console.log(ModalCtx[0])
      let updatedModalData;
      let updatedValueData;

      updatedModalData = {
        ...MainPopup,      // value 객체 내부를 복사
        isFull:false
}

  updatedValueData = {
      ...MainValuePopup,      // value 객체 내부를 복사
      view:'makeEvent',
    }


    const updatedMainPopup = {
      ...ModalCtx[0].value, // 기존 value 객체를 복사
      value: updatedValueData,
      modal: updatedModalData, // 기존의 value 안에 있는 값들 중 start만 변경된 값을 할당
    };
      updateModalValue(0,updatedMainPopup);
      console.log(updatedMainPopup)
      navigate(`/main/${viewType}${url}`)
    }

    function askOnemoreTimeToReture(){
      return window.confirm("Do you really want to leave?")
      // isChangedValue();
      // openModal({type:'AskOneMoreTimeToReturn',value:{isForce:false,modal:{navButtonOption:{isEdit:false,isDelete:false,isClose:false}}}})
    }

    const isChangedValue = () =>{
      const defaultValue = {
        title:'',
        isdetailLabelAlarmOption:false,
        recurrence:1,
        description:'',
        attenderEmailDTOS:1
      }

      const currentValue = {
        title:titleValue ?? '',
        isdetailLabelAlarmOption:isdetailLabelAlarmOption,
        recurrence:recurrenceValue,
        description:descriptionValue ?? '',
        attenderEmailDTOS:attenderEmailDTOSValue.attenderInfoAuth.length
      }

      function isChanged(obj1:any, obj2:any) {
        for (let key in obj1) {
          if (obj1[key] !== obj2[key]) {
            return true;
          }
        }
        return false;
      }
      console.log(isChanged(defaultValue,currentValue))
      const result = isChanged(defaultValue,currentValue)
      return result
    } 

    const addAlarm = () => { 
      console.log('dd')
        const addAlarmCompoent= [...alarmCompoent, 
          {
          'alarmOption':{
            'label': '일주일 전', 
            'value': 10080,
          },
          'customAlarmOption':{
            alarmNumberInput:1,
            option:{
              id:'week',
              label:'Week',
              value:10080}
          },
          'alarmDeleteShowed':false,
          'customAlarmState':false
        }
        ]
      if(alarmCompoent.length < 3){    
        setAlarmCompoent(addAlarmCompoent);
      }else{
        alert("최대 3개의 알람을 추가할 수 있습니다.");
      }
    };


    const handleAlarmValue = (alarmOption: any, numberOfArray: string) => {
      const alarmValueArray = alarmCompoent.map((item: any, index: any) => {
          if (index === Number(numberOfArray)) {
              return {
                  ...item, // Keep the other properties of the item
                  alarmOption: {
                      label: alarmOption.label,
                      value: alarmOption.value
                  }
              };
          } else {
              return item; // Keep the item unchanged
          }
      });
      setAlarmCompoent(alarmValueArray);
  };


  
  const isEarlier = (s:Date,e:Date) =>{
    return  s>=e
  }

   useEffect(()=>{
    console.log(value,'오메르노312')
    if(isEarlier){
      const MainPopup = ModalCtx[0].value?.value
      const StartDate = value.startTime;
      const EndDate = value.endTime
      console.log(isEarlier(StartDate,EndDate),value.startTime,value.endTime)

      let updatedData;
      updatedData = {
        ...MainPopup,      // value 객체 내부를 복사
        startTime:StartDate,
        endTime:isEarlier(StartDate, EndDate) ? new Date(StartDate.getTime() + 30 * 60000):EndDate
}
      const updatedMainPopup = {
        ...ModalCtx[0].value, // 기존 value 객체를 복사
        value: updatedData, // 기존의 value 안에 있는 값들 중 start만 변경된 값을 할당
      };
      updateModalValue(0,updatedMainPopup)

    }else{
      return
    }
    return
   },[value.startTime])


  useEffect(()=>{
    console.log('attenderEmailDTOS',attenderEmailDTOS);
  },[attenderEmailDTOS])

    const handleClick = (day:string) => {
        // 선택된 요일이 이미 배열에 있는지 확인
        if(selectedDaysValue !== null){
        const index = selectedDaysValue.indexOf(day);
        if(dateOfSelectedDay === day){
            alert('Can not unselect the day on calender')
            return}
        if (index === -1) {
            // 배열에 없는 경우 추가
            setSelectedDaysValue([...selectedDaysValue, day]);
        }
        else {
                const updatedDays = [...selectedDaysValue];
                updatedDays.splice(index, 1);
                setSelectedDaysValue(updatedDays);
        }
      }
    };
  




    const handleToggle =()=>{
        setsRecurrence(true)
    }


    // const handleAlarm =()=>{
    //     setIsAlarm(!≈)
    // }


    const handleStartEventTime = (Time:string) => {
      const MainPopup = ModalCtx[0].value?.value
      const StartDate = new Date(Time);
      const EndDate = MainPopup.endTime;


  //       const MainPopup = ModalCtx[0].value?.value
        let updatedData;
        updatedData = {
          ...MainPopup,      // value 객체 내부를 복사
          startTime:StartDate,
          endTime:EndDate
  }
        const updatedMainPopup = {
          ...ModalCtx[0].value, // 기존 value 객체를 복사
          value: updatedData, // 기존의 value 안에 있는 값들 중 start만 변경된 값을 할당
        };
        updateModalValue(0,updatedMainPopup)
      };
    
    const handleEndEventTime = (Time:string) => {
      console.log(Time,'timeee 22 end')
        const MainPopup = ModalCtx[0].value?.value
        console.log('MainPopup',MainPopup)
  //       const MainPopup = ModalCtx[0].value?.value
        let updatedData;
        updatedData = {
          ...MainPopup,      // value 객체 내부를 복사
          endTime:Time
  }
        const updatedMainPopup = {
          ...ModalCtx[0].value, // 기존 value 객체를 복사
          value: updatedData, // 기존의 value 안에 있는 값들 중 start만 변경된 값을 할당
        };
        updateModalValue(0,updatedMainPopup)
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




        const handleSelectedDay2 = () => {
            const dayIndex = startTime.getDay();
            const dayValue = daysOfWeek[dayIndex].value;
            console.log(dayValue)
            setDateOfSelectedDay(dayValue);
        }

      useEffect(()=>{
        if(isDisplayOfDay){
          handleSelectedDay2()
        }
        return
      },[])




      const sendRequestOfMakePlan = (e:any)=>{
            e.preventDefault()
            if(dateOfSelectedDay !== undefined){
            if (!selectedDaysValue.includes(dateOfSelectedDay)) {
                selectedDaysValue.push(dateOfSelectedDay);
              }
            }

            const EventValue = {
                title:titleValue,
                startTime:startTime,
                endTime:endTime,
                selectedDays:selectedDaysValue,
                interval:recurrenceValue,
                description:descriptionValue,
                categoryId:currentCategoryValue.categoryId,
                alarm:alarmCompoent
            }

            // todoCtx.callCalendarDataApi();
      
        const createEvent = async () => {
          console.log('createEvent executed',view) 
          const mock = new AxiosMockAdapter(axios, { delayResponse: 1000 }); // 2초 지연 설정
          mock.onPost(`${SERVERURL}/api/event/insert`).reply(200, {
            message: 'Mocked success response',
          }); 

          mock.onPost(`${SERVERURL}/api/invite/send`).reply(200, {
            message: 'Mocked success response',
          }); 
            const eventData = {              
              attenderEmailDTOS:attenderEmailDTOSValue,
              eventId:eventId,
            }


            try {
              const res = await axios.post(`${todoCtx.serverUrl}/api/event/insert`,EventValue);
                if (res.status === 200) {
                    alert('success')
                    createInvite(eventData);
                 // todoCtx.callCalendarDataApi();
                  return
                }else if(res.status === 401){
                    alert('wrong')
                    // todoCtx.callCalendarDataApi();
                  return
                }
                return
            } catch (err) {
                  // todoCtx.callCalendarDataApi();
                return
            }

        }
        
        if(view === "eventEdit"){
          const eventData = {
            EventValue:EventValue,
            attenderEmailDTOS:attenderEmailDTOSValue,
            eventId:eventId,
            eventTimeId:eventTimeId,
            categoryInfo:categoryValue
          }
          editEvent(eventData)
        }else{
          createEvent();
        }
      }

      const editEvent = async (eventData:any) => {
        
        const mock = new AxiosMockAdapter(axios, { delayResponse: 1000 }); // 2초 지연 설정
        mock.onPost(`${SERVERURL}/api/event/edit`).reply(200, {
          message: 'Mocked success response',
        }); 

        mock.onPost(`${SERVERURL}/api/invite/edit`).reply(200, {
          message: 'Mocked success response',
        }); 
        

        if(isSingleDate === false){
          openModal({type:'AskOptionOfInterval',value:{isForce:true,eventValue:eventData,modal:{navButtonOption:{isEdit:false,isDelete:false,isClose:true}}}})
        }else{
          console.log('editEvent executed',eventData);
         try{
          const response = await editEventReq(eventData.EventValue);
          if (response && response.status === 200) {
            console.log(response,'success');
            const editInviteData = {
                attenderEmailDTOS:eventData.attenderEmailDTOS,
                eventId:eventData.eventId,
            }


            const secondResponse = await editInviteReq(editInviteData);
            if (secondResponse && secondResponse.status === 200) {
              alert('todoCtx.callCalendarDataApi()');
            }


         } 
        }
         catch (err){
          console.log(err)
          alert(err)
         } 
         finally {
          // Mock 해제 (중요): 다른 요청에 영향을 주지 않도록 처리
          mock.restore();
        }
        }
      } 


 
      const handleDetailMakeEvent = () =>{


        const EventValue = {
          title:titleValue,
          startTime:startTime,
          endTime:endTime,
          selectedDays:selectedDaysValue, 
          // dateOfSelectedDay:dateOfSelectedDay,
          currentCategoryValue:currentCategoryValue,
          interval:recurrenceValue,
          description:descriptionValue,
          categoryId:currentCategoryValue.categoryId,
          alarm:alarmCompoent,
          attenderEmailDTOS:attenderEmailDTOSValue,

      }


      const sibal = {
        view: "detail",
        categoryValue:categoryValue,
        generatorEmail:generatorEmail,
        EventValue:EventValue
    }
    console.log(sibal,'dgf')
      closeModal(0);
      navigate( '/calendar/eventId/null/eventTimeId/null', { state:sibal})
    }



    useEffect(()=>{
      if(isEarlier(startTime,endTime)){
        console.log(startTime,endTime,'afasdfafsdafsd')
        setIsInvalidDate(true)
      }else{
        setIsInvalidDate(false)
      }
    },[endTime])

    useEffect(()=>{
  console.log(isInvalidDate)
    },[isInvalidDate])

    //   const CombinedDayMonthYear = (Time:any,yearMonthDay:string) =>{
    //     const dateObject = new Date(yearMonthDay);

    //     const [hours, minutes] = Time.split(':').map((num: string) => parseInt(num, 10)); // num의 타입을 명시적으로 string으로 지정

    //     dateObject.setHours(hours);
    //     dateObject.setMinutes(minutes);
    //     return dateObject.toString()
    // }

      const openCustomAlarm = (index:number) =>{
        setAlarmCompoent((prevState:any) => {
          const newAlarmCompoent = [...prevState];
          newAlarmCompoent[index].customAlarmState = !(newAlarmCompoent[index].customAlarmState);
          return newAlarmCompoent;
        });

      }

   



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
        const titleValue = e.target.value;
        console.log(titleValue,'titleValue')
        const result = titleValidator(titleValue);
        console.log(result,'validate result')
        setTitleValidatorStatus(result);
        setTitleValue(e.target.value)
      }

      const updateDiscriptionValue = (value:string) =>{
        setDescriptionValue(value)
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
      
    // const initialTime = () =>{

    //     setInitialTimes({startTime:timeExtractor(start),endTime:timeExtractor(end)})
    //     console.log(timeExtractor(start),start,'s')
    //     return 
    // }
    // useEffect(()=>{
    //   console.log(view)
    //   if(view === 'week' || view === 'day' ){
    //     initialTime()
    //     console.log('1')
    //   }
    //   return
    // },[view])





    // const handleinLinePopup = (typeOfPopup:string)=>{
    //   openModal({
    //     type:ModalCtx.type,
    //     value: {
    //       ...ModalCtx.value, // 기존 value의 모든 속성을 복사
    //       typeOfPopup: typeOfPopup, // typeOfPopup 속성을 추가 또는 덮어씀
    //     }
    //   });
    //   return
    // }

  
    // const timeExtractor = (dateObject:any) =>{
    //   const hours = dateObject.getHours();
    //   const minutes = dateObject.getMinutes();
    //   const time = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
    //   return time
    // }


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

  

    const handleSelectMetnodClick =(value:string) =>{
      setSelectMetnod(value)
    }

    const updateRecurrenceValue =(value:number)=>{
      setRecurrenceValue(value);
      console.log(recurrenceValue,'recurrenceValue')
    }




    const handlePopUpClick= (value:any,selectedIndex:number,type:string) =>{
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



    const showDeleteOptionOfAlarm = (indexValue:number) =>{
      setAlarmCompoent((prevState:any) => {
        const newAlarmCompoent = [...prevState];
        newAlarmCompoent[indexValue].alarmDeleteShowed = true;
        return newAlarmCompoent;
      });
    }


    const hideDeleteOptionOfAlarm = (indexValue:number) =>{
      setAlarmCompoent((prevState:any) => {
        const newAlarmCompoent = [...prevState];
        newAlarmCompoent[indexValue].alarmDeleteShowed = false;
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

    // const addGeneratorEmail = async () => {
    //   return new Promise<void>((resolve) => {
    //     // attenderInfoAuth가 비어 있을 때만 상태 업데이트
    //     if (attenderEmailDTOS.attenderInfoAuth.length === 0) {
    //       setAttenderEmailDTOS((prev: AttenderEmailDTOS) => ({
    //         ...prev,
    //         attenderInfoAuth: [
    //           {
    //             attenderEmail: generatorEmail,  // 현재 로그인한 유저 이메일
    //             role: "GENERATOR",  // 직책
    //           },
    //         ],
    //       }));
    //       resolve(); // 상태가 업데이트된 후 resolve 호출
    //     } else {
    //       // attenderInfoAuth가 비어있지 않으면 바로 resolve 호출
    //       resolve();
    //     }
    //   });
    // };
  

    const sendInviteUserEmail = (value:EmailTag[])=>{
      console.log(value,'valuㅇㅇㅇㅇㅇe');
      // if(attenderEmailDTOS.attenderInfoAuth.length === 0){
      //   const generatorInfo:AttenderInfoAuth[] = [{ attenderEmail: generatorEmail, role: 'GENERATOR' }];
      //   const valueOfInviteUser = value.map((item:EmailTag)=>
      //     ({attenderEmail:item.id,role:item.role})
      //   )
      //   setAttenderEmailDTOS((prev) => ({
      //     ...prev,
      //     attenderInfoAuth: [...generatorInfo,...valueOfInviteUser]
      //   }));

      // }else{
        const valueOfInviteUser = value.map((item:EmailTag)=>
          ({attenderEmail:item.id,role:item.role})
        )
      setAttenderEmailDTOSValue((prev) => ({
        ...prev,
        attenderInfoAuth: [...valueOfInviteUser]
      }));
      // }
    }

    const sendEmailToAttender = () =>{
      setAttenderEmailDTOSValue((prev) => ({
        ...prev,
        isSendEmailToAttender:!prev.isSendEmailToAttender
      }));
    }

    const invitableAnyoneLink = () =>{
      setAttenderEmailDTOSValue((prev) => ({
        ...prev,
        isInvitableAnyoneLink:!prev.isInvitableAnyoneLink
      }));
    }



    useEffect(()=>{
      if(attenderEmailDTOSValue.attenderInfoAuth.length === 1){
        setIsdetailInviteOption(false);
      }else if(attenderEmailDTOSValue.attenderInfoAuth.length > 1){
        setIsdetailInviteOption(true);
      }
      return
    },[attenderEmailDTOSValue.attenderInfoAuth])



    const extractValues = (data:any) => {
      if(data){
      return data.map((item:any) => item.value).join(',');
      }else{
        return
      }
    };
    const handleCheckedLogic = (isChecked:boolean, value:string) => {
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




    const putInfoEventData = () =>{
      const isShowedOption = (value.view !== 'makeEvent')
      console.log(value,'sefs')
      setsRecurrence(isShowedOption);
      setIsdetailLabelAlarmOption(isShowedOption);
      setTitleValue(title)
      const result = titleValidator(title);
      setTitleValidatorStatus(result);
      setSelectedDaysValue(selectedDays)
      setAlarmCompoent(alarm)
      updateRecurrenceValue(interval);
      setDescriptionValue(description)
      setAttenderEmailDTOSValue(attenderEmailDTOS)
      
      const initialValue = {
        title:title ?? '',
        selectedDays:selectedDays,
        alarm:alarm,
        recurrence:interval,
        description:description ?? '',
        attenderEmailDTOS:attenderEmailDTOS
      }

      setInitialDataValue(initialValue);
      console.log(initialValue)
    }

    
    useEffect(()=>{
      if(value){
        putInfoEventData()
        console.log('putInfoEventData executed!')
      }
      return
    },[])


 


  return(
  <form className={style.container} onSubmit={sendRequestOfMakePlan}>



        <div className={style.container__list}>
            <div className={style.container__list__padding}>
            </div>
            <input ref={inputRef} value={titleValue} placeholder="Title" className={style.container__list__title} onChange={handleValueOfTitle}  type="text"></input>
        </div>
   
              <div className={style.container__list}>
                <div className={style.container__list__padding}>
                  <FaRegClock />
                </div>
                <div className={style.container__list__Date}>
                  <TimeSelectInputOneDays
                    isInvalidDate={isInvalidDate}
                    start={startTime}
                    end={endTime}
                    handleStartEventTime={handleStartEventTime}
                    handleEndEventTime={handleEndEventTime}
                  />
                </div>
              </div>

              {isDisplayOfDay
                ?
              <div className={style.container__list}>
                <div className={style.container__list__padding}>
                  <SlCalender />
                </div>
          
                <div className={style.container__list__selectOfDays}>
                  {daysOfWeek.map((day, index) => (
                    <div
                      key={index}
                      className={`${style.container__list__selectOfDays__block} ${
                        selectedDays?.includes(day.value) || dateOfSelectedDay === day.value ? style.selected : ''
                      }`}
                      onClick={() => handleClick(day.value)}
                    >
                      <p>{day.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              :null}
      
            <div className={style.container__list}>
            <div className={style.container__list__padding}>
            <MdRestartAlt></MdRestartAlt>
            </div>
            <div className={style.container__list__container} onClick={handleToggle}>
              <label className={style.recurrenceLabel}>Recurrence</label>
            </div>
            </div>
            {
            isRecurrence?
            <div className={style.container__list__popupContainer} style={{alignItems: 'center'}}>
            <div className={style.container__list__padding}></div>
            <InputNumber  initialValue={recurrenceValue} updateValue={updateRecurrenceValue}></InputNumber>
    
               <Button background_color={selectMetnod === 'week' ?'b-darkGary' :'b-blue'} color={'white'} handleClick={()=> handleSelectMetnodClick('week')} width={'80px'} borderRadius={'15px'} disabled={selectMetnod === 'week' ? true :false} >week</Button>
               <Button background_color={selectMetnod === 'week' ?'b-blue' :'b-darkGary'} color={'white'} handleClick={()=> handleSelectMetnodClick('month')} width={'80px'} borderRadius={'15px'} disabled={selectMetnod === 'week' ? false :true} >month</Button>

            </div>
            // <div className={style.recurrence}>
            // <div className={style.recurrenceValue}>
            // <input type="number" id="quantity" name="quantity" value={recurrenceValue} onChange={handleNumberChange}/>
            // </div>
        // </div>
   
            :
                <></>  
        }
        <div className={style.container__list}>
        <div className={style.container__list__padding}>
            <ImParagraphLeft></ImParagraphLeft>
            </div>
            {/* <input className={style.container__list__description} value={descriptionValue} onChange={handleValueOfDescription} type="text"></input> */}
            <NewTodos descriptionValue={descriptionValue} valueOfParagraph={updateDiscriptionValue}></NewTodos>
        </div>
        {
          isdetailLabelAlarmOption
          ?
          <>
            <div className={style.container__list__popupContainer}  style={{flexDirection: 'column'}}>
              <div className={style.container__list}>
                <div className={style.container__list__padding}>
                  <SlCalender></SlCalender>
                 </div>
            <div className={style.containerNavbar__todayContainer}  onClick={()=>{openModal({type:'Popup',value:{isPotal:true,typeOfPopup:'PopupCategory',value:{categoryValue:categoryValue}}})}}>
             <DownOutLineLetter padding={'10px 8px'}>

                <div  className={style.containerNavbar__todayContainer__label} style={{'backgroundColor':`${currentCategoryValue.categoryColor}`}}></div>
        
            </DownOutLineLetter>
        </div>
        <div className={style.container__list__Date__PopupCalendar} id='PopupCategory'>

              </div>
        {/* <CategoryPopUp updateCategory={updateCategory} isCategoryOpen={ModalCtx.find(modal => modal.value?.typeOfValue === 'openCategoryPopup')}></CategoryPopUp>
        onClick={()=>{openModal({type:'Popup',value:{isPotal:true,typeOfPopup:'PopupCalendar',initialDate:start,type:'oneDay'}} */}
        </div>


        <div className={style.container__list}  style={{padding: '10px 0'}}>
            <div className={style.container__list__padding} style={{flexDirection:'column'}}>
                <MdOutlineAccessAlarms></MdOutlineAccessAlarms>
            </div>

            
    
                <div className={style.container__list__alarmContainer}>
                  {alarmCompoent.map((alarm:any, index:number) => (
                  <div className={`${style.container__list__alarmContainer__container}`} onMouseEnter={() => showDeleteOptionOfAlarm(index)} onMouseLeave={() => hideDeleteOptionOfAlarm(index)} key={index}>
                    {
                   alarm.customAlarmState?
                   <div className={style.container__list__popupContainer}>
  
                   <div className={style.container__list__Date}>
           
              
                      <CustomAlarmCompoent numberOfArray={index} sendValueOfCustomAlarm= {handlePopUpClick}></CustomAlarmCompoent>
                       {/* <PopupCalendar isCalenderOpen={todoCtx.openAndType.popupValue === 'OpenCustomAlarmCalender'} selectedDay={handleAlarmSelectedDay} setStartDay={selectedStartDay}></PopupCalendar> */}
                       {/* <InputNumber  initialValue={alarm.customAlarmOption.alarmNumberInput} updateValue={(value:number) =>handlePopUpClick(value,index,'numberInput')}></InputNumber> */}
      
                       </div>
                       {/* <DropDownBoxContainer typeOfBox={'gray'} typeOfPopup={'handleCustomAlarm'} selectOption={[{id:'minute',label:'Mintue',timeValue:1},{id:'hour',label:'Hour',timeValue:60},{id:'day',label:'Day',timeValue:1440},{id:'week',label:'Week',timeValue:10080}]} onClickSelectOption={(value) => handlePopUpClick(value,index,'option')}>
                        {alarm.customAlarmOption.option.label}
                       </DropDownBoxContainer> */}

                       {/* <CustomSelector selectorValue={[{id:'minute',label:'Mintue',value:1},{id:'hour',label:'Hour',value:60},{id:'day',label:'Day',value:1440},{id:'week',label:'Week',value:10080}]} handleItemClick={(value:SelectorValue) => handlePopUpClick(value,index,'option')} initialValue={alarmCompoent[index-1].customAlarmOption.option}></CustomSelector> */}
                   </div>
                    :
                    <div className={style.container__list__alarmContainer__container}>
                      <AlarmCompoent  numberOfArray={index} alarmValue={alarm.alarmOption} handleAlarmValue={handleAlarmValue}></AlarmCompoent>
                    </div>
 
                    }
                    <label className={style.customAlarm}>Custom Alarm</label>
                    <label className={style.switch}>
                    <input type="checkbox" checked={alarm.customAlarmState} onClick={() => openCustomAlarm(index)}/>
                    <span className={`${style.switch__slider} ${style.switch__round}`}></span>
                    </label>

                    {alarmCompoent[index].alarmDeleteShowed === true
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

            {/* <div className={style.containerNavbar__todayContainer}>
            <DownOutLineLetter padding={'10px 8px'}>
            <p>{AlarmValue}</p>
            </DownOutLineLetter>
            </div> */}




         
            </div>      
          </>
          :
          <div className={style.container__list}>
              <div className={style.container__list__padding}>
              <LuCalendarClock></LuCalendarClock>
              </div>
              <div className={style.container__list__container} onClick={handleIsdetailLabelAlarmOption}>
                <div className={style.container__list__container__labelOfStatus} style={{background:currentCategoryValue.categoryColor}}></div>
                <p className={style.container__list__container__p} >알리지 않음</p>
              </div>
          </div>
        }

            <div className={style.container__list__popupContainer}  style={{flexDirection: 'column'}}>


        <div className={style.container__list}  style={{padding: '10px 0'}} >
            <div className={style.container__list__padding} style={{flexDirection:'column'}}>
                <MdOutlinePeopleAlt></MdOutlinePeopleAlt>
            </div>
            <div className={style.container__list__invite__container} style={{flexDirection:'column'}}>
            <InviteUserEmail   sendInviteUserEmail={sendInviteUserEmail} defaultInviteValue={attenderEmailDTOSValue.attenderInfoAuth}></InviteUserEmail>
            {/* sendInviteUserEmail={sendInviteUserEmail} initialValueOfInvateUserEmail={extractValues(inviteUserEmail)} valueOfInvateUserEmail={inviteUserEmail} */}
            {
            isDetailInviteOption 
          ?
<>
            <div className={style.container__inviteOption}  style={{flexDirection: 'column'}}>

            
            <div className={style.container__list}>
            <div>
            <label className={style.customAlarm}>isSendEmailToAttender</label>
              <label className={style.switch}>
              <input type="checkbox" checked={attenderEmailDTOSValue.isSendEmailToAttender} onClick={() => sendEmailToAttender()}/>
              <span className={`${style.switch__slider} ${style.switch__round}`}></span>
              </label>
            </div>
            {/* <CategoryPopUp updateCategory={updateCategory} isCategoryOpen={ModalCtx.find(modal => modal.value?.typeOfValue === 'openCategoryPopup')}></CategoryPopUp>
            onClick={()=>{openModal({type:'Popup',value:{isPotal:true,typeOfPopup:'PopupCalendar',initialDate:start,type:'oneDay'}} */}
            </div>


            <div className={style.container__list}>
                <label className={style.customAlarm}>isInvitableAnyoneLink</label>
              <label className={style.switch}>
              <input type="checkbox" checked={attenderEmailDTOSValue.isInvitableAnyoneLink} onClick={() => invitableAnyoneLink()}/>
              <span className={`${style.switch__slider} ${style.switch__round}`}></span>
              </label>

            

            </div> 

            {/* <div className={style.containerNavbar__todayContainer}>
            <DownOutLineLetter padding={'10px 8px'}>
            <p>{AlarmValue}</p>
            </DownOutLineLetter>
            </div> */}




         
            </div>      
          </>
          :
          null
            }




            </div>
             

              </div> 

     
            </div>   

        <div className={style.container__bottomContainer}>
        {value.view === 'makeEvent'
          ?
          <Button width={'100px'} borderRadius={'5px'} color={'white'} handleClick={handleDetailMakeEvent}>Detail</Button>
          :
          null
        }
        {
                !isInvalidDate && titleValidatorStatus.touched === true && titleValidatorStatus.error === false
                ?
                <Button width={'100px'} borderRadius={'5px'} color={'white'} type={'submit'}>Submit</Button>
                :
                <Button disabled={true}  background_color={'b-gray'} width={'100px'} borderRadius={'5px'} color={'white'} type={'submit'}>Submit</Button>
        }
        </div>
  </form>
  )
};



export default MakeEvent;


