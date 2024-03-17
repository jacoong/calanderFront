import style from '../pages/css/UserItem.module.css'
import axios from "axios";

interface typeOfuserList {
    username:string;
    profileImg:string;
    id:string;
    isAuthenticated:boolean;
    renewAllComment():void;
}


const UserItem =({username,profileImg,id,isAuthenticated,renewAllComment}:typeOfuserList) => {


const handleToggle = () =>{
    axios.patch(`https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/user/Authenticated`,{id:id},{ withCredentials: true })
    .then((res)=>{
        if(res && res.status === 200){
            renewAllComment();
        }else{
            console.log('nope')
        }
    })
}



return (
    <div>
        <div>
            <div>
                {username}
            </div>
            <div >
                <label className={style.switch}>
                <input type="checkbox" checked={isAuthenticated} onClick={handleToggle}/>
                <span className={`${style.switch__slider} ${style.switch__round}`}></span>
                </label>
                {
                    isAuthenticated
                    ?
                    <p className={style.switch__ON}>ON</p>
                    :
                    <p>OFF</p>
                }
            </div>
        </div>
    </div>
);
}



export default UserItem;