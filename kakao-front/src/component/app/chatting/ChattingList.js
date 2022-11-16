import React from "react";
import style from "../../../css/MainPage.module.css"

const ChattingList = ({data, onDoubleClick}) => {
    const list = data.map(room => {
        const {room_id, profileImageList, join_user_cnt, unread_cnt, chat_content, name, date} = room

        return (<li key={room_id} onDoubleClick={(e) => onDoubleClick(e, room_id)}>
            <div className={style.profile}>
                <div className={style.image}>
                    {profileImageList}
                </div>
                <div className={style.context}>
                    <div className={style.name}>{name}
                        {join_user_cnt > 2 && <div className={style.count}>{join_user_cnt - 1}</div>}
                    </div>
                    <div className={style.msg}>
                        {chat_content}
                    </div>
                </div>
                <div className={style.sub_info}>
                    <div className={style.date}>{date}</div>
                    {unread_cnt && <div className={style.alert}>{unread_cnt}</div>}
                </div>
            </div>
        </li>)
    })

    return (<ul>
        {list}
    </ul>)
}

export default ChattingList
