import React from "react";

import style from "../../../css/MainPage.module.css"
import {Link} from "react-router-dom";
import ProfileImage from "../../util/ProfileImage";

const ProfilePopup = ({resource: {profile_image_url, name}, onClose, isFriend, isMe}) => {

    return (
        <div id={style.profile_popup}>
            <div className={style.tab}>
                <div className={style.exit} onClick={onClose}>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className={style.pfile_background}>
            </div>

            <div className={style.pfile}>
                <div className={style.image}>
                    <ProfileImage profile_image_url={profile_image_url}/>
                </div>
                <div className={style.name}>{name}</div>
            </div>

            <nav className={style.pfile_nav}>
                <ul>
                    {isFriend &&
                        <li>
                            <Link to={"/app"}>
                                <i className="material-icons">chat_bubble</i>
                                <span>1:1 채팅</span>
                            </Link>
                        </li>
                    }
                    {
                        isMe &&
                        <li>
                            <Link to={"/app"}>
                                <i className="material-icons">edit</i>
                                <span>프로필 관리</span>
                            </Link>
                        </li>
                    }
                    {
                        (!isMe && !isFriend) &&
                        < li>
                            < Link to={"/app"}>
                                <i className="material-icons">edit</i>
                                <span>프로필 관리</span>
                            </Link>
                        </li>
                    }
                </ul>
            </nav>
        </div>
    )
}

export default ProfilePopup