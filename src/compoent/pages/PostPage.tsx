import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TodosContext } from "../../store/todo_context";
import { useEffect, useContext, useState } from "react";
import StateTitle from "./StateTitle";
import style from "./css/PostPage.module.css";
import TodoItem from "../../compoent/TodoItem";
import NewTodos from "../NewTodos";
import ReplyArea from "../compoentItem/ReplyArea";
import Loading from "../compoentItem/Loading";

interface typeCommentInfo {
  author: string;
  content: string;
  profileImg: string;
  writer: string;
  parentId?: string;
  _id: string;
  comments?: string[];
  replies?: string[];
  like?: string[];
}

interface typeuserInfo {
  email: string;
  profileImg: string;
  username: string;
  _id: string;
}

export interface typeReplyComment {
    author: string;
    _id: string;
    parentId:string;
}

function PostPage() {
  const todoCtx = useContext(TodosContext);
  const navigate = useNavigate();
  const { username, commentId } = useParams();
  console.log("11", username, commentId);
  const savedData: any = localStorage.getItem("userDataKey");
  const userId = JSON.parse(savedData);

  const [commentInfo, setCommentInfo] = useState<typeCommentInfo>();
  const [userinfo, setUserinfo] = useState<typeuserInfo>();
  const [replyComment, setReplyComment] = useState<typeReplyComment[]>([]);
  const [typeOfId, setTypeOfId] = useState<string>();
  const [typeOfParentPost, setTypeOfParentPost] = useState<any[]>();
  const [skip, setSkip] = useState<number>(0);
  const [isloading, setIsloading] = useState<boolean>(true);
  // type TodoDetails = {
  //     author:string
  //     text?: string;
  //     username:string;
  //     profileImg:string;
  //     onDeleteTOdo:()=>void;
  //     userId:string;
  //     clickable?:boolean;
  //   };



  const getParentInfo = async () => {
    if (commentInfo?.parentId) {
      const parentId = commentInfo!.parentId;
      const url = `https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/api/getParentInfo/${parentId}`;
      try {
        const res = await axios.get(url, { withCredentials: true });
        if (res.status === 200) {
          console.log("yeahhh22555ddd", res.data);
          setTypeOfParentPost(res.data.recommentArray);
        }
      } catch (err) {
        alert(err);
      }
    } else {
      return;
    }
  };

  const checkUser = async (url: string, username: string) => {
    const data = { input: username, type: "username" };
    axios
      .post(url, data, { withCredentials: true })
      .then((res) => {
        if (res.status === 200 && res) {
          const result = res.data.result;
          if (result) {
            console.log("good1!");
            return;
          } else {
            navigate("/userNotFound404");
          }
        } else {
          navigate("/userNotFound404");
        }
      })
      .catch((e) => {
        throw e;
      });
  };

  const checkCommentId = async (url: string, commentId: string) => {
    const data = { input: commentId, type: ["commentId", "replyId"] };
    // setTimeout(() => {
    axios.post(url, data, { withCredentials: true }).then((res) => {
      if (res.status === 200 && res) {
        const result = res.data.result;
        const info = res.data.info;
        const type = res.data.type;
        console.log("왜?", info);
        if (result) {
          setCommentInfo(info);
          setTypeOfId(type);
          return;
        } else {
          navigate("/userNotFound404");
        }
      } else {
        navigate("/userNotFound404");
      }
    });
// }, 3000); // 3초 뒤에 실행
  };

  // const reNewComment = async (url: string, commentId: string) => {
  //   const data = { input: commentId, type: ["commentId", "replyId"] };
  //   axios.post(url, data, { withCredentials: true }).then((res) => {
  //     if (res.status === 200 && res) {
  //       const result = res.data.result;
  //       const info = res.data.info;
  //       const type = res.data.type;
  //       console.log("왜?", info);
  //       if (result) {
  //         setCommentInfo(info);
  //         setTypeOfId(type);
  //         return;
  //       } else {
  //         navigate("/userNotFound404");
  //       }
  //     } else {
  //       navigate("/userNotFound404");
  //     }
  //   });
  // };

  const saveLoginUserInfo = async (userId: string) => {
    try {
      const res = await axios.get(`https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/user/main/${userId}`, {
        withCredentials: true,
      });
      if (res.status === 201) {
        const userInfo = res.data.userInfo;
        setUserinfo(userInfo);
      } else {
        alert("error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendInfo = (info: any) => {
    console.log(info, "111111");
    setReplyComment(info);
  };

  // useEffect(()=>{

  // },[typeOfParentPost])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const { offsetHeight, scrollTop, scrollHeight } = target;
    if (offsetHeight + scrollTop > scrollHeight - 100) {
      setSkip(todoCtx.ReplyList.length);
    }
  };

  const fetchComments = async () => {
    // setTimeout(async () => {
      if (commentInfo) {
        console.log("실행");
        await todoCtx.callApi(skip, commentInfo!._id);
      } else {
        return;
      }
    // }, 3000); // 3초 후에 실행
};



    if(commentId){
        const url = "https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/checkDb";
        (async () => {
          try {
            await checkUser(url, username!); // checkUser가 완료될 때까지 기다림
            await checkCommentId(url, commentId!); // 그 후에 checkAuthor를 실행하고 완료될 때까지 기다림
            await saveLoginUserInfo(userId); // 그 후에 checkAuthor를 실행하고 완료될 때까지 기다림
            console.log('wosss')
          } catch (e) {
            console.error(e);
          }
        })();
      }




    if(commentInfo){
        if(typeOfId === "reply"){
            getParentInfo();
        }
        fetchComments();
    }



    if (commentId) {
      checkCommentId("https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/checkDb", commentId);
    }


  useEffect(() => {
    console.log('gmast2',todoCtx.ReplyList)
    setReplyComment(todoCtx.ReplyList)
    setIsloading(true)
  }, [todoCtx.ReplyList]);


    if (skip) {
      setIsloading(false);
      setTimeout(async () => {
        fetchComments();
      },2000); // need to delete in real project.

    }



  useEffect(()=>{
    console.log(replyComment,'감스트');
  },[replyComment])

  return (
    <div className={style.PostPage__body} onScroll={handleScroll}>
      <StateTitle isAuthenticated={false} state={"Post"} isBack={true}></StateTitle>

      <>
        {typeOfParentPost
          ? typeOfParentPost!.map((item) =>
              item._id === commentInfo?._id ? null : (
                <TodoItem
                  // like={item.like}
                  // arrayOfcomment={item.comments?item.comments:item.replies}
                  commentId={item._id}
                  context={true}
                  onDeleteTOdo={todoCtx.deleteTodo.bind(null, item._id)}
                  userId={userId}
                  // username={item.writer} text={item.content} author={item.author} profileImg={item.profileImg}
                  clickable={true}
                />
              )
            )
          : ""}
      </>

      {commentInfo && userinfo ? (
        <>
          <TodoItem
            // like={commentInfo.like}
            // arrayOfcomment={todoCtx.ReplyList}
            commentId={commentInfo._id}
            onDeleteTOdo={todoCtx.deleteTodo.bind(null, commentInfo._id)}
            userId={userId}
            //  username={commentInfo.writer} text={commentInfo.content} author={commentInfo.author} profileImg={commentInfo.profileImg}
            clickable={false}
          />
          <NewTodos
            type={typeOfId}
            sendInfo={sendInfo}
            writer={userinfo.username}
            userImg={userinfo.profileImg}
            id={userinfo._id}
            parentId={commentId}
          ></NewTodos>
          <ReplyArea
            commentId={commentId!} 
            arrayOfComment={
              commentInfo ? replyComment : []
            }
            userinfo={userinfo._id}
          ></ReplyArea>
          {isloading ? null : <Loading></Loading>}
        </>
      ) : (
        <Loading></Loading>
      )}
    </div>
  );
}

export default PostPage;
