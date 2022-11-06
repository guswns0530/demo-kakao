import React from "react";

import style from "../../../css/MainPage.module.css"
import styled from "styled-components";
import styleLoading from "../../styled/styleLoading";

const LoadingFriendInfo = () => {
    const StyleDiv = styled.div`
        width: 50px;
        height: 15px;
        border-radius: 2px;
        background-color: #ddd;
        ${styleLoading}
    `
    return (
        <>
            <div className={style.disable_box}>
                <div className={style.content}>
                    <StyleDiv/>
                </div>
            </div>
        </>
    )
}

export default LoadingFriendInfo
