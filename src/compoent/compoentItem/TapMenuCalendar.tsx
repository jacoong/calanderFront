import { useState,useEffect,useContext,useMemo } from 'react';
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import {TodosContext} from '../../store/todo_context'
import { IoMenu,IoChevronBackOutline,IoChevronForward,IoSearchSharp,IoCaretDownOutline } from "react-icons/io5";
import HoverBorder from './HoverBorder';
import DropDownBox from './DropDownBox';
import style from '../pages/css/TapMenuCalendar.module.css'
import Next2 from '../compoentItem/Next2';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface TapMenuCalendarType {
  // onPrevClick:(typeOfClick:string)=>void;
  // onNextClick:(typeOfClick:string)=>void;
  dateText:string|undefined;
  dateValue:Date;
}

function TapMenuCalendar({dateValue,dateText,viewType}:any) {
  const todoCtx = useContext(TodosContext);
  // const [value, onChange] = useState<Value>(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date()); // viewOftheCalendar
  // console.log(dateValue,'value',typeof(dateValue))


function formatMonthYear(date: any, locale: string) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
  if(date !== null){
    return new Intl.DateTimeFormat(locale, options).format(date);
  }
}

useEffect(()=>{
  setActiveStartDate(dateValue)
},[dateValue])

const onPrevClick = () => {
  setActiveStartDate((prevActiveStartDate) => {
    const prevMonth = new Date(
      prevActiveStartDate.getFullYear(),
      prevActiveStartDate.getMonth() - 1,
      1
    );
    return prevMonth;
  });
};

const onNextClick = () => {
  setActiveStartDate((prevActiveStartDate) => {
    const prevMonth = new Date(
      prevActiveStartDate.getFullYear(),
      prevActiveStartDate.getMonth() + 1,
      1
    );
    return prevMonth;
  });
};


const onSelectDay = (value:Date) =>{
  if (viewType === undefined){
    todoCtx.onSelectDay(value,'month');
  }
  else{
    todoCtx.onSelectDay(value,viewType)
  }
  return
}

const aaa = () =>{
  console.log('hehe')
}


// const dateText = useMemo(() => {
//   return moment(activeStartDate).format("dddd, MMMM DD");
// }, [activeStartDate]);

// const handleee = ({ date, label, locale, view }) => alert(`Current view: ${view}, date: ${date.toLocaleDateString(locale)}`)

  return (
    <div className={style.TapMenuCalendar_Container}>      
      <div className={style.TapMenuCalendar_Container__toolContainer}>

      <div className={style.TapMenuCalendar_Container__toolContainer__todayLetter}>
          <p>{`${formatMonthYear(activeStartDate, 'en-Us')}`}</p>
      </div>

      <div className={style.TapMenuCalendar_Container__toolContainer__arrowController}>
      <HoverBorder onClick={onPrevClick} backgroundColor={'#F9FAFA'} padding={'8px'}>
      <IoChevronBackOutline></IoChevronBackOutline>
      </HoverBorder>
      <HoverBorder onClick={onNextClick} backgroundColor={'#F9FAFA'} padding={'8px'}>
      <IoChevronForward></IoChevronForward>
      </HoverBorder>
      </div>

      </div>
      <Calendar       activeStartDate={activeStartDate} onClickDay={onSelectDay} formatDay ={(locale, date) => dayjs(date).format('DD')}  prev2Label={null} next2Label={null} navigationAriaLabel={'decade'} showNavigation={false} onChange={aaa} value={dateValue} />
    </div>
  );
}

export default TapMenuCalendar;
