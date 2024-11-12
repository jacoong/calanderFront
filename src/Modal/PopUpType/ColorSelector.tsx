import React, { useEffect, useState,useRef } from 'react';
import styles from './PopUpTypeCss/ColorSelector.module.css';
import Button from '../../compoent/compoentItem/Button';
import {categoryValidator} from '../../compoent/validator'
import {Category} from '../../store/types';
import { instance,addAccessTokenInterceptor, addResponseInterceptor } from '../../store/axios_context';

const colors = [
  '#d32f2f', '#f57c00', '#fbc02d', '#388e3c', '#303f9f', '#7b1fa2',
  '#c2185b', '#afb42b', '#00796b', '#0288d1', '#5d4037', '#d32f2f',
  '#f57c00', '#388e3c', '#1976d2', '#7e57c2', '#616161', '#ff8a65',
  '#ffeb3b', '#81c784', '#64b5f6', '#9575cd', '#9e9e9e'
];

const preventEvent = (e: React.MouseEvent) => {
  e.stopPropagation();
}

interface ColorSelectorType {
  independantPopup?: boolean;
  isAddOrEdit:'edit'|'add';
  CategoryValue?:Category;
}

interface typeOfValidate {
  error:boolean, message:string, touched:boolean;
}


const ColorSelector = ({ value }: any) => {

  console.log(value,'value');
  const {categoryValue,independantPopup,isAddOrEdit} = value;

  const initialColorValue = colors[0]
  const [selectedColor, setSelectedColor] = useState(initialColorValue);
  const [categoryName, setCategoryName] = useState<null|string>(null);
  const [validateResult, setValidateResult] = useState<typeOfValidate>({touched:false,error:false,message:''});

  const inputRef = useRef<HTMLInputElement>(null);

  const validateCategory = (e:any) =>{
    const Result =  categoryValidator(e.target.value);
    setValidateResult(Result);
    setCategoryName(e.target.value)
 }

 useEffect(()=>{
  console.log('important',validateResult)
 },[validateResult])

 const categoryHandle =async(e:any) =>{
    e.preventDefault();
    if(categoryValue){
      console.log({'categoryId':categoryValue.categoryId,'categoryColor':selectedColor,'categoryName':categoryName})
        const res = await instance.patch(`${process.env.REACT_APP_SERVER_URL}/api/category/update`,{categoryId:categoryValue.categoryId,categoryColor:categoryValue.categoryColor,categoryName:categoryValue.categoryName}, {
      })
      if (res.status === 200) {
        return 
      }
      else{
      throw { code: 500, message: 'Unexpected Message' };
    }
    }else{
      console.log({"categoryColor":selectedColor,
        'categoryName':categoryName})
      const res = await instance.post(`${process.env.REACT_APP_SERVER_URL}/api/category/insert`,{
        categoryOptionDTOS : [{"categoryColor":selectedColor,
        "categoryName":categoryName}]
        }, {
      })
      if (res.status === 200) {
        return 
      }
      else{
      throw { code: 500, message: 'Unexpected Message' };
    }
    }
 }

useEffect(()=>{
  if(categoryValue){
    setCategoryName(categoryValue.categoryName)
    setSelectedColor(categoryValue.categoryColor)
  }
},[categoryValue])

  return (
    <form  onSubmit={categoryHandle} className={`${independantPopup ? styles.independantPopupContainer : styles.colorSelectorContainer}`} onClick={(e: React.MouseEvent) => preventEvent(e)}>
      <input ref={inputRef} placeholder={categoryValue?categoryValue.categoryName:'name of category'} onChange={validateCategory} className={`${styles.colorSelectorContainer__input} ${validateResult.error ? styles.invalid : styles.success}`}></input>
      {validateResult.touched ?
      <div className={styles.messageBox}>
      {validateResult.message && <div className={validateResult.error ? styles.errorMessage : styles.successMessage}>{validateResult.message}</div>}
            </div> : null}
      <div className={styles.selectedColorContainer}>
        선택한 색상 <div className={styles.selectedColorCircle} style={{ backgroundColor: selectedColor }}></div>
      </div>
      <div className={styles.colorSeletorField}>
      {colors.map((color, index) => (
        <div
          key={index}
          className={styles.colorItem}
          style={{ backgroundColor: color }}
          onClick={() => setSelectedColor(color)}
        ></div>
      ))}
      </div>
      <div className={styles.colorSelectorContainer__button}>
        <Button padding={'5px 0px'} color={'white'} borderRadius={'5px'} width={'70px'}>{isAddOrEdit === 'edit'?'변 경':'추 가'}</Button>
      </div>
    </form>
  );
};

export default ColorSelector;