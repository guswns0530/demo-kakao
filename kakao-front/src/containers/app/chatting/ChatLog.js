import React, {useEffect, useRef, useState} from "react";
import {useInView} from "react-intersection-observer";
import {useInfiniteQuery} from "react-query";
import {selectChatList} from "../../../lib/api/chat";
import ChatLogComponent from "../../../component/app/chatting/ChatLog";
import style from "../../../css/MainPage.module.css"

export const queryName = "ChatLog/selectChattingList"

const ChatLog = ({roomId}) => {
    const contentRef = useRef();
    const [scrollTop, setScrollTop] = useState(0)
    const {
        data,
        error,
        isFetching,
        fetchNextPage,
        refetch
    } = useInfiniteQuery(
        queryName,
        async ({pageParam = 0}) => {
            const data = (await selectChatList(roomId, pageParam)).data.data

            if(data.length === 0) {
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
            getNextPageParam: (lastPage) => lastPage.nextPage
        }
    )

    useEffect(() => {
        refetch().then()
    }, [roomId]);


    useEffect(() => {
        if(scrollTop && contentRef.current) {
            contentRef.current.scrollTop = scrollTop
        }
    }, [])

    if(isFetching && !data) {
        return <div className={style.chat_log}></div>
    }

    const ObservationComponent = () => {
        const [ref, inView] = useInView({
            delay: 300,
            triggerOnce: true,
            threshold: 0.3,
        })

        useEffect(() => {
            if(!data && isFetching) return;

            const pageLastIdx = data.pages.length - 1
            const {isLast} = data.pages[pageLastIdx]

            if(!isLast && inView) {
                fetchNextPage().then()
            }
        }, [inView]);

        return <div ref={ref}/>
    }

    const onScroll = () => {
        setScrollTop(contentRef.current.scrollTop)
    }


    return <ChatLogComponent chats={data} content={contentRef} onScroll={onScroll}>
        <ObservationComponent/>
    </ChatLogComponent>
}

export default ChatLog
