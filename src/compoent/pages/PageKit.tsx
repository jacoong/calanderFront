// import Todos from '../Todos'
// import NewTodos from '../NewTodos'
import {TodosContext,UserType} from '../../store/todo_context'
import {useContext,useEffect,useState} from 'react';
import { useNavigate, Outlet, Link } from 'react-router-dom'; // If yo
import axios from 'axios'
import style from '../pages/css/Main.module.css'
import FlexBox from '../compoentItem/FlexBox';
import { BiSolidHomeCircle } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import LoadingPage from '../pages/LoadingPage';
// import StateTitle from '../pages/StateTitle'
// import MainPage from '../compoentItem/MainPage';
import FlashMessage from '../compoentItem/FlashMessage';
import UserFileItem from '../compoentItem/UserFileItem';
// export interface typeAction {
//   isOpen:boolean;
//   type:string|null;
// }
import React, { useCallback } from 'react';


function PageKit() {
        const todoCtx = useContext(TodosContext);
        const navigate = useNavigate();
        const [loading, setLoading] = useState(false);
        // const [shouldUsername, setShouldUsername] = useState(false);
        const [userInfo,setUserInfo] = useState<UserType>()
        const [logOutPopUp,setLogOutPopUp] = useState<boolean>(false)




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
            checkUserName();
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



        const checkUserName = async () => {
          try {
            const res = await axios.get(`${todoCtx.serverUrl}/api/get/userInformation` ,{ withCredentials: true });
              if (res.status === 403) {
                const userInfo = res.data.body;
                if(userInfo){
                  return setUserInfo(userInfo)
                }else{
                  navigate('/');
                  todoCtx.sendFlexbox({isOpen:true,type:'Login'})
                }
              }
          } catch (err) {
              console.error(err);
          }
      }

          

    useEffect(()=>{
      if(userInfo){
        if(userInfo.nickName === null){
          todoCtx.sendFlexbox({ isOpen: true, type: 'shouldUsername' });
        }
      }
    },[userInfo])
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
        //  }
         
         const logOutpopup = (e:React.MouseEvent) =>{
          e.preventDefault();
          console.log('11');
          todoCtx.sendFlexbox({isOpen:true,type:'popup'})
         }

         useEffect(()=>{
          if(todoCtx.openAndType.type === 'popup'){
            setLogOutPopUp(true);
          }else{
            return  setLogOutPopUp(false);
          }
         },[todoCtx.openAndType.type])

         useEffect(()=>{
          checkUserName();
         },[todoCtx.callApi,checkUserName])


         useEffect(()=>{
         },[])

         
         const goToPage = (e:React.MouseEvent) =>{
          console.log('wjuwju')
          setLogOutPopUp(false);
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
                    <FlexBox  deleteTodo={todoCtx.openAndType?.DeleteFunction} userInfo={userInfo} handleClosed={handleClosed} sendTargetReply={todoCtx.openAndType.value} handleUNsubmit={handleUNsubmit} openAndType={{isOpen:true,type:todoCtx.openAndType.type}} needClosedFlexBox={false}/>
                    :
                    null
                  }

                  <div className={`${style.main_body}`}>
                      <div className={style.main_body__banner}>
                      <div className={style.main_body__banner__items}>
                
                        
                      <div className={style.main_body__banner__items__logo}>
                          <Link className={style.main_body__banner__items__logo__container} to={`/`}>
                          <img alt={'dd'} src={process.env.PUBLIC_URL + '/img/Logo.png'}></img>
                        </Link>
                      </div>

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

                          <div className={`${style.main_body__banner__items__item} ${style.post}`}>
                            <div className={style.main_body__banner__items__Post__onClick} onClick={handlePost}>
                            <div className={style.main_body__banner__items__item__onClick__container}>
                              {/* <BiSolidUser/> */}
                              <p>Post</p>
                              </div>
                            </div>
                          </div>

                      </div>


                      <div className={style.main_body__banner__logOut} onClick={logOutpopup}>

                              {/* <div className={`${style.main_body__banner__items__item} ${style.userLogin}`}> */}
                                  <div className={`${style.main_body__banner__items__item__onClick} ${style.userLogin}`}>
                                  <div className={style.main_body__banner__items__item__onClick__container}>
                        
                                
                        
                                  {/* <div className={style.main_body__banner__items__item__onClick__container_user}>
                                    <p>@dgr</p>
                                    <p>@fescgwefdc</p>
                                  </div> */}
  
                              {/* </div> */}
                          </div>
                
                        

                        </div>

                          </div>



                  </div>



                        


                      </div>
                      {logOutPopUp
                          ?
                          <div className={`${style.main_body__banner__popup}`}>
                            <div className={`${style.main_body__banner__popup__container__LogOut}`}>
                            <div className={`${style.main_body__banner__popup__container__LogOut__item}`}>
                                {/* <Link to={`/${userInfo?.username}`} onClick={goToPage} > Go to My Page {userInfo?.username}</Link> */}
                            </div>
                            <div className={`${style.main_body__banner__popup__container__LogOut__item}`} onClick={todoCtx.handleLogOut}>
                                <p>Log Out</p>
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

                      <div className={style.main_body__main__side}>
                      <div className={style.main_body__main__side__example}>

                      </div>
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