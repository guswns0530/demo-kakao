import React, {useCallback, useEffect, useRef, useState} from "react";
import style from "../../../css/MainPage.module.css"
import ProfileImage from "../../util/ProfileImage";
import {List, AutoSizer, InfiniteLoader, CellMeasurerCache, CellMeasurer} from "react-virtualized";
import styled from "styled-components";

const MyChat = ({children, style: styled}) => {
    return <div style={styled}>
        <div className={`${style.chat} ${style.me}`}>
            {children}
        </div>
    </div>
}

const YouChat = ({children, user, style: styled}) => {
    return <div className={`${style.chat} ${style.you}`} style={styled}>
        <div className={style.c_pro}>
            <div className={style.image}>
                <ProfileImage profile_image_url={user.profile_image_url}/>
            </div>
            <div className={style.name}>{user.name}</div>
        </div>
        {children}
    </div>
}

const Block = ({chat: {chat_id, content, read, date}, isLast}) => {
    return <div className={style.chat_block} key={chat_id}>
        <div className={style.chat_content}>
            <span> {chat_id} {content} </span>
            <div className={style.chat_info}>
                <div className={style.chat_read}>{read === 0 ? undefined : read}</div>
                {isLast && <div className={style.chat_data}>{date}</div>}
            </div>
        </div>
    </div>
}

const ChatDate = ({createAt}) => {
    return (<div className={style.chat_notice}>
        <div className={style.chat_date}>2022년 05월 30일 일요일</div>
    </div>)
}


const ChatLog = ({chats, reader, users, user}) => {
    const cache = new CellMeasurerCache({})
    const list = []
    const child = []

    chats.forEach((chat, i) => {
        const {chat_id, chat_status, chat_type, content, create_at, email} = chat
        const createAt = new Date(create_at)
        const date = `${createAt.amPm()} ${createAt.getHours() > 12 ? createAt.getHours() - 12 : createAt.getHours()}:${createAt.getMinutes() < 10 ? "0" + createAt.getMinutes() : createAt.getMinutes()}`
        let read = 0;

        reader.forEach(id => {
            if (id < chat_id) read++
        })

        const chatObj = {date, read, content, chat_id, email, chat_status, chat_type, createAt}

        if (i - 1 >= 0) {
            const beforeChat = chats[i - 1]

            if (chat.email === beforeChat.email) {
                if (createAt.isSame(new Date(beforeChat['create_at']))) {
                    child[child.length - 1].push(chatObj)
                    return
                }
            }
        }

        const findUser = users.find(user => user.email === email)


        list.push(findUser)
        child.push([chatObj])
    })

    const rowRenderer = ({index, key, parent, style}) => {
        const data = []
        const userInfo = list[index]


        if (userInfo?.email === user?.email) {
            data.push(<MyChat style={style} key={key}>
                {child[index].sort((a, b) => {
                    return a.chat_id > b.chat_id
                }).map((chat, j) => <Block chat={chat} isLast={j === child[index].length - 1} key={chat.chat_id}/>)}
            </MyChat>)
        } else {
            data.push(<YouChat user={userInfo} style={style} key={key}>
                {child[index].sort((a, b) => {
                    return a.chat_id > b.chat_id
                }).map((chat, j) => <Block chat={chat} isLast={j === child[index].length - 1} key={chat.chat_id}/>)}
            </YouChat>)
        }


        // if (index + 1 < list.length && !child[index][0].createAt.isSameDate(child[index + 1][0].createAt)) {
        //     data.push(<ChatDate key={child[index][0].createAt}/>)
        // } else if (child[index][0].chat_id === 1) {
        //     console.log(child[index][0])
        //     data.push(<ChatDate key={child[index][0].createAt}/>)
        // }

        return <CellMeasurer cache={cache} parent={parent} columnIndex={0} key={key + index} rowIndex={index}>
            {data}
        </CellMeasurer>
    }

    return <>
        <AutoSizer className={style.chat_auto_sizer}>
            {({width, height}) => (
                <>
                    <List
                        className={style.chat_list}
                        width={width}
                        height={height}
                        rowHeight={cache.rowHeight}
                        list={list}
                        rowCount={list.length}
                        rowRenderer={rowRenderer}
                        deferredMeasurementCache={cache}
                        scrollToItem={list.length}
                    />
                </>
            )}
        </AutoSizer>
    </>
}

export default React.memo(ChatLog)
