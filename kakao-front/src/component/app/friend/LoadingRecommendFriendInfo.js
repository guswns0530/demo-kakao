import React from "react";

import style from "../../../css/MainPage.module.css"

const LoadingFriendInfo = () => {
    return (
        <>
            <div className={style.disable_box}>
                <div className={style.content}>
                    <div className={style.name}>
                        추천 친구 로딩중...
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoadingFriendInfo
