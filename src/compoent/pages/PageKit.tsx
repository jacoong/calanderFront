// import Todos from '../Todos'
// import NewTodos from '../NewTodos'
import {TodosContext,UserType} from '../../store/todo_context'
import {useContext,useEffect,useState} from 'react';
import { useNavigate, Outlet, Link,useLocation } from 'react-router-dom'; // If yo
import axios from 'axios'
import style from './css/PageKit.module.css'
import FlexBox from '../compoentItem/FlexBox';
import { BiSolidHomeCircle } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import LoadingPage from '../pages/LoadingPage';
import DownOutLineLetter from '../compoentItem/DownOutLineLetter';
// import StateTitle from '../pages/StateTitle'
// import MainPage from '../compoentItem/MainPage';
import FlashMessage from '../compoentItem/FlashMessage';
import Navbar from '../compoentItem/Navbar'
import UserFileItem from '../compoentItem/UserFileItem';
import Button from '../compoentItem/Button'
import {getCookie} from '../../store/coockie'
// export interface typeAction {
//   isOpen:boolean;
//   type:string|null;
// }
import React, { useCallback } from 'react';
import { instance,addAccessTokenInterceptor, addResponseInterceptor } from '../../store/axios_context';


function PageKit() {
        const todoCtx = useContext(TodosContext);
        const navigate = useNavigate();
        const [loading, setLoading] = useState(false);
        // const [shouldUsername, setShouldUsername] = useState(false);
        const [userInfo,setUserInfo] = useState<UserType>()
        const [logOutPopUp,setLogOutPopUp] = useState<boolean>(false)


        const location = useLocation();

        useEffect(() => {
            // If there's an error message, navigate to the error page
            if (todoCtx.ErrorMsg) {
                navigate('/error',{ state:todoCtx.ErrorMsg }); // If you're using React Router v6, use 'navigate("/error")'
            }
          }, [todoCtx.ErrorMsg,navigate]); 

  

          useEffect(() => {
            console.log('efe',todoCtx.openAndType)
          }, [todoCtx.openAndType]);

          // useEffect(() => {
          //   console.log('watch carefyl',todoCtx.userInfo);
          // }, [todoCtx.userInfo]);        


        const handleUNsubmit = (data:string) =>{
          console.log('data',data)
          if(data==='complete'){
            todoCtx.sendFlexbox({isOpen:false,type:null})
            console.log('checked user!')
            
          }else{
            console.log('something wrong.')
          }



        }
        useEffect(()=>{
          console.log(todoCtx.openAndType)
        },[todoCtx.openAndType])

        const handleClosed = () => {
          todoCtx.sendFlexbox({isOpen:false,type:'null'})
        }

        const handlePost = () => {
          todoCtx.sendFlexbox({isOpen:true,type:'NewTodos'})
        }



        const sendPasswordChange = () =>{
          todoCtx.sendFlexbox({isOpen:true,type:'updatePassword'})
        }

        const getUserInfo = async () => {
          console.log('4')
          try {
            const res = await instance.get(`${todoCtx.serverUrl}/api/get/userInformation`);
              if (res.status === 200) {
                const userInfo = res.data.body;
                isUsername(userInfo)
                return
              }else if(res.status === 401){
                executeUnAuthenticateUser();
                return
              }
              return
          } catch (err) {

              return
          }
      }
          

      const isUsername = (userInfo:any) =>{
        if(userInfo){
          if(userInfo.nickName === null){
            todoCtx.sendFlexbox({ isOpen: true, type: 'shouldUsername' });
            return
          }else{
            return setUserInfo(userInfo)
          }
        }
      }

      const executeUnAuthenticateUser = () => {
        console.log('japan')
        const currentURL = location.pathname; 
        todoCtx.unAuthenticateUser(currentURL)
      }


    const isUserHadToken = () => {
      const refreshToken = getCookie('refreshToken');  //check user even had old ref
      if(refreshToken){
        getUserInfo();
      }else{
        executeUnAuthenticateUser();
      }
    }


    const initAxios = () => {
      // 로그인 후에 저장된 액세스 토큰을 가져와서 인터셉터에 추가합니다.
      const accessToken = getCookie('accessToken');
      console.log('accessToken',accessToken)
      if (accessToken) {
        addAccessTokenInterceptor(accessToken);
      }

      // 인터셉터 추가
      addResponseInterceptor();
    };
    

    useEffect(() => {
    initAxios();
    isUserHadToken();
    console.log('mount')
  }, []);


        // const axiosPost = async () => {
        //   // const userId = todoCtx.userInfo._id;
        //   console.log('eeee',userId);
        //   try {
        //     const res = await axios.get('https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/isLogin', { withCredentials: true });
        //     if (res.status === 201) {
        //         localStorage.removeItem('userDataKey');
        //        navigate(res.data.redirect);
        //   } else if (res.status === 200) {
        //       if (userId) {
        //         todoCtx.callApi(0);
              
        //       }
        //     }
        //   }catch (err: any) {
        //     console.error(err);
        //    } 
        //  }'


         
        //  const logOutpopup = (e:React.MouseEvent) =>{
        //   e.preventDefault();
        //   console.log('11');
        //   todoCtx.sendFlexbox({isOpen:true,type:'popup'})
        //  }

        //  useEffect(()=>{
        //   if(todoCtx.openAndType.type === 'popup'){

        //   }else{
        //     return
        //   }
        //  },[todoCtx.openAndType.type])

        



  const handlePopup = (popupValue:string)=>{
    todoCtx.sendFlexbox({isOpen:true,type:'popup',popupValue:popupValue})
  }

  const handlePopUpClick = (typeOfClick:string)=>{
    todoCtx.sendFlexbox({isOpen:true,type:typeOfClick})
  }


  

         


    return(
        <>
            {loading ? (
                <LoadingPage></LoadingPage>
              ):(
                todoCtx.openAndType.type
                 === 'shouldUsername' ?(
                <>
                  <FlexBox userInfo={userInfo} handleUNsubmit={handleUNsubmit} openAndType={{isOpen:true,type:'username'}} needClosedFlexBox={true}/>
                  <div className={style.body}>
                    <h1>hello</h1>
                  </div>
                </>
                  )
                  :
                  ( 

                  <>
                    {todoCtx.openAndType.type !== null && todoCtx.openAndType.isOpen === true
                    ?
                    <FlexBox  popupValue={todoCtx.openAndType?.popupValue} deleteTodo={todoCtx.openAndType?.DeleteFunction} userInfo={userInfo} handleClosed={handleClosed} sendTargetReply={todoCtx.openAndType.value} handleUNsubmit={handleUNsubmit} openAndType={{isOpen:true,type:todoCtx.openAndType.type}} needClosedFlexBox={false}/>
                    :
                    null
                  }

                  <div className={`${style.main_body}`}>
                      <Navbar></Navbar>
                      <div className={`${style.main_body__container}`}>
                          <div className={style.main_body__banner}>
                          <div className={style.main_body__banner__items}>
                    
                            
                          <Button handleClick={()=>handlePopup('MakePopup')} width='180px' borderRadius='30px' background_color='b-whiteShadow' color='black'>
                            <div style={{        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: '5px'}}>
                            <img style={{width:'30px'}}src="https://www.svgrepo.com/show/464599/date-alt-down.svg" alt="킹 (체스 말)"></img>
                            <DownOutLineLetter>
                                Make
                            </DownOutLineLetter>
                            </div>
                          </Button>


                          {todoCtx.openAndType.popupValue === "MakePopup"
                              ?
                              <div className={`${style.main_body__banner__popup}`}>
                                <div className={`${style.main_body__banner__popup__container__item}`} onClick={()=>{handlePopUpClick('MakeEvent')}}>
                                <p>MakeEvent</p>
                                </div>
                                <div className={`${style.main_body__banner__popup__container__item}`} onClick={()=>{handlePopUpClick('AIPlanMaker')}}>
                                <p>AI Plan Maker</p>
                                </div>

                    
                              </div>
                              :
                              null
                              }

                          <div className={style.main_body__banner__items__group}>

                          <div className={style.main_body__banner__items__group__containers}>

                              <Link className={style.main_body__banner__items__item} to={`/`}>
                              <div className={style.main_body__banner__items__item__onClick}>
                              <div className={style.main_body__banner__items__item__onClick__container}>
                              <BiSolidHomeCircle/>
                                <p>Home</p>
                              </div>

                              </div>
                            </Link>

                              <div className={style.main_body__banner__items__item}>
                                <div className={style.main_body__banner__items__item__onClick}>
                                <div className={style.main_body__banner__items__item__onClick__container}>
                                  {/* <BiSolidUser/> */}
                                  <AiOutlineUser/>
                                  <p>Explore</p>
                                  </div>
                                </div>
                              </div>

                              <div className={style.main_body__banner__items__item}>
                                <div className={style.main_body__banner__items__item__onClick}>
                                <div className={style.main_body__banner__items__item__onClick__container}>
                                  {/* <BiSolidUser/> */}
                                  <AiOutlineUser/>
                                  <p>Notifications</p>
                                  </div>
                                </div>
                              </div>

                              <div className={style.main_body__banner__items__item}>
                                <div className={style.main_body__banner__items__item__onClick}>
                                <div className={style.main_body__banner__items__item__onClick__container}>
                                  {/* <BiSolidUser/> */}
                                  <AiOutlineUser/>
                                  <p>Messages</p>
                                  </div>
                                </div>
                              </div>

                              <div className={style.main_body__banner__items__item}>
                                <div className={style.main_body__banner__items__item__onClick}>
                                <div className={style.main_body__banner__items__item__onClick__container}>
                                  {/* <BiSolidUser/> */}
                                  <AiOutlineUser/>
                                  <p>Lists</p>
                                  </div>
                                </div>
                              </div>

                              <div className={style.main_body__banner__items__item}>
                                <div className={style.main_body__banner__items__item__onClick}>
                                <div className={style.main_body__banner__items__item__onClick__container}>
                                  {/* <BiSolidUser/> */}
                                  <AiOutlineUser/>
                                  <p>Communities</p>
                                  </div>
                                </div>
                              </div>

                              <div className={style.main_body__banner__items__item}>
                                <div className={style.main_body__banner__items__item__onClick}>
                                <div className={style.main_body__banner__items__item__onClick__container}>
                                  {/* <BiSolidUser/> */}
                                  <AiOutlineUser/>
                                  <p>Verified</p>
                                  </div>
                                </div>
                              </div>

                              <div className={style.main_body__banner__items__item}>
                                <div className={style.main_body__banner__items__item__onClick}>
                                <div className={style.main_body__banner__items__item__onClick__container}>
                                  {/* <BiSolidUser/> */}
                                  <AiOutlineUser/>
                                  <p>More</p>
                                  </div>
                                </div>
                              </div>

                              <Button Background_color={'b-black'} color={'white'} handleClick={sendPasswordChange}>changePassword</Button>

                          </div>


 


                      </div>



                            


                          </div>
                          {todoCtx.openAndType.popupValue === "Makopup"
                              ?
                              <div className={`${style.main_body__banner__popup}`}>
                                <div className={`${style.main_body__banner__popup__container__LogOut}`}>
                                <div className={`${style.main_body__banner__popup__container__LogOut__item}`}>
                                    {/* <Link to={`/${userInfo?.username}`} onClick={goToPage} > Go to My Page {userInfo?.username}</Link> */}
                                </div>
                                <div className={`${style.main_body__banner__popup__container__LogOut__item}`} onClick={todoCtx.handleLogOut}>
                                    <p>MakePopUp</p>
                                </div>
                                </div>
                              </div>
                              :
                              null
                              }

                          </div>

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