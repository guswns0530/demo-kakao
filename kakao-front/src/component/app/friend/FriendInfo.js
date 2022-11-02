import React from "react";

import style from "../../../css/MainPage.module.css"
import Profile from "./Profile";

const FriendInfo = ({resource}) => {

    const {data: {data}} = resource

    return (
        <>
            <div className={style.disable_box}>
                <div className={style.content}>
                    <div className={style.name}>친구</div>
                    <div className={style.for}>{data.length}</div>
                </div>
            </div>
            <ul>
                {data.map(user => {
                    return (<li key={user.email}>
                        <Profile user={user}/>
                    </li>)
                })}
            </ul>
        </>
    )
}

export default FriendInfo