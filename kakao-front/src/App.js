import {Route, Routes} from '../node_modules/react-router-dom/dist/index';
import React from "react";
import LoginPage from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import RequestEndPage from "./pages/RequestEndPage";
import NotFoundPage from "./pages/NotFoundPage";
import Oauth2RedirectHandler from "./pages/Oauth2RedirectHandler";

import {useLocation, Navigate} from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import {useSelector} from "react-redux";


function App() {
    const location = useLocation()
    const {auth} = useSelector(({auth, user}) => ({
        auth: auth.auth,
    }))
    const {pathname, state} = location

    if (pathname === "/") {
        return <Navigate to={"/app"}/>
    }

    return (
        <>
            <Routes location={location}>
                <Route path={"/app/*"} element={
                    <PrivateRoute isAllowed={auth} redirectPath={"/login"}>
                        <MainPage/>
                    </PrivateRoute>
                }/>
                <Route path={'/login'} element={
                    <PrivateRoute isAllowed={!auth} redirectPath={state ? state : '/app'}>
                        <LoginPage/>
                    </PrivateRoute>
                }/>
                <Route path={'/register'} element={
                    <PrivateRoute isAllowed={!auth} redirectPath={"/app"}>
                        <RegisterPage/>
                    </PrivateRoute>
                }/>
                <Route path={'/request-end'} element={
                    <RequestEndPage/>
                }/>
                <Route path={'/oauth2/redirect'} element={
                    <PrivateRoute isAllowed={true} redirectPath={"/app"}>
                        <Oauth2RedirectHandler/>
                    </PrivateRoute>
                }/>
                <Route path={'*'} element={
                    <NotFoundPage/>
                }/>
            </Routes>
        </>
    );
}

export default App;
