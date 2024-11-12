import {useContext,useEffect,useState} from 'react';
import { useNavigate,useParams,useLocation } from 'react-router-dom';
import {instance} from '../../store/axios_context';
import {getCookie} from '../../store/coockie'
import {TodosContext} from '../../store/todo_context'
import MakeEvent from '../../Modal/ModalType/MakeEvent';
import useModal from '../../hook/useModal';
import {Category} from '../../store/types';
import {fetchedData} from '../../store/LoadedEventExample'
import { fetchCategoryInfo } from './MainPage';
import { useLoginInfo } from '../../hook/useLoginInfo';
import {getUserInfo} from '../pages/PageKit';
import { initialTime } from '../compoentItem/BigCalendar';
import { parseCustomDateString } from '../../store/LoadedEventExample';
import { useViewType } from '../../hook/useViewType';

function EventDetailPage() {
    const todoCtx = useContext(TodosContext);
    const { eventId,eventTimeId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const detailEventInformation = location.state ;
    const  { openModal } = useModal();
    const {startDate,endDate} = initialTime(new Date(),new Date())
    const [viewTypes, setViewTypes] = useViewType();




    const [pushData,setPushData] = useState<any>(new Date())

    const [eventInformation,setEventInformation] = useState<any>(null)
    const [loginInfo, setLoginInfo] = useLoginInfo();




    function dateToRightFormatAdress(dateString:string) {
        // Date 객체 생성
        const date = new Date(dateString);
        
        // 년, 월, 일을 추출하여 원하는 형식으로 변환
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 +1
        const day = ('0' + date.getDate()).slice(-2);
      
        return `/${year}/${month}/${day}`;
      }

    const stateOfPushState = {state:eventId === 'null' ? `updateModalSmall` : 'test22'}

    window.history.pushState({ date:dateToRightFormatAdress(pushData),viewType:viewTypes}, '', `/calendar/eventId/${eventId}/eventTimeId/${eventTimeId}`);




    
    console.log(detailEventInformation)

    const makeInitialDate = async() =>{
        const email = (await getUserInfo())?.email;
        const initialData = {
            view: "detail",
            categoryValue: null,
            startTime: startDate,
            endTime: endDate,
            selectedDays: [],
            interval: 1,  
            categoryId: 1,
            alarm: [],
            attenderEmailDTOS: {
                attenderInfoAuth: [
                    {
                        attenderEmail: email??null,
                        role: "GENERATOR"
                    }
                ],
                isSendEmailToAttender: false,
                isInvitableAnyoneLink: false
                }
            } 
        return initialData
    }
    

    function parseDateString(dateString:string) {
        // 연도, 월, 일, 시, 분을 각각 추출
        const year = parseInt(dateString.substring(0, 4), 10);
        const month = parseInt(dateString.substring(4, 6), 10) - 1; // 월은 0부터 시작하므로 -1
        const day = parseInt(dateString.substring(6, 8), 10);
        const hours = parseInt(dateString.substring(8, 10), 10);
        const minutes = parseInt(dateString.substring(10, 12), 10);
    
        // Date 객체 생성
        return new Date(year, month, day, hours, minutes);
    }



    const getEventInformation = async (email:string) => {
        console.log('getEventInformation executed',email) 
        try {
            if(eventId === 'null' || eventTimeId === 'null'){
                console.log(detailEventInformation,'detailEventInformation')
                
                if(detailEventInformation === null){
                    const result = await makeInitialDate()
                    console.log(result)
                    setEventInformation(result);
                }else{
                    setEventInformation(detailEventInformation.EventValue);
                    }
                
    //             const EventValue = detailEventInformation.EventValue;
    //             const typeOfMakeInfo = detailEventInformation.typeOfMakeInfo;
    //             console.log(EventValue,typeOfMakeInfo);
    //             openModal({ type: 'MakeEvent', value:{
    //                 isForce:true,
    //                 modal:{isFull:true},
    //                 value:{
    //                     view:typeOfMakeInfo.view,
    //                     start:new Date(EventValue.startTime),
    //                     end:new Date(EventValue.endTime),
    //                     isDisplayOfDay:typeOfMakeInfo.isDisplayOfDay,
    //                     categoryValue:typeOfMakeInfo.categoryValue,
    //                     currentCategoryValue:EventValue.currentCategoryValue,
    //                     InfoOfEvent:EventValue,
    //                     generatorEmail:typeOfMakeInfo.generatorEmail
    //             }
    //         }
    //     }
    // )
                return
            }else{
                console.log('dd')
                // get info with eventId !
                //   const res = await instance.get(`${todoCtx.serverUrl}/api/event/load/single/${eventId}/${eventTimeId}`);
                //     if (res.status === 200) {
                //         alert('success');
                //         const eventId = res.data
                        const startTime = parseCustomDateString(fetchedData.startTime)
                        const fetchedDateModified = {
                            ...fetchedData,
                            startTime:startTime,
                            endTime:parseCustomDateString(fetchedData.endTime),
                            eventTimeId:fetchedData.eventTimeId
                        }
                        setEventInformation(fetchedDateModified) // 받아온거 가정
                        setPushData(startTime);
                //       return
                //     }else if(res.status === 401){
                //         alert('wrong')
                //       return
                //     }
                //     return
            

                // let rightFormFetchedData = { ...fetchedData }

                // const inviteUserEmail = rightFormFetchedData.attenderEmailDTOS.attenderInfoAuth.map((attender) => ({
                //     id: attender.attenderEmail,
                //     text: attender.attenderEmail,
                //     role: attender.role,
                //   }));
                  
                //   // 기존 attenderEmailDTOS를 삭제하고 inviteUserEmail로 교체
                //   rightFormFetchedData = {
                //     ...rightFormFetchedData,
                //     inviteUserEmail, // 새로운 형식을 추가
                //     attenderEmailDTOS: undefined, // 기존 데이터 제거
                //   };
        

            }
        } catch (err) {
            return
        }
    }

    useEffect(()=>{

        const findCategory = (categories: any) => {
            console.log(categories)
            const foundCategory = categories.find((category: Category) => category.categoryId === eventInformation.categoryId)
            return foundCategory ? foundCategory : null;
        };

        if(eventInformation){
            console.log(eventInformation)
            const isDisplayOfDay = eventInformation.selectedDays.length === 0 ? false :true;
 
            async function getCategoryInfo() {
                // 삼항 연산자 사용: categoryInfo가 null이면 fetchCategoryInfo 호출

                const categoryValue = detailEventInformation !== null 
                    ? detailEventInformation.categoryValue 
                    : await fetchCategoryInfo(); // 비동기 호출을 위한 await


                    return categoryValue

            }

            console.log(eventInformation.startTime)
            async function openEventModal() {
            const CategoryValue = await getCategoryInfo();
            openModal({ type: 'MakeEvent', value:{
                isForce:true,
                modal:{isFull:true},
                value:{
                    view:eventId ==='null'?'detail':'eventEdit',
                    isDisplayOfDay:isDisplayOfDay,
                    ...eventInformation
                    ,startTime:(eventInformation.startTime),
                    endTime:(eventInformation.endTime),
                    categoryValue:CategoryValue,
                    currentCategoryValue:findCategory(CategoryValue)

                }}})
            }
            openEventModal();
          
        }
        return
    },[eventInformation])




   const getLogInUserEmail = async() => {
    const accessToken = getCookie('accessToken'); 
    console.log('accessToken',accessToken)
            if(accessToken){
                console.log(`pos`,accessToken);
                instance.get(`${todoCtx.serverUrl}/api/get/userInformation`)
                .then(res => {
                    if(res.status ===200){
                        const userInfo = res.data.body.email;
                        return userInfo
                        // getEventInformation(eventId!,userInfo.email)
                    }
                })
                .catch(error => {
                    console.log(`post response: fail to load user inforamtion`, error);
                    // nextPopUpPage();
                  });
                   //   navigate(`/invte
           
            //   navigate(`/invte/${eventId}/`)
            }else{
              return
            }
   }
  
         useEffect(()=>{
            if(eventId && eventTimeId){
                // const email = getLogInUserEmail();
                const email = 'yuh0812@gmail.com'
                getEventInformation(email)

            }else{
             navigate(`/*`)
            }
         },[])
        


     
        const handlePopOfPopup = () =>{
            const currentOpenAndType = todoCtx.openAndType
            if ('popupValue' in currentOpenAndType ) {
        
                const currentOpenAndType = todoCtx.openAndType
                const newObj = { ...currentOpenAndType };
                delete newObj.popupValue;
                todoCtx.sendFlexbox(newObj);
            } else {
                return
            }
        }

      return(
        eventInformation
        ?
        <div onClick={handlePopOfPopup} style={{width:'100%',height:'100vh', overflow:'hidden'}}>
      </div>
        :
        <>sibal</>
      )
      }
      
  export default EventDetailPage;