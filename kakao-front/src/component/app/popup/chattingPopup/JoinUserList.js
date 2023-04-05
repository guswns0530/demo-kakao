import React, {useMemo} from "react";
import Draggable from "react-draggable";

import style from "../../../../css/MainPage.module.css"
import ProfileImage from "../../../util/ProfileImage";
import roomService from "../../../../services/RoomInfo";
import {Link, useLocation} from "react-router-dom";

const JoinUserList = ({trackPos, x, y, onClose, room, user, onClickInviteFriend, onClickEdit}) => {
    const roomInfo = useMemo(() => { return user && room ? roomService(user, room) : null}, [user, room]);
    const {profileImageList, name} = roomInfo
    const location = useLocation()

    return <Draggable onDrag={trackPos} position={{x, y}} bounds={"parent"}>
        <div id={style.join_user_list} className={style.focus}>
            <div className={style.tab}>
                <div className={style.exit} onClick={onClose}>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className={style.join_user_profile}>
                <div className={style.image}>
                    {profileImageList}
                </div>
                <div className={style.name}>{room.room_name || name}</div>
                <div className={style.count}>{room.join_user_cnt}명</div>
                <div className={style.nav_list}>
                    <div className={style.item} onClick={onClickEdit}>
                        <div className={style.icon}><span className="material-symbols-outlined">edit</span></div>
                        <div className={style.item_name}>편집</div>
                    </div>
                    <div className={style.item} onClick={onClickInviteFriend}>
                        <div className={style.icon}><span className="material-symbols-outlined">add</span></div>
                        <div className={style.item_name}>친구초대</div>
                    </div>
                </div>
            </div>
            <div className={style.join_user_list}>
                <Link to={"/app/profile/" + user.id} state={location.state}>
                    <div className={style.profile}>
                        <div className={style.image}>
                            <ProfileImage profile_image_url={user.profile_image_url}/>
                        </div>
                        <div className={style.context}>
                            <div className={style.name}>(나) {user.name}</div>
                            <div className={style.msg}>{user.message}</div>
                        </div>
                    </div>
                </Link>
                {
                    room.users.filter(({email}) => email !== user.email).map((user) => {
                        return (
                            <Link to={"/app/profile/" + user.id} state={location.state} key={user.email}>
                                <div className={style.profile}>
                                    <div className={style.image}>
                                        <ProfileImage profile_image_url={user.profile_image_url}/>
                                    </div>
                                    <div className={style.context}>
                                        <div className={style.name}>{user.name}</div>
                                        <div className={style.msg}>{user.message}</div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    </Draggable>
}

export default JoinUserList
