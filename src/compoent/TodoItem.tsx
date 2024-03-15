import React, { useEffect,useContext,useState } from 'react';
import style from './pages/css/TodoItem.module.css'
import { FaRegComment } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import {TodosContext} from '../store/todo_context';
import { FaUserCircle } from "react-icons/fa";
import DefaultProfile from './compoentItem/DefaultProfile';
import axios from 'axios'
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineHeart,AiOutlineDelete } from "react-icons/ai";
import AuthenticatedUserName from './compoentItem/AuthenticatedUserName';

type TodoDetails = {
  commentId:string;
  // author:string;
  // arrayOfcomment?:string[];
  // text: string;
  // username:string;
  // profileImg:string;
  onDeleteTOdo:()=>void;
  userId:string;
  clickable?:boolean;
  context?:boolean;
  // like?:string[];
};

interface typeOfData{
  author:string;
  comments:string[];
  content:string;
  like:string[];
  profileImg:string;
  replies:string[];
  writer:string;
  _id:string;
  isAuthenticated:boolean;
}

interface typeOfuserData{
  username:string|null;
  profileImg:string|null;
  isAuthenticated:boolean;
}

interface typeOfComment {
  data:typeOfData
  type:string;
  isLiked:Boolean;
  userData:typeOfuserData
}

// for ( i = 0, i < 5, i++)

const TodoItem =({context,commentId,onDeleteTOdo,clickable,userId}:TodoDetails) => {
  const todoCtx = useContext(TodosContext);

  const [commentInfo,setCommentinfo] = useState<typeOfComment>()

  const getComentInfo = async(commentId:string)=>{
    const url = `https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/api/main/getCommentInfo/${commentId}`
    axios.get(url,{ withCredentials: true })
    .then((res) => {
        if(res.status === 200 && res){
            const result =  res.data.totalData
            if (result){
              setCommentinfo(result)
                return
            }else{
                console.log(result)
            }
          }else{
            alert('could not get reply info')
          }
     
         })
      .catch(e=>{
          throw e
      })
}

// useEffect(()=>{
//   if(commentInfo){
//     console.log('check',commentInfo!.data);
//   }
// },[commentInfo])


useEffect(()=>{
  getComentInfo(commentId);
},[todoCtx.RsgLogMsg,commentId,todoCtx.userInfo])
  // useEffect(()=>{
  //   if(commentId){
  //     getReply();
  //   }
  // },[])

  const sendLike = async(commentId:string)=>{
    console.log('sendLike excecuted')
    axios.post(`https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/api/main/like/${commentInfo!.type}/${commentId}`,commentId,{ withCredentials: true })
    .then((res) => {
      if(res && res.status === 200){
        return setCommentinfo(res.data.totalData)
      }
    })
    .catch((err) => {
      console.log('something Wrong')
    })
  }
  

  const handleOnDeleteTOdo= (e:React.MouseEvent)=>{
    e.preventDefault();
    todoCtx.sendFlexbox({isOpen:true,type:'Delete',DeleteFunction:onDeleteTOdo})
  }

  const handleOnreply = (e:React.MouseEvent)=>{
    e.preventDefault();
    todoCtx.sendFlexbox({isOpen:true,type:'Reply',value:{text:commentInfo!.data.content,profileImg:commentInfo!.data.profileImg,writer:commentInfo!.data.writer,commentId:commentId}})
  }

  const handleEdit= (e:React.MouseEvent)=>{
    e.preventDefault();
    todoCtx.sendFlexbox({isOpen:true,type:'Edit',value:{text:commentInfo!.data.content,profileImg:commentInfo!.data.profileImg,writer:commentInfo!.data.writer,commentId:commentId}})
  }

  const handleLike= async(e:React.MouseEvent)=>{
    e.preventDefault();
    await sendLike(commentId);
  }




return (
  commentInfo?.userData
  ?
  clickable 
  ? 
  <Link className={style.TodoItem__body} to={`/${commentInfo.userData.username}/status/${commentInfo.data._id}`}>
    
  <div className={`${style.TodoItem__body__container} ${context ? style.context : ''}`}>

      <Link className={style.TodoItem__body__img_container} to={`/${commentInfo.userData.username}`}>
        {
        commentInfo.userData.profileImg
        ?
        <img src={`https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/public/profileImg/${commentInfo.userData.profileImg}`}/>
        :
        <DefaultProfile/>
        }

      {context? <div className={style.TodoItem__body__img_container__contextLine}></div> :''}
      </Link>
     
      <div className={style.TodoItem__body__main_container}>
        <div className={style.TodoItem__body__main_container__username__Container}>
          <Link className={style.TodoItem__body__main_container__title} to={`/${commentInfo.userData.username}`}>
          {commentInfo.userData.username}
          </Link>
            <AuthenticatedUserName isAuthenticated={commentInfo.userData.isAuthenticated}/>

        </div>

        <div className={style.TodoItem__body__main_container__detail}>
          <h1>{commentInfo.data.content}</h1>
        </div>
      
        <div className={style.TodoItem__body__main_container__commentsAndEdit}>

          <div className={`${style.TodoItem__body__main_container__commentsAndEdit__tool__For__number} ${style.blue}`} onClick={handleOnreply}>
            <div className={style.TodoItem__body__main_container__commentsAndEdit__tool}>
                <FaRegComment/>
              </div>
              <div className={style.TodoItem__body__main_container__commentsAndEdit__tool__num}>
                <p>{commentInfo.data.comments?commentInfo.data.comments.length:commentInfo.data.replies.length}</p>
                </div>
          </div>
  

          <div className={`${style.TodoItem__body__main_container__commentsAndEdit__tool__For__number} ${style.red}`}>
            <div className={`${style.TodoItem__body__main_container__commentsAndEdit__tool} ${commentInfo.isLiked ? style.liked : ''}`} onClick={handleLike}>
              <AiOutlineHeart/>
            </div>
              <div className={style.TodoItem__body__main_container__commentsAndEdit__tool__num}>
                <p>{commentInfo.data.like?.length}</p>
              </div>
          </div>
          
          
          {userId === commentInfo.data.author ?  
          <>
          <div className={`${style.TodoItem__body__main_container__commentsAndEdit__tool}  ${style.yellow}`} onClick={handleEdit}>
          <FiEdit3></FiEdit3>
          </div>
          
          <div className={`${style.TodoItem__body__main_container__commentsAndEdit__tool}  ${style.purple}`} onClick={handleOnDeleteTOdo}>
                <AiOutlineDelete>delete</AiOutlineDelete>
          </div>
          </>
            : 
            <>
            <div className={style.TodoItem__body__main_container__commentsAndEdit__tool} onClick={handleEdit}>
    
          </div>
        
            <div className={style.TodoItem__body__main_container__commentsAndEdit__tool} onClick={handleOnDeleteTOdo}>
                
            </div>
            </>
          }
        </div>

      </div>
  </div>
  </Link>   
  :
  <div className={style.TodoItem__body}>
  <div className={style.TodoItem__body__container__post}>
          <div className={style.TodoItem__body__container__post__Profile}>
              <Link className={style.TodoItem__body__img_container} to={`/${commentInfo.userData.username}`}>
              {
              commentInfo.userData.profileImg
              ?
              <img src={`https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/public/profileImg/${commentInfo.userData.profileImg}`}/>
              :
              <DefaultProfile/>
              }
            </Link>
        
          <div className={style.TodoItem__body__main_container__post}>
    

            <Link className={style.TodoItem__body__main_container__title} to={`/${commentInfo.userData.username}`}>
            {commentInfo.userData.username}
            </Link>
            <AuthenticatedUserName isAuthenticated={commentInfo.data.isAuthenticated}/>

         </div>

          </div>


      <div className={style.TodoItem__body__main_container__detail__post}>
          <h1>{commentInfo.data.content}</h1>
        </div>

        <div className={style.TodoItem__body__main_container__commentsAndEdit}>

<div className={`${style.TodoItem__body__main_container__commentsAndEdit__tool__For__number} ${style.blue}`} onClick={handleOnreply}>
  <div className={style.TodoItem__body__main_container__commentsAndEdit__tool}>
      <FaRegComment/>
    </div>
    <div className={style.TodoItem__body__main_container__commentsAndEdit__tool__num}>
      <p>{commentInfo.data.comments?commentInfo.data.comments.length:commentInfo.data.replies.length}</p>
      </div>
</div>


<div className={`${style.TodoItem__body__main_container__commentsAndEdit__tool__For__number} ${style.red}`}>
  <div className={`${style.TodoItem__body__main_container__commentsAndEdit__tool} ${commentInfo.isLiked ? style.liked : ''}`} onClick={handleLike}>
    <AiOutlineHeart/>
  </div>
    <div className={style.TodoItem__body__main_container__commentsAndEdit__tool__num}>
      <p>{commentInfo.data.like?.length}</p>
    </div>
</div>


{userId === commentInfo.data.author ?  
<>
<div className={`${style.TodoItem__body__main_container__commentsAndEdit__tool}  ${style.yellow}`} onClick={handleEdit}>
<FiEdit3></FiEdit3>
</div>

<div className={`${style.TodoItem__body__main_container__commentsAndEdit__tool}  ${style.purple}`} onClick={handleOnDeleteTOdo}>
      <AiOutlineDelete>delete</AiOutlineDelete>
</div>
</>
  : 
  <>
  <div className={style.TodoItem__body__main_container__commentsAndEdit__tool} onClick={handleEdit}>

</div>

  <div className={style.TodoItem__body__main_container__commentsAndEdit__tool} onClick={handleOnDeleteTOdo}>
      
  </div>
  </>
}
</div>
  </div>
  </div> 

  :
  <div></div>
  
);
}



export default TodoItem;