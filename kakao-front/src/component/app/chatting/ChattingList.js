import React from "react";
import style from "../../../css/MainPage.module.css"
import ProfileImage from "../../util/ProfileImage";
import {Link} from "react-router-dom";

const ChattingList = ({data, user, onClick}) => {
    const now = new Date()

    const list = data.map(room => {
        const {
            chat_content, chat_create_at, // chat_status,
            // chat_type,
            join_user_cnt, room_id, room_name, unread_cnt, users
        } = room

        const createAt = new Date(chat_create_at)
        let date = ''

        if (createAt.isSameMonth(now)) {
            if (createAt.getDate() === now.getDate()) {
                date = `${createAt.amPm()} ${createAt.getHours()}:${createAt.getMinutes()}`
            } else if (createAt.getDate() === now.getDate() - 1) {
                date = '어제'
            }
        } else {
            date = `${createAt.getFullYear()}-${createAt.getMonth() + 1}-${createAt.getDate()}`
        }

        const filterUser = users.filter(u => u.email !== user.email)
        const name = room_name || filterUser.reduce((before, now) => {
            if (!before) {
                return now.name
            }
            return now.name + ', ' + before
        }, '')

        const profileImageList = filterUser.slice(0, 4).map(({email, profile_image_url}) => {
            return <ProfileImage key={email} profile_image_url={profile_image_url}/>
        })

        return (<li key={room_id} onClick={onClick}>
            <Link to={"/app/chatting/" + room_id} state={1}>
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
            </Link>
        </li>)
    })

    return (<ul>
        {list}
    </ul>)
}

export default ChattingList
