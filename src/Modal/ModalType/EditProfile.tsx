import React from 'react';
import { useRef,useState,useContext } from 'react';
import Button from '../../compoent/compoentItem/Button';
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';
import ModalLayer from '../ModalLayerType/ModalLayer';
import useModal from '../../hook/useModal';
import { typeVaildation } from '../../store/types';
import { AxiosError } from 'axios';
import CustomValidaterInput from '../../compoent/compoentItem/CustomValidaterInput';
import styles from './ModalTypeCss/EditProfile.module.css';
interface UsernameProps {
  handleUNsubmit?: (data: string) => void;
//   isDark?:boolean;
}


function Username({ handleUNsubmit }: UsernameProps) {

    const savedData:any = localStorage.getItem('userDataKey'); 
    // const modalState = useSelector(modalSelector);
    const {closeModal} = useModal();
  
    // props를 콘솔에 출력 (선택사항)

    type FileReadResult = string | ArrayBuffer | null;

    const [usernameValidate,setUsernameValidate] = useState<typeVaildation>({touched: false, error: false, message: '',value:''})
    const [previewImage, setPreviewImage] = useState<FileReadResult>(null);
    const [imageFiles, setImageFiles] = useState<FileList | null>(null);

    const validateUsername = (type:string,validateResult:typeVaildation,inputValue:string) =>{
        if(type === 'userName'){
            const userNameValidate = { ...validateResult, value: inputValue };
            setUsernameValidate(userNameValidate)
        }else{
            console.log('error')
            return
        }
    }

    const handleFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
      // 선택된 파일 처리 로직
      setImageFiles(event.target.files);
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

  

    // const createNicknameProfileImg = useMutation<void, AxiosError<{ message: string }>,FormData>(UserService.createNicknameProfileImg, {
    //     onSuccess: () => {
    //         console.log('이미지 업로드 성공');
    //         closeModal();
    //     },
    //     onError: (error:AxiosError) => {
    //         alert(error.response?.data || '이미지 업로드 실패');
    //     }
    //     });
        // const userId = todoCtx.userInfo._id;
    
    const submitProfileInfo =async(e:React.FormEvent<HTMLFormElement>)=> {
      e.preventDefault();
      
    const username = usernameValidate.value; // 사용자 이름
    console.log(username,imageFiles)
    const formData = new FormData();

    // 파일을 FormData에 추가
    if (imageFiles && imageFiles.length > 0) {
        const filesArray = Array.from(imageFiles);
        filesArray.forEach((file:File,index) => {
            formData.append(`files`, file); // 'files'는 서버에서 받을 필드 이름
        });
    }

    // 사용자 이름을 FormData에 추가
    formData.append('username', username); // 'username'은 서버에서 받을 필드 이름

    // for (let pair of formData.entries()) {
    //     console.log(pair[0] + ':', pair[1]);
    //   }
    //   createNicknameProfileImg.mutate(formData)
    }


    return(

            // <ModalLayer width={'w-100'} isCenterMessage={'프로파일을 완성하세요!'} isCloseButtonShow={false}>
             <div className={styles.container}>
      <form onSubmit={(e) => submitProfileInfo(e)} encType="multipart/form-data">
        <div className={styles.form}>
          <input
            className={styles.hiddenInput}
            id="imageFile"
            type="file"
            name="myFile"
            onChange={handleFileChange}
          />
          <div className={styles.imageContainer}>
            <label className={styles.label} htmlFor="imageFile">
              {previewImage ? (
                <img
                  className={styles.image}
                  src={String(previewImage)}
                  alt="Selected"
                />
              ) : (
                <FaUserCircle
                  className={`${styles.icon} ${
                  styles.iconLight
                  } ${styles.iconHover}`}
                />
              )}
            </label>
          </div>
        </div>

        <CustomValidaterInput
          type="userName"
          sendValidateValue={validateUsername}
        />

{usernameValidate.touched && !usernameValidate.error 
                ?
                <Button width={'large'}  color={'white'} type="submit">Send</Button>
                : 
                <Button width={'large'} background_color={'b-gary'} disabled={true} type="submit">Send</Button>
                } 
      </form>
    </div>
            // </ModalLayer>
    );
    }
    
export default Username;