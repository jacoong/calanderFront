import React, {ReactNode,useContext,useEffect,useState} from 'react';
import style from '../pages/css/Navbar.module.css'
import { IoMenu,IoChevronBackOutline,IoChevronForward,IoSearchSharp,IoCaretDownOutline } from "react-icons/io5";
import HoverBorder from './HoverBorder';
import { TodosContext} from '../../store/todo_context';
import DropDownBoxContainer from './DropDownBoxContainer'
import DropDownBox from './DropDownBox'
import { VIEW_OPTIONS } from '../../store/eventIndex';
import useModal from '../../hook/useModal';
type NavbarType = {
    handleViewChange?:(typeOfClick:string)=>void;
    onPrevClick?:(typeOfClick:string)=>void;
    onNextClick?:(typeOfClick:string)=>void;
    viewPopupValue:string;
};


const Navbar =({handleViewChange,onNextClick,onPrevClick,dateText,onTodayClick,handleIsFold,viewPopupValue}:any) => {
    const todoCtx = useContext(TodosContext);

    const [stateArrow, setStateArrow] = useState('drgdrgrdgdrg');
    const  { openModal,closeModal } = useModal();
    
    const openPopup = (e:React.MouseEvent)=>{
            console.log('11');
            // todoCtx.sendFlexbox({isOpen:true,type:'popup'})
           }
           


          const handlePopUpClick = (typeOfClick:any)=>{ 
            handleViewChange(typeOfClick.id);
            closeModal(0);
          }


          const ddss = (value:string) =>{
            console.log('dddwefe',value)
            setStateArrow(value)
          }


          console.log()

        //   handleIsFold
    // useEffect(()=>{
    //     setIsPopUp(true)
    // },
    // [todoCtx.openAndType['type'] === 'popup'])
return (
    <div className={style.containerNavbar}>
        <div className={style.containerNavbar__logoContainer}>
            <div className={style.containerNavbar__logoContainer__container}>
                <HoverBorder onClick={handleIsFold}>
                    <IoMenu style={{fontSize:'30px'}}></IoMenu>
                </HoverBorder >
                <img alt={'dd'} src={process.env.PUBLIC_URL + '/img/Logo.png'}></img>
            </div>
        </div>
        



        <div className={style.containerNavbar__toolContainer}>


            <div className={style.containerNavbar__toolContainer__container}>

                {/* <div onClick={onTodayClick} style={{marginLeft:'40px', marginRight:'20px'}} className={style.containerNavbar__todayContainer}> */}

                <DropDownBox padding={'15px 20px'} isDropDown={false} typeOfBox={'white'} onClick={onTodayClick}>
                <span>Today</span>
                </DropDownBox>
{/*                    
                </div> */}

                <HoverBorder onClick={onPrevClick} backgroundColor={'#F9FAFA'} padding={'12px'}>
                <IoChevronBackOutline></IoChevronBackOutline>
                </HoverBorder>
                <HoverBorder onClick={onNextClick} backgroundColor={'#F9FAFA'} padding={'12px'}>
                <IoChevronForward></IoChevronForward>
                </HoverBorder>

                <div className={style.containerNavbar__todayLetter}>
                    <p>{`${dateText}`}</p>
                </div>

            </div>

            <div className={style.containerNavbar__toolContainer__container}>
                <HoverBorder  onClick={()=>ddss('after')}backgroundColor={'#F9FAFA'} padding={'12px'}>
                <IoSearchSharp style={{fontSize:'25px'}}></IoSearchSharp>
                </HoverBorder>

            <div>

            <DropDownBoxContainer typeOfPopup={'CalendarViewType'} selectOption={VIEW_OPTIONS} onClickSelectOption={handlePopUpClick}>
                        {viewPopupValue}
            </DropDownBoxContainer>

            {/* {todoCtx.openAndType.popupValue === "handleCalendarViewCycle"
                    ?
                    <div className={`${style.main_body__banner__popup}`}>
                        <div className={`${style.main_body__banner__popup__container__item}`} onClick={()=>{handlePopUpClick(VIEW_OPTIONS[0])}}>
                        <p>Day</p>
                        </div>
                        <div className={`${style.main_body__banner__popup__container__item}`} onClick={()=>{handlePopUpClick(VIEW_OPTIONS[1])}}>
                        <p>Week</p>
                        </div>
                        <div className={`${style.main_body__banner__popup__container__item}`} onClick={()=>{handlePopUpClick(VIEW_OPTIONS[2])}}>
                        <p>Month</p>
                        </div>
                        <div className={`${style.main_body__banner__popup__container__item}`} onClick={()=>{handlePopUpClick(VIEW_OPTIONS[3])}}>
                        <p>Year</p>
                        </div>

            
                    </div>
                    :
                    null
                    } */}
            </div>
                
            </div>
            
        </div>

        <div className={style.containerNavbar__ProfileContainer}>
            <div className={style.containerNavbar__ProfileContainer__Container}>
                <img src='https://plus.unsplash.com/premium_photo-1709560426498-7b55e257f365?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='wrong'/>
            </div>
        </div>
  
    </div>
);
}



export default Navbar;