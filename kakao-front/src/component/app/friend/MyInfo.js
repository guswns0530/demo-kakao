import React, {useCallback} from "react";

import style from "../../../css/MainPage.module.css"
import {API_BASE_URL} from "../../../constants";
import Profile from "../../../assets/profile.png"

import Svg from "../../util/Svg";

const MyInfo = ({user}) => {

    const {message, name, profile_image_url} = user

    const checkUrl = useCallback(() => {
        return isValidHttpUrl(profile_image_url)
    }, [profile_image_url])

    return (
        <>
            <div className={style.profile}>
                <div className={style.image}>
                    <Svg>
                        <img src={checkUrl() ? profile_image_url : profile_image_url ? `${API_BASE_URL}/file/${profile_image_url}` : Profile} alt="img"/>
                    </Svg>
                </div>
                <div className={style.context}>
                    <div className={style.name}>{name}</div>
                    <div className={style.msg}>
                        {message}
                    </div>
                </div>
            </div>
        </>
    )
}

function isValidHttpUrl(string) {
    let url;
    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}

export default MyInfo