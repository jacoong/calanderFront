import React, { useState,useEffect } from 'react';
import style from '.././pages/css/popupCalendar.module.css'



const PopupCalendar = () => {



  return(
        <div className={style.wrapper}>
            <header>
                <div className={style.nav}>
                    <button className="material-icons"> chevron_left </button>
                    <p className={style.currentDate}>September 2022</p>
                    <button className="material-icons"> chevron_right </button>
                </div>
            </header>
            <div className={style.calendar}>
                <ul className={style.weeks}>
                    <li>Sun</li>
                    <li>Mon</li>
                    <li>Tue</li>
                    <li>Wed</li>
                    <li>Thu</li>
                    <li>Fri</li>
                    <li>Sat</li>
                </ul>
                <ul className={style.days}>
                    {/* 일자들을 반복해서 출력 */}
                    {/* {[...Array(31).keys()].map((day) => (
                        <li key={day} className={day < 4 ? style.inactive : ''}>{day + 1}</li>
                    ))} */}
                </ul>
            </div>
        </div>
    );
};



export default PopupCalendar;


