import React, {useState} from "react";
import produce from "immer";
import {toast} from "react-toastify";
import AddChattingComponent from "../../../../component/app/popup/chattingPopup/AddChattingSelectFriend.js";
import {useSelector} from "react-redux";
import {useInviteOrCreateRoom} from "../../../../lib/query";
import {useLocation, useNavigate} from "react-router-dom";

const AddChattingSelectFriend = ({onClose, list, setList, trackPos, x, y, room}) => {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    const {friends} = useSelector(({friend}) => ({
        friends: friend.friends
    }))
    const location = useLocation()
    const {mutate, isLoading} = useInviteOrCreateRoom((data) => {
        const room = data.data.data

        navigate("/app/chatting/" + room.room_id, {state: location.state})
    })

    const onChange = (e) => {
        setSearch(e.target.value)
    }

    const onChecked = (e, user) => {
        if (e.target.checked) {
            setList(produce(list, draft => {
                draft.push(user)
            }))
        } else {
            if(room.users.find(({email}) => email === user.email)) {
                return
            }
            setList(produce(list, draft => draft.filter(u => u.email !== user.email)))
        }
    }

    const onSubmit = () => {
        if(list.length <= 0 ) return
        if (list.length <= 1) {
            toast.warn("이미 존재하는 채팅방입니다.")
            return
        }

        const selectFilter = list.filter(({email}) => {
            return !room.users.find((u) => u.email === email)
        })

        mutate({
            roomId: room.room_id,
            users: selectFilter.map(({email}) => email),
        })
    }

    return <AddChattingComponent onChange={onChange} search={search} data={friends}
                                onClose={onClose} onChecked={onChecked} list={list} onSubmit={onSubmit} trackPos={trackPos} x={x} y={y} isLoading={isLoading}/>
}

export default AddChattingSelectFriend