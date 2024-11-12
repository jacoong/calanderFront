import React,{useState,useRef,useEffect,useContext} from 'react';
import style from '../pages/css/ClosedButton.module.css'
import { IoCloseOutline } from "react-icons/io5";
import CustomSelector from './CustomSelectorDemo';
import {TodosContext} from '../../store/todo_context'
import {typeCheckBox,EmailTag} from '../../store/types';



type CloseButtonForInviteUserType = {
    onRemove?:any
    sendAuthenticationOfInviter:(selectedItem:typeCheckBox,index:number)=>void;
    index:number
    defaultValue:any;
};

const CloseButtonForInviteUser =({onRemove,sendAuthenticationOfInviter,index,defaultValue}:CloseButtonForInviteUserType) => {

    const todoCtx = useContext(TodosContext);


    const optionLabels = [
        {label: "Manager", value: 'manager'},
        {label: "Attender", value: 'attender'}
      ];



      const transformat = (valueProps: EmailTag[]): { label: string; value: string } => {
        const value = valueProps[index].role.toLowerCase();
        // Always ensure a default value is returned
        const findLabel = optionLabels.find(optionLabel => optionLabel.value === value) || {label:'Generator', value:'generator'};
        return findLabel;
    };

      const [selectedItem, setSelectedItem] = useState({label:'Generator', value:'generator'});

      const handleAuthenticationOfInviter = (value:any) => {
        console.log(value,'sfs')
        setSelectedItem(value);
        sendAuthenticationOfInviter(value,index);
      };


      useEffect(()=>{
        setSelectedItem(transformat(defaultValue));
      },[defaultValue])





return (
    <div key={`${index}sef`} style={{display: 'flex', width: '200px', justifyContent: 'space-between',alignItems: 'center', height:'100%'}}>
        {
         selectedItem.value === 'generator'
         ?
        <div>Generator</div>
         :
         <>
        <CustomSelector initialValue={selectedItem} selectorValue={optionLabels} handleItemClick={handleAuthenticationOfInviter}></CustomSelector>
         <div className={style.openMain__flexBox__popUp__header__circle} onClick={onRemove}>
         <div className={style.openMain__flexBox__popUp__header__circle__container} >
        <IoCloseOutline/>   
         </div>
     </div> 
         </> 
        }
    </div>
);
}



export default CloseButtonForInviteUser;