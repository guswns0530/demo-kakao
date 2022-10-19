import {Route, Routes} from '../node_modules/react-router-dom/dist/index';
import LoginPage from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import RequestEndPage from "./pages/RequestEndPage";
import NotFoundPage from "./pages/NotFoundPage";
import Oauth2RedirectHandler from "./pages/Oauth2RedirectHandler";

//init
import {setAuthorization} from "./lib/api/client";
import {useSelector} from "react-redux";


function App() {
    //init
    const {auth} = useSelector(({auth}) => ({
        auth: auth.auth
    }))

    if(auth) {
        setAuthorization(auth)
    }

    return (
        <>
            <Routes>
                <Route path={'/'} element={<MainPage/>}/>
                <Route path={'/login'} element={<LoginPage/>}/>
                <Route path={'/register'} element={<RegisterPage/>}/>
                <Route path={'/request-end'} element={<RequestEndPage/>}/>
                <Route path={'/oauth2/redirect'} element={<Oauth2RedirectHandler/>}/>
                <Route path={'*'} element={<NotFoundPage/>}/>
            </Routes>
        </>
    );
}

export default App;
