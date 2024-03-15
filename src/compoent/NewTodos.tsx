import {useRef,useContext,useState} from 'react';
import {TodosContext} from '../store/todo_context'
import axios from "axios";
import Todo from '../model/Todo';
import style from './pages/css/NewTodos.module.css';
import DefaultProfile from './compoentItem/DefaultProfile';
import {typeOfSendTargetReply} from './compoentItem/FlexBox'
import Button from './compoentItem/Button';
// import {getCommentInfo} from './pages/PostPage'

      interface NewTodosProps {
        writer?: string | undefined | null;
        id?: string;
        userImg?: string ;
        handleUNsubmit?:(data:string)=> void;
        parentId?:string;
        reply?:string;
        sendInfo?:(data:any)=>void;
        type?:string ;
        preinfoComment?:typeOfSendTargetReply;
      }

    const NewTodos = ({preinfoComment,reply,sendInfo,parentId,handleUNsubmit,userImg}:NewTodosProps) => {



      const [keyboardValue,seTkeyboardValue] = useState(false);
  
    const todoCtx = useContext(TodosContext)
  
    
    const enteredRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let handleEnteredRef = enteredRef.current!.value

        if (handleEnteredRef.trim().length === 0){
            console.log('throw an error!!')
        }else{
          if(preinfoComment){
            todoCtx.editTodo(preinfoComment,handleEnteredRef);
          }
          else if(parentId&&reply){
            todoCtx.addTodo(handleEnteredRef,parentId,reply);
          }else if(parentId){
            const info = todoCtx.addTodo(handleEnteredRef,parentId,reply);
            if(sendInfo){
              sendInfo(info)
            }
          }
          else{
      
            todoCtx.addTodo(handleEnteredRef);            
          }
          enteredRef.current!.value = ""
          handleInput();
          if(handleUNsubmit){
            handleUNsubmit('complete');
          }
        }
    }

    const handleInput = () => {
      if (enteredRef.current?.value) {
        seTkeyboardValue(true)
        enteredRef.current.style.height = "auto"; // Reset the height
        enteredRef.current.style.height = `${enteredRef.current.scrollHeight}px`; // Set new height
      }else{
        seTkeyboardValue(false)
      }
    };

    return(
      <div className={style.NewTodos__body}>
      <div className={style.NewTodos__body__container}>
      <div className={style.NewTodos__body__img_container}>
        {userImg
        ?        <img src={`https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/public/profileImg/${userImg}`}/>
        :

        <DefaultProfile/>
        }
      </div>

      
          <div className={style.NewTodos__body__main_container}>
    
            {/* <div className={style.NewTodos__body__main_container__title}>
              <h1>{username}</h1>
            </div> */}
    
            <div className={style.NewTodos__body__main_container__detail}>
            <form onSubmit={handleSubmit}>
            {
            preinfoComment
            ?
            <textarea  onInput={handleInput}  ref={enteredRef} placeholder={preinfoComment.text} />
            :
            parentId 
            ? 
              <textarea  onInput={handleInput}  ref={enteredRef} placeholder="Post your Reply" />
             : <textarea  onInput={handleInput}   ref={enteredRef} placeholder="What is happening?!" 
             />}

            <div className={style.NewTodos__body__main_container__detail__button__container}>
            {keyboardValue
            ?
            <Button width={'small'}type="submit">Post</Button>
            :
            <Button width={'small'} Background_color={'b-gary'} disabled={true} type="submit">Post</Button>
            }
            </div>
             </form>
            </div>
    
            <div className={style.NewTodos__body__main_container__commentsAndEdit}>
          
            
            </div>
    
          </div>
      </div>
  
      </div> 
    );
    };



export default NewTodos;