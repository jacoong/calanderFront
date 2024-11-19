
import PageNotFound from './PageNotFound';
import ErrorPage from './ErrorPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  TodosContextProvider from './store/todo_context'
import  LoginInfoProvider from './store/LoginInfoProvider';
import  ViewTypeProvider from './store/ViewTypeProvider';
import  ModalProvider from './store/ModalProvider'
import Home from './compoent/pages/Home'
import MainPage from './compoent/pages/MainPage'
import RegisterUsername from './compoent/pages/Username'
import AiEventCalendarPage from './compoent/pages/AiEventCalendarPage';
import PageKit from './compoent/pages/PageKit'
import InvitePage from './compoent/pages/InvitePage'
import IsInviterInvolve from './compoent/pages/IsInviterInvolve'
import EventDetailPage from './compoent/pages/EventDetailPage'
import Admin from './compoent/pages/AdminPage'
import SocialLoginPage from './compoent/pages/SocialLoginPage'
import {CookiesProvider} from 'react-cookie';
import {setCookie,getCookie,removeCookie} from './store/coockie'
import {addResponseInterceptor,addAccessTokenInterceptor} from './store/axios_context'
import ModalComponent from './Modal/ModalCompoent';

function App() {

  // useEffect(() => {
  //   const accessToken = getCookie('accessToken');
  //   if (accessToken) {
  //     addAccessTokenInterceptor(accessToken);
  //     addResponseInterceptor();
  //   }
  // }, []);


  const initAxios = () => {
    // 로그인 후에 저장된 액세스 토큰을 가져와서 인터셉터에 추가합니다.
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      addAccessTokenInterceptor(accessToken);
    }

    // 인터셉터 추가
    addResponseInterceptor();
  };


  initAxios();

return(
    <Router>
      <CookiesProvider>
      <LoginInfoProvider>
        <ModalProvider>
          <ViewTypeProvider>
            <TodosContextProvider>
                <Routes>
                  {/* <Route path='/register'  element={<Register />}/> */}
                  <Route path='/admin'  element={<Admin />}/>
                  <Route path='/auth/:typeOfPlanform'  element={<SocialLoginPage/>}/>
                  <Route path='/register/username'  element={<RegisterUsername />}/>
                  <Route path='/'  element={<Home />}/>
                  <Route path='/invite/:eventId'  element={<InvitePage/>}/>
                  <Route path='/invite/:eventId/isInviterInvolve'  element={<IsInviterInvolve/>}/>
                  <Route path='/calendar/eventId/:eventId/eventTimeId/:eventTimeId'  element={<EventDetailPage/>}/>
                  <Route path='/calendar/aiEventCalendarPage'  element={<AiEventCalendarPage/>}/>
                  <Route path='/error'  element={<ErrorPage/>}/>
                  <Route element={<PageKit/>}>
                      <Route path="/main" element={<MainPage/>}/>
                      <Route path="/main/:viewType" element={<MainPage/>}/>
                      <Route path="/main/:viewType?/:year?/:month?/:day?" element={<MainPage/>}/>
                      {/* <Route path="/:username" element={<UserPage/>}/>
                      <Route path="/:username/status/:commentId" element={<PostPage/>}/> */}
                  </Route>
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
                <ModalComponent></ModalComponent>
            </TodosContextProvider>
          </ViewTypeProvider>
        </ModalProvider>
        </LoginInfoProvider>
      </CookiesProvider>
    </Router>
  );
}

export default App;
