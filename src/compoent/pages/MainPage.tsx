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
  return [{categoryId:1,categoryColor:"#444444",categoryName: "기본2"},{categoryId:2,categoryColor:"#0000FF",categoryName: "중요"},{categoryId:3,categoryColor:"#008000",categoryName: "운동"},{categoryId:4,categoryColor:"#800080",categoryName: "식사"},{categoryId:5,categoryColor:"#FF0000",categoryName: "공부"},{categoryId:6,categoryColor:"#FFA500",categoryName: "코딩공부"}];
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
  const { viewType, year, month, day } = useParams<{ viewType: string|undefined; year: string|undefined; month: string|undefined; day: string|undefined }>();
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
    
    // useEffect(() => {
    //   if (year && month && day) {
    //     const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));
    //     setDateValue(parsedDate);
    //     getFetchEventData();
    //   }else if(!year &&){

    //   }
    // }, [year, month, day]);

    function dateToRightFormatAdress(year:string|undefined,month:string|undefined,day:string|undefined) {
      // Date 객체 생성
      const date = new Date();
      // 년, 월, 일을 추출하여 원하는 형식으로 변환
      const defaultyear = date.getFullYear();
      const defaultmonth = ('0' + (date.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 +1
      const defaultday = ('1');
      console.log(defaultyear,defaultmonth,defaultday)
      console.log(year,month,day)
      console.log({'yearValue':year??defaultyear,'monthValue':month??defaultmonth,'dayValue':day??defaultday})
      return {'yearValue':year??defaultyear,'monthValue':month??defaultmonth,'dayValue':day??defaultday};
    }

    useEffect(() => {


      console.log('track year month day data',viewType)
      if(viewType  === 'day' || viewType === 'week' || viewType === 'month'){
          console.log('viewType:', viewType,year, month, day); // Debugging logs
          setViewTypes(viewType)
          const {yearValue,monthValue,dayValue} = dateToRightFormatAdress(year,month,day)
          const parsedDate = new Date(Number(yearValue), Number(monthValue) - 1, Number(dayValue));
          setDateValue(parsedDate);
        return
      }else{
        navigate('/main/month')
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
    return // serverConnect
    const {yearValue,monthValue,dayValue} = dateToRightFormatAdress(year,month,day);

                try {
      const res = await instance.get(`${todoCtx.serverUrl}/api/event/load?standardTime=${yearValue}${String(monthValue).padStart(2, '0')}${String(dayValue).padStart(2, '0')}`);
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