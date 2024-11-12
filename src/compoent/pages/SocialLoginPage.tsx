import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom';
import { refreshAxios, instance,addResponseInterceptor,addAccessTokenInterceptor,addAccessResponseIntoCookie } from '../../store/axios_context';


function SocialLoginPage() {
    const navigate = useNavigate();
    const { typeOfPlanform } = useParams();

    const socialFuntion = async() =>{

    if(typeOfPlanform === 'google' || typeOfPlanform === 'kakao' || typeOfPlanform === 'naver'){
      const url = new URL(window.location.href);
      const codeParam: string | null = url.searchParams.get("code");
      console.log(typeOfPlanform,'typeOfPlanform')
      if (codeParam !== null) {
        socialRequest(codeParam)

      }
    }
  }

  const apple = async(codeParam:any)=>{
    try {
      const response = await axios.post(
          'https://oauth2.googleapis.com/token',
          `code=${codeParam}&client_id=${process.env.REACT_APP_GOOGLE_APIKEY}&client_secret=${process.env.REACT_APP_GOOOGLE_APIKEY}&redirect_uri=http://localhost:3000/auth/google&grant_type=authorization_code`,
          {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              }
          } 
      );
      console.log(response.data);
      // 응답 처리
  } catch (error) {
      console.error('요청 실패:', error);
      // 에러 처리
  }
  }

  const socialRequest = async (codeParam:any) => {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/socialLogin/${typeOfPlanform}`, codeParam, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if (res.status === 200) {
        const accessToken = res.data.body.accessToken.replace("Bearer ", "");  
        const refreshToken = res.data.body.refreshToken.replace("Bearer ", "");  
        const validateTime = res.data.body.validateTime;  
        console.log('같아야지', accessToken, 'ㅇㅇ', refreshToken);
        addAccessResponseIntoCookie({ accessToken, refreshToken, validateTime });
  
        const previousUrl = localStorage.getItem('previousUrl');
        if (previousUrl) {
          navigate(previousUrl);
          localStorage.removeItem('previousUrl');
        } else {
          console.log('??');
          navigate('/main');
        }
      }
    })
    .catch((error) => {
      console.error('에러 발생:', error);
      navigate('/404');
    });
  };
          

    


   

    console.log('typeOfPlanform',typeOfPlanform)
    socialFuntion();

return(

    <div>
    </div>
  )
  }
  
  
  export default SocialLoginPage;