import {Client} from "@stomp/stompjs"

import {useEffect, useRef} from "react";
import {SOCKET_BASE_URL} from "../../constants";
import {useDispatch, useSelector} from "react-redux";
import {addChat} from "../../modules/chat";
import {useReadChat} from "../../lib/query";
import queryClient from "../../services/queryClient";
import {readerQuery} from "../app/popup/ChattingPopup";
import {addAlert} from "../../modules/alert";

const Socket = () => {
    const client = useRef({})
    const dispatch = useDispatch()
    const state = useSelector(({user, chat}) => ({
        user: user.user,
        chat: chat,
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

        client.current.subscribe("/queue/chat/" + user.email + "/join", onJoin)

        client.current.subscribe("/queue/chat/" + user.email + "/leave", onLeave)
    }

    const onChat = async (body) => {
        const data = JSON.parse(body.body)
        const {chat: {room}} = stateRef.current

        if (room) {
            if (room.room_id * 1 === data.room_id * 1) {
                dispatch(addChat([data]))
                readChatMutate(room.room_id)
                return
            }
        }

        dispatch(addAlert(data))
    }

    const onLeave = (body) => {
        const data = JSON.parse(body.body)
        const {chat: {room}, user} = stateRef.current

        if (room) {
            if (room.room_id * 1 === data.room_id * 1) {
                dispatch(addChat([data]))
                return
            }
        }
    }

    const onJoin = (body) => {
        const data = JSON.parse(body.body)
        const {chat: {room}, user} = stateRef.current

        if (room) {
            if (room.room_id * 1 === data.room_id * 1) {
                dispatch(addChat([data]))
                readChatMutate(room.room_id)
                return
            }
        }
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