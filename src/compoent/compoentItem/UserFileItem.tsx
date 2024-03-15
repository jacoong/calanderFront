import style from '../pages/css/TodoItem.module.css';
import DefaultProfile from '../compoentItem/DefaultProfile';
import { PiSealCheckFill } from "react-icons/pi";
import AuthenticatedUserName from './AuthenticatedUserName';

interface typeOfUserFileItem {
    profileImg:string,
    username:string|null,
    content?:string,
    mail?:string
    isAuthenticated?:boolean
}



const UserFileItem =({profileImg,username,content,mail,isAuthenticated}:typeOfUserFileItem) => {


return (

<>
<div className={style.TodoItem__body__img_container}>
  {
  profileImg
  ?
  <img src={`https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/public/profileImg/${profileImg}`}/>
  :
  <DefaultProfile/>
  }

</div>

<div className={style.TodoItem__body__main_container}>

    <div className={style.TodoItem__body__main_container__title}>
    <AuthenticatedUserName username={username!} isAuthenticated={isAuthenticated!}/>
    </div>
    <div className={style.TodoItem__body__main_container__mail}>
    {mail}
    </div>
  
  {/* <div className={style.TodoItem__body__main_container__detail}>
    <h1>{content}</h1>
  </div> */}
  </div>
  </>
)
}

export default UserFileItem;