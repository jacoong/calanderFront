import React, { useState,useEffect } from 'react';
import styles from '../pages/css/InputNumber.module.css'
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { IoCaretDownOutline } from "react-icons/io5";
import { IoCaretUpOutline } from "react-icons/io5";
import GrayBoxContainer from '../compoentItem/GrayBoxContainer'




const InputNumber = ({ initialValue, updateValue }:any) => {


  const [isShowedNumberControl, setIsShowedNumberControl] = useState<boolean>(false);
  const [value, setValue] = useState<number>(initialValue);


  const handleMouseOver = () => {
    setIsShowedNumberControl(true);
  };

  const handleMouseOut = () => {
    setIsShowedNumberControl(false);
  };

  const handleNumberChange =(e:React.ChangeEvent<HTMLInputElement>) =>{
    setValue(Number(e.target.value))
  }



  const onIncrement= () => {
    setValue((prev)=> 
        Number(prev) + 1
      );
  };


  const onDecrement = () => {
    if(value < 2){
      return
    }
    setValue((prev)=> 
    Number(prev - 1)
  );
};


useEffect(()=>{
  updateValue(value)
},[value])

useEffect(()=>{
  if(initialValue){
    setValue(initialValue)
  }
},[initialValue])

  return (
              <GrayBoxContainer>
           
                {true
                ?
              <div className={styles.spinnerControl__numberControl} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
              
                  <div className={styles.spinnerControl__numberControl__upDown} onClick={onIncrement}>
                    <IoCaretUpOutline></IoCaretUpOutline>
                  </div>
                  <div className={styles.spinnerControl__numberControl__upDown} onClick={onDecrement}>
                    <IoCaretDownOutline></IoCaretDownOutline>
                  </div>
                  </div>
                :
                  null
                }
                <input className={styles.spinnerControl} onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut} type="number" data-type="number" onChange={handleNumberChange}  max="90" min="1" value={value}/>
      
                </GrayBoxContainer>
        );
      };



export default InputNumber;

