import React, {useCallback} from "react";

import style from "../../../css/MainPage.module.css"
import {API_BASE_URL} from "../../../constants";
import ProfilePng from "../../../assets/profile.png"

import Svg from "../../util/Svg";
import styled from "styled-components";

const LoadingProfile = () => {

    const StyledDiv = styled.div`
        background-color: #7289da;
        width: 100%;
        height: 100%
    `
    return (<>
        <div className={style.profile}>
            <div className={style.image}>
                <StyledDiv/>
            </div>
            <div className={style.context}>
                <div className={style.name}>Loading.</div>
                <div className={style.msg}>Loading.</div>
            </div>
        </div>
    </>)
}

export default LoadingProfile