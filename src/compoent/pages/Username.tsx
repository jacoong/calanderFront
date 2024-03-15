import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {TodosContext,UserType} from '../../store/todo_context'
import { useRef,useContext,useState } from 'react';
import style from '../pages/css/Login.module.css'
import Button from '../compoentItem/Button';
import {userNameValidator} from '../validator'
import { FaUserCircle } from "react-icons/fa";


interface UsernameProps {
  handleUNsubmit?: (data: string) => void;
}

function Username({ handleUNsubmit }: UsernameProps) {
    const todoCtx = useContext(TodosContext);
    const navigate = useNavigate();
    const usernameRef = useRef<HTMLInputElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const userInfo = todoCtx.userInfo

    const savedData:any = localStorage.getItem('userDataKey'); 


    interface typeVaildation {
      touched: boolean,
      error: boolean, 
      message: string
    }

    type FileReadResult = string | ArrayBuffer | null;
    // type typeUserData = {
    //     username:string,
    //     id:string
    // }

    const [usernameValidate,setUsernameValidate] = useState<typeVaildation>({touched: false, error: false, message: ''})
    
    const [previewImage, setPreviewImage] = useState<FileReadResult>(null);

    const validateUsername = async(e:React.ChangeEvent<HTMLInputElement>) =>{
      const usernameRefValue = usernameRef.current!.value;
      const result = await userNameValidator(usernameRefValue)
      setUsernameValidate(result)
      
    }


    const handleFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
      // 선택된 파일 처리 로직
      const selectedFile = event.target.files?.[0];
  
      if (selectedFile) {
        const reader = new FileReader();
  
        reader.onloadend = () => {
          // 읽기가 완료되면 img의 src 속성에 data URL을 설정
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      }

    }

    const handleUserName = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();        

        let usernameRefValue = usernameRef.current!.value;
        const file = fileRef.current?.files?.[0];
        const formData = new FormData();
        const userId = JSON.parse(savedData);

        if (formData && file){
          formData.append('profileImg', file);
        }else{
          formData.append('profileImg', 'default');
        }
          formData.append('username', usernameRefValue);
          formData.append('id',userId)
        
          try{
            axiosPost(formData)
            usernameRefValue =  ""
            }
            catch{
              navigate('/')
            }
        }
        // const userId = todoCtx.userInfo._id;
    


    const axiosPost= async(data:any) =>{
        axios.post('https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/user/register/usernameImg',data ,{ withCredentials: true })
          .then((res) => {
              if(res.status === 201){
                  alert('need to use username!')
              }else if(res.status === 200){
                return handleUNsubmit!(res.data.result)
              }
          })
          .catch((err:Error) => {
            alert(err);
            navigate('/')
          });
      }

    return(
        <>  
            {/* <form onSubmit={(e) => handleUserName(e)}>
            <label htmlFor="userInput">Username</label>
            <input ref={usernameRef} type="text"  id="userInput"  placeholder="put your yourname!" required/>
            <button type="submit">send</button>
            </form> */}


            <div className={style.loginbox}>
              <form  onSubmit={(e) => handleUserName(e)} encType='multipart/form-data'>
                <div  className={style.loginbox__imageUpload}>
                <input id='imageFile' ref={fileRef} type="file" name="myFile" onChange={handleFileChange}/>
                  <div className={style.loginbox__imageUpload__imgfield}>
                    <label htmlFor='imageFile'>
                      {previewImage ?
                        <img src={String(previewImage)} alt='Selected'/>
                        :
                        <FaUserCircle></FaUserCircle>
                      } 
                    </label>
                  </div>
                </div>


                <div className={`${style.userbox}
                                   ${usernameValidate.touched
                                      ? (usernameValidate.error ? style.error : style.success)
                                      : style.initial}` }>

                  <input onChange={validateUsername} ref={usernameRef}  type="text" id='userInput' name=""  required={true}/>
                  <label htmlFor="email" >Nickname</label>
                  
                  <div className={style.userbox__vaildateMsg}>
                  <p>{usernameValidate.message}</p>
                  </div>
                 
                </div>


          

                {usernameValidate.touched && !usernameValidate.error
                ?
                <Button width={'large'}type="submit">Send</Button>
                : 
                <Button width={'large'} Background_color={'b-gary'} disabled={true} type="submit">Send</Button>
                } 

                {/* <FlashMessage handleOnclick={handleOnclick}/> */}
                {/* <Button width={'large'}type="submit">Send</Button>
                <Button width={'large'} Background_color={'b-gary'} disabled={true} type="submit">Send</Button> */}
              </form>
            </div>
      </>
    );
    }
    
export default Username;