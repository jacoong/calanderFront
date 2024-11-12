import LoadingPage from '../pages/LoadingPage'
import { useParams,useNavigate } from 'react-router-dom';
import {useContext,useEffect,useState,useCallback,useMemo} from 'react';
import {TodosContext,UserType} from '../../store/todo_context'
import { useViewType } from '../../hook/useViewType';
import BigCalendar from '../compoentItem/BigCalendar';
import TapMenu from '../compoentItem/TapMenu'
import moment from 'moment'
import { Calendar, momentLocalizer,EventProps,Views } from 'react-big-calendar'
import {EventItem,customViews} from '../../store/types'
import Navbar from '../compoentItem/Navbar'
import {Categories,Category,ExceptCategoryIds} from '../../store/types';
import {CalendarContextType,typeOfCalenderparams} from '../../store/types';
import { instance} from '../../store/axios_context';
const SERVERURL = process.env.REACT_APP_SERVER_URL as string;

type ViewType = CalendarContextType['viewType'];


export const fetchCategoryInfo = async ()=>{
  // return [{categoryId:1,categoryColor:"#444444",categoryName: "기본2"},{categoryId:2,categoryColor:"#0000FF",categoryName: "중요"},{categoryId:3,categoryColor:"#008000",categoryName: "운동"},{categoryId:4,categoryColor:"#800080",categoryName: "식사"},{categoryId:5,categoryColor:"#FF0000",categoryName: "공부"},{categoryId:6,categoryColor:"#FFA500",categoryName: "코딩공부"}];
 // serverConnect
  try {
    const res = await instance.get(`${SERVERURL}/api/category/load`);
      if (res.status === 200) {
        const aaa = res.data.body
        return aaa
      }else if(res.status === 401){
        alert('error');
        return
      }
      return
  } catch (err) {
      return
  }
}



function MainPage() {
  const { viewType, year, month, day } = useParams<{ viewType: string; year: string; month: string; day: string }>();
  const convertedViewType = viewType as ViewType;
    const todoCtx = useContext(TodosContext);
    const [dateValue, setDateValue] = useState(new Date());
    const [isFold, setIsFold] = useState<boolean>(false);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [category, setCategory] = useState<Categories>(null);
    const [exceptCategoryId, setExceptCategoryId] = useState<ExceptCategoryIds>([]);
    const [fetchedEventData, setFetchedEventData] = useState<any>([]);
    
    const navigate = useNavigate();

    const [viewTypes, setViewTypes] = useViewType();

    useEffect(() => {
      if (year && month && day) {
        const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));
        setDateValue(parsedDate);
        getFetchEventData();
      }
    }, [year, month, day]);


    moment.locale('ko-KR');
    const localizer = momentLocalizer(moment);
    type Keys = keyof typeof customViews;

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const isSameDay = (date1: Date, date2: Date) => {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    };
    
    
     const onSelectDay = (date: Date, type:ViewType) => {
      // setSelectedDate(date)
      if(isSameDay(date, new Date())){
            const viewTypeValue = `/${type}`;
            navigate(`/main${viewTypeValue}`)
          return
      }
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // getMonth() returns 0-11, so add 1
        const day = date.getDate();
        const dateSegment = `/main/${type}/${year}/${month}/${day}`;
        // const newUrl = window.location.pathname.replace(/\/(day|week|month)\/\d{4}\/\d{1,2}\/\d{1,2}/, '') + dateSegment;
      //  window.history.pushState({ path: newUrl }, '', newUrl);
      navigate(dateSegment)
       return
    
      // else{
      //   setViewType(type);
      //   const year = date.getFullYear();
      //   const month = date.getMonth() + 1; // getMonth() returns 0-11, so add 1
      //   const day = date.getDate();
      //   const dateSegment = `/main/${type}/${year}/${month}/${day}`;
      //   const newUrl = window.location.pathname.replace(/\/(day|week|month)\/\d{4}\/\d{1,2}\/\d{1,2}/, '') + dateSegment;
      //   navigate(dateSegment)
      // }
    };
    
  
    useEffect(() => {
      console.log('track year month day data')
      if(viewType  === 'day' || viewType === 'week' || viewType === 'month'){
          console.log('viewType:', viewType,year, month, day); // Debugging logs
       
        console.log(viewType)
        setViewTypes(viewType)
        // if(year === undefined || month === undefined || day === undefined ){

        //   navigate(`/main/${viewType}/${year}/${month}/${day}`)
        // }

        return
      }else{
          function dateToRightFormatAdress() {
            // Date 객체 생성
            const date = new Date();
            // 년, 월, 일을 추출하여 원하는 형식으로 변환
            const year = date.getFullYear();
            const month = ('0' + (date.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 +1
            const day = ('0' + date.getDate()).slice(-2);
          
            return `${year}/${month}/${day}`;
          }

          const defaultUrl = dateToRightFormatAdress();
          
          navigate(`/main/month/${defaultUrl}`)
      }
    }, [viewType,year,month,day]);



    const handleViewChange = (newView:any) => { // add newView value to the url paramether
      console.log(newView,dateValue)
      onSelectDay(dateValue,newView)
      //todoCtx and changed
    };



    


    const dateText = useMemo(() => {
      if (viewTypes === Views.DAY) return moment(dateValue).format("dddd, MMMM DD");
      if (viewTypes === Views.WEEK) {
        const from = moment(dateValue)?.startOf("week");
        const to = moment(dateValue)?.endOf("week");
        return `${from.format("MMMM DD")} to ${to.format("MMMM DD")}`;
      }
      if (viewTypes === Views.MONTH) {
        return moment(dateValue).format("MMMM YYYY");
      }
    }, [viewTypes, dateValue]);
    
    const onPrevClick = useCallback(() => {
      if (viewTypes === Views.DAY) {
        const preValue = moment(dateValue).subtract(1, "d").toDate()
        setDateValue(preValue);
        onSelectDay(preValue,'day')
      } else if (viewTypes === Views.WEEK) {
        const preValue = moment(dateValue).subtract(1, "w").toDate()
        setDateValue(moment(dateValue).subtract(1, "w").toDate());
        onSelectDay(preValue,'week')
      } else {
        const preValue = moment(dateValue).subtract(1, "M").startOf("month").toDate()
        setDateValue(preValue);
        onSelectDay(preValue,'month')
      }
    }, [viewTypes, dateValue]);
  
    const onNextClick = useCallback(() => {
      if (viewTypes === Views.DAY) {
        const nextValue = moment(dateValue).add(1, "d").toDate()
        setDateValue(nextValue);
        onSelectDay(nextValue,'day')
      } else if (viewTypes === Views.WEEK) {
        const nextValue = moment(dateValue).add(1, "w").toDate()
        setDateValue(moment(dateValue).add(1, "w").toDate());
        onSelectDay(nextValue,'week')
      } else {
        const nextValue = moment(dateValue).add(1, "M").startOf("month").toDate()
        setDateValue(nextValue);
        onSelectDay(nextValue,'month')
      }
    }, [viewTypes, dateValue]);
  
    const onTodayClick = useCallback(() => {
      const today = moment().toDate();
      setDateValue(today);
      onSelectDay(today,viewTypes)
    }, [viewTypes]);

    const handleIsFold = () =>{
      setIsFold(!isFold)
    }

    const filterCalendarByCategory = (isChecked:boolean,value:string) =>{
      console.log(isChecked,value,'sefse')
      setExceptCategoryId((prev: any) => {
        if (isChecked) {
          return prev.filter((exceptCategoryId: { categoryId: string }) => exceptCategoryId.categoryId !== value);
        } else {
          return [...prev, { categoryId: value }];
        }
      });
    }
    
    const filterFechedEventData = (data:any) =>{

    }


    const getFetchEventData = async()=>{
      console.log('getFetchEventData',year,month)
//       await delay(300);
//       setFetchedEventData([
//       {
//         eventId: 3,
//         eventTimeId: 6, // 해당 eventTimeId는 어제 설명한 반복일정에 필요한 것이므로 살려넣는게 맞는지? 맞다면 이후에 일정 수정, 삭제 할때 해당 eventTimeId 값도 request에 같이 보내는것이 맞는지? 맞다면 명세 수정 부탁
//         title: "fse",
//         selectedDays: ["FRIDAY", "SATURDAY"],
//         description: "fsef",
//         interval: 3,
//         startTime: "202409110130",
//         endTime: "202409121800",
//         categoryId: 3,
//         alarm: [
//             {
//                 alarmId: 5,
//                 alarmOption: {
//                     label: "일주일 전",
//                     timeValue: 10080
//                 },
//                 customAlarmOption: {
//                     alarmNumberInput: 1,
//                     option: {
//                         id: "week",
//                         label: "Week",
//                         timeValue: 10080
//                     }
//                 },
//                 customAlarmState: false,  //간단히 설명해서 true일경우에는 프론트는 customAlarmOption을 사용할것 아닐시 alarmOption을 사용할것
//                 alarmDeleteShowed: false
//             },
//             {
//                 alarmId: 5,
//                 alarmOption: {
//                     label: "일주일 전",
//                     timeValue: 10080
//                 },
//                 customAlarmOption: {
//                     alarmNumberInput: 1,
//                     option: {
//                         id: "week",
//                         label: "Week",
//                         timeValue: 10080
//                     }
//                 },
//                 customAlarmState: true,
//                 alarmDeleteShowed: false
//             }
//         ],
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
// role:"MANAEGER", 
// } ],
// isSendEmailToAttender: true, // true시 attender들에게 이메일 초대 메일전달
// isInvitableAnyoneLink: true // true시 링크만 있으면 초대받지 않은 사람도(캘린더 서비스의 유저일경우) 참석가능함
// }
// },

// {
//   eventId: 4,
//   eventTimeId: 6, // 해당 eventTimeId는 어제 설명한 반복일정에 필요한 것이므로 살려넣는게 맞는지? 맞다면 이후에 일정 수정, 삭제 할때 해당 eventTimeId 값도 request에 같이 보내는것이 맞는지? 맞다면 명세 수정 부탁
//   title: "fse",
//   selectedDays: ["SUNDAY","FRIDAY", "SATURDAY"],
//   description: "fsef",
//   interval: 3,
//   startTime: "202409130130",
//   endTime: "202409151800",
//   categoryId: 1,
//   alarm: [
//       {
//           alarmId: 5,
//           alarmOption: {
//               label: "일주일 전",
//               value: 10080
//           },
//           customAlarmOption: {
//               alarmNumberInput: 1,
//               option: {
//                   id: "week",
//                   label: "Week",
//                   value: 10080
//               }
//           },
//           customAlarmState: false,  //간단히 설명해서 true일경우에는 프론트는 customAlarmOption을 사용할것 아닐시 alarmOption을 사용할것
//           alarmDeleteShowed: false
//       },
//       {
//           alarmId: 6,
//           alarmOption: {
//               label: "일주일 전",
//               value: 10080
//           },
//           customAlarmOption: {
//               alarmNumberInput: 1,
//               option: {
//                   id: "week",
//                   label: "Week",
//                   value: 10080
//               }
//           },
//           customAlarmState: true,
//           alarmDeleteShowed: false
//       }
//   ],
// attenderEmailDTOS: {
// attenderInfoAuth:[ 
// {attenderEmail:"yuh0812@gmail.com",
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


//       ]
//     );
    // return // serverConnect

                try {
      const res = await instance.post(`${todoCtx.serverUrl}/api/event/load`,{standardMonth:year,month});
          if (res.status === 200) {
            const eventInfo = res.data.body;
            console.log(eventInfo);
            filterFechedEventData(eventInfo)
            setFetchedEventData(eventInfo)
            return
          }else if(res.status === 401){
            // executeUnAuthenticateUser();
            return
          }
          return
      } catch (err) {

          return
      }
    }

    
    // const onSelectDay = (date: Date, type:ViewType) => {

  
    //   const year = date.getFullYear();
    //   const month = date.getMonth() + 1; // getMonth() returns 0-11, so add 1
    //   const day = date.getDate();
    //   const dateSegment = `/${type}/${year}/${month}/${day}`;
  
    //   // Use a regular expression to remove any existing /day|week|month/:year/:month/:day segment
    //   const newUrl = window.location.pathname.replace(/\/(day|week|month)\/\d{4}\/\d{1,2}\/\d{1,2}/, '') + dateSegment;
  
    //   window.history.pushState({ path: newUrl }, '', newUrl);
    // };




    const getCategoryInfo = async ()=>{
      const result = await fetchCategoryInfo();
      setCategory(result);
    }



    useEffect(()=>{
      console.log('getCategoryInfo,getFetchEventData')
      const fetchData = async () => {
        await Promise.all([getCategoryInfo(), getFetchEventData()]);
        setIsLoaded(true);
      };
      fetchData();
    },[])







return(
    isLoaded?
    <div style={{width:'100%'}}>
    <Navbar viewPopupValue={viewTypes} handleIsFold={handleIsFold} dateText={dateText} handleViewChange={handleViewChange} onPrevClick={onPrevClick} onNextClick={onNextClick} onTodayClick={onTodayClick}></Navbar>
    <div style={{width:'100%',display:'flex'}}>
        <TapMenu viewType={viewType} onPrevClick={onPrevClick} onNextClick={onNextClick} dateText={dateText} dateValue={dateValue} filterCalendarByCategory={filterCalendarByCategory} category={category} isFold={isFold}></TapMenu>
        <BigCalendar fetchedEventData={fetchedEventData} exceptCategoryId={exceptCategoryId} category={category} dateValue={dateValue} viewss={viewTypes}></BigCalendar>
    </div>
    </div>
    :
    <LoadingPage></LoadingPage>
)
}

export default MainPage;