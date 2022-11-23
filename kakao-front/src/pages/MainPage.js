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
import ChattingPopup from "../containers/app/popup/ChattingPopup";
import {useQuery} from "react-query";
import {selectMe} from "../lib/api/user";
import {CHECK_SUCCESS} from "../modules/user";
import ErrorHandler from "../containers/handler/ErrorHandler";
import ContextMenu from "../containers/handler/ContextMenu";
import Socket from "../containers/socket/Socket";
import SettingPopup from "../containers/app/popup/SettingPopup";
import AddChatting from "../containers/app/popup/AddChatting";

export const queryName = "selectUserInfo"

const MainPage = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    const {isLoading: isUserLoading, isError: isUserError, error: userError} = useQuery(
        queryName,
        async () => selectMe(),
        {
            onSuccess: (data) => {
                if (data) {
                    dispatch({
                        type: CHECK_SUCCESS, payload: data.data.data
                    })
                }
            }
        }
    )

    const isError = isUserError
    const isLoading = isUserLoading

    if (isError) {
        if (isUserError) {
            return <ErrorHandler path={"/logout"} error={userError}/>
        }
    }

    if (isLoading) {
        return <div></div>
    }

    const {state} = location


    return (<>
        <nav className={style.fixed_nav}>
            <ul className={style.main_nav}>
                <li>
                    <Link className={state?.page !== 1 ? style.select : ''} to={location.pathname}
                          state={{...state, page: 0}}>
                        <i className="material-icons" id="nav_1">person</i>
                    </Link>
                </li>
                <li>
                    <Link className={state?.page === 1 ? style.select : ''} to={location.pathname}
                          state={{...state, page: 1}}>
                        <i className="material-icons" id="nav_2"
                        >chat_bubble
                            <div className={style.alert}>2</div>
                        </i>
                    </Link>
                </li>
            </ul>

            <ul className={style.sub_nav}>
                <li>
                    <Link to={"./setting"} state={{...state}}>
                        <i className="material-icons"> settings </i>
                    </Link>
                </li>
            </ul>
        </nav>
        {state?.page === 1 ? <Chatting/> : <Friend/>}
        <ContextMenu/>
        <Socket/>
        <Routes>
            <Route path={"/profile/:id"} element={<ProfilePopup/>}/>
            <Route path={"/chatting/:id"} element={<ChattingPopup/>}/>
            <Route path={"/add-friend"} element={<AddFriend/>}/>
            <Route path={"/add-friend/:type"} element={<AddFriend/>}/>
            <Route path={"/add-chatting"} element={<AddChatting/>}/>
            <Route path={"/setting/*"} element={<SettingPopup/>}/>
        </Routes>
    </>)
}

export default MainPage