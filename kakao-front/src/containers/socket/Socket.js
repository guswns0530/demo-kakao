import {Client} from "@stomp/stompjs"

import {useEffect, useRef} from "react";
import {SOCKET_BASE_URL} from "../../constants";
import {useDispatch, useSelector} from "react-redux";
import {addChat, removeChat, setRoom} from "../../modules/chat";
import {useReadChat} from "../../lib/query";
import queryClient from "../../services/queryClient";
import {readerQuery} from "../app/popup/ChattingPopup";
import {addAlert} from "../../modules/alert";
import {selectRoom} from "../../lib/api/room";
import {roomsUpdate} from "../../modules/rooms";

const Socket = () => {
    const client = useRef({})
    const dispatch = useDispatch()
    const state = useSelector(({user, chat, friend}) => ({
        user: user.user,
        chat: chat,
        blockFriends: friend.blockFriends
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

        client.current.subscribe("/queue/chat/" + user.email + "/remove", onRemove)
    }

    const onRemove = async (body) => {
        const data = JSON.parse(body.body)
        const {chat: {room}} = stateRef.current

        const response = await selectRoom(data.room_id)
        dispatch(roomsUpdate(response.data.data))

        if(room) {
            if(room.room_id * 1 === data.room_id * 1) {
                dispatch(removeChat(data.chat_id))
            }
        }
    }

    const onChat = async (body) => {
        const data = JSON.parse(body.body)
        const {chat: {room}, user, blockFriends} = stateRef.current

        const response = await selectRoom(data.room_id)
        dispatch(roomsUpdate(response.data.data))

        if (room) {
            if (room.room_id * 1 === data.room_id * 1) {
                dispatch(addChat([data]))
                readChatMutate(room.room_id)
                return
            }
        }

        if(user.email !== data.email) {
            if(!blockFriends.find(({email}) => email === data.email)) {
                dispatch(addAlert(data))
            }
        }

    }

    const onLeave = async (body) => {
        const data = JSON.parse(body.body)
        const {chat: {room}} = stateRef.current

        const response = await selectRoom(data.room_id)
        dispatch(roomsUpdate(response.data.data))

        if (room) {
            if (room.room_id * 1 === data.room_id * 1) {
                dispatch(setRoom(response.data.data ))
                dispatch(addChat([data]))
            }
        }

    }

    const onJoin = async (body) => {
        const data = JSON.parse(body.body)
        const {chat: {room}} = stateRef.current

        if (room) {
            if (room.room_id * 1 === data.room_id * 1) {
                const response = await selectRoom(data.room_id)
                dispatch(roomsUpdate(response.data.data))
                dispatch(setRoom(response.data.data))
                dispatch(addChat([data]))
            }
        }

    }

    const onRead = async (body) => {
        const roomId = body.body
        await queryClient.refetchQueries(readerQuery)
        const response = await selectRoom(roomId)
        dispatch(roomsUpdate(response.data.data))
    }

    useEffect(() => {
        connect()

        return () => disconnect()
    }, []);
}

export default Socket