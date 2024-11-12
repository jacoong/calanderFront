// import Todos from '../Todos'
// import NewTodos from '../NewTodos'
import {TodosContext} from '../../store/todo_context'
import { UserType } from '../../store/types';
import {useContext,useEffect,useState} from 'react';
import { useNavigate, Outlet, Link,useLocation } from 'react-router-dom'; // If yo
import axios from 'axios'
import style from './css/PageKit.module.css'
import FlexBox from '../compoentItem/FlexBox';
import { BiSolidHomeCircle } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import LoadingPage from '../pages/LoadingPage';
import DownOutLineLetter from '../compoentItem/DownOutLineLetter';
import FlashMessage from '../compoentItem/FlashMessage';
import UserFileItem from '../compoentItem/UserFileItem';
import Button from '../compoentItem/Button'
import {getCookie} from '../../store/coockie'
import { ModalStateContext} from '../../store/ModalProvider';
import { instance } from '../../store/axios_context';
import useModal from '../../hook/useModal';
import { useLoginInfo } from '../../hook/useLoginInfo';

const SERVERURL = process.env.REACT_APP_SERVER_URL as string;

export const getUserInfo = async () => {
  return {email:'327561@naver.com',nickName:'testUser'}
  // try {
  //   const res = await axios.get(`${SERVERURL}/api/get/userInformation`);
    
  //   if (res.status === 200) {
  //     const userInfo = res.data.body;
  //     return userInfo; // 성공 시 유저 정보 반환
  //   } else if (res.status === 401 || res.status === 403) {
  //     return null; // 권한이 없을 때 null 반환
  //   }

  //   return null; // 예상하지 못한 응답 상태일 때도 null 반환
  // } catch (err) {
  //   console.error('Failed to fetch user info', err);
  //   return null; // 에러 발생 시 null 반환
  // }
    }

function PageKit() {
    const todoCtx = useContext(TodosContext);
    const ModalCtx = useContext(ModalStateContext);

        const navigate = useNavigate();
        const [loading, setLoading] = useState(false);
        // const [shouldUsername, setShouldUsername] = useState(false);
        const [logOutPopUp,setLogOutPopUp] = useState<boolean>(false)
        const [loginInfo, setLoginInfo] = useLoginInfo();
        const {openModal} = useModal();
        const location = useLocation();

        useEffect(() => {
            // If there's an error message, navigate to the error page
            if (todoCtx.ErrorMsg) {
                navigate('/error',{ state:todoCtx.ErrorMsg }); // If you're using React Router v6, use 'navigate("/error")'
            }
          }, [todoCtx.ErrorMsg,navigate]); 



        const storageUserInfo = (userInfo:UserType) =>{
          setLoginInfo(userInfo); // UserType에 맞게 설정
        }




        const getUserInfoFunction = async () => {
          const result = await getUserInfo()
          if(result !== null){
            isUsername(result)
            return
          }else{
            executeUnAuthenticateUser();
            return
          }}

          

      const isUsername = (userInfo:UserType) =>{
        if(userInfo){
          if(userInfo.nickName === null){
            openModal({type:'username'});
            return
          }else{
            storageUserInfo(userInfo);
            return
          }}}

      const executeUnAuthenticateUser = () => {
        const currentURL = location.pathname; 
        todoCtx.unAuthenticateUser(currentURL)
      }

    const isUserHadToken = () => {
      const refreshToken = getCookie('refreshToken');  //check user even had old ref
      if(refreshToken){
        getUserInfoFunction();
      }else{
        // return // serverConnect
        executeUnAuthenticateUser(); //should turn on 
      }
    }

    useEffect(() => {
      // getUserInfoFunction(); //serverConnect
    isUserHadToken();
  }, []);

    return(
        <>
            {loading ? (
                <LoadingPage></LoadingPage>
              ):(
                ModalCtx.find(modal => modal.type === 'shouldUsername')
                 ||                
                 ModalCtx.find(modal => modal.type === 'shouldEmailValidate')
                  ?(
                <>
                  <div className={style.body}>
                    <h1>hello</h1>
                  </div>
                </>
                  )
                  :
                  ( 
                  <>
                  <div className={`${style.main_body}`}>
                      {/* <Toolbar></Toolbar> */}
                      <div className={`${style.main_body__container}`}>
                        

                          <div className={style.main_body__main}>

                            <div className={style.main_body__main_flashMessage}>
                            <FlashMessage/>
                            </div>
                        
                          <Outlet/>

              

                          </div>
                      </div>

                  </div>

                  </>
              )
              )
            }
        </>
    );
              }
    
export default PageKit;