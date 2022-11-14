import React from "react";

import style from "../../../css/MainPage.module.css"
import Profile from "./Profile";

const FriendInfo = ({data, onClick, isMore, onContextMenu}) => {
    return (<>
        <div className={style.disable_box}>
            <div className={style.content}>
                <div className={style.name}>친구</div>
                <div className={style.for}>{data.length}</div>
            </div>
            <div className={style.content_more} onClick={onClick}>
                {isMore ? <span className="material-symbols-outlined">expand_more</span> :
                    <span className="material-symbols-outlined">expand_less</span>}

            </div>
        </div>
        {isMore && <ul>
            {data
                .map(user => {
                    return (<li key={user.email} onContextMenu={(e) => onContextMenu(e, user)}>
                        <Profile user={user}/>
                    </li>)
                })}
        </ul>}
    </>)
}

export default FriendInfo