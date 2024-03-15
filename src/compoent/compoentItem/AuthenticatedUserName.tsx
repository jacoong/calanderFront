import React, {ReactNode} from 'react';
import { PiSealCheckFill } from "react-icons/pi";
import style from '../pages/css/AuthenticatedUserName.module.css'
type typeOfAuthenticated = {
    username?:string;
    isAuthenticated:boolean;
};


const AuthenticatedUserName =({username,isAuthenticated}:typeOfAuthenticated) => {


return (
    <div className={style.AuthenticatedUserName__container}>
    {isAuthenticated
    ?
    <>
    <div>
    <p className={style.AuthenticatedUserName__container__username}>{username}</p>
    </div>
    <div>
    <PiSealCheckFill></PiSealCheckFill>
    </div>
    </>
    :
    <p className={style.AuthenticatedUserName__container__username}>{username}</p>
    }
    </div>
);
}



export default AuthenticatedUserName;