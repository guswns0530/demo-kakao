import React from "react";

import style from "../../../css/MainPage.module.css"
import ProfileImage from "../../util/ProfileImage";

const Profile = ({user}) => {
    const {message, name, profile_image_url} = user

    return (<>
        <div className={style.profile}>
            <div className={style.image}>
                <ProfileImage profile_image_url={profile_image_url}/>
            </div>
            <div className={style.context}>
                <div className={style.name}>{name}</div>
                <div className={style.msg}>
                    {message}
                </div>
            </div>
        </div>
    </>)
}


export default Profile