import React, { ReactNode,useState,createContext } from 'react';
import axios, { AxiosResponse }  from "axios";
import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import {CalendarContextType} from './types'


export interface UserType {
  email: string;
  password:string;
  nickName: string|null;
  profileImg: string;
  backgroundImg:string;
  isAuthenticated:boolean;
}


type ViewType = CalendarContextType['viewType'];

export interface typeAction {
  isOpen?:any;
  type:string|null;
  value?:any;
}

type TodosContextObj = {
  handleLogOut: () => void;
  handleAuthenticationUpdate:(role:string,numberOfArray:string)=> any;
  ErrorMsg:any;
  unAuthenticateUser: (referer:string) => any;
  sendFlexbox: (data:any) => void;
  openAndType:any;
  serverUrl:string;
  callCalendarDataApi:()=>void;
  onSelectDay:(date: Date, type:ViewType) => void;
  selectedDate: Date | null;
  updateViewType:(viewType:ViewType)=>void;
};

const initialUserInfo = {
  _id:'',
  email:'',
  password:'',
  username:null,
  __v:0 
}


export const TodosContext = createContext<TodosContextObj>(
    {
      handleAuthenticationUpdate:()=>{},
        handleLogOut: ()=>{},
        ErrorMsg:{},
        unAuthenticateUser:() => {},
        sendFlexbox: () => {},
        openAndType:  {type:null,value:null},
        serverUrl:'',
        callCalendarDataApi:()=>{},
        onSelectDay: ()=>{},
        selectedDate: null,
        updateViewType:()=>{}
    }
)




const TodosContextProvider = ({ children }: {children: ReactNode}) => {

  const SERVERURL = process.env.REACT_APP_SERVER_URL as string;
  const [ErrorMsg,setErrorMsg] = useState<any>()
  const [AuthenticationUpdate,setAuthenticationUpdate] = useState<any>()
  const [RsgLogMsg,setRsgLogMsg] = useState<string>('')
  const [openAndType,setOpenAndType] = useState<any>({type:null,value:null});
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);


  const navigate = useNavigate();


  // useEffect(()=>{
  //   reLoadUserInfo();
  // },[]);








  useEffect(()=>{
    setTimeout(() => {
      setRsgLogMsg('');
    }, 3000);
  },[RsgLogMsg])

  const sendFlexbox = async (typeOfpopUp:any) => {
    console.log('sendFlexbox executed')
    setOpenAndType(typeOfpopUp);
  };

  const unAuthenticateUser = async (previousUrl:string) => {
    console.log('unAuthenticateUser executed');
    localStorage.setItem('previousUrl', previousUrl);
    navigate('/');
    sendFlexbox({type:'Login',value:null})
  };



  const callCalendarDataApi = async () => {
    console.log('callCalendarDataApi Run')
  };


  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };


  const onSelectDay = (date: Date, type:ViewType) => {
    // setSelectedDate(date)
    if(isSameDay(date, new Date())){
          const viewTypeValue = `/${type}`;
          navigate(`/main${viewTypeValue}`)
        return
    }
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // getMonth() returns 0-11, so add 1
      const day = date.getDate();
      const dateSegment = `/main/${type}/${year}/${month}/${day}`;
      // const newUrl = window.location.pathname.replace(/\/(day|week|month)\/\d{4}\/\d{1,2}\/\d{1,2}/, '') + dateSegment;
    //  window.history.pushState({ path: newUrl }, '', newUrl);
    navigate(dateSegment)
     return

    // else{
    //   setViewType(type);
    //   const year = date.getFullYear();
    //   const month = date.getMonth() + 1; // getMonth() returns 0-11, so add 1
    //   const day = date.getDate();
    //   const dateSegment = `/main/${type}/${year}/${month}/${day}`;
    //   const newUrl = window.location.pathname.replace(/\/(day|week|month)\/\d{4}\/\d{1,2}\/\d{1,2}/, '') + dateSegment;
    //   navigate(dateSegment)
    // }
  };
  
  const updateViewType = (viewType:ViewType) =>{
    // const currentUrl = window.location.pathname;
    // if(selectedDate === null){
    //   const newUrl = currentUrl.replace(/\/(day|week|month)\//, `/${viewType}/`);
    //   navigate(newUrl);
    // }else{
      // const newUrl = currentUrl.replace(/\/(day|week|month)\//, `/${viewType}/`);
      // navigate(newUrl);
    // }
  }



  const handleLogOut = async() => (
  axios.get('https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/user/logOut')
  .then((response) => {
    console.log(response);
    if(response.data.message === "logout successful"){
      localStorage.clear();
      return navigate('/');
    }else{
      console.log('logout falied')
    }
  })
  .catch((err) => {
    ErrorMessage(err.response.data);
  }))

  const sendRegisterUser = async(user:UserType) =>(
    axios.post(`${SERVERURL}/api/auth/signUp`,user,{ withCredentials: true })
    .then((response) => {
      console.log('processing register data')

        if(response.status === 200){
          console.log('esfse');
          // sendLoginUser(user);
          alert(response.data.message)
        }
    })
    .catch((err) => {
      ErrorMessage(err);
    })
  )




    const ErrorMessage = (data:object) =>{
      console.log(data)
      setErrorMsg(data)
    }
   


  



    const handleAuthenticationUpdate = (role:string,numberOfArray:string) => {
      setAuthenticationUpdate({'role':role,'numberOfArray':numberOfArray})
      return
  }



    const contextValue: TodosContextObj = {
        ErrorMsg: ErrorMsg,
        handleAuthenticationUpdate:handleAuthenticationUpdate,
        handleLogOut:handleLogOut,
        unAuthenticateUser:unAuthenticateUser,
        openAndType:openAndType,
        sendFlexbox:sendFlexbox,
        serverUrl:process.env.REACT_APP_SERVER_URL as string,
        callCalendarDataApi:callCalendarDataApi,
        onSelectDay:onSelectDay,
        selectedDate:selectedDate, 
        updateViewType:updateViewType
      };

      return (
        <TodosContext.Provider value={contextValue}>
          {children}
        </TodosContext.Provider>
      );
}


export default TodosContextProvider;