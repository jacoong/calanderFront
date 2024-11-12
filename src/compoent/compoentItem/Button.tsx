import React, {ReactNode} from 'react';
import style from '../pages/css/Button.module.css'
type ButtonType = {
    Background_color?:string;
    width?:string;
    margin?:string;
    height?:string;
    padding?:string;
    bolder?:string;
    color?:string;
    borderRadius?:string;
    background_color?:string;
    handleClick?:()=>void;
    children:ReactNode;
    disabled?:boolean;
    type?:"button" | "submit" | "reset" | undefined
};


const Button =({margin,bolder='thin', padding='14px',borderRadius='24px', type,background_color='b-blue',width='300px',color="black",handleClick,disabled= false,children}:ButtonType) => {

    const buttonStyle={
        padding:padding,
        width:width,
        borderRadius:borderRadius,
        color:color,
        margin:margin
        
    }

return (
    <button style={buttonStyle} className={`${style.button}  ${style[bolder]}   ${style[background_color]} ${style[width]}`}
    onClick={handleClick}
    disabled={disabled}
    type={type}
    >{children}</button>   
);
}



export default Button;