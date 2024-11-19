import {Category} from '../store/types';
import { useNavigate } from 'react-router-dom';
import {CalendarContextType,FetchedData} from './types'
type ViewType = CalendarContextType['viewType'];

export const fetchedData:FetchedData =      
 {
    isSingleDate:false,
    eventId: 3, // 이게 그룹
    eventTimeId: 2, // 유니크 한값.
    title: "fse",
    selectedDays: ["SUNDAY","FRIDAY", "SATURDAY"],
    description: "fsef",
    interval: 3,
    startTime: "202408110130",
    endTime: "202408121800",
    categoryId: 4,
    alarm: [
        {
            alarmId: 5,
            alarmOption: {
                label: "일주일 전",
                value: 10080
            },
            customAlarmOption: {
                alarmNumberInput: 1,
                option: {
                    id: "week",
                    label: "Week",
                    value: 10080
                }
            },
            customAlarmState: false,  //간단히 설명해서 true일경우에는 프론트는 customAlarmOption을 사용할것 아닐시 alarmOption을 사용할것
            alarmDeleteShowed: false
        },
        {
            alarmId: 6,
            alarmOption: {
                label: "일주일 전",
                value: 10080
            },
            customAlarmOption: {
                alarmNumberInput: 1,
                option: {
                    id: "week",
                    label: "Week",
                    value: 10080
                }
            },
            customAlarmState: true,
            alarmDeleteShowed: false
        }
    ],
attenderEmailDTOS: {
attenderInfoAuth:[ 
{attenderEmail:"327561@naver.com",
role:"GENERATOR", 
state:'STANDBY'
},
{attenderEmail:"attebder@naver.com",
role:"ATTENDER", 
state:'HOLD'
}, 
{
attenderEmail:"manager@naver.com",
role:"MANAGER", 
state:'HOLD'
} ],
isSendEmailToAttender: true, // true시 attender들에게 이메일 초대 메일전달
isInvitableAnyoneLink: false // true시 링크만 있으면 초대받지 않은 사람도(캘린더 서비스의 유저일경우) 참석가능함
}
}

export   const dataPutEvents = (events:any,categories:any) =>{
    const arrayOfEvent = events.map((item:any) => {
      return {
        eventId:item.eventId,
        eventTimeId:item.eventTimeId,
        title: item.title,
        start: parseCustomDateString(item.startTime),
        end: parseCustomDateString(item.endTime),
        description: item.description,
        selectedDays:item.selectedDays,
        interval:item.interval,
        category: getCategoryValue(item.categoryId,categories),
        alarm: item.alarm,
        attenderEmailDTOS:item.attenderEmailDTOS
      };
    })

    console.log(arrayOfEvent);
    return arrayOfEvent;
  }

  export   function parseCustomDateString(dateString:any):Date{
    const year = parseInt(dateString.slice(0, 4), 10);
    const month = parseInt(dateString.slice(4, 6), 10) - 1; // JavaScript Date month is 0-based
    const day = parseInt(dateString.slice(6, 8), 10);
    const hour = parseInt(dateString.slice(8, 10), 10);
    const minute = parseInt(dateString.slice(10, 12), 10);
  
    return new Date(year, month, day, hour, minute);
  }

  const getCategoryValue = (categoryId: number,categories:any) => {
    console.log(categoryId, categories);
    const categoryItem = categories.find((item: Category) => item.categoryId === categoryId);
    if (categoryItem) {
      return {
        categoryId: categoryItem.categoryId,
        categoryColor: categoryItem.categoryColor,
        categoryName: categoryItem.categoryName
      };
    }
    return; // Or handle the case where the category is not found
  }


 export function formatDateToYYYYMMDDHH(date:Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더함
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}${month}${day}${hours}${minutes}`;
  }

  // const isSameDay = (date1: Date, date2: Date) => {
  //   return (
  //     date1.getFullYear() === date2.getFullYear() &&
  //     date1.getMonth() === date2.getMonth() &&
  //     date1.getDate() === date2.getDate()
  //   );
  // };

  // const onSelectDay = (date: Date, type:ViewType) => {
  //   console.log(date,type)
  //   // setSelectedDate(date)
  //   if(isSameDay(date, new Date())){
  //         const viewTypeValue = `/${type}`;
  //         navigate(`/main${viewTypeValue}`)
  //       return
  //   }

  //     const year = date.getFullYear();
  //     const month = date.getMonth() + 1; // getMonth() returns 0-11, so add 1
  //     const day = date.getDate();
  //     const dateSegment = `/main/${type}/${year}/${month}/${day}`;
  //     // const newUrl = window.location.pathname.replace(/\/(day|week|month)\/\d{4}\/\d{1,2}\/\d{1,2}/, '') + dateSegment;
  //   //  window.history.pushState({ path: newUrl }, '', newUrl);
  //   navigate(dateSegment)
  //    return

  //   // else{
  //   //   setViewType(type);
  //   //   const year = date.getFullYear();
  //   //   const month = date.getMonth() + 1; // getMonth() returns 0-11, so add 1
  //   //   const day = date.getDate();
  //   //   const dateSegment = `/main/${type}/${year}/${month}/${day}`;
  //   //   const newUrl = window.location.pathname.replace(/\/(day|week|month)\/\d{4}\/\d{1,2}\/\d{1,2}/, '') + dateSegment;
  //   //   navigate(dateSegment)
  //   // }
  // };
