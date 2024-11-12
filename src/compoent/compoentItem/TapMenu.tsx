import {useContext,useEffect,useState} from 'react';
import { useNavigate,useParams,useLocation } from 'react-router-dom';
import { BiSolidHomeCircle } from 'react-icons/bi'; // Import your icons
import { AiOutlineUser } from 'react-icons/ai';
import Button from './Button'; // Import your Button component
import style from '../pages/css/TapMenu.module.css'
import Calendar from 'react-calendar';
import DownOutLineLetter from '../compoentItem/DownOutLineLetter';
import CategoryField from '../compoentItem/CategoryField';
import TapMenuCalendar from './TapMenuCalendar';
import {TodosContext} from '../../store/todo_context'
import {Categories,Category} from '../../store/types';
import useModal from "../../hook/useModal";
import { ModalStateContext } from "../../store/ModalProvider";
import {ModalState} from '../../store/types';
import { closeModal } from '../../store/modalSlice';

interface TapMenu {
    viewType:string|undefined;
    onPrevClick:(typeOfClick:string)=>void;
    onNextClick:(typeOfClick:string)=>void;
    dateText:string|undefined;
    dateValue:any;
    category:Categories;
    isFold:any;
    filterCalendarByCategory(isChecked:boolean,value:string):void;
}

const TapMenu = ({viewType,onNextClick,onPrevClick,dateText,dateValue,isFold,category,filterCalendarByCategory}:TapMenu) => {
    
    const  { openModal,closeModal } = useModal();
    const ModalProps = useContext(ModalStateContext);
    const navigate = useNavigate();
    const todoCtx = useContext(TodosContext);
    const handlePopup = (popupValue:string)=>{
        // todoCtx.sendFlexbox({isOpen:true,type:'popup',popupValue:popupValue})
      }


      const handlePopUpClick = (typeOfClick:string, valueOption?:any) => {
        console.log(valueOption)
        const currentValue = todoCtx.openAndType;
        todoCtx.sendFlexbox({   
            ...currentValue,  
            type: typeOfClick, 
            ...(valueOption ? { value: valueOption } : {}) 
          });
      }

      const sendPasswordChange = () =>{
        // todoCtx.sendFlexbox({isOpen:true,type:'updatePassword'})
      }


      const makePlanOftodayProp = {
        view:'makeToday',start:new Date(),end:new Date(),isDisplayOfDay:true
      }
      


    const handleNavigate = () =>{
        navigate('/calendar/aiEventCalendarPage')
    }
    
    const handleModalOpen= ({type,value}:any)=>{ 
        openModal({type:type,value:value})
        closeModal(0);
      }


      

    return (
        <div className={`${style.banner} ${isFold? style.fold:''}`}>
            <div className={style.banner__items}>
                {/* <Button handleClick={() => handlePopup('MakePopup')} width='180px' margin='0 0 10px 0' borderRadius='30px' background_color='b-whiteShadow' color='black'> */}
                <div id='MakeEventPopup'>
                <Button handleClick={() => openModal({type:'Popup',value:{baseDateValue:dateValue,isPotal:true,typeOfPopup:'MakeEventPopup',categoryValue:category}})} width='180px' margin='0 0 10px 0' borderRadius='30px' background_color='b-whiteShadow' color='black'>
                    <div  style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: '5px',
                    }}>
                        <img style={{ width: '30px' }} src="https://www.svgrepo.com/show/464599/date-alt-down.svg" alt="킹 (체스 말)"></img>
                        <DownOutLineLetter>
                            Make
                        </DownOutLineLetter>
                    </div>
                </Button>
                </div>
                


                <TapMenuCalendar viewType={viewType} onNextClick={onNextClick} onPrevClick={onPrevClick} dateText={dateText} dateValue={dateValue}></TapMenuCalendar>
                    {/* <div className={style.banner__items__group__containers}>
                        <Link className={style.banner__items__item} to={`/`}>
                            <div className={style.banner__items__item__onClick}>
                                <div className={style.banner__items__item__onClick__container}>
                                    <BiSolidHomeCircle />
                                    <p>Home</p>
                                </div>
                            </div>
                        </Link>

                        <Button width='100%' Background_color={'b-black'} color={'white'} handleClick={sendPasswordChange}>changePassword</Button>

    
                    
       
                        
                    </div> */}

         


                {/* Log out popup */}
                {false ? (
                    <div className={`${style.banner__popup}`}>
                        <div className={`${style.banner__popup__container__LogOut}`}>
                            <div className={`${style.banner__popup__container__LogOut__item}`}>
                                {/* <Link to={`/${userInfo?.username}`} onClick={goToPage} > Go to My Page {userInfo?.username}</Link> */}
                            </div>
                            <div className={`${style.banner__popup__container__LogOut__item}`} onClick={todoCtx.handleLogOut}>
                                {/* <p>MakePopUp</p> */}
                            </div>
                        </div> 
                    </div>
                ) : null}
            </div>
            
            <CategoryField filterCalendarByCategory={filterCalendarByCategory} categoryValue={category}></CategoryField>
        </div>
    );
};



export default TapMenu;
