import React, {useRef, useState} from "react";
import JoinUserListComponent from "../../../../component/app/popup/chattingPopup/JoinUserList";
import AddChattingSelectFriend from "../chattingPopup/AddChattingSelectFriend";
import {openPopup} from "../../../../modules/popup";
import {toast} from "react-toastify";
import style from "../../../../css/MainPage.module.css";
import {useDispatch} from "react-redux";
import {useUpdateRoom} from "../../../../lib/query";

const JoinUserList = ({x: initX, y:initY, room, user, onPopup}) => {
    const [{x, y}, setPosition] = useState({x: initX, y: initY})
    const [list, setList] = useState([...(room.users).filter(({email}) => user.email !== email)])
    const [page, setPage] = useState(0)
    const inputRef = useRef()
    const dispatch = useDispatch()
    const {mutate} = useUpdateRoom()

    const trackPos = (e, data) => {
        setPosition({x: data.x, y: data.y})
    }
    const onClickEdit = () => {
        const action = openPopup({
            element: <InputForm room={room} inputRef={inputRef}/>,

            submit: () => {
                const value = inputRef.current.value


                if(value) {
                    mutate({
                        roomId: room.room_id,
                        roomName: value
                    })
                    return true;
                }

                toast.error("빈칸으로는 이름을 설정할 수 없습니다. 다시 입력해주세요.")
                return false;
            }
        })
        dispatch(action)
    }
    const onClickInviteFriend = () => {
        setPage(1)
    }

    if(page === 0) {
         return <JoinUserListComponent trackPos={trackPos} x={x} y={y} onClose={onPopup} room={room} user={user} onClickInviteFriend={onClickInviteFriend} onClickEdit={onClickEdit}/>
    } else if (page === 1) {
        return <AddChattingSelectFriend trackPos={trackPos} x={x} y={y} onClose={onPopup} list={list} setList={setList} room={room}/>
    }

}

const InputForm = ({room, inputRef}) => {
    const [input, setInput] = useState(room.room_name || '')

    const changeInput = (e) => {
        const value = e.target.value
        if (value.length <= 20) {
            setInput(value)
        }
    }

    return (<>
        <header className={style.left}>
            방 이름을 변경합니다.
        </header>
        <div className={style.layer_input}>
            <input type="text" placeholder={input} value={input} onChange={changeInput} ref={inputRef}/>
            <span className={style.counter}> {input.length}/20 </span>
        </div>
    </>)
}

export default JoinUserList