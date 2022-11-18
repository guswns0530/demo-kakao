import React, {useRef, useState} from "react";

import FriendInfoComponent from "../../../component/app/friend/FriendList";
import {useQuery} from "react-query";
import {selectFriendList} from "../../../lib/api/friend";
import LoadingFriendList from "../../../component/app/friend/LoadingFriendList";
import {useDispatch, useSelector} from "react-redux";
import ErrorHandler from "../../handler/ErrorHandler";
import searchServiceToFriend from "../../../services/searchService";
import {Item, Menu, Separator, useContextMenu} from "react-contexify";
import {useLocation, useNavigate} from "react-router-dom";
import {useBlockFriend, useChangeNickname} from "../../../lib/query";
import style from "../../../css/MainPage.module.css";
import {openPopup} from "../../../modules/popup";

export const queryName = "selectFriendList"
export const menuId = "FriendInfoMenuId"

const FriendList = () => {
    const dispatch = useDispatch()
    const inputRef = useRef()
    const location = useLocation()
    const {data, isLoading, isError, error} = useQuery(queryName, async () => {
        return selectFriendList()
    }, {
    });
    const {search} = useSelector(({form}) => ({
        search: form.friend.search
    }))
    const [isMore, setMore] = useState(true)
    const {show} = useContextMenu({
        id: menuId
    })
    const navigate = useNavigate()
    const {mutate} = useBlockFriend();
    const {mutate: updateNickMutate} = useChangeNickname();

    if (isLoading) {
        return <LoadingFriendList/>
    }

    if (isError) {
        return <ErrorHandler error={error} path={"/logout"}/>
    }


    const onProfileClick = (e, room_id) => {
        const [x, y] = [e.pageX, e.pageY]
        navigate("/app/chatting/" + room_id, {state: {...location.state, locate: {x, y}}})
    }
    const onClick = (e) => {
        e.preventDefault()
        setMore(!isMore)
    }
    const handleContextMenu = (e, user) => {
        e.preventDefault()
        show(e, {
            props: () => ({
                user
            })
        })
    }
    const goProfile = (e) => {
        const user = e.props().user
        const [x, y] = [e.event.pageX, e.event.pageY]
        console.log(x, y)
        navigate("/app/profile/" + user.id, {state: {...location.state, locate: {x, y}}})
    }
    const onBlock = (e) => {
        const user = e.props().user

        const action = openPopup({
            element: (<>
                <header className={style.center}>
                    차단하시겠습니까?
                </header>
                <div className={style.info}>
                    차단하면 친구가 보내는 메시지를 받을 수 없으며 <br/>
                    친구 목록에서 삭제됩니다.
                    <br/>
                    <br/>
                    (차단 여부는 상대방이 알 수 없습니다)
                </div>
            </>),
            submit: () => {
                mutate({email: user.email})

                return true
            }
        })
        dispatch(action)
    }

    const changeName = (e) => {
        const user = e.props().user

        const action = openPopup({
            element: <InputForm user={user} inputRef={inputRef}/>,

            submit: () => {
                const value = inputRef.current.value
                if(value) {
                    updateNickMutate({
                        email: user.email, name: inputRef.current.value
                    })
                } else {
                    updateNickMutate({
                        email: user.email, name: user.realname
                    })
                }

                return true
            }
        })
        dispatch(action)
    }

    const resource = data.data.data
    const filterData = searchServiceToFriend(resource, search)

    return (<>
        <FriendInfoComponent data={filterData} isMore={isMore} onClick={onClick} onContextMenu={handleContextMenu} onProfileClick={onProfileClick}/>
        <Menu id={menuId} animation={false}>
            <Item>채팅하기</Item>
            <Separator/>
            <Item onClick={goProfile}>프로필 보기</Item>
            <Item onClick={changeName}>이름 변경</Item>
            <Separator/>
            <Item onClick={onBlock}>차단</Item>
        </Menu>
    </>)
}

const InputForm = ({user, inputRef}) => {
    const [input, setInput] = useState(user.name || '')

    const changeInput = (e) => {
        const value = e.target.value
        if (value.length <= 20) {
            setInput(value)
        }
    }

    return (<>
        <header className={style.left}>
            친구의 이름을 설정해주세요
        </header>
        <div className={style.layer_input}>
            <input type="text" placeholder={input} value={input} onChange={changeInput} ref={inputRef}/>
            <span className={style.counter}> {input.length}/20 </span>
            <p>친구가 설정한 이름 : {user.realname}</p>
        </div>
    </>)
}

export default FriendList
