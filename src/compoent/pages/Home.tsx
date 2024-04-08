
import {useContext,useEffect} from 'react';
import {TodosContext} from '../../store/todo_context'
import style from './css/Home.module.css';
import FlexBox from '../compoentItem/FlexBox'
import JoinForm from '../compoentItem/JoinForm';
import {getCookie} from '../../store/coockie'
import { useNavigate } from 'react-router-dom';

function Home() {
  const todoCtx = useContext(TodosContext);
  const navigate = useNavigate();
      // interface typeAction {
      //   isOpen:boolean;
      //   type:string|null
      // }


      // const [openAndType,setOpenAndType] = useState<typeAction>({isOpen:false,type:null});
      // const [Login,setLogin] = useState(false);
      // const [closed,setClosed] = useState(false);


      // const savedData:any = localStorage.getItem('userDataKey'); 
      // function JoinOrLoginReducer(oldState:any,action:typeAction){
      //   if (action.isOpen){
      //     if(action.type==='MakeAcount'){
            
      //     }
      //     if(action.type==='Login'){
           
      //     }
      //   }else{

      //   }
      // }

      // const [state, JoinOrLogindispatch] = useReducer(JoinOrLoginReducer, false)

      // useEffect(()=>{
      //     checkLogin(savedData);
      // },[])

      const checkLogin = () => {
        const refreshToken = getCookie('refreshToken'); 
        if(refreshToken){
          navigate('/main')
        }else{
          return
        }
       }

       useEffect(()=>{
        checkLogin();
       },[])
      



      function handleMakeAcount(){
        todoCtx.sendFlexbox({isOpen:true,type:'MakeAcount'})
      }

      function handleLogin(){
        todoCtx.sendFlexbox({isOpen:true,type:'Login'})
      }

      function handleClosed(){
        todoCtx.sendFlexbox({isOpen:false,type:null})
      }

    return(
      <>
      {todoCtx.openAndType.isOpen ? 

              <FlexBox handleClosed={handleClosed} openAndType={todoCtx.openAndType} ></FlexBox>
              :
              ''
}
              <div className={style.main}>
              <div className={style.main__flexBox}>
    
                    <div className={style.main__left}>
                      <div className={style.main__left__container}>
                          <img alt={'dd'} src={process.env.PUBLIC_URL + '/img/Logo.png'}></img>
                      </div>
                    </div>
    
                      <div className={style.main__right}>
                          <div className={style.main__right__container}>
                                <div className={style.main__right__container__mainText}>
                                  <p>Share Daily Story</p>
                                  <p>To People</p>
                                </div>
                          <div className={style.main__right__container__box}>
    
                              <div className={style.main__right__container__subText}>
                              <p>Join now.</p>
                              </div>


                              <JoinForm handleMakeAcount={handleMakeAcount} handleLogin={handleLogin} handleClosed={handleClosed}></JoinForm>
  
    
                        </div>
                        </div>
                      </div>
                </div>
            </div>
    
    </>
    )
    }
    
export default Home;