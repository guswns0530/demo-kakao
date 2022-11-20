import React, {useEffect, useRef, useState} from "react";
import ChattingPopupComponent from "../../../component/app/popup/ChattingPopup";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {selectRoom} from "../../../lib/api/room";
import ErrorHandler from "../../handler/ErrorHandler";
import {useSelector} from "react-redux";

export const queryName = "checkRoom"

const ChattingPopup = () => {
    const {id} = useParams()
    const {data, isLoading, isError, error, refetch} = useQuery(queryName, async () => selectRoom(id), {})
    const {user} = useSelector(({user}) => ({
        user: user.user
    }))
    const navigate = useNavigate()
    const location = useLocation()
    const inputRef = useRef()
    const [initX, initY] = [location?.state?.locate ? location.state.locate.x : 0, location?.state?.locate ? location.state.locate.y : 0]
    const [{x, y}, setPosition] = useState({x: initX, y: initY})

    useEffect(() => {
        refetch().then()
    }, [id, refetch]);


    if (isError) {
        return <ErrorHandler path={"/app"} error={error} location={location}/>
    }

    const onClose = () => {
        const {state} = location

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

    const resource = data?.data?.data

    return <ChattingPopupComponent x={x} y={y} room={resource} isLoading={isLoading} trackPos={trackPos}
                                   onClose={onClose}
                                   onChange={onChange} inputRef={inputRef} user={user}/>
}

export default ChattingPopup