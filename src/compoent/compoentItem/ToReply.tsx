import React, {useContext } from 'react';
import style from '../pages/css/TodoItem.module.css'
import {TodosContext,UserType} from '../../store/todo_context';
import { Link } from 'react-router-dom';
import DefaultProfile from './DefaultProfile';
import {typeOfSendTargetReply} from './FlexBox'


interface ToReplyProps {
  sendTargetReply: typeOfSendTargetReply;
  userInfo:UserType;
}

const ToReply =({sendTargetReply,userInfo}:ToReplyProps) => {



return (
    <div className={style.TodoItem__body}>
    <div className={`${style.TodoItem__body__container}`}>

        <div className={style.TodoItem__body__img_container}>
        {
          userInfo?.profileImg
          ?
          <img src={`https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/public/profileImg/${userInfo?.profileImg}`}/>
          :
          <DefaultProfile/>
          }
        </div>
       
        <div className={style.TodoItem__body__main_container}>

            <div className={`${style.TodoItem__body__main_container__title}${style.ToReply}`}>
            {userInfo?.username}
            </div>
  
          <div className={style.TodoItem__body__main_container__detail}>
            <h1>{sendTargetReply?.text}</h1>
          </div>
  
        </div>
    </div>
    </div>   

  
);
}



export default ToReply;