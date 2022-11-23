import React from "react";
import style from "../../../css/MainPage.module.css";
import ProfileImage from "../../util/ProfileImage";

const ProfileSetting = ({user: {profile_image_url, email, id, name, message}, onClick}) => {
    return (
        <div id={style.profile_page} className={style.page}>
            <div className={style.page_profile}>
                <div className={style.title}>기본프로필 관리</div>
                <div className={style.p_pro}>
                    <div className={style.p_profile}>
                        <div className={style.image}>
                            <ProfileImage profile_image_url={profile_image_url}/>
                        </div>
                        <div className={style.info}>
                            <div className={style.name}>{name}</div>
                            <div className={style.message}>{message}</div>
                        </div>
                    </div>
                    <button onClick={onClick}>편집</button>
                </div>
                <div className={style.p_info}>
                    <div>
                        <span>계정</span>
                        <span>{email}</span>
                    </div>
                    <div>
                        <span>아이디</span>
                        <span>{id}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileSetting