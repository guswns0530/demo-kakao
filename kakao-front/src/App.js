import {Route, Routes} from '../node_modules/react-router-dom/dist/index';
import LoginPage from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import RequestEndPage from "./pages/RequestEndPage";
import NotFoundPage from "./pages/NotFoundPage";
import Oauth2RedirectHandler from "./pages/Oauth2RedirectHandler";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
    return (
        <>
            <Routes>
                <Route path={'/'} element={
                    <PrivateRoute>
                        <MainPage/>
                    </PrivateRoute>
                }/>
                <Route path={'/login'} element={
                    <LoginPage/>
                }/>
                <Route path={'/register'} element={
                    <RegisterPage/>
                }/>
                <Route path={'/request-end'} element={
                    <RequestEndPage/>
                }/>
                <Route path={'/oauth2/redirect'} element={
                    <Oauth2RedirectHandler/>
                }/>
                <Route path={'*'} element={
                    <NotFoundPage/>
                }/>
            </Routes>
        </>
    );
}

export default App;
