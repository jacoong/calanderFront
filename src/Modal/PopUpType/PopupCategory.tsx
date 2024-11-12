import React, { useState,useEffect,useContext } from 'react';
import style from './PopUpTypeCss/PopupCategory.module.css';
import useModal from '../../hook/useModal';
import { ModalStateContext } from "../../store/ModalProvider";


interface TimeSelectInputProps {
    handleStartEventTime: (time: string) => void;
  }

const PopupCategory = (value:any) => {

    const {categoryValue} = value.value;
    const  { updateModalValue,closeModal } = useModal();
    const ModalCtx = useContext(ModalStateContext);

    const preventOnclick = (e: React.MouseEvent) => {
        console.log('preventEvent! at first')
        e.stopPropagation();
    }

    const handleSendCategoryPopupValue = (category:any) =>{
        console.log(category)
        const MainPopup = ModalCtx[ModalCtx.length-2].value?.value

        let updatedData

        updatedData = {
            ...MainPopup,      // value 객체 내부를 복사
            currentCategoryValue: category,  
    }
        const updatedMainPopup = {
            ...ModalCtx[ModalCtx.length - 2].value, // 기존 value 객체를 복사
            value: updatedData, // 기존의 value 안에 있는 값들 중 start만 변경된 값을 할당
        };
        console.log(updatedMainPopup);
        updateModalValue(ModalCtx.length-2,updatedMainPopup)
        closeModal(ModalCtx.length-1)
    }



  return (

    <div className={style.LabelPopUpContainer} onClick={preventOnclick}>
        {categoryValue.map((category:any,index:number)=>
            <div key={`${category.categoryColor}${index}keyValue`} className={style.LabelPopUpContainer__bar} onClick={()=>handleSendCategoryPopupValue(category)}>
                <div  className={style.LabelPopUpContainer__bar__label} style={{'backgroundColor':category.categoryColor}}></div>
            </div>
        )
        }
    </div>
  );
};



export default PopupCategory;

