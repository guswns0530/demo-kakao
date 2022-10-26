import {Route, Routes} from '../node_modules/react-router-dom/dist/index';
import React from "react";
import LoginPage from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import RequestEndPage from "./pages/RequestEndPage";
import NotFoundPage from "./pages/NotFoundPage";
import Oauth2RedirectHandler from "./pages/Oauth2RedirectHandler";

import {useLocation} from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import {useSelector} from "react-redux";


function App() {
    const location = useLocation()
    const {auth, user} = useSelector(({auth, user}) => ({
        auth: auth.auth,
        user: user.user
    }))

    return (
        <>
            <Routes location={location}>
                <Route index element={
                    <PrivateRoute isAllowed={auth && user} redirectPath={"/login"}>
                        <MainPage/>
                    </PrivateRoute>
                }/>
                <Route path={'/login'} element={
                    <PrivateRoute isAllowed={!user} redirectPath={"/"}>
                        <LoginPage/>
                    </PrivateRoute>
                }/>
                <Route path={'/register'} element={
                    <PrivateRoute isAllowed={!user} redirectPath={"/"}>
                        <RegisterPage/>
                    </PrivateRoute>
                }/>
                <Route path={'/request-end'} element={
                    <RequestEndPage/>
                }/>
                <Route path={'/oauth2/redirect'} element={
                    <PrivateRoute isAllowed={true} redirectPath={"/"}>
                        <Oauth2RedirectHandler/>
                    </PrivateRoute>
                }/>
                <Route path={'*'} element={
                    <PrivateRoute isAllowed={true} redirectPath={"/"}>
                        <NotFoundPage/>
                    </PrivateRoute>
                }/>
            </Routes>
        </>
    );
}

export default App;
