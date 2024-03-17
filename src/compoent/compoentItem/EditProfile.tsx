import style from '../pages/css/FlexBox.module.css';
import { TbCameraUp } from "react-icons/tb";
import {typeOfSendTargetReply} from './FlexBox';
import { useRef,useContext,useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {TodosContext} from '../../store/todo_context'

interface typeOfEditProfile {
    sendTargetReply:typeOfSendTargetReply;
    onFileChange: (files:(string |File| null)[]) => void; 
  }



function EditProfile({sendTargetReply,onFileChange}:typeOfEditProfile) {

    const todoCtx = useContext(TodosContext);
    const savedData:any = localStorage.getItem('userDataKey'); 
    const navigate = useNavigate();

    const [previewImages, setPreviewImages] = useState<(string | null)[]>([null, null]);
    const [originalImages, setOriginalImages] = useState<( File|null)[]>([null, null]);
    const backgroundRef = useRef<HTMLInputElement>(null);
    const ProfileRef = useRef<HTMLInputElement>(null);


    const handleFileChange = (inputType: string) => (event:React.ChangeEvent<HTMLInputElement>) => {
        // 선택된 파일 처리 로직
        const selectedFile = event.target.files?.[0];
    
        if (selectedFile) {
            const reader = new FileReader();
    

            reader.onloadend = () => {
                // 읽기가 완료되면 img의 src 속성에 data URL을 설정
                const nextPreviewImages = previewImages.map((image, i) => {
                    if ((i === 0 && inputType === 'background') || (i === 1 && inputType === 'profile')) {
                        return reader.result as string; 
                    } else {
                        return image;
                    }
                });

                const uploadedImg = originalImages.map((image, i) => {
                    if ((i === 0 && inputType === 'background') || (i === 1 && inputType === 'profile')) {
                        return selectedFile
                    } else {
                        return image;
                    }
                });


                setPreviewImages(nextPreviewImages)
                onFileChange(uploadedImg);
                setOriginalImages(uploadedImg)
            };
            reader.readAsDataURL(selectedFile);
        }
        
  
      }
  
      // const handleUserName = async(e:React.FormEvent<HTMLFormElement>) =>{
      //     e.preventDefault();        
  
      //     const backgroundFile = backgroundRef.current?.files?.[0];
      //     const ProfileFile = ProfileRef.current?.files?.[0];
      //     const formData = new FormData();
      //     const userId = JSON.parse(savedData);
  
      //     if (backgroundFile){
      //       formData.append('backgroundImage', backgroundFile);
      //     } else {
      //       formData.append('backgroundImage', 'default');
      //     }
          
      //     if (ProfileFile){
      //       formData.append('profileImage', ProfileFile);
      //     } else {
      //       formData.append('profileImage', 'default');
      //     }
      //     formData.append('id',userId)
          
      //       try{
      //         axiosPost(formData)
      //         }
      //         catch{
      //           navigate('/')
      //         }
      //     }


          const axiosPost= async(data:any) =>{
            axios.post('https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/user/edit/editData',data ,{ withCredentials: true })
              .then((res) => {
                  if(res.status === 201){
                      alert('need to use username!')
                  }else if(res.status === 200){
                    return 
                  }
              })
              .catch((err:Error) => {
                alert(err);
                navigate('/')
              });
          }

          useEffect(()=>{
            if(todoCtx.userInfo){
                const userInfo = todoCtx.userInfo.userInfo;
                console.log(todoCtx.userInfo);
                const profileImgUrl = userInfo.profileImg ? `https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/public/profileImg/${userInfo.profileImg}` : '';
                const backgroundImgUrl = userInfo.backgroundImg ? `https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/public/backgroundImg/${userInfo.backgroundImg}` : '';
                setPreviewImages([backgroundImgUrl, profileImgUrl]);
            }else{
              return
            }
          },[todoCtx.userInfo])

  return (
    <>
      <div className={style.openMain__flexBox__popUp__Post_body}>
        <div className={style.openMain__flexBox__popUp__Post_body__Background}>
    
                <div className={style.openMain__flexBox__popUp__Post_body__Background__container}>
                <label className={style.label} htmlFor='imageFile'>
                    <input id='imageFile' ref={backgroundRef} type="file" name="myFile" onChange={handleFileChange('background')}/>
                    <TbCameraUp />
                </label>
                </div>
                  {previewImages[0] ?
                    <img src={String(previewImages[0])} alt='Selected'/>
                    :
                    null
                  } 

        </div>  
        <div className={style.openMain__flexBox__popUp__Post_body__profile}>
          <div className={style.openMain__flexBox__popUp__Post_body__profile__container}>
                    {previewImages[1]
                    ?
                
                    <img src={String(previewImages[1])} alt='Selected'/>
                        :
                    <div className={style.loginbox__imageUpload__imgfield}></div>
                    }
                
    
            
            <div className={style.openMain__flexBox__popUp__Post_body__profile__container__uploadIcon}>
              <div className={style.openMain__flexBox__popUp__Post_body__profile__container__uploadIcon__container}>
              <label className={style.label} htmlFor='imageProfile'>
                    <input id='imageProfile' ref={ProfileRef} type="file" name="myFile" onChange={handleFileChange('profile')}/>
                <TbCameraUp />
                </label>
              </div>
            </div>
          </div>
        </div>  
        {/* <button onClick={handleDeleteTodo}>delete</button> */}
      </div>
    </>
  );
}

export default EditProfile;
