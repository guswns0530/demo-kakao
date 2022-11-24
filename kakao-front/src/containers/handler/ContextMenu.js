import React from "react";
import {Item, Menu} from "react-contexify";
import {menuId as chatLogMenuId} from "../app/chatting/ChatLog";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {useMutation} from "react-query";
import {removeChat} from "../../lib/api/chat";
import {removeChat as removeChatAction} from "../../modules/chat"

const ContextMenu = () => {
    const dispatch = useDispatch()
    const {user} = useSelector(({user}) => ({
        user: user.user
    }))
    const {mutate} = useMutation(async ({roomId, chatId}) => {
        return removeChat(roomId, chatId)
    }, {
        onSuccess: (data) => {
            dispatch(removeChatAction(data.data.data))
        },
        onError: (error) => {
            toast.error(error.response.data.error_description)
        }
    })
    const chatLogMenuCopyClick = (e) => {
        const {chat: {content, date, user: {name}} } = e.props()
        const copy = `[${name}] [${date}] ${content}`

        window.navigator.clipboard.writeText(copy).then(() => {})
    }
    const chatLogMenuRemoveClick = (e) => {
        const {chat: {email, chat_id}, roomId} = e.props()

        if(email !== user.email) {
            toast.error("권한이 없습니다.")
            return
        }

        mutate({roomId, chatId: chat_id})
    }

    return <>
        <Menu id={chatLogMenuId} animation={false} style={{width: '100px', fontSize: '12px'}}>
            <Item onClick={chatLogMenuCopyClick}>복사</Item>
            <Item onClick={chatLogMenuRemoveClick}>삭제</Item>
        </Menu>
    </>
}

export default ContextMenu