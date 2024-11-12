import {useRef,useContext,useState,useEffect} from 'react';
import {TodosContext} from '../store/todo_context'
import style from './pages/css/NewTodos.module.css';
import DefaultProfile from './compoentItem/DefaultProfile';
import {typeOfSendTargetReply} from './compoentItem/FlexBox'
import Button from './compoentItem/Button';
// import {getCommentInfo} from './pages/PostPage'

      interface NewTodosProps {
        height?:string;
        width?:string;
        valueOfParagraph:(value:string)=>void;
        descriptionValue:string|undefined;
      }

    const NewTodos = ({height='20px',valueOfParagraph,descriptionValue}:NewTodosProps) => {



      const [keyboardValue,seTkeyboardValue] = useState(false);
  
  
    
    const enteredRef = useRef<HTMLTextAreaElement>(null);






    const handleInput = () => {
      if (enteredRef.current) {
        valueOfParagraph(enteredRef.current?.value)
        enteredRef.current.style.height = height; // Reset the height to auto
        enteredRef.current.style.height = `${enteredRef.current.scrollHeight}px`; // Set new height based on scrollHeight
      }
    };
  
    // useEffect(() => {
    //   if (enteredRef.current) {
    //     enteredRef.current.style.height = height; // Set the initial height from props
    //   }
    // }, [height]);

    const inLinestyle ={height:height};

    return(
      <div className={style.NewTodos__body}>
      <div className={style.NewTodos__body__container}>


      
          <div className={style.NewTodos__body__main_container}>
            <div className={style.NewTodos__body__main_container__detail}>
            <textarea  value={descriptionValue} onInput={handleInput}  style={inLinestyle} ref={enteredRef} placeholder="What is happening?!" ></textarea>
            </div>
          </div>
      </div>
  
      </div> 
    );
    };



export default NewTodos;