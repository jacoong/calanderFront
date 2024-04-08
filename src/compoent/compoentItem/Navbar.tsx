import React, {ReactNode,useContext,useEffect,useState} from 'react';
import style from '../pages/css/Navbar.module.css'
import { IoMenu,IoChevronBackOutline,IoChevronForward,IoSearchSharp,IoCaretDownOutline } from "react-icons/io5";
import HoverBorder from './HoverBorder';
import { TodosContext} from '../../store/todo_context';
import DownOutLineLetter from '../compoentItem/DownOutLineLetter'

type NavbarType = {
    handleClick?:()=>void;
};


const Navbar =({handleClick}:NavbarType) => {
    const todoCtx = useContext(TodosContext);
    const [stateOfView, setStateOfView] = useState('Month');

    const openPopup = (e:React.MouseEvent)=>{
            console.log('11');
            todoCtx.sendFlexbox({isOpen:true,type:'popup'})
           }
    
           

           const handlePopup = (popupValue:string)=>{
            todoCtx.sendFlexbox({isOpen:true,type:'popup',popupValue:popupValue})
          }

          const handlePopUpClick = (typeOfClick:string)=>{
            setStateOfView(typeOfClick);
            // getUserInfo
            todoCtx.sendFlexbox({isOpen:false,type:typeOfClick})
          }



    // useEffect(()=>{
    //     setIsPopUp(true)
    // },
    // [todoCtx.openAndType['type'] === 'popup'])
return (
    <div className={style.containerNavbar}>
        <div className={style.containerNavbar__logoContainer}>
            <div className={style.containerNavbar__logoContainer__container}>
                <HoverBorder>
                    <IoMenu style={{fontSize:'30px'}}></IoMenu>
                </HoverBorder>
                <img alt={'dd'} src={process.env.PUBLIC_URL + '/img/Logo.png'}></img>
            </div>
        </div>
        



            <div className={style.containerNavbar__toolContainer}>


                <div className={style.containerNavbar__toolContainer__container}>

                    <div style={{marginLeft:'40px', marginRight:'20px'}} className={style.containerNavbar__todayContainer}>
                        <span>Today</span>
                    </div>

                    <HoverBorder backgroundColor={'#F9FAFA'} padding={'12px'}>
                    <IoChevronBackOutline></IoChevronBackOutline>
                    </HoverBorder>
                    <HoverBorder backgroundColor={'#F9FAFA'} padding={'12px'}>
                    <IoChevronForward></IoChevronForward>
                    </HoverBorder>

                    <div className={style.containerNavbar__todayLetter}>
                        <p>{`${2024}년 ${3}월`}</p>
                    </div>

                </div>

                <div className={style.containerNavbar__toolContainer__container}>
                    <HoverBorder backgroundColor={'#F9FAFA'} padding={'12px'}>
                    <IoSearchSharp style={{fontSize:'25px'}}></IoSearchSharp>
                    </HoverBorder>

                <div>
                <div className={style.containerNavbar__todayContainer} onClick={()=>handlePopup('handleCalendarViewCycle')}>
                                    <DownOutLineLetter>
                                        {stateOfView}
                                    </DownOutLineLetter>
                                
                                    </div>
                {todoCtx.openAndType.popupValue === "handleCalendarViewCycle"
                        ?
                        <div className={`${style.main_body__banner__popup}`}>
                            <div className={`${style.main_body__banner__popup__container__item}`} onClick={()=>{handlePopUpClick('Day')}}>
                            <p>Day</p>
                            </div>
                            <div className={`${style.main_body__banner__popup__container__item}`} onClick={()=>{handlePopUpClick('Week')}}>
                            <p>Week</p>
                            </div>
                            <div className={`${style.main_body__banner__popup__container__item}`} onClick={()=>{handlePopUpClick('Month')}}>
                            <p>Month</p>
                            </div>
                            <div className={`${style.main_body__banner__popup__container__item}`} onClick={()=>{handlePopUpClick('Year')}}>
                            <p>Year</p>
                            </div>

                
                        </div>
                        :
                        null
                        }
                </div>
                   
                </div>
               
            </div>

            <div className={style.containerNavbar__ProfileContainer}>
                <div className={style.containerNavbar__ProfileContainer__Container}>
                    <img src='https://plus.unsplash.com/premium_photo-1709560426498-7b55e257f365?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='wrong'/>
                </div>
            </div>
  
        <div></div>
    </div>
);
}



export default Navbar;