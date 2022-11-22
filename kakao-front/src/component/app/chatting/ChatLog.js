import React, {useMemo} from "react";
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

const Block = ({chat, isLast, onContextMenu}) => {
    const {chat_id, content, read, date} = chat

    return <div className={style.chat_block} key={chat_id}>
        <div className={style.chat_content} onContextMenu={(e) => onContextMenu(e, chat)}>
            <span>{content} </span>
            <div className={style.chat_info}>
                <div className={style.chat_read}>{read === 0 ? undefined : read}</div>
                {isLast && <div className={style.chat_data}>{date}</div>}
            </div>
        </div>
    </div>
}

const ChatDate = ({createAt}) => {
    const list = ['일', '월', '화', '수', '목', '금', '토']
    return (<div className={style.chat_notice}>
        <div
            className={style.chat_date}>{createAt.getFullYear()}년 {createAt.getMonth() + 1}월 {createAt.getDate()}일 {list[createAt.getDay()]}요일
        </div>
    </div>)
}


const ChatLog = ({children, chats, reader, users, user, content, onScroll, onContextMenu}) => {
    const [list, child] = useMemo(() => {
        const list = []
        const child = []
        chats.forEach((chat, i) => {
            const {chat_id, chat_status, chat_type, content, create_at, email} = chat
            const createAt = new Date(create_at)
            const date = `${createAt.amPm()} ${createAt.getHours() > 12 ? createAt.getHours() - 12 : createAt.getHours()}:${createAt.getMinutes() < 10 ? "0" + createAt.getMinutes() : createAt.getMinutes()}`
            let read = 0;

            reader.forEach(id => {
                if (id * 1 < chat_id * 1) read++
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

        return [list, child]
    }, [chats, reader, users, user]);


    const data = useMemo(() => {
        return list.map((userInfo, i) => {
            const data = []

            if (userInfo.email === user.email) {
                data.push(<MyChat style={style} key={i}>
                    {child[i].sort((a, b) => {
                        return a.chat_id - b.chat_id
                    }).map((chat, j) => {
                        chat.user = userInfo
                        return <Block chat={chat} isLast={j === child[i].length - 1} key={chat.chat_id}
                                      onContextMenu={onContextMenu}/>
                    })}
                </MyChat>)
            } else {
                data.push(<YouChat user={userInfo} style={style} key={i}>
                    {child[i].sort((a, b) => {
                        return a.chat_id - b.chat_id
                    }).map((chat, j) => {
                        chat.user = userInfo
                        return <Block chat={chat} isLast={j === child[i].length - 1} key={chat.chat_id}
                                      onContextMenu={onContextMenu}/>
                    })}
                </YouChat>)
            }

            if (i + 1 < list.length && !child[i][0].createAt.isSameDate(child[i + 1][0].createAt)) {
                data.push(<ChatDate key={child[i][0].createAt} createAt={child[i][0].createAt}/>)
            } else if (child[i][0].chat_id === chats[chats.length - 1].chat_id) {
                data.push(<ChatDate key={child[i][0].createAt} createAt={child[i][0].createAt}/>)
            }

            return data
        })
    }, [list, child]);

    return <div className={style.chat_log} ref={content} onScroll={onScroll}>
        {data}
        {children}
    </div>
}

export default ChatLog
