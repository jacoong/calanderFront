import React from 'react';
import style from './css/StateTitle.module.css'
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import AuthenticatedUserName from '../compoentItem/AuthenticatedUserName';

type StateTitleProps = {
    state: string;
    isBack?: boolean;
    isAuthenticated:boolean;
};

const StateTitle =({state,isBack,isAuthenticated}:StateTitleProps) => {



        const navigate = useNavigate(); //변수 할당시켜서 사용
        const onClickBtn = () => {
          navigate(-1); // 바로 이전 페이지로 이동, '/main' 등 직접 지정도 당연히 가능
        };



return (
    <div className={style.StateTitle__body}>
    <div className={style.StateTitle__body__fixed}>
    {
                isBack
                ?
                <div className={style.StateTitle__body__backTag} onClick={onClickBtn}>
                    <div className={style.StateTitle__body__backTag__container}>
                        <IoMdArrowBack></IoMdArrowBack>
                    </div>  
                </div> 
                :
                null
    }   
                    <div className={style.StateTitle__body__value}>
                    <AuthenticatedUserName username={state} isAuthenticated={isAuthenticated}></AuthenticatedUserName>
                </div>  
    </div>    
    </div>    
);
}



export default StateTitle;