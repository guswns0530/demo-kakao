import React, {useEffect, useRef, useState} from "react";
import {useInView} from "react-intersection-observer";
import {useInfiniteQuery} from "react-query";
import {selectChatList} from "../../../lib/api/chat";
import ChatLogComponent from "../../../component/app/chatting/ChatLog";
import ChatLog2Component from "../../../component/app/chatting/ChatLog2";

import ErrorHandler from "../../handler/ErrorHandler";
import {useDispatch, useSelector} from "react-redux";
import {addChat} from "../../../modules/chat";

export const queryName = "ChatLog/selectChattingList"

const ChatLog = ({roomId}) => {
    const contentRef = useRef();
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

    useEffect(() => {
        if (scrollTop && contentRef.current) {
            contentRef.current.scrollTop = scrollTop
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
        setScrollTop(contentRef.current.scrollTop)
    }

    return <ChatLogComponent chats={chats} users={users} user={user} reader={reader} content={contentRef} onScroll={onScroll}>

        <ObservationComponent/>
    </ChatLogComponent>

    // return <ChatLog2Component chats={chats} users={users} user={user} reader={reader}/>
}

export default React.memo(ChatLog)
