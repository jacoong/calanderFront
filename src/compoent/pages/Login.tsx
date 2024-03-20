import {TodosContext} from '../../store/todo_context'
import {useContext,useEffect,useState,useRef} from 'react';
import { useNavigate } from 'react-router-dom'; // If yo
import style from './css/Login.module.css';
import {useSendIdPwInfo} from '../customHook'
import Button from '../compoentItem/Button';
import {emailValidator,passwordValidator,prepasswordValidator,confirmPasswordValidator,encodedCheckCodeValidator} from '../validator'
import FlashMessage from '../compoentItem/FlashMessage';
import axios from 'axios'
import { TypeOfLoginValue } from '../compoentItem/FlexBox';

type LoginPropsType = {
  nextPopUpPage?:()=>void;
  requestType:'login' | 'register' | 'recreatePassword' | 'updatePassword' | 'encodedCheckCode';
  savedUserLoginInfo?: (setEmailPasswordValue:TypeOfLoginValue)=> void;
  valueOfUserLoginInfo?:TypeOfLoginValue;
}



type RequestTypeOnly = LoginPropsType['requestType'];

function Login({nextPopUpPage,requestType,savedUserLoginInfo,valueOfUserLoginInfo}:LoginPropsType) {
        const todoCtx = useContext(TodosContext);
 
        interface typeVaildation {
          touched: boolean,
          error: boolean, 
          message: string
        }


        // const savedencodedCheckCode:any = localStorage.getItem('userDataKey');
        // localStorage.clear();
        // localStorage.setItem('userDataKey', );
        // const passwordRef = useRef<HTMLInputElement>(null);
        // const emailRef = useRef<HTMLInputElement>(null);
        const passwordConfirmRef = useRef<HTMLInputElement>(null)
        const prepasswordRef = useRef<HTMLInputElement>(null);
        const encodedCheckCodeRef = useRef<HTMLInputElement>(null);


        const [emailValidate,setEmailValidate] = useState<typeVaildation>({touched: false, error: false, message: ''})
        const [prepasswordValidate,setPrepasswordValidate] = useState<typeVaildation>({touched: false, error: false, message: ''})
        const [passwordValidate,setPasswordValidate] = useState<typeVaildation>({touched: false, error: false, message: ''})
        const [passwordConfirmValidate,setPasswordConfirmValidate] = useState<typeVaildation>({touched: false, error: false, message: ''})
        const [encodedCheckCodeValidate,setEncodedCheckCodeValidate] = useState<typeVaildation>({touched: false, error: false, message: ''})
        // const [isLoadingConfirm,setIsLoadingConfirm] = useState(false);
        
        const navigate = useNavigate();

        const {passwordRef,emailRef} = useSendIdPwInfo();


        useEffect(() => {
            // If there's an error message, navigate to the error page
            if (todoCtx.ErrorMsg) {
                navigate('/error',{ state:todoCtx.ErrorMsg }); // If you're using React Router v6, use 'navigate("/error")'
            }
          }, [todoCtx.ErrorMsg,navigate]); 


          const handleEmail = async(e:React.ChangeEvent<HTMLInputElement>) =>{
            const emailRefValue = emailRef.current!.value;

            if (requestType === 'register') {
              setEmailValidate(await emailValidator(emailRefValue));  //register should add after
            } else {
              setEmailValidate(await emailValidator(emailRefValue));
            }

            return
          }

          const handlePassword = (e:React.ChangeEvent<HTMLInputElement>) =>{
            const passwordRefValue = passwordRef.current!.value;
            const result = passwordValidator(passwordRefValue);
            setPasswordValidate(result)
          }

          const handleprePassword = (e:React.ChangeEvent<HTMLInputElement>) =>{
            const passwordRefValue = prepasswordRef.current!.value;
            const result = prepasswordValidator(passwordRefValue);
            setPrepasswordValidate(result)
          }

          const handlePasswordConfirm = (e:React.ChangeEvent<HTMLInputElement>) =>{
            const passwordRefValue = passwordRef.current!.value;
            const passwordConfirmRefValue = passwordConfirmRef.current!.value;
            const result = confirmPasswordValidator(passwordRefValue,passwordConfirmRefValue);
            setPasswordConfirmValidate(result)
          }

          const handleEncodedCheckCode = (e:React.ChangeEvent<HTMLInputElement>) =>{
            const encodedCheckCode = encodedCheckCodeRef.current!.value;
            const limitedEncodedCheckCode = limitNumberDigit(encodedCheckCode, 4); // 최대 길이를 4로 제한합니다.
            encodedCheckCodeRef.current!.value = limitedEncodedCheckCode; // 입력 필드의 값을 업데이트합니다.
            const result = encodedCheckCodeValidator(limitedEncodedCheckCode); // 제한된 값으로 유효성 검사를 수행합니다.
            setEncodedCheckCodeValidate(result)
          }


            const limitNumberDigit = (el: string, maxlength: number): string => {
              console.log('sefsef')
              if (el.length > maxlength) {
                return el.substring(0, maxlength);
              }
              return el; // 최대 길이를 초과하지 않으면 원래의 문자열을 반환합니다.
            }

          const handleOnclick = (result:string) =>{
            if(result){
              setEmailValidate({touched: false, error: false, message: ''})
              setPasswordValidate({touched: false, error: false, message: ''})
              emailRef.current!.value  = "";
              passwordRef.current!.value  = "";
            }
          }


        const handleSubmit = (e:React.FormEvent<HTMLFormElement>,requestType: RequestTypeOnly) => {
          e.preventDefault();
          // let emailRefValue = null
          if(requestType === 'recreatePassword'){
            
            // setIsLoadingConfirm(true);  // loading activated

            const emailValue = emailRef.current!.value;
            
            axios.post(`${todoCtx.serverUrl}/api/auth/recreatePassword/${emailValue}`,
              {encodedCheckCode : "test", checkCode : "test"},{ withCredentials: true })
              .then(res => {
                if(res.status===200){
                  alert('recreatePassword done')
                  // setIsLoadingConfirm(false); // loading disactivated
                          nextPopUpPage!();
                }
            })
            .catch(error => {
              console.log(`post response: test${emailValue}`, error);
              // nextPopUpPage();
            });
          }
          
          else if(requestType === 'login'){
            const emailValue = emailRef.current!.value;
            const passwordValue = passwordRef.current!.value;
            LoginLogic(emailValue,passwordValue)
          }

          else if(requestType === 'register'){
            const emailValue = emailRef.current!.value;
            const passwordValue = passwordRef.current!.value;

            axios.post(`${todoCtx.serverUrl}/api/auth/send/check/emailCode/${emailValue}`,
            {email:emailValue},{ withCredentials: true })
            .then(res => {
              if(res.status===200){
                const encodedCheckCode:string = res.data.body.encodedCheckCode;
                console.log(encodedCheckCode);
                if (savedUserLoginInfo) {
                savedUserLoginInfo({email:emailValue,password:passwordValue,encodedCheckCode:encodedCheckCode})
                nextPopUpPage!();
                }else{
                  throw Error
                }
                return;
                // LoginLogic(emailValue,passwordValue)
              }
            })
            .catch(error => {
              console.log(`post response: test`, error);
            });
          }

          else if(requestType === 'updatePassword'){
            const prepassword = prepasswordRef.current!.value;
            const passwordValue = passwordRef.current!.value;
            axios.patch(`${todoCtx.serverUrl}/api/update/password`,
            {oldPassword:prepassword,newPassword:passwordValue},{ withCredentials: true })
            .then(res => {
              if(res.status===200){
                alert('poassword  change done')

              }
            })
            .catch(error => {
              console.log(`post response: test`, error);
            });
          }

          else if(requestType === 'encodedCheckCode'){
            console.log(valueOfUserLoginInfo,'??')
            if(valueOfUserLoginInfo){
            const encodedCheckCode = encodedCheckCodeRef.current!.value;
            axios.post(`${todoCtx.serverUrl}/api/auth/check/email`,
            {encodedCheckCode:valueOfUserLoginInfo.encodedCheckCode,checkCode:encodedCheckCode},{ withCredentials: true })
            .then(res => {
              if(res.status===200){
                alert('validate done')
                RegisterLogic(valueOfUserLoginInfo.email,valueOfUserLoginInfo.password)
              }
            })
            .catch(error => {
              console.log(`post response: test`, error);
            });}else{
              throw Error
            }
          }
      };




      const LoginLogic = (emailValue:string,passwordValue:string)=>{
        console.log('why?')
        axios.post(`${todoCtx.serverUrl}/api/auth/login`,
        {email:emailValue,password:passwordValue},{ withCredentials: true })
        .then(res => {
          if(res.status===200){
            console.log('pizzaaa')
            navigate('/main');
          }
        })
        .catch(error => {
          console.log(`post response: test`, error);
        });
      }

      const RegisterLogic = (emailValue:string,passwordValue:string)=>{
            axios.post(`${todoCtx.serverUrl}/api/auth/signUp`,
            {email:emailValue,password:passwordValue},{ withCredentials: true })
            .then(res => {
              if(res.status===200){
                alert('signup done')
                LoginLogic(emailValue,passwordValue)
              }
            })
            .catch(error => {
              console.log(`post response: test`, error);
            });
      }



          return (

           

              <div className={style.loginbox}>



                  {requestType ===  'recreatePassword'? 
                        
                  <form onSubmit={(e) =>{handleSubmit(e,'recreatePassword')}}>
                    <div className={`${style.userbox}
                      ${emailValidate.touched
                        ? (emailValidate.error ? style.error : style.success)
                        : style.initial}`
                      }
                    >
                      <input onChange={handleEmail} ref={emailRef} type="text" id='email' name="" required={true} />
                      <label htmlFor="email">Email</label>
                      <div className={style.userbox__vaildateMsg}>
                        <p>{emailValidate.message}</p>
                      </div>
                    </div>

                    {emailValidate.touched && !emailValidate.error
                      ? <Button width={'large'} type="submit">Send</Button>
                      : <Button width={'large'} Background_color={'b-gary'} disabled={true} type="submit">Send</Button>
                    }
              

                    <FlashMessage handleOnclick={handleOnclick} />
                  </form>
                  :
                  (requestType ==='updatePassword' ? 





                  <form  onSubmit={(e) => handleSubmit(e,'updatePassword')}>
                  <div className={`${style.userbox}
                      
                                    ${prepasswordValidate.touched
                                        ? (prepasswordValidate.error ? style.error : style.success)
                                        : style.initial}`
                                    }
                  >
                    <input  onChange={handleprePassword}  ref={prepasswordRef} type="prepassword" id="prepassword" name="prepassword"required={true}/>
                    <label htmlFor="prepassword" >Previous Password</label>
                    
                    <div style={{marginBottom:'0px'}} className={style.userbox__vaildateMsg}>
                    <p>{prepasswordValidate.message}</p>
                    </div>
                  </div>
            
                  <div className={`${style.userbox}
                        
                        ${passwordValidate.touched
                            ? (passwordValidate.error ? style.error : style.success)
                            : style.initial}`
                        }
                    >
                      <input  onChange={handlePassword}  ref={passwordRef} type="password" id="password" name="password"required={true}/>
                      <label htmlFor="password" >Password</label>
                      
                      <div style={{marginBottom:'0px'}} className={style.userbox__vaildateMsg}>
                      <p>{passwordValidate.message}</p>
                      </div>
                    </div>

                  <div className={`${style.userbox}
                      
                  ${passwordConfirmValidate.touched
                    ? (passwordConfirmValidate.error ? style.error : style.success)
                    : style.initial}`
                                }
              >
                <input  onChange={handlePasswordConfirm} ref={passwordConfirmRef} type="password" id="passwordConfirm" name=""required={true}/>
                <label htmlFor="passwordConfirm" >New Password Confirm</label>
                
                <div className={style.userbox__vaildateMsg}>
                <p>{passwordConfirmValidate.message}</p>
                </div>
              </div>




                  {passwordValidate.touched && !passwordValidate.error && prepasswordValidate.touched && !prepasswordValidate.error
                          ? <Button width={'large'} type="submit">Send</Button>
                          : <Button width={'large'} Background_color={'b-gary'} disabled={true} type="submit">Send</Button>}
      


                  <FlashMessage handleOnclick={handleOnclick}/>
                  {/* <Button width={'large'}type="submit">Send</Button>
                  <Button width={'large'} Background_color={'b-gary'} disabled={true} type="submit">Send</Button> */}
                  </form>
                  :

                  (requestType ==='encodedCheckCode' ? 

                  <form  onSubmit={(e) => handleSubmit(e,'encodedCheckCode')}>
                  <div className={`${style.userbox}
                      
                                    ${encodedCheckCodeValidate.touched
                                        ? (encodedCheckCodeValidate.error ? style.error : style.success)
                                        : style.initial}`
                                    }
                  >
                    <input type='text' onChange={handleEncodedCheckCode}  ref={encodedCheckCodeRef}  id="encodedCheckCode" name="encodedCheckCode"required={true}
                    />
                    <label htmlFor="encodedCheckCode" >Vaildate Code</label>
                    
                    <div style={{marginBottom:'0px'}} className={style.userbox__vaildateMsg}>
                    <p>{encodedCheckCodeValidate.message}</p>
                    </div>
                  </div>


                  {encodedCheckCodeValidate.touched && !encodedCheckCodeValidate.error
                          ? <Button width={'large'} type="submit">Send</Button>
                          : <Button width={'large'} Background_color={'b-gary'} disabled={true} type="submit">Send</Button>}
      


                  <FlashMessage handleOnclick={handleOnclick}/>
                  {/* <Button width={'large'}type="submit">Send</Button>
                  <Button width={'large'} Background_color={'b-gary'} disabled={true} type="submit">Send</Button> */}
                  </form>
                  :









                  <form  onSubmit={(e) => handleSubmit(e,requestType)}>
                  

                    <div className={`${style.userbox}
                        
                                      ${emailValidate.touched
                                          ? (emailValidate.error ? style.error : style.success)
                                          : style.initial}`
                                      }
                    >
                      <input onChange={handleEmail} ref={emailRef}  type="text" id='email' name="email"  required={true}/>
                      <label htmlFor="email" >Email</label>
                      
                      <div className={style.userbox__vaildateMsg}>
                      <p>{emailValidate.message}</p>
                      </div>
                    
                    </div>


                    <div className={`${style.userbox}
                        
                                      ${passwordValidate.touched
                                          ? (passwordValidate.error ? style.error : style.success)
                                          : style.initial}`
                                      }
                    >
                      <input  onChange={handlePassword}  ref={passwordRef} type="password" id="password" name="password"required={true}/>
                      <label htmlFor="password" >Password</label>
                      
                      <div style={{marginBottom:'0px'}} className={style.userbox__vaildateMsg}>
                      <p>{passwordValidate.message}</p>
                      </div>
                    </div>
              

                    {requestType ===  'login'? 
                    <div className={style.recreatePassword__container}>
                      <p className={style.recreatePassword__container__p} onClick={nextPopUpPage}>Forget Password?</p>
                    </div>
                    :
                    <div className={`${style.userbox}
                        
                    ${passwordConfirmValidate.touched
                      ? (passwordConfirmValidate.error ? style.error : style.success)
                      : style.initial}`
                                  }
                >
                  <input  onChange={handlePasswordConfirm} ref={passwordConfirmRef} type="password" id="passwordConfirm" name=""required={true}/>
                  <label htmlFor="passwordConfirm" >Password Confirm</label>
                  
                  <div className={style.userbox__vaildateMsg}>
                  <p>{passwordConfirmValidate.message}</p>
                  </div>
                </div>}




                    {passwordValidate.touched && !passwordValidate.error && emailValidate.touched && !emailValidate.error
                            ? <Button width={'large'} type="submit">Send</Button>
                            : <Button width={'large'} Background_color={'b-gary'} disabled={true} type="submit">Send</Button>}
        


                    <FlashMessage handleOnclick={handleOnclick}/>
                    {/* <Button width={'large'}type="submit">Send</Button>
                    <Button width={'large'} Background_color={'b-gary'} disabled={true} type="submit">Send</Button> */}
                  </form>
                  )
                  )
                  }





            </div>
        );
       };
      
    
export default Login;