import React from "react";
import ChattingListComponent from "../../../component/app/chatting/ChattingList";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import searchServiceToFriend from "../../../services/searchService";
import roomService from "../../../services/RoomInfo";
import {useQuery} from "react-query";
import {selectRoomList} from "../../../lib/api/room";
import ErrorHandler from "../../handler/ErrorHandler";
import {rooms as roomsAction} from "../../../modules/rooms";

export const roomQueryName = "selectChattingList"

const ChattingList = () => {
    const dispatch = useDispatch()
    const {isLoading, isError, error} = useQuery(
        roomQueryName,
        async () => selectRoomList()
        , {
            onSuccess: (data) => {
                if (data) {
                    dispatch(roomsAction(data.data.data))
                }
            }
        }
    )
    const {search, user, rooms} = useSelector(({form, user, rooms}) => ({
        search: form.chatting.search,
        user: user.user,
        rooms: rooms.rooms
    }))
    const navigate = useNavigate()
    const location = useLocation()

    if(isLoading) {
        return <div></div>
    }

    if(isError) {
        return <ErrorHandler path={"/logout"} error={error}/>
    }


    const onDoubleClick = (e, roomId) => {
        const [x, y] = [e.pageX, e.pageY]
        navigate("/app/chatting/" + roomId, {state: {...location.state, locate: {x, y}}})
    }

    const filterData = searchServiceToFriend(rooms.map(room => {
        return roomService(user, room)
    }), search)

    return <ChattingListComponent data={filterData} onDoubleClick={onDoubleClick}/>
}

export default ChattingList