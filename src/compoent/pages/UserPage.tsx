import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useEffect,useState,useRef,useContext } from 'react';
import StateTitle from '../pages/StateTitle'
import style from '../pages/css/UserPage.module.css'
import DefaultProfile from '../compoentItem/DefaultProfile'
import Button from '../compoentItem/Button';
import TodoItem from '../TodoItem';
import {TodosContext} from '../../store/todo_context'
import { PiCatBold } from "react-icons/pi";

function UserPage() {
    const SELECTEDVALUE = ['Post','Replies'];

    const navigate = useNavigate();
    const { username } = useParams();

    const savedData:any = localStorage.getItem('userDataKey'); 
    const userId = JSON.parse(savedData);
    const todoCtx = useContext(TodosContext)

    interface typeOfUserInfo {
        comments:string[],
        profileImg: string|undefined,
        backgroundImg?:string|undefined,
        username: string,
        Following:[],
        Follower:[],
        isAuthenticated:boolean
          }

      interface typeOfdata {
        userData:typeOfUserInfo,
        isFollower:Boolean,
        isOwner:Boolean
      }

      interface typeOfArrayType {
        author:string;
        content:string;
        like:string[];
        writer:string;
      }

    const [userInfo,setUserInfo] = useState<typeOfdata>()
    const [stateOfMenu,seTstateOfMenu] = useState<string>('Post')
    const [arrayOfPost,setArrayOfPost] = useState<typeOfArrayType[]>([])
    const [arrayOfReplies,setArrayOfReplies] = useState<typeOfArrayType[]>([])
    const [numberOfPost,setNumberOfPost] = useState<number>()
    const [skip, setSkip] = useState<number>(0)
    // const [numberOfFollow,setNumberOfFollow] = useState<typeOfFollow>()

    const TypeOfSelected = useRef<any>([]);


    const getUserPage = async()=>{
        const url = `https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/api/sendOPtions/${username}/${stateOfMenu}/${skip}`
        axios.get(url,{ withCredentials: true })
        .then((res) => {
            console.log('excicuted!')
            if(res.status === 200 && res){
                const result =  res.data.info
                const type =  res.data.type
                const numberOfArray =  res.data.numberOfArray
                if(type === 'Post'){
                    if (result){
                        console.log('여기에서 skip?' ,skip)
                        if(skip === 0){
                            setNumberOfPost(numberOfArray)
                            return setArrayOfPost(result)
                        }
                        setArrayOfPost(preArray => [...preArray,...result]);
                        setNumberOfPost(numberOfArray)
                    }else{
                        console.log('what happend?',result)
                    }
                }

                else if(type === 'Replies'){
                    if (result){
                        if(skip === 0){
                            setNumberOfPost(numberOfArray)
                            return setArrayOfReplies(result)
                        }
                        setArrayOfReplies(preArray => [...preArray,...result]);
                        setNumberOfPost(numberOfArray)
                    }else{
                        console.log(result)
                    }
                }
               }else{ 
               }
         
             })
             .catch(e=>{
                 throw e
             })
    }


    

        if(userInfo){
            getUserPage();
        }


        if(userInfo){
            getUserPage();
        }


    // useEffect(()=>{
    //     if(userInfo){
    //         setSkip(0)
    //     }
    // },[stateOfMenu])

    // useEffect(()=>{
    //     if(userInfo){
    //         getUserPage();
    //     }
    // },[todoCtx.items])


    // useEffect(()=>{
    //     if(arrayOfRepliesAndPost){
    //     setNumberOfPost(arrayOfRepliesAndPost.length)
    //     }else{
    //         return
    //     }
    // },[arrayOfRepliesAndPost])
    const getUpdatedApi = async(username:string|undefined)=>{
        const url = `https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/user/Follow/${username}`
        axios.get(url,{ withCredentials: true })
        .then((res) => {
            if(res.status === 200 && res){
                const result =  res.data.totalData
                if (result){
                    setUserInfo(result)
                    return
                }else{
                    navigate('/userNotFound404')
                }
               }else{
                 
               }
         
             })
             .catch(e=>{
                 throw e
             })
    }


        getUpdatedApi(username);


        


    // useEffect(()=>{
    //     getUpdatedApi(username);
    //     console.log('이거어때',todoCtx.userInfo);
    // },[todoCtx.callApi])

    const handleClickedData = async (num: number) => {
        if (TypeOfSelected.current[num]) {
            seTstateOfMenu(TypeOfSelected.current[num].textContent);
            setSkip(0);
        } else {
            console.log('Element not found');
        }
    }

    const deleteTodo =async()=>{
        await getUserPage();
    }

    // const editTodo =async()=>{
    //     await getUserPage();
    // }

    const handleFollow = async() =>{
        console.log('handleFollow excecuted')
        axios.post(`https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/user/Follow`,{ username: username },{ withCredentials: true })
        .then((res) => {
          if(res && res.status === 200){
            if(res.data){
                console.log(res.data.totalData)
                setUserInfo(res.data.totalData)
            }
          }
        })
        .catch((err) => {
          console.log('something Wrong')
        })
    }

    const handleEdit = async() =>{
        console.log('handleEdit excecuted')
        // todoCtx.sendFlexbox({isOpen:true,type:'Reply',value:{profileImg:'11',writer:'sefes',commentId:'sef'}})
        todoCtx.sendFlexbox({isOpen:true,type:'Edit profile',value:{profileImg:userInfo!.userData.profileImg, backgroundImg:userInfo!.userData.backgroundImg, text: "텍스트", writer: userInfo!.userData.username,commentId: "댓글 ID"}})
        // axios.post(`http://localhost:8001/user/Follow`,{ username: username },{ withCredentials: true })
        // .then((res) => {
        //   if(res && res.status === 200){
        //     if(res.data){
        //         console.log(res.data.totalData)
        //         setUserInfo(res.data.totalData)
        //     }
        //   }
        // })
        // .catch((err) => {
        //   console.log('something Wrong')
        // })
    }


    const handleScroll = (e:React.UIEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        const { offsetHeight, scrollTop, scrollHeight } = target;
        if (offsetHeight + scrollTop > scrollHeight-100) {
            if(stateOfMenu === 'Post'){
                console.log(arrayOfPost.length,'sefsefef')
                setSkip(arrayOfPost.length)
            }else{
                setSkip(arrayOfReplies.length)
            }
        }
      }

      useEffect(()=>{
        if(skip){
            getUserPage();
            console.log(skip,'skip')
        }
      },[skip])



      useEffect(()=>{
            console.log(arrayOfPost,'arrayOfPost')
      },[arrayOfPost])

      
      const valueOfData = stateOfMenu === 'Post'?arrayOfPost:arrayOfReplies;
    //   todoCtx.call

return(
    
        (userInfo
        ?
        <div className={style.UserPage__container} onScroll={handleScroll}>
        <StateTitle isAuthenticated={userInfo.userData.isAuthenticated} state={userInfo?.userData.username!} isBack={true}></StateTitle>
        <div className={style.UserPage__userBackGround}>
            {
                 userInfo.userData.backgroundImg
                 ?
                 <img alt={'dd'} src={`https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/public/backgroundImg/${userInfo.userData.backgroundImg}`}/>
                 :
                null
            }
        </div>
    
        <div className={style.UserPage__userContainer}>
    
            <div className={style.UserPage__userContainer__Top}>
    
                    <div className={style.UserPage__userContainer__Top__ProfileImgContainer}>
                            {
                            userInfo.userData.profileImg
                            ?
                            <img alt={'dd'} src={`https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/public/profileImg/${userInfo.userData.profileImg}`}/>
                            :
                            <DefaultProfile/>
                            }
                    </div>
    
                    <div className={style.UserPage__userContainer__Top__follow}>
                   
                    {
                        userInfo.isOwner
                        ?
                        <Button  handleClick={handleEdit} bolder='bold' width='large' Background_color='b-blue' >
                        <span>Edit</span>
                        </Button>
                        :
                        userInfo.isFollower
                        ?
                        <Button  handleClick={handleFollow} bolder='bold' width='large' Background_color='b-blue' >
                        <span>unFollow</span>
                        </Button>
                        :
                        <Button  handleClick={handleFollow} bolder='bold' width='large' Background_color='b-black' >
                        <span>Follow</span>
                        </Button>
                    }
                    </div>
    
    
            </div>
    
    
            <div className={style.UserPage__userContainer__Bottom}>
    
                <div className={style.UserPage__userContainer__Bottom__Username}>
                    <span>{userInfo!.userData.username}</span>
                </div>
                <div className={style.UserPage__userContainer__Bottom__FollowingOrEd}>
                    {stateOfMenu === 'Post'
                    ? 
                    <span>{numberOfPost}Posts</span>
                    :
                    <span>{numberOfPost}Replies</span>
                    }
                    <span>{(userInfo!.userData.Following || []).length}Following</span>
                    <span>{(userInfo!.userData.Follower || []).length}Followers</span>
                </div>
    
            </div>
    
            
        </div>
        
        <div className={style.UserPage__Category}>
            {SELECTEDVALUE.map((item, num) => 
                    <div className={style.UserPage__Category__item} key={`${num}aesindc`} onClick={() => handleClickedData(num)}>
                        <div ref={tp => TypeOfSelected.current[num] = tp} className={`${style.UserPage__Category__item__span} ${item === stateOfMenu ?style.selected: ''}`}>
                            <span >{item}</span>
                        </div>
                    </div>
            )}
        </div>


        <div className={style.UserPage__Area}>
        {numberOfPost
        ?
        valueOfData.map((item:any)=>
            <TodoItem 
            // arrayOfcomment={item.comments?item.comments:item.replies}
            commentId={item._id} 
            // author={item.author} 
            // text={item.content} 
            // username={item.writer} 
            // profileImg={item.profileImg} 
            userId={userId}
            onDeleteTOdo={async()=>{
                await todoCtx.deleteTodo(item._id);
                deleteTodo();
            }}

            clickable={true}
            />)
        
        :
        <div className={style.UserPage__NoContents}>
            <PiCatBold></PiCatBold>
            <p>No Comments or Replies</p>
        </div>
        }
        </div>

    
    
     
        </div>
        :
        <span>Loading</span>
        )

)
}

export default UserPage;