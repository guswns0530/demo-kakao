import React from "react";
import style from "../../../css/MainPage.module.css"
import Draggable from "react-draggable";
import ProfileImage from "../../util/ProfileImage";


const ProfileSettingPopup = ({onClose, onChange, name, msg, profileImage, onSubmit, onUploadImage}) => {
    return (
        <Draggable>
            <div id={style.setting_popup_profile} className={style.popup}>
                <div className={style.tab}>
                    <div className={style.exit} onClick={onClose}>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <header>기본프로필 관리</header>
                <section>
                    <div className={style.spp_profile}>
                        <div className={style.image}>
                            <ProfileImage profile_image_url={profileImage}/>
                        </div>
                        <div className={style.button}>
                            <label htmlFor="fileInput">
                                <i className="material-icons">photo_camera</i>
                            </label>
                            <input id="fileInput" type={"file"} style={{display: 'none'}} onChange={onUploadImage} accept={"image/*"}/>
                        </div>
                    </div>
                    <div className={style.spp_inputs}>
                        <div className={style.spp_input}>
                            <input type="text" name={"name"} placeholder="이름" onChange={onChange} value={name}/>
                            <span className={style.counter}>{name.length}/20</span>
                        </div>
                        <div className={style.spp_input}>
                            <input type="text" name={"msg"} placeholder="상태매시지" onChange={onChange} value={msg}/>
                            <span className={style.counter}>{msg.length}/60</span>
                        </div>
                    </div>
                    <div className={style.spp_buttons}>
                        <button onClick={onSubmit} className={name ? style.active : style.disable}>확인</button>
                        <button onClick={onClose}>취소</button>
                    </div>
                </section>
            </div>
        </Draggable>
    )
}

export default ProfileSettingPopup