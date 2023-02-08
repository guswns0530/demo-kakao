import React from "react";
import {useDispatch, useSelector} from "react-redux";

import style from '../css/MainPage.module.css'
import {Link, useLocation} from "react-router-dom";
import Friend from "../containers/app/Friend";

import {Route, Routes} from '/node_modules/react-router-dom/dist/index';
import ProfilePopup from "../containers/app/popup/ProfilePopup";
import AddFriend from "../containers/app/popup/AddFriend";
import Chatting from "../containers/app/Chatting";
import ChattingPopup from "../containers/app/popup/ChattingPopup";
import {useQueries} from "react-query";
import {selectMe} from "../lib/api/user";
import {CHECK_SUCCESS} from "../modules/user";
import ErrorHandler from "../containers/handler/ErrorHandler";
import ContextMenu from "../containers/handler/ContextMenu";
import Socket from "../containers/socket/Socket";
import SettingPopup from "../containers/app/popup/SettingPopup";
import AddChatting from "../containers/app/popup/AddChatting";
import {selectRoomList} from "../lib/api/room";
import {rooms as roomsAction} from "../modules/rooms";
import LoadingPage from "./LoadingPage";
import {selectBlockFriendList, selectFriendList, selectRecommendFriendList} from "../lib/api/friend";

import {roomQueryName} from "../containers/app/chatting/ChattingList";
import {queryName as friendQueryName} from "../containers/app/friend/FriendList";
import {queryName as recommendQueryName} from "../containers/app/friend/RecommendFriendList";
import {queryName as blockQueryName} from "../containers/app/setting/FriendSetting"
import {blockFriends, friends, recommendFriends} from "../modules/friend";

export const queryName = "selectUserInfo"

const MainPage = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const {rooms} = useSelector(({form, user, rooms}) => ({
        rooms: rooms.rooms
    }))
    const unreadChat = rooms.reduce((a, b) => {
        return a + b.unread_cnt * 1
    }, 0)

    const data = useQueries([{
        queryKey: queryName, queryFn: async () => selectMe(), onSuccess: (data) => {
            if (data) {
                dispatch({
                    type: CHECK_SUCCESS, payload: data.data.data
                })
            }
        }
    }, {
        queryKey: roomQueryName, queryFn: async () => selectRoomList(), onSuccess: (data) => {
            if (data) {
                dispatch(roomsAction(data.data.data))
            }
        }
    }, {
        queryKey: "loading", queryFn: async () => {
            return new Promise((res) => {
                setTimeout(() => {
                    res(true)
                }, 1500)
            })
        },
    }, {
        queryKey: friendQueryName, queryFn: async () => {
            return selectFriendList()
        }, onSuccess: (data) => {
            dispatch(friends(data.data.data))
        }
    }, {
        queryKey: recommendQueryName,
        queryFn: async () => {
            return selectRecommendFriendList()
        },
        onSuccess: (data) => {
            dispatch(recommendFriends(data.data.data))
        }
    }, {
        queryKey: blockQueryName,
        queryFn: async ()  => selectBlockFriendList(),
        onSuccess: (data) => {
            dispatch(blockFriends(data.data.data))
        }
    }
    ])

    const isError = data.find((query) => query.isError === true)
    const isLoading = data.find((query) => query.isLoading === true)

    if (isError) {
        return <ErrorHandler path={"/logout"} error={data.find((query) => query.isError === true).error}/>
    }

    if (isLoading) {
        return <LoadingPage/>
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
                            {unreadChat !== 0 && <div className={style.alert}>{unreadChat}</div>}
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
            <Route path={"/chatting"} element={<ChattingPopup/>}/>
            <Route path={"/add-friend"} element={<AddFriend/>}/>
            <Route path={"/add-friend/:type"} element={<AddFriend/>}/>
            <Route path={"/add-chatting"} element={<AddChatting/>}/>
            <Route path={"/setting/*"} element={<SettingPopup/>}/>
        </Routes>
    </>)
}

export default MainPage