import Button from '../compoentItem/Button'
import SocialKakao from '../SocialKakao';
import SocialGoogle from '../SocialGoogle';
import SocialNaver from '../SocialNaver';

import style from '../pages/css/Home.module.css';


interface TypeOfFunction {
    handleMakeAcount():void;
    handleLogin():void;
    handleClosed():void;
}


function JoinForm({handleMakeAcount,handleLogin,handleClosed}:TypeOfFunction) {




return(
            <>
            <div className={style.main__right__container__button}>
            <SocialKakao></SocialKakao>
            </div>

            <div className={style.main__right__container__button}>
            <SocialGoogle></SocialGoogle>
            </div>

            <div className={style.main__right__container__button}>
            <SocialNaver></SocialNaver>
            </div>

                                

            <div className={style.main__right__container__or}>
                <div className={style.main__right__container__or__line}></div>

                <div className={style.main__right__container__or__text}>
                <p>Or</p>
                </div>

                <div className={style.main__right__container__or__line}></div>
            </div>

            <div className={style.main__right__container__button}>
            <Button color={'white'} handleClick={handleMakeAcount}>Make Account</Button>
            </div>

            <div className={style.main__right__container__alreadyJoined}>

                <div className={style.main__right__container__alreadyJoined__container}>
                <p>Already joined here?</p>
                </div>

                <div className={style.main__right__container__button}>
                <Button background_color={'b-white'} color={'#1D9BF0'} handleClick={handleLogin}>Log In</Button>
                </div>
            </div>
            </>
)
}

export default JoinForm;