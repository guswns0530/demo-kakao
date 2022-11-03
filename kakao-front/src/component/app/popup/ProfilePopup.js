import React from "react";

import style from "../../../css/MainPage.module.css"
import {Link} from "react-router-dom";

const ProfilePopup = () => {

    return (
        <div id={style.profile_popup}>
            <div className={style.tab}>
                <div className={style.exit}>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className={style.pfile_background}>
            </div>

            <div className={style.pfile}>
                <div className={style.image}>
                    <img src="./image/profile.png" alt=""/>
                </div>
                <div className={style.name}>박현준</div>
            </div>

            <nav className={style.pfile_nav}>
                <ul>
                    <li>
                        <Link>
                            <i className="material-icons">chat_bubble</i>
                            <span>1:1 채팅</span>
                        </Link>
                    </li>
                    <li>
                        <Link>
                            <i className="material-icons">edit</i>
                            <span>프로필 관리</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default ProfilePopup