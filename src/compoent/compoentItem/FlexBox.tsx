import style from '../pages/css/FlexBox.module.css';
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Button from './Button';
import Login from '../pages/Login'
import EditProfile from '../compoentItem/EditProfile'
import {useState,useContext, useEffect} from 'react';
import {TodosContext,UserType,typeAction} from '../../store/todo_context'
import axios from 'axios';
import Username from '../pages/Username'
import NewTodos from '../NewTodos';
import MakeEvent from '../../Modal/ModalType/MakeEvent';
import AiSubmitForm from '../compoentItem/AiSubmitForm';
import ClosedButton from './ClosedButton';
import ColorSelector from '../../Modal/PopUpType/ColorSelector';
import ToReply from '../compoentItem/ToReply';
import { BiArrowBack } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

    export interface typeOfSendTargetReply {
        text:string,profileImg?:string|undefined,writer:string,commentId:string,backgroundImg?:string|undefined
    }

    export interface typeOfImg {
        profileImg:string
    }
    

    interface FlexBoxProps {
        openAndType: typeAction;
        handleClosed?():void;
        handleUNsubmit?(data:string):void;
        needClosedFlexBox?:boolean;
        userInfo?:UserType;
        deleteTodo?():void;
        sendTargetReply?:typeOfSendTargetReply;
        typeOfImg?:typeOfImg;
        popupValue?:string[];
    }


    export interface TypeOfLoginValue {
        email: string;
        password: string;
        encodedCheckCode:string;
      }

    const popupWidth = 500;
    const popupHeight = 700;
    
    const popupX = (window.screen.width / 2) - (popupWidth / 2);
    // 만들 팝업창 width 크기의 1/2 만큼 보정값으로 빼주었음
    
    const popupY= (window.screen.height / 2) - (popupHeight / 2);


function FlexBox({popupValue,typeOfImg,sendTargetReply,userInfo,openAndType,deleteTodo,handleUNsubmit, handleClosed,needClosedFlexBox=false }:FlexBoxProps) {
    
    
    const [emailPasswordValue,setEmailPasswordValue] = useState<TypeOfLoginValue>({email:'',password:'',encodedCheckCode:''})

    const [previewImages, setPreviewImages] = useState<(string |File| null)[]>([null, null]);
    const [currentPopupPage,setCurrentPopupPage] = useState<number>(1);
    const todoCtx = useContext(TodosContext);
    const navigate = useNavigate();

    const { commentId } = useParams();
    // const [, setLoading] = useState(true);

    const savedData:any = localStorage.getItem('userDataKey'); 
    // const userId = JSON.parse(savedData);

    const handleDeleteTodo = () =>{
        todoCtx.sendFlexbox({isOpen:false, type:'null'})
        deleteTodo!();
    }


    const nextPopUpPage = () =>{
        setCurrentPopupPage(prev => prev + 1)
      }

      const beforePopUppage = () =>{
        setCurrentPopupPage(prev => prev - 1)
      }

    const handleClickPopUp = () => {
        todoCtx.sendFlexbox({isOpen:false, type:'null'})
    }

    const handlePopOfPopup = () =>{
        const currentOpenAndType = todoCtx.openAndType
        if ('popupValue' in currentOpenAndType ) {
    
            const currentOpenAndType = todoCtx.openAndType
            const newObj = { ...currentOpenAndType };
            // delete newObj.popupValue;
            // todoCtx.sendFlexbox(newObj);
        } else {
            return
        }
    }


    const prventEventBubling = (e: React.MouseEvent) => {
        console.log('preventEvent!')
        e.stopPropagation();
    }

    const handleFileChange = (files:(string | File | null)[]) => {
        setPreviewImages(files);  // 상위 컴포넌트의 상태를 변경
      };


      const handleEditProfile = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();        

        const userId = JSON.parse(savedData);

        const formData = new FormData();


        if (formData){
            previewImages.forEach((file, i) => {
                if (file) {  // 파일이 null이 아닌 경우에만 append 호출
                    if(i===0){
                        formData.append('backgroundImg', file);
                    }else{
                        formData.append('profileImg', file);
                    }
                }
            })
        }
          formData.append('id',userId)
        
          try{
            await axiosPost(formData);
            todoCtx.sendFlexbox({isOpen:false,type:'null'})
            }
            catch{
              navigate('/')
            }
        }

        const savedUserLoginInfo = (userInfo: TypeOfLoginValue)=>{
            if(userInfo){
            setEmailPasswordValue(userInfo);
            }else{
                return
            }
        }
  

        const axiosPost= async(data:any) =>{
            axios.patch('https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/user/edit/usernameImg',data ,{ withCredentials: true })
              .then((res) => {
                  if(res.status === 201){
                      alert('need to use username!')
                  }else if(res.status === 200){
                        console.log('success!')
                        // todoCtx.callApi(0);
                    return
                  }
              })
              .catch((err:Error) => {
                alert(err);
                navigate('/')
              });
          }


          const handleLoginGoogleClick = () =>{
            window.open('https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/user/auth/google', '_blank', 'status=no, height=' + popupHeight  + ', width=' + popupWidth  + ', left='+ popupX + ', top='+ popupY);
        }




    return(
        openAndType.type === 'popup' 
        ?
        <div className={`${style.popUpMain}`}  onClick={handleClickPopUp}>

        </div>
        :
        <div className={`${style.openMain}`} onClick={['viewEvent','NewTodos', 'shouldEmailValidate','MakeEvent','Reply','shouldUsername','MakeAcount','updatePassword','Login',null,'Edit profile','categoryDeletePopup','categoryAddPopup'].includes(openAndType.type)  ?  handlePopOfPopup : handleClickPopUp}> 
                <div className={`${style.openMain__flexBox} ${openAndType.type === 'NewTodos' ? style.post : ''}`}>
                        <div className={`${style.openMain__flexBox__popUp} ${openAndType.type === 'NewTodos' ? style.post : ''}` } onClick={'popupValue' in todoCtx.openAndType ? undefined : prventEventBubling}>

                            { ['NewTodos', 'Reply',null,'Edit profile'].includes(openAndType.type)
                            ?
                            <div className={`${style.openMain__flexBox__popUp__header} ${openAndType.type === 'NewTodos' ? style.post : ''}`}>
                            {needClosedFlexBox ?
                            <div className={style.openMain__flexBox__popUp__header__nothing}>
                            </div>
                             :
                             <ClosedButton onClick={handleClosed}>
                             <IoCloseOutline></IoCloseOutline>
                         </ClosedButton>
    
                             } 

                            {['NewTodos','Edit profile',null].includes(openAndType.type)
                            ?
                            <>
                            <div className={style.openMain__flexBox__popUp__header__title}>
                                <h1>{openAndType.type}</h1>
                            </div>
                             {
                                openAndType.type === 'Edit profile'
                                ?
                                <form  className={style.openMain__flexBox__popUp__form} onSubmit={(e) => handleEditProfile(e)} encType='multipart/form-data'>
                                {/* <input value='send request' type='submit'/> */}
                                <Button type={'submit'} background_color={'b-black'} width={'small'}>Save</Button>
                                </form>
                                :
                                null
                             }
                    
                            </>
                            :
                            <>
                            <div className={style.openMain__flexBox__popUp__header__logo}>
                                <img alt={'dd'} src={process.env.PUBLIC_URL + '/img/Logo.png'}></img>
                            </div>
                            <div className={style.openMain__flexBox__popUp__header__nothing}>

                            </div>
                            </>
                            }



                            </div>
                            :
                            null
                        }
                
                        
                            {openAndType.type ==='Login' ?
                            <div className={style.openMain__flexBox__popUp__PopupSliderContainer}>
                                <div style={currentPopupPage?{transform:`translate(${100-(100*currentPopupPage)}%)`}:{}} className={style.openMain__flexBox__popUp__body}>


                                    <div className={`${style.openMain__flexBox__popUp__header__popUppage}`}>
                                    <ClosedButton onClick={handleClosed}>
                                <IoCloseOutline></IoCloseOutline>
                            </ClosedButton>
                                    <div className={style.openMain__flexBox__popUp__header__logo}>
                                        <img alt={'dd'} src={process.env.PUBLIC_URL + '/img/Logo.png'}></img>
                                    </div>
                                    <div className={style.openMain__flexBox__popUp__header__nothing}>

                                    </div>
                                    </div>



                                <div className={style.openMain__flexBox__popUp__body__container}>
                                <h1>Login AreA</h1>
    
                                <div className={style.openMain__flexBox__popUp__body__container__button}>
                                <Button width={'large'} background_color={'b-white'} handleClick={handleLoginGoogleClick} color={'black'}>Join with Google</Button>
                                </div>
    
                                <div className={style.openMain__flexBox__popUp__body__container__button}>
                                <Button width={'large'} background_color={'b-black'} color={'white'}>Join with Apple</Button>
                                </div>
    
    
    
    
    
                                <div className={style.openMain__flexBox__popUp__body__container__or}>
                                    <div className={style.openMain__flexBox__popUp__body__container__or__line}></div>
    
                                    <div className={style.openMain__flexBox__popUp__body__container__or__text}>
                                    <p>Or</p>
                                    </div>
    
                                    <div className={style.openMain__flexBox__popUp__body__container__or__line}></div>
                                </div>
    
    
                                <Login requestType={'login'} nextPopUpPage={nextPopUpPage}></Login>
    
                                
    
                                </div>
                                </div>

                                <div style={currentPopupPage?{transform:`translate(${100-(100*currentPopupPage)}%)`}:{}} className={style.openMain__flexBox__popUp__body}>


                                <div className={`${style.openMain__flexBox__popUp__header__popUppage}`}>
                                <div className={style.openMain__flexBox__popUp__header__circle} onClick={beforePopUppage}>
                                    <div className={style.openMain__flexBox__popUp__header__circle__container} >
                                        <BiArrowBack/>   
                                    </div>
                                </div>
                                <div className={style.openMain__flexBox__popUp__header__logo}>
                                <h1>Recreate Password</h1>
                                </div>
                                <div className={style.openMain__flexBox__popUp__header__nothing}>

                                </div>
                                </div>


                                <div className={style.openMain__flexBox__popUp__body__container}>

                                <div className={style.openMain__flexBox__popUp__body__container__paragraph}>
                                    <p>you can recreate your password</p>
                                    <p>simply input your email</p>
                                </div>
                                <Login requestType={'recreatePassword'} nextPopUpPage={nextPopUpPage}></Login>



</div>
                                </div>

                                <div style={currentPopupPage?{transform:`translate(${100-(100*currentPopupPage)}%)`}:{}} className={style.openMain__flexBox__popUp__body}>
                                    <div className={`${style.openMain__flexBox__popUp__header__popUppage}`}>
                                    <div className={style.openMain__flexBox__popUp__header__circle} onClick={beforePopUppage}>
                                        <div className={style.openMain__flexBox__popUp__header__circle__container} >
                                            <BiArrowBack/>   
                                        </div>
                                    </div>
                                    <div className={style.openMain__flexBox__popUp__header__logo}>
                                    <h1>Request Succesed</h1>
                                    </div>
                                    <div className={style.openMain__flexBox__popUp__header__nothing}>

                                    </div>
                                    </div>


                                    <div className={style.openMain__flexBox__popUp__body__container}>

                                    <div className={style.openMain__flexBox__popUp__body__container__paragraph}>
                                        <p>Check your email.</p>
                                    </div>
                                    <Button>Done!</Button>

</div>
</div>
                            </div>
        
                                :                           
                            (openAndType.type ==='MakeAcount' ?
                            <div className={style.openMain__flexBox__popUp__PopupSliderContainer}>
                            <div style={currentPopupPage?{transform:`translate(${100-(100*currentPopupPage)}%)`}:{}} className={style.openMain__flexBox__popUp__body}>
                                
                            <div className={`${style.openMain__flexBox__popUp__header__popUppage}`}>
                            <ClosedButton onClick={handleClosed}>
                                <IoCloseOutline></IoCloseOutline>
                            </ClosedButton>
                                    <div className={style.openMain__flexBox__popUp__header__logo}>
                                        <img alt={'dd'} src={process.env.PUBLIC_URL + '/img/Logo.png'}></img>
                                    </div>
                                    <div className={style.openMain__flexBox__popUp__header__nothing}>

                                    </div>
                                    </div>

                                    <div className={style.openMain__flexBox__popUp__body__container}>
                                
                                        <h1>Register Your Acount</h1>
                                        <Login valueOfUserLoginInfo={emailPasswordValue} savedUserLoginInfo={savedUserLoginInfo} nextPopUpPage={nextPopUpPage} requestType={'register'}></Login>
                                        </div>
                                    </div>


                             <div style={currentPopupPage?{transform:`translate(${100-(100*currentPopupPage)}%)`}:{}} className={style.openMain__flexBox__popUp__body}>
                                
                                <div className={`${style.openMain__flexBox__popUp__header__popUppage}`}>
                                        <div className={style.openMain__flexBox__popUp__header__circle} onClick={handleClosed}>
                                            <div className={style.openMain__flexBox__popUp__header__circle__container} >
                                                <IoCloseOutline/>   
                                            </div>
                                        </div>
                                        <div className={style.openMain__flexBox__popUp__header__logo}>
                                            <img alt={'dd'} src={process.env.PUBLIC_URL + '/img/Logo.png'}></img>
                                        </div>
                                        <div className={style.openMain__flexBox__popUp__header__nothing}>
    
                                        </div>
                                        </div>
    
                                        <div className={style.openMain__flexBox__popUp__body__container}>
                                    
                                          <h1>Input your mail code</h1>
                                            <Login valueOfUserLoginInfo={emailPasswordValue} nextPopUpPage={nextPopUpPage} requestType={'encodedCheckCode'}></Login>
                                            </div>
                                        </div>

            
                            </div>
                            :
                            (openAndType.type ==='shouldEmailValidate' ?
                            <>

                                <div className={`${style.openMain__flexBox__popUp__header__popUppage}`}>
                                <div className={style.openMain__flexBox__popUp__header__circle} onClick={handleClosed}>
                                    <div className={style.openMain__flexBox__popUp__header__circle__container} >
                                        {/* <IoCloseOutline/>    */}
                                    </div>
                                </div>
                                <div className={style.openMain__flexBox__popUp__header__logo}>
                                    <img alt={'dd'} src={process.env.PUBLIC_URL + '/img/Logo.png'}></img>
                                </div>
                                <div className={style.openMain__flexBox__popUp__header__nothing}>

                                </div>
                                </div>

                               <div className={style.openMain__flexBox__popUp__body} style={{flex:0}}>
    
      

                                    <div className={style.openMain__flexBox__popUp__body__container}>
                                
                                        <h1>Input your mail code</h1>
                                        <Login valueOfUserLoginInfo={emailPasswordValue} nextPopUpPage={nextPopUpPage} requestType={'encodedCheckCode'}></Login>
                                        </div>
                                    </div>
                            </>
                                :
                            (openAndType.type === 'shouldUsername' ?
                            <div className={style.openMain__flexBox__popUp__Post_body}>
                            <h1>Register Your Name!</h1>
                            <Username handleUNsubmit={handleUNsubmit}></Username>
                            </div>
                                :
                            (openAndType.type === 'MakeEvent' ?
                            <div className={style.openMain__flexBox__popUp__NewTodos_body}>
                            <div className={`${style.openMain__flexBox__popUp__header__popUppage}`}>
                                   {/* <div className={style.openMain__flexBox__popUp__header__circle} onClick={handleClosed}>
                                       <div className={style.openMain__flexBox__popUp__header__circle__container} >
                                           <IoCloseOutline/>   
                                       </div>
                                   </div> */}
                                 <ClosedButton onClick={handleClosed}>
                                <IoCloseOutline></IoCloseOutline>
                            </ClosedButton>
                                   <div className={style.openMain__flexBox__popUp__header__logo}>
                                   </div>
                                   <div className={style.openMain__flexBox__popUp__header__nothing}>

                                   </div>
                            </div>
                            <MakeEvent valueOfEvent={openAndType.value}></MakeEvent>
                           </div>
                                :
                            (openAndType.type === 'updatePassword' ?
                            <div className={style.openMain__flexBox__popUp__NewTodos_body}>
                            <div className={`${style.openMain__flexBox__popUp__header__popUppage}`}>
                            <ClosedButton onClick={handleClosed}>
                                <IoCloseOutline></IoCloseOutline>
                            </ClosedButton>
        
                                   <div className={style.openMain__flexBox__popUp__header__logo}>
                                   <h1>update Password</h1>
                                   </div>
                                   <div className={style.openMain__flexBox__popUp__header__nothing}>

                                   </div>
                                   </div>
                            <Login requestType={'updatePassword'}></Login>
                           </div>
                                :
                      
                            (openAndType.type === 'Edit' ?
                            <div className={style.openMain__flexBox__popUp__Edit_body}>
                            <h1>Edit Post?</h1>
                            <p>This can’t be undone and it will be <br/> 
                            edited from your profile, the<br/> timeline of any accounts that follow<br/>you, and from search results.</p>
                                {/* sendTargetReply?:{text:string,profileImg:string,author:string} */}
                            {/* <NewTodos preinfoComment={sendTargetReply} handleUNsubmit={handleUNsubmit} userImg={userInfo?.profileImg}></NewTodos> */}
                            </div>
                                :
                            (openAndType.type === 'Delete' ?
                            <div className={style.openMain__flexBox__popUp__Post_body}>
                            <h1>Delete post?</h1>
                            <p>This can’t be undone and it will be <br/> 
                            removed from your profile, the<br/> timeline of any accounts that follow<br/>you, and from search results.</p>
                            <Button Background_color={'b-red'} handleClick={handleDeleteTodo}>Delete</Button>
                            {/* <button onClick={handleDeleteTodo}>delete</button> */}
                           </div>
        
                            // :
                            // (openAndType.type === 'Edit profile' ?
                            // <EditProfile onFileChange={handleFileChange} sendTargetReply={sendTargetReply!}></EditProfile>
                           :
                           (openAndType.type === 'categoryDeletePopup' ?
                           <div className={style.openMain__flexBox__popUp__NewTodos_body}>
                                 <div className={`${style.openMain__flexBox__popUp__header__popUppage}`}>
                                   {/* <div className={style.openMain__flexBox__popUp__header__circle} onClick={handleClosed}>
                                       <div className={style.openMain__flexBox__popUp__header__circle__container} >
                                           <IoCloseOutline/>   
                                       </div>
                                   </div> */}
                                 <ClosedButton onClick={handleClosed}>
                                <IoCloseOutline></IoCloseOutline>
                            </ClosedButton>
                                   <div className={style.openMain__flexBox__popUp__header__logo}>
                                   </div>
                                   <div className={style.openMain__flexBox__popUp__header__nothing}>

                                   </div>
                            </div>
                            <div className={style.openMain__flexBox__popUp__category_delete}>
                            <div className={style.openMain__flexBox__popUp__category_delete__p}>
                           <h1>{`정말로 ${openAndType.value}을 `}
                           삭제하시겠습니까?</h1>
                           <p>카테고리에 포함되어 있는 일정은 기본 카테고리와 병합되며 
                           <br/>이후로는 되돌릴 수 없습니다.</p>
                           </div>
                           <Button background_color={'b-red'} color={'white'} handleClick={handleDeleteTodo}>Delete</Button>
                           {/* <button onClick={handleDeleteTodo}>delete</button> */}
                          </div>
                          </div>
                          :
                          (openAndType.type === 'categoryAddPopup' ?
                          <div className={style.openMain__flexBox__popUp__NewTodos_body}>
                                <div className={`${style.openMain__flexBox__popUp__header__popUppage}`}>
                                  {/* <div className={style.openMain__flexBox__popUp__header__circle} onClick={handleClosed}>
                                      <div className={style.openMain__flexBox__popUp__header__circle__container} >
                                          <IoCloseOutline/>   
                                      </div>
                                  </div> */}
                                <ClosedButton onClick={handleClosed}>
                               <IoCloseOutline></IoCloseOutline>
                           </ClosedButton>
                                  <div className={style.openMain__flexBox__popUp__header__logo}>
                                  </div>
                                  <div className={style.openMain__flexBox__popUp__header__nothing}>

                                  </div>
                           </div>
                                <ColorSelector isAddOrEdit={'add'} independantPopup={true}></ColorSelector>
                         </div>
                         :
                            null
                            )
                            )
                            )
                            )
                            )        
                            )
                            )
                            )
                            )
                            
                                       
                            }

                        </div>
                </div>
        </div>
    )
}

export default FlexBox;