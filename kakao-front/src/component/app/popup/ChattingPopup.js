import React, {useMemo} from "react";
import style from "../../../css/MainPage.module.css"
import Draggable from "react-draggable";
import roomService from "../../../services/RoomInfo";
import ChatLog from "../../../containers/app/chatting/ChatLog";
import styled from "styled-components";
import styleLoading from "../../styled/styleLoading";
import ChatForm from "../../../containers/app/chatting/ChatForm";

const StyleImage = styled.div`
  background-color: #ddd;
  width: 100%;
  height: 100%;
  border-radius: 46%;
  ${styleLoading}
`

const ChattingPopup = ({
                           room,
                           user,
                           isLoading,
                           trackPos,
                           onClose,
                           x,
                           y,
                           toggleScreen,
                           isFullscreen,
                           content,
                           block,
                           onPopup,
                           isFriend
                       }) => {
    const roomInfo = useMemo(() => { return user && room ? roomService(user, room) : null}, [user, room]);

    if (isLoading || !roomInfo) {
        return <>
            <Draggable onDrag={trackPos} bounds={"parent"} handle={".handle"} position={{x, y}}>
                <div id={style.popup} className={style.popup}>
                    <header className="handle">
                        <div className={style.h}>
                            <div className={style.image}>
                                <StyleImage/>
                            </div>

                            <div className={style.p_name}>
                            </div>

                            <div className={style.tab}>
                                {!isFullscreen ?
                                    <div className={style.full_screen} onClick={toggleScreen}></div>
                                    :
                                    <div className={style.min_screen} onClick={toggleScreen}>
                                        <div></div>
                                        <div></div>
                                    </div>
                                }

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
                                <textarea name="" id="" disabled={true}></textarea>
                                <button className={style.disable}>전송</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Draggable>
        </>
    } else {
        const {profileImageList, name, join_user_cnt, room_id} = roomInfo;
        return <>
            <Draggable onDrag={trackPos} bounds={"parent"} handle={".handle"} disabled={isFullscreen} position={{x, y}}>
                <div id={style.popup} className={`${style.popup} ${isFullscreen && style.fullscreen}`}>
                    <header className="handle">
                        <div className={style.h}>
                            <div className={style.image} onClick={onPopup}>
                                {profileImageList}
                            </div>

                            <div className={style.p_name}>
                                <div className={style.name}>{name}</div>
                                <div className={style.p_count}><i className="material-icons">person</i>{join_user_cnt}
                                </div>
                            </div>

                            <div className={style.tab}>
                                {!isFullscreen ?
                                    <div className={style.full_screen} onClick={toggleScreen}/>
                                    :
                                    <div className={style.min_screen} onClick={toggleScreen}>
                                        <div></div>
                                        <div></div>
                                    </div>
                                }
                                <div className={style.exit} onClick={onClose}>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className={style.content}>
                        <ChatLog roomId={room_id} content={content} block={block} isFriend={isFriend}/>
                        <div className={style.form}>
                            <ChatForm roomId={room_id} content={content} block={block}/>
                        </div>
                    </div>
                </div>
            </Draggable>
        </>
    }
}

export default ChattingPopup