import React, {ReactNode,useContext} from 'react';
import {TodosContext} from '../../store/todo_context'
import style from '../pages/css/DropDownBoxContainer.module.css'
import DropDownBox from './DropDownBox';
import useModal from '../../hook/useModal';
import { ModalStateContext } from "../../store/ModalProvider";

type DropDownBoxContainerType = {
    typeOfPopup:string;
    children?:ReactNode;
    selectOption:any;
    onClickSelectOption:(props:any)=>any;
    typeOfBox?:string;
};


const DropDownBoxContainer =({typeOfBox,typeOfPopup,children,selectOption,onClickSelectOption}:DropDownBoxContainerType) => {

    const todoCtx = useContext(TodosContext)
    const PopupCtx = useContext(ModalStateContext)
    const  { openModal,closeModal } = useModal();

    const handlePopup = (typeOfPopup:string)=>{
        console.log('clicked')
        const currentValue = todoCtx.openAndType
        // todoCtx.sendFlexbox({ ...currentValue,  popupValue:typeOfPopup});
      }

 
return (
    <div  className={`${style.container}`}>
    <DropDownBox typeOfBox={typeOfBox}  onClick={() => {  openModal({type: 'Popup',value: {typeOfPopup: typeOfPopup}});
  }}>
        {children}
    </DropDownBox>
     {PopupCtx.find(modal => modal.value?.typeOfPopup === typeOfPopup)
     ?
     <div className={`${style.popup}`}>
        {selectOption.map((item:any,index:number)=>
                 <div key={`${index}dropdown`} className={`${style.popup__container__item}` } onClick={()=>onClickSelectOption(item)}>
                 <p>{item.label}</p>
                 </div>
        )}
     </div>
     :
     null
     }
     </div>
);
}



export default DropDownBoxContainer;