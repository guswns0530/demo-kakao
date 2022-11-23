import React, {useState} from "react";

import produce from "immer";
import AddChatingComponent from "../../../component/app/popup/AddChatting.js";
import Popup from "../../../component/util/Popup";
import {useQuery} from "react-query";
import {selectFriendList} from "../../../lib/api/friend";
import {useLocation, useNavigate} from "react-router-dom";

export const queryName = "selectFriendList"

const AddChatting = () => {
    const [search, setSearch] = useState('')
    const {data, isLoading} = useQuery(queryName, async () => selectFriendList())
    const [list, setList] = useState([])
    const navigate = useNavigate()
    const location = useLocation()

    const onChange = (e) => {
        setSearch(e.target.value)
    }
    const onClose = (e) => {
        e.preventDefault()
        navigate("/app", {state: location.state})
    }
    const onChecked = (e, data) => {
        if (e.target.checked) {
            setList(produce(list, draft => {
                draft.push(data)
            }))
        } else {
            setList(produce(list, draft => draft.filter(user => user.email !== data.email)))
        }
    }

    return <Popup>
        <AddChatingComponent onChange={onChange} search={search} isLoading={isLoading} data={data?.data?.data}
                             onClose={onClose} onChecked={onChecked} list={list}/>
    </Popup>
}

export default AddChatting