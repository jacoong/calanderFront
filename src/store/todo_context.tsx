import React, { ReactNode,useState,createContext } from 'react';
import axios, { AxiosResponse }  from "axios";
import Todo from '../model/Todo';
import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import {typeOfSendTargetReply} from '../compoent/compoentItem/FlexBox'



export interface UserType {
  email: string;
  password:string;
  username: string|null;
  profileImg: string;
  backgroundImg:string;
  isAuthenticated:boolean;
}


// type typeUserInfo = {
//     _id: string,
//     email: string,
//     password: string,
//     username: null|string,
//     __v: number
// }

interface typeCommentInfo {
  author:string;
  content:string;
  profileImg:string;
  writer:string;
  parentId?:string;
  _id:string;
  comments?:string[];
  replies?:string[];
}

export interface typeAction {
  isOpen:boolean;
  type:string|null;
  DeleteFunction?():void;
  value?:typeOfSendTargetReply;
}

type TodosContextObj = {
  items: Todo[];
  ReplyList:any[];
  addTodo: (text: string,parentId?:string,commentId?:string) => void;
  RegisterOrLogin: (type:string,user:UserType) => void;
  deleteTodo: (commentId:string,parentId?:string) => void;
  handleLogOut: () => void;
  ErrorMsg:any;
  callApi: (skip:number,userId?:string) => any;
  userInfo:any;
  RsgLogMsg:string;
  sendFlexbox: (data:typeAction) => void;
  openAndType:typeAction;
  editTodo:(data:typeOfSendTargetReply,updatedEdit:string) =>void;
  getUpdatedApi:(usename:string|undefined) => Promise<AxiosResponse>;
  reLoadUserInfo:()=>void;
  serverUrl:string;
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
        items:[],
        ReplyList:[],
        addTodo: ()=>{},
        RegisterOrLogin: ()=>{},
        deleteTodo: ()=>{},
        handleLogOut: ()=>{},
        ErrorMsg:{},
        callApi:() => {},
        userInfo:initialUserInfo,
        RsgLogMsg:'',
        sendFlexbox: () => {},
        openAndType:  {isOpen:false,type:null},
        editTodo:()=>{},
        getUpdatedApi: () => new Promise((resolve, reject) => {}),
        reLoadUserInfo:()=>{},
        serverUrl:''
    }
)




const TodosContextProvider = ({ children }: {children: ReactNode}) => {

  const SERVERURL = process.env.REACT_APP_SERVER_URL as string;
  const [TodosLists,setTodos] = useState<Todo[]>([]);
  const [ReplyList,setReplyList] = useState<typeCommentInfo[]>([]); //should touch
  const [userInfo,setUserInfo] = useState(null)
  const [ErrorMsg,setErrorMsg] = useState<any>()
  const [RsgLogMsg,setRsgLogMsg] = useState<string>('')
  const [openAndType,setOpenAndType] = useState<typeAction>({isOpen:false,type:null});

  const navigate = useNavigate();


  useEffect(()=>{
    reLoadUserInfo();
  },[]);

  const reLoadUserInfo =async()=>{
    console.log('reLoadUserInfo 실행');
    const savedData:any = localStorage.getItem('userDataKey');
    if (savedData && savedData !== 'undefined') {
      const userId = JSON.parse(savedData);
      const loadUserInfo = async () => {
        try {
          const userData = await callUserApi(userId);
          console.log('wpqkf',userData);
          setUserInfo(userData);
        } catch (error) {
          // Handle error here
        }
      };
      loadUserInfo();
    }else{
      await getSessionInfo();
    }
  }


  const  getSessionInfo =async()=>{
    const res = await axios.get(`https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/user/getSession/userinfo` ,{ withCredentials: true })
    if(res.status === 201){
      const userInfo = res.data.userInfo;
      setUserInfo(userInfo);
      localStorage.setItem('userDataKey', JSON.stringify(userInfo._id));
        navigate('/main');}
    else if(res.status === 200){
      return console.log('no session data of user')
    }else{
      alert('error when getSessionInfo function');
    }
  }


  useEffect(()=>{
    setTimeout(() => {
      setRsgLogMsg('');
    }, 3000);
  },[RsgLogMsg])

  const sendFlexbox = async (typeOfpopUp:typeAction) => {
    console.log('sendFlexbox executed')
    setOpenAndType(typeOfpopUp);
  };

  const callApi = async (skip:number,dataId?:string) => {
    console.log('callApi executed')

    if(dataId){
      return await getCommentInfo(dataId,skip);
    }
    return await callCommentApi(skip);

  };

  const getCommentInfo = async(Id:string,skip?:number,commentId?:string) => {

    try {
      console.log('please!!',Id ,skip, commentId)
        let Result
          if(commentId){
            Result = commentId;
          } else{
            Result = Id;
          }
    const res = await axios.get(`https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/api/main/reply/${Result}/${skip}` ,{ withCredentials: true })
    if(res.status === 200){
        const userInfo = res.data;
        console.log('peterLetgo',userInfo.data);
        const data = userInfo.data;
        const type = userInfo.type;

        if(type==='comment'){
          const replyInfo = data.comments;
          console.log(replyInfo,'오마에와')
          if(skip){
            return setReplyList(preArray => [...preArray,...replyInfo]);
          }else{
          return setReplyList(replyInfo);
        }
        }
        else if(type==='reply'){
          const replyInfo = data.replies;
          console.log('replyInfo')
          if(skip){
          return setReplyList(preArray => [...preArray,...replyInfo]);
        }else{
          return setReplyList(replyInfo);
        }
        }

    }else{
        alert('error while processing getCommentInfo')
    }

    }catch(err){
        console.log(err)
    }

}

  const callCommentApi = async (skip?:number) => {
    console.log(`comment callApi executed/${skip}`)
    // setTimeout(async () => {
    return axios.get(`https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/api/main/${skip}`)
    .then((res) => {
      if(res){
        console.log('check1',res.data); //[....]
        const infoarray:Todo[]= res.data;
        if(skip){
          return setTodos(preArray => [...preArray,...infoarray].map((item:Todo) => new Todo(item._id)));
        }else{
          return setTodos(infoarray.map((item:Todo) => new Todo(item._id)));
        }
      }
    })
    .catch((err) => {
      ErrorMessage(err.response.data);     
    })
  // }, 5000);
  };



  const callUserApi = async (userId:string) => {
    console.log('user callApi executed')

    return axios.get(`https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/user/main/${userId}`)
    .then((res) => {
      if(res){
        const userData =res.data;
        console.log('thisisis',userData.username);
        console.log('call userApi after updated!')
        return userData
      }
    })
    .catch((err) => {
      ErrorMessage(err.response.data);
    })
  };
  const newDateforDb = async(todoText:string) =>(
    axios.post(`https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/api/main`,{
      todoText:todoText
    })
    .then((res) => {
      if(res.status===200){
      setRsgLogMsg(res.data.message)
      }else if(res.status===401){
        setRsgLogMsg(res.data.message)
        //  window.location.href = res.data.redirect; // '/'로 리다이렉트
        
      }
      console.log('갈게')
      callCommentApi()
      .then(()=>{
        console.log('sucess from updated data from backend')
      })
      .catch((err)=>{
        console.log('error from updated data from backend',err)
      })
    })
    .catch((err) => {
      ErrorMessage(err.response.data);
    })
  )
  const newReplyCommentforDb = async(todoText:string,parentId:string,commentId?:string) =>(
    new Promise<void>((resolve,reject)=>{
      axios.post(`https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/api/main/reply`,{
        todoText:todoText,
        parentId:parentId,
      })
      .then((res) => {
        if(res.status===200){
        resolve();
        setRsgLogMsg(res.data.message);
        }else if(res.status===401){
        reject();
        setRsgLogMsg(res.data.message);
        }
        // callCommentApi();
        getCommentInfo(parentId!,undefined,commentId)
        .then(()=>{
          console.log('sucess from updated data from backend')
        })
        .catch((err)=>{
          console.log('error from updated data from backend',err)
        })
      })
      .catch((err) => {
        ErrorMessage(err.response.data);
      })
    })
  )
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
  const sendLoginUser = async(user:UserType) =>(
    axios.post(`${SERVERURL}/api/auth/login`,user)
    .then((response) => {
      if(response.status === 200){
        alert(response.data.message)
        // const userInfo = response.data.userInfo
        // localStorage.setItem('userDataKey', JSON.stringify(userInfo._id));
        // console.log('important',userInfo);
        // setUserInfo(userInfo);
        //   navigate('/main');
      }
      // else if(response.status === 201){
      //   return setRsgLogMsg(response.data);
      // }
    })
    .catch((err) => {
      ErrorMessage(err);
    })
  )

  const sendRecreatePassword = async(user:UserType) =>{
    // axios.post('https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/user/register',user)
    // .then((response) => {
    //   console.log('processing register data')
    //     if(response.status === 200){
    //       sendLoginUser(user);
    //       console.log('successful automatic Login')
    //     }
    // })
    // .catch((err) => {
    //   ErrorMessage(err.response.data);
    // })
    const data = user;
    return data
  }


  const deleteDateforDb = async(commentid:string,parentId?:string) =>(
      new Promise<void>((resolve, reject)=>{
      axios.delete(`https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/api/main/${commentid}`)
      .then((res) => {
        if(res.status === 200){
          const type = (res.data.type)
          if(type){
            resolve()
          }else{
            reject()
          }
          if(type === 'reply'){
              getCommentInfo(parentId!,0) // id from 
              .then(()=>{
                return setRsgLogMsg(res.data.message);
              })
              .catch((err)=>{
                console.log('failed from updated data from backend',err)
              }
  
              )
            }
          else{
              callCommentApi()
              .then(()=>{
                console.log('sucess from updated data from backend')
              })
              .catch((err)=>{
                console.log('failed from updated data from backend',err)
              })
          }
          return setRsgLogMsg(res.data.message);
        }
        else if(res.status === 401){
          return setRsgLogMsg(res.data.message);
        }
      })
      .catch((err) => {
        ErrorMessage(err);
      })
    })
  )
    const ErrorMessage = (data:object) =>{
      console.log(data)
      setErrorMsg(data)
    }
    const editTodo = async(data:typeOfSendTargetReply,updateText:string) => {
      new Promise<void>((resolve, reject)=>{
        axios.patch(`https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/api/main/edit/${data.commentId}`, {updateText})
        .then((res) => {
          if(res.status === 200){
            const type = (res.data.type)
            if(type){
              resolve()
            }else{
              reject()
            }
            if(type === 'reply'){
                const parentId = res.data.parentId;
                getCommentInfo(parentId!,0) // id from 
                .then(()=>{
                  return setRsgLogMsg(res.data.message);
                })
                .catch((err)=>{
                  console.log('failed from updated data from backend',err)
                }
    
                )
              }
            else{
                callCommentApi()
                .then(()=>{
                  console.log('sucess from updated data from backend')
                })
                .catch((err)=>{
                  console.log('failed from updated data from backend',err)
                })
            }
            return setRsgLogMsg(res.data.message);
          }
          else if(res.status === 401){
            return setRsgLogMsg(res.data.message);
          }
        })
        .catch((err) => {
          ErrorMessage(err);
        })
      })
    }
    const addHandleTodo = async(todoText:string,parentId?:string,commentId?:string) => {
        console.log('addhandletodo');
        if(parentId){
          await newReplyCommentforDb(todoText,parentId,commentId)
        }else{
          await newDateforDb(todoText)
        }
    }

    const RegisterOrLogin = async(type:string,user:UserType) => {
      if(type==="Register"){
        console.log(user,'one step more')
        await sendRegisterUser(user)
      }else if(type ==="Login"){
        await sendLoginUser(user)
      }else if(type ==='RecreatePassword'){
        await sendRecreatePassword(user)
      }else{
        return
      }
  }
  
    const deleteTodo = async(commentId:string,parentId?:string) => {
        console.log('deleteDateforDb')
        console.log(commentId,parentId)
        if(parentId){
          await deleteDateforDb(commentId,parentId!)
        }else{
          await deleteDateforDb(commentId)
        }
    }


  const getUpdatedApi = async(username:string|undefined)=>{
    const url = `https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/user/Follow/${username}`
    // axios.get()의 결과를 반환합니다.
    return axios.get(url,{ withCredentials: true });
}

    useEffect(()=>{
      console.log('TodosLists',TodosLists)
    },[TodosLists])

    const contextValue: TodosContextObj = {
        items: TodosLists,
        ReplyList:ReplyList,
        addTodo: addHandleTodo,
        deleteTodo: deleteTodo,
        ErrorMsg: ErrorMsg,
        RegisterOrLogin:RegisterOrLogin,
        handleLogOut:handleLogOut,
        callApi:callApi,
        userInfo:userInfo,
        RsgLogMsg:RsgLogMsg,
        openAndType:openAndType,
        sendFlexbox:sendFlexbox,
        editTodo:editTodo,
        getUpdatedApi:getUpdatedApi,
        reLoadUserInfo:reLoadUserInfo,
        serverUrl:process.env.REACT_APP_SERVER_URL as string
      };

      return (
        <TodosContext.Provider value={contextValue}>
          {children}
        </TodosContext.Provider>
      );
}


export default TodosContextProvider;