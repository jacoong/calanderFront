
import {useContext,useEffect,useState} from 'react';
import {TodosContext} from '../../store/todo_context'
import {instance} from '../../store/axios_context'
import style from './css/InvitePage.module.css';
import FlexBox,{TypeOfLoginValue} from '../compoentItem/FlexBox'
import JoinForm from '../compoentItem/JoinForm';
import {getCookie} from '../../store/coockie'
import { useNavigate,useParams } from 'react-router-dom';
import MobileLogin from '../compoentItem/MobileLogin';
import SocialGoogle from '../SocialGoogle';
import SocialKakao from '../SocialKakao';
import SocialNaver from '../SocialNaver';
import { IoMdArrowRoundForward } from "react-icons/io";
import { fetchedData } from '../../store/LoadedEventExample';
import { AttenderEmailDTOS,FetchedData,AttenderInfoAuth } from '../../store/types';
function IsInviteInvolve() {
  const todoCtx = useContext(TodosContext);
  const navigate = useNavigate();
  const { eventId } = useParams();

  console.log(eventId,'deee')


  const dumData = {
    eventId: 1,
    title: "test register",
    start: "2024-05-31T18:30:00.000Z",
    end: "2024-06-01T09:00:00.000Z",
    description: "ㅈㄷㅈㅁㄷㅁㄷㄹㄴㄹ",
    selectedDays: [
        "FRIDAY",
        "SATURDAY"
    ],
    interval: 3,
    category: {
        categoryId: 1,
        categoryColor: "#444444",
        categoryName: "기본"
    },
    alarmTime: [
        {
            label: "2 weeks",
            value: "2000"
        },
        {
            label: "4 hours",
            value: "240"
        }
    ],
    generator:{
        nickName:'김해리',
        email:'customer@haechi.io'
    }
}


//   const [loginValue,setLoginValue] = useState<string>('login')
//   const [emailPasswordValue,setEmailPasswordValue] = useState<TypeOfLoginValue>({email:'',password:'',encodedCheckCode:''})

        const [isLoaded,setIsLoaded] = useState(false);
        const [isUserInvolved,setIsUserInvolved] = useState(false);
        const [userInfo,setUserInfo] = useState<any>(undefined);
        const [eventInfo,setEventInfo] = useState<FetchedData | undefined>(undefined);
        const [selectedResponse, setSelectedResponse] = useState(null);
        const [isConfirmHovered, setIsConfirmHovered] = useState(false);

      const checkLogin = () => {
        const accessToken = getCookie('accessToken'); 
        console.log('accessToken',accessToken)
        const userInformation = {
            email : '325761@naver.com',
            nickName : 'testUser'
        }
        checkUserIsInviter(userInformation)
        return 

                if(accessToken){
                    console.log(`pos`,accessToken);
                    instance.get(`${todoCtx.serverUrl}/api/get/userInformation`)
                    .then(res => {
                        if(res.status ===200){
                           
                            const userInfo = res.data.body;
                            checkUserIsInviter(userInfo)
                        }
                    })
                    .catch(error => {
                        console.log(`post response: fail to load user inforamtion`, error);
                        // nextPopUpPage();
                      });
                       //   navigate(`/invte
               
                //   navigate(`/invte/${eventId}/`)

            }else{
                    // alert('후라이 까지마라이')
                  return
                }
       }

       const getEventInformation = () => {
        const accessToken = getCookie('accessToken'); 
        console.log('accessToken',accessToken)
        setEventInfo(fetchedData)

                if(accessToken){
                    console.log(`pos`,accessToken);
                    // instance.get(`${todoCtx.serverUrl}/api/event/read/${eventId}`)
                    // .then(res => {
                    //     if(res.status ===200){
                           
                    //         const userInfo = res.data.body;
                     
                    //     }
                    // })
                    // .catch(error => {
                    //     console.log(`post response: fail to load user inforamtion`, error);
                    //     // nextPopUpPage();
                    //   });
               
               
                //   navigate(`/invte/${eventId}/`)


                }else{
                    // alert('후라이 까지마라이')
                  return
                }
       }

       const handleStateValue = ()=>{
                      instance.patch(`${todoCtx.serverUrl}/api/invite/attender/state/modify`,{
                        eventId: eventId,
                        attenderEmail: userInfo.email, 
                        state: selectedResponse
                        })
                    .then(res => {
                        if(res.status ===200){
                            navigate(`/main`)
                        }
                    })
                    .catch(error => {
                        console.log(`patch response: fail to load user inforamtion`, error);
                        // nextPopUpPage();
                      });
               
       }



       const checkUserIsInviter = (userInfo:any) =>{
        console.log(userInfo.email,'userEmail');
        setIsUserInvolved(true)
        setUserInfo(userInfo);
        
        // instance.post(`${todoCtx.serverUrl}/invite/${eventId}/`,{email:userInfo.email,eventId:eventId})
        // .then(res => {
        //     if(res.status ===200){
        //         const userInfo = res.data.body.email;
        //         checkUserIsInviter(userInfo)
        //     }
        // })
        // .catch(error => {
        //     console.log(`post response: fail to load user inforamtion`, error);
        //     // nextPopUpPage();
        //   });
    
    }


    



    const handleResponseChange = (response:any) => {
        console.log(response,'res')
      setSelectedResponse(response);
    };

    const filterGenerator = (isGenerator:boolean,attenderEmailDTOS:AttenderEmailDTOS) =>{
        const result = attenderEmailDTOS.attenderInfoAuth.filter((attenderInfoAuth) => 
        isGenerator ? attenderInfoAuth.role === 'GENERATOR' : attenderInfoAuth.role !== 'GENERATOR')
   
        return result
    }
      


  const handleMouseEnter = () => {
    setIsConfirmHovered(true);
  };

  const handleMouseLeave = () => {
    setIsConfirmHovered(false);
  };

   

  useEffect(()=>{
    checkLogin();
    getEventInformation();
   },[])


   useEffect(()=>{
        const fetchData = async () => {
            await Promise.all([checkLogin(), getEventInformation()]);
            setIsLoaded(true);
            };
            fetchData();
   },[userInfo,eventInfo])
   

    return(
        isLoaded
            ?
            <>
            <div className={style.page_wrapper}>
            <div className={style.page_wrapper__header}>
    
                          <div className={style.page_wrapper__header__container}>
                              <img alt={'dd'} src={process.env.PUBLIC_URL + '/img/Logo.png'}></img>
                          </div>
                        </div>
    
    
                        <div className={style.page_wrapper__main}>
                            <section className={style.page_wrapper__main__wrapper}>
                                <div className={style.page_wrapper__main__wrapper__title}>
                                  
                                    <h1>{userInfo.nickName} 님께 초대 일정이 도착했습니다.</h1>
                  
                    
                                </div>

                                <div className={style.page_wrapper__main__wrapper__login}>
{/*                                  
                                    <div className={style.openMain__flexBox__popUp__body__container__or}>
                                        <div className={style.openMain__flexBox__popUp__body__container__or__line}></div>
        
                                        <div className={style.openMain__flexBox__popUp__body__container__or__text}>
                                      
                                        </div>
        
                                        <div className={style.openMain__flexBox__popUp__body__container__or__line}></div>
                                    </div> */}
                                    <></>



                          
                                    <div className={style.infoOfEvent}>
                                    <div className={style.infoOfEvent__div}>
                                        <span>일정 이름</span>
                                        <span>{eventInfo?.title}</span>
                                    </div>
                                    <div className={style.infoOfEvent__div}>
                                        <span>초대한 사람</span>
                                        {filterGenerator(true,fetchedData.attenderEmailDTOS).map(
                                            (item:AttenderInfoAuth,index: number)=>(
                                                <div className={style.infoOfEvent__div__} key={index}>
                                                <p>{item.attenderEmail}</p>
                                                {/* <p>역할:{item.role}</p>
                                                <p>상태:{item.state}</p> */}
                                                </div>
                                                ))
                                        }
                                        </div>
                                    <div className={style.infoOfEvent__div}>
                                        <span>일정 내용</span>
                                        <p>{eventInfo?.description}</p>
                                    </div>
                                    <div className={style.infoOfEvent__div}>
                                        <span>조직 구성원</span>

                                        {filterGenerator(false,fetchedData.attenderEmailDTOS).map(
                                            (item:AttenderInfoAuth,index: number, array: AttenderInfoAuth[])=>(
                                                <div className={style.infoOfEvent__div__} key={index}>
                                                <p>{item.attenderEmail}</p>
                                                {/* <p>역할:{item.role}</p>
                                                <p>상태:{item.state}</p> */}
                                                {index+1<array.length?' ,':''}
                                                </div>
                                                ))
                                        }
                                        </div>
                                    </div>
                             


                                    <div className={style.inviteResponseContainer}>
                                    <h2>초대 응답 여부</h2>
                                    <div className={style.buttonContainer}>
                                        <button
                                        className={`${style.responseButton} ${style.accept} ${selectedResponse === 'accept' ? style.selectaccept : ''}`}
                                        onClick={() => handleResponseChange('accept')}
                                
                                        >
                                        수락
                                        </button>
                                        <button
                                        className={`${style.responseButton} ${style.decline} ${selectedResponse === 'decline' ? style.selectdecline : ''}`}
                                        onClick={() => handleResponseChange('decline')}
                                        >
                                        거절
                                        </button>
                                        <button
                                        className={`${style.responseButton} ${style.pending} ${selectedResponse === 'pending' ? style.selectpending : ''}`}
                                        onClick={() => handleResponseChange('pending')}
                                        >
                                        보류
                                        </button>
                                    </div>
                                    </div>

                                    {
                                        selectedResponse?
                                        <div className={style.confirmContainer}>
                                                <div className={style.confirmContainer__container} onClick={handleStateValue} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                                    <div className={`${style.confirmContainer__container__svg} ${isConfirmHovered ? style.scale_up : style.scale_down}`} >
                                                        <IoMdArrowRoundForward></IoMdArrowRoundForward>
                                                    </div>
                                                </div>
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                            </section>
                        </div>
        </div>
            </>
            :
            <></>

        

    )
    }
    
export default IsInviteInvolve;