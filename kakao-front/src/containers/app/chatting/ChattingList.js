import React from "react";
import ChattingListComponent from "../../../component/app/chatting/ChattingList";
import {useQueries} from "react-query";
import {selectRoomList} from "../../../lib/api/room";
import ErrorHandler from "../../handler/ErrorHandler";
import {selectMe} from "../../../lib/api/user";
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import searchServiceToFriend from "../../../services/searchService";
import roomService from "../../../services/RoomInfo";

export const roomQueryName = "selectChattingList"
const userQueryName = "checkUser"


const ChattingList = () => {
    const [{data: roomData, isLoading: isRoomLoading, isError: isRoomError, error: roomError},
        {data: userData, isLoading: isUserLoading, isError: isUserError, error: userError}] = useQueries(
        [
            {
                queryKey: roomQueryName,
                queryFn: async () => selectRoomList(),
            },
            {
                queryKey: userQueryName,
                queryFn: async () => selectMe(),
            }
        ], {
        }
    )
    const {search} = useSelector(({form}) => ({
        search: form.chatting.search
    }))
    const navigate = useNavigate()
    const location = useLocation()

    const isLoading = isRoomLoading || isUserLoading
    const isError = isRoomError || isUserError


    if (isLoading) {
        return <div></div>
    }

    if (isError) {
        if (isRoomError) {
            return <ErrorHandler error={roomError} path={"/logout"}/>
        }
        if (isUserError) {
            return <ErrorHandler error={userError} path={"/logout"}/>
        }
    }

    const onDoubleClick = (e, roomId) => {
        navigate("/app/chatting/" + roomId, {state: location.state})
    }

    const data = roomData.data.data
    const user = userData.data.data

    const filterData = searchServiceToFriend(data.map(room => {
        return roomService(user, room)
    }), search)

    return <ChattingListComponent data={filterData} onDoubleClick={onDoubleClick}/>
}

export default ChattingList