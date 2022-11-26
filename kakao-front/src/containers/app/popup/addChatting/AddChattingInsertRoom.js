import React, { useState} from "react";
import AddChattingInsertRoomComponent from "../../../../component/app/popup/addChatting/AddChattingInsertRoom";
import ProfileImage from "../../../../component/util/ProfileImage";
import {useInviteOrCreateRoom} from "../../../../lib/query";
import {useLocation, useNavigate} from "react-router-dom";

const AddChattingInsertRoom = ({list, onClose}) => {
    const roomNamePlaceholder = list.reduce((before, now) => {
        if (!before) {
            return now.name
        }
        return now.name + ', ' + before
    }, '')
    const [name, setName] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const profileImageList = list.slice(0, 4).map(({email, profile_image_url}) => {
        return <ProfileImage key={email} profile_image_url={profile_image_url}/>
    })
    const {mutate, isLoading} = useInviteOrCreateRoom((data) => {
        const room = data.data.data

        navigate("/app/chatting/" + room.room_id, {state: location.state})
    })

    const onChange = (e) => {
        setName(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if(name.trim() === '') {
            mutate({
                users: list.map(({email}) => email),
            })
            return
        }

        mutate({
            users: list.map(({email}) => email),
            roomName: name
        })

    }

    return <AddChattingInsertRoomComponent onClose={onClose} name={name} profileImageList={profileImageList} onSubmit={onSubmit} isLoading={isLoading} onChange={onChange} roomNamePlaceholder={roomNamePlaceholder}/>
}

export default AddChattingInsertRoom