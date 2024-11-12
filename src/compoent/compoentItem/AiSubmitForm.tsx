import React, { useState,useRef,useContext } from 'react';
import style from '../../Modal/ModalType/ModalTypeCss/MakeEvent.module.css';
import ReactRange from './ReactRange';
import { MdOutlineAccessAlarms } from "react-icons/md"
import InputNumber from '../compoentItem/InputNumber';
import DropDownBoxContainer from '../compoentItem/DropDownBoxContainer'
import AlarmCompoent from './AlarmCompoent'
import ClosedButton from '../compoentItem/ClosedButton'
import GrayBoxContainer from '../compoentItem/GrayBoxContainer'
import DownOutLineLetter from '../compoentItem/DownOutLineLetter'
// import DateRangeButtons from '../compoentItem/DateRangeButtons'
import CategoryPopUp from '../../Modal/PopUpType/PopupCategory'
import { IoCloseOutline } from "react-icons/io5";
import { LuCalendarClock } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import {TodosContext} from '../../store/todo_context'

const AiSubmitForm =  () => {

    const [titleValue, setTitleValue] = useState<string>('');
    const [rangeStart, setRangeStart] = useState<string>('');
    const [rangeEnd, setRangeEnd] = useState<string>('');
    const [isdetailLabelAlarmOption, setIsdetailLabelAlarmOption] = useState<boolean>(false);
    const [alarmCompoent, setAlarmCompoent] = useState<any>([]);
    const [alarmCustomMethod, setAlarmCustomMethod] = useState<any>({label:'Week',timeValue:10080});
    const [customAlarmeValue, setCustomAlarmeValue] = useState<number>(1);
    const [alarmValue, setAlarmValue] = useState<any>([]);
    const [isAlarm, setIsAlarm] = useState<boolean>(false);
    const [category, setCategory] = useState<any>('red');

    const handleValueOfTitle = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setTitleValue(e.target.value)
      }


      const todoCtx = useContext(TodosContext);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleRangeStart = (startRange:any) => {
        setRangeStart(startRange)
    }

    const handleRangeEnd = (endRange:any) => {
        setRangeEnd(endRange)
    }

    const updateCustomAlarmeValue =(value:number)=>{
        setCustomAlarmeValue(value);
      }
  


      const openCustomAlarm = (index:number) =>{
        setAlarmCompoent((prevState:any) => {
          const newAlarmCompoent = [...prevState];
          newAlarmCompoent[index].isCustomAlarmState = !(newAlarmCompoent[index].isCustomAlarmState);
          return newAlarmCompoent;
        });

      }


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


      const handlePopUpClick= (value:any) =>{
        setAlarmCustomMethod(value)
        return
      }


      const deleteOptionOfAlarm = (index:number) =>{
        console.log(index,'index')
        setAlarmCompoent((prevState:any) => {
          const AlarmValue = [...prevState];
          console.log(AlarmValue,'AlarmValue')
          return AlarmValue.filter((_, i) => i !== index)
        });
      }


      const addAlarm = () => { 
        console.log('dd')
          const addAlarmCompoent= [...alarmCompoent, {'alarmOption': {'label': '일주일 전', 'timeValue': 10080}, 'isAlarmDeleteShowed': false , 'isCustomAlarmState':false}]
        if(alarmCompoent.length < 3){    
          setAlarmCompoent(addAlarmCompoent);
        }else{
          alert("최대 3개의 알람을 추가할 수 있습니다.");
        }
      };

      const handleIsdetailLabelAlarmOption = () =>{
        setIsdetailLabelAlarmOption(true)
      }
  
      const handleCategory = () => {
        const currentValue = todoCtx.openAndType
        // todoCtx.sendFlexbox({ ...currentValue,  popupValue:'OpenCategory'});
      }



    const updateCategory =(categoryValue:string)=>{
        setCategory(categoryValue)
        const currentValue = todoCtx.openAndType;
        // todoCtx.sendFlexbox({ ...currentValue,  popupValue:''});
    }


  return (
    <form>
        <div className={style.container__list}>
            <div className={style.container__list__padding}>
            </div>
            <input ref={inputRef} placeholder="Title" className={style.container__list__title} onChange={handleValueOfTitle} value={titleValue} type="text"></input>
        </div>
        <div className={style.container__list}>
        <ReactRange handleRangeStart={handleRangeStart} handleRangeEnd={handleRangeEnd} ></ReactRange>
        </div>



      {/* <div className={style.container__list}>
        <DateRangeButtons rangeStart={rangeStart} rangeEnd={rangeEnd}></DateRangeButtons>
      </div> */}
     
     

      {
          isdetailLabelAlarmOption
          ?
          <>
            <div className={style.container__list__popupContainer}  style={{flexDirection: 'column'}}>
              <div className={style.container__list}>
                <div className={style.container__list__padding}>
                  <SlCalender></SlCalender>
                 </div>
            <div className={style.containerNavbar__todayContainer} onClick={handleCategory}>
             <DownOutLineLetter padding={'10px 8px'}>

                <div  className={style.containerNavbar__todayContainer__label} style={{'backgroundColor':`${category}`}}></div>
        
        </DownOutLineLetter>
        </div>
        {/* <CategoryPopUp updateCategory={updateCategory} isCategoryOpen={todoCtx.openAndType.popupValue === 'OpenCategory'}></CategoryPopUp> */}
        </div>

        <>{rangeStart},{rangeEnd}</>
        <div className={style.container__list}  style={{padding: '10px 0'}}>
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
                       <InputNumber  updateValue={updateCustomAlarmeValue}></InputNumber>
      
                       </div>
                       <DropDownBoxContainer typeOfBox={'gray'} typeOfPopup={'handleCustomAlarm'} selectOption={[{id:'minute',label:'Mintue',timeValue:1},{id:'hour',label:'Hour',timeValue:60},{id:'day',label:'Day',timeValue:1440},{id:'week',label:'Week',timeValue:10080}]} onClickSelectOption={handlePopUpClick}>
                        {alarmCustomMethod.label}
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
                <div className={style.container__list__container__labelOfStatus} style={{background:`red`}}></div>
                <p className={style.container__list__container__p} >{` ${isAlarm ===false ? '알리지 않음' : alarmValue}`}</p>
              </div>
          </div>
        }




    </form>
  );
};

export default AiSubmitForm;
