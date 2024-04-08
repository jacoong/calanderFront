import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom';

function SocialLoginPage() {
    const navigate = useNavigate();
    const { typeOfPlanform } = useParams();

    const socialFuntion = async() =>{

    if(typeOfPlanform === 'google' || typeOfPlanform === 'kakao' || typeOfPlanform === 'naver'){
            const code = new URL(window.location.href).searchParams.get("code");
            console.log('code',code)
            // axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/login/${typeOfPlanform}`, code, {
            //     headers: {
            //       'Content-Type': 'application/json'
            //     }
            //   })
            //   .then((response) => {
            //     if(response.status === 200){ navigate('/main')}
            //   })
            //   .catch((error) => {
            //     console.error('에러 발생:', error);
            //   });
        }else{
            navigate('/404')
        }
    }

    console.log('typeOfPlanform',typeOfPlanform)
    socialFuntion();

return(

    <div>
    </div>
  )
  }
  
  export default SocialLoginPage;