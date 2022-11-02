import React from "react";

import style from "../../../css/MainPage.module.css"
import {Link} from "react-router-dom";


const ProfilePopup = () => {

    return (
        <div id={style.profile_popup} className="">
            <div className="tab">
                <div className="exit">
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className="pfile_background">
            </div>

            <div className="pfile">
                <div className="image">
                    <img src="./image/profile.png" alt=""/>
                </div>
                <div className="name">박현준</div>
            </div>

            <nav className="pfile_nav">
                <ul>
                    <li>
                        <a href="#">
                            <i className="material-icons">chat_bubble</i>
                            <span>1:1 채팅</span>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i className="material-icons">edit</i>
                            <span>프로필 관리</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default ProfilePopup