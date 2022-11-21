import React, {useEffect, useRef, useState} from "react";
import ChattingPopupComponent from "../../../component/app/popup/ChattingPopup";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useQueries} from "react-query";
import {selectReaderChat, selectRoom} from "../../../lib/api/room";
import ErrorHandler from "../../handler/ErrorHandler";
import {useDispatch, useSelector} from "react-redux";
import {initializeChat, setReader, setRoom} from "../../../modules/chat";

export const checkRoomQuery = "checkRoom"
export const readerQuery = "readerUser"

const ChattingPopup = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const [{isLoading: isLoading1, isError: isError1, error: error1 },
        {isLoading: isLoading2, isError: isError2, error: error2}]
        = useQueries([
        {
            queryKey: [checkRoomQuery,id] ,
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
    const {user, room} = useSelector(({user, chat}) => ({
        user: user.user,
        room: chat.room
    }))
    const navigate = useNavigate()
    const location = useLocation()
    const inputRef = useRef()
    const [initX, initY] = [location?.state?.locate ? location.state.locate.x : 0, location?.state?.locate ? location.state.locate.y : 0]
    const [{x, y}, setPosition] = useState({x: initX, y: initY})
    const isError = isError1 || isError2
    const isLoading = isLoading1 || isLoading2

    useEffect(() => {
        dispatch(initializeChat())
    }, [id, dispatch]);


    if (isError) {
        return <ErrorHandler path={"/app"} error={error1 || error2} location={location}/>
    }

    const onClose = () => {
        const {state} = location

        dispatch(initializeChat())
        navigate("/app", {state: state})
    }

    const trackPos = (e, data) => {
        if (x < 0 || y < 0) {
            e.preventDefault()
            return
        }
        setPosition({x: data.x, y: data.y})
    }

    const onChange = (e) => {
        const elem = inputRef.current
        elem.style.height = '0px'
        const {scrollHeight} = elem

        let line = scrollHeight / 18

        if (line > 5) {
            elem.style.overflowY = 'scroll'
            line = 5
        } else {
            elem.style.overflowY = 'hidden'
        }

        elem.style.height = line * 18 + 'px'
    }

    return <ChattingPopupComponent x={x} y={y} room={room} isLoading={isLoading} trackPos={trackPos}
                                   onClose={onClose}
                                   onChange={onChange} inputRef={inputRef} user={user}/>
}

export default ChattingPopup