import React, {ReactNode} from 'react';
import style from '../pages/css/Button.module.css'
type ButtonType = {
    Background_color?:string;
    width?:string;
    bolder?:string;
    font_color?:string;
    handleClick?:()=>void;
    children:ReactNode;
    disabled?:boolean;
    type?:"button" | "submit" | "reset" | undefined
};


const Button =({bolder='thin', type,Background_color='b-blue',width="middle",font_color="f-white",handleClick,disabled= false,children}:ButtonType) => {


return (
    <button className={`${style.button}  ${style[bolder]}  ${style[font_color]} ${style[Background_color]} ${style[width]}`}
    onClick={handleClick}
    disabled={disabled}
    type={type}
    >{children}</button>   
);
}



export default Button;