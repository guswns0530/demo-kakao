import React from "react";

import {Route, Routes} from '/node_modules/react-router-dom/dist/index';
import style from "../../../css/MainPage.module.css"
import {Link, Navigate, useLocation} from "react-router-dom";
import ProfileSetting from "../../../containers/app/setting/ProfileSetting";
import BasicSetting from "../../../containers/app/setting/BasicSetting";
import FriendSetting from "../../../containers/app/setting/FriendSetting";

const SettingPopup = ({onClose}) => {
    const location = useLocation();

    return (
        <div id={style.setting_popup} className={`${style.popup} ${style.focus}`}>
            <div className={style.tab}>
                <div className={style.exit} onClick={onClose}>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <header>설정</header>
            <section>
                <nav>
                    <ul>
                        <li><Link to={"/app/setting"} className={location.pathname === "/app/setting" ? style.select : ""}>일반</Link></li>
                        <li><Link to={"/app/setting/profile"} className={location.pathname === "/app/setting/profile" ? style.select : ""}>프로필</Link></li>
                        <li><Link to={"/app/setting/friend"} className={location.pathname === "/app/setting/friend" ? style.select : ""}>친구</Link></li>
                        <li><Link to={"/logout"} className={style.logout}>로그아웃</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path={"/profile"} element={<ProfileSetting/>} />
                    <Route path={"/friend"} element={<FriendSetting/>} />
                    <Route path={"/"} element={<BasicSetting/>} />
                    <Route path={"*"} element={<Navigate to={"/app"} />}/>
                </Routes>

            </section>
        </div>
    )
}

export default SettingPopup
