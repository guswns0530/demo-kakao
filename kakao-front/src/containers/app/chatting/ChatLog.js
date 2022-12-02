import React, {useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";
import {useInfiniteQuery} from "react-query";
import {selectChatList} from "../../../lib/api/chat";
import ChatLogComponent from "../../../component/app/chatting/ChatLog";

import ErrorHandler from "../../handler/ErrorHandler";
import {useDispatch, useSelector} from "react-redux";
import {addChat} from "../../../modules/chat";
import { useContextMenu} from "react-contexify";

import style from "../../../css/MainPage.module.css"
import {useInsertFriend} from "../../../lib/query";
import {useParams} from "react-router-dom";

export const menuId = "ChatLogMenu"
export const queryName = "ChatLog/selectChattingList"

const ChatLog = ({roomId, content, block}) => {
    const dispatch = useDispatch()
    const [scrollTop, setScrollTop] = useState(0)
    const {
        data,
        error,
        isError,
        isFetching,
        fetchNextPage,
    } = useInfiniteQuery(
        [queryName, roomId],
        async ({pageParam = 0}) => {
            const data = (await selectChatList(roomId, pageParam)).data.data

            if (data.length === 0) {
                return {
                    result: [],
                    nextPage: 0,
                    isLast: true
                }
            }
            const nextPage = data[data.length - 1]['chat_id']
            const isLast = data[data.length - 1]['chat_id'] * 1 === 1

            return {
                result: data,
                nextPage,
                isLast
            }
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextPage,
            onSuccess: (data) => {
                const {pages} = data
                const {result} = pages[pages.length - 1]

                dispatch(addChat(result))
            },
            retry: 0,
            refetchOnMount: false
        }
    )
    const {chats, users, reader, user} = useSelector(({chat, user}) => ({
        chats: chat.chats,
        users: chat.room.users,
        reader: chat.reader,
        user: user.user
    }))
    const {show, hideAll} = useContextMenu({
        id: menuId
    })

    useEffect(() => {
        if (scrollTop && content.current) {
            content.current.scrollTop = scrollTop
        }
    }, [scrollTop, data])

    if (isError) {
        return <ErrorHandler error={error} path={"/logout"}/>
    }

    const ObservationComponent = () => {
        const [ref, inView] = useInView({
            delay: 600,
            triggerOnce: true,
            threshold: 0.5
        })

        useEffect(() => {
            if (!data || isFetching) return;

            const pageLastIdx = data.pages.length - 1
            const {isLast} = data.pages[pageLastIdx]

            if (!isLast && inView) {
                fetchNextPage().then()
            }
        }, [inView]);

        return <div ref={ref}/>
    }

    const onScroll = () => {
        setScrollTop(content.current.scrollTop)
        hideAll()
    }
    const handleContextMenu = (e, chat, roomId) => {
        e.preventDefault()
        show(e, {
            props: () => ({
                chat,
                roomId
            })
        })
    }

    return <>
        <ChatLogComponent chats={chats} users={users} user={user} reader={reader} content={content} onScroll={onScroll} onContextMenu={handleContextMenu}>
            <ObservationComponent/>
            <Notice block={block}/>
        </ChatLogComponent>
    </>

    // return <ChatLog2Component chats={chats} users={users} user={user} reader={reader}/>
}

const Notice = ({block}) => {
    const {mutate} = useInsertFriend()
    const {room, user} = useSelector(({chat, user}) => ({
        room: chat.room,
        user: user.user
    }))

    const onUnBlock = () => {
        const filterUser = room.users.filter(({email}) => email !== user.email)[0]

        mutate({
            id: filterUser.email,
            type: 'email'
        })
    }
    
    if(block) {
        return <div className={style.block_popup}>
            <button onClick={onUnBlock}>
                <i className="material-icons">person_add</i>
                추가
            </button>
        </div>
    }
}

export default React.memo(ChatLog)
