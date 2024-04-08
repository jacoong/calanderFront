import StateTitle from './StateTitle'
import NewTodos from '../NewTodos'
import Todos from '../Todos'
import Loading from '../compoentItem/Loading'
import Button from '../compoentItem/Button'
import {useContext,useEffect,useState} from 'react';
import {TodosContext,UserType} from '../../store/todo_context'
import axios from 'axios'



function MainPage() {
    const todoCtx = useContext(TodosContext);
    // const savedData:any = localStorage.getItem('userDataKey'); 
    // const userId = JSON.parse(savedData);

    const [userInfo,setUserInfo] = useState<any>()
    const [isloaded,setIsloaded] = useState<boolean>(true)

    // const [skip, setSkip] = useState<number>(0)


        // const  = async(userId:string) =>{
      
        // const res = await axios.patch(`${todoCtx.serverUrl}/api/auth/login` ,{ withCredentials: true });


    //       console.log('좋은술1');
    //       getUserInfo(userId);
    

    //     const handleScroll = (e:React.UIEvent<HTMLDivElement>) => {
    //       const target = e.target as HTMLElement;
    //       const { offsetHeight, scrollTop, scrollHeight } = target;
    //       if (offsetHeight + scrollTop > scrollHeight-180) {
    //         setSkip(todoCtx.items.length)
    //       }
    //     }


        // useEffect(()=>{
        //   if(userInfo){
        //     console.log('userInfo',userInfo);
            
        //     if(userInfo.nickName === null){
        //       todoCtx.sendFlexbox({isOpen:true,type:'username'})
        //     }
        //   }
        // },[userInfo])

    //     useEffect(()=>{
    //       console.log('좋은술3');
    //       if(todoCtx.items.length>0){
    //         setIsloading(true);
    //         console.log('you did it',todoCtx.items)
    //       }else{
    //         return
    //       }
    //     },[todoCtx.items])


    const handleClick = () =>{
      todoCtx.sendFlexbox({isOpen:true,type:'updatePassword'})
    }


return(
  isloaded
  ?
  <div>
    <h1>Main Page</h1>
  </div>
  :
  null
)
}

export default MainPage;