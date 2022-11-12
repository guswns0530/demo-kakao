import React from "react";
import style from "../../../css/MainPage.module.css";
import Profile from "./Profile";

const RecommendFriendInfo = ({data, onClick, isMore, onAuxClick}) => {

    return (<>
        <div className={style.disable_box}>
            <div className={style.content}>
                <div className={style.name}>추천 친구</div>
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
                    return (<li key={user.email} onAuxClick={onAuxClick}>
                        <Profile user={user}/>
                    </li>)
                })}
        </ul>}
    </>)
}

export default RecommendFriendInfo