import React, {ReactNode} from 'react';
import style from '../pages/css/DefaultProfile.module.css'
import { FaUserCircle } from "react-icons/fa";


const DefaultProfile =() => {


return (
    <div className={style.DefaultProfile}>
        <FaUserCircle></FaUserCircle>
    </div>
);
}



export default DefaultProfile;