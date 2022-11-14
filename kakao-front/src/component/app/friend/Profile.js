import React from "react";

import style from "../../../css/MainPage.module.css"
import ProfileImage from "../../util/ProfileImage";
import {Link} from "react-router-dom";

const Profile = ({user}) => {
    const {message, name, profile_image_url, id} = user

    return (<>
        <div className={style.profile} >
            <div className={style.image}>
                <Link to={"/app/profile/" + id}>
                    <ProfileImage profile_image_url={profile_image_url}/>
                </Link>
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