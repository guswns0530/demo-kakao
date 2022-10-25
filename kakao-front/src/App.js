import {Route, Routes} from '../node_modules/react-router-dom/dist/index';
import React from "react";
import LoginPage from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import RequestEndPage from "./pages/RequestEndPage";
import NotFoundPage from "./pages/NotFoundPage";
import Oauth2RedirectHandler from "./pages/Oauth2RedirectHandler";
import PrivateRoute from "./routes/PrivateRoute";
// import {CSSTransition, TransitionGroup} from "react-transition-group";

import './css/Transition.css'
import {useLocation} from "react-router-dom";


function App() {
    const location = useLocation()

    return (
        <>
            {/*<TransitionGroup className="transition-group">*/}
            {/*    <CSSTransition key={location.pathname} classNames="fade" timeout={1000}>*/}
            <Routes location={location}>
                <Route path={'/*'} element={
                    <PrivateRoute isLogin={true}>
                        <MainPage/>
                    </PrivateRoute>
                }/>
                <Route path={'/login'} element={
                    <PrivateRoute isLogin={false}>
                        <LoginPage/>
                    </PrivateRoute>
                }/>
                <Route path={'/register/*'} element={
                    <PrivateRoute isLogin={false}>
                        <RegisterPage/>
                    </PrivateRoute>
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
            {/*    </CSSTransition>*/}
            {/*</TransitionGroup>*/}
        </>
    );
}

export default App;
