import React from "react";

import style from "../../../css/MainPage.module.css"
import ProfileImage from "../../util/ProfileImage";

const ProfilePopup = ({resource: {profile_image_url, name}, onClose, button}) => {

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
                    <li>
                        {button}
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default ProfilePopup