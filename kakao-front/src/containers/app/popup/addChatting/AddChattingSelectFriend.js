import React, {useState} from "react";
import produce from "immer";
import AddChatingComponent from "../../../../component/app/popup/AddChattingSelectFriend.js";
import {useQuery} from "react-query";
import {selectFriendList} from "../../../../lib/api/friend";
import {queryName} from "../AddChatting";
import {toast} from "react-toastify";

const AddChattingSelectFriend = ({onClose, list, setList, setPage}) => {
    const [search, setSearch] = useState('')
    const {data, isLoading} = useQuery(queryName, async () => selectFriendList())

    const onChange = (e) => {
        setSearch(e.target.value)
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

    const onSubmit = () => {
        if(list.length <= 0 ) return
        if (list.length <= 1) {
            toast.warn("이미 존재하는 채팅방입니다.")
            return
        }
        setPage(1)
    }

    return <AddChatingComponent onChange={onChange} search={search} isLoading={isLoading} data={data?.data?.data}
                                onClose={onClose} onChecked={onChecked} list={list} onSubmit={onSubmit}/>
}

export default AddChattingSelectFriend