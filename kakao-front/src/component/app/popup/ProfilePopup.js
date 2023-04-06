import React from "react";

import style from "../../../css/MainPage.module.css"
import ProfileImage from "../../util/ProfileImage";
import Draggable from "react-draggable";
import styled from "styled-components";
import styleLoading from "../../styled/styleLoading";

const StyleImage = styled.div`
  background-color: #ddd;
  width: 100%;
  height: 100%;
  position: relative;
  ${styleLoading}
`
const StyleDiv = styled.div`
  background-color: #ddd;
  width: 100%;
  height: 100%;
  border-radius: 2px;
  position: relative;

  ${styleLoading}
`

const ProfilePopup = ({resource, onClose, button, trackPos, isLoading, x, y}) => {

    return (
        <Draggable onDrag={trackPos} bounds={"parent"} position={{x, y}}>
            <div id={style.profile_popup}>
                <div className={style.tab}>
                    <div className={style.exit} onClick={onClose}>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div className={style.pfile_background}>
                </div>

                <div className={style.pfile}>
                    <div className={style.image}>
                        {isLoading ? <StyleImage/> : <ProfileImage profile_image_url={resource.profile_image_url}/>}
                    </div>
                    <div className={style.name}>{isLoading ? <StyleDiv/> : resource.name}</div>
                    <div className={style.msg}>{isLoading ? <StyleDiv/> : resource.message}</div>
                </div>

                <nav className={style.pfile_nav}>
                    <ul>
                        {button}
                    </ul>
                </nav>
            </div>
        </Draggable>
    )
}

export default ProfilePopup