import React, {Suspense} from "react";
import {useDispatch} from "react-redux";
import {Route, Routes} from '../../node_modules/react-router-dom/dist/index';
import {logout} from "../modules/auth";

import style from '../css/MainPage.module.css'
import {Link, useLocation} from "react-router-dom";
import Friend from "../component/app/Friend";

const MainPageFetch = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    return (<>
        <nav className={style.fixed_nav}>
            <ul className={style.main_nav}>
                <li>
                    <Link className={location.pathname === '/app' ? style.select : ''} to={"/app"}>
                        <i className="material-icons" id="nav_1">person</i>
                    </Link>
                </li>
                <li>
                    <Link className={location.pathname === '/app/chatting' ? style.select : ''} to={"/app/chatting"}>
                        <i className="material-icons" id="nav_2"
                        >chat_bubble
                            <div className={style.alert}>1</div>
                        </i>
                    </Link>
                </li>
            </ul>

            <ul className={style.sub_nav}>
                <li>
                    <Link to={"./setting"}>
                        <i className="material-icons"> settings </i>
                    </Link>
                </li>
            </ul>
        </nav>
        <Routes>
            <Route path={"/*"} element={<Friend/>}/>
            <Route path={"/chatting"} element={<div>앱</div>}/>
        </Routes>
        <button style={{zIndex: 1, position: "absolute", top: "50%"}} onClick={() => dispatch(logout())}>로그아웃</button>
    </>)
}

const MainPage = () => {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <MainPageFetch/>
            </Suspense>
        </>
    )
}

export default MainPage