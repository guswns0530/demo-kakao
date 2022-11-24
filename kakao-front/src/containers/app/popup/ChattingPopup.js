import React, {useEffect, useRef, useState} from "react";
import ChattingPopupComponent from "../../../component/app/popup/ChattingPopup";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useQueries} from "react-query";
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
    const [{isLoading: isLoading1, isError: isError1, error: error1},
        {isLoading: isLoading2, isError: isError2, error: error2}]
        = useQueries([
        {
            queryKey: [checkRoomQuery, id],
            queryFn: async () => selectRoom(id),
            onSuccess: ({data: {data}}) => {
                dispatch(setRoom(data))
            }
        },
        {
            queryKey: [readerQuery, id],
            queryFn: async () => selectReaderChat(id),
            onSuccess: ({data: {data}}) => {
                dispatch(setReader(data))
            }
        }
    ])
    const {user, room, blockFriends} = useSelector(({user, chat, friend}) => ({
        user: user.user,
        room: chat.room,
        blockFriends: friend.blockFriends
    }))
    const navigate = useNavigate()
    const location = useLocation()
    const [initX, initY] = [location?.state?.locate ? location.state.locate.x : 0, location?.state?.locate ? location.state.locate.y : 0]
    const [{x, y}, setPosition] = useState({x: initX, y: initY})
    const isError = isError1 || isError2
    const isLoading = isLoading1 || isLoading2
    const {mutate} = useReadChat()
    const [isFullscreen, setScreen] = useState(false)
    const [block, setBlock] = useState(false)
    const content = useRef();

    //anotherPopup
    const [popup, setPopup] = useState(false)


    useEffect(() => {
        if (room && room.room_type == Room.type.PERSON) {
            const selectUser = room.users.filter(({email}) => user.email !== email)[0]
            if (blockFriends.find(({email}) => email === selectUser.email)) {
                setBlock(true)
            } else {
                setBlock(false)
            }
        } else {
            setBlock(false)
        }
    }, [blockFriends, room]);


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
        return <ErrorHandler path={"/app"} error={error1 || error2} location={location}/>
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


    return <>
        <ChattingPopupComponent x={x} y={y} room={room} isLoading={isLoading} trackPos={trackPos}
                                onClose={onClose} user={user} toggleScreen={toggleScreen} isFullscreen={isFullscreen}
                                content={content} block={block} onPopup={onPopup}/>
        {
            popup && !isLoading && <JoinUserList x={x - 305} y={y} room={room} onPopup={onPopup} user={user}/>
        }
    </>
}

export default ChattingPopup