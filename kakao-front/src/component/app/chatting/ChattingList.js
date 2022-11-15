import React from "react";
import style from "../../../css/MainPage.module.css"
import ProfileImage from "../../util/ProfileImage";

const ChattingList = ({data}) => {
    return (
        <ul>
            {data.map(room =>
                <li key={room['room_id']}>
                    <div className={style.profile}>
                        <div className={style.image}>
                            <ProfileImage profile_image_url={1}/>
                        </div>
                        <div className={style.context}>
                            <div className={style.name}>현준</div>
                            <div className={style.msg}>
                                {room['chat_content']}
                            </div>
                        </div>
                        <div className={style.sub_info}>
                            <div className={style.date}>오후 11:34</div>
                            {room['unread_cnt'] &&
                                <div className={style.alert}>{room['unread_cnt']}</div>
                            }
                        </div>
                    </div>
                </li>
            )}
        </ul>
    )
}

export default ChattingList