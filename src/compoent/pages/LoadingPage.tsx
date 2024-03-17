import style from '../pages/css/LoadingPage.module.css';


function LoadingPage() {


          return (

           

              <div className={style.body}>
                <img alt={'dd'} src={process.env.PUBLIC_URL + '/img/Logo.png'}></img>
            </div>
        );
       };
       
    
export default LoadingPage;