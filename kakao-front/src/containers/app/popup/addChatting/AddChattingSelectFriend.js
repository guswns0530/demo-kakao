import React, {useState} from "react";
import produce from "immer";
import AddChatingComponent from "../../../../component/app/popup/addChatting/AddChattingSelectFriend.js";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";

const AddChattingSelectFriend = ({onClose, list, setList, setPage}) => {
    const [search, setSearch] = useState('')
    const {friends} = useSelector(({friend}) => ({
        friends: friend.friends
    }))

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

    return <AddChatingComponent onChange={onChange} search={search} data={friends}
                                onClose={onClose} onChecked={onChecked} list={list} onSubmit={onSubmit}/>
}

export default AddChattingSelectFriend