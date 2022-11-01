import React from "react";

import style from "../../../css/MainPage.module.css"

const FriendInfo = () => {

    return (
        <>
            <div className={style.disable_box}>
                <div className={style.content}>
                    <div className={style.name}>친구</div>
                    <div className={style.for}>1</div>
                </div>
            </div>
            <ul>
                <li>
                    <div className={style.profile}>
                        <div className={style.image}>
                            <img src="./image/profile.png" alt="" />
                        </div>
                        <div className={style.context}>
                            <div className={style.name}>현준</div>
                            <div className={style.msg}>안녕</div>
                        </div>
                    </div>
                </li>
            </ul>
        </>
    )
}

export default FriendInfo