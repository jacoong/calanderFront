import {TodosContext} from '../../store/todo_context'
import {useContext,useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom'; // If yo
import {useSendIdPwInfo} from '../customHook'
import style from './css/Login.module.css';
import Button from '../compoentItem/Button';
import {emailValidator,passwordValidator,confirmPasswordValidator} from '../validator'
import FlashMessage from '../compoentItem/FlashMessage';

function Register() {
        const todoCtx = useContext(TodosContext);
        const navigate = useNavigate();

 
        interface typeVaildation {
          touched: boolean,
          error: boolean, 
          message: string
        }


        const [emailValidate,setEmailValidate] = useState<typeVaildation>({touched: false, error: false, message: ''})
        const [passwordValidate,setPasswordValidate] = useState<typeVaildation>({touched: false, error: false, message: ''})
        const [passwordConfirmValidate,setPasswordConfirmValidate] = useState<typeVaildation>({touched: false, error: false, message: ''})
        const {handleInputSubmit,passwordRef,passwordConfirmRef,emailRef} = useSendIdPwInfo();

        
        
        useEffect(() => {
            // If there's an error message, navigate to the error page
            if (todoCtx.ErrorMsg) {
                navigate('/error',{ state:todoCtx.ErrorMsg }); // If you're using React Router v6, use 'navigate("/error")'
            }
          }, [todoCtx.ErrorMsg]); 

          const handleEmail = async(e:React.ChangeEvent<HTMLInputElement>) =>{
            const emailRefValue = emailRef.current!.value;
            const result = await emailValidator(emailRefValue,'Register')
            setEmailValidate(result)
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


          useEffect(()=>{
            console.log(todoCtx.RsgLogMsg)
          },[todoCtx.RsgLogMsg])

          return (

           

              <div className={style.loginbox}>
              <form  onSubmit={(e) => handleInputSubmit(e,"Register",todoCtx.RegisterOrLogin)}>  
                <div className={`${style.userbox}
                     
                                   ${emailValidate.touched
                                      ? (emailValidate.error ? style.error : style.success)
                                      : style.initial}`}>
                                        
                  <input onChange={handleEmail} ref={emailRef}  type="text" id='email' name=""  required={true}/>
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
                  <input  onChange={handlePassword}  ref={passwordRef} type="password" id="password" name=""required={true}/>
                  <label htmlFor="password" >Password</label>
                  
                  <div className={style.userbox__vaildateMsg}>
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
                    <label htmlFor="passwordConfirm" >Password Confirm</label>
                    
                    <div className={style.userbox__vaildateMsg}>
                    <p>{passwordConfirmValidate.message}</p>
                    </div>
                  </div>

                

                {/* <div className={`${style.userbox}
                     
                     ${passwordValidate.touched
                        ? (passwordValidate.error ? style.error : style.success)
                        : style.initial}`
                    }
                >
                    <input  onChange={handlePassword}  ref={passwordRef} type="password" id="password" name=""required={true}/>
                    <label htmlFor="password" >Password</label>
                    
                    <div className={style.userbox__vaildateMsg}>
                    <p>{passwordValidate.message}</p>
                    </div>
                </div> */}

                {passwordValidate.touched && !passwordValidate.error && emailValidate.touched && !emailValidate.error && passwordConfirmValidate.touched && !passwordConfirmValidate.error
                ?
                <Button width={'large'}type="submit">Send</Button>

                :
                <Button width={'large'} Background_color={'b-gary'} disabled={true} type="submit">Send</Button>
                }

                <FlashMessage handleOnclick={handleOnclick}/>
                {/* <Button width={'large'}type="submit">Send</Button>
                <Button width={'large'} Background_color={'b-gary'} disabled={true} type="submit">Send</Button> */}
              </form>
            </div>
        );
       };
       
    
export default Register;