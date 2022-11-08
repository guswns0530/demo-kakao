import React from "react";
import AddFriendComponent from "../../../component/app/popup/AddFriend"
import {Navigate, useNavigate, useParams} from "react-router-dom";

const AddFriend = () => {
    const {type} = useParams()
    const navigate = useNavigate()
    const matchType = ['id', 'email']

    if(!type) {
        return <Navigate to={"/app/add-friend/id"} />
    }
    if(matchType.indexOf(type) < 0) {
        return <Navigate to={"/app/add-friend/id"} />
    }

    const onClose = () => {
        navigate("/app")
    }

    return <AddFriendComponent onClose={onClose}/>
}

export default AddFriend