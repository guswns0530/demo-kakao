import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";

import style from "../../../css/MainPage.module.css"
import ProfileImage from "../../util/ProfileImage";
import {useDispatch} from "react-redux";
import {removeAlert} from "../../../modules/alert";
import {useQuery} from "react-query";
import {selectRoom} from "../../../lib/api/room";
import {useInsertChatText} from "../../../lib/query";
import {Link, useLocation} from "react-router-dom";

const Item = styled.div`
  width: 350px;
  background-color: #fff;

  border: 1px solid #ccc;
  box-shadow: 0 0 3px 1px rgb(0, 0, 0, 0.1);
`
const queryName = "selectRoom"

const ChatAlert = ({chat, user}) => {
    const {content, chat_id, room_id} = chat
    const dispatch = useDispatch()
    const [animation, setAnimation] = useState("openAnimation")
    const [input, setInput] = useState('')
    const time = useRef(0)
    const focus = useRef()
    const location = useLocation()
    const {data, isLoading} = useQuery(queryName, async () => selectRoom(room_id), {})
    const {mutate} = useInsertChatText()


    useEffect(() => {
        const interval = window.setInterval(() => {
            time.current += 50

            if (document.activeElement.closest(".isFocus") === focus.current) {
                time.current = 0;
                return
            }

            if (time.current >= 2000) {
                clearInterval(interval)
                setAnimation("closeAnimation")
                setTimeout(() => {
                    dispatch(removeAlert(chat_id))
                }, 500)
            }
        }, 50)

        return () => {
            clearInterval(interval)
            setAnimation("closeAnimation")
            setTimeout(() => {
                dispatch(removeAlert(chat_id))
            }, 500)
        }
    }, []);

    if (isLoading) return

    const onChange = (e) => {
        setInput(e.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault()

        if (input.trim() !== '') {
            mutate({
                roomId: room_id,
                content: input
            })
            onClose()
        }
    }
    const onClose = () => {
        setAnimation("closeAnimation")
        setTimeout(() => {
            dispatch(removeAlert(chat_id))
        }, 500)
    }

    const room = data.data.data
    const filterUser = room.users.filter(u => u.email !== user.email)
    const name = room.name || filterUser.reduce((before, now) => {
        if (!before) {
            return now.name
        }
        return now.name + ', ' + before
    }, '')
    const sendUser = filterUser.find(u => u.email === chat.email)

    return (<Item id={style.chat_alert} className={`${animation} isFocus`} ref={focus}>
        <div className={style.tab}>
            <div className={style.exit} onClick={onClose}>
                <div></div>
                <div></div>
            </div>
        </div>
        <header>{name}</header>
        <Link to={"/app/chatting/" + room_id} state={location.state} onClick={onClose} >
            <div className={style.profile}>
                <div className={style.image}>
                    <ProfileImage profile_image_url={sendUser.profile_image_url}/>
                </div>
                <div className={style.context}>
                    <div className={style.name}>{sendUser.name}</div>
                    <div className={style.msg}>{content}</div>
                </div>
            </div>
        </Link>
        <form onSubmit={onSubmit}>
            <input placeholder={"메시지 입력"} value={input} onChange={onChange}/>
            <button className={input ? style.able : style.disable}>전송</button>
        </form>
    </Item>)
}

export default ChatAlert