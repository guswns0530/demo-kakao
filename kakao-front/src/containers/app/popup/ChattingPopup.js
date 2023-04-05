import React, {useEffect, useRef, useState} from "react";
import ChattingPopupComponent from "../../../component/app/popup/ChattingPopup";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {selectReaderChat, selectRoom} from "../../../lib/api/room";
import ErrorHandler from "../../handler/ErrorHandler";
import {useDispatch, useSelector} from "react-redux";
import {initializeChat, setReader, setRoom} from "../../../modules/chat";
import {useReadChat} from "../../../lib/query";
import Room from "../../../constants/Room";
import JoinUserList from "./chattingPopup/JoinUserList";

export const checkRoomQuery = "checkRoom"
export const readerQuery = "readerUser"

const ChattingPopup = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const {isLoading, isError, error } = useQuery(
        {
            queryKey: [checkRoomQuery, readerQuery, id],
            queryFn: async () => {
                const data1 = await selectRoom(id || '')
                const data2 = await selectReaderChat(id || '');

                return [data1, data2]
            },
            onSuccess: ([{data: {data: data1}}, {data: {data: data2}}]) => {
                dispatch(setRoom(data1))
                dispatch(setReader(data2))
            },
        },
    )

    const {user, room, blockFriends, friends} = useSelector(({user, chat, friend}) => ({
        user: user.user,
        room: chat.room,
        blockFriends: friend.blockFriends,
        friends: friend.friends
    }))
    const navigate = useNavigate()
    const location = useLocation()
    const [initX, initY] = [location?.state?.locate ? location.state.locate.x : 0, location?.state?.locate ? location.state.locate.y : 0]
    const [{x, y}, setPosition] = useState({x: initX || 0, y: initY || 0})
    const {mutate} = useReadChat()
    const [isFullscreen, setScreen] = useState(false)
    const [block, setBlock] = useState(false)
    const [isFriend, setFriend] = useState(false)
    const content = useRef();

    //anotherPopup
    const [popup, setPopup] = useState(false)


    useEffect(() => {
        setPopup(false)
    }, [room])

    useEffect(() => {
        if (room && room.room_type == Room.type.PERSON) {
            const selectUser = room.users.filter(({email}) => user.email !== email)[0]
            if (blockFriends.find(({email}) => email === selectUser.email)) {
                setBlock(true)
            } else if (!friends.find(({email}) => email === selectUser.email)) {
                setFriend(true)
            } else {
                setBlock(false)
                setFriend(false)
            }
        } else {
            setBlock(false)
            setFriend(false)
        }
    }, [friends, blockFriends, room]);


    useEffect(() => {
        if (room) {
            mutate(id)
        }
    }, [id, room])

    useEffect(() => {
        dispatch(initializeChat())
    }, [id, dispatch]);

    useEffect(() => {
        if (isFullscreen) {
            setPosition({x: 0, y: 0})
        }
    }, [isFullscreen])


    if (isError) {
        return <ErrorHandler path={"/app"} error={error} location={location}/>
    }

    const toggleScreen = () => {
        setScreen(!isFullscreen)
    }

    const onClose = () => {
        const {state} = location

        dispatch(initializeChat())
        navigate("/app", {state: state})
    }

    const trackPos = (e, data) => {
        setPosition({x: data.x, y: data.y})
    }

    const onPopup = () => {
        setPopup(!popup)
    }


    return (<>
        <ChattingPopupComponent x={x} y={y} room={room} isLoading={isLoading} trackPos={trackPos}
                                onClose={onClose} user={user} toggleScreen={toggleScreen}
                                isFullscreen={isFullscreen}
                                content={content} block={block} onPopup={onPopup} isFriend={isFriend}
        />
        {
            popup && !isLoading && <JoinUserList x={x - 305} y={y} room={room} onPopup={onPopup} user={user}/>
        }
    </>)
}

export default ChattingPopup