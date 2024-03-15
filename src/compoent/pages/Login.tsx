import {TodosContext} from '../../store/todo_context'
import {useContext,useEffect,useState,useRef} from 'react';
import { useNavigate,Link } from 'react-router-dom'; // If yo
import style from './css/Login.module.css';
import {useSendIdPwInfo} from '../customHook'
import Button from '../compoentItem/Button';
import {emailValidator,passwordValidator,confirmPasswordValidator} from '../validator'
import FlashMessage from '../compoentItem/FlashMessage';
import axios from 'axios'

type LoginPropsType = {
  nextPopUpPage?:()=>void;
  requestType:'login' | 'register' | 'recreatePassword';
}

type RequestTypeOnly = LoginPropsType['requestType'];

function Login({nextPopUpPage,requestType}:LoginPropsType) {
        const todoCtx = useContext(TodosContext);
 
        interface typeVaildation {
          touched: boolean,
          error: boolean, 
          message: string
        }

        // const passwordRef = useRef<HTMLInputElement>(null);
        // const emailRef = useRef<HTMLInputElement>(null);
        const passwordConfirmRef = useRef<HTMLInputElement>(null)


        const [emailValidate,setEmailValidate] = useState<typeVaildation>({touched: false, error: false, message: ''})
        const [passwordValidate,setPasswordValidate] = useState<typeVaildation>({touched: false, error: false, message: ''})
        const [passwordConfirmValidate,setPasswordConfirmValidate] = useState<typeVaildation>({touched: false, error: false, message: ''})
        const [isLoadingConfirm,setIsLoadingConfirm] = useState(false);
        
        const navigate = useNavigate();

        const {handleInputSubmit,passwordRef,emailRef} = useSendIdPwInfo();


        useEffect(() => {
            // If there's an error message, navigate to the error page
            if (todoCtx.ErrorMsg) {
                navigate('/error',{ state:todoCtx.ErrorMsg }); // If you're using React Router v6, use 'navigate("/error")'
            }
          }, [todoCtx.ErrorMsg]); 


          const handleEmail = async(e:React.ChangeEvent<HTMLInputElement>) =>{
            const emailRefValue = emailRef.current!.value;

            if (requestType === 'register') {
              setEmailValidate(await emailValidator(emailRefValue,'register'));
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

          const handlePasswordConfirm = (e:React.ChangeEvent<HTMLInputElement>) =>{
            const passwordRefValue = passwordRef.current!.value;
            const passwordConfirmRefValue = passwordConfirmRef.current!.value;
            const result = confirmPasswordValidator(passwordRefValue,passwordConfirmRefValue);
            setPasswordConfirmValidate(result)
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
            
            setIsLoadingConfirm(true);  // loading activated

            const emailValue = emailRef.current!.value;
            
            axios.post(`${todoCtx.serverUrl}/api/auth/recreatePassword/${emailValue}`,
              {encodedCheckCode : "test", checkCode : "test"})
              .then(res => {
                if(res.status===200){
                  alert('recreatePassword done')
                  setIsLoadingConfirm(false); // loading disactivated
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
            axios.post(`${todoCtx.serverUrl}/api/auth/signUp`,
            {email:emailValue,password:passwordValue})
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
      };

      const LoginLogic = (emailValue:string,passwordValue:string)=>{
        axios.post(`${todoCtx.serverUrl}/api/auth/login`,
        {email:emailValue,password:passwordValue})
        .then(res => {
          if(res.status===200){
            // navigate('/main');
            alert('login done')
          }
        })
        .catch(error => {
          console.log(`post response: test`, error);
        });
      }





          return (

           

              <div className={style.loginbox}>
                    {requestType ===  'recreatePassword'? 
                    
              (<form onSubmit={(e) =>{handleSubmit(e,'recreatePassword')}}>
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
              </form>)
              :
              (<form  onSubmit={(e) => handleSubmit(e,requestType)}>
               

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
              </form>)}
            </div>
        );
       };
       
    
export default Login;