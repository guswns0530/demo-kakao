import React from "react";
import {Item, Menu} from "react-contexify";
import {menuId as chatLogMenuId} from "../app/chatting/ChatLog";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

const ContextMenu = () => {
    const {user} = useSelector(({user}) => ({
        user: user.user
    }))
    const chatLogMenuCopyClick = (e) => {
        const {chat: {content, date, user: {name}} } = e.props()
        const copy = `[${name}] [${date}] ${content}`

        window.navigator.clipboard.writeText(copy).then(() => {})
    }
    const chatLogMenuRemoveClick = (e) => {
        const {chat: {email}} = e.props()

        if(email !== user.email) {
            toast.error("권한이 없습니다.")
        }
    }

    return <>
        <Menu id={chatLogMenuId} animation={false} style={{width: '100px', fontSize: '12px'}}>
            <Item onClick={chatLogMenuCopyClick}>복사</Item>
            <Item onClick={chatLogMenuRemoveClick}>삭제</Item>
        </Menu>
    </>
}

export default ContextMenu