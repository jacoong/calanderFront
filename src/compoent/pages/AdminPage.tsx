// import React, {ReactNode} from 'react';
// import style from '../pages/css/Button.module.css'
import axios from "axios";
import {useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import UserItem from '../compoentItem/UserItem';


interface typeOfuserList {
    username:string;
    profileImg:string;
    _id:string;
    isAuthenticated:boolean;
}


const AdminPage =() => {

const navigate = useNavigate();
const [userList, setUserList] = useState<typeOfuserList[]| undefined>([]);

const checkIsAdmin = async() =>{
 axios.get(`https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/isAdmin`,{ withCredentials: true })
 .then((res)=>{
    if(res && res.status === 200){
        navigate(res.data.redirect);
    }
 })
 .catch((err)=>{
    navigate('/')
 })
}

const getUserInfo = async() =>{
    axios.get(`https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/user/getUsers`)
    .then((res)=>{
        if(res && res.status === 200){
            setUserList(res.data.userInfo);
        }
    })
}

// const handleisAuthenticated = async() =>{

// }

useEffect(() => {
    const fetchData = async () => {
        await checkIsAdmin();
        getUserInfo();
    };
    fetchData();
}, []);

useEffect(()=>{
    console.log('thistie',userList)
},[userList])

return (
    <div>
        <div>
            {userList?.map((item:typeOfuserList)=>
                <UserItem username={item.username} id={item._id} profileImg={item.profileImg} renewAllComment={getUserInfo} isAuthenticated={item.isAuthenticated}></UserItem>
            )
            }
        </div>
    </div>
);
}



export default AdminPage;