import React, {useState} from "react";

import Popup from "../../../component/util/Popup";
import {selectFriendList} from "../../../lib/api/friend";
import {useLocation, useNavigate} from "react-router-dom";
import AddChattingSelectFriend from "./addChatting/AddChattingSelectFriend";
import AddChattingInsertRoom from "./addChatting/AddChattingInsertRoom";

export const queryName = "selectFriendList"

const AddChatting = () => {
    const [page, setPage] = useState(0);
    const [list, setList] = useState([])
    const navigate = useNavigate()
    const location = useLocation()


    const onClose = (e) => {
        e.preventDefault()
        navigate("/app", {state: location.state})
    }

    return <Popup>
        {
            page === 0 &&
            <AddChattingSelectFriend list={list} setList={setList} setPage={setPage} onClose={onClose}/>
        }
        {
            page === 1 &&
            <AddChattingInsertRoom list={list} onClose={onClose}/>
        }
    </Popup>
}

export default AddChatting