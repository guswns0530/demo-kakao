import {Client} from "@stomp/stompjs"

import {useEffect, useRef} from "react";
import {SOCKET_BASE_URL} from "../constants";
import {useDispatch, useSelector} from "react-redux";
import {addChat} from "../modules/chat";
import {useReadChat} from "../lib/query";
import queryClient from "./queryClient";
import {readerQuery} from "../containers/app/popup/ChattingPopup";
import {toast} from "react-toastify";
import {Toast} from "../containers/app/popup/ToastContainer";

const Socket = () => {
    const client = useRef({})
    const dispatch = useDispatch()
    const state = useSelector(({user, chat}) => ({
        user: user.user,
        chat: chat
    }))
    const stateRef = useRef(state)
    const {mutate: readChatMutate} = useReadChat()

    useEffect(() => {
        stateRef.current = state
    }, [state])

    const connect = () => {
        client.current = new Client({
            brokerURL: SOCKET_BASE_URL,
            onConnect: () => {
                console.log('connect - success')
                subscribe()
            },
            onStompError: () => {
                console.log("connect - failure")
            },
            onWebSocketError: () => {
                console.log("connect - failure")
            }
        })

        client.current.activate()
    }

    const disconnect = () => {
        client.current.deactivate();
    };

    const subscribe = () => {
        const {user} = stateRef.current
        client.current.subscribe("/queue/chat/" + user.email + "/chat", onChat)

        client.current.subscribe("/queue/chat/" + user.email + "/read", onRead)
    }

    const onChat = async (body) => {
        const data = JSON.parse(body.body)
        const {room} = stateRef.current.chat

        if (room) {
            if (room.room_id*1 === data.room_id*1) {
                dispatch(addChat([data]))
                readChatMutate(room.room_id)

                return
            }
        }

        // toast.info(data.content)
        Toast()
    }

    const onRead = async (body) => {
        await queryClient.refetchQueries(readerQuery)
    }

    useEffect(() => {
        connect()

        return () => disconnect()
    }, []);
}

export default Socket