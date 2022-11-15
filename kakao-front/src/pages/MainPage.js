import React from "react";
import {useDispatch} from "react-redux";
import {logout} from "../modules/auth";

import style from '../css/MainPage.module.css'
import {Link, useLocation} from "react-router-dom";
import Friend from "../containers/app/Friend";

import {Route, Routes} from '/node_modules/react-router-dom/dist/index';
import ProfilePopup from "../containers/app/popup/ProfilePopup";
import AddFriend from "../containers/app/popup/AddFriend";
import Chatting from "../containers/app/Chatting";


const MainPageFetch = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    const {state} = location

    return (<>
        <nav className={style.fixed_nav}>
            <ul className={style.main_nav}>
                <li>
                    <Link className={state !== 1 ? style.select : ''} to={"/app"}>
                        <i className="material-icons" id="nav_1">person</i>
                    </Link>
                </li>
                <li>
                    <Link className={state === 1? style.select : ''} to={"/app"} state={1}>
                        <i className="material-icons" id="nav_2"
                        >chat_bubble
                            <div className={style.alert}>2</div>
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
        {
            state === 1 ?
                <Chatting/>
                :
                <Friend/>
        }
        <button style={{zIndex: 1, position: "absolute", top: "50%"}} onClick={() => dispatch(logout())}>로그아웃</button>

        <Routes>
            <Route path={"/profile/:id"} element={<ProfilePopup/>}/>
            <Route path={"/add-friend"} element={<AddFriend />}/>
            <Route path={"/add-friend/:type"} element={<AddFriend />}/>
        </Routes>
    </>)
}

const MainPage = () => {
    return (
        <>
            <MainPageFetch/>
        </>
    )
}

export default MainPage