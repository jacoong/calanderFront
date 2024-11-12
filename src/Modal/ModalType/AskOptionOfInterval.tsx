
import React, { useEffect, useState,useMemo } from 'react';
import style from './ModalTypeCss/AskOptionOfInterval.module.css'
import {editEventReq,editInviteReq} from './MakeEvent';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox'
import Button from '../../compoent/compoentItem/Button';
import { DateRange,RangeKeyDict,Range } from 'react-date-range';
import {dataPutEvents} from '../../store/LoadedEventExample';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import axios, { AxiosResponse, AxiosError } from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

const SERVERURL = process.env.REACT_APP_SERVER_URL as string; //need to delete

type TypeOfOptionValue = 'DATE' | 'ENTIRE_DATE' | 'SINCE_DATE' | 'PERIOD_DATE';

interface DefinedRange {
  startDate: Date;
  endDate: Date;
  key: string;
}


const AskOptionOfInterval = ({eventValue}:any) => {
  console.log(eventValue,'eventValue')
    const {EventValue,attenderEmailDTOS,eventId,eventTimeId,categoryInfo} = eventValue;

    // const mock = new AxiosMockAdapter(axios, { delayResponse: 1000 }); // 2초 지연 설정
    // mock.onPost(`${SERVERURL}/api/getIntervalEvents`).reply(200, {
    //   message: 'Mocked success response',
    //   body:{
    //     intervalEvents:[
    //       {
    //         isSingleDate:false,
    //         eventId: 3, // 이게 그룹
    //         eventTimeId: 1, // 유니크 한값.
    //         title: "fse",
    //         selectedDays: ["SUNDAY","FRIDAY", "SATURDAY"],
    //         description: "fsef",
    //         interval: 3,
    //         startTime: "202408080130",
    //         endTime: "202408091800",
    //         categoryId: 4,
    //         alarm: [
    //             {
    //                 alarmId: 5,
    //                 alarmOption: {
    //                     label: "일주일 전",
    //                     value: 10080
    //                 },
    //                 customAlarmOption: {
    //                     alarmNumberInput: 1,
    //                     option: {
    //                         id: "week",
    //                         label: "Week",
    //                         value: 10080
    //                     }
    //                 },
    //                 customAlarmState: false,  //간단히 설명해서 true일경우에는 프론트는 customAlarmOption을 사용할것 아닐시 alarmOption을 사용할것
    //                 alarmDeleteShowed: false
    //             },
    //             {
    //                 alarmId: 6,
    //                 alarmOption: {
    //                     label: "일주일 전",
    //                     value: 10080
    //                 },
    //                 customAlarmOption: {
    //                     alarmNumberInput: 1,
    //                     option: {
    //                         id: "week",
    //                         label: "Week",
    //                         value: 10080
    //                     }
    //                 },
    //                 customAlarmState: true,
    //                 alarmDeleteShowed: false
    //             }
    //         ],
    //     attenderEmailDTOS: {
    //     attenderInfoAuth:[ 
    //     {attenderEmail:"327561@naver.com",
    //     role:"GENERATOR", 
    //     },
    //     {attenderEmail:"attebder@naver.com",
    //     role:"ATTENDER", 
    //     }, 
    //     {
    //     attenderEmail:"manager@naver.com",
    //     role:"MANAGER", 
    //     } ],
    //     isSendEmailToAttender: true, // true시 attender들에게 이메일 초대 메일전달
    //     isInvitableAnyoneLink: false // true시 링크만 있으면 초대받지 않은 사람도(캘린더 서비스의 유저일경우) 참석가능함
    //     }
    //     },
    //     {
    //       isSingleDate:false,
    //       eventId: 3, // 이게 그룹
    //       eventTimeId: 2, // 유니크 한값.
    //       title: "fse",
    //       selectedDays: ["SUNDAY","FRIDAY", "SATURDAY"],
    //       description: "fsef",
    //       interval: 3,
    //       startTime: "202408110130",
    //       endTime: "202408121800",
    //       categoryId: 4,
    //       alarm: [
    //           {
    //               alarmId: 5,
    //               alarmOption: {
    //                   label: "일주일 전",
    //                   value: 10080
    //               },
    //               customAlarmOption: {
    //                   alarmNumberInput: 1,
    //                   option: {
    //                       id: "week",
    //                       label: "Week",
    //                       value: 10080
    //                   }
    //               },
    //               customAlarmState: false,  //간단히 설명해서 true일경우에는 프론트는 customAlarmOption을 사용할것 아닐시 alarmOption을 사용할것
    //               alarmDeleteShowed: false
    //           },
    //           {
    //               alarmId: 6,
    //               alarmOption: {
    //                   label: "일주일 전",
    //                   value: 10080
    //               },
    //               customAlarmOption: {
    //                   alarmNumberInput: 1,
    //                   option: {
    //                       id: "week",
    //                       label: "Week",
    //                       value: 10080
    //                   }
    //               },
    //               customAlarmState: true,
    //               alarmDeleteShowed: false
    //           }
    //       ],
    //   attenderEmailDTOS: {
    //   attenderInfoAuth:[ 
    //   {attenderEmail:"327561@naver.com",
    //   role:"GENERATOR", 
    //   },
    //   {attenderEmail:"attebder@naver.com",
    //   role:"ATTENDER", 
    //   }, 
    //   {
    //   attenderEmail:"manager@naver.com",
    //   role:"MANAGER", 
    //   } ],
    //   isSendEmailToAttender: true, // true시 attender들에게 이메일 초대 메일전달
    //   isInvitableAnyoneLink: false // true시 링크만 있으면 초대받지 않은 사람도(캘린더 서비스의 유저일경우) 참석가능함
    //   }
    //   },
    //     {
    //       isSingleDate:false,
    //       eventId: 3, // 이게 그룹
    //       eventTimeId: 3, // 유니크 한값.
    //       title: "fse",
    //       selectedDays: ["SUNDAY","FRIDAY", "SATURDAY"],
    //       description: "fsef",
    //       interval: 3,
    //       startTime: "202408190130",
    //       endTime: "202408211800",
    //       categoryId: 4,
    //       alarm: [
    //           {
    //               alarmId: 5,
    //               alarmOption: {
    //                   label: "일주일 전",
    //                   value: 10080
    //               },
    //               customAlarmOption: {
    //                   alarmNumberInput: 1,
    //                   option: {
    //                       id: "week",
    //                       label: "Week",
    //                       value: 10080
    //                   }
    //               },
    //               customAlarmState: false,  //간단히 설명해서 true일경우에는 프론트는 customAlarmOption을 사용할것 아닐시 alarmOption을 사용할것
    //               alarmDeleteShowed: false
    //           },
    //           {
    //               alarmId: 6,
    //               alarmOption: {
    //                   label: "일주일 전",
    //                   value: 10080
    //               },
    //               customAlarmOption: {
    //                   alarmNumberInput: 1,
    //                   option: {
    //                       id: "week",
    //                       label: "Week",
    //                       value: 10080
    //                   }
    //               },
    //               customAlarmState: true,
    //               alarmDeleteShowed: false
    //           }
    //       ],
    //   attenderEmailDTOS: {
    //   attenderInfoAuth:[ 
    //   {attenderEmail:"327561@naver.com",
    //   role:"GENERATOR", 
    //   },
    //   {attenderEmail:"attebder@naver.com",
    //   role:"ATTENDER", 
    //   }, 
    //   {
    //   attenderEmail:"manager@naver.com",
    //   role:"MANAGER", 
    //   } ],
    //   isSendEmailToAttender: true, // true시 attender들에게 이메일 초대 메일전달
    //   isInvitableAnyoneLink: false // true시 링크만 있으면 초대받지 않은 사람도(캘린더 서비스의 유저일경우) 참석가능함
    //   }
    //   },
    //   {
    //     isSingleDate:false,
    //     eventId: 3, // 이게 그룹
    //     eventTimeId: 4, // 유니크 한값.
    //     title: "fse",
    //     selectedDays: ["SUNDAY","FRIDAY", "SATURDAY"],
    //     description: "fsef",
    //     interval: 3,
    //     startTime: "202408230130",
    //     endTime: "202408251800",
    //     categoryId: 4,
    //     alarm: [
    //         {
    //             alarmId: 5,
    //             alarmOption: {
    //                 label: "일주일 전",
    //                 value: 10080
    //             },
    //             customAlarmOption: {
    //                 alarmNumberInput: 1,
    //                 option: {
    //                     id: "week",
    //                     label: "Week",
    //                     value: 10080
    //                 }
    //             },
    //             customAlarmState: false,  //간단히 설명해서 true일경우에는 프론트는 customAlarmOption을 사용할것 아닐시 alarmOption을 사용할것
    //             alarmDeleteShowed: false
    //         },
    //         {
    //             alarmId: 6,
    //             alarmOption: {
    //                 label: "일주일 전",
    //                 value: 10080
    //             },
    //             customAlarmOption: {
    //                 alarmNumberInput: 1,
    //                 option: {
    //                     id: "week",
    //                     label: "Week",
    //                     value: 10080
    //                 }
    //             },
    //             customAlarmState: true,
    //             alarmDeleteShowed: false
    //         }
    //     ],
    // attenderEmailDTOS: {
    // attenderInfoAuth:[ 
    // {attenderEmail:"327561@naver.com",
    // role:"GENERATOR", 
    // },
    // {attenderEmail:"attebder@naver.com",
    // role:"ATTENDER", 
    // }, 
    // {
    // attenderEmail:"manager@naver.com",
    // role:"MANAGER", 
    // } ],
    // isSendEmailToAttender: true, // true시 attender들에게 이메일 초대 메일전달
    // isInvitableAnyoneLink: false // true시 링크만 있으면 초대받지 않은 사람도(캘린더 서비스의 유저일경우) 참석가능함
    // }
    // }
    //     ]
    //   }
    // }); 

   
    
    const [checkedState,setCheckedState] =
     useState<TypeOfOptionValue>('DATE');
     const [state, setState] = useState<DefinedRange[]>([
      {
        startDate: EventValue.startTime,
        endDate: EventValue.endTime,
        key: 'selection'
      }
    ])
    const [intervalEvents, setIntervalEvents] = useState<[{start:Date,end:Date}]|undefined>(
    
    )
    // console.log('editEvent executed',eventValue);
    // const response = await editEventReq(eventValue.EventValue);
    // if (response.status === 200) {
    //   alert('success');
    //   const editInviteData = {
    //       attenderEmailDTOS:eventValue.attenderEmailDTOSValue,
    //       eventId:eventValue.eventId,
    //   }
    //   const response = await editInvite(editInviteData);
    //       if (response.status === 200) {
    //           // todoCtx.callCalendarDataApi();
    //       }
    //       else if (response.status === 401) {
    //         alert('error during prosessing of invitation')
    //       }
    //       return;
    // } else if (response.status === 401) {
    //   alert('wrong');
    //   todoCtx.callCalendarDataApi();
    //   return;
    // }

    const handleChange = (value:TypeOfOptionValue)=>{
      setCheckedState(value)
    }

    const handleSubmit = () =>{
      alert('handleSubmit executec!')
    }

    function extractDatesValue(value:any){
      console.log(value,'ss')
      const dateValue = value
      .filter((date: any) => eventTimeId !== date.eventTimeId)
      .map((date:any)=>{
        console.log(eventTimeId,date.eventTimeId)
        const starts=new Date(date.start);
        const ends=new Date(date.end);
        starts.setHours(0, 0, 0, 0); // start 시간을 00:00:00으로 초기화
        ends.setHours(0, 0, 0, 0); // start 시간을 00:00:00으로 초기화
        return {start:starts,end:ends}  
    })
      console.log(dateValue,'dateValue')
      return dateValue
    }


    const GetIntervalEvents = async()=>{
      console.log('executed!!')
      try{
        const res = await axios.get(`${SERVERURL}/api/event/load/interval?eventId=${eventId}`);
        if(res.status === 200){
        
          const data = res.data.body.intervalEvents
          const app = dataPutEvents(data,categoryInfo)
          const datesValue = extractDatesValue(app);
          console.log(datesValue,'datesValue')
          setIntervalEvents(datesValue)
        }
      }catch (err){
        console.log('error,',err)
      }
    }

    const isDateInAnyRange = (date: Date): any => {
      if (!intervalEvents) return 'nope'; // intervalEvents가 로드되지 않았을 경우 false 반환
      
      let result: 'start' | 'end' | 'middle' | 'nope' = 'nope';

      for (const intervalEvent of intervalEvents) {
        
        if (intervalEvent.start.getTime() === date.getTime()) {
          result = 'start';
          break
        } else if (intervalEvent.end.getTime() === date.getTime()) {
          result = 'end';
          break;
        } else if (intervalEvent.start < date && date < intervalEvent.end) {
          result = 'middle';
          break;
        } else {
        }
      }
      
      return result;

    };  


    const handleDayContent = (date: Date) => {
      const isMarked = isDateInAnyRange(date);
      return (
        <div
        className={style.calendarBody}
        >
            <div 
            className={style.calendarBody__dateContainer}>
            <div    className={`${style.calendarBody__dateContainer__left} ${isMarked === 'start'?style.start:null} ${isMarked !== 'nope'?style.marked:null}`}
            >
            </div>
            <div    className={`${style.calendarBody__dateContainer__right} ${isMarked === 'end'?style.end:null} ${isMarked !== 'nope'?style.marked:null}`}>
              
              </div>
            </div>
            <p  
            className={style.calendarBody__paragraph}
            >{date.getDate()}
            </p>
          {isMarked && (
            <span
            ></span>
          )}
        </div>
      );
    };



      useEffect(()=>{
        return
      },[intervalEvents])

    useEffect(()=>{
      console.log(state);
    },[state])


    useEffect(()=>{
      GetIntervalEvents();
    },[])
    
   

    useEffect(()=>{
      console.log(intervalEvents,'intervalEVENTS')
    },[intervalEvents])


  return (
    <form className={style.formBody} onSubmit={handleSubmit}>
        <p className={style.formBody__title}>이 일정만 변경합니까?</p>
        <FormGroup className={style.formBody__formGroup}>
          <FormControlLabel control={<Checkbox checked={checkedState === 'DATE' ? true : false } onChange={() =>{handleChange('DATE')}}/>} label="이 일정만" />
          <FormControlLabel  control={<Checkbox checked={checkedState === 'ENTIRE_DATE' ? true : false } onChange={() =>{handleChange('ENTIRE_DATE')}}/>} label="전체 일정" />
          <FormControlLabel control={<Checkbox checked={checkedState === 'SINCE_DATE' ? true : false } onChange={() =>{handleChange('SINCE_DATE')}}/>} label="이 일정 이후" />
          <FormControlLabel control={<Checkbox checked={checkedState === 'PERIOD_DATE' ? true : false } onChange={() =>{handleChange('PERIOD_DATE')}}/>} label="기간 지정" />
          {checkedState === 'PERIOD_DATE'
          ?
          <>
          <DateRange
          minDate={intervalEvents?intervalEvents[0]?.start:undefined}
          maxDate={intervalEvents?intervalEvents[intervalEvents.length - 1]?.end:undefined}
          editableDateInputs={true}
          onChange={(item: RangeKeyDict) => setState([item.selection as DefinedRange])}
          moveRangeOnFirstSelection={false}
          ranges={state}
          dayContentRenderer={handleDayContent}
          ></DateRange>
          <div className={style.formBody__formGroup__belowContainer}>
            <div className={style.formBody__formGroup__belowContainer__intervalColor}></div>
              <div className={style.formBody__formGroup__belowContainer__intervalExplaintion}>
                <p>반복되는 일정들</p>
              </div>
          </div>
          </>
          :
          null
          }
        </FormGroup>
        <div className={style.buttom__container}> 
          <Button width={'100px'} borderRadius={'5px'} color={'white'} type={'submit'}>Submit</Button>
        </div>
    </form>
  );
};





export default AskOptionOfInterval;