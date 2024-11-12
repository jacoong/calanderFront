import React, {ReactNode} from 'react';
import style from '../pages/css/DropDownBox.module.css'
import DownOutLineLetter from './DownOutLineLetter'
import GrayBoxContainer from './GrayBoxContainer';
type DropDownBoxType = {
    onClick:(value:any) =>void;
    children:ReactNode;
    typeOfBox?:string;
    isDropDown?:boolean;
    padding?:string;
};


const DropDownBox =({padding,isDropDown = true,typeOfBox ='white'  ,onClick,children}:DropDownBoxType) => {

    const customStyle = {
        padding:padding
    }

return (

        typeOfBox === 'white'
        ?
        isDropDown
            ?
            <div onClick={onClick} style={customStyle} className={style.DropDownBox}>
            <DownOutLineLetter>
            {children}
            </DownOutLineLetter>
            </div>
            :
            <div onClick={onClick} style={customStyle} className={style.DropDownBox}> 
            {children}  
            </div>
        

        :
 
        isDropDown
        ?
        <GrayBoxContainer onClick={onClick}>
        <DownOutLineLetter>
        {children}
        </DownOutLineLetter>
        </GrayBoxContainer>
        :
        <GrayBoxContainer onClick={onClick}>
        {children}
        </GrayBoxContainer>
);
}



export default DropDownBox;