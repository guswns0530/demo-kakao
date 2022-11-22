import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ChatAlertComponent from "../../../component/app/popup/ChatAlert";
import styled from "styled-components";

const Popup = styled.div`
    z-index: 99;
    position: fixed;
    bottom: 5px;
    right: 5px;
    
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    gap: 7px;
    
    @keyframes slideIn {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(0%);
      }
    }

    @keyframes slideOut {
      from {
        transform: translateX(0%);
      }
      to {
        opacity: 0;
        transform: translateX(100%);
      }
    }

    .openAnimation {
      animation: slideIn 0.5s ease-in-out 0s 1 normal forwards;
    }
    
    .closeAnimation {
      animation: slideOut 0.5s ease-in-out 0s 1 normal forwards;
    }
`

const ChatAlert = () => {
    const dispatch = useDispatch()
    const {alert: chats, user} = useSelector(({alert, user}) => ({
        alert: alert,
        user: user.user
    }))


    useEffect(() => {
    }, [chats]);


    return (
        <Popup>
            {chats.map((chat, i) => {
                return <ChatAlertComponent chat={chat} key={chat.chat_id} user={user}/>
            })}
        </Popup>
    )
}

export default ChatAlert