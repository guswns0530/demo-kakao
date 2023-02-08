import React from "react";
import ChattingListComponent from "../../../component/app/chatting/ChattingList";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import searchServiceToFriend from "../../../services/searchService";
import roomService from "../../../services/RoomInfo";
import {deleteRoom} from "../../../modules/rooms";
import {Item, Menu, Separator, useContextMenu} from "react-contexify";
import {useLeaveRoom} from "../../../lib/query";
import {toast} from "react-toastify";

export const roomQueryName = "selectChattingList"

const menuId= '시발'

const ChattingList = () => {
    const dispatch = useDispatch()
    const {search, user, rooms} = useSelector(({form, user, rooms}) => ({
        search: form.chatting.search,
        user: user.user,
        rooms: rooms.rooms
    }))
    const navigate = useNavigate()
    const location = useLocation()
    const {show} = useContextMenu({
        id: menuId
    })
    const {mutate} = useLeaveRoom((data) => {
        dispatch(deleteRoom(data.data.data))
        navigate("/app", {state: location.state})
    }, (error) => {
        toast.error(error.response.data["error_description"])
    })
    const leaveRoom = (e) => {
        const {room_id} = e.props().room

        mutate(room_id)
    }
    const openChatting = (e) => {
        const {room_id} = e.props().room
        const [x, y] = [e.pageX, e.pageY]
        navigate("/app/chatting/" + room_id, {state: {...location.state, locate: {x, y}}})
    }
    const onDoubleClick = (e, room_id) => {
        const [x, y] = [e.pageX, e.pageY]
        navigate("/app/chatting/" + room_id, {state: {...location.state, locate: {x, y}}})
    }
    const handleContextMenu = (e, room) => {
        e.preventDefault()
        show(e, {
            props: () => ({
                room
            })
        })
    }

    const filterData = searchServiceToFriend(rooms.filter(({chat_status}) => chat_status).map(room => {
        return roomService(user, room)
    }), search)

    return <>
        <ChattingListComponent data={filterData} onDoubleClick={onDoubleClick} handleContextMenu={handleContextMenu}/>
        <Menu id={menuId} animation={false}>
            <Item onClick={openChatting}>채팅방 열기</Item>
            <Separator/>
            <Item onClick={leaveRoom}>채팅방 나가기</Item>
        </Menu>
    </>
}

export default ChattingList