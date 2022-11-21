import React from "react";
import style from "../../../css/MainPage.module.css"
import ProfileImage from "../../util/ProfileImage";

const MyChat = ({children}) => {
    return <div className={`${style.chat} ${style.me}`}>
        {children}
    </div>
}

const YouChat = ({children, user}) => {
    return <div className={`${style.chat} ${style.you}`}>
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
            <span> {content} </span>
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


const ChatLog = ({children, chats, reader, users, user, content, onScroll}) => {

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
    return <div className={style.chat_log} ref={content} onScroll={onScroll}>

        {list.map((userInfo, i) => {

            const data = []

            console.log('실행')
            if (i + 1 < list.length && !child[i][0].createAt.isSameDate(child[i][0].createAt)) {
                data.push(<ChatDate key={child[i][0].createAt}/>)
            } else if (child[i][0].chat_id === 1) {
                console.log(child[i][0])
                data.push(<ChatDate key={child[i][0].createAt}/>)
            }

            if (userInfo.email === user.email) {
                data.push(<MyChat key={i}>
                    {child[i].reverse().map((chat, j) => <Block chat={chat} isLast={j === child[i].length - 1} key={chat.chat_id}/>)}
                </MyChat>)

                return data
            }
            data.push(<YouChat user={userInfo} key={i}>
                {child[i].reverse().map((chat, j) => <Block chat={chat} isLast={j === child[i].length - 1} key={chat.chat_id}/>)}
            </YouChat>)

            return data
        })}
        {children}
    </div>
}

export default React.memo(ChatLog)
