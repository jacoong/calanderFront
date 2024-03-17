import Button from '../compoentItem/Button'


import style from '../pages/css/Home.module.css';
import { useNavigate } from 'react-router-dom';


interface TypeOfFunction {
    handleMakeAcount():void;
    handleLogin():void;
    handleClosed():void;
}


const popupWidth = 500;
const popupHeight = 700;

const popupX = (window.screen.width / 2) - (popupWidth / 2);
// 만들 팝업창 width 크기의 1/2 만큼 보정값으로 빼주었음

const popupY= (window.screen.height / 2) - (popupHeight / 2);

function JoinForm({handleMakeAcount,handleLogin,handleClosed}:TypeOfFunction) {



    const handleClick = () =>{
        console.log('not yeT!')
    }

    const handleSignUpGoogleClick = () =>{
        window.open('https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/user/auth/google', '_self', 'status=no, height=' + popupHeight  + ', width=' + popupWidth  + ', left='+ popupX + ', top='+ popupY);
    } 

return(
            <>
            <div className={style.main__right__container__button}>
            <Button handleClick={handleSignUpGoogleClick} Background_color={'b-white'} font_color={'f-black'}>Join with Google1</Button>
            </div>

            <div className={style.main__right__container__button}>
            <Button Background_color={'b-black'} font_color={'f-white'} handleClick={handleClick}>Join with Apple</Button>
            </div>

                                

            <div className={style.main__right__container__or}>
                <div className={style.main__right__container__or__line}></div>

                <div className={style.main__right__container__or__text}>
                <p>Or</p>
                </div>

                <div className={style.main__right__container__or__line}></div>
            </div>

            <div className={style.main__right__container__button}>
            <Button handleClick={handleMakeAcount}>Make Account</Button>
            </div>

            <div className={style.main__right__container__alreadyJoined}>

                <div className={style.main__right__container__alreadyJoined__container}>
                <p>Already joined here?</p>
                </div>

                <div className={style.main__right__container__button}>
                <Button Background_color={'b-white'} font_color={'f-blue'} handleClick={handleLogin}>Log In</Button>
                </div>
            </div>
            </>
)
}

export default JoinForm;