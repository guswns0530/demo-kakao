import React from "react";
import style from "../../../css/MainPage.module.css"
import Draggable from "react-draggable";
import roomService from "../../../services/RoomInfo";


const ChattingPopup = ({room, user, isLoading, trackPos, onClose, inputRef, onChange, x, y}) => {

    if(isLoading) {
        return <>
            <Draggable onDrag={trackPos} bounds={"parent"} handle={".handle"} position={{x, y}}>
                <div id={style.popup} className={style.popup}>
                    <header className="handle">
                        <div className={style.h}>
                            <div className={style.image}>
                                <img src="./image/profile.png" alt=""/>
                            </div>

                            <div className={style.p_name}>현준</div>

                            <div className={style.tab}>
                                <div className={style.full_screen}></div>
                                <div className={`${style.min_screen} ${style.none}`}>
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className={style.exit} onClick={onClose}>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className={style.content}>
                        <div className={style.chat_log}>

                        </div>
                        <div className={style.form}>
                            <form>
                                <textarea name="" id="" ref={inputRef} onChange={onChange}></textarea>
                                <button className={style.able}>전송</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Draggable>
        </>
    } else {
        const {profileImageList, name, join_user_cnt} = roomService(user , room)

        return <>
            <Draggable onDrag={trackPos} bounds={"parent"} handle={".handle"}>
                <div id={style.popup} className={style.popup}>
                    <header className="handle">
                        <div className={style.h}>
                            <div className={style.image}>
                                {profileImageList}
                            </div>

                            <div className={style.p_name}>
                                <div className={style.name}>{name}</div>
                                <div className={style.p_count}><i className="material-icons">person</i>{join_user_cnt}</div>
                            </div>

                            <div className={style.tab}>
                                <div className={style.full_screen}></div>
                                <div className={`${style.min_screen} ${style.none}`}>
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className={style.exit} onClick={onClose}>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className={style.content}>
                        <div className={style.chat_log}>

                        </div>
                        <div className={style.form}>
                            <form>
                                <textarea name="" id="" ref={inputRef} onChange={onChange}></textarea>
                                <button className={style.able}>전송</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Draggable>
        </>
    }
}

export default ChattingPopup