import axios from 'axios';
import { useEffect,useState,useContext } from 'react';
import TodoItem from '../TodoItem';
import {TodosContext} from '../../store/todo_context'
import style from '../pages/css/ReplyArea.module.css'
import {typeReplyComment} from '../pages/PostPage';

interface typeReplyArea {
    userinfo:string
    arrayOfComment:typeReplyComment[];
    commentId:string
}


interface  typereplycomment {
    _id:string,
    content:string,
    writer:string,
    author:string,
    profileImg:string,
    parentId?:string,
    replies:string[];
}



function ReplyArea({commentId,userinfo,arrayOfComment}:typeReplyArea) {
    const todoCtx = useContext(TodosContext)
    const [isLoading,setIsLoading] = useState<boolean>(true)


    // const getCommentInfo = async() =>{
    //     const res = await axios.get(`http://localhost:8001/api/main/reply/${Result}/${skip}` ,{ withCredentials: true })
    //     if(res.status === 200){
    //         const userInfo = res.data;
    //         console.log('peterLetgo',userInfo.data);
    //         const data = userInfo.data;
    //         const type = userInfo.type;
    
    //         if(type==='comment'){
    //           const replyInfo = data.comments;
    //           console.log(replyInfo,'오마에와')
    //           if(skip){
    //             return setReplyList(preArray => [...preArray, ... replyInfo]);
    //           }else{
    //           return setReplyList(replyInfo);
    //         }
    //         }
    //         else if(type==='reply'){
    //           const replyInfo = data.replies;
    //           console.log(replyInfo,'오마에와')
    //           if(skip){
    //           return setReplyList(preArray => [...preArray, ... replyInfo]);
    //         }else{
    //           return setReplyList(replyInfo);
    //         }
    //         }
    
    //     }else{
    //         alert('error while processing getCommentInfo')
    //     }
    // }
    
    const checkLoading = async()=>{
        let checkseed = todoCtx.ReplyList[todoCtx.ReplyList.length-1]?._id;
        if (checkseed=== undefined){
            if(arrayOfComment){
                const isLoad:boolean = arrayOfComment.length === 0;
                setIsLoading(isLoad);
                return
            }
        }
        console.log('check this!',todoCtx,arrayOfComment)
        if(arrayOfComment){
            setIsLoading(arrayOfComment.includes(checkseed))
        }else{
            return
        }
        
    }


    useEffect(()=>{
    },[isLoading ===false])

    // useEffect(()=>{  
    //     checkLoading();
    // },[todoCtx.ReplyList])

return(
    <div className={style.ReplyArea__body}>
        {
            isLoading
            ?
            arrayOfComment.map((comment:typeReplyComment) => 
                <TodoItem
                // arrayOfcomment={comment.replies}
                clickable={true}
                userId={comment.author}
                commentId ={comment._id}//
                // profileImg={comment.profileImg}//
                // author={comment.author}//
                // key={`key$aw${comment._id}es`}
                // text={comment.content}//
                // username={comment.writer}//
                onDeleteTOdo={todoCtx.deleteTodo.bind(null,comment._id,comment.parentId)}
            />
            )
            :
            <h1>Loading....</h1>
        }
    </div>
)
}

export default ReplyArea;