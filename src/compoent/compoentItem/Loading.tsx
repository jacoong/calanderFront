
import style from '../pages/css/Loading.module.css'



const Loading =() => {


return (
    <div className={style.Loading__Container}>
        <span className={style.Loading__Container__loader}></span>
    </div>
);
}



export default Loading;