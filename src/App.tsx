
import PageNotFound from './PageNotFound';
import ErrorPage from './ErrorPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  TodosContextProvider from './store/todo_context'
import Home from './compoent/pages/Home'
import MainPage from './compoent/pages/MainPage'
import RegisterUsername from './compoent/pages/Username'
import UserPage from './compoent/pages/UserPage';
import PostPage from './compoent/pages/PostPage';
import PageKit from './compoent/pages/PageKit'
import Admin from './compoent/pages/AdminPage'
import SocialLoginPage from './compoent/pages/SocialLoginPage'
import {CookiesProvider} from 'react-cookie';

function App() {



return(
    <Router>
      <CookiesProvider>
        <TodosContextProvider>
          <Routes>
            {/* <Route path='/register'  element={<Register />}/> */}
            <Route path='/admin'  element={<Admin />}/>
            <Route path='/auth/:typeOfPlanform'  element={<SocialLoginPage/>}/>
            <Route path='/register/username'  element={<RegisterUsername />}/>
            <Route path='/'  element={<Home />}/>
            <Route path='/error'  element={<ErrorPage/>}/>
            <Route element={<PageKit/>}>
                <Route path="/main" element={<MainPage/>}/>
                <Route path="/:username" element={<UserPage/>}/>
                <Route path="/:username/status/:commentId" element={<PostPage/>}/>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </TodosContextProvider>
      </CookiesProvider>
    </Router>
  );
}

export default App;
