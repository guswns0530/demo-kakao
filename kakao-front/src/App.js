import {Route, Routes} from '../node_modules/react-router-dom/dist/index';
import LoginPage from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import RequestEndPage from "./pages/RequestEndPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
    return (<>
        <Routes>
            <Route path={'/'} element={<MainPage/>} />
            <Route path={'/login'} element={<LoginPage/>} />
            <Route path={'/register'} element={<RegisterPage/>}></Route>
            <Route path={'/request-end'} element={<RequestEndPage/>} />
            <Route path={'*'} element={<NotFoundPage />} />
        </Routes>
    </>);
}

export default App;
