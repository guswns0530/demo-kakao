import React, {useRef, useState} from "react";
import ChattingPopupComponent from "../../../component/app/popup/ChattingPopup";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {selectRoom, selectRoomList} from "../../../lib/api/room";
import ErrorHandler from "../../handler/ErrorHandler";

export const queryName = "selectRoom"

const ChattingPopup = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const inputRef = useRef()
    const {data, isLoading, isError, error} = useQuery(queryName, async () => selectRoom(id))
    const [{x, y}, setPosition] = useState({x: 0, y: 0})

    if(isError) {
        return <ErrorHandler path={"/app"} error={error} location={location}/>
    }

    const onClose = () => {
        const {state} = location
        navigate("/app", {state})
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

    return <ChattingPopupComponent trackPos={trackPos} onClose={onClose} onChange={onChange} inputRef={inputRef}/>
}

export default ChattingPopup