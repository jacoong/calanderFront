import style from '../pages/css/ClosedButton.module.css'
import { IoCloseOutline } from "react-icons/io5";
import react, {ReactNode} from 'react'
type ClosedButtonType = {
    onClick?:any
    children: ReactNode;
};


const ClosedButton =({onClick,children}:ClosedButtonType) => {


return (
    <div className={style.openMain__flexBox__popUp__header__circle} onClick={onClick}>
    <div className={style.openMain__flexBox__popUp__header__circle__container} >
        {children} 
    </div>
</div> 
);
}



export default ClosedButton;