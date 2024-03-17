import {useContext,useState} from 'react';
import {TodosContext} from '../../store/todo_context'
import style from '../pages/css/FlashMessage.module.css'


interface aaaaa{
    handleOnclick?:(result:string)=>void
}

const FlashMessage = ({handleOnclick}:aaaaa) => {
  const todoCtx = useContext(TodosContext)

  const isShowed =false

//   useEffect(()=>{
//     console.log('악착같은',todoCtx.RsgLogMsg);
//     if(todoCtx.RsgLogMsg === ''){
//         setIsShowed(false);
//         console.log('??')
//     }else{
//         setIsShowed(true)
//         console.log(todoCtx.RsgLogMsg)
//     }

//   },[todoCtx.RsgLogMsg])

//   useEffect(() => {
//     if(isShowed){
//         if(todoCtx.RsgLogMsg){
//             if(handleOnclick){
//                 handleOnclick!(todoCtx.RsgLogMsg);
//             }
//             else{
                
//             }
//         }else{
//             return
//         }
//     }
//   }, [isShowed]);


  return(
        isShowed 
        ?
        <div className={style.container}>
            <div className={style.container__msgBox}>
            <p>{todoCtx.RsgLogMsg}</p>
            </div>
        </div>
        :
        null
  )
};



export default FlashMessage;