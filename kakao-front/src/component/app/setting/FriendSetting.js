import React from "react";
import style from "../../../css/MainPage.module.css";
import ProfileImage from "../../util/ProfileImage";

const FriendSetting = ({isMore, onClick, data, noneBlockFriend}) => {
    return (
        <div id={style.friend_page} className={style.page}>
            <div className={style.page_profile}>
                <div className={style.title}>친구관리</div>
                <div className={style.disable_box}>
                    <div className={style.content}>
                        <div className={style.name}>차단 친구</div>
                        <div className={style.for}>({data.length})</div>
                    </div>
                    <div className={style.content_more}>
                        {isMore ? <span className="material-symbols-outlined" onClick={onClick}>expand_more</span> :
                            <span className="material-symbols-outlined" onClick={onClick}>expand_less</span>
                        }

                    </div>
                </div>
                {isMore &&
                    <ul>
                        {
                            data.map(({email, profile_image_url, name, message}) => {
                                return <li key={email}>
                                    <div
                                        className={style.profile}>
                                        <div className={style.image}>
                                            <ProfileImage profile_image_url={profile_image_url}/>
                                        </div>
                                        <div className={style.context}>
                                            <div className={style.name}>{name}</div>
                                            <div className={style.msg}>{message}</div>
                                        </div>
                                        <button onClick={() => noneBlockFriend(email)}>차단해제</button>
                                    </div>
                                </li>
                            })
                        }
                    </ul>
                }
            </div>
        </div>
    )
}

export default FriendSetting